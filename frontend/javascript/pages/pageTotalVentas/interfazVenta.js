import { agregarPagoNeto, crearEnvioFlex, descargarEtiqueta, importarImagenPagoNeto, verificarFiguritasVenta } from "../../servicios/api.js"
import { fechaArgentina, precioArgentino } from "../../utilidades/conversionesArg.js"
import { albumName, traduccionCuenta } from "../../utilidades/nombres.js"
import { estiloBarra, estiloContenedorBarra, estiloContenedorGeneralVenta, estiloElementBotones, estiloElementFiguritas, estiloElementFlexRow, estiloElementGeneralBotonesAcciones, estiloElementGeneralDatosDer, estiloElementGeneralVariantes, estiloElementGralDatos, estiloElementGralEnvios, estiloElementPago, estiloEnvios, estiloFlexColumn, estiloResponsive, estiloVariante, estiloVarianteInfo, estiloVarianteInfoDer, estiloVarianteInfoIzq } from "./estilosVenta.js"

export const crearTarjetaVentaViejo = (venta) => {
    const elementGeneral = document.createElement("div")

    const elementGeneralInformacion = document.createElement("div")

    const elementGeneralDatos = document.createElement("div")
    const elementGeneralDatosIzq = document.createElement("div")
    const elementGeneralDatosDer = document.createElement("div")
    const elementGralEnvios = document.createElement("div")
    const elementGralDatos = document.createElement("div")

    const elementGeneralBotonesAcciones = document.createElement("div")

    const elementGeneralVariantes = document.createElement("div")

    const elementDatosyVariantes = document.createElement("div")
    estiloContenedorGeneralVenta(elementGeneral)

    const elementBarra = crearElementBarra(venta)
    const elementDatos = crearElementDatos(venta)
    const elementEnvios = crearElementEnvios(venta.datos_envio_flex, venta.DATOS_SHIPPING)
    const elementPagos = crearElementPagos(venta, elementDatos)
    const elementVariantes = crearElementVariantes(venta.VARIANTES)
    const elementFiguritas = crearElementFiguritas(venta)
    const elementEtiqueta = crearElementEtiqueta(venta)
    const elementSeleccionarTransporte = crearElementSeleccionarTransporte(venta, elementEtiqueta)
    const elementVerificar = crearElementVerificar(venta, elementFiguritas, elementVariantes, elementGeneralVariantes, elementSeleccionarTransporte, elementEtiqueta)

    if ((venta?.VENDIDAS && venta?.VERIFICADAS === false)) {
        elementGeneralBotonesAcciones.append(elementVerificar)
    }

    if (["ready_to_print", "printed"].includes(venta?.DATOS_SHIPPING?.info_etiqueta)) {
        if (Object.hasOwn(venta, "VERIFICADAS") && venta?.VERIFICADAS === true) {
            elementGeneralBotonesAcciones.append(elementEtiqueta)
        } else {
            elementGeneralBotonesAcciones.append(elementEtiqueta)
        }
    }

    if (["ready_to_print", "printed"].includes(venta?.DATOS_SHIPPING?.info_etiqueta) || venta?.VERIFICADAS === false) {
        estiloElementGeneralBotonesAcciones(elementGeneralBotonesAcciones)
    }

    estiloContenedorBarra(elementBarra)
    estiloElementGralEnvios(elementGralEnvios)
    estiloElementGeneralDatosDer(elementGeneralDatosDer)
    estiloElementGralDatos(elementGralDatos)

    elementGralEnvios.append(elementEnvios)
    elementGralDatos.append(elementDatos)
    elementGeneralDatosIzq.append(elementGralDatos, elementGralEnvios)
    estiloFlexColumn(elementGeneralDatosIzq)
    estiloElementPago(elementPagos)
    elementPagos.style.border = "0.5px solid white"
    elementGeneralDatosDer.append(elementPagos)
    elementGeneralDatos.append(elementGeneralDatosIzq, elementGeneralDatosDer)

    elementGeneralInformacion.append(elementGeneralDatos, elementGeneralBotonesAcciones)

    elementGeneralVariantes.append(elementVariantes)
    elementDatosyVariantes.append(elementGeneralInformacion, elementGeneralVariantes)

    elementGeneralDatosIzq.style.width = "100%"
    estiloElementGeneralVariantes(elementGeneralVariantes)

    estiloElementGeneralInformacion(elementGeneralInformacion)
    estiloResponsive(elementGeneralDatos)
    estiloResponsive(elementDatosyVariantes)
    elementGeneral.append(elementBarra, elementDatosyVariantes, elementFiguritas)
    return elementGeneral
}

export const crearTarjetaVenta = (venta) => {
    const elementGeneral = document.createElement("div")
    estiloContenedorGeneralVenta(elementGeneral)

    const elementGeneralDatos = document.createElement("div")
    const elementGralEnvios = document.createElement("div")
    const elementGralDatos = document.createElement("div")

    const elementGeneralBotonesAcciones = document.createElement("div")
    const elementGeneralVariantes = document.createElement("div")
    const elementDatosyVariantes = document.createElement("div")


    const elementBarra = crearElementBarra(venta)
    const elementDatos = crearElementDatos(venta)
    const elementEnvios = crearElementEnvios(venta.datos_envio_flex, venta.DATOS_SHIPPING)
    const elementPagos = crearElementPagos(venta, elementDatos)
    const elementVariantes = crearElementVariantes(venta.VARIANTES)
    const elementFiguritas = crearElementFiguritas(venta)
    const elementEtiqueta = crearElementEtiqueta(venta)
    const elementSeleccionarTransporte = crearElementSeleccionarTransporte(venta, elementEtiqueta)
    const elementVerificar = crearElementVerificar(venta, elementFiguritas, elementVariantes, elementGeneralVariantes, elementSeleccionarTransporte, elementEtiqueta)

    if (["ready_to_print", "printed"].includes(venta?.DATOS_SHIPPING?.info_etiqueta)) {
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

    estiloContenedorBarra(elementBarra)
    estiloElementGralDatos(elementGralDatos)
    elementGralEnvios.append(elementEnvios)
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
    }

    element1.style.width = "100%"
    element2.style.width = "50%"
    element3.style.width = "100%"
    element1.append(elementGralDatos)
    element2.append(elementPagos)
    element3.append(elementGralEnvios)

    estiloElementGralEnvios(element2)
    estiloElementGralEnvios(element3)

    elementGeneralDatos.append(element1, element2, element3)

    // elementGeneralDatos.append(elementGralDatos, elementPagos, elementGralEnvios)


    elementGeneralVariantes.append(elementVariantes)
    elementGeneralVariantes.style.margin = "50px"
    estiloElementGralEnvios(elementGeneralVariantes)
    elementDatosyVariantes.append(elementGeneralDatos, elementGeneralVariantes, elementGeneralBotonesAcciones)
    elementDatosyVariantes.style.display = "flex"
    elementDatosyVariantes.style.flexDirection = "column"

    estiloResponsive(elementGeneralDatos)
    estiloResponsive(elementDatosyVariantes)
    elementGeneral.append(elementBarra, elementDatosyVariantes, elementFiguritas)
    return elementGeneral
}

const crearElementBarra = (venta) => {
    const elementBarra = document.createElement("div")
    estiloBarra(elementBarra)

    const fechaVenta = document.createElement("div")
    const nombreCuenta = document.createElement("div")
    const cantidadFigus = document.createElement("div")

    fechaVenta.textContent = `Fecha Venta: ${fechaArgentina(venta.FECHA)}hs 📆`
    nombreCuenta.textContent = `${venta.VENDEDOR.NOMBRE || venta.VENDEDOR.CUENTA} 👤`
    cantidadFigus.textContent = `Cantidad: ${venta.VENDIDAS?.length}`

    elementBarra.append(fechaVenta, nombreCuenta, cantidadFigus)

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

const crearElementEnvios = (envio, shipping) => {

    const elementEnvios = document.createElement("div")
    const estadoEnvio = document.createElement("div")
    const tipoEnvio = document.createElement("div")

    estadoEnvio.textContent = shipping?.info_etiqueta || shipping?.estado
    elementEnvios.style.backgroundColor = "#2b2444"
    tipoEnvio.textContent = shipping?.entrega || "SIN DATO DE ENVIO"

    if (shipping?.entrega != "FLEX") {
        tipoEnvio.style.color = "#de5516"
        tipoEnvio.style.fontWeight = "bold"
        tipoEnvio.style.fontSize = '3vh';
    } else {
        tipoEnvio.style.color = "#2ec95f"
        tipoEnvio.style.fontWeight = "bold"
        tipoEnvio.style.fontSize = '3vh';
    }

    estiloEnvios(elementEnvios)

    if (envio) {

        elementEnvios.style.color = "white"
        elementEnvios.style.padding = "10px"
        elementEnvios.style.borderRadius = "10px"
        elementEnvios.style.fontSize = '2vh';

        const transportista = document.createElement("div")
        const importeEnvio = document.createElement("div")
        const zonaEnvio = document.createElement("div")

        transportista.textContent = `Transportista: ${envio?.TRANSPORTISTA}`
        zonaEnvio.textContent = `Zona: ${envio?.ZONA}`
        importeEnvio.textContent = `Importe: ${precioArgentino(envio?.IMPORTE_ENVIO)}`

        elementEnvios.append(tipoEnvio, transportista, importeEnvio, zonaEnvio, estadoEnvio)

    } else {
        elementEnvios.style.color = "white"
        elementEnvios.style.padding = "10px"
        elementEnvios.style.borderRadius = "10px"
        elementEnvios.style.fontSize = '2vh';

        if (shipping?.estado === "Cancelado") {
            elementEnvios.style.backgroundColor = "#d82a2a"
            tipoEnvio.style.color = "white"
            tipoEnvio.textContent = ""
        }

        elementEnvios.append(tipoEnvio, estadoEnvio)

        if (shipping?.entrega === "FLEX") {
            if (shipping?.estado === "Cancelado") {
                elementEnvios.style.backgroundColor = "#d82a2a"
                tipoEnvio.style.color = "white"
                tipoEnvio.textContent = ""
            } else {
                const ciudad = document.createElement("div")
                const direccion = document.createElement("div")
                const cliente = document.createElement("div")

                ciudad.textContent = shipping.ciudad
                direccion.textContent = `${shipping.direccion}, ${shipping.ciudad}`
                cliente.textContent = shipping.cliente
                elementEnvios.append(ciudad, shipping.direccion)

                if (shipping.comentario) {
                    const comentario = document.createElement("div")
                    comentario.textContent = shipping.comentario
                    elementEnvios.append(comentario)
                }
            }
        }
    }

    if (shipping?.estado === "Listo para enviar") {
        const limiteDespacho = document.createElement("div")
        limiteDespacho.textContent = `Limite Entrega: ${fechaArgentina(shipping?.tiempoLimite)} hs`
        elementEnvios.append(limiteDespacho)
    }

    elementEnvios.style.height = "auto"

    return elementEnvios
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

            mla.textContent = `${element.mla}`
            titulo.textContent = element.titulo
            titulo.href = element.link
            cantidad.textContent = `CANTIDAD: ${element.cantidad}`
            precio.textContent = precioArgentino(element.precio)
            album.textContent = element.album
            imagen.src = element.imagen
            imagen.style.height = "22vh";
            imagen.style.maxWidth = "10vw";
            imagen.style.objectFit = "contain";

            varianteTitulo.append(titulo)
            varianteInfoIzq.append(cantidad, album, precio, mla)
            varianteInfoDer.append(imagen)
            estiloVarianteInfoDer(varianteInfoDer)
            estiloVarianteInfoIzq(varianteInfoIzq)

            varianteInfo.append(varianteInfoIzq, varianteInfoDer)
            variante.append(varianteTitulo, varianteInfo)
            estiloVarianteInfo(varianteInfo)
            estiloVariante(variante)

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
    console.log("venta", venta)

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