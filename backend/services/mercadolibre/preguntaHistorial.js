import axios from "axios";
import { mlGet } from "../token/api_meli.js";


export const obtenerHistorialCliente = async (buyer_id, seller_id) => {

    const respuestas = await mlGet(
        "https://api.mercadolibre.com/questions/search",
        {
            params: {
                status: "ANSWERED",
                deleted_from_listing: false,
                api_version: 4,
                seller_id,
                sort_fields: "date_created",
                sort_types: "DESC"
            }
        }
    );

    //console.log(respuestas)
    return respuestas.questions?.filter(
        pregunta =>
            !pregunta.deleted_from_listing &&
            pregunta.from.id === buyer_id
    ) || [];
};