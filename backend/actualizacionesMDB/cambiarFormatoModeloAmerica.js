import mongoose from "mongoose";
import dotenv from "dotenv";
import { obtenerModeloFiguritas } from "../models/modeloFigu.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);



const Figurita = obtenerModeloFiguritas("mundialUsa2026");

const figuritas = await Figurita.find();

for (const figu of figuritas) {

    if (figu.TIPO === "COMUNES") {
        figu.STOCK.MATI.PRECIO = 900;
        await figu.save();
    }
}

console.log(` migrado`);


await mongoose.disconnect();