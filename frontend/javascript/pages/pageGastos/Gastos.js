import { agregarGastosHistoricos, agregarItemGasto, agregarItemsNeto, datosFormulario } from "./interfaz.js"

export const gastos = (netos, gastosHist) => {

    
    const bloqueItems = document.getElementById("itemGastos")

    agregarItemsNeto(netos)

    datosFormulario((nuevoGasto)=>{
        const elementNuevoGasto = agregarItemGasto(nuevoGasto)
        bloqueItems.prepend(elementNuevoGasto)
    })

    const gastosHistoricos = agregarGastosHistoricos(gastosHist)
    bloqueItems.append(gastosHistoricos)
}
