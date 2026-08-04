import { Router } from "express";
import Venta from "../models/modeloVenta.js";
const router = Router();

router.get("/", async (req, res) => {
    const ventas = await Venta.find().sort({ DIA: -1 }).lean();
    res.json(ventas);
});

router.post("/", async (req, res) => {
    const venta = await Venta.create(req.body);
    res.json({ ok: true });
});

router.patch("/:id", async(req,res)=>{
    try {
        const venta = await Venta.findByIdAndUpdate(
            req.params.id,{
                VERIFICADAS: true
            },
            { new: true }
        )
        res.json(venta)
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})

export default router;