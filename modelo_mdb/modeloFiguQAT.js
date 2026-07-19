import mongoose from "mongoose";

const esquema_figu = new mongoose.Schema({
    NUM: String,
    TIPO: String,
    NOMBRE: String,
    CANT: Number,
    PRECIO: Number,
    STOCK: {
        MATI: {
            CANT: Number,
            PRECIO: Number,
            Q_HIST: Number
        },
        PDM: {
            CANT: Number,
            PRECIO: Number,
            Q_HIST: Number
        },
        CAMBIOS: {
            CANT: Number,
            PRECIO: Number,
            Q_HIST: Number
        },
        OTROS: {
            CANT: Number,
            PRECIO: Number,
            Q_HIST: Number
        }
    }
});

export const obtenerModeloFiguritas = (coleccion) => {
    return mongoose.model(
        coleccion,
        esquema_figu,
        coleccion
    );
};