import { buscarFigus } from "./buscarFigus/buscarFigus.js"
import { obtenerFiguritas } from "../servicios/api.js"
import { api } from "../../config.js"

const nombrePublicacion = (mla_id) => {
    if (["MLA1241847466", "MLA1287984004", "MLA3668808570"].includes(mla_id)) {
        return "Mundial QATAR 2022"
    } else if (["MLA3643992402", "MLA3643993376", "MLA1911338959", "MLA3589325682", "MLA3668909352"].includes(mla_id)) {
        return "Mundial USA 2026"
    } else if (["MLA1413919557", "MLA1921984423"].includes(mla_id)) {
        return "Copa America 2024"
    }
    return mla_id
}

export const preguntasMercadolibre = async (preguntasRecibidas) => {

    const elementoRespuesta = document.getElementById("preguntasMeli")
    elementoRespuesta.innerHTML = ""

    if (preguntasRecibidas.length == 0) {
        const sinPreguntas = document.createElement("p")
        sinPreguntas.textContent = "Sin preguntas"
        elementoRespuesta.appendChild(sinPreguntas)
        return
    }

    const figusBDD = await obtenerFiguritas("mundialUsa2026")
    console.log(preguntasRecibidas)
    for (const pregunta of preguntasRecibidas) {
        if (pregunta) {
            const elementPregunta = document.createElement("div")
            const fechaPregunta = document.createElement("div")
            const preguntaMeli = document.createElement("textarea");
            const publicacionMeli = document.createElement("div")
            const idPregunta = document.createElement("div")
            const idCliente = document.createElement("div")
            const sellerid = document.createElement("div")

            fechaPregunta.textContent = pregunta.date_created
            preguntaMeli.value = pregunta.text
            preguntaMeli.style.width = "100%";
            preguntaMeli.style.minHeight = "15vh";
            idCliente.textContent = `Cliente : ${pregunta.from.id}`

            const elementConsulta = document.createElement("div")
            const botonConsultar = document.createElement("button")
            botonConsultar.textContent = "Consultar"

            const elementoMensaje = document.createElement("div")
            elementoMensaje.style.display = "none"

            let mensaje = buscarFigus("baseMundial", figusBDD, "mundialUsa2026", "ONLINE", pregunta.text.toUpperCase());
            if (mensaje) {
                mensaje.style.display = "none";
            }

            botonConsultar.addEventListener("click", async () => {
                if (preguntaMeli.value) {
                    const mensaje = buscarFigus("baseMundial", figusBDD, "mundialUsa2026", "ONLINE", preguntaMeli.value.toUpperCase());
                    if (mensaje) {
                        elementoMensaje.innerHTML = "";
                        elementoMensaje.appendChild(mensaje);
                        elementoMensaje.style.display = "";
                        const responder = document.createElement("button")
                        responder.textContent = "Responder"
                        elementoMensaje.appendChild(responder)
                        responder.addEventListener("click", async () => {
                            await fetch(`${api}/mercadolibre/respuestas`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    id: pregunta.id,
                                    texto: mensaje.textContent
                                })
                            })
                        })
                    } else {
                        elementoMensaje.innerHTML = "Corregir entrada";
                        elementoMensaje.style.display = "";
                    }

                } else {
                    elementoMensaje.innerHTML = "Sin Mensaje";
                }

            })


            idPregunta.textContent = `pregunta id : ${pregunta.id}`
            sellerid.textContent = `seller : ${pregunta.seller_id}`
            publicacionMeli.textContent = `${nombrePublicacion(pregunta.item_id)}`
            elementPregunta.append(fechaPregunta, publicacionMeli, idPregunta, sellerid, idCliente, preguntaMeli, botonConsultar)
            elementPregunta.appendChild(elementoMensaje)
            elementPregunta.style.margin = "15px"
            fechaPregunta.style.backgroundColor = "rgba(111, 225, 215, 0.69)"
            preguntaMeli.style.backgroundColor = "rgba(201, 239, 236, 0.69)"
            elementPregunta.style.border = "solid black 1px"
            elementPregunta.style.width = "75vw"

            elementoRespuesta.appendChild(elementPregunta)
        }
    }
}