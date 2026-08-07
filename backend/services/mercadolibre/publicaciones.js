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
                    orders: "date_created_desc",
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
            //console.log(item.body)
        }
        //console.log(filtered_publicaciones)

        filtered_publicaciones.sort(
            (a, b) => new Date(b.date_created) - new Date(a.date_created)
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

export const activarPublicacion = async (mla, seller_id,estado) => {
    try {
        const tokens = await obtenerToken();
        const token = tokens.find(token => token.seller === seller_id);
        console.log("seller",seller_id)
        let nuevoEstado;
        if (estado==="active"){
            nuevoEstado="paused"
        }else{
            nuevoEstado="active"
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