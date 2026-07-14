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
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.listen(5050,()=>{
    console.log("servidor levantado en el puerto 5050")
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "indexv2.html"));
});

app.get("/:album", async (req, res) => {
    try {
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


app.patch("/:album/:accion/:id", async (req, res) => {
    try {
        const { album, accion, id } = req.params;

        const modelo = obtenerModeloFiguritas(album);

        const incremento = accion === "incrementar" ? 1 : -1;

        const figuActualizada = await modelo.findByIdAndUpdate(
            id,
            {$inc: {CANT: incremento}},
            {
                new: true
            }
        );

        res.json(figuActualizada);

    } catch(error) {

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

app.get("/ventas", async (req, res) => {
    const ventas = await Venta.find().lean();
    res.json(ventas);
});