import axios from "axios";
import modeloVenta from "../models/modeloVenta.js";
import { getEnvios } from "./accionesEnvios.js";
import { obtenerToken } from "./token/obtenerToken.js";
import { nombreSeller } from "../utilidades/nombres.js";
import { activarEstado, estadoPublicacion, getPublicacion, getPublicaciones, modificarPrecio, modificarStock } from "./mercadolibre/publicaciones.js";
import { descontarVentaFiguritasMDB, getAlbumFiguritas } from "./accionesFiguritas.js";
import { obtenerPreguntaMeli } from "../models/preguntasVenta.js";
import { confirmarVenta } from "./accionesPreguntas.js";
import { getGastos } from "./accionesGastos.js";
import { getShipping, objetoShipping } from "./accionesShipping.js";

export const getVentasMDB = async () => {
    const ventas = await modeloVenta.find().sort({ DIA: -1 }).lean();
    return ventas
}

export const getVentasML_datosCompletos = async () => {
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
                            seller: token.seller_id,
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
                `Error obteniendo órdenes del seller ${token.seller_id}:`,
                error.response?.data || error.message
            );
        }
    }
    return ordenes;
}

export const getVentasML = async () => {

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
                            seller: token.seller_id,
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
                `Error obteniendo órdenes del seller ${token.seller_id}:`,
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

        const variantes = orden.order_items.map(variante => ({
            mla: variante.item.id,
            titulo: variante.item.title,
            cantidad: variante.quantity,
            precio: variante.unit_price
        }));

        const venta = {
            order_id: orden.id,
            pack_id: orden.pack_id,
            date_created: orden.date_created,
            shipping_id: orden.shipping.id,
            payment_id: orden.payments[orden.payments.length - 1],
            buyer: orden.buyer.nickname,
            buyer_id: orden.buyer.id,
            seller: orden.seller.id,
            seller_id: orden.seller.nickname,
            cancel_detail: orden?.cancel_detail?.date,
            nombre: orden.order_items[0]?.item?.title,
            cumplido: orden.fulfilled,
            variante: variantes
        }
        ordenes_data.push(venta)

    })

    const ordenes_limpias = ordenes_data.map(orden => {
        if (orden.pack_id === null) {
            orden.pack_id = orden.order_id
        }
        const venta_limpia = {
            pack_id: orden.pack_id,
            data: {
                order_id: orden.order_id,
                date_created: orden.date_created,
                shipping_id: orden.shipping_id,
                buyer: orden.buyer,
                buyer_id: orden.buyer_id,
                seller: orden.seller,
                seller_id: orden.seller_id,
                payment_id: orden.payment_id, // AGREGAR PAYMENT
                cancel_detail: orden?.cancel_detail,
                nombre: orden.nombre,
                cumplido: orden.cumplido,
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

    ordenes_finales.forEach(venta => {
        const costo_total = venta.data?.variante?.reduce((total, variante) => {
            return total + (variante.precio * variante.cantidad);
        }, 0);
        venta.data.total_amount = costo_total
    })

    return ordenes_finales
}

export const getVentasPublicaciones_ML = async () => {
    const [ventasML, publicaciones, figuritasMDB] = await Promise.all([getVentasML(), getPublicaciones(), getAlbumFiguritas("mundialUsa2026")])

    // diccionario mla:figu
    const mla_figurita = new Map(figuritasMDB.filter(figurita => figurita.MLA.length > 0).flatMap(figurita => {
        const mlas = Array.isArray(figurita.MLA) ? figurita.MLA : [figurita.MLA];
        // Devuelve un array de pares [mla, NUM] por cada mla individual
        return mlas.map(mla => [mla, figurita.NUM])
    }));

    for (const venta of ventasML) {
        for (const vendido of venta.data.variante) {
            const publicacionFiltrada = publicaciones.find(item => item.id === vendido.mla)
            vendido.album = publicacionFiltrada?.album
            vendido.figurita = mla_figurita.get(vendido.mla)
            vendido.link = publicacionFiltrada?.permalink
            vendido.imagen = publicacionFiltrada?.thumbnail
        }
    }
    return ventasML
}

const getShippingsFromSeller = (ventasML) => {
    const sellersShippings = new Map();
    ventasML.forEach(venta => {
        const sellerId = venta.data?.seller?.toString();
        const shippingId = venta.data?.shipping_id?.toString();

        if (sellerId && shippingId) {
            if (!sellersShippings.has(sellerId)) {
                sellersShippings.set(sellerId, new Set());
            }
            sellersShippings.get(sellerId).add(shippingId);
        }
    });
    for (const [sellerId, shippingId] of sellersShippings.entries()) {
        sellersShippings.set(sellerId, [...shippingId]);
    }
    return sellersShippings
}

const getPaymentsFromSeller = (ventasML) => {
    const sellersPayments = new Map();
    ventasML.forEach(venta => {
        const sellerId = venta.data?.seller?.toString();
        const paymentId = venta.data?.payment_id?.id?.toString();

        if (sellerId && paymentId) {
            if (!sellersPayments.has(sellerId)) {
                sellersPayments.set(sellerId, new Set());
            }
            sellersPayments.get(sellerId).add(paymentId);
        }
    });
    for (const [sellerId, paymentId] of sellersPayments.entries()) {
        sellersPayments.set(sellerId, [...paymentId]);
    }
    return sellersPayments
}

const getTotalShippings = async (seller_shipping) => {
    const shippingsTotales = new Map()
    const tamaño_lote = 20;
    const tokens = await obtenerToken()

    for (const [seller, shippings] of seller_shipping) {

        for (let i = 0; i < shippings.length; i += tamaño_lote) {
            const lote = shippings.slice(i, i + tamaño_lote);

            const promesas = lote.map(shipping_id => getShipping(shipping_id, seller, tokens))
            const resultados = await Promise.all(promesas);

            resultados.forEach(res => {
                if (res) shippingsTotales.set(res.id.toString(), objetoShipping(res));
            });
        }
    }
    return shippingsTotales
}

const getTotalPayments = async (seller_payments) => {

    const paymentsTotales = new Map()
    const tamaño_lote = 20;
    const tokens = await obtenerToken()

    for (const [seller, payments] of seller_payments) {

        for (let i = 0; i < payments.length; i += tamaño_lote) {
            const lote = payments.slice(i, i + tamaño_lote);

            const promesas = lote.map(payment_id => getPayment(seller, payment_id, tokens))
            const resultados = await Promise.all(promesas);

            resultados.forEach(res => {
                // Validamos que 'res' exista y que tenga la propiedad 'id'
                if (res && res.id) {
                    paymentsTotales.set(res.id.toString(), {fecha_liquidacion:res.money_release_date});
                } else {
                    console.warn("Se ignoró un resultado inválido o no encontrado:", res);
                }
            });
        }
    }
    return paymentsTotales
}

export const getVentasUnificadas = async (vendedor) => {

    const [ventasML, ventasMDB, enviosFLEX] = await Promise.all([getVentasPublicaciones_ML(), getVentasMDB(), getEnvios()])

    const ventasMDBmap = new Map(ventasMDB.map(venta => [venta.VENTAID, venta]))
    const enviosFLEXmap = new Map(enviosFLEX.map(envios => [envios.ventaid, envios]))
    const seller_shipping = getShippingsFromSeller(ventasML) // diccionario de seller con sus shippings
    const seller_payments = getPaymentsFromSeller(ventasML)

    const totalShippings = await getTotalShippings(seller_shipping)
    const totalPayments = await getTotalPayments(seller_payments)

    const ventasUnificadas = []
    for (const venta_ml of ventasML) {
        const shippingId_Str = venta_ml.data?.shipping_id?.toString()
        const shippingEncontrado = shippingId_Str ? totalShippings.get(shippingId_Str) : null

        const paymentId_Str = venta_ml.data?.payment_id.id?.toString()
        const paymentEncontrado = paymentId_Str ? totalPayments.get(paymentId_Str) : null

        const nuevoObjeto = {
            VENTAID: venta_ml.pack_id,
            TITULO: venta_ml.data.nombre,
            IMPORTE_TOTAL: venta_ml.data.total_amount,
            FECHA: venta_ml.data.date_created,
            SHIPPING_ID: venta_ml.data.shipping_id,
            PAYMENT_ID: venta_ml.data.payment_id.id,
            DATOS_SHIPPING: shippingEncontrado,
            DATOS_PAYMENTS: paymentEncontrado,
            CUMPLIDO: venta_ml.data.cumplido,
            COMPRADOR: { ID: venta_ml.data.buyer_id, NOMBRE: venta_ml.data.buyer },
            VENDEDOR: { ID: venta_ml.data.seller, NOMBRE: venta_ml.data.seller_id },
            VARIANTES: venta_ml.data.variante
        }
        const venta_mdb = ventasMDBmap.get(venta_ml.pack_id)
        if (venta_mdb) {
            nuevoObjeto.IMPORTE_NETO = venta_mdb?.IMPORTE_NETO
            nuevoObjeto.ALBUM = venta_mdb.ALBUM
            nuevoObjeto.ENVIO = shippingEncontrado?.entrega || venta_mdb?.ENVIO
            nuevoObjeto.VENDEDOR.CUENTA = venta_mdb.CUENTA
            nuevoObjeto.FALTANTES = venta_mdb?.FALTANTES
            nuevoObjeto.VENDIDAS = venta_mdb.VENDIDAS
            nuevoObjeto.IMAGEN_NETO = venta_mdb.IMAGEN_NETO
            nuevoObjeto.VERIFICADAS = venta_mdb?.VERIFICADAS
            nuevoObjeto._idventa = venta_mdb?._id
        }
        // if (paymentEncontrado){
        //     nuevoObjeto.payments = paymentEncontrado
        // }

        const envios_flex = enviosFLEXmap.get(venta_ml.pack_id)
        if (envios_flex) {
            const objetoFlex = {
                FECHA_ENTREGADO: envios_flex.fechaEntrega,
                ZONA: envios_flex.zona,
                TRANSPORTISTA: envios_flex.envio,
                IMPORTE_ENVIO: envios_flex.pago,
                PAGAR: envios_flex.pagar
            }
            nuevoObjeto.datos_envio_flex = objetoFlex
        }

        ventasUnificadas.push(nuevoObjeto)
    }

    const ventaid_sindup = new Set(ventasML.map(venta => venta.pack_id))
    const ventasMDBsinML = ventasMDB.filter(venta => !ventaid_sindup.has(venta.VENTAID));

    for (const venta of ventasMDBsinML) {
        const nuevoObjetoMDB = {
            VENTAID: venta.VENTAID,
            FECHA: venta.DIA,
            TITULO: null,
            IMPORTE_TOTAL: venta.PRECIO,
            IMPORTE_NETO: venta?.IMPORTE_NETO,
            SHIPPING_ID: null,
            CUMPLIDO: null,
            COMPRADOR: null,
            VENDEDOR: { NOMBRE: venta.CUENTA },
            VARIANTES: null,
            ALBUM: venta.ALBUM,
            ENVIO: venta.ENVIO,
            FALTANTES: venta?.FALTANTES,
            VENDIDAS: venta.VENDIDAS,
            IMAGEN_NETO: venta?.IMAGEN_NETO
        }
        ventasUnificadas.push(nuevoObjetoMDB)
    }

    let ventasUsuario;

    if (vendedor){
        ventasUsuario = ventasUnificadas.filter(venta=>venta.VENDEDOR.id===nombreSeller(vendedor))
    }else{
        ventasUsuario = ventasUnificadas
    }
    

    return ventasUsuario
}

export const getVentasFlex = async () => {
    const ventasMDB = await getVentasMDB()
    const ventasML = await getVentasML()
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

    ordenesMDB.forEach(orden => {
        mapaVentas.set(orden.venta.VENTAID, orden)
    })

    ordenesML.forEach(orden => {
        mapaVentas.set(orden.venta.VENTAID, orden);
    });

    const ventasFinales = [...mapaVentas.values()];

    return ventasFinales
}

export const totalNetoUsuario = async (usuario) => {
    const ventas = await getVentasMDB()
    const ventasUsuario = ventas.filter(venta => venta.CUENTA === usuario)

    const enviosPagados = await getEnvios()
    const enviosPagadosUsuario = enviosPagados.filter(envio => envio.usuario_pagador === usuario)

    const gastos = await getGastos()
    const gastosUsuarios = gastos.filter(gasto => gasto.CUENTA === usuario)

    const montoGastos = gastosUsuarios.reduce(
        (total, envio) => total + (envio.MONTO ?? 0), 0
    )
    const montoEnviosPagos = enviosPagadosUsuario.reduce(
        (total, envio) => total + (envio.pago ?? 0), 0
    )
    const montoTotalNeto = ventasUsuario.reduce(
        (total, venta) => total + (venta.IMPORTE_NETO ?? 0), 0
    )
    return montoTotalNeto - montoEnviosPagos - montoGastos
}

export const totalVendedoresVentas = async () => {
    const ventas = await getVentasMDB()
    const vendedores_filtrados = ventas.filter(venta => !["LULY", "ARI"].includes(venta.CUENTA))

    const vendedores = [
        ...new Set(vendedores_filtrados.map(venta => venta.CUENTA))
    ];
    return vendedores;
}

export const calculoCuentas = async () => {
    try {
        const ventasMDB = await getVentasMDB()
        const ventasML = await getVentasPublicaciones_ML()
        const envios = await getVentasFlex()
        const enviosCuentaMDB = envios.map(orden => ({ VENTAID: orden?.venta?.VENTAID, PRECIO: orden?.envio?.pago, FECHA: orden?.venta?.DIA, ZONA: orden?.envio?.zona, TRANSPORTISTA: orden?.envio?.envio, USUARIO_PAGO: orden?.envio?.usuario_pagador, PRODUCTO: orden?.venta?.PRODUCTO }))
        const ventasCuentaMDB = ventasMDB.map(venta => ({ VENTAID: venta.VENTAID, FECHA: venta.DIA, CUENTA: venta.CUENTA, IMPORTE_NETO: venta.IMPORTE_NETO }))
        // const ventasTotal = ventasCuentaMDB.map(venta => {
        //     const ventasCuentaML = ventasML.find(venta_ml => venta_ml.pack_id === venta.VENTAID)
        //     const seller = ventasCuentaML?.data?.seller_id
        //     const vendedor_id = seller ? nombreSeller(ventasCuentaML.data.seller_id) : "Sin seller"
        //     return {
        //         ...venta,
        //         FECHA_ML: ventasCuentaML?.data?.date_created, TITULO: ventasCuentaML?.data?.nombre, CUENTA_ML: vendedor_id
        //     }
        // }

        // )

        const ventasUnicas = new Set(ventasCuentaMDB.map(venta => String(venta.VENTAID)))
        const ventasCuentaML = ventasML
            .map(venta => ({
                VENTAID: venta.pack_id,
                FECHA: venta.data?.date_created,
                CUENTA: venta.data?.seller_id
            }))
            .filter(venta => !ventasUnicas.has(String(venta.VENTAID)))

        const ventasTotal = [...ventasCuentaMDB, ...ventasCuentaML]

        ventasTotal.sort((a, b) => new Date(b.FECHA) - new Date(a.FECHA))
        const ventasCuentaTotal = ventasTotal.map(ventas => {
            const envioAsociado = enviosCuentaMDB.find(envio => envio.VENTAID === ventas.VENTAID)
            if (envioAsociado) {
                return {
                    ...ventas,
                    FECHA: envioAsociado?.FECHA,
                    ZONA: envioAsociado?.ZONA,
                    TRANSPORTISTA: envioAsociado?.TRANSPORTISTA,
                    USUARIO_PAGO: envioAsociado?.USUARIO_PAGO,
                    PRODUCTO: envioAsociado?.PRODUCTO,
                    COSTO_ENVIO: envioAsociado?.PRECIO
                }
            }
            else {
                return {
                    ...ventas
                }
            }

        }
        )
        return ventasCuentaTotal

    } catch (error) {
        console.error("No se pueden obtener las ventas de la cuenta", error)
    }
}

export const actualizarVentas = async () => {
    const respuesta = await obtenerPreguntaMeli()
    const preguntasMDB = await respuesta.find()
    const ventasML = await getVentasPublicaciones_ML()
    for (const pregunta of preguntasMDB) {
        if (pregunta.COMPRADO === false) {
            const ventaEncontrada = ventasML
                .find(venta =>
                    venta.data.buyer_id === pregunta.BUYER_ID &&
                    venta.data.seller === pregunta.SELLER_ID &&
                    new Date(pregunta.FECHA) < new Date(venta.data.date_created) &&
                    venta.data.variante.some(variante => variante.mla === pregunta.MLA)
                )
            if (ventaEncontrada) {
                try {
                    await crearVentaMDB(
                        pregunta.FIGUS_EN_STOCK,
                        pregunta.FIGUS_SIN_STOCK,
                        pregunta.ALBUM_REAL,
                        nombreSeller(pregunta.SELLER_ID),
                        ventaEncontrada.data.total_amount,
                        ventaEncontrada.pack_id,
                        ventaEncontrada.data.date_created
                    )
                    await modificarPrecio(pregunta.MLA, pregunta.SELLER_ID, 2000)
                    await modificarStock(pregunta.MLA, pregunta.SELLER_ID, 1)
                    await activarEstado(pregunta.MLA, pregunta.SELLER_ID)
                    await descontarVentaFiguritasMDB(pregunta.ALBUM_REAL, pregunta.FIGUS_EN_STOCK)
                    await confirmarVenta(pregunta._id)
                } catch (error) {
                    console.error("No se pudo actualizar la venta", error)
                }
            }
        }
    }
}

export const crearVentaMDB = async (figusEnStock, figusSinStock, nombreAlbum, cuenta, precio, ventaid, fechaVenta) => {

    const nuevaVenta = {
        DIA: fechaVenta ? new Date(fechaVenta) : new Date(),
        VENTAID: ventaid,
        VENDIDAS: figusEnStock,
        FALTANTES: figusSinStock,
        PRECIO: precio,
        CUENTA: cuenta,
        ENVIO: "Sin dato",
        ALBUM: nombreAlbum,
        VERIFICADAS: false,
        PAGADAS: false
    }

    try {
        await modeloVenta.findOneAndUpdate(
            { VENTAID: ventaid },
            { $setOnInsert: nuevaVenta },
            { upsert: true, new: true }
        );
        console.log("Venta creada correctamente: ", ventaid)
    } catch (error) {
        console.error("No se pudo crear la venta", error)
    }

}

export const getPayment = async (sellerid, payment_id, tokens) => {
    try {

        const tokenEncontrado = tokens.find(token => token.seller_id.toString() === sellerid.toString())
        const paymentData = await axios.get(
            `https://api.mercadopago.com/v1/payments/${payment_id}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenEncontrado.access_token}`
                }
            })

        return paymentData.data
    } catch (error) {
        console.error(`Error 404 en pago ${payment_id}:`, error.message);
        return {};
    }
}

// export const totalImporteUsuario = async(usuario) =>{
//     const ventas = await getVentas()
//     const ventasUsuario = ventas.filter(venta=>venta.CUENTA===usuario)
//     const montoTotalNeto = ventasUsuario.reduce(
//         (total, venta) => total + (venta.IMPORTE_NETO ?? 0),0
//     )
//     return montoTotalNeto
// }