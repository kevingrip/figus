import axios from "axios";
import { mlGet } from "../token/api_meli.js";

export const obtenerHistorialCliente = async (buyer_id, seller_id) => {

    const respuestas = await mlGet(
        "https://api.mercadolibre.com/questions/search",
        {
            params: {
                seller_id,
                status: "ANSWERED",
                sort_fields: "date_created",
                sort_types: "DESC"
            }
        }
    );

    const respuestasFiltradas = respuestas.flatMap(respuesta =>
        respuesta.questions?.filter(
            pregunta =>
                !pregunta.deleted_from_listing &&
                Number(pregunta.from?.id) === Number(buyer_id)
        ) || []
    );

    console.dir(respuestasFiltradas, { depth: null });

    return respuestasFiltradas;
};