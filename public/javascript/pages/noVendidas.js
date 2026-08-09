import { crearBotonContenedor } from "../componentes/botonContenedor.js";
import { albumName } from "../utilidades/nombreAlbum.js";

export const noVendidas = async (figuritas, ventas, nombreAlbum) => {

    const noVendidas = document.getElementById('noVendidas');

    const indexNoVendidas = document.getElementById('mostrarNoVendidas')

    if (noVendidas) {
        noVendidas.innerHTML = ''
    }

    if (indexNoVendidas) {
        indexNoVendidas.innerHTML = ''
    }



    ventas.forEach(venta => {

        if (venta.FALTANTES.length > 0 && venta.ALBUM == nombreAlbum) {
            let bloqueVenta = document.createElement("div")
            let faltantes = document.createElement("div")
            let datos = document.createElement("h2")
            let cuentaid = document.createElement("p")
            let fecha = document.createElement("p")
            datos.textContent = `${venta.VENTAID ? venta.VENTAID : "Sin ventaID"} | ${albumName(venta.ALBUM)}`
            cuentaid.textContent = `CUENTA: ${venta.CUENTA}`
            fecha.textContent = "FECHA VENTA: "+new Date(venta.DIA).toLocaleDateString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires"
            });

            venta.FALTANTES.forEach(figuFaltante => {
                const figus = []
                figuritas.forEach(figu => {
                    if (figu.NUM == figuFaltante) {
                        figus.push(figu)
                    }

                })
                figus.forEach(figu => {
                    const { contenedor, color, cantTotal } = crearBotonContenedor(figu, nombreAlbum)
                    if (cantTotal > 0) {
                        contenedor.style.backgroundColor = "lightgreen"
                    }
                    contenedor.style.marginBottom = "15px"
                    faltantes.appendChild(contenedor)
                })

            })

            bloqueVenta.appendChild(datos)
            bloqueVenta.appendChild(cuentaid)
            bloqueVenta.appendChild(fecha)
            bloqueVenta.appendChild(faltantes)
            bloqueVenta.style.backgroundColor = "rgba(37, 157, 91, 0.26)"
            datos.style.margin = "10px"
            cuentaid.style.margin = "10px"
            fecha.style.margin = "10px"
            faltantes.style.margin = "20px"
            bloqueVenta.style.margin = "30px"
            noVendidas?.appendChild(bloqueVenta)
            indexNoVendidas?.appendChild(bloqueVenta.cloneNode(true))
        }

    })

}