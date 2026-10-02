import { mlPost } from "../token/api_meli.js";

export async function responderPregunta(questionId, textoRespuesta,seller_id) {
    
    console.log(questionId,textoRespuesta,seller_id)

    try {
        const data = await mlPost(
        "https://api.mercadolibre.com/answers",
        {
            question_id: questionId,
            text: textoRespuesta
        },
        seller_id
    );
    console.log("Respondida correctamente")
    return data;
    } catch (error) {
        console.log("No se pudo responder (backend: services/mercadolibre/respuestas.js) ",error.message);
    }
}