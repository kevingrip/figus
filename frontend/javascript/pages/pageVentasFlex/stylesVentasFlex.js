import { envioPagado } from "../../servicios/api.js"
import { fechaArgentina, precioArgentino } from "../../utilidades/conversionesArg.js"

const radioContenedor = (contenedor, lugar) => {
    if (lugar === "izq") {
        contenedor.style.borderTopLeftRadius = "30px"
        contenedor.style.borderBottomLeftRadius = "30px"
    }
    else if (lugar === "der") {
        contenedor.style.borderTopRightRadius = "30px"
        contenedor.style.borderBottomRightRadius = "30px"
    } else {
        contenedor.style.borderRadius = "30px"
    }
}

const estiloContenedorPrincipal = (contenedor) => {
    contenedor.style.width = "auto"
    contenedor.style.height = "30vh"
    contenedor.style.margin = "30px"
    radioContenedor(contenedor, null)
    contenedor.style.display = "flex"
    contenedor.style.flexDirection = "row"
    contenedor.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
}

const estiloContenedorHijo = (contenedor) => {
    contenedor.style.flex = "1";
    contenedor.style.height = "auto";
    contenedor.style.border = "1px solid black"
    contenedor.style.backgroundColor = "white"
}

const datosVenta = (contenedor, venta) => {
    const elementGeneral = document.createElement("div")
    elementGeneral.style.margin = "10px"

    const elementVentaId = document.createElement("div")
    elementVentaId.textContent = venta.VENTAID

    const elementCuenta = document.createElement("div")
    elementCuenta.textContent = venta.CUENTA

    const elementDia = document.createElement("div")
    elementDia.textContent = fechaArgentina(venta.DIA)

    const elementEnvio = document.createElement("div")
    elementEnvio.textContent = venta.ENVIO

    elementGeneral.append(elementVentaId, elementCuenta, elementDia, elementEnvio)

    contenedor.append(elementGeneral)
}

const datosEnvio = (contenedor, envio) => {
    if (envio) {
        const elementGeneral = document.createElement("div")
        elementGeneral.style.margin = "10px"

        const elementVentaId = document.createElement("div")
        elementVentaId.textContent = envio.ventaid

        const elementTransportista = document.createElement("div")
        elementTransportista.textContent = envio.envio

        const elementFechaEntrega = document.createElement("div")
        elementFechaEntrega.textContent = fechaArgentina(envio.fechaEntrega)

        const elementCuenta = document.createElement("div")
        elementCuenta.textContent = envio.seller

        const elementProducto = document.createElement("div")
        elementProducto.textContent = envio.producto

        const elementZona = document.createElement("div")
        elementZona.textContent = envio.zona

        elementGeneral.append(elementVentaId, elementCuenta, elementFechaEntrega, elementTransportista, elementZona, elementProducto)

        contenedor.append(elementGeneral)
    }

}

const datosPago = (contenedor, envio, vendedores) => {
    if (envio) {
        const elementGeneral = document.createElement("div")
        elementGeneral.style.margin = "10px"

        const mostrarPago = (vendedor) =>{
            const pagado = document.createElement("div")
            const monto = document.createElement("div")
            elementGeneral.innerHTML=""
            pagado.textContent = `${vendedor} => ${envio.envio}`
            monto.textContent = `${precioArgentino(envio.pago)}`
            elementGeneral.append(pagado,monto)
            contenedor.style.backgroundColor="lightgreen"
            contenedor.style.display="flex"
            contenedor.style.justifyContent= "center"
            contenedor.style.alignItems= "center"
            pagado.style.fontSize="1vw"
            monto.style.fontSize="1vw"
        }

        if (envio.pagar) {
            
            mostrarPago(envio.usuario_pagador)

        } else {
            const botonesPago = document.createElement("div")
            const montoAPagar = document.createElement("div")
            montoAPagar.textContent=`Costo Envio: ${precioArgentino(envio.pago)}`
            botonesPago.style.display = "flex"
            botonesPago.style.flexDirection = "column"
            const botonPagar = document.createElement("button")
            botonesPago.append(botonPagar)
            botonPagar.textContent = "ASIGNAR PAGO FLEX"
            botonPagar.addEventListener("click", () => {
                for (const vendedor of vendedores) {
                    const botonVendedor = document.createElement("button")
                    botonVendedor.textContent = vendedor
                    botonesPago.append(botonVendedor)
                    botonVendedor.addEventListener("click", async () => {
                        try {
                            await envioPagado(envio.ventaid, vendedor)
                            envio.pagar = true
                            envio.usuario_pagador = vendedor
                            mostrarPago(vendedor)
                        } catch (error) {
                            console.error("Error asignando pago:", error);
                        }
                    })
                }
            })

            elementGeneral.append(montoAPagar,botonesPago)
        }

        contenedor.append(elementGeneral)
    }
}

export const crearContenedorResumen = (kevin, mati) => {
    const contenedorGeneral = document.createElement("div")
    const contenedorNetoKevin = document.createElement("div")
    const contenedorNetoMati = document.createElement("div")
    contenedorNetoKevin.textContent = `Importe Neto Kevin: ${precioArgentino(kevin)}`
    contenedorNetoMati.textContent = `Importe Neto Mati: ${precioArgentino(mati)}`


    contenedorGeneral.append(contenedorNetoKevin, contenedorNetoMati)
    return contenedorGeneral
}

export const crearContenedor = (orden, vendedores) => {
    console.log(orden)
    const contenedorPrincipal = document.createElement("div")
    estiloContenedorPrincipal(contenedorPrincipal)

    const contenedorDatosVenta = document.createElement("div")
    const contenedorDatosEnvio = document.createElement("div")
    const contenedorPago = document.createElement("div")

    estiloContenedorHijo(contenedorDatosVenta)
    radioContenedor(contenedorDatosVenta, "izq")
    datosVenta(contenedorDatosVenta, orden.venta)

    estiloContenedorHijo(contenedorDatosEnvio)
    datosEnvio(contenedorDatosEnvio, orden.envio)

    estiloContenedorHijo(contenedorPago)
    radioContenedor(contenedorPago, "der")
    datosPago(contenedorPago, orden.envio, vendedores)

    contenedorPrincipal.append(contenedorDatosVenta, contenedorDatosEnvio, contenedorPago)

    return contenedorPrincipal

}