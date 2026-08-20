import { api } from "../../config.js";
import { ordenarAlfabeticamente } from "../utilidades/ordenarAlfabeticamente.js";
import { albumName, nombrePublicacion, seller_name } from "../utilidades/nombres.js";
import { fechaArgentina, precioArgentino } from "../utilidades/conversionesArg.js";
import { obtenerFiguritas, obtenerFiguritasOrderCant, importarImagenPagoNeto, agregarPagoNeto } from "../servicios/api.js";
import { crearVenta } from "./buscarFigus/elementoVenta.js";

const contenedorImagen = (album, ventaid) => {
    const contenedor = document.createElement("div");
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";
    contenedor.style.gap = "10px";

    const inputImagen = document.createElement("input");

    inputImagen.type = "file";
    inputImagen.accept = "image/*";
    inputImagen.style.display = "none";

    const boton = document.createElement("button");
    boton.textContent = "Seleccionar imagen";

    const nombreArchivo = document.createElement("span");
    nombreArchivo.textContent = "Ningún archivo seleccionado";

    boton.addEventListener("click", () => {
        inputImagen.click();
    });


    inputImagen.addEventListener("change", async () => {

        const archivo = inputImagen.files[0];


        if (!archivo) return;

        const formData = new FormData();
        formData.append("imagen", archivo);

        await importarImagenPagoNeto(album, ventaid, formData)

    });
    contenedor.append(
        boton,
        nombreArchivo,
        inputImagen
    );

    return contenedor;
}

const ingresarPrecioNeto = () => {
    const input_precioNeto = document.createElement("input")
    const botonConfirmarPrecioNeto = document.createElement("button")

    input_precioNeto.style.margin = "20px"
    botonConfirmarPrecioNeto.style.margin = "20px"

    input_precioNeto.placeholder = "Ingrese Precio Neto"
    input_precioNeto.style.width = "auto"
    return { input_precioNeto, botonConfirmarPrecioNeto }
}

function crearBotonContenedor(figu, album) {
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
    const numFigu = figu.NUM.replace(/[^0-9]/g, "")
    const letraFigu = figu.NUM.replace(/[^a-zA-Z]/g, "")
    textoSuperior.textContent = `${letraFigu} ${numFigu}`;
    textoSuperior.style.fontSize = "13px";
    textoSuperior.style.fontWeight = "bold";

    const textoInferior = document.createElement("div");
    //textoInferior.textContent = `Cant: ${figu.CANT}`;
    textoInferior.style.fontSize = "11px";

    informacion.appendChild(textoSuperior);
    informacion.appendChild(textoInferior);

    contenedor.style.margin = "3px"

    contenedor.appendChild(informacion);

    if (album == "mundialQatar2022") {
        contenedor.style.backgroundColor = "orange"
    } else if (album == "mundialUsa2026") {
        contenedor.style.backgroundColor = "violet"
    } else if (album == "copaAmerica2024") {
        contenedor.style.backgroundColor = "skyblue"
    }

    return contenedor
}

const figuGrande = (figu, contenedorFiguGrande) => {
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
}

export const totalVentas = async (ventasMDB, ventasML, totalVentasElement, botonesElement, elementPrecioVenta) => {
    const totalVendido = document.createElement("h3")
    const totalVendidoNeto = document.createElement("h4")
    totalVendido.style.display = "flex"
    totalVendido.style.justifyContent = "center"
    totalVendidoNeto.style.display = "flex"
    totalVendidoNeto.style.justifyContent = "center"
    const listaBotones = []
    let contenedorVentasMDB = []
    let contenedorVentasML = []

    if (totalVentasElement) {

        if (totalVentasElement.id == "totalVentasAri") {
            ventasMDB = ventasMDB.filter(ventas => ventas.CUENTA == "ARI")
        } else if (totalVentasElement.id == "totalVentasLuly") {
            ventasMDB = ventasMDB.filter(ventas => ventas.CUENTA == "LULY")
        } else {
            const vendedores = [...new Set(ventasMDB.map(venta => venta.CUENTA))]
            const botonesVendedores = document.createElement("div")

            vendedores.push("TODAS")

            vendedores.forEach(vendedor => {
                const boton = document.createElement("button")
                listaBotones.push(boton)
                boton.textContent = vendedor
                boton.style.height = "35px"
                boton.style.width = "70px"
                boton.style.margin = "10px"
                botonesVendedores.appendChild(boton)

                boton.addEventListener("click", () => {
                    contenedorVentasMDB = []
                    contenedorVentasML = []
                    totalVentasElement.innerHTML = ""
                    listaBotones.forEach(boton => {
                        boton.style.backgroundColor = ""
                    })

                    boton.style.backgroundColor = "lightgreen"
                    let total = 0;

                    const vendedorSeleccionado = vendedor === "TODAS" ? null : vendedor
                    const { precioMDB, precioNeto } = totalVentasMDB(vendedorSeleccionado)
                    let precioML = totalVentasML(vendedorSeleccionado)
                    juntarVentas()
                    totalVendido.textContent = `Total Vendido: ${precioArgentino(precioMDB + precioML)}`;
                    totalVendidoNeto.textContent = `Total Neto: ${precioArgentino(precioNeto)}`;
                    if (!["TODAS", "ARI", "LULY"].includes(vendedor)) {
                        elementPrecioVenta.appendChild(totalVendidoNeto)
                    }
                });

            })

            botonesVendedores.style.display = "flex"
            botonesVendedores.style.justifyContent = "center"
            botonesVendedores.style.margin = "50px"
            botonesElement.appendChild(botonesVendedores)
            elementPrecioVenta.appendChild(totalVendido)

        }

        const contenedorVenta = () => {
            const contenedorPrincipal = document.createElement("div")
            contenedorPrincipal.style.backgroundColor = "white"
            const bordeSuperior = document.createElement("div")
            const bloqueInfo = document.createElement("div")
            const contenedorPAGO = document.createElement("div")
            const contenedorFigus = document.createElement("div")

            bloqueInfo.style.padding = "20px";
            bloqueInfo.style.width = "70%";
            contenedorFigus.style.padding = "20px";
            
            const tituloAlbum = document.createElement("p")
            const envio = document.createElement("p")
            const cuenta = document.createElement("p")
            const cantidad = document.createElement("p")
            const precio = document.createElement("p")
            const dia = document.createElement("p")
            //tituloAlbum.textContent = albumName(album)
            //envio.textContent = venta.ENVIO ? `Envio: ${venta.ENVIO}` : ""
            // cuenta.textContent = `Cuenta: ${venta.CUENTA}`
            // cantidad.textContent = `Cantidad: ${venta.VENDIDAS.length}`
            // dia.textContent = `Dia de venta: ${new Date(venta.DIA).toLocaleDateString("es-AR")} 🕒 ${new Date(venta.DIA).toLocaleTimeString("es-AR")}`

            bordeSuperior.appendChild(tituloAlbum)
            bordeSuperior.appendChild(dia)
            bordeSuperior.appendChild(cuenta)
            bordeSuperior.appendChild(cantidad)
            bordeSuperior.appendChild(precio)
            bordeSuperior.appendChild(envio);

            let ventaid = document.createElement("a")
        }

        const totalVentasMDB = (vendedor) => {
            let totalPrecioVentas = 0
            let neto = 0

            const ventasFiltradas = vendedor ? ventasMDB.filter(venta => venta.CUENTA === vendedor) : ventasMDB

            ventasFiltradas.forEach(venta => {

                const album = venta.ALBUM;

                const contenedorVenta = document.createElement("div")
                contenedorVenta.style.backgroundColor = "white"
                const contenedorInfo = document.createElement("div")
                const contenedorInfo2 = document.createElement("div")
                const contenedorPAGO = document.createElement("div")

                const contenedorFigus = document.createElement("div")
                contenedorInfo2.style.padding = "20px";
                contenedorInfo2.style.width = "70%";
                contenedorFigus.style.padding = "20px";


                const tituloAlbum = document.createElement("p")
                tituloAlbum.textContent = albumName(album)

                const envio = document.createElement("p")
                envio.textContent = venta.ENVIO ? `Envio: ${venta.ENVIO}` : ""

                const cuenta = document.createElement("p")
                cuenta.textContent = `Cuenta: ${venta.CUENTA}`

                const cantidad = document.createElement("p")
                cantidad.textContent = `Cantidad: ${venta.VENDIDAS.length}`

                const precio = document.createElement("p")

                const dia = document.createElement("p")
                dia.textContent = `Dia de venta: ${new Date(venta.DIA).toLocaleDateString("es-AR")} 🕒 ${new Date(venta.DIA).toLocaleTimeString("es-AR")}`


                contenedorInfo.appendChild(tituloAlbum)
                contenedorInfo.appendChild(dia)
                contenedorInfo.appendChild(cuenta)
                contenedorInfo.appendChild(cantidad)
                contenedorInfo.appendChild(precio)
                contenedorInfo.appendChild(envio);

                let fechaML;
                let ventaid = document.createElement("a")
                let total = 0
                let costoVenta = 0;
                if (venta.VENTAID != null) {

                    ventaid.textContent = `VENTA ID: ${venta.VENTAID}`
                    ventaid.href = `https://vendedores.mercadolibre.com.ar/ventas/${venta.VENTAID}/detalle`
                    contenedorInfo2.append(ventaid)

                    ventasML.forEach(ventameli => {
                        if (ventameli.pack_id === venta.VENTAID) {
                            const fecha_venta = new Date(ventameli.data.date_created);

                            const fecha_limite = new Date(fecha_venta);

                            if (fecha_venta.getHours() >= 13) {
                                fecha_limite.setDate(fecha_limite.getDate() + 1);
                            }

                            fecha_limite.setHours(15, 0, 0, 0);
                            const fecha_actual = new Date()

                            if (venta.cancel_detail) {
                                contenedorVenta.style.backgroundColor = "red"
                            }
                            else if (fecha_limite < fecha_actual) {
                                contenedorVenta.style.backgroundColor = "lightgreen";
                            }

                            const fechaVenta = document.createElement("div")
                            const cliente = document.createElement("div")
                            const totalVenta = document.createElement("div")
                            const totalNeto = document.createElement("div")

                            ventaid.textContent = `VENTA ID: ${ventameli.pack_id}`
                            ventaid.href = `https://vendedores.mercadolibre.com.ar/ventas/${ventameli.pack_id}/detalle`
                            fechaVenta.textContent = `Fecha Venta Mercadolibre: ${fechaArgentina(ventameli.data.date_created)} hs`
                            cliente.textContent = `Cliente: ${ventameli.data.buyer}`
                            const variantes = document.createElement("div")
                            ventameli.data.variante.forEach(variante => {
                                costoVenta += (variante.precio * variante.cantidad)
                                const elementVariante = document.createElement("div")
                                const titulo = document.createElement("h3")
                                const cantidad = document.createElement("div")
                                const precio = document.createElement("div")

                                titulo.textContent = variante.titulo
                                cantidad.textContent = `Cantidad: ${variante.cantidad}`
                                precio.textContent = `Precio: $${variante.precio * variante.cantidad}`
                                elementVariante.append(titulo, cantidad, precio)
                                elementVariante.style.margin = "10px"
                                elementVariante.style.backgroundColor = "rgba(60, 255, 0, 0.05)"
                                elementVariante.style.border = "solid black 1px"
                                elementVariante.style.padding = "10px"
                                variantes.append(elementVariante)
                            })

                            totalVenta.textContent = `Total Venta: ${precioArgentino(costoVenta)}`
                            if (venta.IMPORTE_NETO) {
                                totalNeto.textContent = `Total Neto: ${precioArgentino(venta.IMPORTE_NETO)}`
                                neto += venta.IMPORTE_NETO
                            }
                            contenedorInfo2.append(ventaid, fechaVenta, cliente, totalVenta, totalNeto, variantes)
                        }
                    })

                    contenedorPAGO.style.width = "30%"
                    contenedorPAGO.style.display = "flex"
                    contenedorPAGO.style.flexDirection = "column"
                    contenedorPAGO.style.justifyContent = "center"
                    contenedorPAGO.style.width = "30%"

                    if (!venta.IMAGEN_NETO) {
                        const subirPago = contenedorImagen(venta.ALBUM, venta.VENTAID) //CARGA LA IMAGEN
                        contenedorPAGO.append(subirPago)
                        if (window.innerWidth < 768) {
                            contenedorPAGO.style.display = "flex"
                            contenedorPAGO.style.flexDirection = "column"
                            contenedorPAGO.style.justifyContent = "center"
                            contenedorPAGO.style.width = "100%"
                        }

                    } else {
                        const elementPrecioNeto = document.createElement("div")
                        const elementIMG = document.createElement("div")
                        elementIMG.style.display = "flex"
                        elementIMG.style.justifyContent = "center"
                        elementPrecioNeto.style.display = "flex"
                        elementPrecioNeto.style.justifyContent = "center"

                        if (!venta.IMPORTE_NETO) {
                            const { input_precioNeto, botonConfirmarPrecioNeto } = ingresarPrecioNeto()
                            botonConfirmarPrecioNeto.textContent = "Confirmar"
                            botonConfirmarPrecioNeto.addEventListener("click", () => {
                                agregarPagoNeto(venta.VENTAID, input_precioNeto.value)
                            })
                            elementPrecioNeto.append(input_precioNeto, botonConfirmarPrecioNeto)
                        }

                        const imagenPago = document.createElement("img");

                        imagenPago.src = `data:${venta.IMAGEN_NETO.contentType};base64,${venta.IMAGEN_NETO.data}`;

                        imagenPago.alt = "Comprobante de pago";


                        if (window.innerWidth < 768) {
                            imagenPago.style.width = "40vw";
                            imagenPago.style.height = "47vh";
                            contenedorPAGO.style.display = "flex"
                            contenedorPAGO.style.flexDirection = "column"
                            contenedorPAGO.style.justifyContent = "center"
                            contenedorPAGO.style.width = "100%"
                        } else {
                            imagenPago.style.width = "15vw";
                            imagenPago.style.height = "47vh";
                        }

                        //imagenPago.style.objectFit = "contain";

                        elementIMG.append(imagenPago)

                        contenedorPAGO.append(elementIMG, elementPrecioNeto);
                    }
                }

                total = costoVenta === 0 ? venta.PRECIO : costoVenta
                totalPrecioVentas += total
                precio.textContent = `Precio: ${total}`


                contenedorInfo.style.display = "flex"
                contenedorInfo.style.justifyContent = "space-evenly"
                contenedorInfo.style.backgroundColor = "#de885d"
                contenedorInfo.style.borderTopLeftRadius = "20px"
                contenedorInfo.style.borderTopRightRadius = "20px"
                if (window.innerWidth < 768) {
                    contenedorInfo.style.flexDirection = "column"
                }

                ordenarAlfabeticamente(venta.VENDIDAS)

                venta.VENDIDAS.forEach(figu => {
                    contenedorFigus.appendChild(crearBotonContenedor(figu, album))
                })

                const crearBotonVerDetalle = document.createElement("button")
                crearBotonVerDetalle.style.height = "50px"
                crearBotonVerDetalle.style.width = "100px"
                crearBotonVerDetalle.style.margin = "20px"
                crearBotonVerDetalle.style.backgroundColor = "rgba(45, 239, 61, 0.6)"
                crearBotonVerDetalle.style.borderRadius = "10px"
                const contenedorBotones = document.createElement("div")
                const contenedorFiguGrande = document.createElement("div")
                crearBotonVerDetalle.textContent = "Verificar"

                crearBotonVerDetalle.addEventListener("click", () => {
                    let posicion = 0
                    contenedorFigus.remove()

                    contenedorBotones.replaceChildren();
                    contenedorFiguGrande.replaceChildren();

                    const botonSiguiente = document.createElement("button")
                    botonSiguiente.textContent = "Siguiente"
                    const botonAnterior = document.createElement("button")
                    botonAnterior.textContent = "Anterior"

                    contenedorBotones.style.display = "flex";
                    contenedorBotones.style.justifyContent = "center"
                    contenedorBotones.appendChild(botonAnterior)
                    contenedorBotones.appendChild(botonSiguiente)
                    contenedorVenta.appendChild(crearBotonVerDetalle)
                    crearBotonVerDetalle.remove()
                    contenedorVenta.appendChild(contenedorFiguGrande)
                    contenedorVenta.appendChild(contenedorBotones)
                    const maxFiguritas = venta.VENDIDAS.length - 1
                    figuGrande(venta.VENDIDAS[posicion], contenedorFiguGrande)

                    botonSiguiente.addEventListener("click", async () => {
                        if (posicion < maxFiguritas) {
                            posicion += 1
                        }
                        else {
                            contenedorFiguGrande.remove()
                            contenedorBotones.remove()
                            contenedorVenta.appendChild(contenedorFigus)
                            contenedorVenta.appendChild(crearBotonVerDetalle)
                            contenedorVenta.style.backgroundColor = "rgba(76, 187, 81, 0.77)"
                            await fetch(`${api}/ventas/${venta._id}`, {
                                method: "PATCH"
                            });
                        }
                        contenedorFiguGrande.innerHTML = "";
                        figuGrande(venta.VENDIDAS[posicion], contenedorFiguGrande)
                    })
                    botonAnterior.addEventListener("click", () => {
                        if (posicion > 0) {
                            posicion -= 1
                        }
                        else {
                            contenedorFiguGrande.remove()
                            contenedorBotones.remove()
                            contenedorVenta.appendChild(contenedorFigus)
                            contenedorVenta.appendChild(crearBotonVerDetalle)
                        }
                        contenedorFiguGrande.innerHTML = "";
                        figuGrande(venta.VENDIDAS[posicion], contenedorFiguGrande)
                    })

                })
                if (venta.VERIFICADAS) {
                    contenedorVenta.style.backgroundColor = "rgba(76, 187, 81, 0.77)"
                }

                const infoCentral = document.createElement("div")
                infoCentral.append(contenedorInfo2, contenedorPAGO)
                infoCentral.style.display = "flex"


                if (window.innerWidth < 768) {
                    infoCentral.style.flexDirection = "column"
                } else {
                    infoCentral.style.flexDirection = "row"
                }

                contenedorVenta.dataset.cuenta = venta.CUENTA;
                contenedorVenta.dataset.precio = venta.PRECIO;
                contenedorVenta.appendChild(contenedorInfo)
                contenedorVenta.appendChild(infoCentral)
                contenedorVenta.appendChild(contenedorFigus)
                contenedorVenta.appendChild(crearBotonVerDetalle)
                contenedorVenta.style.margin = "50px"
                contenedorVenta.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";

                contenedorVenta.style.borderRadius = "20px"
                contenedorVentasMDB.push({ contenedor: contenedorVenta, fecha: fechaML || venta.DIA })
                //totalVentasElement.appendChild(contenedorVenta)
            });
            return { precioMDB: totalPrecioVentas, precioNeto: neto }
        }



        if (totalVentasElement.id == "totalVentasAri") {
            totalVentasMDB("ARI")
            elementPrecioVenta.appendChild(totalVendido)

            contenedorVentasMDB.forEach(contenedores_venta => {
                totalVentasElement.append(contenedores_venta.contenedor)
            })

            return
        } else if (totalVentasElement.id == "totalVentasLuly") {
            totalVentasMDB("LULY")
            contenedorVentasMDB.forEach(contenedores_venta => {
                totalVentasElement.append(contenedores_venta.contenedor)
            })
            return
        }



        const totalVentasML = (vendedor) => {
            let totalPrecioVentaML = 0;
            const ventasFiltradas = vendedor ? ventasML.filter(venta => seller_name(venta.data.seller) === vendedor) : ventasML
            ventasFiltradas.forEach(ventameli => {

                const existeVenta = ventasMDB.some(
                    venta => String(venta.VENTAID) === String(ventameli.pack_id)
                );

                if (existeVenta) {
                    return;
                }
                const contenedorML = document.createElement("div")
                contenedorML.style.backgroundColor = "white"

                const fecha_venta = new Date(ventameli.data.date_created);

                const fecha_limite = new Date(fecha_venta);

                if (fecha_venta.getHours() >= 15) {
                    fecha_limite.setDate(fecha_limite.getDate() + 1);
                }

                fecha_limite.setHours(15, 0, 0, 0);

                const fecha_actual = new Date()

                if (ventameli.data?.cancel_detail) {
                    contenedorML.style.backgroundColor = "red"
                } else if (fecha_limite < fecha_actual) {
                    contenedorML.style.backgroundColor = "lightgreen";
                }


                const contenedorInfo = document.createElement("div")
                const contenedorInfo2 = document.createElement("div")
                const contenedorFigus = document.createElement("div")
                contenedorML.style.margin = "50px"
                contenedorML.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
                contenedorML.style.borderRadius = "20px"

                contenedorInfo2.style.padding = "20px";
                contenedorFigus.style.padding = "20px";

                let ventaid = document.createElement("a")
                const fechaVenta = document.createElement("div")
                const cliente = document.createElement("div")
                const totalVenta = document.createElement("div")

                let costoVenta = 0;
                ventaid.textContent = `VENTA ID: ${ventameli.pack_id}`
                ventaid.href = `https://vendedores.mercadolibre.com.ar/ventas/${ventameli.pack_id}/detalle`
                fechaVenta.textContent = `Fecha Venta Mercadolibre: ${fechaArgentina(ventameli.data.date_created)} hs`
                cliente.textContent = `Cliente: ${ventameli.data.buyer}`
                const variantes = document.createElement("div")
                ventameli.data.variante.forEach(variante => {
                    if (!ventameli.data?.cancel_detail) {
                        totalPrecioVentaML += (variante.precio * variante.cantidad)
                    }

                    costoVenta += variante.precio * variante.cantidad
                    const elementVariante = document.createElement("div")
                    const titulo = document.createElement("h3")
                    const cantidad = document.createElement("div")
                    const precio = document.createElement("div")

                    titulo.textContent = variante.titulo
                    cantidad.textContent = `Cantidad: ${variante.cantidad}`
                    precio.textContent = `Precio: $${variante.precio * variante.cantidad}`
                    elementVariante.append(titulo, cantidad, precio)
                    elementVariante.style.margin = "10px"
                    elementVariante.style.backgroundColor = "rgba(60, 255, 0, 0.05)"
                    elementVariante.style.border = "solid black 1px"
                    elementVariante.style.padding = "10px"
                    variantes.append(elementVariante)

                })
                totalVenta.textContent = `Total Venta: ${precioArgentino(costoVenta)}`

                const elementBotonAlAzar = document.createElement("div")
                const elementFigusAlAzar = document.createElement("div")
                const elementConfirmarAlAzar = document.createElement("div")
                ventameli?.data?.variante?.forEach(item => {
                    const albumFormateado = nombrePublicacion(item.mla)
                    if (albumFormateado != item.mla) {
                        const botonFiguAzar = document.createElement("button")
                        botonFiguAzar.textContent = "Figus al azar"
                        elementBotonAlAzar.appendChild(botonFiguAzar)
                        let obtenerFigusAlAzar = []
                        let figuritas;
                        botonFiguAzar.addEventListener("click", async () => {
                            obtenerFigusAlAzar = await obtenerFiguritasOrderCant(albumFormateado.bdd, item.cantidad)
                            figuritas = await obtenerFiguritas(albumFormateado.bdd)
                            obtenerFigusAlAzar.forEach(figu => {
                                elementFigusAlAzar.append(crearBotonContenedor(figu, albumFormateado.bdd))
                            })
                            let sin_stock = []
                            try {
                                await crearVenta(figuritas, obtenerFigusAlAzar, "ONLINE", seller_name(ventameli.data.seller), albumFormateado.bdd, item.precio * item.cantidad, sin_stock, "Sin Dato", albumFormateado.bdd, api, ventameli.pack_id)
                            } catch (error) {
                                console.error("no se pudo realizar")
                            }
                        })
                    }

                });
                contenedorInfo2.append(ventaid, fechaVenta, cliente, totalVenta, variantes, elementBotonAlAzar, elementFigusAlAzar, elementConfirmarAlAzar)
                contenedorML.append(contenedorInfo, contenedorInfo2, contenedorFigus)
                contenedorVentasML.push({ contenedor: contenedorML, fecha: ventameli.data.date_created })

            })
            return totalPrecioVentaML
        }

        const juntarVentas = () => {
            const ventasMDBOrdenadas = [
                ...contenedorVentasMDB,
                ...contenedorVentasML
            ];


            ventasMDBOrdenadas.sort(
                (a, b) => new Date(b.fecha) - new Date(a.fecha)
            );

            ventasMDBOrdenadas.forEach(({ contenedor }) => {
                totalVentasElement.appendChild(contenedor);
            });
        }

        const boton_TODAS = listaBotones.find(
            boton => boton.textContent === "TODAS"
        )

        boton_TODAS.click()

    }
}