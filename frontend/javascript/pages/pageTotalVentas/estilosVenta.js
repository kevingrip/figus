export const estiloContenedorGeneralVenta = (elemento) =>{
    elemento.style.display="flex"
    elemento.style.flexDirection="column"
    elemento.style.border="1px solid"
    elemento.style.borderRadius="20px"
    elemento.style.margin="30px"
    elemento.style.minHeight="50vh"
    elemento.style.backgroundColor='#0a172d'
}

export const estiloContenedorBarra = (element) =>{
    element.style.width = "100%";
    element.style.boxSizing = "border-box";

    // 2. Definir contenedor Flexbox
    element.style.display = "flex";
    element.style.alignItems = "center"; // Centra verticalmente los elementos

    // 3. Aplicar flex: 1 y alineación a cada hijo para repartir el ancho en partes iguales
    Array.from(element.children).forEach(child => {
        child.style.flex = "1";          // Fuerza a cada columna a tener exactamente el mismo ancho
        child.style.minWidth = "0";       // Evita que textos largos rompan el ancho equitativo
        child.style.textAlign = "center"; // Centra el contenido dentro de su columna
    });
}

export const estiloContenedorCentral = (element) =>{
    element.style.display="flex"
    element.style.padding="20px"
}

export const estiloFlexColumn = (element) =>{
    element.style.display="flex"
    element.style.flexDirection="column"
}

export const estiloVariante = (element) =>{
    element.style.display="flex"
    element.style.flexDirection="column"
    element.style.backgroundColor="#2e2e37"
    element.style.color="white"
    element.style.fontSize="2vh"
    element.style.padding="10px"
    element.style.margin="10px"
    element.style.borderRadius="10px"
    element.style.width="42vw"
}

export const estiloVarianteInfo = (element) =>{
    element.style.display="flex"
    element.style.flexDirection="row"
    element.style.backgroundColor="#a79d9d1e"
}
export const estiloVarianteInfoDer = (element) =>{
    element.style.display="flex"
    element.style.width="40%"
    element.style.margin="5px"
    element.style.paddingRight="10px"
    element.style.justifyContent="end"
}

export const estiloVarianteInfoIzq = (element) =>{
    element.style.display="flex"
    element.style.flexDirection="column"
    element.style.width="60%"
    element.style.margin="10px"
    element.style.justifyContent="center"
}

export const estiloElementFiguritas = (element) =>{
    element.style.display="flex"
    element.style.flexWrap="wrap"
    element.style.margin="20px"
    element.style.borderRadius="10px"
    element.style.backgroundColor="#988e8e9e"
}

export const estiloElementFlexRow = (element) =>{
    element.style.display="flex"
    element.style.flexDirection="row"
}

export const estiloElementPago = (element) =>{
    element.style.border="0.5px solid white"
    element.style.borderRadius="10px"
    element.style.margin="10px"
    element.style.height = "50vh"
    element.style.width = "15vw"
}

export const estiloElementGralEnvios = (element) =>{
    element.style.display="flex"
    element.style.height="50%"
    element.style.width="100%"
    element.style.alignItems= "flex-end";
    element.style.marginBottom= "10px";
}

export const estiloElementGeneralDatosDer = (element) =>{
    element.style.display="flex"
    element.style.width="100%"
    element.style.justifyContent="flex-end"
}

export const estiloElementGralDatos = (element) =>{
    element.style.display="flex"
    element.style.height="50%"
}

export const estiloElementBotones = (element) =>{
    element.style.display="flex"
    element.style.alignItems="center"
    element.style.justifyContent="center"
    element.style.height="8vh"
    element.style.width="8vw"
}

export const estiloElementGeneralBotonesAcciones = (element) =>{
    element.style.display = "flex"
    element.style.justifyContent = "center"
    element.style.flexDirection = "row"
    element.style.minHeight = "8vh"
    element.style.backgroundColor = "#4a37a9ac"
    element.style.marginLeft = "20px"
}