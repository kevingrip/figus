import { obtenerFiguritas, obtenerVentas, obtenerPreguntas } from "./javascript/servicios/api.js";
import { cosecharFigus } from "./javascript/pages/cosecharFigus.js";
import { buscarFigus } from "./javascript/pages/buscarFigus/buscarFigus.js";
import { totalVentas } from "./javascript/pages/totalVentas.js";
import { StockFigusLuly } from "./javascript/pages/StockFigusLuly.js";
import { sinStock } from "./javascript/pages/sinStock.js";
import { noVendidas } from "./javascript/pages/noVendidas.js";
import { preguntasMercadolibre } from "./javascript/pages/preguntasmeli.js";

const botonesElementosBuscar = [
    {
        botonId: "botonMundialUsaBuscarOnline",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonMundialUsaBuscarAri",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
        canalVenta: "ARI"
    },
    {
        botonId: "botonMundialUsaBuscarLuly",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
        canalVenta: "LULY"
    },
    {
        botonId: "botonMundialQatarBuscar",
        album: "mundialQatar2022",
        baseJson: "baseMundial",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonCopaAmericaBuscar",
        album: "copaAmerica2024",
        baseJson: "base_copam",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonFutArg23Buscar",
        album: "futbolArgentino2023",
        baseJson: "baseFutarg",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonFutArg24Buscar",
        album: "futbolArgentino2024",
        baseJson: "baseFutarg24",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonLibertadores23Buscar",
        album: "libertadores2023",
        baseJson: "baseLali",
        canalVenta: "ONLINE"
    }
]

const botonesElementosCosecha = [
    {
        botonId: "botonMundialUsaCosecha",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
    },
    {
        botonId: "botonMundialQatarCosecha",
        album: "mundialQatar2022",
        baseJson: "baseMundial",
    },
    {
        botonId: "botonCopaAmericaCosecha",
        album: "copaAmerica2024",
        baseJson: "base_copam",
    },
    {
        botonId: "botonFutArg23Cosecha",
        album: "futbolArgentino2023",
        baseJson: "baseFutarg",
    },
    {
        botonId: "botonFutArg24Cosecha",
        album: "futbolArgentino2024",
        baseJson: "baseFutarg24",
    },
    {
        botonId: "botonLibertadores23Cosecha",
        album: "libertadores2023",
        baseJson: "baseLali",
    }
]

const botonesElementosNoVendidas = [
    {
        botonId: "botonMundialUsaNoVendidas",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
    },
    {
        botonId: "botonMundialQatarNoVendidas",
        album: "mundialQatar2022",
        baseJson: "baseMundial",
    },
    {
        botonId: "botonCopaAmericaNoVendidas",
        album: "copaAmerica2024",
        baseJson: "base_copam",
    },
    {
        botonId: "botonFutArg23NoVendidas",
        album: "futbolArgentino2023",
        baseJson: "baseFutarg",
    },
    {
        botonId: "botonFutArg24NoVendidas",
        album: "futbolArgentino2024",
        baseJson: "baseFutarg24",
    },
    {
        botonId: "botonLibertadores23NoVendidas",
        album: "libertadores2023",
        baseJson: "baseLali",
    }
]

const botones = document.querySelectorAll(".bloqueAlbum");
botones.forEach(boton => {
    boton.addEventListener("click", () => {

        botones.forEach(b => b.classList.remove("pressed"));

        boton.classList.add("pressed");

    });
});

botonesElementosBuscar.forEach(objeto => {
    const boton = document.getElementById(objeto.botonId)
    boton?.addEventListener('click', async () => {
        try {
            const figuritas = await obtenerFiguritas(objeto.album);
            buscarFigus(objeto.baseJson, figuritas, objeto.album, objeto.canalVenta);
        } catch (error) {
            console.error(error);
        }
    })
})

botonesElementosCosecha.forEach(objeto => {
    console.log(objeto.album)
    const boton = document.getElementById(objeto.botonId)
    boton?.addEventListener('click', async () => {
        const figuritas = await obtenerFiguritas(objeto.album);
        cosecharFigus(objeto.baseJson, figuritas, objeto.album);
    })
})

const elementVentas = document.getElementById("totalVentas") || document.getElementById("totalVentasAri") || document.getElementById("totalVentasLuly")

if (elementVentas) {
    const ventas = await obtenerVentas();
    await totalVentas(ventas, elementVentas);
}

const botonStockLuly = document.getElementById("botonStockLuly")
botonStockLuly?.addEventListener("click", async () => {
    const stockLuly = await obtenerFiguritas("mundialUsa2026")
    StockFigusLuly(stockLuly, "mundialUsa2026")
})

const botonesSinStock = [
    {
        boton: "botonSinStockQatar",
        album: "mundialQatar2022"
    },
    {
        boton: "botonSinStockAmerica",
        album: "copaAmerica2024"
    },
    {
        boton: "botonSinStockUSA",
        album: "mundialUsa2026"
    },
    {
        boton: "botonSinStockFutArg23",
        album: "futbolArgentino2023"
    },
    {
        boton: "botonSinStockLibertadores23",
        album: "libertadores2023"
    },
    {
        boton: "botonSinStockFutArg24",
        album: "futbolArgentino2024"
    }
]

botonesSinStock.forEach(obj => {
    const boton = document.getElementById(obj.boton)
    boton?.addEventListener("click", async () => {
        const figus = await obtenerFiguritas(obj.album);
        sinStock(figus, obj.album)
    })
})


window.addEventListener("load", async () => {
const preguntasMeli = await obtenerPreguntas()
preguntasMercadolibre(preguntasMeli)
})




const ultimaActualizacion = () => {
    var spanUltimaActualizacion = document.getElementById('ultimaActualizacion');
    var userUpdate = document.getElementById('userUpdate')
    let filePath = './actualizado.json';

    fetch(filePath)
        .then(response => response.json())
        .then(item => {
            // Almacenar todas las figus

            console.log(item)

            // console.log(actualizacion[0],actualizacion[0])
            spanUltimaActualizacion.textContent = item["DIA"] + ' a las ' + item["ACTUALIZACION"];
            userUpdate.textContent = item["USUARIO"]
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            throw error; // Propaga el error para que se maneje en la cadena de promesas
        });
};



const buscarCliente = () => {
    let valorInput = document.getElementById('entrada').value.toUpperCase();

    const mostrarEnHtml = document.getElementById('figuUsers');
    mostrarEnHtml.innerHTML = ''; // Limpiar resultados anteriores
    existeUsuario = false;

    fetch(filePath)
        .then(response => response.json())
        .then(data => {

            Object.keys(data).forEach(llave => {
                data[llave].forEach(usuario => {
                    if (usuario.usuario == valorInput) {
                        existeUsuario = true;
                        const clientUser = document.createElement('h3');
                        const clientFigus = document.createElement('p');
                        clientUser.classList.add('clientUser')
                        clientFigus.classList.add('clientFigu')
                        clientUser.innerHTML = `${usuario.usuario}`;
                        clientFigus.innerHTML = `${usuario.figusPedidas.join(', ')}`; // Si las figus son un array, unirlas con comas
                        mostrarEnHtml.appendChild(clientUser);
                        mostrarEnHtml.appendChild(clientFigus);
                        console.log(`${usuario.usuario}: ${usuario.figusPedidas}`);
                        navigator.clipboard.writeText(clientFigus.textContent)
                    }
                })
            })


            if (existeUsuario == false) {

                const figuUsuario = document.createElement('p');
                figuUsuario.classList.add('clientFigu')
                figuUsuario.innerHTML = `No se encuentra el usuario`;
                mostrarEnHtml.appendChild(figuUsuario);
            }
        })
}

botonesElementosNoVendidas.forEach(objeto => {
    console.log(objeto.album)
    const boton = document.getElementById(objeto.botonId)
    boton?.addEventListener('click', async () => {
        const figuritas = await obtenerFiguritas(objeto.album);
        const ventas = await obtenerVentas()
        noVendidas(figuritas, ventas, objeto.album)
    })
})



const ordenarPorCantidad = async (base, event) => {
    const lista = document.getElementById("ordenadasCantidad");
    if (!lista) return console.error("No se encontró UL 'ordenadasCantidad'");

    lista.innerHTML = "";

    try {
        // Espera a que tipoAlbum cargue las figus en window.todasLasFigus
        await tipoAlbum(base, event);

        // Usamos los datos globales
        const datos = window.todasLasFigus;

        if (!Array.isArray(datos)) return console.error("No hay datos en window.todasLasFigus");

        const resultado = datos
            .filter(p => p.TIPO === "COMUNES")
            .sort((a, b) => b.CANT - a.CANT);

        resultado.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.NUM} - ${p.NOMBRE} (Stock: ${p.CANT})`;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error("Error al ordenar por cantidad:", error);
    }
};

const albumFigu = (tipo, event, pag) => {
    tipoAlbum(tipo, event)
        .then(() => {
            if (pag == "album150") {
                armarAlbumFigus();
            }
            else if (pag == "buscarUsuario") {
                buscarCliente();
            }
            else if (pag == "buscarFigus") {
                buscarFigus(tipo);
            }
            else if (pag == 'sinStock') {
                sinStock();
            } else if (pag == 'cosecharFigus') {
                cosecharFigus(tipo);
            }
            else if (pag == 'noVendidas') {
                noVendidas(tipo);
            }
        });
};

const armarAlbumFigus = () => {
    const mostrarEnHtml = document.getElementById('figuUsers');
    mostrarEnHtml.innerHTML = ''; // Limpiar resultados anteriores

    const cantComunesAlbum = 130

    fetch(filePath)
        .then(response => response.json())
        .then(data => {

            const cantComunesOk = document.createElement('h4')
            const comunesAlbum = document.createElement('p')
            const tituloAlbum = document.createElement('h3')
            comunesAlbum.innerHTML = 'Comunes: <br>'
            let figusAlbum = [];
            let cantComunes = 0
            let cantComunesMayor1 = 0


            data.forEach(figu => {
                if (figu.CANT > 2 && figu.TIPO == "COMUNES" && cantComunes < cantComunesAlbum && !figusAlbum.includes(figu.NUM)) {
                    figusAlbum.push(figu["NUM"])
                    comunesAlbum.innerHTML += `<span style="color: #1dff06;">${figu.NUM}</span> `
                    cantComunes++
                    cantComunesMayor1++
                }
            }
            )
            data.forEach(figu => {
                if (figu.CANT == 2 && figu.TIPO == "COMUNES" && cantComunes < cantComunesAlbum && !figusAlbum.includes(figu.NUM)) {
                    figusAlbum.push(figu["NUM"])
                    comunesAlbum.innerHTML += `<span style="color: #e5d100;">${figu.NUM}</span> `
                    cantComunes++
                    cantComunesMayor1++
                }
            }
            )

            let cantComunesX1 = []
            let randomsX1 = []
            data.forEach(figu => {
                if (figu.CANT == 1 && figu.TIPO == "COMUNES") {
                    cantComunesX1.push(figu.NUM)
                }
            }
            )

            cantComunesX1.forEach(figu => {
                if (cantComunes < cantComunesAlbum && !figusAlbum.includes(figu.NUM)) {
                    let randomInt = Math.floor(Math.random() * cantComunesX1.length);

                    while (randomsX1.includes(randomInt)) {
                        randomInt = Math.floor(Math.random() * cantComunesX1.length);
                    }
                    randomsX1.push(randomInt)
                    figusAlbum.push(cantComunesX1[randomInt])
                    comunesAlbum.innerHTML += `<span style="color: red;">${cantComunesX1[randomInt]}</span> `
                    cantComunes++
                }
            }
            )

            let cantFiguYPF = 0;
            const figusYPF = document.createElement('p')
            figusYPF.innerHTML = `YPF: <br>`

            let cantFiguCopa = 0;
            const figusCopa = document.createElement('p')
            figusCopa.innerHTML = `COPA: <br>`

            let cantFiguSem = 0;
            const figusSem = document.createElement('p')
            figusSem.innerHTML = `SEM: <br>`

            let cantFiguLPF = 0;
            const figusLPF = document.createElement('p')
            figusLPF.innerHTML = `LPF: <br>`

            let cantFiguEscudos = 0;
            const figusEscudos = document.createElement('p')
            figusEscudos.innerHTML = `Escudos: <br>`

            let cantFiguRiv = 0;
            const figusRiv = document.createElement('p')
            figusRiv.innerHTML = `River: <br>`

            let cantFiguBoc = 0;
            const figusBoc = document.createElement('p')
            figusBoc.innerHTML = `Boca: <br>`

            data.forEach(figu => {
                if (figu.CANT > 2) {
                    if (figu.TIPO == "YPF" && cantFiguYPF < 2) {
                        cantFiguYPF++
                        figusYPF.innerHTML += `<span style="color: #1dff06;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "COPA" && cantFiguCopa < 2) {
                        cantFiguCopa++
                        figusCopa.innerHTML += `<span style="color: #1dff06;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "SEMILLERO" && cantFiguSem < 2) {
                        cantFiguSem++
                        figusSem.innerHTML += `<span style="color: #1dff06;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "LPF" && cantFiguLPF < 1) {
                        cantFiguLPF++
                        figusLPF.innerHTML += `<span style="color: #1dff06;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "ESCUDO" && cantFiguEscudos < 7) {
                        cantFiguEscudos++
                        figusEscudos.innerHTML += `<span style="color: #1dff06;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "ESP" && figu.NUM.substring(0, 3) == "RIV" && cantFiguRiv < 3) {
                        cantFiguRiv++
                        figusRiv.innerHTML += `<span style="color: #1dff06;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "ESP" && figu.NUM.substring(0, 3) == "BOC" && cantFiguBoc < 3) {
                        cantFiguBoc++
                        figusBoc.innerHTML += `<span style="color: #1dff06;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                }
            })

            data.forEach(figu => {
                if (figu.CANT == 2) {
                    if (figu.TIPO == "YPF" && cantFiguYPF < 2) {
                        cantFiguYPF++
                        figusYPF.innerHTML += `<span style="color: #e5d100;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "COPA" && cantFiguCopa < 2) {
                        cantFiguCopa++
                        figusCopa.innerHTML += `<span style="color: #e5d100;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "SEMILLERO" && cantFiguSem < 2) {
                        cantFiguSem++
                        figusSem.innerHTML += `<span style="color: #e5d100;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "LPF" && cantFiguLPF < 1) {
                        cantFiguLPF++
                        figusLPF.innerHTML += `<span style="color: #e5d100;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "ESCUDO" && cantFiguEscudos < 7) {
                        cantFiguEscudos++
                        figusEscudos.innerHTML += `<span style="color: #e5d100;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "ESP" && figu.NUM.substring(0, 3) == "RIV" && cantFiguRiv < 3) {
                        cantFiguRiv++
                        figusRiv.innerHTML += `<span style="color: #e5d100;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "ESP" && figu.NUM.substring(0, 3) == "BOC" && cantFiguBoc < 3) {
                        cantFiguBoc++
                        figusBoc.innerHTML += `<span style="color: #e5d100;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                }
            })

            data.forEach(figu => {
                if (figu.CANT == 1) {
                    if (figu.TIPO == "YPF" && cantFiguYPF < 2) {
                        cantFiguYPF++
                        figusYPF.innerHTML += `<span style="color: red;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "COPA" && cantFiguCopa < 2) {
                        cantFiguCopa++
                        figusCopa.innerHTML += `<span style="color: red;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "SEMILLERO" && cantFiguSem < 2) {
                        cantFiguSem++
                        figusSem.innerHTML += `<span style="color: red;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO == "ESCUDO" && cantFiguEscudos < 7) {
                        cantFiguEscudos++
                        figusEscudos.innerHTML += `<span style="color: red;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                }
            })

            let sobrantes = []
            data.forEach(figu => {
                if (figu.CANT > 1 && !figusAlbum.includes(figu.NUM)) {
                    sobrantes.push(figu.NUM)
                }
            })

            const figusSobrantes = document.createElement('p')
            figusSobrantes.innerHTML = 'Sobrantes: '
            figusSobrantes.style.color = 'green'
            sobrantes.forEach(figu => figusSobrantes.innerHTML += figu + " ")


            const comunesCant1 = document.createElement('h4')
            comunesCant1.innerHTML = `CANT x1 : ${cantComunesAlbum - cantComunesMayor1}`

            cantComunesOk.innerHTML = `COMUNES >1 : ${cantComunesMayor1}/${cantComunesAlbum}`
            tituloAlbum.innerHTML = `Album (${cantComunes + cantFiguYPF + cantFiguCopa + cantFiguLPF + cantFiguSem + cantFiguEscudos + cantFiguRiv + cantFiguBoc}): `
            mostrarEnHtml.appendChild(cantComunesOk)
            mostrarEnHtml.appendChild(comunesCant1)
            mostrarEnHtml.appendChild(tituloAlbum)
            mostrarEnHtml.appendChild(comunesAlbum)
            mostrarEnHtml.appendChild(figusYPF)
            mostrarEnHtml.appendChild(figusCopa)
            mostrarEnHtml.appendChild(figusSem)
            mostrarEnHtml.appendChild(figusLPF)
            mostrarEnHtml.appendChild(figusEscudos)
            mostrarEnHtml.appendChild(figusRiv)
            mostrarEnHtml.appendChild(figusBoc)
            mostrarEnHtml.appendChild(figusSobrantes)

            const buttonCopiar = document.createElement('button')
            buttonCopiar.innerHTML = `Copiar ${cantComunes + cantFiguYPF + cantFiguCopa + cantFiguLPF + cantFiguSem + cantFiguEscudos + cantFiguRiv + cantFiguBoc} figus `
            mostrarEnHtml.appendChild(buttonCopiar)

            buttonCopiar.addEventListener('click', () => {
                let figusParaAlbum = "";
                figusAlbum.forEach(figu => figusParaAlbum += figu + " ")
                navigator.clipboard.writeText(figusParaAlbum)
            })
        })

}

const albumName = (nombreJson) => {
    if (nombreJson == "baseMundial") {
        return "Mundial Qatar 2022"
    } else if (nombreJson == "base_copam") {
        return "Copa America 2024"
    } else if (nombreJson == "baseMundialUsa") {
        return "Mundial USA 2026"
    } else if (nombreJson == "baseFutarg") {
        return "Futbol Argentino 2023"
    } else if (nombreJson == "baseFutarg24") {
        return "Futbol Arg 2024"
    } else if (nombreJson == "baseLali") {
        return "Copa Libertadores 2023"
    }

}

function convertirFecha(fechaStr) {
    const [dia, mes, anio] = fechaStr.split('/').map(num => parseInt(num, 10));
    return new Date(anio, mes - 1, dia); // Recordar que los meses en JavaScript empiezan desde 0
}

const fecha2meses = new Date();
fecha2meses.setHours(0, 0, 0, 0); // Solo considerar la fecha sin hora
fecha2meses.setDate(fecha2meses.getDate() - 40);

const hoy = new Date();
hoy.setHours(0, 0, 0, 0)