import axios from "axios";

export async function obtenerOrden(id) {
    const response = await axios.get(
        `https://api.mercadolibre.com/orders/${id}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.ML_ACCESS_TOKEN}`
            }
        }
    );

    return response.data;
}