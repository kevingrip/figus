import mongoose from "mongoose";
import dotenv from "dotenv";
import modeloVenta from "../models/modeloVenta.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const resultadoUnset = await modeloVenta.updateMany(
    {}, 
    { $unset: { IMAGEN_NETO: "" } }
);

console.log(` migrado`);


await mongoose.disconnect();