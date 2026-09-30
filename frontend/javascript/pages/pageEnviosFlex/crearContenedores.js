import { envioPagado, obtenerTotalNeto } from "../../servicios/api.js"
import { fechaArgentina, precioArgentino } from "../../utilidades/conversionesArg.js"
import { datosEnvio } from "./datos/datosEnvio.js"
import { datosVenta } from "./datos/datosVenta.js"
import { estiloContenedorHijo, estiloContenedorPrincipal, estiloFlex, estiloNombreProducto, radioContenedor } from "./estilos.js"

export const getNumeroSemana = (fecha) => {
    const fechaClon = new Date(fecha.getTime());
    fechaClon.setDate(fechaClon.getDate() + 4 - (fechaClon.getDay() || 7));
    const inicioAnio = new Date(fechaClon.getFullYear(), 0, 1);
    const diasTranscurridos = Math.ceil((fechaClon - inicioAnio) / 86400000);

    return Math.ceil(diasTranscurridos / 7);
}

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

export const crearContenedorEnvios = (orden, vendedores, fechaEntrega, cambioSemana) => {
    const contenedorPrincipal = document.createElement("div")
    if (cambioSemana){
        contenedorPrincipal.style.borderTop="3px solid #0a7800c4"
    }
    const mes = document.createElement("div")
    const dia = document.createElement("div")
    const fecha = document.createElement("div")
    let transportista = document.createElement("div")
    let asignarPago = document.createElement("div")
    const ventaid = document.createElement("div")
    const cuenta = document.createElement("div")
    const zona = document.createElement("div")
    const producto = document.createElement("div")
    const monto = document.createElement("div")
    const numeroSemana = document.createElement("div")
    
    mes.textContent = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaEntrega)
    dia.textContent = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(fechaEntrega)
    fecha.textContent = `${fechaArgentina(fechaEntrega).match(/\d{1,2}\/\d{1,2}\/\d{4}/)}`
    numeroSemana.textContent= getNumeroSemana(fechaEntrega)
    transportista.textContent = orden?.envio?.envio || "Sin dato"
    ventaid.textContent = orden?.envio?.ventaid || orden?.venta?.VENTAID || "Sin dato"
    cuenta.textContent = orden?.envio?.seller || orden?.venta?.CUENTA
    zona.textContent = orden?.envio?.zona || "Sin dato"
    producto.textContent = (orden?.envio?.producto.includes("Figurita")) ? "Panini" : orden?.envio?.producto || "Sin dato"
    datosPago(asignarPago, monto, orden?.envio, vendedores)

    const elementos = [numeroSemana, mes, dia, fecha, cuenta, ventaid, producto, zona, transportista, asignarPago, monto]

    // Aplicamos ancho igualitario y seguridad visual a cada columna
    elementos.forEach(el => {
        el.style.flex = "1"
        el.style.overflow = "hidden"
        el.style.textOverflow = "ellipsis"
        el.style.whiteSpace = "nowrap"
        el.style.border = "0.5px solid rgba(0, 0, 0, 0.1)"
        el.style.textAlign = "center"        
        if(el===ventaid){
            el.style.fontSize = "0.9vw"
        }else{
            el.style.fontSize = "1vw"
        }
    })

    if (orden?.envio?.pagar) {
        contenedorPrincipal.style.backgroundColor = "lightgreen"
    }

    contenedorPrincipal.append(...elementos)


    contenedorPrincipal.style.display = "flex"
    contenedorPrincipal.style.flexDirection = "row"


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
    estiloFlex(elementGeneral, "row", "jc-sp-ev", "100%")
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


const datosPago = (asignacionPago, monto, envio, vendedores) => {
    if (envio) {
        let elementGeneral = document.createElement("div")
        monto.textContent = precioArgentino(envio.pago)

        if (envio.pagar) {
            asignacionPago.textContent = envio?.usuario_pagador
        } else {
            const { botonesPago } = crearAsignacionPago(envio, vendedores, asignacionPago)

            elementGeneral.append(botonesPago)
            asignacionPago.append(elementGeneral)
        }

    }
}

const crearAsignacionPago = (envio, vendedores, asignacionPago) => {
    const botonesPago = document.createElement("div")
    botonesPago.style.backgroundColor = "#ff7c10"
    const botonPagar = document.createElement("button")
    botonesPago.append(botonPagar)
    botonPagar.textContent = "ASIGNAR PAGO"
    botonPagar.addEventListener("click", () => {
        if (botonesPago.children.length > vendedores.length) return;
        const elementBotonesVendedores = document.createElement("div")
        elementBotonesVendedores.style.display = "flex"
        elementBotonesVendedores.style.flexDirection = "column"
        botonPagar.style.display = "none"
        for (const vendedor of vendedores) {
            const botonVendedor = document.createElement("button")
            botonVendedor.style.backgroundColor = "#ff7c10"
            botonVendedor.textContent = vendedor
            elementBotonesVendedores.append(botonVendedor)
            botonesPago.append(elementBotonesVendedores)
            botonVendedor.addEventListener("click", async () => {
                try {
                    await envioPagado(envio.ventaid, vendedor)
                    envio.pagar = true
                    envio.usuario_pagador = vendedor
                    asignacionPago.innerHTML = ''
                    asignacionPago.textContent = vendedor
                } catch (error) {
                    console.error("Error asignando pago:", error);
                }
            })
        }
    })

    return { botonesPago }
}