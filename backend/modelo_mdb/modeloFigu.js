import mongoose from "mongoose";

const esquema_figu = new mongoose.Schema({
    NUM: String,
    TIPO: String,
    NOMBRE: String,
    STOCK: {
        MATI: {
            CANT: Number,
            PRECIO: Number,
            CANT_HISTORICA: Number
        },
        PDM: {
            CANT: Number,
            PRECIO: Number,
            CANT_HISTORICA: Number
        },
        CAMBIOS: {
            CANT: Number,
            PRECIO: Number,
            CANT_HISTORICA: Number
        },
        LULY: {
            CANT: Number,
            PRECIO: Number,
            CANT_HISTORICA: Number
        },
        OTROS: {
            CANT: Number,
            PRECIO: Number,
            CANT_HISTORICA: Number
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