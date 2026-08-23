export const fechaArgentina = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

export const precioArgentino = (precio) => {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS"
    }).format(precio);
}