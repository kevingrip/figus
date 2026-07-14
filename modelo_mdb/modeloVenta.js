import mongoose from "mongoose";

const modelo_venta = new mongoose.Schema(
    {   
        DIA: Date,
        VENDIDAS: [String],
        FALTANTES: [String],
        PRECIO: Number,
        CUENTA: String,
        ENVIO: String,
        ALBUM: String
    },
    {
        collection: "ventas"
    }
);

export default mongoose.models.Venta || mongoose.model("Venta", modelo_venta);