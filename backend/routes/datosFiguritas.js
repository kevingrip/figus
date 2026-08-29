import { Router } from "express";
import { obtenerModeloFiguritas } from "../models/modeloFigu.js";
import { getAlbumFiguritas, getFiguritasMayores } from "../services/accionesFiguritas.js";

const router = Router({ mergeParams: true });

// OBTENER FIGURITAS DEL ALBUM
router.get("/", async (req, res) => {
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

        const figuritas = await getAlbumFiguritas(req.params.album)

        res.json(figuritas);



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/mayores", async (req, res) => {
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

        const figuritas = await getFiguritasMayores(req.params.album)

        res.json(figuritas);



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// AGREGAR Y DESCONTAR DE LA BASE
router.patch("/stockfiguritas/:accion/:proveedor/:id", async (req, res) => {
    try {
        const { album, accion, proveedor, id } = req.params;
        const { venta } = req.body || {};

        const albumes = [
            "mundialUsa2026",
            "mundialQatar2022",
            "futbolArgentino2023",
            "futbolArgentino2024",
            "libertadores2023",
            "copaAmerica2024"
        ]

        if (albumes.includes(album)) {
            const modelo = obtenerModeloFiguritas(album);

            const cantReal = `STOCK.${proveedor}.CANT`;
            const cantHistorica = `STOCK.${proveedor}.CANT_HISTORICA`;

            const incremento = accion === "incrementar" ? 1 : -1;


            const inc = {
                [cantReal]: incremento
            };

            // Si NO es una venta, modificar también la histórica
            if (venta !== true) {
                inc[cantHistorica] = incremento;
            }

            const figuActualizada = await modelo.findByIdAndUpdate(
                id,
                { $inc: inc },
                { new: true }
            );

            res.json(figuActualizada);
        }
    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }
});


export default router;