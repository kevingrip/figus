import mongoose from "mongoose";

const preguntasVenta_schema = mongoose.Schema({
    SELLER_ID: Number,
    BUYER_ID: Number,
    ALBUM_ML: String,
    FIGUS_EN_STOCK: Array,
    FIGUS_SIN_STOCK: Array,
    ALBUM_REAL: String,
    FECHA: Date,
    COMPRADO: Boolean,
    MLA: String
},
    {
        collection:"preguntas_mercadolibre"
    })

export const obtenerPreguntaMeli = () =>{
    return mongoose.model(
        "Pregunta_ML",
        preguntasVenta_schema
    )
}