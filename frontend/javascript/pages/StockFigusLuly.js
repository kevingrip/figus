import { api } from "../../config.js";


function crearBotonContenedor(figu) {
    const contenedor = document.createElement("div");
    contenedor.style.display = "inline-flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";
    contenedor.style.justifyContent = "space-between";
    contenedor.style.width = "60px";
    contenedor.style.height = "70px";
    contenedor.style.border = "1px solid black";

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

    informacion.appendChild(textoSuperior);
    informacion.appendChild(textoInferior);



    contenedor.style.margin = "3px"
    contenedor.appendChild(informacion);

    return {
        contenedor,
        textoInferior
    }
}

function ajustarAltura(button) {
    if (window.innerWidth < 768) {
        button.style.height = "75px";
    }
}

function ajustarAnchoPantalla(button, album) {
    if (album == 'copaAmerica2024') {
        if (window.innerWidth > 768) {
            button.style.width = "4.3vw";
        } else {
            button.style.width = "14vw";
        }
    }

}

function cantidadBotonesAnchoAlbum(album, figu, contenedorFigu, resultados) {
    if (album == 'copaAmerica2024') {
        if (figu.NUM.substring(3, 5) == "22") {
            resultados.appendChild(contenedorFigu)
            resultados.appendChild(document.createElement('br'))
            resultados.appendChild(document.createElement('br'))
        } else {
            resultados.appendChild(contenedorFigu)
        }
    } else if (album == 'mundialQatar2022') {
        if (figu.NUM.substring(3, 5) == "19" || figu.NUM == "C8" || figu.NUM == "FWC29") {
            resultados.appendChild(contenedorFigu)
            resultados.appendChild(document.createElement('br'))
            resultados.appendChild(document.createElement('br'))
        } else {
            resultados.appendChild(contenedorFigu)
        }
    } else if (album == 'mundialUsa2026') {
        if (figu.NUM == "CC14" || figu.NUM.substring(3, 5) == "20") {
            resultados.appendChild(contenedorFigu)
            resultados.appendChild(document.createElement('br'))
            resultados.appendChild(document.createElement('br'))
        }
        else {
            resultados.appendChild(contenedorFigu)
        }
    } else {
        if (figu.NUM.substring(3, 5) == "19") {
            resultados.appendChild(contenedorFigu)
            resultados.appendChild(document.createElement('br'))
            resultados.appendChild(document.createElement('br'))
        } else {
            resultados.appendChild(contenedorFigu)
        }
    }
}

function datosBloques(figu, informacion, textoInferior, esClick) {
    let cantTotal = figu.STOCK.MATI.CANT + figu.STOCK.PDM.CANT + figu.STOCK.CAMBIOS.CANT + figu.STOCK.LULY.CANT+ figu.STOCK.OTROS.CANT
    textoInferior.textContent = `Cant: ${cantTotal}`;
    if (figu.TIPO == "COMUNES") {

        if (cantTotal == 0) {
            informacion.style.backgroundColor = '#FF4747'
        } else if (cantTotal > 9) {
            informacion.style.backgroundColor = 'lightgreen'
        } else if (esClick) {
            informacion.style.backgroundColor = 'yellow'
        } else if (cantTotal == 1) {
            informacion.style.backgroundColor = 'orange'
        }
    }
    else {
        if (cantTotal == 0) {
            informacion.style.backgroundColor = '#FF4747'
        } else if (cantTotal > 4) {
            informacion.style.backgroundColor = 'lightgreen'
        } else if (esClick) {
            informacion.style.backgroundColor = 'yellow'
        } else if (cantTotal == 1) {
            informacion.style.backgroundColor = 'orange'
        }

    }
}



export const StockFigusLuly = async (figuritas, albumRuta) => {


    const resultados = document.getElementById('stockLuly');
    resultados.innerHTML = ''


    const bloqueCantidades = document.createElement("div")
    const textoCantHist = document.createElement("p")
    const textoCantActual = document.createElement("p")
    const textoPrecioCompra = document.createElement("p")
    bloqueCantidades.append(textoCantHist, textoCantActual, textoPrecioCompra)
    resultados.appendChild(bloqueCantidades)


    figuritas.sort((a, b) => {
        const matchA = a.NUM.match(/([A-Za-z]+)(\d+)/); // Separar letras y números
        const matchB = b.NUM.match(/([A-Za-z]+)(\d+)/);

        if (matchA && matchB) {
            const letraA = matchA[1];
            const numeroA = parseInt(matchA[2]);
            const letraB = matchB[1];
            const numeroB = parseInt(matchB[2]);

            // Primero ordenar por letra
            if (letraA !== letraB) {
                return letraA.localeCompare(letraB);
            }

            // Luego ordenar por número
            return numeroA - numeroB;
        }

        return a.NUM.localeCompare(b.NUM); // Si no coincide con el patrón, usar orden alfabético normal
    });

    figuritas.forEach(figu => {
        if (figu.STOCK.LULY.CANT>0){
            const {contenedor,textoInferior} = crearBotonContenedor(figu)
            datosBloques(figu, contenedor, textoInferior, false)
            resultados.appendChild(contenedor)
        }
        
    });


};