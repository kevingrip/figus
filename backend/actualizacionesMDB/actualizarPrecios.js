import mongoose from "mongoose";
import dotenv from "dotenv";
import {obtenerModeloFiguritas} from "../models/modeloFigu.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const modelo = obtenerModeloFiguritas("mundialUsa2026");

const figuritas = await modelo.find();

for (const figu of figuritas) {
    
    if (figu.STOCK["CAMBIOS"].PRECIO ===0){
        console.log(figu)
        // figu.STOCK["CAMBIOS"].PRECIO = figu.STOCK["MATI"].PRECIO;
        // await figu.save();
    }
}