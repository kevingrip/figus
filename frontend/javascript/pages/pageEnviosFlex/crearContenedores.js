import { obtenerTotalNeto } from "../../servicios/api.js"
import { precioArgentino } from "../../utilidades/conversionesArg.js"
import { datosEnvio } from "./datos/datosEnvio.js"
import { datosPago } from "./datos/datosPago.js"
import { datosVenta } from "./datos/datosVenta.js"
import { estiloContenedorHijo, estiloContenedorPrincipal, estiloFlex, estiloNombreProducto, radioContenedor } from "./estilos.js"

export const crearContenedorNetos = async () => {
    const netoKevin = await obtenerTotalNeto("KEVIN")
    const netoMati = await obtenerTotalNeto("MATI")
    const contenedorGeneral = document.createElement("div")
    const contenedorNetoKevin = document.createElement("h3")
    const contenedorNetoMati = document.createElement("h3")
    contenedorNetoKevin.style.margin = "0"
    contenedorNetoMati.style.margin = "0"
    contenedorNetoKevin.style.width = "30vw"
    contenedorNetoMati.style.width = "30vw"
    contenedorNetoKevin.id = "contenedorNetoKevin"
    contenedorNetoMati.id = "contenedorNetoMati"
    contenedorNetoKevin.textContent = `Importe Neto Kevin: ${precioArgentino(netoKevin)}`
    contenedorNetoMati.textContent = `Importe Neto Mati: ${precioArgentino(netoMati)}`

    contenedorGeneral.append(contenedorNetoKevin, contenedorNetoMati)
    estiloFlex(contenedorGeneral, "column", "jcc", "100%")
    return contenedorGeneral
}

export const crearContenedorEnvios = (orden, vendedores) => {
    const contenedorPrincipal = document.createElement("div")
    contenedorPrincipal.style.margin = "30px"

    const contenedorDatos = document.createElement("div")
    const contenedorProducto = document.createElement("h4")

    estiloContenedorPrincipal(contenedorDatos)
    contenedorProducto.textContent = orden?.venta?.PRODUCTO || "Sin Dato"
    estiloNombreProducto(contenedorProducto, orden)

    const contenedorDatosVenta = document.createElement("div")
    const contenedorDatosEnvio = document.createElement("div")
    const contenedorPago = document.createElement("div")

    estiloContenedorHijo(contenedorDatosVenta)
    radioContenedor(contenedorDatosVenta, "izq", "abajo")
    datosVenta(contenedorDatosVenta, orden.venta, orden.envio)

    estiloContenedorHijo(contenedorDatosEnvio)
    datosEnvio(contenedorDatosEnvio, orden.envio)

    estiloContenedorHijo(contenedorPago)
    radioContenedor(contenedorPago, "der", "abajo")
    datosPago(contenedorPago, orden.envio, vendedores)

    contenedorDatos.append(contenedorDatosVenta, contenedorDatosEnvio, contenedorPago)
    contenedorPrincipal.append(contenedorProducto, contenedorDatos)

    return contenedorPrincipal

}

export const crearContenedorBotonesTransportistas = (transportistas) => {
    transportistas.push("TODAS")
    const elementGeneral = document.createElement("div")
    estiloFlex(elementGeneral, "row", "jcc", "100%")
    const botonesTransportistas = []
    transportistas.forEach(transportista => {
        const botonTransportista = document.createElement("button")
        botonTransportista.textContent = transportista
        botonesTransportistas.push(botonTransportista)
        elementGeneral.append(botonTransportista)
    });

    return { contenedorTransportistas: elementGeneral, botonesTransportistas }
}

export const crearContenedorDatosTransporte = (envios_filtrados) => {
    const elementGeneral = document.createElement("div")
    estiloFlex(elementGeneral,"row","jc-sp-ev","100%")
    const cantEnvios = document.createElement("div")
    const cantEnviosPagados = document.createElement("div")
    const montoSinPagar = document.createElement("div")
    const cantTotal = envios_filtrados.length
    const cantPagados = envios_filtrados.filter(orden => orden.envio && orden.envio.pagar === true).length
    const totalSinPagar =
        envios_filtrados.filter(orden => orden.envio && orden.envio.pagar === false)
            .reduce((acumulador, orden) => acumulador + (orden.envio.pago || 0), 0);

    cantEnvios.textContent = `CANT ENVIOS: ${cantTotal}`
    cantEnviosPagados.textContent = `CANT PAGADOS: ${cantPagados}`
    montoSinPagar.textContent = `A PAGAR: ${precioArgentino(totalSinPagar)}`
    elementGeneral.append(cantEnvios, cantEnviosPagados, montoSinPagar)
    return elementGeneral
}