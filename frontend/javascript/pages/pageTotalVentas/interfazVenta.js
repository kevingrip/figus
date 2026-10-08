import { agregarPagoNeto, crearEnvioFlex, descargarEtiqueta, importarImagenPagoNeto, verificarFiguritasVenta } from "../../servicios/api.js"
import { fechaArgentina, fechaArgentinaCorta, fechaNombreDia, precioArgentino } from "../../utilidades/conversionesArg.js"
import { albumName, traduccionCuenta, traduccionEnvios } from "../../utilidades/nombres.js"
import { estiloBarra, estiloContenedorBarra, estiloContenedorGeneralVenta, estiloElementBotones, estiloElementFiguritas, estiloElementFlexRow, estiloElementGeneralBotonesAcciones, estiloElementGeneralDatosDer, estiloElementGeneralVariantes, estiloElementGralDatos, estiloFlexCentrado, estiloElementPago, estiloEnvios, estiloFlexColumn, estiloResponsive, estiloVariante, estiloVarianteInfo, estiloVarianteInfoDer, estiloVarianteInfoIzq } from "./estilosVenta.js"

export const crearTarjetaVenta = (venta) => {

    const element0 = document.createElement("div")
    estiloContenedorGeneralVenta(element0)

    const element_A = document.createElement("div")

    const elementGralDatos = document.createElement("div")

    const elementGeneralBotonesAcciones = document.createElement("div")
    const elementGeneralVariantes = document.createElement("div")
    const elementDatosyVariantes = document.createElement("div")


    const elementBarra = crearElementBarra(venta)
    const elementDatos = crearElementDatos(venta)
    const elementEnvios = crearElementEnvios(venta)
    const elementPagos = crearElementPagos(venta, elementDatos)
    const elementVariantes = crearElementVariantes(venta.VARIANTES)
    const elementFiguritas = crearElementFiguritas(venta)
    const elementEtiqueta = crearElementEtiqueta(venta)
    const elementSeleccionarTransporte = crearElementSeleccionarTransporte(venta, elementEtiqueta)
    const elementVerificar = crearElementVerificar(venta, elementFiguritas, elementVariantes, elementGeneralVariantes, elementSeleccionarTransporte, elementEtiqueta)

    if (venta.VENTAID === 2000015337222151) {
        console.log(venta)
    }

    estiloContenedorBarra(elementBarra)
    if (["ready_to_print", "printed"].includes(venta?.DATOS_SHIPPING?.info_etiqueta)) {
        elementBarra.style.backgroundColor="#6126f8da"
        if (!venta?.datos_envio_flex?.TRANSPORTISTA || (Object.hasOwn(venta, "VERIFICADAS") && venta?.VERIFICADAS === false)) { //CAMBIAR CONDICION PORQUE ESA ESTA MAL
            elementGeneralBotonesAcciones.append(elementVerificar)
        } else {
            elementGeneralBotonesAcciones.append(elementEtiqueta)
        }
    }



    // if (["ready_to_print", "printed"].includes(venta?.DATOS_SHIPPING?.info_etiqueta)) {
    //     if (Object.hasOwn(venta, "VERIFICADAS") && venta?.VERIFICADAS === true) {
    //         elementGeneralBotonesAcciones.append(elementEtiqueta)
    //     } else {
    //         elementGeneralBotonesAcciones.append(elementEtiqueta)
    //     }
    // }

    if (["ready_to_print", "printed"].includes(venta?.DATOS_SHIPPING?.info_etiqueta) || venta?.VERIFICADAS === false) {
        estiloElementGeneralBotonesAcciones(elementGeneralBotonesAcciones)
    }

    
    estiloElementGralDatos(elementGralDatos)
    elementGralDatos.append(elementDatos)
    estiloElementPago(elementPagos)
    elementPagos.style.border = "0.5px solid white"


    const element1 = document.createElement("div")
    const element2 = document.createElement("div")
    const element3 = document.createElement("div")
    element1.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.4)";
    element2.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.4)";
    element3.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.4)";
    if (window.innerWidth > 768) {
        element1.style.minHeight = "30vh"
        element2.style.minHeight = "30vh"
        element3.style.minHeight = "30vh"
        element2.style.width = "50%"

    } else {
        element2.style.width = "100%"
        element1.style.minHeight = "auto"
        element2.style.minHeight = "auto"
    }
    element1.style.width = "100%"
    element3.style.width = "100%"


    element1.append(elementGralDatos)
    element2.append(elementPagos)
    element3.append(elementEnvios)

    estiloFlexCentrado(element2)
    estiloFlexCentrado(element3)

    element_A.append(element1, element2, element3)

    // elementGeneralDatos.append(elementGralDatos, elementPagos, elementGralEnvios)


    elementGeneralVariantes.append(elementVariantes)
    elementGeneralVariantes.style.marginTop = "20px"
    estiloFlexCentrado(elementGeneralVariantes)
    elementDatosyVariantes.append(element_A, elementGeneralVariantes, elementGeneralBotonesAcciones)
    elementDatosyVariantes.style.display = "flex"
    elementDatosyVariantes.style.flexDirection = "column"

    estiloResponsive(element_A)
    estiloResponsive(elementDatosyVariantes)
    element0.append(elementBarra, elementDatosyVariantes, elementFiguritas)
    return element0
}

const crearElementBarra = (venta) => {
    const elementBarra = document.createElement("div")
    estiloBarra(elementBarra)

    const fechaVenta = document.createElement("div")
    const nombreCuenta = document.createElement("div")
    const cantidadFigus = document.createElement("div")



    cantidadFigus.textContent = `Cantidad: ${venta.VENDIDAS?.length}`

    if (window.innerWidth < 768) {
        nombreCuenta.style.whiteSpace = "pre-line"
        fechaVenta.style.whiteSpace = "pre-line"
        nombreCuenta.textContent = `👤\n ${venta.VENDEDOR.NOMBRE || venta.VENDEDOR.CUENTA}`
        fechaVenta.textContent = `📆\n ${fechaArgentinaCorta(venta.FECHA)}`
        elementBarra.append(nombreCuenta, fechaVenta)
    } else {
        nombreCuenta.textContent = `${venta.VENDEDOR.NOMBRE || venta.VENDEDOR.CUENTA} 👤`
        fechaVenta.textContent = `Fecha Venta: ${fechaArgentina(venta.FECHA)}hs 📆`
        elementBarra.append(fechaVenta, nombreCuenta, cantidadFigus)
    }

    return elementBarra
}

const crearElementDatos = (venta) => {
    const elementDatos = document.createElement("div")

    elementDatos.style.display = "flex";
    elementDatos.style.flexDirection = "column";
    elementDatos.style.width = "100%";
    elementDatos.style.color = "white";
    elementDatos.style.marginRight = "20px";


    const ventaid = document.createElement("a")
    const precioTotal = document.createElement("div")
    const precioNeto = document.createElement("div")

    ventaid.textContent = `#${venta.VENTAID}`
    ventaid.href = `https://vendedores.mercadolibre.com.ar/ventas/${venta.VENTAID}/detalle`
    elementDatos.append(ventaid)

    if (venta?.COMPRADOR?.NOMBRE) {
        const clienteid = document.createElement("div")
        clienteid.textContent = `Cliente: ${venta?.COMPRADOR?.NOMBRE}`
        clienteid.style.width = "100%"
        elementDatos.append(clienteid)
    }

    precioTotal.textContent = `Total Venta: ${precioArgentino(venta?.IMPORTE_TOTAL)} 💰`
    precioNeto.textContent = `${venta?.IMPORTE_NETO ? `Total Neto: ${precioArgentino(venta?.IMPORTE_NETO)} 💰` : ""}`

    elementDatos.append(precioTotal, precioNeto)

    if (venta?.DATOS_PAYMENTS?.fecha_liquidacion && venta?.DATOS_SHIPPING?.estado != "Cancelado") {
        const fechaLiquidacion = document.createElement("div")
        fechaLiquidacion.textContent = `Fecha Liquidacion: ${fechaArgentina(venta.DATOS_PAYMENTS.fecha_liquidacion)} hs`
        elementDatos.append(fechaLiquidacion)
        fechaLiquidacion.style.whiteSpace = "nowrap";
        fechaLiquidacion.style.overflow = "hidden";
        fechaLiquidacion.style.textOverflow = "ellipsis";
        if (new Date(venta.DATOS_PAYMENTS.fecha_liquidacion) < new Date()) {
            fechaLiquidacion.style.backgroundColor = "green"
            fechaLiquidacion.style.fontWeight = "bold"
        }
    }
    return elementDatos
}

const crearElementEnvios = (venta) => {

    const envioFlexCreado = venta.datos_envio_flex
    const shipping = venta.DATOS_SHIPPING

    const elementEnvios = document.createElement("div")

    const tipoEnvio = document.createElement("div")

    const estadoEnvio = document.createElement("div")
    estadoEnvio.textContent = traduccionEnvios(shipping?.info_etiqueta) || shipping?.estado
    estadoEnvio.style.fontWeight = "bold"

    elementEnvios.style.backgroundColor = "#2b2444"
    tipoEnvio.innerHTML = shipping?.entrega || venta?.ENVIO ||"SIN DATO DE ENVIO"
    tipoEnvio.style.fontWeight = "bold"
    tipoEnvio.style.fontSize = '3vh';

    if (shipping?.entrega != "FLEX") {
        tipoEnvio.style.color = "#de5516"
    } else {
        tipoEnvio.style.color = "#2ec95f"
        tipoEnvio.innerHTML += ` ${shipping.ciudad}`
    }

    estiloEnvios(elementEnvios)
    elementEnvios.style.color = "white"
    elementEnvios.style.borderRadius = "10px"
    elementEnvios.style.fontSize = '2vh';

    const element0 = document.createElement("div")
    element0.style.margin = "10px"

    if (envioFlexCreado) {

        const transportista = document.createElement("div")
        const importeEnvio = document.createElement("div")
        const zonaEnvio = document.createElement("div")

        transportista.textContent = `Transportista: ${envioFlexCreado?.TRANSPORTISTA}`
        zonaEnvio.textContent = `Zona: ${envioFlexCreado?.ZONA}`
        importeEnvio.textContent = `Importe: ${precioArgentino(envioFlexCreado?.IMPORTE_ENVIO)}`
        element0.append(tipoEnvio, transportista, importeEnvio, zonaEnvio, estadoEnvio)
        elementEnvios.append(element0)

    } else {

        if (shipping?.estado === "Cancelado") {
            elementEnvios.style.backgroundColor = "#d82a2a"
            tipoEnvio.style.color = "white"
            tipoEnvio.textContent = ""
        }

        if (shipping?.info_etiqueta === "buffered") {
            console.log(fechaArgentinaCorta(new Date()))
            console.log(fechaArgentinaCorta(shipping?.tiempoLimite))
            if (fechaArgentinaCorta(shipping?.tiempoLimite) != fechaArgentinaCorta(new Date())) {
                estadoEnvio.textContent = `La etiqueta se podra imprimir el ${fechaArgentinaCorta(shipping?.tiempoLimite)}`
                element0.append(estadoEnvio)
            }
        }

        element0.append(tipoEnvio, estadoEnvio)
        elementEnvios.append(element0)

        if (shipping?.estado === "Listo para enviar") {
            const limiteDespacho = document.createElement("div")
            limiteDespacho.textContent = `Limite Entrega: ${fechaNombreDia(shipping?.tiempoLimite)} ${fechaArgentina(shipping?.tiempoLimite)} hs`
            element0.append(limiteDespacho)
            elementEnvios.append(element0)
        }

        if (shipping?.entrega === "FLEX") { //ENVIO FLEX LISTO PARA ENVIAR
            if (shipping?.estado === "Cancelado") {
                elementEnvios.style.backgroundColor = "#d82a2a"
                tipoEnvio.style.color = "white"
                tipoEnvio.textContent = ""
            } else {
                const infoFlex = document.createElement("div")
                const infoMap = document.createElement("div")
                const mapa = crearMapaGoogle(shipping.direccion, shipping.ciudad)
                infoMap.append(mapa)

                const cliente = document.createElement("div")

                cliente.textContent = shipping.cliente
                element0.append(infoFlex, infoMap)
                elementEnvios.append(element0)

                if (shipping.comentario) {
                    const comentario = document.createElement("div")
                    comentario.textContent = shipping.comentario
                    element0.append(comentario)
                    elementEnvios.append(element0)
                }
            }
        }
    }
    return elementEnvios
}

const crearMapaGoogle = (direccion, ciudad) => {
    // 1. Crear el contenedor o el iframe
    const mapaIframe = document.createElement("iframe")

    // 2. Codificar la dirección para que sea segura en la URL
    const ubicacionBusqueda = encodeURIComponent(`${direccion}, ${ciudad}`)

    // 3. Asignar atributos y estilos
    mapaIframe.src = `https://maps.google.com/maps?q=${ubicacionBusqueda}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    mapaIframe.style.width = "100%"
    mapaIframe.style.height = "100%" // Ocupará el 100% del contenedor padre
    mapaIframe.style.minHeight = "300px" // Altura mínima recomendada
    mapaIframe.style.border = "0"
    mapaIframe.loading = "lazy" // Mejora el rendimiento de carga
    mapaIframe.allowFullscreen = true

    return mapaIframe
}

const crearElementPagos = (venta, elementDatos) => {
    const elementPagos = document.createElement("div")

    if (venta?.IMAGEN_NETO) {
        const imagenPago = nuevaCaptura(venta.IMAGEN_NETO)
        elementPagos.append(imagenPago)

        if (!Object.hasOwn(venta, "IMPORTE_NETO")) {
            const elementNeto = confirmarNeto(venta)
            elementDatos.append(elementNeto)
        }


    } else {
        elementPagos.append(crearContenedorImagen(venta))
    }

    return elementPagos
}

const crearElementVariantes = (variantes) => {
    const elementVariantes = document.createElement("div")
    estiloFlexColumn(elementVariantes)

    variantes?.forEach(element => {
        if (!element.figurita) {
            const variante = document.createElement("div")
            const varianteTitulo = document.createElement("div")
            const varianteInfo = document.createElement("div")
            const varianteInfoIzq = document.createElement("div")
            const varianteInfoDer = document.createElement("div")
            const mla = document.createElement("div")
            const titulo = document.createElement("a")
            const cantidad = document.createElement("div")
            const precio = document.createElement("div")
            const album = document.createElement("div")
            const imagen = document.createElement("img")
            const color = document.createElement("div")

            mla.textContent = `${element.mla}`

            titulo.href = element.link
            cantidad.textContent = `CANTIDAD: ${element.cantidad}`
            precio.textContent = precioArgentino(element.precio)
            album.textContent = element.album

            imagen.src = element.imagen

            imagen.style.objectFit = "contain";
            estiloVarianteInfo(varianteInfo)
            estiloVarianteInfoDer(varianteInfoDer)
            estiloVarianteInfoIzq(varianteInfoIzq)
            estiloVariante(variante)

            titulo.style.display = "block"
            titulo.style.width = "100%"

            varianteTitulo.append(titulo)
            if (window.innerWidth < 768) {
                titulo.textContent = mla
                imagen.style.height = "100%";
                imagen.style.maxWidth = "100%";
                varianteInfoIzq.append(cantidad)
                varianteInfoDer.append(imagen)
            } else if (variantes.length > 1) {
                elementVariantes.style.flexDirection = "row"
                titulo.textContent = element.mla
                titulo.style.textAlign = "center"
                varianteInfo.style.flexDirection = "column"
                variante.style.width = "15vw"
                imagen.style.height = "100%";
                imagen.style.width = "100%";
                varianteInfoDer.style.paddingRight = "0"
                varianteInfoDer.style.width = "auto";
                varianteInfoDer.style.boxSizing = "border-box";
                varianteInfoDer.style.margin = "10px"
                varianteInfoDer.style.justifyContent = "center"
                varianteInfoIzq.style.width = "100%"
                varianteInfoIzq.style.margin = "0"
                varianteInfoIzq.style.textAlign = "center";
                varianteInfoIzq.append(precio, cantidad)
                varianteInfoDer.append(imagen)
            } else {
                titulo.textContent = element.titulo
                titulo.style.marginLeft = "10px"
                imagen.style.height = "22vh";
                imagen.style.maxWidth = "10vw";
                varianteInfoIzq.append(mla, album, precio, cantidad)
                varianteInfoDer.append(imagen)
            }
            // if (element.color) {
            //     color.textContent = `COLOR: ${element?.color}`
            //     varianteInfoIzq.append(color)
            // }

            varianteInfo.append(varianteInfoIzq, varianteInfoDer)
            variante.append(varianteTitulo, varianteInfo)

            titulo.style.fontSize = "2.5vh"
            elementVariantes.append(variante)
        }

    });
    return elementVariantes
}

const crearElementFiguritas = (venta) => {
    const elementFiguritas = document.createElement("div")

    estiloElementFiguritas(elementFiguritas)
    if (venta.VERIFICADAS) {
        elementFiguritas.style.display = "flex"
        elementFiguritas.style.justifyContent = "center"
        elementFiguritas.style.backgroundColor = "#336d2eb9"
    }


    if (venta.VENDIDAS) {
        venta.VENDIDAS.forEach(figu => {
            const figurita = crearFigurita(figu, venta.ALBUM)
            elementFiguritas.append(figurita)
        })
    } else {
        venta.VARIANTES?.forEach(variante => {
            if (variante.figurita) {
                for (let f = 0; f < variante.cantidad; f++) {
                    const figurita = crearFigurita(variante, venta.ALBUM)
                    elementFiguritas.append(figurita)
                }
            }
        })
    }

    return elementFiguritas
}

const crearFigurita = (element, album) => {
    const figurita = document.createElement("div")

    const numFiguMDB = (element?.NUM || "").toString().replace(/[^0-9]/g, "");
    const letraFiguMDB = (element?.NUM || "").toString().replace(/[^a-zA-Z]/g, "")

    figurita.textContent = element.figurita || `${letraFiguMDB} ${numFiguMDB}`
    figurita.style.display = "flex"
    figurita.style.justifyContent = "center"
    figurita.style.height = "50px"
    figurita.style.width = "60px"
    figurita.style.margin = "5px"
    figurita.style.backgroundColor = "#e75353"
    figurita.style.fontSize = "13px";
    figurita.style.fontWeight = "bold";

    if (album == "mundialQatar2022") {
        figurita.style.backgroundColor = "#fe7300"
    } else if (album == "mundialUsa2026") {
        figurita.style.backgroundColor = "violet"
    } else if (album == "copaAmerica2024") {
        figurita.style.backgroundColor = "skyblue"
    }

    return figurita
}

const crearContenedorImagen = (venta) => {
    const contenedor = document.createElement("div");

    estiloElementPago(contenedor)

    const inputImagen = document.createElement("input");

    inputImagen.type = "file";
    inputImagen.accept = "image/*";
    inputImagen.style.display = "none";

    const boton = document.createElement("button");
    boton.textContent = "Seleccionar imagen de pago";

    const nombreArchivo = document.createElement("span");
    nombreArchivo.style.color = "#f3f1f1e3"
    nombreArchivo.style.textAlign = "center";
    nombreArchivo.style.width = "100%";


    boton.addEventListener("click", () => {
        inputImagen.click();
    });


    inputImagen.addEventListener("change", async () => {

        const archivo = inputImagen.files[0];

        if (!archivo) return;

        const formData = new FormData();
        formData.append("imagen", archivo);

        const imagenRespuesta = await importarImagenPagoNeto(venta.VENTAID, formData)
        contenedor.innerHTML = ""
        const imagenPago = nuevaCaptura(imagenRespuesta.fotoUrl)
        imagenPago.style.height = "40vh"

        contenedor.append(imagenPago)

        if (!Object.hasOwn(venta, "IMPORTE_NETO")) {
            const elementNeto = confirmarNeto(venta)
            contenedor.append(elementNeto)
        }


    });
    contenedor.append(
        boton,
        nombreArchivo,
        inputImagen
    );

    return contenedor;
}

const nuevaCaptura = (imagenCargada) => {
    const imagenPago = document.createElement("img");
    imagenPago.src = imagenCargada
    imagenPago.alt = "Comprobante de pago";
    imagenPago.style.borderRadius = "10px"
    if (window.innerWidth < 768) {
        imagenPago.style.height = "100%"
        imagenPago.style.width = "100%"
    } else {
        imagenPago.style.height = "50vh"
        imagenPago.style.width = "15vw"
    }

    return imagenPago
}

const confirmarNeto = (venta) => {
    const elementNeto = document.createElement("div")
    elementNeto.style.display = "flex"
    elementNeto.style.flexDirection = "column"
    elementNeto.style.justifyContent = "center"
    const importeNeto = document.createElement("input")
    importeNeto.placeholder = "Ingrese importe neto"
    const botonInput = document.createElement("button")
    botonInput.textContent = "Confirmar"
    botonInput.addEventListener("click", () => {
        let vendedor = venta.VENDEDOR.NOMBRE || venta.VENDEDOR.CUENTA

        agregarPagoNeto(venta.VENTAID, importeNeto.value, traduccionCuenta(vendedor))
        elementNeto.style.color = "white"
        elementNeto.innerHTML = ""
        elementNeto.innerHTML = `Importe neto: ${precioArgentino(importeNeto.value)}`
    })
    elementNeto.append(importeNeto, botonInput)
    return elementNeto
}

const crearElementVerificar = (venta, elementFiguritas, elementVariantes, elementGeneralVariantes, elementSeleccionarTransporte, elementEtiqueta) => {

    const elementGralVerificar = document.createElement("div")
    const elementVerificar = document.createElement("div")
    const vendidas = venta.VENDIDAS
    const verificadas = venta.VERIFICADAS
    const ventaid = venta._idventa

    if (vendidas && verificadas === false) {
        const elementBotones = document.createElement("div")
        elementBotones.style.display = "flex"
        elementBotones.style.justifyContent = "center"
        const botonVerificar = document.createElement("button")
        botonVerificar.textContent = "Verificar"

        elementVerificar.append(botonVerificar)

        botonVerificar.addEventListener("click", () => {
            elementFiguritas.style.display = "none"
            elementVariantes.style.display = "none"
            botonVerificar.style.display = "none"

            const botonSiguiente = document.createElement("button")
            const botonAnterior = document.createElement("button")
            botonSiguiente.textContent = "Siguiente"
            botonAnterior.textContent = "Anterior"
            const tamaño = vendidas.length - 1
            let posicion = 0;

            let figuritaGrande = figuGrande(vendidas[posicion])
            elementGeneralVariantes.prepend(figuritaGrande)
            elementBotones.append(botonAnterior, botonSiguiente)
            elementGeneralVariantes.append(elementBotones)

            botonSiguiente.addEventListener("click", async () => {
                posicion++
                if (posicion <= tamaño) {
                    figuritaGrande.remove()
                    figuritaGrande = figuGrande(vendidas[posicion])
                    elementGeneralVariantes.prepend(figuritaGrande)
                }
                if (posicion > tamaño) {
                    try {
                        await verificarFiguritasVenta(ventaid)
                        figuritaGrande.remove()
                        botonAnterior.remove()
                        botonSiguiente.remove()
                        elementFiguritas.style.display = "flex"
                        elementFiguritas.style.visible = "hidden"
                        elementFiguritas.style.backgroundColor = "#336d2eb9"
                        elementVariantes.style.display = "flex"
                        elementVariantes.style.visible = "hidden"
                        venta.VERIFICADAS = true
                        elementGralVerificar.innerHTML = ""
                        if (venta?.DATOS_SHIPPING?.entrega === "FLEX")
                            elementGralVerificar.append(elementSeleccionarTransporte)
                        else
                            elementGralVerificar.append(elementEtiqueta)

                    } catch (error) {
                        console.error("No se pudo verificar:", error);
                    }

                }
            })
            botonAnterior.addEventListener("click", () => {
                if (posicion > 0) {
                    posicion--
                    figuritaGrande.remove()
                    figuritaGrande = figuGrande(vendidas[posicion])
                    elementGeneralVariantes.prepend(figuritaGrande)
                }
            })
        })
    } else {
        elementGralVerificar.innerHTML = ""
        if (venta?.DATOS_SHIPPING?.entrega === "FLEX")
            elementGralVerificar.append(elementSeleccionarTransporte)
        else
            elementGralVerificar.append(elementEtiqueta)
    }
    elementGralVerificar.append(elementVerificar)
    estiloElementBotones(elementGralVerificar)

    return elementGralVerificar
}

const crearElementEtiqueta = (venta) => {

    const elementGralEtiqueta = document.createElement("div")
    const elementEtiqueta = document.createElement("div")

    if (venta?.DATOS_SHIPPING?.info_etiqueta) {
        const botonEtiqueta = document.createElement("button")
        botonEtiqueta.textContent = "Descargar"

        elementEtiqueta.append(botonEtiqueta)

        botonEtiqueta.addEventListener("click", async () => {
            await descargarEtiqueta(venta.VENDEDOR.ID, venta.SHIPPING_ID)
        })
    }

    elementGralEtiqueta.append(elementEtiqueta)
    estiloElementBotones(elementGralEtiqueta)
    return elementGralEtiqueta

}

const crearElementSeleccionarTransporte = (venta, botonEtiqueta) => {
    const elementGralSeleccionTransporte = document.createElement("div")
    const elementSeleccionTransporte = document.createElement("select")
    const listaTransportistas = ['Elegir Transportista', 'PLEX', 'VERGUI', 'KEVIN', 'MATI']

    listaTransportistas.forEach(nombre => {
        const transportista = document.createElement('option')
        transportista.textContent = nombre
        transportista.value = nombre
        elementSeleccionTransporte.append(transportista)
    })

    elementSeleccionTransporte.addEventListener("change", async (event) => {
        const transportistaSeleccionado = event.target.value
        await crearEnvioFlex(venta, transportistaSeleccionado)
        elementGralSeleccionTransporte.innerHTML = '';
        elementGralSeleccionTransporte.append(botonEtiqueta)
    })

    elementGralSeleccionTransporte.append(elementSeleccionTransporte)

    return elementGralSeleccionTransporte
}

const figuGrande = (figu) => {

    const contenedorFiguGrande = document.createElement("div")
    contenedorFiguGrande.style.display = "flex";
    contenedorFiguGrande.style.justifyContent = "center"

    const figuritaGrande = document.createElement("div")
    const figuNum = document.createElement("b")
    const figuNombre = document.createElement("b")
    figuritaGrande.style.display = "flex";
    figuritaGrande.style.flexDirection = "column";
    figuritaGrande.style.height = "400px"
    figuritaGrande.style.width = "250px"
    figuritaGrande.style.marginBottom = "20px"
    figuritaGrande.style.backgroundColor = "#27F5CC"
    figuritaGrande.style.border = "5px solid #27A3F5"
    figuritaGrande.style.borderRadius = "10%";

    figuNum.textContent = figu.NUM
    figuNum.style.height = "60px"
    figuNum.style.display = "flex"
    figuNum.style.alignItems = "end"
    figuNum.style.justifyContent = "center"

    figuNombre.textContent = figu.NOMBRE
    figuNombre.style.fontSize = "30px"
    figuNombre.style.flex = "1";
    figuNombre.style.display = "flex";
    figuNombre.style.alignItems = "center"
    figuNombre.style.textAlign = "center"
    figuNombre.style.justifyContent = "center"
    figuritaGrande.appendChild(figuNum)
    figuritaGrande.appendChild(figuNombre)
    contenedorFiguGrande.appendChild(figuritaGrande)
    contenedorFiguGrande.style.margin = "20px"
    return contenedorFiguGrande
}
