export const crearCardFigurita = (figu) => {
    
    const cardData = document.createElement("div");
    cardData.style.display = "flex";
    cardData.style.flexDirection = "column";
    cardData.style.alignItems = "center";
    cardData.style.width = "60px";
    cardData.style.border = "1px solid black";
    cardData.style.boxSizing = "border-box";

    const cantTotal = cantStockTotal(figu)
    const cantFiguritas = document.createElement("div")
    cantFiguritas.style.display="flex"
    cantFiguritas.style.justifyContent="center"
    cantFiguritas.textContent = `Cant: ${cantTotal}`;

    const informacion = document.createElement("div");
    informacion.style.display = "flex";
    informacion.style.flexDirection = "column";
    informacion.style.alignItems = "center";

    const textoSuperior = document.createElement("div");
    textoSuperior.textContent = figu.NUM;
    textoSuperior.style.fontSize = "13px";
    textoSuperior.style.fontWeight = "bold";

    const textoInferior = document.createElement("div");
    textoInferior.style.fontSize = "11px";

    const nombre = document.createElement("p")
    nombre.textContent = figu.NOMBRE
    nombre.style.fontSize = "9px"
    nombre.style.textAlign = "center"
    
    coloresCard(figu,cantTotal,cardData)

    textoInferior.append(cantFiguritas, nombre)

    informacion.appendChild(textoSuperior);
    informacion.append(textoInferior);

    ajustarAltura(cardData)

    cardData.appendChild(informacion);

    return {
        cardData,
        cantFiguritas
    }
}

const cantStockTotal = (figu) => {
    return Object.values(figu.STOCK)
        .reduce((total, proveedor) => total + proveedor.CANT, 0);
}

const coloresCard = (figu,cant,informacion) => {
    if (figu.TIPO == "COMUNES") {

        if (cant == 0) {
            informacion.style.backgroundColor = '#FF4747'
        } else if (cant > 4) {
            informacion.style.backgroundColor = 'lightgreen'
        } else if (cant == 1) {
            informacion.style.backgroundColor = 'orange'
        }
    }
    else {
        if (cant == 0) {
            informacion.style.backgroundColor = '#FF4747'
        } else if (cant > 9) {
            informacion.style.backgroundColor = 'lightgreen'
        } else if (cant == 1) {
            informacion.style.backgroundColor = 'orange'
        }
    }
}

function ajustarAltura(card) {
    if (window.innerWidth < 768) {
        card.style.minHeight = "75px";
    } else {
        card.style.minHeight = "85px";
    }
    card.style.height = "auto";
}