import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { obtenerModeloFiguritas } from "./modelo_mdb/modeloFigu.js";
import dotenv from "dotenv";

dotenv.config();

const mongo_url = process.env.MONGO_URL

await mongoose.connect(mongo_url);

const app = express()
app.use(express.json());
app.use(cors());

app.listen(5050,()=>{
    console.log("servidor levantado en el puerto 5050")
})

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.get("/mundialusa", async (req, res) => {
    try {
        const esquema_figu = obtenerModeloFiguritas("mundialUsa2026");
        const cantidad = await esquema_figu.countDocuments();
        console.log("Cantidad:", cantidad);

        const figuritas = await esquema_figu.find().lean();

        res.json(figuritas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/mundialqatar", async (req, res) => {
    try {
        const esquema_figu = obtenerModeloFiguritas("mundialQatar2022");
        const cantidad = await esquema_figu.countDocuments();
        console.log("Cantidad:", cantidad);

        const figuritas = await esquema_figu.find().lean();

        res.json(figuritas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.patch("/mundialusa/incrementar/:id", async (req, res) => {
    try {
        const esquema_figu = obtenerModeloFiguritas("mundialUsa2026");
        const figuActualizada = await esquema_figu.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {
                    CANT: 1
                }
            },
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

app.patch("/mundialusa/decrementar/:id", async (req, res) => {
    try {
        const esquema_figu = obtenerModeloFiguritas("mundialUsa2026");
        const figuActualizada = await esquema_figu.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {
                    CANT: -1
                }
            },
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



///QATAR

app.patch("/mundialqatar/incrementar/:id", async (req, res) => {
    try {
        const esquema_figu = obtenerModeloFiguritas("mundialQatar2022");
        const figuActualizada = await esquema_figu.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {
                    CANT: 1
                }
            },
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

app.patch("/mundialqatar/decrementar/:id", async (req, res) => {
    try {
        const esquema_figu = obtenerModeloFiguritas("mundialQatar2022");
        const figuActualizada = await esquema_figu.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {
                    CANT: -1
                }
            },
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
