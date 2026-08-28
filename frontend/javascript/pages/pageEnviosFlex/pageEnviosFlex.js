import { crearContenedorDatosTransporte, crearContenedorEnvios, crearContenedorNetos, crearContenedorBotonesTransportistas } from "./crearContenedores.js"

export const pageEnviosFlex = async (envios, vendedores, transportistas) => {

    const getElementResumen = document.getElementById("resumenPrecioVentaFlex")
    const getElementVentas = document.getElementById("totalVentasFlex")
    const contenedorResumenNeto = await crearContenedorNetos()

    const { contenedorTransportistas, botonesTransportistas } = crearContenedorBotonesTransportistas(transportistas)
    getElementResumen.append(contenedorResumenNeto, contenedorTransportistas)

    let transportistaSeleccionado = "TODAS"
    botonesTransportistas.forEach(boton => {
        boton.style.backgroundColor = "white"
        boton.addEventListener("click", () => {
            botonesTransportistas.forEach(boton=>boton.style.backgroundColor="white")
            boton.style.backgroundColor = "violet"
            transportistaSeleccionado = boton.textContent
            const envios_filtrados = envios.filter(orden => orden.envio && (transportistaSeleccionado != "TODAS" ? (orden.envio.envio === transportistaSeleccionado) : true));

            getElementVentas.innerHTML = ""
            const datosTransporte = crearContenedorDatosTransporte(envios_filtrados)
            getElementVentas.append(datosTransporte)

            envios_filtrados.forEach(orden => {
                const contenedorOrden = crearContenedorEnvios(orden, vendedores)
                getElementVentas.append(contenedorOrden)
            });
        })
        if (boton.textContent==="TODAS") {
            boton.click()
        }else{
            
        }
        
    })



}

