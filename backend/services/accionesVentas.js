import modeloVenta from "../models/modeloVenta.js";
import { getEnvios } from "./accionesEnvios.js";

export const getVentas = async () =>{
    const ventas = await modeloVenta.find()
    return ventas
}

export const totalNetoUsuario = async(usuario) =>{
    const ventas = await getVentas()
    const ventasUsuario = ventas.filter(venta=>venta.CUENTA===usuario)
    const enviosPagados = await getEnvios()
    const enviosPagadosUsuario = enviosPagados.filter(envio=>envio.usuario_pagador===usuario)

    const montoEnviosPagos = enviosPagadosUsuario.reduce(
        (total,envio) => total+ (envio.pago ?? 0),0
    )
    const montoTotalNeto = ventasUsuario.reduce(
        (total, venta) => total + (venta.IMPORTE_NETO ?? 0),0
    )
    return montoTotalNeto-montoEnviosPagos
}

export const totalVendedoresVentas = async () =>{
    const ventas = await getVentas()
    const vendedores_filtrados = ventas.filter(venta=>!["LULY","ARI"].includes(venta.CUENTA))
    
    const vendedores = [
        ...new Set(vendedores_filtrados.map(venta => venta.CUENTA))
    ];
    return vendedores;
}

// export const totalImporteUsuario = async(usuario) =>{
//     const ventas = await getVentas()
//     const ventasUsuario = ventas.filter(venta=>venta.CUENTA===usuario)
//     const montoTotalNeto = ventasUsuario.reduce(
//         (total, venta) => total + (venta.IMPORTE_NETO ?? 0),0
//     )
//     return montoTotalNeto
// }