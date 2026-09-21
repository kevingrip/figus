import { modeloEnvios } from "../models/modeloEnvios.js"

export const getEnvios = async () => {
    const modelo = modeloEnvios()
    const envios = await modelo.find();    
    return envios
}

export const getTransportistas = async() =>{
    const enviosPagados = await getEnvios()
    const transportistas = new Set()
    const fechaComienzo = new Date("2026-07-15T00:00:00");

    enviosPagados.forEach(orden=>{
        if (orden.envio && new Date(orden.fechaEntrega)>fechaComienzo){
            transportistas.add(orden.envio)
        }        
    })

    return [...transportistas]
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

export const subirEnvioMDB = async (envio) =>{
    try {
        const modeloEnvio = modeloEnvios();

        const nuevoEnvio = await modeloEnvio.updateOne(
            {ventaid:envio.ventaid},
            {$setOnInsert: envio},
            { upsert: true }
        )

        if (nuevoEnvio.upsertedCount > 0) {
            console.log(`Envío creado exitosamente (ventaid: ${envio.ventaid})`);
            return { creado: true, id: nuevoEnvio.upsertedId };
        } else {
            console.log(`El envío ventaid ${envio.ventaid} ya existe. No se hizo nada.`);
            return { creado: false, mensaje: "Ya existía" };
        }
        
    } catch (error) {
        console.error("No se pudo crear el envio en el backend",error.message)
    }
}