import { Router } from "express";
import { obtenerPreguntaMeli } from "../models/preguntasVenta.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const preguntasML = await obtenerPreguntaMeli()
        const todasLasPreguntas = await preguntasML.find()
        res.json(todasLasPreguntas);
    } catch (error) {

    }
})

router.post("/guardar", async (req, res) => {
    try {
        const preguntasML = await obtenerPreguntaMeli()

        const {
            figusEnStock,
            figusSinStock,
            vendedor,
            cliente,
            albumConsulta,
            fecha,
            albumReal,
            mla} = req.body

        const nuevaPregunta = await preguntasML.findOneAndUpdate({
            SELLER_ID: vendedor,
            BUYER_ID: cliente,
            ALBUM_ML: albumConsulta,
            COMPRADO: false,
            MLA:mla
        },
            {
                $set: {
                    FIGUS_EN_STOCK: figusEnStock,
                    FIGUS_SIN_STOCK: figusSinStock,
                    ALBUM_REAL: albumReal,
                    FECHA: fecha
                }
            },
            {
                upsert: true,
                new: true
            }
        )
        res.json(nuevaPregunta);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

router.post("/confirmar/:preg_id", async(req, res)=>{
    try {
        const pregunta = await obtenerPreguntaMeli().findByIdAndUpdate(
            req.params.preg_id,
            { COMPRADO: true },
            { new: true }
        );

        if (!pregunta) {
            return res.status(404).json({
                error: "Pregunta no encontrada"
            });
        }

        res.json(pregunta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

export default router;