import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { obtenerModeloFiguritas } from "./modelo_mdb/modeloFigu.js";
import Venta from "./modelo_mdb/modeloVenta.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const mongo_url = process.env.MONGO_URL

await mongoose.connect(mongo_url);

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`servidor levantado en el puerto ${PORT}`)
})

app.get("/ventas", async (req, res) => {
    const ventas = await Venta.find().sort({ DIA: -1 }).lean();
    res.json(ventas);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "indexv2.html"));
});

app.get("/:album", async (req, res) => {
    try {
        const modelo = obtenerModeloFiguritas(req.params.album);
        const album = req.params.album

        const albumes = [
            "mundialUsa2026",
            "mundialQatar2022",
            "futbolArgentino2023",
            "futbolArgentino2024",
            "libertadores2023",
            "copaAmerica2024"
        ]        

        if (albumes.includes(album)) {
            const cantidad = await modelo.countDocuments();
            console.log("Cantidad:", cantidad);

            const figuritas = await modelo.find().lean();

            res.json(figuritas);
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/proveedores/:album", async (req, res) => {
    try {
        const modelo = obtenerModeloFiguritas(req.params.album);
        const album = req.params.album

        const albumes = [
            "mundialUsa2026",
            "mundialQatar2022",
            "futbolArgentino2023",
            "futbolArgentino2024",
            "libertadores2023",
            "copaAmerica2024"
        ]        

        if (albumes.includes(album)) {

            const figuritas = await modelo.findOne().lean();
            const cantProveedores = Object.keys(figuritas.STOCK);  
            
            res.json(cantProveedores);
        }else{
            console.log("Error de album pasado por parametro en GET /proveedores/:album")
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


app.patch("/:album/:accion/:proveedor/:id", async (req, res) => {
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
            const q_historial = `STOCK.${proveedor}.Q_HIST`;

            const incremento = accion === "incrementar" ? 1 : -1;

            const figuActualizada = await modelo.findByIdAndUpdate(
                id,
                { $inc: 
                    {
                        [cantProveedor]: incremento,
                        [q_historial]: incremento
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

app.post("/ventas", async (req, res) => {
    await Venta.create(req.body);
    res.json({ ok: true });
});