import { api } from "../../../config.js";
import { operacionDescargar, descontarBaseMongodb, agregarCuenta, elementoVenta } from "./elementoVenta.js";
import { elementoPregunta } from "./elementoPregunta.js";
import { precioBarato } from "./preciosBaratos.js";

const sinFiguLuly = [
    "FWC18",
    "ALG13",
    "COD5",
    "UZB8",
    "GHA2",
    "CC3", ,
    "CC9"
]

const formatearPaises = (valorInput) => {
    valorInput = valorInput.replace(/00/g, "0");
    valorInput = valorInput.replace(/WALLES|WALES|GALES|GALS/g, "WAL");
    valorInput = valorInput.replace(/INTRO|INTR/g, "INT");
    valorInput = valorInput.replace(/MEXICO|MEJICO|MXICO|MÉXICO|MX|MEXIVO|MÉX/g, "MEX");
    valorInput = valorInput.replace(/URUGUAYO|URUGUAY|URUGUAO|URUGUA|URGUA|URUG/g, "URU");
    valorInput = valorInput.replace(/ESTADOSUNIDOS|EEUU|EE.UU/g, "USA");
    valorInput = valorInput.replace(/BRASIL|BRAZIL/g, "BRA");
    valorInput = valorInput.replace(/CANADA|CANADÁ|CANAD|CANA|CAADA/g, "CAN");
    valorInput = valorInput.replace(/COSTA RICA|COSTARICA/g, "CRC");
    valorInput = valorInput.replace(/ARGENTINA|AFA|ARH/g, "ARG");
    valorInput = valorInput.replace(/AUSTRALIA|AUST|AUTRALIA/g, "AUS");
    valorInput = valorInput.replace(/BELGICA|BLGICA|BELJICA|BELGIUM|BELGI|BELG/g, "BEL");
    valorInput = valorInput.replace(/CANADA|CANAD|CANA|CAADA/g, "CAN");
    valorInput = valorInput.replace(/CAMERUN|CAMERÚN|CAMEROON|CAMERN|CAM|CAMERON|CRM|CAME|CAMERRON|CAMER/g, "CMR");
    valorInput = valorInput.replace(/COSTARICA|C. RICA|COSTA RICA|COST|COSRIC/g, "CRC");
    valorInput = valorInput.replace(/CROACIA|CROATIA|CROA|CROCIA/g, "CRO");
    valorInput = valorInput.replace(/DINAMARCA|DENMARK|DINMICA|DENAMARK|DENMARARK|DIAMARCA|DINA/g, "DEN");

    valorInput = valorInput.replace(/FCW|ESTADIO|FWCC/g, "FWC");
    valorInput = valorInput.replace(/INGLATERRA|ENGLAND|ING|ENGLAN/g, "ENG");
    valorInput = valorInput.replace(/ESPAÑA|SPAIN|ESPAA|SPANIA/g, "ESP");
    valorInput = valorInput.replace(/FRANCIA|FRANCE|FRAC|FRAN/g, "FRA");
    valorInput = valorInput.replace(/ALEMANIA|ALEMANA|GERMANY|GERMAN|ALEM|GERM|ALE/g, "GER");
    valorInput = valorInput.replace(/GHANA|GANA|GHAN/g, "GHA");
    valorInput = valorInput.replace(/IRIRAN|IRÁN|IRAN|IRAM|LRN/g, "IRN");
    valorInput = valorInput.replace(/JAPON|JAPAN|JAPN|JAP/g, "JPN");
    valorInput = valorInput.replace(/KOREA|COREA|KOREADELSUR|COR|COREADELSUR|KOREAREPUBLIC|KORE|KOREAREPBLICA|KOREAREPUBIC/g, "KOR");
    valorInput = valorInput.replace(/ARABIASAUDITA|ARABIASAUDI|SAUDIARABIA|ARABIA|SAUDIAR|ARABSAU|SAUDARABIA|ARAB|ARA/g, "KSA");
    valorInput = valorInput.replace(/MARRUECOS|MOROCCO|MORROCO|MAROCCO|MOROCO|MARRU|MARR|MRR|MOR/g, "MAR");
    valorInput = valorInput.replace(/HOLANDA|NETHERLANDS|NEDERLAND|PAISESBAJOS|OLANDA|NETHER|NETHELAND|PASESBAJOS|HOL|HOLAN|NETHERLAND/g, "NED");
    valorInput = valorInput.replace(/POLONIA|POLAND/g, "POL");
    valorInput = valorInput.replace(/PORTUGAL|PORT/g, "POR");
    valorInput = valorInput.replace(/QATAR|QATARÍ|QATA/g, "QAT");
    valorInput = valorInput.replace(/SENEGAL|SENEG/g, "SEN");
    valorInput = valorInput.replace(/SERBIA|SER|SERB/g, "SRB");
    valorInput = valorInput.replace(/SUIZA|SUSA|SWITZERLAND|SIU|SWITZERLABD/g, "SUI");
    valorInput = valorInput.replace(/TUNEZ|TÚNEZ|TUNISIA|TNEZ|TUNES|TUNI|TINISIA/g, "TUN");
    valorInput = valorInput.replace(/ESTADOSUNIDOS|ESTADOS UNIDOS|EEUU|EE.UU/g, "USA");

    valorInput = valorInput.replace(/HCL|HC1|ESTADIO|ESTADIOS/g, "HCI");
    valorInput = valorInput.replace(/PERU|PERÚ|PERO/g, "PER");
    valorInput = valorInput.replace(/CHILE/g, "CHI");
    valorInput = valorInput.replace(/VENEZUELA|VENEZ/g, "VEN");
    valorInput = valorInput.replace(/JAMAICA|JAMA/g, "JAM");
    valorInput = valorInput.replace(/PANAMA|PANAM/g, "PAN");
    valorInput = valorInput.replace(/BOLIVIA|BOLIV/g, "BOL");
    valorInput = valorInput.replace(/COLOMBIA|COLOM|COLO/g, "COL");
    valorInput = valorInput.replace(/PARAGUAY|PARAGUA|PARAG|PARA/g, "PAR");
    valorInput = valorInput.replace(/HONDURAS|HONDURA|HONDU|HOND/g, "HON");
    valorInput = valorInput.replace(/TRINIDADTOBAGO|TRINIDAD|TYT|TRINIDADANDTOBAGO|TRT|TRIN/g, "TRI");
    valorInput = valorInput.replace(/LEGENDARIA|LEYENDAS|LEENDA|LEENDAS|LEGENDARIOS|LEGEND|LEGENDA|LEGENDARIAS/g, "LEG");
    valorInput = valorInput.replace(/RHO/g, "ROH");
    valorInput = valorInput.replace(/ECUADOR/g, "ECU");
    valorInput = valorInput.replace(/CONGO/g, "COD");
    valorInput = valorInput.replace(/SUECIA|SUE/g, "SWE");
    valorInput = valorInput.replace(/EGIPTO|EGI/g, "EGY");

    valorInput = valorInput.replace(/ YPF/g, "YPF");
    valorInput = valorInput.replace(/ Y/g, "")
    valorInput = valorInput.replace(/ DE /g, "")
    return valorInput;
}

const formatearEntrada = (valorInput) => {

    let figuritas = ''
    let pais = ''
    let num = ''
    let caracterAnt = ''
    let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let numeros = '1234567890'

    valorInput = formatearPaises(valorInput)


    for (let i = 0; i < valorInput.length; i++) {
        if (letras.includes(valorInput[i])) {
            if (pais.length < 3) {
                pais += valorInput[i]
            } else {
                pais = ''
                pais += valorInput[i]
            }

        }
        if (numeros.includes(valorInput[i])) {
            num = valorInput[i]
            if (numeros.includes(caracterAnt)) {
                figuritas += num
            } else {
                if (figuritas.length == 0) {
                    figuritas += pais + num
                } else {
                    figuritas += ' ' + pais + num
                }

            }
        }
        caracterAnt = valorInput[i]
    }
    console.log(figuritas)

    // const sacarEspacio = valorInput.replace(/\s+(\d)/g, '$1');

    const figusSeleccionadas = figuritas.split(/[,\s-]+/).map(figu => figu.trim());
    return figusSeleccionadas;
}

const contarTipoFigu = (figusEnStock) => {

    const contadorTipos = {};

    figusEnStock.forEach(figu => {
        contadorTipos[figu.TIPO] = (contadorTipos[figu.TIPO] || 0) + 1;
    });

    console.log("contadorTipos:", contadorTipos)

    return {
        contadorTipos
    }

}


const figusEntrada = (albumFigus) => {
    let valorInput = document.getElementById('entrada').value.toUpperCase();
    const figusEntrada = formatearEntrada(valorInput)

    // Filtrar las figus seleccionadas
    const figusDeLaConsulta = albumFigus.filter(figu => figusEntrada.includes(figu.NUM));

    let errorEscritura = false;
    let figusError = "";

    figusEntrada.forEach(figuNum => {
        // Buscar si la figura está en el array de figuras encontradas
        const figu = figusDeLaConsulta.find(fig => fig.NUM === figuNum);

        // Si no está en el array, se muestra un mensaje en consola
        if (!figu) {
            errorEscritura = true;
            figusError += figuNum + " ";
        }
    });

    console.log(figusDeLaConsulta)

    return { errorEscritura, figusError, figusDeLaConsulta }
}

const getStockyPrecio = (figusDeLaConsulta, canalPregunta) => {


    let figusEnStock = []
    let figusSinStock = []
    let totalPrecio = 0;

    const prioridadConsultaProveedoresOnline = ["PDM", "MATI", "CAMBIOS", "OTROS", "LULY"]
    const prioridadConsultaProveedoresLuly = ["LULY", "PDM", "MATI", "CAMBIOS", "OTROS"]
    const prioridadConsultaProveedoresAri = ["PDM", "MATI", "LULY", "CAMBIOS", "OTROS"]

    figusDeLaConsulta.forEach(figu => {

        if (canalPregunta == "ONLINE") {

            const proveedor = prioridadConsultaProveedoresOnline.find(proveedor => figu.STOCK[proveedor]?.CANT > 0)
            if (!proveedor) {
                !figusSinStock.push(figu.NUM)
                return
            }
            if (proveedor === "PDM") {
                totalPrecio += figu.STOCK["PDM"].PRECIO
            }
            else {
                totalPrecio += figu.STOCK["MATI"].PRECIO
            }
            figusEnStock.push(figu)

        } else if (canalPregunta == "LULY") {
            const proveedor = prioridadConsultaProveedoresLuly.find(proveedor => figu.STOCK[proveedor]?.CANT > 0)
            if (!proveedor || sinFiguLuly.includes(figu.NUM)) {
                !figusSinStock.push(figu.NUM)
                return
            }
            if (proveedor === "MATI") {
                totalPrecio += precioBarato(figu.TIPO)
            }
            else if (proveedor === "LULY") {
                totalPrecio -= 300
            } else {
                totalPrecio += figu.STOCK[proveedor].PRECIO
            }
            figusEnStock.push(figu)

        } else if (canalPregunta == "ARI") {
            const proveedor = prioridadConsultaProveedoresAri.find(proveedor => figu.STOCK[proveedor]?.CANT > 0)
            if (!proveedor) {
                !figusSinStock.push(figu.NUM)
                return
            }
            if (proveedor === "MATI") {
                totalPrecio += precioBarato(figu.TIPO)
            }
            else if (proveedor === "LULY") {
                totalPrecio += 300
            } else {
                totalPrecio += figu.STOCK[proveedor].PRECIO
            }
            figusEnStock.push(figu)

        }

    });



    if (canalPregunta == "ONLINE") {
        const { contadorTipos } = contarTipoFigu(figusEnStock)
        if (figusSinStock.length == 0 && (totalPrecio + 2000) < 33000) {
            totalPrecio += 2000
        } else if (totalPrecio <= 5000 && figusEnStock.length > 0) {
            totalPrecio += (((contadorTipos?.COMUNES ?? 0) * 500) + ((contadorTipos?.ESCUDO ?? 0) * 2000))
        }
    }

    return { figusEnStock, figusSinStock, totalPrecio }
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


export const buscarFigus = (nombreJson, albumFigus, albumRuta, canalPregunta, preguntasMeli) => {

    let costoEnvioGratis = 33000
    let mensaje = "";
    let proveedor;
    const { errorEscritura, figusError, figusDeLaConsulta } = figusEntrada(albumFigus)

    let { figusEnStock, figusSinStock, totalPrecio } = getStockyPrecio(figusDeLaConsulta, canalPregunta)

    // Mostrar resultados en el HTML
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = ''; // Limpiar resultados anteriores

    const contenedorPreguntaMeli = document.createElement('div')

    preguntasMeli.forEach(pregunta => {
        const elementPregunta = document.createElement("div")
        const fechaPregunta = document.createElement('p')
        const itemId = document.createElement('p')
        const sellerId = document.createElement('p')
        const preguntaMeli = document.createElement('p')
        const idPregunta = document.createElement('p')

        fechaPregunta.textContent = `Fecha: ${pregunta.date_created}`
        itemId.textContent = `Publicacion: ${pregunta.item_id}`
        sellerId.textContent = `Cuenta: ${pregunta.seller_id}`
        preguntaMeli.textContent = `Pregunta: ${pregunta.text}`
        idPregunta.textContent = `preguntaID: ${pregunta.id}`
        console.log(pregunta.text)
        elementPregunta.style.marginBottom = "100px"
        elementPregunta.style.backgroundColor = "#c6e0f2"
        elementPregunta.append(fechaPregunta, itemId, sellerId, preguntaMeli, idPregunta)
        contenedorPreguntaMeli.appendChild(elementPregunta)
    })



    const elementIngresarID = document.createElement("div")
    const IngresarID = document.createElement("input")
    const elementResponder = document.createElement("div")
    const botonResponderMeli = document.createElement("button")
    botonResponderMeli.textContent = "RESPONDER"
    elementIngresarID.appendChild(IngresarID)
    elementResponder.appendChild(elementIngresarID)
    elementResponder.appendChild(botonResponderMeli)

    resultados.appendChild(elementResponder)
    resultados.appendChild(contenedorPreguntaMeli)


    const contenedorPreguntaOVenta = document.createElement('div')

    const buttonPregunta = document.createElement('button')
    buttonPregunta.innerHTML = 'Pregunta'
    buttonPregunta.classList.add('boton')

    const buttonVenta = document.createElement('button')
    buttonVenta.innerHTML = 'Venta'
    buttonVenta.classList.add('boton')

    contenedorPreguntaOVenta.appendChild(buttonPregunta)
    contenedorPreguntaOVenta.appendChild(buttonVenta)
    contenedorPreguntaOVenta.classList.add('centrar')
    contenedorPreguntaOVenta.style.backgroundColor = 'black'
    if (errorEscritura == false) {

        const infoPregunta = {
            elementos: {
                resultados,
                contenedorPreguntaOVenta,
                buttonPregunta,
                buttonVenta
            },
            datos: {
                figusEnStock,
                figusSinStock,
                totalPrecio,
                figusDeLaConsulta,
                costoEnvioGratis,
                canalPregunta
            }
        }

        let { mensaje: mensajePregunta, precioFinal, elementResumenListaFigu, divPregunta } = elementoPregunta(infoPregunta)

        mensaje = mensajePregunta.textContent
        console.log(mensaje)
        botonResponderMeli.addEventListener("click", async () => {
            await fetch(`${api}/mercadolibre/respuestas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: Number(IngresarID.value),
                    texto: mensaje
                })
            });
        })

        const infoVenta = {
            elementos: {
                buttonVenta,
                buttonPregunta,
                divPregunta,
                mensaje,
                elementResumenListaFigu

            },
            datos: {
                figusSinStock,
                figusEnStock,
                albumFigus,
                albumRuta,
                canalPregunta,
                nombreJson,
                precioFinal
            },
            ruta: { api }
        }

        elementoVenta(infoVenta)

    } else {
        const errorEscritura = document.createElement('p');
        errorEscritura.innerHTML = `${figusError.length > 0 ? `Error de escritura.<br> Posible error: ${figusError}` : 'Ingrese figuritas'}`;
        errorEscritura.classList.add('clientFigu')
        resultados.appendChild(errorEscritura);
    }
};