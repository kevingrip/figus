export const fechaArgentina = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

export const fechaArgentinaCorta = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

export const precioArgentino = (precio) => {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS"
    }).format(precio);
}