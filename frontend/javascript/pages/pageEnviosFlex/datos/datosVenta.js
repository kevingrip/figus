import { envioPagado, obtenerTotalNeto } from "../../../servicios/api.js"
import { fechaArgentina, precioArgentino } from "../../../utilidades/conversionesArg.js"

export const datosVenta = (contenedor, venta, envio) => {
    const elementGeneral = document.createElement("div")
    const elementVentaId = document.createElement("div")
    const elementCuenta = document.createElement("div")
    const elementDia = document.createElement("div")
    const elementEnvio = document.createElement("div")

    elementGeneral.style.margin = "10px"

    elementVentaId.textContent = venta.VENTAID
    elementCuenta.textContent = `Cuenta: ${venta.CUENTA}`
    elementDia.textContent = `Fecha Venta: ${fechaArgentina(venta.DIA)}`
    elementEnvio.textContent = venta.ENVIO
    
    elementGeneral.append(elementVentaId, elementDia, elementCuenta, elementEnvio)

    contenedor.append(elementGeneral)
}