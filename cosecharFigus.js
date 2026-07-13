
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
    textoInferior.textContent = `Cant: ${figu.CANT}`;
    textoInferior.style.fontSize = "11px";

    informacion.appendChild(textoSuperior);
    informacion.appendChild(textoInferior);

    const botonMas = document.createElement("button");
    botonMas.textContent = "▲";
    botonMas.style.height = "30px";
    botonMas.style.width = "60px";

    contenedor.style.margin="3px"

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

function cantidadBotonesAnchoAlbum(album, figu, boton) {
    if (album == 'copaAmerica2024') {
        if (figu.NUM.substring(3, 5) == "22") {
            resultados.appendChild(boton)
            resultados.appendChild(document.createElement('br'))
            resultados.appendChild(document.createElement('br'))
        } else {
            resultados.appendChild(boton)
        }
    } else if (album == 'mundialQatar2022') {
        if (figu.NUM.substring(3, 5) == "19" || figu.NUM=="C8" || figu.NUM=="FWC29") {
            resultados.appendChild(boton)
            resultados.appendChild(document.createElement('br'))
            resultados.appendChild(document.createElement('br'))
        } else {
            resultados.appendChild(boton)
        }
    } else if (album == 'mundialUsa2026') {
        if (figu.NUM == "CC14" || figu.NUM.substring(3, 5) == "20") {
            resultados.appendChild(boton)
            resultados.appendChild(document.createElement('br'))
            resultados.appendChild(document.createElement('br'))
        }
        else {
            resultados.appendChild(boton)
        }
    } else {
        if (figu.NUM.substring(3, 5) == "19") {
            resultados.appendChild(boton)
            resultados.appendChild(document.createElement('br'))
            resultados.appendChild(document.createElement('br'))
        } else {
            resultados.appendChild(boton)
        }
    }
}

function datosBloques(figu, informacion,textoInferior, esClick) {
    textoInferior.textContent = `Cant: ${figu.CANT}`;
    if (figu.TIPO == "COMUNES") {

        if (figu.CANT == 0) {
            informacion.style.backgroundColor = '#FF4747'
        } else if (figu.CANT == 1) {
            informacion.style.backgroundColor = 'orange'
        } else if (figu.CANT > 9) {
            informacion.style.backgroundColor = 'lightgreen'
        } else if (esClick) {
            informacion.style.backgroundColor = 'yellow'
        }
    }
    else {
        if (figu.CANT == 0) {
            informacion.style.backgroundColor = '#FF4747'
        } else if (figu.CANT == 1) {
            informacion.style.backgroundColor = 'orange'
        } else if (figu.CANT > 4) {
            informacion.style.backgroundColor = 'lightgreen'
        } else if (esClick) {
            informacion.style.backgroundColor = 'yellow'
        }
    }
}


export const cosecharFigus = (tipo, figuritas,albumRuta) => {

    const resultados = document.getElementById('resultados');
    resultados.innerHTML = ''
    let figusSeleccionadas = ""

    const divDescargar = document.createElement('div')
    divDescargar.style.display = 'flex'
    divDescargar.style.justifyContent = 'center'
    divDescargar.style.margin = '20px'

    const buttonDescargarBase = document.createElement('button')
    buttonDescargarBase.style.backgroundColor = 'skyblue'
    buttonDescargarBase.innerHTML = 'Descargar Base'

    resultados.appendChild(buttonDescargarBase)
    divDescargar.appendChild(buttonDescargarBase)

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

    //cartel succesfull


    figuritas.sort((a, b) => {
        const matchA = a.NUM.match(/([A-Za-z]+)(\d+)/); // Separar letras y números
        const matchB = b.NUM.match(/([A-Za-z]+)(\d+)/);

        if (matchA && matchB) {
            const letraA = matchA[1];
            const numeroA = parseInt(matchA[2]);
            const letraB = matchB[1];
            const numeroB = parseInt(matchB[2]);

            // Primero ordenar por letra
            if (letraA !== letraB) {
                return letraA.localeCompare(letraB);
            }

            // Luego ordenar por número
            return numeroA - numeroB;
        }

        return a.NUM.localeCompare(b.NUM); // Si no coincide con el patrón, usar orden alfabético normal
    });

    figuritas.forEach(figu => {

        const {contenedor,botonMas,botonMenos,textoInferior}= crearBotonContenedor(figu)
        //resultados.appendChild(contenedor)


        ajustarAltura(contenedor);
        ajustarAnchoPantalla(contenedor, albumRuta)
        datosBloques(figu, contenedor,textoInferior, false)

        cantidadBotonesAnchoAlbum(albumRuta, figu, contenedor)


        botonMas.addEventListener('click', async () => {

            //ACTUALIZAR CON MONGO
            const respuesta = await fetch(`http://localhost:5050/${albumRuta}/incrementar/${figu._id}`, {
                method: "PATCH"
            });

            const figuActualizada = await respuesta.json();

            // actualizar el objeto del frontend
            figu.CANT = figuActualizada.CANT;

            agregarFigu()

            Toast.fire({
                icon: 'success',
                title: `${figu.NUM} agregada correctamente. CANT:${figu.CANT}`
            })


            datosBloques(figu, contenedor,textoInferior, true)

            figusSeleccionadas = figu.NUM
            const filteredFigus = figuritas.filter(figu => figusSeleccionadas == (figu.NUM));
            //console.log(filteredFigus)

            filteredFigus.forEach(figu => {
                const li = document.createElement('li');
                li.classList.add('listaClass')
                if (figu.CANT == 0) {
                    li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length == 1 ? `${figu.CANT}` + '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length == 3 ? figu.PRECIO + '&nbsp;' : figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
                    li.style.color = 'red'
                } else {
                    li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length == 1 ? `${figu.CANT}` + '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length == 3 ? figu.PRECIO + '&nbsp;' : figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
                }
                resultados.appendChild(li);
            });

        })
        botonMenos.addEventListener('click', async () => {

            //ACTUALIZAR CON MONGO
            const respuesta = await fetch(`http://localhost:5050/${albumRuta}/decrementar/${figu._id}`, {
                method: "PATCH"
            });

            const figuActualizada = await respuesta.json();

            // actualizar el objeto del frontend
            figu.CANT = figuActualizada.CANT;

            //agregarFigu()

            Toast.fire({
                icon: 'success',
                title: `${figu.NUM} descontada correctamente. CANT:${figu.CANT}`
            })


            datosBloques(figu, contenedor,textoInferior, true)

            figusSeleccionadas = figu.NUM
            const filteredFigus = figuritas.filter(figu => figusSeleccionadas == (figu.NUM));

            // filteredFigus.forEach(figu => {
            //     const li = document.createElement('li');
            //     li.classList.add('listaClass')
            //     if (figu.CANT == 0) {
            //         li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length == 1 ? `${figu.CANT}` + '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length == 3 ? figu.PRECIO + '&nbsp;' : figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
            //         li.style.color = 'red'
            //     } else {
            //         li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length == 1 ? `${figu.CANT}` + '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length == 3 ? figu.PRECIO + '&nbsp;' : figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
            //     }
            //     resultados.appendChild(li);
            // });

        })
    })


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