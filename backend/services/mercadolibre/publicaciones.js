import axios from "axios";
import { obtenerToken } from "../token/obtenerToken.js";

export const estadoPublicacion = async () => {
    const tokens = await obtenerToken();
    const filtered_publicaciones = []
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
        const items = [];

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
            console.log(item)
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
    return filtered_publicaciones

};

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
        console.log("seller", seller_id)
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

export const obtenerPublicacion = async (mla, sellerid) => {
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
