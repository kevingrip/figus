import { obtenerPreguntasSinResponder } from "./preguntas.js";
import { obtenerHistorialCliente } from "./preguntaHistorial.js";

export const obtenerPreguntasConHistorial = async () => {

    const preguntas = await obtenerPreguntasSinResponder();
    for (const pregunta of preguntas) {
        
        pregunta.historial = await obtenerHistorialCliente(
            pregunta.from.id,
            pregunta.seller_id
        );
        
    }
    
    return preguntas;
};