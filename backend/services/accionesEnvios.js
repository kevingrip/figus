import { modeloEnvios } from "../models/modeloEnvios.js"

export const getEnvios = async () => {
    const modelo = modeloEnvios()
    const envios = await modelo.find();    
    return envios
}

export const confirmarPago = async (venta_id,usuario)=>{
    const envios = await getEnvios()
    const venta = envios.find(envio=>envio.ventaid===Number(venta_id))
    if (!venta) {
        throw new Error(`No se encontró el envío ${venta_id}`);
    }
    venta.pagar=true
    venta.usuario_pagador=usuario
    await venta.save()
}