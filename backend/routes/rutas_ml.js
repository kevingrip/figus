import express from "express";
import { obtenerOrden } from "../services/mercadolibre/ordenes.js";
import { obtenerPreguntasSinResponder } from "../services/mercadolibre/preguntas.js";
import { responderPregunta } from "../services/mercadolibre/respuestas.js";
import { obtenerPreguntasConHistorial } from "../services/mercadolibre/preguntasConHistorial.js";
import { activarPublicacion, estadoPublicacion,modificarPrecio,modificarStock, obtenerPublicacion } from "../services/mercadolibre/publicaciones.js";

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

        //const preguntas = await obtenerPreguntasSinResponder();
        const preguntas = await obtenerPreguntasConHistorial()
        
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
        const { id, texto, seller_id } = req.body;

        const respuesta = await responderPregunta(id,texto,seller_id);

        res.json(respuesta);
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            error: "Error respondiendo preguntas"
        });
    }
});

router.get("/publicaciones", async (req,res)=>{
    try {
        const publicaciones = await estadoPublicacion()
        res.json(publicaciones)
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            error: `Error obteniendo publicaciones,${error}`
        });
    }
})

router.patch("/publicaciones/:mla", async (req,res)=>{
    try {

        const {mla} = req.params
        const { cantidad,vendedor } = req.body;

        const publicaciones = await modificarStock(mla,vendedor,cantidad)
        res.json(publicaciones)
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            error: `Error obteniendo publicaciones,${error}`
        });
    }
})

router.patch("/publicaciones/activar/:mla", async (req,res)=>{
    try {

        const { mla } = req.params
        const { vendedor,estado } = req.body;

        const publicaciones = await activarPublicacion(mla,vendedor,estado)
        res.json(publicaciones)
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            error: `Error obteniendo publicaciones,${error}`
        });
    }
})

router.patch("/publicaciones/precio/:mla", async (req,res)=>{
    try {

        const { mla } = req.params
        const { vendedor,precio } = req.body;

        const publicacion = await modificarPrecio(mla,vendedor,precio)
        res.json(publicacion)
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            error: `Error obteniendo publicaciones,${error}`
        });
    }
})

router.get("/publicaciones/item/:mla", async (req,res)=>{
    try {

        const { mla } = req.params
        const { seller_id } = req.query;

        const publicacion = await obtenerPublicacion(mla,seller_id)
        res.json(publicacion)
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            error: `Error obteniendo publicaciones,${error}`
        });
    }
})

export default router;