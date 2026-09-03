import mongoose from "mongoose";

const modelo_precios_automaticos = new mongoose.Schema(
    {   
        MLA: { type: String, required: true },
        PRECIO_ANT: Number,
        PRECIO_NUEVO: Number        
    },
    {
        collection: "precios_automaticos"
    }
);

export const Precios = 
  mongoose.models.Precios || mongoose.model("Precios", modelo_precios_automaticos);