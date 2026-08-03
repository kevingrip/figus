import { obtenerPreguntasSinResponder } from "./preguntas.js";
import { obtenerHistorialCliente } from "./historial.js";

export const obtenerPreguntasConHistorial = async () => {

    const preguntas = await obtenerPreguntasSinResponder();

    for (const pregunta of preguntas) {

        pregunta.historial = await obtenerHistorialCliente(
            pregunta.buyer_id
        );

    }

    return preguntas;
};