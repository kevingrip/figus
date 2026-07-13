import mongoose from "mongoose";
import fs from "fs";
import {obtenerModeloFiguritas} from "./modelo_mdb/modeloFigu.js";

const archivo = "./baseFutarg.json";
const coleccion = "futbolArgentino2023";

const Figurita = obtenerModeloFiguritas(coleccion);

await mongoose.connect("mongodb+srv://grippokevin:GwRtjbsM0Fo8LB45@backend1.tkbeh1y.mongodb.net/figuritas?retryWrites=true&w=majority&appName=backend1");
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