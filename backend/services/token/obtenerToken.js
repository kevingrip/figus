import axios from "axios";
import MercadoLibreToken from "../../models/tokenmodel.js"

export const obtenerToken = async () => {

    let token = await MercadoLibreToken.findOne();

    // Primera ejecución
    if (!token) {

        console.log("Creando documento del token...");

        token = await MercadoLibreToken.create({
            access_token: process.env.ML_ACCESS_TOKEN,
            refresh_token: process.env.ML_REFRESH_TOKEN,
            expires_at: Date.now() + (6 * 60 * 60 * 1000) // 6 horas
        });

        return token.access_token;
    }

    // Todavía es válido
    if (Date.now() < token.expires_at) {
        return token.access_token;
    }

    console.log("Renovando Access Token...");

    const { data } = await axios.post(
        "https://api.mercadolibre.com/oauth/token",
        {
            grant_type: "refresh_token",
            client_id: process.env.ML_CLIENT_ID,
            client_secret: process.env.ML_CLIENT_SECRET,
            refresh_token: token.refresh_token
        }
    );

    token.access_token = data.access_token;
    token.refresh_token = data.refresh_token;
    token.expires_at = Date.now() + (data.expires_in * 1000);

    await token.save();

    console.log("Token renovado.");

    return token.access_token;
};