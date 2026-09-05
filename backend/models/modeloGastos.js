import mongoose from "mongoose";

const modelo_gasto = new mongoose.Schema({
    DESCRIPCION: {
        type: String,
        required: true
    },
    FECHA: Date,
    CUENTA: {
        type: String,
        required: true
    },
    MONTO: {
        type: Number,
        required: true
    }
})

export const Gasto = mongoose.model("gastosDeCuenta",modelo_gasto)