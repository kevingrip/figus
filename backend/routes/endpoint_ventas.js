import { Router } from "express";
import { obtenerToken } from "../services/token/obtenerToken.js";
import axios from "axios";
import Venta from "../models/modeloVenta.js";
import Venta_ML from "../models/modeloVentaML.js"
import { seller_name } from "../../frontend/javascript/utilidades/nombres.js";
import multer from "multer";
import { getVentasFlex, getVentasML, getVentasPaginadasML, totalNetoUsuario, totalVendedoresVentas } from "../services/accionesVentas.js";
const router = Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.get("/", async (req, res) => {
    const ventas = await Venta.find().sort({ DIA: -1 }).lean();
    res.json(ventas);
});

router.get("/flex", async (req, res) => {
    const ventas = await getVentasFlex()
    res.json(ventas);
});

router.post("/", async (req, res) => {
    const venta = await Venta.create(req.body);
    res.json({ ok: true });
});

router.patch("/:id", async (req, res) => {
    try {
        const venta = await Venta.findByIdAndUpdate(
            req.params.id, {
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

router.get("/ventaml", async (req, res) => {

    try {

        const ordenes_finales = await getVentasML()

        res.json(ordenes_finales);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo órdenes"
        });
    }
});

router.get("/ventaml/paginadas", async (req, res) => {

    try {

        const ordenes_finales = await getVentasPaginadasML()

        res.json(ordenes_finales);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo órdenes"
        });
    }
});

router.post("/ml_to_mdb", async (req, res) => {
    try {

        const ventasML = req.body;

        for (const ventaML of ventasML) {

            const ventaId = Number(ventaML.pack_id);

            await Venta_ML.updateOne(
                { VENTAID: ventaId },
                {
                    $setOnInsert: {
                        DIA: new Date(ventaML.data.date_created),
                        VENTAID: ventaId,
                        PRECIO: ventaML.data.total_amount,
                        CUENTA: seller_name(ventaML.data.seller)
                    }
                },
                { upsert: true }
            );
        }

        res.json({
            ok: true
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "No se pudieron agregar las ventas"
        });
    }
});

router.post("/pagoneto/:id", async (req, res) => {
    try {
        const venta = await Venta.findOne({ VENTAID: req.params.id });
        if (!venta) {
            return res.status(404).json({
                mensaje: "Venta no encontrada"
            });
        }
        const precioNeto = req.body.precio_neto
        venta.IMPORTE_NETO = precioNeto
        await venta.save();

        res.json({
            mensaje: "Precio neto correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al guardar el precio neto"
        });
    }
})

router.post("/agregarimg/:id", upload.single("imagen"), async (req, res) => {
    try {
        const venta = await Venta.findOne({ VENTAID: req.params.id });

        if (!venta) {
            return res.status(404).json({
                mensaje: "Venta no encontrada"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                mensaje: "No se recibió ninguna imagen"
            });
        }

        venta.IMAGEN_NETO = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };

        await venta.save();

        res.json({
            mensaje: "Imagen guardada correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al guardar la imagen"
        });
    }
})

router.get("/importe_neto/:usuario", async (req, res) => {
    try {
        const total = await totalNetoUsuario(req.params.usuario)
        res.json(total)
    } catch (error) {
        console.error("No se pudo obtener el total neto",error)
    }
})

router.get("/vendedores-filtrado", async(req,res)=>{
    const vendedores = await totalVendedoresVentas()
    res.json(vendedores)
})

export default router;