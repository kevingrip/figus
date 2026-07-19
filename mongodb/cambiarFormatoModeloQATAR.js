import mongoose from "mongoose";
import dotenv from "dotenv";
import { obtenerModeloFiguritas } from "../modelo_mdb/modeloFiguQAT.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);



const Figurita = obtenerModeloFiguritas("mundialQatar2022");

const figuritas = await Figurita.find();

for (const figu of figuritas) {
    console.log(figu.NUM, figu.CANT, figu.PRECIO);

    figu.STOCK = {
        MATI: {
            CANT: figu.CANT,
            PRECIO: figu.PRECIO,
            Q_HIST: figu.CANT
        },
        PDM: {
            CANT: 0,
            PRECIO: 0,
            Q_HIST:0
        },
        CAMBIOS: {
            CANT: 0,
            PRECIO: 0,
            Q_HIST:0
        },
        OTROS: {
            CANT: 0,
            PRECIO: 0,
            Q_HIST:0
        }
    };

    figu.CANT = undefined;
    figu.PRECIO = undefined;

    await figu.save();
}

console.log(` migrado`);


await mongoose.disconnect();