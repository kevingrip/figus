
const api = "https://figutld-api.onrender.com";

export async function obtenerFiguritas(album) {
    const res = await fetch(`${api}/${album}`);
    return await res.json();
}

export async function obtenerVentas() {
    const res = await fetch(`${api}/ventas`);
    return await res.json();
}