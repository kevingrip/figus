import { agregarGastosHistoricos } from "../pageGastos/interfaz.js"
import { estilosBotones } from "./estilosCuenta.js"
import { agregarItemsNeto, agregarMovimientos, crearBotonesUsuarios } from "./interfazCuenta.js"

export const cuentas = (netos, movimientos, gastos) => {

    const bloqueUsuarios = document.getElementById("usuariosCuenta")
    const bloqueItems = document.getElementById("itemCuenta")

    agregarItemsNeto(netos)

    let movimientosHistoricos;
    let gastosHistoricos;

    const botones = crearBotonesUsuarios()    

    botones.forEach(boton => {
        bloqueUsuarios.append(boton)
        estilosBotones(bloqueUsuarios)
        boton.addEventListener("click", () => {
            botones.forEach(boton => {
                boton.style.backgroundColor = ""
            })
            boton.style.backgroundColor = "lightgreen"
            bloqueItems.innerHTML = ""
            const movimientosUsuario = movimientos.filter(item => (item.CUENTA === boton.textContent && item.USUARIO_PAGO == boton.textContent) || (item.CUENTA != boton.textContent && item.USUARIO_PAGO == boton.textContent) || (item.CUENTA == boton.textContent && !item.USUARIO_PAGO))
            const gastosUsuarios = gastos.filter(item => item.CUENTA === boton.textContent)
            gastosHistoricos = agregarGastosHistoricos(gastosUsuarios)
            movimientosHistoricos = agregarMovimientos(movimientosUsuario)
            bloqueItems.append(gastosHistoricos,movimientosHistoricos)
        })
    })
    
    
    gastosHistoricos = agregarGastosHistoricos(gastos)
    movimientosHistoricos = agregarMovimientos(movimientos)
    bloqueItems.append(gastosHistoricos,movimientosHistoricos)
}
