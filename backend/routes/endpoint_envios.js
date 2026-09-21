import { Router } from "express";
import { confirmarPago, getEnvios,getTransportistas, subirEnvioMDB } from "../services/accionesEnvios.js";
import { getEtiqueta } from "../services/accionesShipping.js";

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

router.post('/crearEnvioMDB',async (req,res) =>{
    try {
        const envio = req.body

        const resultado = await subirEnvioMDB(envio)
        
        return res.status(200).json({
            success: true,
            resultado
        });
    } catch (error) {
        console.error("Error en la ruta /crearEnvioMDB:", error.message);
        return res.status(500).json({ 
            success: false, 
            error: "Error interno al procesar el envío" 
        });
    }
})

router.post(('/etiqueta'), async (req, res) => {

    const { seller_id, shipping_id } = req.body

    try {
        const etiquetaGenerada = await getEtiqueta(seller_id, shipping_id)
        if (!etiquetaGenerada.success || !etiquetaGenerada.pdfBytes) {
            throw new Error(etiquetaGenerada.error || 'PDF no generado');
        }

        // Devolver el PDF directamente para descarga
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${shipping_id}.pdf`);
        res.send(etiquetaGenerada.pdfBytes);
    } catch (error) {
        console.error('Error al generar etiqueta:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
})

export default router;