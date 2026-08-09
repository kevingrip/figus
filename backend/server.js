import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ventasRoutes from "./routes/ventas.js"
import datosFiguritas from "./routes/datosFiguritas.js"
import proveedores from "./routes/proveedores.js"
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mercadoLibreRoutes from "./routes/rutas_ml.js"
import fechasPublicaciones from "./routes/fechasPublicaciones.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const mongo_url = process.env.MONGO_URL

await mongoose.connect(mongo_url);

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`servidor levantado en el puerto ${PORT}`)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "indexv2.html"));
});

app.use("/ventas",ventasRoutes)

app.use("/fechas",fechasPublicaciones)

app.use("/:album",datosFiguritas)

app.use("/proveedores",proveedores)

app.use("/mercadolibre", mercadoLibreRoutes);