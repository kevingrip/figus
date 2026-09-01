import axios from "axios";
import { obtenerToken } from "../token/obtenerToken.js";
import { obtenerFechaLimite } from "../../models/modeloGuardarFecha.js";
import { obtenerModeloFiguritas } from "../../models/modeloFigu.js";
import { descontarFiguritaMDB, obtenerCantidadFigurita } from "../accionesFiguritas.js";
import { getVentasPaginadasML } from "../accionesVentas.js";
import { seller_name } from "../../../frontend/javascript/utilidades/nombres.js";
import { nombrePublicacion } from "../../utilidades/nombres.js";
import Venta from "../../models/modeloVenta.js"

export const estadoPublicacion = async () => {
    const tokens = await obtenerToken();
    const filtered_publicaciones = []
    const items = [];
    for (const token of tokens) {
        // Obtengo los IDs
        const { data } = await axios.get(
            `https://api.mercadolibre.com/users/${token.seller}/items/search`,
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                },
                params: {
                    orders: "last_updated_desc",
                    limit: 100
                }
            }
        );

        const ids = data.results;


        for (let i = 0; i < ids.length; i += 20) {
            const lote = ids.slice(i, i + 20);

            const { data } = await axios.get(
                `https://api.mercadolibre.com/items?ids=${lote.join(",")}`,
                {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`
                    }
                }
            );

            items.push(...data);
        }


        for (const item of items) {
            const {
                id,
                title,
                seller_id,
                price,
                available_quantity,
                permalink,
                //pictures,
                status,
                date_created,
                thumbnail
            } = item.body;
            filtered_publicaciones.push({
                id,
                title,
                seller_id,
                price,
                available_quantity,
                permalink,
                //pictures,
                status,
                date_created,
                thumbnail
            })

        }
        //console.log(filtered_publicaciones)

        filtered_publicaciones.sort(
            (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
        );

    }
    return { filtered_publicaciones, items }
};

export const getPublicaciones = async () => {
    const tokens = await obtenerToken();
    const filtered_publicaciones = []
    const items = [];
    for (const token of tokens) {
        // Obtengo los IDs
        const { data } = await axios.get(
            `https://api.mercadolibre.com/users/${token.seller}/items/search`,
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                },
                params: {
                    orders: "last_updated_desc",
                    limit: 100
                }
            }
        );

        const ids = data.results;


        for (let i = 0; i < ids.length; i += 20) {
            const lote = ids.slice(i, i + 20);

            const { data } = await axios.get(
                `https://api.mercadolibre.com/items?ids=${lote.join(",")}`,
                {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`
                    }
                }
            );

            items.push(...data);
        }


        for (const item of items) {
            const {
                id,
                title,
                seller_id,
                price,
                available_quantity,
                permalink,
                pictures,
                status,
                date_created,
                thumbnail,
                family_id,
                attributes
            } = item.body;

            const album_find = attributes?.find(variante => variante.id === "ALBUM_NAME")
            const figu_find = attributes?.find(variante => variante.id === "CHARACTER")
            const figu_NUM = figu_find?.value_name
                ?.toUpperCase()
                .replace(/\s/g, "")
            filtered_publicaciones.push({
                id,
                title,
                seller_id,
                price,
                available_quantity,
                permalink,
                status,
                date_created,
                thumbnail: pictures?.[0]?.secure_url,
                family_id,
                album: album_find?.value_name,
                figurita: figu_NUM
            })

        }

        filtered_publicaciones.sort(
            (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
        );

    }
    return filtered_publicaciones
}

export const modificarStock = async (mla, seller_id, nuevoStock) => {
    try {
        const tokens = await obtenerToken();
        const token = tokens.find(token => token.seller === seller_id);
        await axios.put(`https://api.mercadolibre.com/items/${mla}`,
            {
                available_quantity: nuevoStock
            },
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                }
            }
        )
    } catch (error) {
        console.log(
            "Error modificando stock:",
            error.response?.data || error.message
        );

        throw error;
    }
}

export const activarPublicacion = async (mla, seller_id, estado) => {
    try {
        const tokens = await obtenerToken();
        const token = tokens.find(token => token.seller === seller_id);
        let nuevoEstado;
        if (estado === "active") {
            nuevoEstado = "paused"
        } else {
            nuevoEstado = "active"
        }
        await axios.put(`https://api.mercadolibre.com/items/${mla}`,
            {
                status: nuevoEstado
            },
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                }
            }
        )
    } catch (error) {
        console.log(
            "Error activando la publicacion:",
            error.response?.data || error.message
        );
        throw error;
    }
}

export const modificarPrecio = async (mla, seller_id, nuevoPrecio) => {
    try {
        const tokens = await obtenerToken();
        const token = tokens.find(token => token.seller === seller_id);
        await axios.put(`https://api.mercadolibre.com/items/${mla}`,
            {
                price: nuevoPrecio
            },
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                }
            }
        )
    } catch (error) {
        console.log(
            "Error modificando precio:",
            error.response?.data || error.message
        );

        throw error;
    }
}

export const actualizarFecha = async (mla, fecha, vendedor) => {
    const Publicacion = obtenerFechaLimite();

    await Publicacion.findOneAndUpdate(
        { MLA: mla },
        {
            SELLER_ID: vendedor,
            MLA: mla,
            FECHA_LIMITE: fecha
        },
        {
            upsert: true,
            new: true
        }
    );
}

export const getPublicacion = async (mla, sellerid) => {
    const tokens = await obtenerToken();

    const token = tokens.find(
        token => Number(token.seller) === Number(sellerid)
    );

    const { data: publicacion } = await axios.get(
        `https://api.mercadolibre.com/items/${mla}`,
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`
            }
        }
    );

    return publicacion;
};

export const sincronizarStock = async () => {
    const publicaciones = await getPublicaciones();

    const figuritas = await obtenerModeloFiguritas("mundialUsa2026")

    for (const publi of publicaciones) {
        if ([1331424923778706, 3406057476164753, 7115922794008337].includes(publi.family_id)) {
            let figuId;
            publi.figurita==="00" ? figuId="FWC0":figuId=publi.figurita;
            const figusVendidas = []
            
            if (figuId) {

                const figuEncontrada = await figuritas.findOne({
                    NUM: figuId
                }).lean();
                let cantMDB = await obtenerCantidadFigurita("mundialUsa2026", figuId)
                let cantML = publi.available_quantity
                //console.log("FIGU: ",figuId,"= Stock MDB: ",cantMDB, "/", "Stock ML:",cantML)

                if (cantMDB < cantML) {
                    console.log(figuId, " cant:", cantMDB)
                    await modificarStock(
                        publi.id,
                        publi.seller_id,
                        cantMDB
                    )
                } else if (cantMDB > cantML) {
                    console.log(figuId, " cant mdb:", cantMDB)
                    const ventasML = await getVentasPaginadasML()
                    for (const venta of ventasML) {
                        for (const datoVariante of venta.data.variante) {
                            if (datoVariante.mla === publi.id) {
                                const albumFormateado = nombrePublicacion(publi.album)
                                figusVendidas.push(figuEncontrada)
                                const nuevaVenta = {
                                    DIA: new Date(venta.data.date_created),
                                    VENTAID: venta.pack_id,
                                    VENDIDAS: figusVendidas,
                                    FALTANTES: [],
                                    PRECIO: venta.data.total_paid_amount,
                                    CUENTA: seller_name(venta.data.seller),
                                    ENVIO: "Sin Dato",
                                    ALBUM: albumFormateado.bdd,
                                    VERIFICADAS: false,
                                    PAGADAS: false
                                }
                                try {
                                    await Venta.findOneAndUpdate(
                                        { VENTAID: nuevaVenta.VENTAID },
                                        {
                                            $setOnInsert: {
                                                DIA: nuevaVenta.DIA,
                                                VENTAID: nuevaVenta.VENTAID,
                                                FALTANTES: nuevaVenta.FALTANTES,
                                                PRECIO: nuevaVenta.PRECIO,
                                                CUENTA: nuevaVenta.CUENTA,
                                                ENVIO: nuevaVenta.ENVIO,
                                                ALBUM: nuevaVenta.ALBUM,
                                                VERIFICADAS: nuevaVenta.VERIFICADAS,
                                                PAGADAS: nuevaVenta.PAGADAS
                                            },
                                            $push: {
                                                VENDIDAS: figuEncontrada
                                            }
                                        },
                                        {
                                            upsert: true,
                                            returnDocument: "after"
                                        }
                                    )
                                    await descontarFiguritaMDB(albumFormateado.bdd, figuEncontrada, datoVariante.cantidad, true)

                                    console.log("Venta creada y figu descontada")
                                } catch (error) {
                                    console.error("No se pudo crear/descontar venta", error)
                                }

                            }
                        }
                    }
                }
            }
        }
    }
}