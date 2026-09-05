export const estilosGastosGeneral = (element)=>{
    element.style.display="flex"
    element.style.flexDirection="row"   
    element.style.border="1px solid black"
    element.style.boxSizing = "border-box"
    element.style.width = "100%"
    element.style.margin = "5px"
    element.style.backgroundColor = "skyblue"
    element.style.whiteSpace = "pre-line"
}

export const estilosGastosDato = (element)=>{
    element.style.flex="1"
    element.style.margin="10px"
}

export const estiloFormulario = (formulario) =>{
    formulario.style.display="flex"
    formulario.style.flexDirection="column"
    formulario.style.justifyContent="space-evenly"
    formulario.style.alignItems="center"
    formulario.style.height="40vh"
    formulario.style.width="20vw"
    formulario.style.margin='40px'
    formulario.style.border='1px solid black'
    formulario.style.backgroundColor='lightblue'
}

export const estiloElementForm = (element)=>{
    element.style.width="100%"
    element.style.display="flex"
    element.style.justifyContent="center"
}