const api = window.location.hostname === "localhost" || window.location.hostname === "192.168.0.249"
    ? "http://localhost:5050"
    : "https://tu-backend.onrender.com";

export async function obtenerFiguritas(album) {
    const res = await fetch(`${api}/${album}`);
    return await res.json();
}

export async function obtenerVentas() {
    const res = await fetch(`${api}/ventas`);
    return await res.json();
}