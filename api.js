// ACA EN EL ARCHIVO API, TRABAJO LOS DATOS JSON

const api = "http://localhost:5050";

export async function obtenerFiguritas(album) {
    const res = await fetch(`${api}/${album}`);
    return await res.json();
}