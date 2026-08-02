import axios from "axios";

export async function responderPregunta(questionId, textoRespuesta) {
    const response = await axios.post(
        "https://api.mercadolibre.com/answers",
        {
            question_id: questionId,
            text: textoRespuesta
        }
    );

    return response.data;
}