
const api = "http://localhost:5050";

export async function obtenerFiguritas(album) {
    const res = await fetch(`${api}/${album}`);
    return await res.json();
}

export async function obtenerVentas() {
    const res = await fetch(`${api}/ventas`);
    return await res.json();
}