import { crearBotonContenedor } from "../componentes/botonContenedor.js";
import { ordenarAlfabeticamente } from "../utilidades/ordenarAlfabeticamente.js";
import { botonCopiar } from "../componentes/botonCopiarFigus.js";

const agregarEspacio = (figu) => {
    let figurita
    if (figu.TIPO === "COCA") {
        figurita = figu.NUM.slice(0, 2) + " " + figu.NUM.slice(2);
    } else {
        figurita = figu.NUM.slice(0, 3) + " " + figu.NUM.slice(3);
    }
    return figurita
}

export const sinStock = async (figus, album) => {

    const resultSinStock = document.getElementById('resultadosSinStock');
    resultSinStock.innerHTML = ''; // Limpiar resultados anteriores
    const contenedorResultados = document.createElement("div");


    const proveedores = ["PDM", "ZONAKIDS"]
    const elementProveedores = document.createElement("div")
    proveedores.forEach(proveedor => {
        const boton = document.createElement("button")
        boton.textContent = proveedor
        boton.style.margin="5px"
        elementProveedores.appendChild(boton)
        elementProveedores.style.display="flex"
        elementProveedores.style.justifyContent="center"
        resultSinStock.appendChild(elementProveedores)
        let result;
        boton.addEventListener("click", () => {
            contenedorResultados.innerHTML=""
            if (proveedor == "PDM") {
                const pdm = figuritasPDM()
                contenedorResultados.appendChild(pdm)
            } else {
                const {elementCopiar,contenedorFiguritas} = figuritasZonaKids()
                contenedorResultados.appendChild(elementCopiar)
                contenedorResultados.appendChild(contenedorFiguritas)
            }
        })
        resultSinStock.appendChild(contenedorResultados)
    })



    const figuritasPDM = () => {
        let stockFiguritas = {
            "Sin Stock": { figu: [], color: "#ff0000b3" },
            "1 en Stock": { figu: [], color: "#ff5500ad" },
            "2 en Stock": { figu: [], color: null }
        }

        figus.forEach(figu => {
            const cantStock = Object.values(figu.STOCK)
                .reduce((total, proveedor) => total + proveedor.CANT, 0);


            if (cantStock == 0) {
                stockFiguritas["Sin Stock"].figu.push(figu)
            } else if (cantStock == 1) {
                stockFiguritas["1 en Stock"].figu.push(figu)
            } else if (cantStock == 2) {
                stockFiguritas["2 en Stock"].figu.push(figu)
            }
        })

        ordenarAlfabeticamente(stockFiguritas["Sin Stock"].figu)
        ordenarAlfabeticamente(stockFiguritas["1 en Stock"].figu)
        ordenarAlfabeticamente(stockFiguritas["2 en Stock"].figu)

        
        const contenedorPadre = document.createElement("div")
        Object.entries(stockFiguritas).forEach(([clave, valor]) => {
            const contenedorInfo = document.createElement('div')
            contenedorInfo.style.marginBottom = "30px"

            const info = document.createElement('div')
            info.style.display = "flex"
            info.style.flexDirection = "column"
            const p1 = document.createElement('p');
            p1.style.whiteSpace = "pre-wrap";
            p1.style.wordBreak = "break-word";
            const titulo = document.createElement('h3');
            titulo.style.margin = "10px"
            titulo.textContent = `${clave}: ( ${stockFiguritas[clave].figu.length} )`
            info.appendChild(titulo)
            console.log(valor.figu)
            const copiar = botonCopiar(valor.figu,true)
            copiar.style.height="40px"
            copiar.style.margin="40px"
            info.appendChild(copiar)
            copiar.style.marginBottom = "20px"
            contenedorInfo.appendChild(info)
            valor.figu.forEach(figu => {
                const { contenedor, color } = crearBotonContenedor(agregarEspacio(figu), album, "20px")
                if (valor.color) {
                    contenedor.style.backgroundColor = valor.color
                    contenedorInfo.style.backgroundColor = valor.color.slice(0, 7) + "30";
                } else {
                    contenedorInfo.style.backgroundColor = color + "30";
                }
                contenedorInfo.appendChild(contenedor)
            })
            contenedorPadre.appendChild(contenedorInfo)
            
        });
        return contenedorPadre
    }

    const figuritasZonaKids = () => {
        const tipos = [...new Set(figus.map(figu => figu.TIPO))];
        console.log(tipos)
        const figusObligatorias = figus.filter(figu =>
            ['COCA', 'MESSI', 'PANINI'].includes(figu.TIPO)
        );
        const figusCompletar = figus.filter(figu =>
            ['FWC', 'ESCUDO AFA',"ESCUDO","AFA", 'ESPECIAL'].includes(figu.TIPO)
        ).sort((a, b) => {
        const cantA = Object.values(a.STOCK)
            .reduce((total, proveedor) => total + proveedor.CANT, 0);

        const cantB = Object.values(b.STOCK)
            .reduce((total, proveedor) => total + proveedor.CANT, 0);

        return cantA - cantB;
    });

        const figuritasComprar = []

        const contenedorFiguritas = document.createElement("div")
        figusObligatorias.forEach(f => {
            let figu = {
                ...f,
                NUM: f.NUM.replace("FWC0", "00")
            };
            let { contenedor, color } = (crearBotonContenedor(figu, album))
            contenedor.style.backgroundColor = "lightgreen"
            contenedorFiguritas.appendChild(contenedor)
            figuritasComprar.push(figu)
        })
        let cantFigus = figusObligatorias.length
        figusCompletar.forEach(figu => {
            cantFigus++
            let { contenedor, color } = (crearBotonContenedor(figu, album))
            contenedorFiguritas.appendChild(contenedor)
            if (cantFigus<=30) {
                contenedor.style.backgroundColor = "lightgreen"
                figuritasComprar.push(figu)
            }
        })

        console.log(figuritasComprar)
        const copiar = botonCopiar(figuritasComprar)
        copiar.style.height="50px"
        const elementCopiar = document.createElement("div")
        elementCopiar.style.display="flex"
        elementCopiar.style.justifyContent="center"
        elementCopiar.style.margin="30px"
        elementCopiar.appendChild(copiar)
        return {elementCopiar,contenedorFiguritas}

    }





    // const sinStock2 = document.createElement('div')
    // sinStock2.style.display="flex"
    // sinStock2.style.flexDirection="column"
    // const p2 = document.createElement('p');
    // p2.style.whiteSpace = "pre-wrap";
    // p2.style.wordBreak = "break-word";
    // const s1h3 = document.createElement('h3');    
    // s1h3.textContent = '1 en Stock: '
    // sinStock2.appendChild(s1h3)
    // const copiar = botonCopiar(figuritas0)
    // sinStock.appendChild(copiar)
    // resultSinStock.appendChild(s1h3);
    // figuritas1.forEach(figu => {        
    //     const botonContenedor = crearBotonContenedor(agregarEspacio(figu), album, "20px")
    //     botonContenedor.style.backgroundColor="#ff5500ad" 
    //     resultSinStock.appendChild(botonContenedor)
    // })

    // const p3 = document.createElement('p');
    // p3.style.whiteSpace = "pre-wrap";
    // p3.style.wordBreak = "break-word";
    // const s2h3 = document.createElement('h3');
    // s2h3.textContent = '2 en Stock: '
    // resultSinStock.appendChild(s2h3);
    // figuritas2.forEach(figu => {        
    //     resultSinStock.appendChild(crearBotonContenedor(agregarEspacio(figu), album, "20px"))
    // })
}