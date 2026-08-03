import { mlPost } from "../token/api_meli.js";

export async function responderPregunta(questionId, textoRespuesta) {
    try {
        const response = await mlPost(
        "https://api.mercadolibre.com/answers",
        {
            question_id: questionId,
            text: textoRespuesta
        }
    );
    console.log("Respondida correctamente")
    return response.data;
    } catch (error) {
        console.log("La pregunta posiblemente ya fue respondida");
    }
}