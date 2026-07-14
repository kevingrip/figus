//import modeloVenta from "../modelo_mdb/modeloVenta";

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
    valorInput = valorInput.replace(/AUSTRALIA|AUT|AUST|AUTRALIA/g, "AUS");
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


const formatearEntrada = () => {

    let valorInput = document.getElementById('entrada').value.toUpperCase();

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

export const buscarFigus = (nombreJson, albumFigus, albumRuta) => {

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

    const figusEntrada = formatearEntrada()

    // Filtrar las figus seleccionadas
    const figusEncontradasEnLaBase = albumFigus.filter(figu => figusEntrada.includes(figu.NUM));

    let errorEscritura = false;
    let error = "";

    figusEntrada.forEach(figuNum => {
        // Buscar si la figura está en el array de figuras encontradas
        const figu = figusEncontradasEnLaBase.find(fig => fig.NUM === figuNum);

        // Si no está en el array, se muestra un mensaje en consola
        if (!figu) {
            errorEscritura = true;
            error += figuNum + " ";
        }
    });

    console.log(figusEncontradasEnLaBase)

    let cantFigusStock = 0;
    let cantFigusSinStock = 0;
    let cantFigusConsult = 0;
    let totalPrecio = 0;
    let faltantes = '';
    let enStock = '';
    let figuInd = '';
    let figuRemp = '';
    let tipoFigu = ''
    let figuList = []
    let figusEnStock = []
    let figusSinStock = []

    let costoEnvioGratis = 33000

    figusEncontradasEnLaBase.forEach(figu => {

        cantFigusConsult += 1;

        if (figu.CANT > 0) {
            cantFigusStock += 1;
            tipoFigu = figu.TIPO
            totalPrecio += figu.PRECIO;

            if (figu.NUM.includes('INT')) {
                figuRemp = figu.NUM.replace('INT', 'INTR')
                figuInd = figuRemp
                enStock += figuInd + " "
            } else {
                figuInd = figu.NUM;
                enStock += figu.NUM + " "
            }


        } else {
            cantFigusSinStock += 1
            if (figu.NUM.includes('INT')) {
                figuRemp = figu.NUM.replace('INT', 'INTR')
                faltantes += figuRemp + " ";
            } else {
                faltantes += figu.NUM + " ";
            }
        }
    });

    faltantes = faltantes.substring(0, (faltantes.length) - 1)


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
        cantLi.textContent = `Cantidad figus contadas en la pregunta: ${cantFigusConsult}`;
        separacionDiv2.appendChild(cantLi);

        figusEncontradasEnLaBase.forEach(figu => {
            stringDeFiguritas += figu.NUM + " "
            figuList.push(figu.NUM)

            const li = document.createElement('li');
            li.classList.add('listaClass')

            if (figu.CANT == 0) {
                li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length == 1 ? `${figu.CANT}` + '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length == 3 ? figu.PRECIO + '&nbsp;' : figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
                li.style.color = 'red'
            } else {
                li.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length == 1 ? `${figu.CANT}` + '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length == 3 ? figu.PRECIO + '&nbsp;' : figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
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
        totalFi.textContent = `Cant figus en Stock: ${cantFigusStock}`;
        separacionDiv2.appendChild(totalFi);

        const totalSi = document.createElement('p');
        totalSi.textContent = `Cant figus sin Stock: ${cantFigusSinStock}`;
        separacionDiv2.appendChild(totalSi);


        const totalLi = document.createElement('p');
        totalLi.textContent = `Total Precio: $${totalPrecio}`;
        separacionDiv2.appendChild(totalLi);

        divPregunta.appendChild(separacionDiv1)
        divPregunta.appendChild(separacionDiv2)

        resultados.style.padding = '0px'

        const confirmacion = '. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra'

        const singPluPre = (cant) => {

            return `El precio por ${cant == 1 ? 'la figurita' : `las ${cant} figuritas originales es `}`
        }

        const singPluPri = (cant) => {

            return `Hola! Si, ${cant == 1 ? 'la' : 'las'} tengo en stock.`
        }


        const faltanText = (falta) => {
            return `Hola! Las tengo excepto ${falta}. `
        }

        const mensaje = document.createElement('h3');
        mensaje.style.margin = '30px'
        if (faltantes.length == 0) {
            if (cantFigusStock == 1) {
                if (totalPrecio < 3500) {
                    if (tipoFigu == 'ESCUDO') {
                        mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es 5000${confirmacion}`
                    } else if (totalPrecio == 850 || totalPrecio == 750) {
                        mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es 3900${confirmacion}`
                    } else {
                        mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es 4500${confirmacion}`
                    }
                } else {
                    mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es ${totalPrecio}${confirmacion}`
                }

            } else if (totalPrecio >= costoEnvioGratis) {
                mensaje.textContent = `Hola! Si, en este momento cuento con todas en stock y te damos el envio gratis por un total de ${totalPrecio}${confirmacion}`
            }
            else {
                mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} ${(totalPrecio / cantFigusStock === 850) ? (cantFigusStock <= 3 ? cantFigusStock * 2100 : (3 * 2100 + (1000 * (cantFigusStock - 3)))) : (totalPrecio < 3000 ? totalPrecio * 2 : totalPrecio < 10000 ? totalPrecio + 1500 : totalPrecio <= 25500 ? totalPrecio + 3000 : totalPrecio)} ${confirmacion}`
            }
        } else {
            if (cantFigusStock == 1) {
                mensaje.textContent = `${faltanText(faltantes)}${singPluPre(cantFigusStock)} ${figuInd} es ${totalPrecio == 850 ? 3700 : totalPrecio < 3500 ? 4000 : totalPrecio}${confirmacion}`
            } else {
                if (cantFigusStock == 0) {
                    mensaje.textContent = `Hola! No las tengo en stock`
                } else {
                    mensaje.textContent = `${faltanText(faltantes)}${singPluPre(cantFigusStock)} ${totalPrecio < 6000 ? ((cantFigusStock * 1200) + 1700) : totalPrecio < ((cantFigusStock + 1) * 1000) && totalPrecio < costoEnvioGratis ? totalPrecio + 2000 : totalPrecio}${confirmacion}${totalPrecio >= costoEnvioGratis ? ' con Envio Gratis!!' : '. Saludos!'}`
                }
            }

        }



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

        buttonVenta.addEventListener('click', () => {
            buttonPregunta.style.backgroundColor = ''
            buttonVenta.style.backgroundColor = 'lightgreen'

            if (!divVenta) {
                divVenta = document.createElement('div');
            }

            if (cantFigusSinStock > 0 && cantFigusStock == 0) {

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

                // if (!divNombreUsuarioVenta){
                //     divNombreUsuarioVenta = document.createElement('div')
                //     divNombreUsuarioVenta.style.display='flex'
                //     divNombreUsuarioVenta.style.justifyContent='center'
                //     divNombreUsuarioVenta.style.alignItems='center'
                //     entradaUsuario = document.createElement('input')
                //     entradaUsuario.placeholder='Ingrese nombre usuario'
                //     entradaUsuario.style.margin='20px'
                //     entradaUsuario.classList.add('usuarioVenta')
                //     divNombreUsuarioVenta.appendChild(entradaUsuario)
                //     divVenta.appendChild(divNombreUsuarioVenta)                
                // }

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



                let tipoEnvio;
                let tipoCuenta;

                let divCuenta = null
                let divDescargarVenta = null

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
                        descargarArchivos.innerHTML = 'Actualizar'
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
                                        if (figu.CANT > 0) {
                                            try {

                                                await fetch(`http://localhost:5050/${albumRuta}/decrementar/${figu._id}`, {
                                                    method: "PATCH"
                                                });

                                                Toast.fire({
                                                    icon: 'success',
                                                    title: `BDD actualizada correctamente`
                                                })


                                            } catch (error) {
                                                console.error('Error al actualizar base de MongoDB:', error);
                                                throw error;
                                            }

                                            figu.CANT -= 1
                                            figusEnStock.push(figu.NUM)
                                        } else {
                                            figusSinStock.push(figu.NUM)
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
                                await fetch("http://localhost:5050/ventas", {
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


        //navigator.clipboard.writeText(mensaje.textContent)  // Usa .textContent para acceder al texto

    } else {
        const errorEscritura = document.createElement('p');
        errorEscritura.innerHTML = `${valorInput.length > 0 ? `Error de escritura.<br> Posible error: ${error}` : 'Ingrese figuritas'}`;
        errorEscritura.classList.add('clientFigu')
        resultados.appendChild(errorEscritura);
    }
};