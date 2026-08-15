import mongoose from "mongoose";

const modelo_venta = new mongoose.Schema(
    {   
        DIA: Date,
        VENTAID: {
            type: Number,
            unique: true
        },
        VENDIDAS: [mongoose.Schema.Types.Mixed],
        FALTANTES: [String],
        PRECIO: Number,
        CUENTA: String,
        ENVIO: String,
        ALBUM: String,
        VERIFICADAS: Boolean,
        PAGADAS: Boolean,
        IMAGEN_NETO: {
            data: Buffer,
            contentType: String
        },
        IMPORTE_NETO:Number
    },
    {
        collection: "ventas"
    }
);

export default mongoose.models.Venta || mongoose.model("Venta", modelo_venta);