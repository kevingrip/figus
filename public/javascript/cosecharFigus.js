import { api } from "../config.js";
import { ordenarAlfabeticamente } from "./ordenarAlfabeticamente.js";

function crearBotonContenedor(figu) {
    const contenedor = document.createElement("div");
    contenedor.style.display = "inline-flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";
    contenedor.style.justifyContent = "space-between";
    contenedor.style.width = "60px";
    contenedor.style.height = "70px";
    contenedor.style.border = "1px solid black";

    const botonMenos = document.createElement("button");
    botonMenos.textContent = "▼";
    botonMenos.style.height = "30px";
    botonMenos.style.width = "60px";

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

    const botonMas = document.createElement("button");
    botonMas.textContent = "▲";
    botonMas.style.height = "30px";
    botonMas.style.width = "60px";

    contenedor.style.margin = "3px"

    contenedor.appendChild(botonMas);
    contenedor.appendChild(informacion);
    contenedor.appendChild(botonMenos);

    return {
        contenedor,
        botonMas,
        botonMenos,
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
        // } else {
        //     if (window.innerWidth > 768) {
        //         button.style.width = "6vw";
        //     } else {
        //         button.style.width = "14vw";
        //     }
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

    const cantTotal = Object.values(figu.STOCK)
    .reduce((total, proveedor) => total + proveedor.CANT, 0);
    
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


export const cosecharFigus = async (tipo, figuritas, albumRuta) => {

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

    let figusSeleccionadas = ""

    ordenarAlfabeticamente(figuritas)

    figuritas.forEach(figu => {

        const { contenedor, botonMas, botonMenos, textoInferior } = crearBotonContenedor(figu)

        ajustarAltura(contenedor);
        ajustarAnchoPantalla(contenedor, albumRuta)
        datosBloques(figu, contenedor, textoInferior, false)

        cantidadBotonesAnchoAlbum(albumRuta, figu, contenedor, resultados)

        botonMas.addEventListener('click', async () => {

            try {
                const proveedor = getProveedor();

                if (!proveedor) {
                    Toast.fire({
                        icon: 'error',
                        title: `Debe seleccionar un proveedor`
                    })
                }

                //ACTUALIZAR CON MONGO
                const respuesta = await fetch(`${api}/${albumRuta}/actualizarcosecha/incrementar/${proveedor}/${figu._id}`, {
                    method: "PATCH"
                });

                const figuActualizada = await respuesta.json();

                // actualizar el objeto del frontend
                figu.STOCK[proveedor].CANT = figuActualizada.STOCK[proveedor].CANT;
                figu.STOCK[proveedor].CANT_HISTORICA = figuActualizada.STOCK[proveedor].CANT_HISTORICA;

                let figuCantActualizada = figuActualizada.STOCK[proveedor].CANT;

                mostrarCantidades()

                agregarFigu()

                Toast.fire({
                    icon: 'success',
                    title: "Agregada Correctamente",
                    html: `
                            Figurita: ${figu.NUM}<br>
                            Proveedor: ${proveedor}<br>
                            Cantidad: ${figuCantActualizada}
                        `
                })


                datosBloques(figuActualizada, contenedor, textoInferior, true)

                figusSeleccionadas = figu.NUM
                const filteredFigus = figuritas.filter(figu => figusSeleccionadas == (figu.NUM));
                //console.log(filteredFigus)

                filteredFigus.forEach(figu => {
                    const li = document.createElement('li');
                    li.classList.add('listaClass')
                    li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figuCantActualizada} \u00A0\u00A0\u00A0  $ ${figuActualizada.STOCK[proveedor].PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;

                    resultados.appendChild(li);
                });

            } catch (error) {
                console.error(`error en: `, error)
            }

        })


        botonMenos.addEventListener('click', async () => {
            const proveedor = getProveedor();
            if (!proveedor) {
                Toast.fire({
                    icon: 'error',
                    title: `Debe seleccionar un proveedor`
                })
            }
            if (figu.STOCK[proveedor].CANT > 0) {
                try {
                    //ACTUALIZAR CON MONGO
                    const respuesta = await fetch(`${api}/${albumRuta}/actualizarcosecha/decrementar/${proveedor}/${figu._id}`, {
                        method: "PATCH"
                    });

                    const figuActualizada = await respuesta.json();

                    // actualizar el objeto del frontend
                    figu.STOCK[proveedor].CANT = figuActualizada.STOCK[proveedor].CANT;
                    figu.STOCK[proveedor].CANT_HISTORICA = figuActualizada.STOCK[proveedor].CANT_HISTORICA;

                    let figuCantActualizada = figuActualizada.STOCK[proveedor].CANT;

                    mostrarCantidades()

                    agregarFigu()

                    Toast.fire({
                        icon: 'warning',
                        title: "Descontada Correctamente",
                        html: `
                                Figurita: ${figu.NUM}<br>
                                Proveedor: ${proveedor}<br>
                                Cantidad: ${figuCantActualizada}
                            `
                    })


                    datosBloques(figuActualizada, contenedor, textoInferior, true)

                    figusSeleccionadas = figu.NUM
                    const filteredFigus = figuritas.filter(figu => figusSeleccionadas == (figu.NUM));
                    //console.log(filteredFigus)

                    filteredFigus.forEach(figu => {
                        const li = document.createElement('li');
                        li.classList.add('listaClass')
                        li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figuCantActualizada} \u00A0\u00A0\u00A0  $ ${figuActualizada.STOCK[proveedor].PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;

                        resultados.appendChild(li);
                    });

                } catch (error) {
                    console.error(`error en: `, error)
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: `La cantidad del proveedor ${proveedor} debe ser mayor a 0`
                })
            }

        })
    })

    const divDescargar = document.createElement('div')
    divDescargar.style.display = 'flex'
    divDescargar.style.justifyContent = 'center'
    divDescargar.style.margin = '20px'

    const buttonDescargarBase = document.createElement('button')
    buttonDescargarBase.style.backgroundColor = 'skyblue'
    buttonDescargarBase.innerHTML = 'Descargar Base'

    resultados.appendChild(buttonDescargarBase)
    divDescargar.appendChild(buttonDescargarBase)

    resultados.appendChild(divDescargar)

    let totalAgregadas = 0
    const agregarFigu = () => {
        totalAgregadas++
        totalCosechadas.innerHTML = `Total Cosechadas: ${totalAgregadas}`;
    }

    const totalCosechadas = document.createElement('h5')
    totalCosechadas.innerHTML = `Total Cosechadas: ${totalAgregadas}`
    resultados.appendChild(totalCosechadas)

    buttonDescargarBase.addEventListener('click', () => {

        const datosJson = JSON.stringify(figuritas, null, 2);
        const blob = new Blob([datosJson], { type: 'application/json' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = `${tipo}.json`;
        enlace.click();


        URL.revokeObjectURL(enlace.href);
    }
    )

};