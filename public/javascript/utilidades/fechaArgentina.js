export const fechaArgentina = (fecha) =>{
    return new Date(fecha).toLocaleDateString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
});
}