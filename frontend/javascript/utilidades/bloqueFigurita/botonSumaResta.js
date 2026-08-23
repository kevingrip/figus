export const botonAccion = (accion) =>{
    if (!["+","-"].includes(accion)){
        throw new Error(`Acción de boton inválida: ${accion}`);
    }
    const boton = document.createElement("button");
    accion === "+" ? boton.textContent = "▲" : boton.textContent = "▼"
    boton.style.height = "25px";
    boton.style.width = "60px";
    boton.style.border = "1px solid black";
    return boton
}