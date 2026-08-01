import { Router } from "express";
import { obtenerModeloFiguritas } from "../modelo_mdb/modeloFigu.js";

const router = Router()

router.get("/:album", async (req, res) => {
    try {
        const album = req.params.album

        const albumes = [
            "mundialUsa2026",
            "mundialQatar2022",
            "futbolArgentino2023",
            "futbolArgentino2024",
            "libertadores2023",
            "copaAmerica2024"
        ]        

        if (!albumes.includes(album)) {
            return res.status(404).json({ error: "Álbum inexistente" });
        }

        const modelo = obtenerModeloFiguritas(req.params.album);

        const figuritas = await modelo.findOne().lean();
        const cantProveedores = Object.keys(figuritas.STOCK);  
        
        res.json(cantProveedores);



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;