import { envioPagado, obtenerTotalNeto } from "../../../servicios/api.js"
import { fechaArgentina, precioArgentino } from "../../../utilidades/conversionesArg.js"
import { estiloFlex } from "../estilos.js"

export const datosPago = (contenedor, envio, vendedores) => {
    if (envio) {
        const elementGeneral = document.createElement("div")
        elementGeneral.style.margin = "10px"
        contenedor.style.display = "flex"
        contenedor.style.justifyContent = "center"
        contenedor.style.alignItems = "center"

        const mostrarPago = (vendedor) => {
            const pagado = document.createElement("div")
            const monto = document.createElement("div")
            elementGeneral.innerHTML = ""
            pagado.textContent = `${vendedor} => ${envio.envio}`
            monto.textContent = `${precioArgentino(envio.pago)}`
            elementGeneral.append(pagado, monto)
            pagado.style.fontSize = "3vh"
            monto.style.fontSize = "3vh"
        }

        if (envio.pagar) {
            mostrarPago(envio.usuario_pagador)

        } else {
            const {montoAPagar, botonesPago} = crearAsignacionPago(envio, vendedores, mostrarPago)

            elementGeneral.append(montoAPagar, botonesPago)
        }

        contenedor.append(elementGeneral)
    }
}

const crearAsignacionPago = (envio, vendedores, mostrarPago) => {
    const botonesPago = document.createElement("div")
    const montoAPagar = document.createElement("div")
    montoAPagar.textContent = `Costo Envio: ${precioArgentino(envio.pago)}`
    estiloFlex(montoAPagar, null, "jcc")
    botonesPago.style.display = "flex"
    botonesPago.style.flexDirection = "column"
    const botonPagar = document.createElement("button")
    botonesPago.append(botonPagar)
    botonPagar.textContent = "ASIGNAR PAGO"
    botonPagar.style.width = "15vw"
    botonPagar.addEventListener("click", () => {
        if (botonesPago.children.length > vendedores.length) return;
        const elementBotonesVendedores = document.createElement("div")
        for (const vendedor of vendedores) {
            const botonVendedor = document.createElement("button")
            botonVendedor.textContent = vendedor
            elementBotonesVendedores.append(botonVendedor)
            estiloFlex(elementBotonesVendedores, "row", "jc-sp-ev")
            botonesPago.append(elementBotonesVendedores)
            botonVendedor.addEventListener("click", async () => {
                try {
                    await envioPagado(envio.ventaid, vendedor)
                    envio.pagar = true
                    envio.usuario_pagador = vendedor
                    mostrarPago(vendedor)
                    await actualizarNeto()
                } catch (error) {
                    console.error("Error asignando pago:", error);
                }
            })
        }
    })
    return {botonesPago,montoAPagar}
}

const actualizarNeto = async () => {
    const contenedorNetoKevin = document.getElementById("contenedorNetoKevin")
    const contenedorNetoMati = document.getElementById("contenedorNetoMati")
    const netoKevin = await obtenerTotalNeto("KEVIN")
    const netoMati = await obtenerTotalNeto("MATI")
    contenedorNetoKevin.textContent = `Importe Neto Kevin: ${precioArgentino(netoKevin)}`
    contenedorNetoMati.textContent = `Importe Neto Mati: ${precioArgentino(netoMati)}`
}