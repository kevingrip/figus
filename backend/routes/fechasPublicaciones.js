import { obtenerFechaLimite } from "../models/modeloGuardarFecha.js";
import { Router } from "express";

const router = Router();

// La funcion obtiene hasta que hora una publicacion tiene el precio actualizado, la usamos para luego volver al precio original (2000)

router.get("/", async (req, res) => {
    try {
        const Publicacion = obtenerFechaLimite();

        const fechas = await Publicacion.find();

        res.json(fechas);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error obteniendo fechas"
        });
    }
});

export default router;