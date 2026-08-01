import axios from "axios";

export async function obtenerPreguntasSinResponder() {
    const response = await axios.get(
        "https://api.mercadolibre.com/questions/search",
        {
            params: {
                seller_id: process.env.ML_SELLER_ID,
                status: "UNANSWERED",
                deleted_from_listing: false,
                api_version: 4
            },
            headers: {
                Authorization: `Bearer ${process.env.ML_ACCESS_TOKEN}`
            }
        }
    );

    const preguntas = response.data.questions.filter(
        pregunta => !pregunta.deleted_from_listing
    );

    return preguntas;
}