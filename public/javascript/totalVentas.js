import { api } from "../config.js";
import { ordenarAlfabeticamente } from "./ordenarAlfabeticamente.js";

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
    textoSuperior.textContent = figu.NUM;
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

const formateoAlbum = (album) =>{
    if (album=="mundialUsa2026")
        return "Mundial USA 2026"
    else if (album=="mundialQatar2022"){
        return "Mundial Qatar 2022"
    }else if (album=="copaAmerica2024"){
        return "Copa America 2024"
    }else if (album=="libertadores2023"){
        return "Libertadores 2023"
    }else if (album=="futbolArgentino2023"){
        return "futbolArgentino2024"
    }else if (album=="mundialUsa2026"){
        return "Futbol Argentino 2024"
    }
}

export const totalVentas = async (todasLasVentas, totalVentasElement) => {

    const contenedorPadre = document.createElement("div")
    const totalVendido = document.createElement("h3")
    totalVendido.style.display="flex"
    totalVendido.style.justifyContent="center"
    if (totalVentasElement) {
        if (totalVentasElement.id == "totalVentasAri") {
            todasLasVentas = todasLasVentas.filter(ventas => ventas.CUENTA == "ARI")
        } else if (totalVentasElement.id == "totalVentasLuly") {
            todasLasVentas = todasLasVentas.filter(ventas => ventas.CUENTA == "LULY")
        } else {
            const vendedores = [...new Set(todasLasVentas.map(venta => venta.CUENTA))]
            const botonesVendedores = document.createElement("div")
            const listaBotones = []
            vendedores.forEach(vendedor => {
                const boton = document.createElement("button")
                listaBotones.push(boton)
                boton.textContent = vendedor
                boton.style.height = "35px"
                boton.style.width = "70px"
                boton.style.margin = "10px"
                botonesVendedores.appendChild(boton)


                boton.addEventListener("click", () => {
                    listaBotones.forEach(boton => {
                        boton.style.backgroundColor = ""
                    })
                    const ventas = totalVentasElement.querySelectorAll("[data-cuenta]");
                    boton.style.backgroundColor = "lightgreen"
                    let total = 0;

                    ventas.forEach(div => {
                        const mostrar = div.dataset.cuenta === vendedor;
                        div.style.display = mostrar ? "" : "none";

                        if (mostrar) {
                            total += Number(div.dataset.precio);
                        }
                    });                    
                    totalVendido.textContent = `Total Vendido: $ ${total}`;
                });
            })
            botonesVendedores.style.display = "flex"
            botonesVendedores.style.justifyContent = "center"
            botonesVendedores.style.margin = "50px"
            totalVentasElement.appendChild(botonesVendedores)
            totalVentasElement.appendChild(totalVendido)
        }

        let totalPrecioVentas = 0
        todasLasVentas.forEach(venta => {
            const album = venta.ALBUM;

            totalPrecioVentas += venta.PRECIO

            const contenedorVenta = document.createElement("div")
            const contenedorInfo = document.createElement("div")
            const contenedorInfo2 = document.createElement("div")
            const contenedorFigus = document.createElement("div")

            const tituloAlbum = document.createElement("p")
            tituloAlbum.textContent = formateoAlbum(album)

            const envio = document.createElement("p")
            envio.textContent = venta.ENVIO ? `Envio: ${venta.ENVIO}` : ""

            const cuenta = document.createElement("p")
            cuenta.textContent = `Cuenta: ${venta.CUENTA}`

            const cantidad = document.createElement("p")
            cantidad.textContent = `Cantidad: ${venta.VENDIDAS.length}`

            const precio = document.createElement("p")
            precio.textContent = `Precio: ${venta.PRECIO}`

            const dia = document.createElement("p")
            dia.textContent = `Dia de venta: ${new Date(venta.DIA).toLocaleDateString("es-AR")} 🕒 ${new Date(venta.DIA).toLocaleTimeString("es-AR")}`


            contenedorInfo.appendChild(tituloAlbum)
            contenedorInfo.appendChild(dia)
            contenedorInfo.appendChild(cuenta)
            contenedorInfo.appendChild(cantidad)
            contenedorInfo.appendChild(precio)
            contenedorInfo.appendChild(envio);

            if (venta.VENTAID != null) {
                const ventaid = document.createElement('p');
                ventaid.textContent = `Venta ID: ${venta.VENTAID}`;
                contenedorInfo2.appendChild(ventaid);
            }


            contenedorInfo.style.display = "flex"
            contenedorInfo.style.justifyContent = "space-evenly"
            contenedorInfo.style.backgroundColor = "#E0E0E0"

            contenedorInfo2.style.backgroundColor = "lightgreen"


            ordenarAlfabeticamente(venta.VENDIDAS)


            venta.VENDIDAS.forEach(figu => {
                contenedorFigus.appendChild(crearBotonContenedor(figu, album))
            })

            const crearBotonVerDetalle = document.createElement("button")
            const contenedorBotones = document.createElement("div")
            const contenedorFiguGrande = document.createElement("div")
            crearBotonVerDetalle.textContent = "Chequear"

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

                botonSiguiente.addEventListener("click", () => {
                    if (posicion < maxFiguritas) {
                        posicion += 1
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
            contenedorVenta.dataset.cuenta = venta.CUENTA;
            contenedorVenta.dataset.precio = venta.PRECIO;
            contenedorVenta.appendChild(contenedorInfo)
            contenedorVenta.appendChild(contenedorInfo2)
            contenedorVenta.appendChild(contenedorFigus)
            contenedorVenta.appendChild(crearBotonVerDetalle)
            contenedorVenta.style.marginBottom = "50px"
            totalVentasElement.appendChild(contenedorVenta)
        });


    }
}