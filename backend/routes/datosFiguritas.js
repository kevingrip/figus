import { Router } from "express";
import { obtenerModeloFiguritas } from "../modelo_mdb/modeloFigu.js";
const router = Router({ mergeParams: true });


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

        const modelo = obtenerModeloFiguritas(req.params.album);

        const cantidad = await modelo.countDocuments();
        console.log("Cantidad:", cantidad);

        const figuritas = await modelo.find().lean();

        res.json(figuritas);
        


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// AGREGAR Y DESCONTAR DE LA BASE
router.patch("/actualizarcosecha/:accion/:proveedor/:id", async (req, res) => {
    try {
        const { album, accion,proveedor, id } = req.params;

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

            const figuActualizada = await modelo.findByIdAndUpdate(
                id,
                { $inc: 
                    {
                        [cantHistorica]: incremento,
                        [cantReal]: incremento
                    }
                },
                {
                    new: true
                }
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

router.patch("/descontarventa/:proveedor/:id", async (req, res) => {
    try {
        const { album, accion,proveedor, id } = req.params;

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

            const cantProveedor = `STOCK.${proveedor}.CANT`;

            const figuActualizada = await modelo.findByIdAndUpdate(
                id,
                { $inc: 
                    {
                        [cantProveedor]: -1
                    }
                },
                {
                    new: true
                }
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