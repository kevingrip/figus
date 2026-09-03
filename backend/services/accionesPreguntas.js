import { obtenerPreguntaMeli } from "../models/preguntasVenta.js";

export const confirmarVenta = async (pregunta_id) => {
    try {
        const modelo = await obtenerPreguntaMeli()
        const pregunta = await modelo.findByIdAndUpdate(
            pregunta_id,
            { COMPRADO: true },
            { new: true }
        );

        if (!pregunta) {
            console.warn("Pregunta no encontrada para el ID:", pregunta_id);
            return
        }
        console.log("Pregunta confirmada correctamente:", pregunta_id)

    } catch (error) {
        console.error("Error al confirmar venta:", error.message);
        throw error;
    }
}