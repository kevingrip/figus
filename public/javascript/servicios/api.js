import { api } from "../../config.js";
export async function obtenerFiguritas(album) {
    console.log("api", api)

    const res = await fetch(`${api}/album/${album}`);
    return await res.json();
}

export async function obtenerVentas() {
    const res = await fetch(`${api}/ventas`);
    return await res.json();
}

export async function obtenerPreguntas() {
    const res = await fetch(`${api}/mercadolibre/preguntas`);
    return await res.json();
}

export async function obtenerFechasPublicaciones() {
    const respuesta = await fetch(`${api}/fechas`);

    if (!respuesta.ok) {
        throw new Error("Error obteniendo fechas");
    }

    const publicaciones = await respuesta.json();
    return publicaciones;
}

export async function obtenerPublicacion(mla, seller) {
    console.log(mla)
    const respuesta = await fetch(`${api}/mercadolibre/publicaciones/item/${mla}?seller_id=${seller}`);

    if (!respuesta.ok) {
        throw new Error("Error obteniendo publicacion");
    }

    const publicaciones = await respuesta.json();
    return publicaciones;
}

export async function actualizarPrecio2000(mla, seller) {
    const peticion = await fetch(`${api}/mercadolibre/publicaciones/precio/${mla}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            precio: 2000,
            vendedor: seller
        })
    })
}

export const obtenerVentasML = async () => {
    const ventasML = await fetch(`${api}/ventas/ventaml`)
    const ventasParseadas = await ventasML.json();

    return ventasParseadas;
}

export const guardarPreguntaML = async (figusEnStock, figusSinStock, vendedor, cliente, albumConsulta, fecha, albumReal, mla) => {
    const preguntaMDB = await fetch(`${api}/preguntamdb/guardar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            figusEnStock,
            figusSinStock,
            vendedor,
            cliente,
            albumConsulta,
            fecha,
            albumReal,
            mla
        })
    })

    if (!preguntaMDB.ok) {
        throw new Error(`Error al guardar pregunta: ${preguntaMDB.status}`);
    }

    return await preguntaMDB.json();
}

export const obtenerPreguntasMDB = async () => {
    const preguntasMDB = await fetch(`${api}/preguntamdb`)
    const preguntasParseadas = await preguntasMDB.json();

    return preguntasParseadas;
}

export const estadoCompradoMDB = async (preg_id) => {
    const respuesta = await fetch(
        `${api}/preguntamdb/confirmar/${preg_id}`,
        {
            method: "POST"
        }
    );

    if (!respuesta.ok) {
        throw new Error("No se pudo confirmar la compra");
    }

    const preguntaActualizada = await respuesta.json();

    return preguntaActualizada;
}

export async function obtenerFiguritasOrderCant(album, cant_compradas) {

    const res = await fetch(`${api}/album/${album}`);
    const figus_parseadas = await res.json();

    const figusComunes = figus_parseadas.filter(
        figu => figu.TIPO === "COMUNES"
    );

    figusComunes.forEach(figu => {
        figu.CANT_TOTAL = Object.values(figu.STOCK || {}).reduce(
            (total, proveedor) => total + (proveedor?.CANT || 0),
            0
        );
    });

    figusComunes.sort((a, b) => b.CANT_TOTAL - a.CANT_TOTAL);

    return figusComunes.slice(0, cant_compradas);

}