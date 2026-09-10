import axios from "axios";
import { obtenerToken } from "../token/obtenerToken.js";
import { obtenerFechaLimite } from "../../models/modeloGuardarFecha.js";
import { obtenerModeloFiguritas } from "../../models/modeloFigu.js";
import { descontarFiguritaMDB, obtenerCantidadFigurita } from "../accionesFiguritas.js";
import { getVentasPaginadasML } from "../accionesVentas.js";
import { seller_name } from "../../../frontend/javascript/utilidades/nombres.js";
import { nombrePublicacion } from "../../utilidades/nombres.js";
import Venta from "../../models/modeloVenta.js"
import { Precios } from "../../models/modeloAumentarPrecio.js";

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

const axiosItemsPublicaciones = async (token, parametros) => {
    const response = await axios.get(
        `https://api.mercadolibre.com/users/${token.seller}/items/search`,
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`
            },
            params:parametros
        }
    );
    return response
}

const asignarParametros = (estado) => {
    const params = {
        orders: "last_created_desc",
        limit: 100,
        offset:0
    };
    if (estado) {
        params.status = estado;
    }
    return params
}

const axiosPublicacion = async (lote, token) => {
    return await axios.get(
        `https://api.mercadolibre.com/items?ids=${lote.join(",")}`,
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`
            }
        }
    );
}

const crearObjetoPublicacion = (item) => {

    const album_find = item.body.attributes?.find(variante => variante.id === "ALBUM_NAME")
    const figu_find = item.body.attributes?.find(variante => variante.id === "CHARACTER")
    const figu_NUM = figu_find?.value_name?.toUpperCase().replace(/\s/g, "")

    const datosSeleccionadosPublicacion = ({
        id: item.body.id,
        title: item.body.title,
        seller_id: item.body.seller_id,
        price: item.body.price,
        available_quantity: item.body.available_quantity,
        permalink: item.body.permalink,
        status: item.body.status,
        date_created: item.body.date_created,
        thumbnail: item.body.pictures?.[0]?.secure_url,
        family_id: item.body,
        album: album_find?.value_name,
        figurita: figu_NUM
    })

    return datosSeleccionadosPublicacion
}

const pedidosLote20 = async (items, listaDeMLA, usuario) => {
    for (let i = 0; i < listaDeMLA.length; i += 20) {
        const lote = listaDeMLA.slice(i, i + 20);

        const { data } = await axiosPublicacion(lote, usuario)

        items.push(...data);
    }
}

export const getPublicaciones = async (estado, pagina) => {
    const items = [];
    const filtered_publicaciones = []

    const tokens = await obtenerToken();
    for (const usuario of tokens) {

        const parametros = asignarParametros(estado)
        const itemsPublicaciones = await axiosItemsPublicaciones(usuario, parametros)
        console.log(itemsPublicaciones.data.paging, itemsPublicaciones.data.seller_id)
        const listaDeMLA = itemsPublicaciones.data.results;

        await pedidosLote20(items, listaDeMLA, usuario)

        for (const item of items) {
            const publicacion = crearObjetoPublicacion(item) //CREAMOS OBJETO PERSONALIZADO, CON LOS DATOS QUE NECESITAMOS
            filtered_publicaciones.push(publicacion)
        }

        filtered_publicaciones.sort(
            (a, b) => new Date(b.date_created) - new Date(a.date_created)
        );

    }
    return filtered_publicaciones
}

export const getPublicaciones2 = async (estado) => {
    const tokens = await obtenerToken();
    const filtered_publicaciones = []
    const items = [];
    for (const token of tokens) {
        const params = {
            orders: "last_updated_desc",
            limit: 100
        };
        if (estado) {
            params.status = estado;
        }
        const response = await axios.get(
            `https://api.mercadolibre.com/users/${token.seller}/items/search`,
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                },
                params
            }
        );

        const ids = response.data.results;

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
            (a, b) => new Date(b.date_created) - new Date(a.date_created)
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

export const activarEstado = async (mla, seller_id) => {
    try {
        const tokens = await obtenerToken();
        const token = tokens.find(token => token.seller === seller_id);

        await axios.put(`https://api.mercadolibre.com/items/${mla}`,
            {
                status: "active"
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
            "Error modificando precio")
        console.log("URL:", error.config?.url);
        console.log("Enviado:", error.config?.data);
        console.log("Respuesta MeLi:", error.response?.data);
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
            if (publi.figurita === "00") {
                figuId = "FWC0"
            } else if (publi.figurita === "JULIÁNÁLVAREZ") {
                figuId = "ARG19"
            } else if (publi.figurita === "ESCUDOSELECCIÓNARGENTINA") {
                figuId = "ARG1"
            } else if (publi.figurita === "GIULIANOSIMEONE") {
                figuId = "ARG20"
            } else if (publi.figurita === "ENZOFERNANDEZ") {
                figuId = "ARG8"
            } else if (publi.figurita === "FRANCOMASTANTUONO") {
                figuId = "ARG15"
            } else if (publi.figurita === "FIGURADELACOPAMUNDIAL") {
                figuId = "ARG14"
            } else if (publi.figurita === "NICOLÁSOTAMENDI") {
                figuId = "ARG5"
            } else {
                figuId = publi.figurita
            }

            const figusVendidas = []

            if (figuId) {
                // console.log(publi.id)
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