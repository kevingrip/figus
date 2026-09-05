export const estilosGastosGeneral = (element)=>{
    element.style.display="flex"
    element.style.flexDirection="row"   
    element.style.border="1px solid black"
    element.style.boxSizing = "border-box"
    element.style.width = "100%"
    element.style.margin = "5px"
    element.style.backgroundColor = "white"
    element.style.whiteSpace = "pre-line"
}

export const estilosBotones = (element) =>{
    element.style.display="flex"
    element.style.flexDirection="row"
    element.style.padding = "30px"
    element.style.justifyContent = "center" // "center" combina muy bien con gap
    element.style.gap = "15px"               // Espacio entre botones
}

export const estilosGastosDato = (element)=>{
    element.style.margin="10px"
    element.style.flex = "1"
}
