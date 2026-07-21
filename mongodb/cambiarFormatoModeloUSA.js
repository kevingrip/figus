import mongoose from "mongoose";
import dotenv from "dotenv";
import { obtenerModeloFiguritas } from "../modelo_mdb/modeloFigu.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);



const Figurita = obtenerModeloFiguritas("mundialUsa2026");

const figuritas = await Figurita.find();

for (const figu of figuritas) {
    

    if (["ENG11"].some(codigo => figu.NUM.includes(codigo))){
        
        figu.STOCK.MATI.PRECIO=4000
        figu.TIPO="ESPECIAL"
        console.log(figu.NUM, figu.STOCK["MATI"].CANT, figu.STOCK["MATI"].PRECIO);
    }


    // figu.STOCK = {
    //     MATI: {
    //         CANT: figu.STOCK["MATI"].CANT,
    //         PRECIO: figu.STOCK["MATI"].PRECIO,
    //         Q_HIST: figu.STOCK["MATI"].CANT
    //     },
    //     PDM: {
    //         CANT: 0,
    //         PRECIO: 0,
    //         Q_HIST:0
    //     },
    //     CAMBIOS: {
    //         CANT: 0,
    //         PRECIO: 0,
    //         Q_HIST:0
    //     },
    //     OTROS: {
    //         CANT: 0,
    //         PRECIO: 0,
    //         Q_HIST:0
    //     }
    // };

    // figu.CANT = undefined;
    // figu.PRECIO = undefined;

    await figu.save();
}

console.log(` migrado`);


await mongoose.disconnect();