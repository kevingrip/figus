
const crearVenta = async (albumFigus, figusEnStock, canalPregunta, nombreCuenta, nombreJson, precioFinal, figusSinStock, tipoEnvio, albumRuta, api, ventaId) => {
    let proveedor;
    for (const figu of albumFigus) {
        for (const vend of figusEnStock) {
            if (vend.NUM == figu.NUM)
                try {
                    if (figu.STOCK.PDM.CANT > 0) {
                        proveedor = "PDM"

                    } else if (figu.STOCK.MATI.CANT > 0) {
                        proveedor = "MATI"


                    } else if (figu.STOCK.CAMBIOS.CANT > 0) {
                        proveedor = "CAMBIOS"

                    } else if (figu.STOCK.OTROS.CANT > 0) {
                        proveedor = "OTROS"
                    }

                    if (proveedor) {
                        await descontarBaseMongodb(proveedor, albumRuta, figu, api);
                    }

                } catch (error) {
                    console.error(error);
                    Toast.fire({
                        icon: 'error',
                        title: `No se pudo actualizar`
                    })
                }
        }
    }

    if (canalPregunta === "ONLINE") {
        const datosJson = JSON.stringify(albumFigus, null, 2);
        const blob = new Blob([datosJson], { type: 'application/json' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = `${nombreJson}.json`;
        enlace.click();
        // Liberar la URL del Blob
        URL.revokeObjectURL(enlace.href);
    }



    const datosVenta = ({
        DIA: new Date(),
        VENTAID: ventaId,
        VENDIDAS: figusEnStock,
        FALTANTES: figusSinStock,
        PRECIO: precioFinal,
        CUENTA: nombreCuenta,
        ENVIO: tipoEnvio,
        ALBUM: albumRuta,
        VERIFICADAS: false,
        PAGADAS: false
    })


    try {
        await fetch(`${api}/ventas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosVenta)
        });
    } catch (error) {
        console.error('Error al agregar la venta:', error);
        throw error;
    }



}

const descontarBaseMongodb = async (proveedor, albumRuta, figu, api) => {
    try {

        const response = await fetch(`${api}/album/${albumRuta}/descontarventa/${proveedor}/${figu._id}`, {
            method: "PATCH"
        });


        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        console.log(`${figu.NUM} Descontada del proveedor: ${proveedor}`)

        figu.STOCK[proveedor].CANT -= 1

        Toast.fire({
            icon: 'success',
            title: `BDD actualizada correctamente`
        })

    } catch (error) {
        console.log(error)
        Toast.fire({
            icon: 'error',
            title: 'Error al actualizar la BDD'
        });
    }
}

const agregarCuenta = (usuariosVendedores, divVenta, albumFigus, canalPregunta, figusEnStock, nombreJson, precioFinal, figusSinStock, tipoEnvio, albumRuta, botonDescargaCreado, api) => {
    let divCuenta = document.createElement('div')
    divCuenta.style.display = 'flex'
    divCuenta.style.justifyContent = 'center'
    divCuenta.style.alignItems = 'center'
    divCuenta.style.height = '50px'

    let botones = []

    usuariosVendedores.forEach(nombre => {
        const boton = document.createElement('button')
        boton.classList.add('boton')
        boton.textContent = nombre
        boton.style.marginRight = '10px'
        botones.push(boton)
        divCuenta.appendChild(boton)

        boton.addEventListener('click', () => {
            botones.forEach(boton => {
                boton.style.backgroundColor = ""
            })
            boton.style.backgroundColor = 'lightgreen'
            if (!botonDescargaCreado) {
                botonDescargaCreado = true
                let divDescargarVenta = document.createElement('div')
                divDescargarVenta.style.display = 'flex'
                divDescargarVenta.style.flexDirection = 'column'
                divDescargarVenta.style.justifyContent = 'center'
                divDescargarVenta.style.alignItems = 'center'
                divDescargarVenta.style.margin = '20px'

                const elementVentaId = document.createElement('input')
                elementVentaId.style.margin = "10px"
                elementVentaId.placeholder = "VENTA ID"

                if (canalPregunta == "ONLINE") {
                    divDescargarVenta.appendChild(elementVentaId)
                }


                const descargarArchivos = document.createElement('button')
                descargarArchivos.innerHTML = 'Confirmar'
                descargarArchivos.style.backgroundColor = 'skyblue'
                divDescargarVenta.appendChild(descargarArchivos)
                if (divVenta) {
                    divVenta.appendChild(divDescargarVenta)
                }

                descargarArchivos.addEventListener('click', async () => {

                    const ventaId = Number(elementVentaId.value.trim()) || null
                        

                    crearVenta(albumFigus, figusEnStock, canalPregunta, nombre, nombreJson, precioFinal, figusSinStock, tipoEnvio, albumRuta, api, ventaId)
                
                })                
            }
        })
    });

    divVenta.appendChild(divCuenta)

    return divCuenta

}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

const elementoVenta = ({ elementos, datos, ruta }) => {

    let { buttonPregunta, buttonVenta, divPregunta, mensaje, elementResumenListaFigu } = elementos

    const { figusSinStock, figusEnStock, albumFigus, albumRuta, canalPregunta, nombreJson, precioFinal } = datos;

    let { api } = ruta

    let divVenta = document.createElement('div');
    let divEnvio = null
    let divCuenta = null
    let nombreCuenta;
    let tipoEnvio;

    let botonUsuariosCreado = false
    let botonDescargaCreado = false

    buttonPregunta.addEventListener('click', () => {
        divVenta?.remove()
    })

    buttonVenta.addEventListener('click', () => {
        mensaje?.remove()
        elementResumenListaFigu?.remove()
        buttonPregunta.style.backgroundColor = ''
        buttonVenta.style.backgroundColor = 'lightgreen'


        if (figusSinStock.length > 0 && figusEnStock.length == 0) {

            const errorVenta = document.createElement('h4')
            errorVenta.textContent = 'No se puede realizar la venta porque la figurita no esta en stock'
            resultados.removeChild(divPregunta)
            resultados.removeChild(mensaje)
            divVenta.appendChild(errorVenta)
            divVenta.style.display = 'flex'
            divVenta.style.justifyContent = 'center'
            divVenta.style.color = 'red'
            resultados.appendChild(divVenta)

        } else {

            if (resultados.contains(divPregunta)) {
                resultados.removeChild(divPregunta)
                resultados.removeChild(mensaje)
            }
            if (!resultados.contains(divVenta)) {
                resultados.appendChild(divVenta)
            } else {
                resultados.removeChild(divVenta)
            }

            if (canalPregunta === "ONLINE") {
                if (!divEnvio) {
                    divEnvio = document.createElement('div')
                    divEnvio.style.display = 'flex'
                    divEnvio.style.justifyContent = 'center'
                    divEnvio.style.alignItems = 'center'
                    divEnvio.style.height = '100px'

                    const variantesEnvio = ["CORREO", "FLEX"]
                    const usuariosVendedores = ["KEVIN", "MATI", "MAMA"]

                    let botonesEnvio = []

                    variantesEnvio.forEach(variante => {
                        const boton = document.createElement('button')
                        boton.classList.add('boton')
                        boton.textContent = variante
                        boton.style.margin = '10px'

                        botonesEnvio.push(boton)

                        divEnvio.appendChild(boton)

                        boton.addEventListener('click', () => {
                            botonesEnvio.forEach(b => {
                                b.style.backgroundColor = ''
                            })
                            boton.style.backgroundColor = 'lightgreen'

                            tipoEnvio = variante
                            if (!botonUsuariosCreado) {
                                botonUsuariosCreado = true
                                divCuenta = agregarCuenta(usuariosVendedores, divVenta, albumFigus, canalPregunta, figusEnStock, nombreJson, precioFinal, figusSinStock, tipoEnvio, albumRuta, botonDescargaCreado, api)
                            }
                        }
                        )

                    })
                    divVenta.appendChild(divEnvio)

                }
            } else {
                const usuariosVendedores = ["LULY", "ARI"]
                agregarCuenta(usuariosVendedores, divVenta, albumFigus, canalPregunta, figusEnStock, nombreJson, precioFinal, figusSinStock, tipoEnvio, albumRuta, botonDescargaCreado, api)
            }
        }
    })
}

export { crearVenta, elementoVenta }