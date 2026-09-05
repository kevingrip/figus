import { Gasto } from "../models/modeloGastos.js"

export const getGastos = async () =>{
    const gastos = await Gasto.find()
    return gastos
}

export const crearGasto = async(datos)=>{
    const nuevoGasto = await Gasto.create({
                DESCRIPCION: datos.DESCRIPCION,
                FECHA: new Date(),
                CUENTA: datos.CUENTA,
                MONTO: datos.MONTO
            })
    return nuevoGasto
}