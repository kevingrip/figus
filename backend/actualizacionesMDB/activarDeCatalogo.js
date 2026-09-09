import mongoose from "mongoose";
import dotenv from "dotenv";
import { obtenerModeloFiguritas } from "../models/modeloFigu.js";
import { getPublicaciones } from "../services/mercadolibre/publicaciones.js";

dotenv.config()

await mongoose.connect(process.env.MONGO_URL)

const modelo = obtenerModeloFiguritas("mundialUsa2026")

const publicaciones = await getPublicaciones()
const publicaciones_arg = publicaciones.filter(publicacion=>publicacion.album==="FIFA World Cup USA 2026")

const figuritas = await modelo.find()
const conMLA = figuritas.flatMap(figurita=>figurita.MLA)
const albumes=["Copa América 2024","Mundial Qatar","MUNDIAL QATAR","FIFA World Cup Qatar 2022","Mundial Qatar 2022","MUNDIAL Qatar","Fifa World Cup Qatar 2022 Panini","COPA AMERICA USA 2024","Copa América USA 2024"]
const titulos = ["Extra Sticker","Consulta Tus Faltantes","Sueltas"]
const publicacionesFaltantes = publicaciones.filter(publicacion=>!conMLA.includes(publicacion.id) && !albumes.includes(publicacion.album) && new Date(publicacion.date_created)>new Date("2026-01-01") && !titulos.some(t => publicacion.title?.toLowerCase().includes(t.toLowerCase().trim())))

console.log(publicacionesFaltantes)


// for (const pub of publicaciones_arg){
//     const figuritaEncontrada = await modelo.findOne({NUM:pub.figurita})
//     if (figuritaEncontrada){
//         await modelo.findOneAndUpdate(
//             {NUM:pub.figurita},
//             { $addToSet: { MLA: pub.id } }
//         )
//     }
// }

await mongoose.disconnect()