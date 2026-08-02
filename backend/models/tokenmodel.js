import mongoose from "mongoose";

const esquema = new mongoose.Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    expires_at: {
        type: Number,
        required: true
    }
});

export default mongoose.model("MercadoLibreToken", esquema);