import { api } from "../../config.js";
import { ordenarAlfabeticamente } from "../utilidades/ordenarAlfabeticamente.js";
import { crearCardFigurita } from "../utilidades/bloqueFigurita/cardFigurita.js";
import { botonAccion } from "../utilidades/bloqueFigurita/botonSumaResta.js";

function ajustarAnchoPantalla(button, album) {
    if (album == 'copaAmerica2024') {
        if (window.innerWidth > 768) {
            button.style.width = "4.3vw";
        } else {
            button.style.width = "14vw";
        }
        // } else {
        //     if (window.innerWidth > 768) {
        //         button.style.width = "6vw";
        //     } else {
        //         button.style.width = "14vw";
        //     }
    }

}

// const cantidad_cards_x_fila = (album, figu, contenedorFigu, resultados) =>{
//     if (album == 'copaAmerica2024') {
//         if (figu.NUM.substring(3, 5) == "22") {
//             resultados.appendChild(contenedorFigu)
//             resultados.appendChild(document.createElement('br'))
//             resultados.appendChild(document.createElement('br'))
//         } else {
//             resultados.appendChild(contenedorFigu)
//         }
//     } else if (album == 'mundialQatar2022') {
//         if (figu.NUM.substring(3, 5) == "19" || figu.NUM == "C8" || figu.NUM == "FWC29") {
//             resultados.appendChild(contenedorFigu)
//             resultados.appendChild(document.createElement('br'))
//             resultados.appendChild(document.createElement('br'))
//         } else {
//             resultados.appendChild(contenedorFigu)
//         }
//     } else if (album == 'mundialUsa2026') {
//         if (figu.NUM == "CC14" || figu.NUM.substring(3, 5) == "20") {
//             resultados.appendChild(contenedorFigu)
//             resultados.appendChild(document.createElement('br'))
//             resultados.appendChild(document.createElement('br'))
//         }
//         else {
//             resultados.appendChild(contenedorFigu)
//         }
//     } else {
//         if (figu.NUM.substring(3, 5) == "19") {
//             resultados.appendChild(contenedorFigu)
//             resultados.appendChild(document.createElement('br'))
//             resultados.appendChild(document.createElement('br'))
//         } else {
//             resultados.appendChild(contenedorFigu)
//         }
//     }
// }

// function datosBloques(figu, informacion, textoInferior, esClick) {

//     const cantTotal = Object.values(figu.STOCK)
//     .reduce((total, proveedor) => total + proveedor.CANT, 0);

//     textoInferior.textContent = `Cant: ${cantTotal}`;
//     if (figu.TIPO == "COMUNES") {

//         if (cantTotal == 0) {
//             informacion.style.backgroundColor = '#FF4747'
//         } else if (cantTotal > 4) {
//             informacion.style.backgroundColor = 'lightgreen'
//         } else if (esClick) {
//             informacion.style.backgroundColor = 'yellow'
//         } else if (cantTotal == 1) {
//             informacion.style.backgroundColor = 'orange'
//         }
//     }
//     else {
//         if (cantTotal == 0) {
//             informacion.style.backgroundColor = '#FF4747'
//         } else if (cantTotal > 9) {
//             informacion.style.backgroundColor = 'lightgreen'
//         } else if (esClick) {
//             informacion.style.backgroundColor = 'yellow'
//         } else if (cantTotal == 1) {
//             informacion.style.backgroundColor = 'orange'
//         }

//     }
// }


async function crearProovedores(resultados, albumRuta, mostrarCantidades) {
    const respuesta = await fetch(`${api}/proveedores/${albumRuta}`, {
        method: "GET"
    });
    const listaProveedores = await respuesta.json();


    console.log("Lista de proveedores: ", listaProveedores)

    const selectorProveedor = document.createElement("div")
    const tituloProveedor = document.createElement("b")
    tituloProveedor.textContent = "Elegir Proveedor:"
    tituloProveedor.style.display = "flex"
    tituloProveedor.style.justifyContent = "center"

    const proveedores = document.createElement("div")
    const botonesProveedores = []
    listaProveedores.forEach(proveedor => {
        const botonProveedor = document.createElement("button")
        botonProveedor.textContent = proveedor
        botonesProveedores.push(botonProveedor)
        proveedores.appendChild(botonProveedor)
    })

    resultados.appendChild(tituloProveedor)
    resultados.appendChild(selectorProveedor)

    selectorProveedor.style.display = "flex"
    selectorProveedor.style.justifyContent = "center"
    selectorProveedor.style.marginTop = "20px"
    selectorProveedor.style.marginBottom = "50px"

    selectorProveedor.appendChild(proveedores)

    let proveedor = ''
    botonesProveedores.forEach(botonProveedor => {
        botonProveedor.addEventListener("click", () => {
            botonesProveedores.forEach(boton => {
                boton.style.backgroundColor = ""
            })
        })

        botonProveedor.addEventListener('click', () => {
            botonProveedor.style.backgroundColor = "lightblue"
            proveedor = botonProveedor.textContent
            mostrarCantidades()
        })
    })

    return {
        getProveedor: () => proveedor
    };

}


export const interfazMaxCant = async (tipo, figuritas, albumRuta) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const resultados = document.getElementById('resultados');
    resultados.innerHTML = ''

    const { getProveedor } = await crearProovedores(resultados, albumRuta, mostrarCantidades, figuritas)

    const bloqueCantidades = document.createElement("div")
    const textoCantHist = document.createElement("p")
    const textoCantActual = document.createElement("p")
    const textoPrecioCompra = document.createElement("p")
    bloqueCantidades.append(textoCantHist, textoCantActual, textoPrecioCompra)
    resultados.appendChild(bloqueCantidades)

    function mostrarCantidades() {
        const proveedor = getProveedor();
        let cantActual = 0
        figuritas.forEach(element => {
            cantActual += element.STOCK[proveedor].CANT
        });
        let cantHistorial = 0
        figuritas.forEach(element => {
            cantHistorial += element.STOCK[proveedor].CANT_HISTORICA
        });

        textoCantHist.textContent = `Cant Compradas a proveedor: ${cantHistorial}`
        textoCantActual.textContent = `Cant Stock Real: ${cantActual}`
        textoPrecioCompra.textContent = `Monto Invertido ($230): $${cantHistorial * 230}`
    }

    const elementCards = document.createElement("div")

    figuritas.forEach(figu => {

        const card = document.createElement("div")
        let { cardData,cantFiguritas } = crearCardFigurita(figu)
        const botonRestar = botonAccion("-")
        const botonSumar = botonAccion("+")

        botonRestar.addEventListener("click", () => {
            figu.STOCK.MATI.CANT -= 1
            cantFiguritas.textContent = `Cant: ${figu.STOCK.MATI.CANT}`;
        })

        card.append(botonSumar, cardData, botonRestar)
        card.style.margin = "5px"

        ajustarAnchoPantalla(card, albumRuta)

        //cantidadBotonesAnchoAlbum(albumRuta, figu, bloque, resultados)
        elementCards.append(card)

    })

    elementCards.style.display = "flex";
    elementCards.style.flexWrap = "wrap";

    resultados.append(elementCards)

};

