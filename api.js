// ACA EN EL ARCHIVO API, TRABAJO LOS DATOS JSON

const api = "http://localhost:5050";

export async function obtenerMundialUsa() {
    const res = await fetch(`${api}/mundialusa`);
    return await res.json();
}