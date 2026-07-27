import mongoose from "mongoose";
import dotenv from "dotenv";
import { obtenerModeloFiguritas } from "../modelo_mdb/modeloFiguQAT.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);



const Figurita = obtenerModeloFiguritas("mundialUsa2026");

const figuritas = await Figurita.find();

for (const figu of figuritas) {
    

    figu.STOCK = {
        MATI: {
            CANT: figu.STOCK.MATI.CANT,
            PRECIO: figu.STOCK.MATI.PRECIO
        },
        PDM: {
            CANT: 0,
            PRECIO: 0
        },
        CAMBIOS: {
            CANT: 0,
            PRECIO: 0
        },
        OTROS: {
            CANT: 0,
            PRECIO: 0
        }
    };

    console.log(figu.STOCK);

    figu.CANT = undefined;
    figu.PRECIO = undefined;

    await figu.save();
}

console.log(` migrado`);


await mongoose.disconnect();