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

export default router;