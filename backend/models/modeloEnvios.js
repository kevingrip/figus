import mongoose from "mongoose";

const esquema_envios = new mongoose.Schema({
    seller:String,
    ventaid: Number,
    shipping:Number,
    fechaVenta:String,
    fechaEntrega:Date,
    mes:String,
    producto:String,
    zona:String,
    envio:String,
    precio:String,
    pago:Number,
    dia:String,
    diaSemana:Number,
    pagar:{type:Boolean,default:false},
    usuario_pagador:String
});

export const modeloEnvios = () => {
    return mongoose.model("Envio", esquema_envios, "flex");
};