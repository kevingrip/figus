import { Router } from "express";
import { crearGasto, getGastos } from "../services/accionesGastos.js";

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
    try {
        const gastos = await getGastos()
        res.json(gastos)
    } catch (error) {
        console.error("No se pudo obtener los gastos", error)
    }
})

router.post("/", async (req, res) => {
    try {
        const datos = req.body
        const gastoCreado = await crearGasto(datos)
        console.log("Gasto creado correctamente")
        res.status(201).json(gastoCreado)
    } catch (error) {
        console.error("Error al crear un nuevo gasto",error)
    }
})

export default router