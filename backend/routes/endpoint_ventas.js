import { Router } from "express";
import { obtenerToken } from "../services/token/obtenerToken.js";
import axios from "axios";
import Venta from "../models/modeloVenta.js";
import Venta_ML from "../models/modeloVentaML.js"
import { seller_name } from "../../frontend/javascript/utilidades/nombres.js";
import multer from "multer";
import { calculoCuentas, getVentasMDB, getVentasFlex, getVentasML, getVentasML_datosCompletos, getVentasPublicaciones_ML, totalNetoUsuario, totalVendedoresVentas, getVentasUnificadas } from "../services/accionesVentas/accionesVentas.js";
import { obtenerOrden } from "../services/mercadolibre/ordenes.js";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

const subirACloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "figus_ventas" },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        stream.end(buffer);
    });
};

router.post("/cargar_imagen/:id", upload.single("imagen"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                mensaje: "No se recibió ninguna imagen"
            });
        }

        // 2. Armamos la ruta web local del archivo guardado en el disco
        const resultadoCloudinary = await subirACloudinary(req.file.buffer);
        const urlImagenCloud = resultadoCloudinary.secure_url;


        // 3. Buscamos si la venta ya existe en MongoDB
        let venta = await Venta.findOne({ VENTAID: req.params.id });


        if (!venta) {
            // Si no existe, la creamos directamente con la ruta de la foto
            venta = await Venta.create({
                VENTAID: req.params.id,
                IMAGEN_NETO: urlImagenCloud // Guardamos el String de la ruta
            });

            return res.json({
                mensaje: "Venta creada e imagen guardada correctamente",
                fotoUrl: urlImagenCloud
            });
        }

        // 4. Si la venta ya existía, simplemente actualizamos el campo
        venta.IMAGEN_NETO = urlImagenCloud;
        await venta.save();

        res.json({
            mensaje: "Imagen actualizada correctamente",
            fotoUrl: urlImagenCloud
        });

    } catch (error) {
        console.error("Error en cargar_imagen:", error);
        res.status(500).json({
            mensaje: "Error al guardar la imagen"
        });
    }
})

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

router.patch("/verificar/:id", async (req, res) => {
    try {
        const venta = await Venta.findByIdAndUpdate(
            req.params.id, {
            VERIFICADAS: true
        },
            { returnDocument: 'after' }
        )
        res.json(venta)

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})

router.get("/unificadas", async (req, res) => {

    try {

        const ordenesUnificadas = await getVentasUnificadas()

        res.json(ordenesUnificadas);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo órdenes"
        });
    }
});

router.get("/ventaml", async (req, res) => {

    try {

        const ordenes_finales = await getVentasPublicaciones_ML()

        res.json(ordenes_finales);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo órdenes"
        });
    }
});

router.get("/orden", async (req, res) => {
    const orden = await obtenerOrden(2000018422254096)
    res.json(orden)
})

router.get("/ventaml/datoscompletos", async (req, res) => {

    try {

        const ordenes_finales = await getVentasML_datosCompletos()

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
            await Venta.create({
                VENTAID: req.params.id,
                IMAGEN_NETO: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            })
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
        console.error("No se pudo obtener el total neto", error)
    }
})

router.get("/vendedores-filtrado", async (req, res) => {
    const vendedores = await totalVendedoresVentas()
    res.json(vendedores)
})

router.get("/cuentas", async (req, res) => {
    const { cuenta } = req.query
    let ventasCuentaTotal = await calculoCuentas()
    if (cuenta) {
        ventasCuentaTotal = ventasCuentaTotal.filter(venta => venta.CUENTA === cuenta)
    }
    res.json(ventasCuentaTotal)
})

export default router;