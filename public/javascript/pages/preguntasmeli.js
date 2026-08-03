import { buscarFigus } from "./buscarFigus/buscarFigus.js"
import { obtenerFiguritas } from "../servicios/api.js"

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

    const figusBDD = await obtenerFiguritas("mundialQatar2022")
    for (const pregunta of preguntasRecibidas) {
        if ([13504667520, 13505681239].includes(pregunta.id)) {
            const elementPregunta = document.createElement("div")
            const fechaPregunta = document.createElement("div")
            const preguntaMeli = document.createElement("textarea");
            const publicacionMeli = document.createElement("div")
            const idPregunta = document.createElement("div")
            const sellerid = document.createElement("div")

            fechaPregunta.textContent = pregunta.date_created
            preguntaMeli.value = pregunta.text
            preguntaMeli.style.width = "100%";
            preguntaMeli.style.minHeight = "15vh";

            const elementConsulta = document.createElement("div")
            const botonConsultar = document.createElement("button")
            botonConsultar.textContent = "Consultar"

            const elementoMensaje = document.createElement("div")
            elementoMensaje.style.display = "none"

            let mensaje = buscarFigus("baseMundial", figusBDD, "mundialQatar2022", "ONLINE", pregunta.text);
            mensaje.style.display = "none";

            botonConsultar.addEventListener("click", () => {
                const mensaje = buscarFigus("baseMundial", figusBDD, "mundialQatar2022", "ONLINE", preguntaMeli.value);
                elementoMensaje.innerHTML = "";
                elementoMensaje.appendChild(mensaje);
                elementoMensaje.style.display = "";
            })


            idPregunta.textContent = `pregunta id : ${pregunta.id}`
            sellerid.textContent = `seller : ${pregunta.seller_id}`
            publicacionMeli.textContent = `Publicacion : ${nombrePublicacion(pregunta.item_id)}`
            const entrada = document.createElement("input")
            entrada.style.width = "75vw"
            elementPregunta.append(fechaPregunta, idPregunta, sellerid, publicacionMeli, preguntaMeli, botonConsultar, entrada)
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