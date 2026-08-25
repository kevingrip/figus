import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ventasRoutes from "./routes/endpoint_ventas.js"
import datosFiguritas from "./routes/datosFiguritas.js"
import proveedores from "./routes/proveedores.js"
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mercadoLibreRoutes from "./routes/rutas_ml.js"
import fechasPublicaciones from "./routes/fechasPublicaciones.js";
import preguntas_mercadolibre from "./routes/preguntasGuardadas.js"
import { sincronizarStock } from "./services/mercadolibre/publicaciones.js";
import datosEnvios from "./routes/endpoint_envios.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const mongo_url = process.env.MONGO_URL

await mongoose.connect(mongo_url);

// try {
//     console.log("Iniciando sincronización de stock...");
//     await sincronizarStock()
//     console.log("Stock sincronizado correctamente");

// } catch (error) {
//     console.error("Error sincronizando stock:", error);
// }

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`servidor levantado en el puerto ${PORT}`)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "pages", "indexv2.html"));
});



app.use("/ventas",ventasRoutes)

app.use("/fechas",fechasPublicaciones)

app.use("/preguntamdb",preguntas_mercadolibre)

app.use("/album/:album",datosFiguritas)

app.use("/proveedores",proveedores)

app.use("/mercadolibre", mercadoLibreRoutes);

app.use("/envios",datosEnvios)

try {
    console.log("Iniciando sincronización de stock...");
    //await sincronizarStock()
    console.log("Stock sincronizado correctamente");
    console.log(`http://localhost/${PORT}/`)

} catch (error) {
    console.error("Error sincronizando stock:", error);
}