import mongoose from "mongoose";
import fs from "fs";
import {obtenerModeloFiguritas} from "../modelo_mdb/modeloFigu.js";
import dotenv from "dotenv";

dotenv.config();

const archivo = "./baseFutarg.json";
const coleccion = "futbolArgentino2023";

const Figurita = obtenerModeloFiguritas(coleccion);
const mongo_url = process.env.MONGO_URL

await mongoose.connect(mongo_url);
// o tu URI de Mongo Atlas

const datos = JSON.parse(
    fs.readFileSync(archivo, "utf8")
);

// Borra la colección si querés empezar de cero
await Figurita.deleteMany({});

// Inserta todas las figuritas
await Figurita.insertMany(datos);

console.log("Figuritas importadas");

await mongoose.disconnect();