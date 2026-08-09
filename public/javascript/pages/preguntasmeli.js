import { buscarFigus } from "./buscarFigus/buscarFigus.js"
import { obtenerFiguritas } from "../servicios/api.js"
import { api } from "../../config.js"

const responderPregunta = async ({ elementPregunta, idPregunta, valorMensaje, vendedor }) => {
    try {
        const peticion = await fetch(`${api}/mercadolibre/respuestas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idPregunta,
                texto: valorMensaje,
                seller_id: vendedor
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
}

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
            const result_publicaciones = await fetch(`${api}/mercadolibre/publicaciones/item/${pregunta.item_id}?seller_id=${pregunta.seller_id}`, {
                method: "GET"
            });
            const publicacion = await result_publicaciones.json();

            const imgPublicacion = document.createElement("img")
            imgPublicacion.src = publicacion.thumbnail

            const tituloPublicacion = document.createElement("h3")
            tituloPublicacion.textContent = publicacion.title

            const valorVenta = document.createElement("input")

            console.log(publicacion)
            const figusBDD = await obtenerFiguritas(getAlbum.bdd)
            console.log("album:", getAlbum)
            const elementPregunta = document.createElement("div")
            const elementLeftPregunta = document.createElement("div")
            const elementRigthPregunta = document.createElement("div")
            const elementDownPregunta = document.createElement("div")
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
            preguntaMeli.style.margin = "5px";
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


            const elementResponder = document.createElement("div")
            const botonesResponder = document.createElement("div")
            const botonConsultar = document.createElement("button")
            botonConsultar.textContent = "Consultar"

            const botonVenta = document.createElement("button")
            botonVenta.textContent = "Vender"

            const botonConfirmarVenta = document.createElement("button")
            botonConfirmarVenta.textContent = "Confirmar"


            botonesResponder.style.display = "flex"
            botonesResponder.style.flexDirection = "row"
            botonesResponder.append(botonConsultar, botonVenta)

            elementResponder.style.display = "flex"
            elementResponder.style.flexDirection = "column"

            elementResponder.append(botonesResponder)

            botonVenta.style.margin = "10px"
            botonConsultar.style.margin = "10px"

            const elementoMensaje = document.createElement("div")
            elementoMensaje.style.display = "none"

            let mensaje = buscarFigus("baseMundial", figusBDD, getAlbum.bdd, "ONLINE", pregunta.text.toUpperCase());


            const escribirRespuesta = document.createElement("textarea")
            const responder = document.createElement("button")
            responder.textContent = "Responder"
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

                        elementoMensaje.appendChild(responder)

                        const datosRespuesta = {
                            elementPregunta, idPregunta: pregunta.id, valorMensaje: mensajeModificable.value, vendedor: pregunta.seller_id
                        }
                        responder.addEventListener("click", async () => {
                            responderPregunta(datosRespuesta)
                        }
                        )


                    } else {

                        escribirRespuesta.placeholder = "Escribir respuesta"
                        elementoMensaje.append(escribirRespuesta)
                        elementoMensaje.appendChild(responder)
                        
                        escribirRespuesta.style.width = "100%";
                        escribirRespuesta.style.minHeight = "15vh";

                        responder.addEventListener("click", async () => {
                            const datosRespuesta = {
                            elementPregunta, idPregunta: pregunta.id, valorMensaje: escribirRespuesta.value, vendedor: pregunta.seller_id
                        }
                            responderPregunta(datosRespuesta)
                        }
                        )
                        elementoMensaje.style.display = "";
                    }

                } else {
                    elementoMensaje.innerHTML = "Sin Mensaje";
                }

            })

            valorVenta.placeholder = "Ingrese Precio Venta"
            valorVenta.type = "number";

            const fecha = new Date();

            fecha.setHours(fecha.getHours() + 2);

            const hora = fecha.toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });

            const ahora = new Date();

            const dia = fecha.toDateString() === ahora.toDateString()
                ? "hoy"
                : "mañana";

            const precioMensaje = document.createElement("div");


            botonVenta.addEventListener("click", async () => {
                elementResponder.append(valorVenta, precioMensaje, botonConfirmarVenta)
            })

            valorVenta.addEventListener("input", () => {
                precioMensaje.style.whiteSpace = "pre-line";
                precioMensaje.textContent = `Perfecto! Ya actualicé el precio de esta publicación a $${valorVenta.value} para que realices la compra desde este mismo link. \nEl precio estará disponible hasta las ${hora} hs de ${dia}. Si al momento de comprar ves un precio diferente, avisame y lo actualizo nuevamente.\n ¡Gracias!`;
            });

            botonConfirmarVenta.addEventListener("click", async () => {

                    try {
                    const peticion = await fetch(`${api}/mercadolibre/publicaciones/precio/${pregunta.item_id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            precio: valorVenta.value,
                            vendedor: pregunta.seller_id,
                            actualizacionFecha: fecha
                        })
                    })

                    if (!peticion.ok) {
                        throw new Error("Error respondiendo");
                    }
                    console.log("Respondida correctamente")

                    
                        const datosRespuesta = {
                        elementPregunta, idPregunta: pregunta.id, valorMensaje: precioMensaje.textContent, vendedor: pregunta.seller_id
                    }

                    responderPregunta(datosRespuesta)

                    } catch (error) {
                        console.error("No se pudo responder",error)
                    }
                                  
            })


            idPregunta.textContent = `pregunta id : ${pregunta.id}`
            sellerid.textContent = `seller : ${pregunta.seller_id}`
            publicacionMeli.textContent = `${getAlbum.album}`
            elementLeftPregunta.append(imgPublicacion)
            elementRigthPregunta.append(fechaPregunta, tituloPublicacion, publicacionMeli, idPregunta, sellerid, idCliente)
            elementDownPregunta.append(elementHist, preguntaMeli, elementResponder)
            elementDownPregunta.appendChild(elementoMensaje)
            fechaPregunta.style.backgroundColor = "rgba(111, 225, 215, 0.69)"
            preguntaMeli.style.backgroundColor = "rgba(201, 239, 236, 0.69)"
            elementLeftPregunta.style.display = "flex"
            elementLeftPregunta.style.alignItems = "center"
            elementLeftPregunta.style.justifyContent = "center"
            elementLeftPregunta.style.width = "10vw"

            const elementDataPregunta = document.createElement("div")
            elementDataPregunta.style.width = "100%"
            elementRigthPregunta.style.flex = "1";


            elementDataPregunta.append(elementLeftPregunta, elementRigthPregunta)
            elementDataPregunta.style.display = "flex"
            elementDataPregunta.style.flexDirection = "row"

            elementPregunta.append(elementDataPregunta, elementDownPregunta)
            elementPregunta.style.border = "solid black 1px"
            elementPregunta.style.marginBottom = "50px"

            elementoRespuesta.append(elementPregunta)

        }
    }
}