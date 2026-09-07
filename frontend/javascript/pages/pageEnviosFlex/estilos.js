export const estiloFlex = (contenedor, direccion, espaciado, ancho) => {
    contenedor.style.width = ancho || "15vw"
    contenedor.style.marginTop = "20px"
    contenedor.style.display = "flex"
    contenedor.style.alignItems = "center"
    if (direccion) contenedor.style.flexDirection = direccion
    if (espaciado === "jcc") {
        contenedor.style.justifyContent = "center"
    } else if (espaciado === "jc-sp-ev") {
        contenedor.style.justifyContent = "space-evenly"
    }

}

export const radioContenedor = (contenedor, lugar, posicion) => {
    if (lugar === "izq") {
        if (posicion==="arriba"){
            contenedor.style.borderTopLeftRadius = "30px"
        }else if (posicion==="abajo"){
            contenedor.style.borderBottomLeftRadius = "30px"
        }
    }
    else if (lugar === "der") {
        if (posicion==="arriba"){
            contenedor.style.borderTopRightRadius = "30px"
        }else if (posicion==="abajo"){
            contenedor.style.borderBottomRightRadius = "30px"
        }       
    }else{
        contenedor.style.borderRadius = "30px"
    }
}

export const estiloContenedorPrincipal = (contenedor) => {
    contenedor.style.width = "auto"
    contenedor.style.height = "auto"
    contenedor.style.minHeight = "20vh"    
    radioContenedor(contenedor)
    contenedor.style.display = "flex"
    contenedor.style.flexDirection = "row"
    contenedor.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
}

export const estiloContenedorHijo = (contenedor) => {
    contenedor.style.flex = "1";
    contenedor.style.height = "auto";
    contenedor.style.backgroundColor = "white"
    contenedor.style.border="solid black 1px"
}

export const estiloNombreProducto = (contenedor,orden) =>{
    orden.envio?.pagar ? contenedor.style.backgroundColor = "lightgreen" : contenedor.style.backgroundColor = "orange"
    radioContenedor(contenedor,"izq","arriba")
    radioContenedor(contenedor,"der","arriba")
    contenedor.style.display="flex"
    contenedor.style.justifyContent="center"
    contenedor.style.margin="0"
}