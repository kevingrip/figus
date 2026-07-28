import mongoose from "mongoose";
import dotenv from "dotenv";
import { obtenerModeloFiguritas } from "./modeloFigu.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const Modelo = obtenerModeloFiguritas("mundialUsa2026");

await Modelo.create({
    NUM: "FWC0",
    TIPO: "FWC",
    NOMBRE: "Intro",
    STOCK: {
        MATI: {
            CANT: 0,
            PRECIO: 3000
        },
        PDM: {
            CANT: 0,
            PRECIO: 3000
        },
        CAMBIOS: {
            CANT: 0,
            PRECIO: 0
        },
        LULY: {
            CANT: 0,
            PRECIO: 300
        },
        OTROS: {
            CANT: 0,
            PRECIO: 0
        }
    }
});