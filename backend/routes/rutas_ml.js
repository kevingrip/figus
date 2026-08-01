import express from "express";
import { obtenerOrden } from "../services/orden_mercadolibre.js";
import { obtenerPreguntasSinResponder } from "../services/preguntas_mercadolibre.js";
import { responderPregunta } from "../services/respuestas_mercadolibre.js";

const router = express.Router();

router.get("/orden/:id", async (req, res) => {
    try {
        const orden = await obtenerOrden(req.params.id);
        res.json(orden);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json(error.response?.data || { error: error.message });
    }
});

router.get("/preguntas", async (req, res) => {
    try {
        const preguntas = await obtenerPreguntasSinResponder();
        res.json(preguntas);
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            error: "Error obteniendo preguntas"
        });
    }
});

router.post("/respuestas", async (req, res) => {
    try {
        const { id, texto } = req.body;

        console.log("BODY:", req.body);
        console.log("ID:", id, "TIPO:", typeof id);
        console.log("TEXTO:", texto);

        const respuesta = await responderPregunta(id,texto);

        res.json(respuesta);
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            error: "Error respondiendo preguntas"
        });
    }
});

export default router;