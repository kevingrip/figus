import { precioArgentino } from "../../utilidades/conversionesArg.js"
import { crearTarjetaVenta } from "./interfazVenta.js"

export const pageTotalVentas=(ventas)=>{
    const getElementVentas = document.getElementById("todaslasventas")
    getElementVentas.innerHTML=""
    for (const venta of ventas){
        const tarjeta = crearTarjetaVenta(venta)
        getElementVentas.append(tarjeta)
    }
}

export const pageTotalVendedores = (listaVendedores) =>{
    const getElementVendedores = document.getElementById("elementBotonesVendedores")
    const elementVendedores = document.createElement("div")

    getElementVendedores.style.display="flex"
    getElementVendedores.style.flexDirection="row"
    getElementVendedores.style.justifyContent="center"
    getElementVendedores.style.alignItems="center"

    listaVendedores.forEach(vendedor => {
        const botonVendedor = document.createElement("button")
        botonVendedor.textContent=vendedor
        botonVendedor.value=vendedor
        elementVendedores.append(botonVendedor)
        if (vendedor==="MATI"){
            botonVendedor.id="botonMati"
        }else if (vendedor==="KEVIN"){
            botonVendedor.id="botonKevin"
        }
    });
    getElementVendedores.append(elementVendedores)
    return elementVendedores
}

export const elementNetoUsuario = (usuario,monto_neto) => {
    const bloqueNetos = document.getElementById("elementNetoVendedores")
    bloqueNetos.innerHTML = ""
    const elementGeneral = document.createElement("div")
    elementGeneral.style.backgroundColor = "white"
    elementGeneral.style.display = "flex"
    elementGeneral.style.flexDirection = "column"
    elementGeneral.style.alignItems = "center"    
    elementGeneral.textContent = `Importe Neto ${usuario}: ${precioArgentino(monto_neto)}`
    bloqueNetos.append(elementGeneral)

}