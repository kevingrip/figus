import axios from "axios";
import modeloVenta from "../models/modeloVenta.js";
import { getEnvios } from "./accionesEnvios.js";
import { obtenerToken } from "./token/obtenerToken.js";
import { nombreSeller } from "../utilidades/nombres.js";

export const getVentas = async () => {
    const ventas = await modeloVenta.find().sort({ DIA: -1 }).lean();
    return ventas
}

export const getVentasML = async () => {

    const tokens = await obtenerToken();

    let ordenes = [];

    for (const token of tokens) {

        try {

            const respuesta = await axios.get(
                "https://api.mercadolibre.com/orders/search",
                {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`
                    },
                    params: {
                        seller: token.seller,
                        sort: "date_desc",
                        limit: 50,
                        "order.date_created.from": "2026-07-14T00:00:00.000-03:00"
                    }
                }
            );

            ordenes.push(...respuesta.data.results);

        } catch (error) {

            console.error(
                `Error obteniendo órdenes del seller ${token.seller}:`,
                error.response?.data || error.message
            );
        }
    }

    // Ordenar todas las órdenes juntas
    ordenes.sort((a, b) => {
        return new Date(b.date_created) - new Date(a.date_created);
    });

    const ordenes_data = []

    ordenes.forEach(orden => {
        orden.payments.forEach(data => {

            const venta = {
                order_id: data.order_id,
                pack_id: orden.pack_id,
                total_paid_amount: data.total_paid_amount,
                total_amount: orden.total_amount,
                date_created: orden.date_created,
                shipping_id: orden.shipping.id,
                buyer: orden.buyer.nickname,
                buyer_id: orden.buyer.id,
                seller: orden.seller.id,
                cancel_detail: orden?.cancel_detail?.date,
                nombre: data.reason,
                variante: []
            }
            orden.order_items.forEach(variante => {
                venta.variante.push({ mla: variante.item.id, titulo: variante.item.title, cantidad: variante.quantity, precio: variante.unit_price })
            })

            ordenes_data.push(venta)
        })
    })

    const ordenes_limpias = ordenes_data.map(orden => {
        if (orden.pack_id === null) {
            orden.pack_id = orden.order_id
        }
        const venta_limpia = {
            pack_id: orden.pack_id,
            data: {
                order_id: orden.order_id,
                total_paid_amount: orden.total_paid_amount,
                total_amount: orden.total_amount,
                date_created: orden.date_created,
                shipping_id: orden.shipping_id,
                buyer: orden.buyer,
                buyer_id: orden.buyer_id,
                seller: orden.seller,
                cancel_detail: orden?.cancel_detail,
                nombre: orden.nombre,
                variante: orden.variante
            }
        }
        return venta_limpia;

    })

    const ordenes_mixed = new Map();
    ordenes_limpias.forEach(orden => {

        if (!ordenes_mixed.has(orden.pack_id)) {
            // Primera vez que aparece
            ordenes_mixed.set(orden.pack_id, orden);
        } else {
            // Ya existe ese pack_id
            const ordenExistente = ordenes_mixed.get(orden.pack_id);

            ordenExistente.data.variante.push(
                ...orden.data.variante
            );
        }
    });

    const ordenes_finales = [...ordenes_mixed.values()];

    return ordenes_finales
}

export const getVentasPaginadasML = async () => {

    const tokens = await obtenerToken();

    let ordenes = [];

    for (const token of tokens) {

        try {
            let offset = 0;
            let resultados;


            do {

                const respuesta = await axios.get(
                    "https://api.mercadolibre.com/orders/search",
                    {
                        headers: {
                            Authorization: `Bearer ${token.access_token}`
                        },
                        params: {
                            seller: token.seller,
                            sort: "date_desc",
                            limit: 50,
                            offset,
                            "order.date_created.from": "2026-07-14T00:00:00.000-03:00"
                        }
                    }
                );

                resultados = respuesta.data.results;

                ordenes.push(...resultados);

                offset += 50;

            } while (resultados.length === 50);

        } catch (error) {

            console.error(
                `Error obteniendo órdenes del seller ${token.seller}:`,
                error.response?.data || error.message
            );
        }
    }

    // Ordenar todas las órdenes juntas
    ordenes.sort((a, b) => {
        return new Date(b.date_created) - new Date(a.date_created);
    });

    const ordenes_data = []

    ordenes.forEach(orden => {
        orden.payments.forEach(data => {

            const venta = {
                order_id: data.order_id,
                pack_id: orden.pack_id,
                total_paid_amount: data.total_paid_amount,
                total_amount: orden.total_amount,
                date_created: orden.date_created,
                shipping_id: orden.shipping.id,
                buyer: orden.buyer.nickname,
                buyer_id: orden.buyer.id,
                seller: orden.seller.id,
                cancel_detail: orden?.cancel_detail?.date,
                nombre: data.reason,
                variante: []
            }
            orden.order_items.forEach(variante => {
                venta.variante.push({ mla: variante.item.id, titulo: variante.item.title, cantidad: variante.quantity, precio: variante.unit_price })
            })

            ordenes_data.push(venta)
        })
    })

    const ordenes_limpias = ordenes_data.map(orden => {
        if (orden.pack_id === null) {
            orden.pack_id = orden.order_id
        }
        const venta_limpia = {
            pack_id: orden.pack_id,
            data: {
                order_id: orden.order_id,
                total_paid_amount: orden.total_paid_amount,
                total_amount: orden.total_amount,
                date_created: orden.date_created,
                shipping_id: orden.shipping_id,
                buyer: orden.buyer,
                buyer_id: orden.buyer_id,
                seller: orden.seller,
                cancel_detail: orden?.cancel_detail,
                nombre: orden.nombre,
                variante: orden.variante
            }
        }
        return venta_limpia;

    })

    const ordenes_mixed = new Map();
    ordenes_limpias.forEach(orden => {

        if (!ordenes_mixed.has(orden.pack_id)) {
            // Primera vez que aparece
            ordenes_mixed.set(orden.pack_id, orden);
        } else {
            // Ya existe ese pack_id
            const ordenExistente = ordenes_mixed.get(orden.pack_id);

            ordenExistente.data.variante.push(
                ...orden.data.variante
            );
        }
    });

    const ordenes_finales = [...ordenes_mixed.values()];

    return ordenes_finales
}

export const getVentasFlex = async () => {
    const ventasMDB = await getVentas()
    const ventasML = await getVentasPaginadasML()
    const enviosPagados = await getEnvios()

    const ordenesMDB = ventasMDB.map(venta => {

        const envio = enviosPagados.find(
            envio => envio.ventaid === venta.VENTAID
        );


        if (!envio && venta.ENVIO !== "FLEX") return null;

        return {
            venta,
            envio
        };
    })
        .filter(Boolean);


    const ventasMLObj = ventasML.map(venta => {
        return {
            VENTAID: venta.pack_id,
            PRECIO: venta.data.total_amount,
            ENVIO: "",
            DIA: venta.data.date_created,
            CUENTA: nombreSeller(venta.data.seller),
            PRODUCTO: venta.data.nombre
        }
    })


    const ordenesML = ventasMLObj
        .map(ventaML => {
            const envio = enviosPagados.find(
                envio => envio.ventaid === ventaML.VENTAID
            );

            if (!envio) {
                return null;
            }

            return {
                venta: ventaML,
                envio
            };

        })
        .filter(Boolean);


    // Set, set , hashSet
    const mapaVentas = new Map();    
 
    ordenesMDB.forEach(orden=>{
        mapaVentas.set(orden.venta.VENTAID, orden)
    })
    
    ordenesML.forEach(orden => {
        mapaVentas.set(orden.venta.VENTAID, orden);
    });    

    const ventasFinales = [...mapaVentas.values()];

    return ventasFinales
}

export const totalNetoUsuario = async (usuario) => {
    const ventas = await getVentas()
    const ventasUsuario = ventas.filter(venta => venta.CUENTA === usuario)
    const enviosPagados = await getEnvios()
    const enviosPagadosUsuario = enviosPagados.filter(envio => envio.usuario_pagador === usuario)

    const montoEnviosPagos = enviosPagadosUsuario.reduce(
        (total, envio) => total + (envio.pago ?? 0), 0
    )
    const montoTotalNeto = ventasUsuario.reduce(
        (total, venta) => total + (venta.IMPORTE_NETO ?? 0), 0
    )
    return montoTotalNeto - montoEnviosPagos
}

export const totalVendedoresVentas = async () => {
    const ventas = await getVentas()
    const vendedores_filtrados = ventas.filter(venta => !["LULY", "ARI"].includes(venta.CUENTA))

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