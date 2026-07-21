import { api } from "../config.js";


const formatearPaises = (valorInput) => {
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

const contarTipo = (figuListObj) => {

    let cantEscudos = 0
    let cantEquipos = 0
    let cantComunes = 0
    let cantAFA = 0
    let cantLeg = 0
    let cantFWCD = 0
    let cantFWCC = 0
    let cantCoca = 0
    let cantJugadoresEspeciales = 0

    figuListObj.forEach(figu => {
        if (figu.TIPO == "COMUNES") {
            cantComunes++
        } else if (figu.TIPO == "ESCUDO" || figu.TIPO == "ESC") {
            cantEscudos++
        } else if (figu.TIPO == "AFA" || figu.TIPO == "AFA ESC") {
            cantAFA++
        } else if (figu.TIPO == "EQUIPO") {
            cantEquipos++
        } else if (figu.TIPO == "FWCD" || figu.TIPO == "FWC") {
            cantFWCD++
        } else if (figu.TIPO == "FWCC") {
            cantFWCC++
        } else if (figu.TIPO == "COCA") {
            cantCoca++
        }
    })

    return {
        cantEscudos, cantEquipos, cantComunes, cantAFA, cantLeg, cantFWCD, cantFWCC, cantCoca, cantJugadoresEspeciales
    }

}

const preciosRespuesta = (figusEnStock, figusFaltantes, costoEnvioGratis, precioTotal, figuListObj,canalPregunta) => {

    const { cantEscudos, cantEquipos, cantComunes, cantAFA, cantLeg, cantFWCD, cantFWCC, cantCoca, cantJugadoresEspeciales } = contarTipo(figuListObj)

    if (canalPregunta == "ONLINE") {
        if (precioTotal <= 5000) {
            precioTotal += ((cantComunes * 500) + (cantEscudos * 2000) + (cantEquipos * 2000))
        } else if (figusFaltantes.length == 0) {
            precioTotal += 2500
        }
    }


    let tercera = `${precioTotal}. \nConfirmame si te sirve y actualizo el precio de esta publicación para tu compra${precioTotal > costoEnvioGratis ? ` con Envio Gratis!!` : `. Saludos!`}`

    let segunda = `El precio por ${figusEnStock.length == 1 ? 'la figurita original es $' : `las ${figusEnStock.length} figuritas originales es `}`

    let primera = `Hola! Si, ${figusEnStock.length == 1 ? 'la' : 'las'} tengo en stock. \n`

    let primera2 = `Hola! Las tengo excepto ${figusFaltantes}. \n`

    let primera3 = `Hola! De tu lista tengo ${figusEnStock}. \n`

    if (figusEnStock.length == 0) {
        let singPlu = figusFaltantes.length > 1 ? "las" : "la"
        return `Hola! No ${singPlu} tengo en stock. Saludos`
    }

    else {
        if (figusFaltantes.length == 0) {
            return primera + segunda + tercera
        } else {
            if (figusFaltantes.length >= figusEnStock.length) {
                return primera3 + segunda + tercera
            } else {
                return primera2 + segunda + tercera
            }
        }
    }

}

const precioBarato = (precioTotal, tipo, precioOnline) => {
    if (tipo == "COMUNES") {
        precioTotal += 800
    } else if (tipo == "EQUIPO") {
        precioTotal += 1200
    } else if (tipo == "AFA") {
        precioTotal += 3000
    } else if (tipo == "ESCUDO AFA") {
        precioTotal += 4000
    }  else if (tipo == "FWC") {
        precioTotal += 4000
    } else if (tipo == "ESCUDO") {
        precioTotal += 2500
    }else if(tipo=="MESSI"){
        precioTotal += 20000
    }else{
        precioTotal += precioOnline
    }
    return precioTotal;
}


export const buscarFigus = (nombreJson, albumFigus, albumRuta, canalPregunta) => {
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

    let costoEnvioGratis = 33000

    let valorInput = document.getElementById('entrada').value.toUpperCase();
    const figusEntrada = formatearEntrada(valorInput)

    // Filtrar las figus seleccionadas
    const figusDeLaBase = albumFigus.filter(figu => figusEntrada.includes(figu.NUM));

    let errorEscritura = false;
    let error = "";

    figusEntrada.forEach(figuNum => {
        // Buscar si la figura está en el array de figuras encontradas
        const figu = figusDeLaBase.find(fig => fig.NUM === figuNum);

        // Si no está en el array, se muestra un mensaje en consola
        if (!figu) {
            errorEscritura = true;
            error += figuNum + " ";
        }
    });

    console.log(figusDeLaBase)

    let totalPrecio = 0;
    let figuList = []
    let figusEnStock = []
    let figusSinStock = []
    let figuListObj = [] // lista del objeto figu
    let proveedor;

    figusDeLaBase.forEach(figu => {

        if (figu.STOCK.PDM.CANT > 0) {
            totalPrecio += figu.STOCK.PDM.PRECIO;

            figusEnStock.push(figu.NUM)
            figuListObj.push(figu)


        } else if (figu.STOCK.MATI.CANT > 0) {
            let precio=figu.STOCK.MATI.PRECIO

            if (canalPregunta == "ONLINE") {
                totalPrecio += precio;
            } else {
                totalPrecio = precioBarato(totalPrecio, figu.TIPO, precio)
            }

            figusEnStock.push(figu.NUM)
            figuListObj.push(figu)

        } else if (figu.STOCK.CAMBIOS.CANT > 0) {

            if (canalPregunta == "ONLINE") {
                totalPrecio += figu.STOCK.MATI.PRECIO;
            } else {
                totalPrecio = precioBarato(totalPrecio, figu.TIPO)
            }

            figusEnStock.push(figu.NUM)
            figuListObj.push(figu)

        } else if (figu.STOCK.OTROS.CANT > 0) {
            if (canalPregunta == "ONLINE") {
                totalPrecio += figu.STOCK.MATI.PRECIO;
            } else {
                totalPrecio = precioBarato(totalPrecio, figu.TIPO)
            }

            figusEnStock.push(figu.NUM)
            figuListObj.push(figu)

        } else {

            figusSinStock.push(figu.NUM)

        }
    });



    // Mostrar resultados en el HTML
    const resultados = document.getElementById('resultados');

    let divPregunta = null
    const separacionDiv1 = document.createElement('div');
    const separacionDiv2 = document.createElement('div');


    separacionDiv1.classList.add = ('inptDiv')
    separacionDiv2.classList.add('inptDiv')

    resultados.innerHTML = ''; // Limpiar resultados anteriores

    const operacionDiv = document.createElement('div')

    const buttonPregunta = document.createElement('button')
    buttonPregunta.innerHTML = 'Pregunta'
    buttonPregunta.classList.add('boton')

    const buttonVenta = document.createElement('button')
    buttonVenta.innerHTML = 'Venta'
    buttonVenta.classList.add('boton')

    operacionDiv.appendChild(buttonPregunta)
    operacionDiv.appendChild(buttonVenta)
    operacionDiv.classList.add('centrar')
    operacionDiv.style.backgroundColor = 'black'


    if (errorEscritura == false) {

        resultados.appendChild(operacionDiv)

        setTimeout(() => {
            buttonPregunta.click();
        }, 0);

        divPregunta = document.createElement('div')
        divPregunta.classList.add('inptCuadro')

        let stringDeFiguritas = ""

        const botonCopiarFigus = document.createElement('button')
        botonCopiarFigus.textContent = 'Copiar Figus'
        separacionDiv2.appendChild(botonCopiarFigus)


        const cantLi = document.createElement('p');
        cantLi.textContent = `Cantidad figus contadas en la pregunta: ${figusEnStock.length+figusSinStock.length}`;
        separacionDiv2.appendChild(cantLi);

        figusDeLaBase.forEach(figu => {
            stringDeFiguritas += figu.NUM + " "
            figuList.push(figu.NUM)

            const li = document.createElement('li');
            li.classList.add('listaClass')

            let cant_stock = figu.STOCK.MATI.CANT + figu.STOCK.PDM.CANT + figu.STOCK.CAMBIOS.CANT + figu.STOCK.OTROS.CANT
            let precioOnline = figu.STOCK.PDM.CANT > 0 ? figu.STOCK.PDM.PRECIO : figu.STOCK.MATI.CANT > 0 ? figu.STOCK.MATI.PRECIO : figu.STOCK.CAMBIOS.CANT > 0 ? figu.STOCK.CAMBIOS.PRECIO : figu.STOCK.OTROS.CANT > 0 ? figu.STOCK.OTROS.PRECIO : 0

            if (cant_stock == 0) {
                li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${cant_stock} \u00A0\u00A0\u00A0   \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
                li.style.color = 'red'
            } else {
                li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${cant_stock} \u00A0\u00A0\u00A0 ${canalPregunta==="ONLINE"?"$ "+precioOnline:""}  \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
            }
            separacionDiv1.appendChild(li);
        });

        botonCopiarFigus.addEventListener('click', async () => {
            try {
                console.log("st", stringDeFiguritas)
                await navigator.clipboard.writeText(stringDeFiguritas)
                console.log('¡Texto copiado al portapapeles con éxito!');
            } catch (error) {
                console.error('Error al copiar el texto: ', error);
            }
        })

        const totalFi = document.createElement('p');
        totalFi.textContent = `Cant figus en Stock: ${figusEnStock.length}`;
        separacionDiv2.appendChild(totalFi);

        const totalSi = document.createElement('p');
        totalSi.textContent = `Cant figus sin Stock: ${figusSinStock.length}`;
        separacionDiv2.appendChild(totalSi);


        const totalLi = document.createElement('p');
        totalLi.textContent = `Total Precio: $${totalPrecio}`;
        separacionDiv2.appendChild(totalLi);

        divPregunta.appendChild(separacionDiv1)
        divPregunta.appendChild(separacionDiv2)

        resultados.style.padding = '0px'

        const mensaje = document.createElement('h3');
        mensaje.style.margin = '30px'
        mensaje.style.whiteSpace = "pre-line";


        const textoRespuesta = preciosRespuesta(figusEnStock, figusSinStock, costoEnvioGratis, totalPrecio, figuListObj, canalPregunta)
        mensaje.textContent = textoRespuesta
        navigator.clipboard.writeText(mensaje.textContent)  // Usa .textContent para acceder al texto

        buttonPregunta.addEventListener('click', () => {
            buttonPregunta.style.backgroundColor = 'lightgreen'
            buttonVenta.style.backgroundColor = ''

            if (resultados.contains(divVenta)) {
                resultados.removeChild(divVenta)
            }
            if (!resultados.contains(divPregunta)) {
                resultados.appendChild(divPregunta)
                resultados.appendChild(mensaje)
            }

        })

        let divVenta = null
        let divNombreUsuarioVenta = null
        let entradaUsuario = null
        let divEnvio = null
        let divCuenta = null
        let divDescargarVenta = null
        let tipoCuenta;
        let tipoEnvio;

        buttonVenta.addEventListener('click', () => {
            buttonPregunta.style.backgroundColor = ''
            buttonVenta.style.backgroundColor = 'lightgreen'

            if (!divVenta) {
                divVenta = document.createElement('div');
            }

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
                }

                if (canalPregunta === "ONLINE") {
                    if (!divEnvio) {
                        divEnvio = document.createElement('div')
                        const botonCorreo = document.createElement('button')
                        const botonFlex = document.createElement('button')
                        botonCorreo.classList.add('boton')
                        botonFlex.classList.add('boton')
                        botonCorreo.textContent = 'Correo'
                        botonFlex.textContent = 'Flex'

                        botonCorreo.style.marginRight = '10px'
                        botonFlex.style.marginLeft = '10px'

                        divEnvio.style.display = 'flex'
                        divEnvio.style.justifyContent = 'center'
                        divEnvio.style.alignItems = 'center'
                        divEnvio.style.height = '100px'

                        divEnvio.appendChild(botonCorreo)
                        divEnvio.appendChild(botonFlex)
                        divVenta.appendChild(divEnvio)


                        botonCorreo.addEventListener('click', () => {
                            tipoEnvio = "CORREO"
                            botonCorreo.style.backgroundColor = 'lightgreen'
                            botonFlex.style.backgroundColor = ''
                            agregarCuenta()
                        }
                        )

                        botonFlex.addEventListener('click', () => {
                            tipoEnvio = "FLEX"
                            botonCorreo.style.backgroundColor = ''
                            botonFlex.style.backgroundColor = 'lightgreen'
                            agregarCuenta()
                        })
                    }

                    const agregarCuenta = () => {

                        if (divDescargarVenta) {
                            divVenta.removeChild(divDescargarVenta)
                            divDescargarVenta = null
                        }

                        if (divCuenta) {
                            divVenta.removeChild(divCuenta)
                            divCuenta = null
                            agregarCuenta()
                        } else {
                            divCuenta = document.createElement('div')
                            const botonKevin = document.createElement('button')
                            const botonMati = document.createElement('button')
                            botonKevin.classList.add('boton')
                            botonMati.classList.add('boton')
                            botonKevin.textContent = 'Kevin'
                            botonMati.textContent = 'Mati'

                            botonKevin.style.marginRight = '10px'
                            botonMati.style.marginLeft = '10px'

                            divCuenta.style.display = 'flex'
                            divCuenta.style.justifyContent = 'center'
                            divCuenta.style.alignItems = 'center'
                            divCuenta.style.height = '50px'

                            divCuenta.appendChild(botonKevin)
                            divCuenta.appendChild(botonMati)
                            divVenta.appendChild(divCuenta)

                            botonKevin.addEventListener('click', () => {
                                botonKevin.style.backgroundColor = 'lightgreen'
                                botonMati.style.backgroundColor = ''
                                tipoCuenta = "KEVIN"
                                crearBotonDescargar()
                            })
                            botonMati.addEventListener('click', () => {
                                botonMati.style.backgroundColor = 'lightgreen'
                                botonKevin.style.backgroundColor = ''
                                tipoCuenta = "MATI"
                                crearBotonDescargar()
                            })
                        }
                    }
                } else {

                    const agregarCuenta = () => {

                        if (divDescargarVenta) {
                            divVenta.removeChild(divDescargarVenta)
                            divDescargarVenta = null
                        }

                        if (divCuenta) {
                            divVenta.removeChild(divCuenta)
                            divCuenta = null
                            agregarCuenta()
                        } else {
                            divCuenta = document.createElement('div')
                            const botonLuly = document.createElement('button')
                            const botonAri = document.createElement('button')
                            botonLuly.classList.add('boton')
                            botonAri.classList.add('boton')
                            botonLuly.textContent = 'LULY'
                            botonAri.textContent = 'ARI'

                            botonLuly.style.marginRight = '10px'
                            botonAri.style.marginLeft = '10px'

                            divCuenta.style.display = 'flex'
                            divCuenta.style.justifyContent = 'center'
                            divCuenta.style.alignItems = 'center'
                            divCuenta.style.height = '50px'

                            divCuenta.appendChild(botonLuly)
                            divCuenta.appendChild(botonMati)
                            divVenta.appendChild(divCuenta)

                            botonLuly.addEventListener('click', () => {
                                botonLuly.style.backgroundColor = 'lightgreen'
                                botonAri.style.backgroundColor = ''
                                tipoCuenta = "LULY"
                                crearBotonDescargar()
                            })
                            botonAri.addEventListener('click', () => {
                                botonAri.style.backgroundColor = 'lightgreen'
                                botonLuly.style.backgroundColor = ''
                                tipoCuenta = "ARI"
                                crearBotonDescargar()
                            })
                        }
                    }
                }



                const crearBotonDescargar = async () => {

                    if (divDescargarVenta) {
                        divVenta.removeChild(divDescargarVenta)
                        divDescargarVenta = null
                        crearBotonDescargar()

                    } else {
                        divDescargarVenta = document.createElement('div')
                        divDescargarVenta.style.display = 'flex'
                        divDescargarVenta.style.justifyContent = 'center'
                        divDescargarVenta.style.alignItems = 'center'
                        divDescargarVenta.style.margin = '20px'
                        const descargarArchivos = document.createElement('button')
                        descargarArchivos.innerHTML = 'Confirmar'
                        descargarArchivos.style.backgroundColor = 'skyblue'
                        divDescargarVenta.appendChild(descargarArchivos)
                        divVenta.appendChild(divDescargarVenta)

                        descargarArchivos.addEventListener('click', async () => {
                            // const nombreUsuario = entradaUsuario.value
                            // if (!nombreUsuario){
                            //     alert("INGRESAR USUARIO")
                            // }else
                            for (const figu of albumFigus) {
                                for (const vend of figuList) {
                                    if (vend == figu.NUM)
                                        if (figu.STOCK.PDM.CANT > 0) {
                                            proveedor = "PDM"
                                            try {

                                                const response = await fetch(`${api}/${albumRuta}/decrementar/${proveedor}/${figu._id}`, {
                                                    method: "PATCH"
                                                });


                                                if (!response.ok) {
                                                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                                                }

                                                console.log(`${figu.NUM} Descontada del proveedor: ${proveedor}`)

                                                Toast.fire({
                                                    icon: 'success',
                                                    title: `BDD actualizada correctamente`
                                                })

                                                figu.STOCK[proveedor].CANT -= 1



                                            } catch (error) {
                                                Toast.fire({
                                                    icon: 'error',
                                                    title: 'Error al actualizar la BDD'
                                                });
                                            }


                                        } else if (figu.STOCK.MATI.CANT > 0) {
                                            proveedor = "MATI"
                                            try {

                                                const response = await fetch(`${api}/${albumRuta}/decrementar/${proveedor}/${figu._id}`, {
                                                    method: "PATCH"
                                                });


                                                if (!response.ok) {
                                                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                                                }

                                                console.log(`${figu.NUM} Descontada del proveedor: ${proveedor}`)

                                                Toast.fire({
                                                    icon: 'success',
                                                    title: `BDD actualizada correctamente`
                                                })

                                                figu.STOCK[proveedor].CANT -= 1



                                            } catch (error) {
                                                Toast.fire({
                                                    icon: 'error',
                                                    title: 'Error al actualizar la BDD'
                                                });
                                            }
                                        } else if (figu.STOCK.CAMBIOS.CANT > 0) {
                                            proveedor = "CAMBIOS"
                                            try {

                                                const response = await fetch(`${api}/${albumRuta}/decrementar/${proveedor}/${figu._id}`, {
                                                    method: "PATCH"
                                                });


                                                if (!response.ok) {
                                                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                                                }

                                                console.log(`${figu.NUM} Descontada del proveedor: ${proveedor}`)

                                                Toast.fire({
                                                    icon: 'success',
                                                    title: `BDD actualizada correctamente`
                                                })

                                                figu.STOCK[proveedor].CANT -= 1



                                            } catch (error) {
                                                Toast.fire({
                                                    icon: 'error',
                                                    title: 'Error al actualizar la BDD'
                                                });
                                            }
                                        } else if (figu.STOCK.OTROS.CANT > 0) {
                                            proveedor = "OTROS"
                                            try {

                                                const response = await fetch(`${api}/${albumRuta}/decrementar/${proveedor}/${figu._id}`, {
                                                    method: "PATCH"
                                                });


                                                if (!response.ok) {
                                                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                                                }

                                                console.log(`${figu.NUM} Descontada del proveedor: ${proveedor}`)

                                                Toast.fire({
                                                    icon: 'success',
                                                    title: `BDD actualizada correctamente`
                                                })

                                                figu.STOCK[proveedor].CANT -= 1


                                            } catch (error) {
                                                Toast.fire({
                                                    icon: 'error',
                                                    title: 'Error al actualizar la BDD'
                                                });
                                            }
                                        }
                                }
                            }

                            const datosJson = JSON.stringify(albumFigus, null, 2);
                            const blob = new Blob([datosJson], { type: 'application/json' });
                            const enlace = document.createElement('a');
                            enlace.href = URL.createObjectURL(blob);
                            enlace.download = `${nombreJson}.json`;
                            enlace.click();
                            // Liberar la URL del Blob
                            URL.revokeObjectURL(enlace.href);

                            const datosVenta = ({
                                DIA: new Date(),
                                VENDIDAS: figusEnStock,
                                FALTANTES: figusSinStock,
                                PRECIO: totalPrecio,
                                CUENTA: tipoCuenta,
                                ENVIO: tipoEnvio,
                                ALBUM: albumRuta
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

                        })
                    }
                }
            }
        })        

    } else {
        const errorEscritura = document.createElement('p');
        errorEscritura.innerHTML = `${valorInput.length > 0 ? `Error de escritura.<br> Posible error: ${error}` : 'Ingrese figuritas'}`;
        errorEscritura.classList.add('clientFigu')
        resultados.appendChild(errorEscritura);
    }
};