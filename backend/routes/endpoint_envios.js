import { Router } from "express";
import { confirmarPago, getEnvios,getTransportistas } from "../services/accionesEnvios.js";

const router = Router({ mergeParams: true });

router.get("/",async(req,res)=>{
    try {
        const envios = await getEnvios()
        res.json(envios)
    } catch (error) {
        console.error("No se pudo obtener los envios",error)
    }
})

router.patch("/confirmarpago/:venta_id/:usuario",async(req,res)=>{
    try {
        const pagar = await confirmarPago(req.params.venta_id,req.params.usuario)

        res.json(pagar);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
})

router.get("/transportistas",async(req,res)=>{
    try {
        const lista_transportistas = await getTransportistas()
        res.json(lista_transportistas)

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
})

export default router;