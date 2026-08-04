import axios from "axios";
import { obtenerToken } from "./obtenerToken.js";

export const mlGet = async (url, config = {}) => {

    const listaTokens = await obtenerToken();

    const respuestas = await Promise.all(
        listaTokens.map(token =>
            axios.get(url, {
                ...config,
                params: {
                    ...config.params,
                    seller_id: token.seller
                },
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token.access_token}`,
                    "Content-Type": "application/json"
                }
            })
        )
    );

    return respuestas.map(res => res.data);

}

export const mlPost = async (url, body, seller_id) => {

    const listaTokens = await obtenerToken();

    const token = listaTokens.find(
        objeto => objeto.seller === Number(seller_id)
    );

    if (!token) {
        throw new Error(`No se encontró token para el seller ${seller_id}`);
    }

    const { data } = await axios.post(
        url,
        body,
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
                "Content-Type": "application/json"
            }
        }
    );

    return data;
};