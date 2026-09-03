import { getStockProveedores } from "../../utilidades/stockTotal.js"

export const precioBarato = (figu) => {
    const tipo = figu.TIPO
    const cantidad = getStockProveedores(figu)
    console.log(cantidad)
    if (tipo == "COMUNES") {
        if (cantidad===1){
            return 1500
        }else if (cantidad===2){
            return 1000
        } else{
            return 500
        }
        
    } else if (tipo == "EQUIPO") {
        if (cantidad===1){
            return 1800
        }else if (cantidad===2){
            return 1300
        } else{
            return 800
        }
        
    } else if (tipo == "AFA") {
        if (cantidad===1){
            return 5000
        }else if (cantidad===2){
            return 4000
        } else{
            return 3000
        }
        
    } else if (tipo == "ESCUDO AFA") {
        if (cantidad===1){
            return 6000
        }else if (cantidad===2){
            return 5000
        } else{
            return 4000
        }
    } else if (tipo == "FWC") {
        if (cantidad===1){
            return 6000
        }else if (cantidad===2){
            return 5000
        } else{
            return 4000
        }
    } else if (tipo == "ESCUDO") {
        if (cantidad===1){
            return 5000
        }else if (cantidad===2){
            return 3500
        } else{
            return 2500
        }
    } else if (tipo == "MESSI") {
        return 35000
    } else if (tipo == "ESPECIAL") {
        if (cantidad===1){
            return 10000
        }else if (cantidad===2){
            return 8000
        } else{
            return 6000
        }
    }
}