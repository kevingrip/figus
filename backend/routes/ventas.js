import { Router } from "express";
import { obtenerToken } from "../services/token/obtenerToken.js";
import axios from "axios";
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

        const tokens = await obtenerToken();

        let ordenes = [];

        for (const token of tokens) {

            try {

                const respuesta = await axios.get(
                    "https://api.mercadolibre.com/orders/search",
                    {
                        headers: {
                            Authorization: `Bearer ${token.access_token}`
                        },
                        params: {
                            seller: token.seller,
                            sort: "date_desc",
                            limit: 50
                        }
                    }
                );

                ordenes.push(...respuesta.data.results);

            } catch (error) {

                console.error(
                    `Error obteniendo órdenes del seller ${token.seller}:`,
                    error.response?.data || error.message
                );
            }
        }

        // Ordenar todas las órdenes juntas
        ordenes.sort((a, b) => {
            return new Date(b.date_created) - new Date(a.date_created);
        });

        const ordenes_data = []

        ordenes.forEach(orden => {
            orden.payments.forEach(data => {

                const venta = {
                    order_id: data.order_id,
                    pack_id: orden.pack_id,
                    total_paid_amount: data.total_paid_amount,
                    total_amount: orden.total_amount,
                    date_created: orden.date_created,
                    shipping_id: orden.shipping.id,
                    buyer: orden.buyer.nickname,
                    seller: orden.seller.id,
                    cancel_detail: orden?.cancel_detail?.date,
                    nombre: data.reason,
                    variante: []
                }
                orden.order_items.forEach(variante => {
                    venta.variante.push({ titulo: variante.item.title, cantidad: variante.quantity , precio: variante.unit_price})
                })

                ordenes_data.push(venta)
            })
        })

        const ordenes_limpias = ordenes_data.map(orden => {
            if (orden.pack_id === null) {
                orden.pack_id = orden.order_id
            }
            const venta_limpia = {
                pack_id: orden.pack_id,
                data: {
                    order_id: orden.order_id,
                    total_paid_amount: orden.total_paid_amount,
                    total_amount: orden.total_amount,
                    date_created: orden.date_created,
                    shipping_id: orden.shipping_id,
                    buyer: orden.buyer,
                    seller: orden.seller,
                    cancel_detail: orden?.cancel_detail,
                    nombre: orden.nombre,
                    variante: orden.variante
                }
            }
            return venta_limpia;

        })

        const ordenes_mixed = new Map();
        ordenes_limpias.forEach(orden => {

            if (!ordenes_mixed.has(orden.pack_id)) {
                // Primera vez que aparece
                ordenes_mixed.set(orden.pack_id, orden);
            } else {
                // Ya existe ese pack_id
                const ordenExistente = ordenes_mixed.get(orden.pack_id);

                ordenExistente.data.variante.push(
                    ...orden.data.variante
                );
            }
        });

        const ordenes_finales = [...ordenes_mixed.values()];

        res.json(ordenes_finales);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo órdenes"
        });
    }
});

export default router;