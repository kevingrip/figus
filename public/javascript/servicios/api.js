import { api } from "../../config.js";
export async function obtenerFiguritas(album) {
    console.log("api", api)

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

export const obtenerVentasML = async () =>{
    const ventasML = await fetch(`${api}/ventas/ventaml`)
    const ventasParseadas = await ventasML.json();

    return ventasParseadas;
}