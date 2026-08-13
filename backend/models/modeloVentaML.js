import mongoose from "mongoose";

const modelo_venta_ml = new mongoose.Schema(
    {   
        DIA: Date,
        VENTAID: Number,
        PRECIO: Number,
        CUENTA: String
    },
    {
        collection: "ventas_ml"
    }
);

export default mongoose.models.Venta_ML || mongoose.model("Venta_ML", modelo_venta_ml);