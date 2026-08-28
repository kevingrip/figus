import { envioPagado, obtenerTotalNeto } from "../../../servicios/api.js"
import { fechaArgentina, precioArgentino } from "../../../utilidades/conversionesArg.js"

export const datosEnvio = (contenedor, envio) => {
    if (envio) {
        const elementGeneral = document.createElement("div")
        const elementData = document.createElement("div")
        const elementTransportista = document.createElement("div")
        const elementFechaEntrega = document.createElement("div")
        const elementCuenta = document.createElement("div")
        const elementZona = document.createElement("div")

        elementGeneral.style.display = "flex";
        elementGeneral.style.flexDirection = "column";
        elementGeneral.style.height = "100%";
        
        elementTransportista.textContent = `Transportista: ${envio.envio}`
        elementFechaEntrega.textContent = `Fecha Entrega: ${fechaArgentina(envio.fechaEntrega)}`
        elementCuenta.textContent = `Cuenta ML: ${envio.seller}`
        elementZona.textContent = `Zona: ${envio.zona}`

        elementData.style.margin = "10px"
        elementTransportista.style.margin = "10px"
        elementTransportista.style.alignContent = "end"
        elementData.style.flex = "1";
        elementTransportista.style.flex = "1";

        elementData.append(elementCuenta, elementFechaEntrega,elementZona)
        elementGeneral.append(elementData, elementTransportista)
        

        contenedor.append(elementGeneral)
    }

}