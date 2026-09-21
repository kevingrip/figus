import axios from "axios";
import { obtenerToken } from "./token/obtenerToken.js";

const traduccionEntrega = (dato) => {
    if (dato === "self_service") {
        return "FLEX"
    } else if (dato === "xd_drop_off") {
        return "PUNTO DE DESPACHO"
    } else if (dato === "drop_off") {
        return "CORREO ARGENTINO"
    }
}

const traduccionEstado = (estado) => {
    if (estado === "shipped") {
        return "Enviado"
    } else if (estado === "ready_to_ship") {
        return "Listo para enviar"
    } else if (estado === "delivered") {
        return "Entregado"
    } else if (estado === "cancelled") {
        return "Cancelado"
    }
}

export const objetoShipping = (datos) => {
    if (!datos) return null;

    const address = datos.receiver_address;

    return {
        entrega: traduccionEntrega(datos.logistic_type) || null,
        estado: traduccionEstado(datos.status) || null,
        info_etiqueta: datos.substatus || null,
        ciudad: address?.city?.name || null,
        latitude: address?.latitude || null,
        longitude: address?.longitude || null,
        direccion: address?.address_line || null,
        ubicacion: address?.state?.name || null,
        comentario: address?.comment || null,
        cliente: address?.receiver_name || null,
        tiempoLimite: datos.lastTimeToSend || null,
    };
};

export const getShipping = async (shipping_id, seller_id, tokens) => {
    
    const tokenEncontrado = tokens.find(token => token.seller_id.toString() === seller_id.toString())

    try {
        const promesaShipping = axios.get(
            `https://api.mercadolibre.com/shipments/${shipping_id}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenEncontrado.access_token}`
                }
            }
        )

        const promesaDataLabel = axios.get(
            `https://api.mercadolibre.com/shipments/${shipping_id}/sla`,
            {
                headers: {
                    Authorization: `Bearer ${tokenEncontrado.access_token}`
                }
            }
        ).catch(() => null)

        const [shipping, dataLabel] = await Promise.all([promesaShipping, promesaDataLabel])

        if (dataLabel?.data) {
            shipping.data.statusLabel = dataLabel.data.status
            shipping.data.lastTimeToSend = dataLabel.data.expected_date
        } else {
            shipping.data.statusLabel = null;
            shipping.data.lastTimeToSend = null;
        }

        return shipping.data;
    } catch (error) {
        console.error("Shipping no encontrado")
    }

    return null;
}

export const getEtiqueta = async (seller, shipping) => {
    try {
        const tokens = await obtenerToken()
        const tokenEncontrado = tokens.find(token => token.seller_id.toString() === seller.toString())
        
        if (!tokenEncontrado || !tokenEncontrado.access_token) {
            throw new Error(`No se encontró token para seller: ${seller}`);
        }
        
        const url = `https://api.mercadolibre.com/shipment_labels?shipment_ids=${shipping}&savePdf=Y`
        const etiqueta = await axios.get(url, { 
                        headers: {
                            Authorization: `Bearer ${tokenEncontrado.access_token}`
                        },
                        responseType: 'arraybuffer' })

        return { 
            success: true, 
            pdfBytes: Buffer.from(etiqueta.data) 
        };


    } catch (error) {
        console.error('Error al obtener o guardar la etiqueta:', error);
        return { success: false, error: error.message };
    }
}