import axios from "axios";
import { mlGet } from "../token/api_meli.js";

export const obtenerPreguntasSinResponder = async () => {
    const { data } = await mlGet(
        "https://api.mercadolibre.com/questions/search",
        {
            params: {
                seller_id: process.env.ML_SELLER_ID,
                status: "UNANSWERED",
                deleted_from_listing: false,
                api_version: 4
            }
        }
    );

    const preguntas = data.questions.filter(
        pregunta => !pregunta.deleted_from_listing
    );
    return preguntas;
};