import axios from "axios";
import { mlGet } from "../token/api_meli.js";


export const obtenerHistorialCliente = async (buyer_id) => {

    const respuestas = await mlGet(
        "https://api.mercadolibre.com/questions/search",
        {
            params: {
                buyer_id,
                deleted_from_listing: false,
                api_version: 4
            }
        }
    );

    return respuestas.flatMap(data =>
        data.questions?.filter(
            pregunta => !pregunta.deleted_from_listing
        ) || []
    );
};