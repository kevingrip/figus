import axios from "axios";
import { obtenerToken } from "../token/obtenerToken.js";

export async function obtenerOrden(id) {
    const token = await obtenerToken()
    const response = await axios.get(
        `https://api.mercadolibre.com/orders/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token[1].access_token}`
            }
        }
    );

    return response.data;
}