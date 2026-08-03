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