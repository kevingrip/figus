import { crearContenedor, crearContenedorResumen } from "./stylesVentasFlex.js";

export const pageVentasFlex = (flex,netoKevin,netoMati,vendedores) => {
    const getElementResumen = document.getElementById("resumenPrecioVentaFlex")
    const getElementVentas = document.getElementById("totalVentasFlex")
    const contenedorResumenNeto = crearContenedorResumen(netoKevin,netoMati)
    getElementResumen.append(contenedorResumenNeto)

    flex.forEach(orden => {
        const contenedorOrden = crearContenedor(orden,vendedores)
        getElementVentas.append(contenedorOrden)
    });

}

