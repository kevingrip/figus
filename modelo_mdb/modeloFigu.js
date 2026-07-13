import mongoose from "mongoose";

const esquema_figu = new mongoose.Schema(
    {NUM: String,
    CANT: Number,
    PRECIO: Number,
    TIPO: String,
    NOMBRE: String
    },
    {
        collection: "mundialUsa2026"
    }
);

export default mongoose.model("Figurita", esquema_figu);