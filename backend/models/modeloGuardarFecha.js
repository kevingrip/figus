import mongoose from "mongoose";

const esquema_fecha = new mongoose.Schema({
    
    SELLER_ID: Number,
    MLA:  {
        type: String,
        required: true,
        unique: true
    },
    FECHA_LIMITE: {
        type: Date
    }
}, {
    collection: "actualizar_fechas"
});


export const obtenerFechaLimite = () =>{
    return mongoose.model(
        "Publicacion",
        esquema_fecha
    )
}