import { crearContenedorDatosTransporte, crearContenedorEnvios, crearContenedorNetos, crearContenedorBotonesTransportistas, getNumeroSemana } from "./crearContenedores.js"

export const pageEnviosFlex = async (envios, vendedores, transportistas) => {

    const getElementResumen = document.getElementById("resumenPrecioVentaFlex")
    const getElementDatosPago = document.getElementById("resumenPagosFlex")
    const getElementVentas = document.getElementById("totalVentasFlex")
    const contenedorResumenNeto = await crearContenedorNetos()

    const { contenedorTransportistas, botonesTransportistas } = crearContenedorBotonesTransportistas(transportistas)
    getElementResumen.append(contenedorResumenNeto, contenedorTransportistas)

    let transportistaSeleccionado = "TODAS"
    botonesTransportistas.forEach(boton => {
        boton.style.backgroundColor = "white"
        boton.addEventListener("click", () => {
            botonesTransportistas.forEach(boton => boton.style.backgroundColor = "white")
            boton.style.backgroundColor = "violet"
            transportistaSeleccionado = boton.textContent
            const envios_filtrados = envios.filter(orden => transportistaSeleccionado === "TODAS"
                ? true
                : orden.envio?.envio === transportistaSeleccionado);

            getElementVentas.innerHTML = ""
            getElementDatosPago.innerHTML = ""
            const datosTransporte = crearContenedorDatosTransporte(envios_filtrados)
            getElementDatosPago.append(datosTransporte)
            getElementVentas.append(barraTitulos())
            getElementVentas.style.border="2px solid black"

            let semanaActual=1000;
            
            envios_filtrados.forEach(orden => {
                let cambioSemana = false;
                const elegirFecha = orden?.envio?.fechaEntrega || orden?.venta?.DIA
                const fechaDeEntrega = elegirFecha ? new Date(elegirFecha) : null
                let numeroSemana = getNumeroSemana(fechaDeEntrega)
                if(numeroSemana<semanaActual){
                    semanaActual=numeroSemana
                    cambioSemana=true
                }
                console.log(numeroSemana,fechaDeEntrega, semanaActual,cambioSemana)

                const contenedorOrden  = crearContenedorEnvios(orden, vendedores, fechaDeEntrega,cambioSemana)
                getElementVentas.append(contenedorOrden)
            });
        })
        if (boton.textContent === "TODAS") {
            boton.click()
        }
    })

}

const barraTitulos = () => {
    const barra = document.createElement("div")

    const semana = document.createElement("div")
    const mes = document.createElement("div")
    const dia = document.createElement("div")
    const fecha = document.createElement("div")
    const cuenta = document.createElement("div")
    const ventaid = document.createElement("div")
    const producto = document.createElement("div")
    const zona = document.createElement("div")
    const transportista = document.createElement("div")
    const pagador = document.createElement("div")
    const importe = document.createElement("div")

    semana.textContent = "SEMANA"
    mes.textContent = "MES"
    dia.textContent = "DIA"
    fecha.textContent = "FECHA"
    cuenta.textContent = "CUENTA VENTA"
    ventaid.textContent = "VENTAID"
    producto.textContent = "PRODUCTO"
    zona.textContent = "ZONA"
    transportista.textContent = "TRANSPORTISTA"
    pagador.textContent = "PAGADO POR"
    importe.textContent = "IMPORTE"
    const elementos = [semana, mes, dia, fecha, cuenta, ventaid, producto, zona, transportista, pagador, importe]
    barra.append(...elementos)

    elementos.forEach(elem => {
        elem.style.flex = "1"
        elem.style.overflow = "hidden"
        elem.style.textOverflow = "ellipsis"
        elem.style.whiteSpace = "nowrap"
        elem.style.border = "0.5px solid black"
        elem.style.textAlign = "center"
        elem.style.fontSize = "1vw"
        elem.style.fontWeight = "bold"
        elem.style.background = "#cca5d1b5"
    })
    barra.style.display = "flex"
    barra.style.flexDirection = "row"

    return barra
}