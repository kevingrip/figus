import axios from "axios";
import { mlGet } from "../token/api_meli.js";

export const obtenerPreguntasSinResponder = async () => {
    const respuestas = await mlGet(
        "https://api.mercadolibre.com/questions/search",
        {
            params: {
                //status: "UNANSWERED",
                deleted_from_listing: false,
                api_version: 4,                
            }
        }
    );

    const preguntas = respuestas.flatMap(data =>
        data.questions?.filter(
            pregunta => !pregunta.deleted_from_listing
        ) || []
    );
    
    return preguntas;
};