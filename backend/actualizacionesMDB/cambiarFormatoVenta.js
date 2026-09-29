import mongoose from "mongoose";
import dotenv from "dotenv";
import modeloVenta from "../models/modeloVenta.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const ventas = await modeloVenta.find()

for (const venta of ventas) {
    
    venta.VERIFICADAS=false
    venta.PAGADAS=false
    console.log(venta)
    await venta.save();
    
}

console.log(` migrado`);


await mongoose.disconnect();