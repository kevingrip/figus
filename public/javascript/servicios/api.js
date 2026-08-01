import { api } from "../../config.js";
export async function obtenerFiguritas(album) {
    console.log("api",api)

    const res = await fetch(`${api}/${album}`);
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