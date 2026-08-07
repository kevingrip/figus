import { buscarFigus } from "./buscarFigus/buscarFigus.js"
import { obtenerFiguritas } from "../servicios/api.js"
import { api } from "../../config.js"

const nombrePublicacion = (mla_id) => {
    if (["MLA1241847466", "MLA1287984004", "MLA3668808570"].includes(mla_id)) {
        return { album: "Mundial QATAR 2022", bdd: "mundialQatar2022" }
    } else if (["MLA3643992402", "MLA3643993376", "MLA1911338959", "MLA3589325682", "MLA3668909352"].includes(mla_id)) {
        return { album: "Mundial USA 2026", bdd: "mundialUsa2026" }
    } else if (["MLA1413919557", "MLA1921984423"].includes(mla_id)) {
        return { album: "Copa America 2024", bdd: "copaAmerica2024" }
    } else if (["MLA1923493602"].includes(mla_id)) {
        return { album: "Futbol Argentino 2024", bdd: "futbolArgentino2024" }
    }
    return mla_id
}

export const preguntasMercadolibre = async (preguntasRecibidas) => {

    const elementoRespuesta = document.getElementById("preguntasMeli")
    elementoRespuesta.innerHTML = ""

    if (preguntasRecibidas.length == 0) {
        elementoRespuesta.style.display = "flex"
        elementoRespuesta.style.justifyContent = "center"

        elementoRespuesta.textContent = "Sin preguntas"
        return
    }



    for (const pregunta of preguntasRecibidas) {
        if (pregunta) {
            let getAlbum = nombrePublicacion(pregunta.item_id)
            const figusBDD = await obtenerFiguritas(getAlbum.bdd)
            console.log("album:", getAlbum)
            const elementPregunta = document.createElement("div")
            const fechaPregunta = document.createElement("div")
            const preguntaMeli = document.createElement("textarea");
            const publicacionMeli = document.createElement("div")
            const idPregunta = document.createElement("div")
            const idCliente = document.createElement("div")
            const sellerid = document.createElement("div")


            fechaPregunta.textContent = new Date(pregunta.date_created).toLocaleString("es-AR", {
                
                hour12: false
            });
            preguntaMeli.value = pregunta.text
            preguntaMeli.style.width = "100%";
            preguntaMeli.style.minHeight = "15vh";
            idCliente.textContent = `Cliente : ${pregunta.from.id}`
            console.log(pregunta.historial)

            const elementHist = document.createElement("div")
            pregunta.historial.forEach(element => {
                const bloqueHist = document.createElement("div")
                const pregunta = document.createElement("div")
                const respuesta = document.createElement("div")
                pregunta.textContent = element.text
                respuesta.textContent = element.answer.text
                pregunta.style.margin = "5px"
                pregunta.style.backgroundColor = "#bdfff495"
                respuesta.style.margin = "5px"
                bloqueHist.appendChild(pregunta)
                bloqueHist.appendChild(respuesta)
                bloqueHist.style.margin = "10px"
                bloqueHist.style.border = "solid black 2px"
                elementHist.appendChild(bloqueHist)
            });


            const elementConsulta = document.createElement("div")
            const botonConsultar = document.createElement("button")
            botonConsultar.textContent = "Consultar"

            const elementoMensaje = document.createElement("div")
            elementoMensaje.style.display = "none"

            let mensaje = buscarFigus("baseMundial", figusBDD, getAlbum.bdd, "ONLINE", pregunta.text.toUpperCase());



            botonConsultar.addEventListener("click", async () => {
                if (preguntaMeli.value) {
                    const mensaje = buscarFigus("baseMundial", figusBDD, getAlbum.bdd, "ONLINE", preguntaMeli.value.toUpperCase());
                    if (mensaje) {
                        elementoMensaje.innerHTML = "";
                        const mensajeModificable = document.createElement('textarea')
                        mensajeModificable.value = mensaje.textContent
                        mensajeModificable.style.width = "100%";
                        mensajeModificable.style.height = "10vh";

                        elementoMensaje.appendChild(mensajeModificable);
                        elementoMensaje.style.display = "";
                        const responder = document.createElement("button")
                        responder.textContent = "Responder"
                        elementoMensaje.appendChild(responder)
                        responder.addEventListener("click", async () => {
                            try {
                                const peticion = await fetch(`${api}/mercadolibre/respuestas`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        id: pregunta.id,
                                        texto: mensajeModificable.value,
                                        seller_id: pregunta.seller_id
                                    })
                                })

                                if (!peticion.ok) {
                                    throw new Error("Error respondiendo");
                                }
                                console.log("Respondida correctamente")

                                elementPregunta.remove();
                            } catch (error) {
                                console.log("Posiblemente fue respondida anteriormente", error.message)
                            }
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
            publicacionMeli.textContent = `${getAlbum.album}`
            elementPregunta.append(fechaPregunta, publicacionMeli, idPregunta, sellerid, idCliente, elementHist, preguntaMeli, botonConsultar)
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