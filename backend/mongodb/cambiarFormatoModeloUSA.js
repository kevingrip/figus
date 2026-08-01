import mongoose from "mongoose";
import dotenv from "dotenv";
import { obtenerModeloFiguritas } from "../modelo_mdb/modeloFigu.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const Figurita = obtenerModeloFiguritas("mundialUsa2026");

const figuritas = await Figurita.find();

for (const figu of figuritas) {
    

        figu.STOCK = {
        MATI: {
            CANT: figu.STOCK["MATI"].CANT,
            PRECIO: figu.STOCK["MATI"].PRECIO,
            CANT_HISTORICA: figu.STOCK["MATI"].CANT
        },
        PDM: {
            CANT: 0,
            PRECIO: 0,
            CANT_HISTORICA:0
        },
        CAMBIOS: {
            CANT: 0,
            PRECIO: 0,
            CANT_HISTORICA:0
        },
        LULY: {
            CANT: 0,
            PRECIO: 300,
            CANT_HISTORICA:0
        },
        OTROS: {
            CANT: 0,
            PRECIO: 0,
            CANT_HISTORICA:0
        }
    };

    await figu.save();
    
}

console.log(` migrado`);


await mongoose.disconnect();