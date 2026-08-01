import { crearBotonContenedor } from "../componentes/botonContenedor.js";

export const noVendidas = async (figuritas, ventas, nombreAlbum) => {

    const noVendidas = document.getElementById('noVendidas');

    noVendidas.innerHTML = ''


    ventas.forEach(venta => {

        if (venta.FALTANTES.length > 0 && venta.ALBUM==nombreAlbum) {
            let bloqueVenta = document.createElement("div")
            let faltantes = document.createElement("div")
            let ventaid = document.createElement("h2")
            let cuentaid = document.createElement("h4")
            let album = document.createElement("h4")
            ventaid.textContent = venta.VENTAID || "Sin ventaID"
            cuentaid.textContent = venta.CUENTA
            album.textContent = nombreAlbum

            venta.FALTANTES.forEach(figuFaltante => {
                const figus = []
                figuritas.forEach(figu =>{
                    if (figu.NUM == figuFaltante){
                        figus.push(figu)
                    }

                })
                figus.forEach(figu=>{
                    const {contenedor,color, cantTotal } = crearBotonContenedor(figu, nombreAlbum)
                    if (cantTotal>0){
                        contenedor.style.backgroundColor="lightgreen"                        
                    }
                    contenedor.style.marginBottom="15px"
                    faltantes.appendChild(contenedor)
                })

            })

            bloqueVenta.appendChild(ventaid)
            bloqueVenta.appendChild(cuentaid)
            bloqueVenta.appendChild(album)
            bloqueVenta.appendChild(faltantes)
            bloqueVenta.style.backgroundColor="rgba(37, 157, 91, 0.26)"
            ventaid.style.margin="10px"
            cuentaid.style.margin="10px"
            album.style.margin="10px"
            faltantes.style.margin="20px"
            bloqueVenta.style.margin="30px"
            noVendidas.appendChild(bloqueVenta)
        }
        
    })



    // fetch(filePath)
    //     .then(response => response.json())
    //     .then(data => {

    //         const pantalla = document.createElement('div')


    //         totalFigus = data[albumName(tipo)]

    //         const nombreAlbum = document.createElement('h2')
    //         nombreAlbum.innerHTML = albumName(tipo)

    //         pantalla.appendChild(nombreAlbum)

    //         const armadoFiltrado = totalFigus.filter(item => item.ARMADO === "SI" && item.NoVendidas.length > 0 && convertirFecha(item.Dia) > fecha2meses)

    //         armadoFiltrado.forEach(item => {
    //             const user = document.createElement('h3')
    //             const cuenta = document.createElement('h5')
    //             const figu = document.createElement('p')
    //             const fecha = document.createElement('h5')

    //             user.innerHTML = item.usuario
    //             cuenta.innerHTML = `Cuenta: ${item.Cuenta}`

    //             let figuNoVendida = []

    //             window.todasLasFigus.forEach(figu => {
    //                 item.NoVendidas.forEach(num => {
    //                     if (num == (figu.NUM)) {
    //                         figuNoVendida.push({ NUM: figu.NUM, CANT: figu.CANT })
    //                     }
    //                 })
    //             })



    //             figuNoVendida.forEach(obj => {
    //                 if (obj.CANT == 0) {
    //                     figu.innerHTML += `<span style="background-color: red; color:white; padding:5px; border:1px solid #000">${obj.NUM} </span>`
    //                 } else if (obj.CANT == 1) {
    //                     figu.innerHTML += `<span style="color: white; background-color:orange; padding:5px; border:1px solid #000">${obj.NUM} </span>`
    //                 }
    //                 else if (obj.CANT >= 5) {
    //                     figu.innerHTML += `<span style="color: white;background-color:green; padding:5px; border:1px solid #000">${obj.NUM} </span>`
    //                 } else {
    //                     figu.innerHTML += `<span style="color: white;background-color:skyblue; padding:5px; border:1px solid #000">${obj.NUM} </span>`
    //                 }
    //             })

    //             const buttonText = document.createElement('button')
    //             buttonText.innerHTML = 'Copiar'

    //             fecha.innerHTML = item.Dia

    //             const marcoPantallita = document.createElement('div')

    //             marcoPantallita.appendChild(user)
    //             marcoPantallita.appendChild(fecha)
    //             marcoPantallita.appendChild(figu)
    //             marcoPantallita.appendChild(cuenta)
    //             marcoPantallita.appendChild(buttonText)

    //             buttonText.addEventListener('click', () => {
    //                 buttonText.style.backgroundColor = 'pink'
    //                 const figus = figuNoVendida.map(figu => figu.NUM).join(", ");
    //                 navigator.clipboard.writeText(`Hola! Te queria avisar que tenemos stock en ${figus}, por si aun le interesa. Saludos!`)
    //             })

    //             marcoPantallita.style.border = '1px solid lightgrey'
    //             marcoPantallita.style.padding = '15px'

    //             pantalla.appendChild(marcoPantallita)


    //         })


    //         pantalla.style.margin = '5px'
    //         pantalla.style.padding = '15px'
    //         pantalla.classList.add('fVendidas1')
    //         noVendidasHtml.appendChild(pantalla)

    //     }
    //     )
}