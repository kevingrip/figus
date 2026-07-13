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

export const obtenerModeloFiguritas = (coleccion) => {
    return mongoose.model(
        coleccion,
        esquema_figu,
        coleccion
    );
};