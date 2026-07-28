import { precioBarato } from "./preciosBaratos.js";

const mostrarCuadroResumen = (elementResumenTotal, figusEnStock, figusSinStock, totalPrecio) => {
    const elementCantPreguntas = document.createElement('p');
    const elementCantStock = document.createElement('p');
    const elementCantSinStock = document.createElement('p');
    const elementTotalPrecio = document.createElement('p');

    elementCantPreguntas.textContent = `Cantidad figus contadas en la pregunta: ${figusEnStock.length + figusSinStock.length}`;
    elementCantStock.textContent = `Cant figus en Stock: ${figusEnStock.length}`;
    elementCantSinStock.textContent = `Cant figus sin Stock: ${figusSinStock.length}`;
    elementTotalPrecio.textContent = `Total Precio: $${totalPrecio}`;

    elementResumenTotal.appendChild(elementCantPreguntas);
    elementResumenTotal.appendChild(elementCantStock);
    elementResumenTotal.appendChild(elementCantSinStock);
    elementResumenTotal.appendChild(elementTotalPrecio);
}

const imprimirFilas = (cant_stock, figu, filaFigurita, canalPregunta) => {
    let prioridadProveedores;
    if (canalPregunta === "ONLINE") {
        prioridadProveedores = ["PDM", "MATI", "CAMBIOS", "OTROS", "LULY"]
    } else if (canalPregunta === "LULY") {
        prioridadProveedores = ["LULY", "PDM", "MATI", "CAMBIOS", "OTROS"]
    } else if (canalPregunta === "ARI") {
        prioridadProveedores = ["PDM", "MATI", "LULY", "CAMBIOS", "OTROS"]
    }

    const proveedorEnStock = prioridadProveedores.find(proveedor =>
        figu.STOCK[proveedor]?.CANT > 0
    )



    if (canalPregunta === "LULY") {
        let precio = proveedorEnStock === "LULY" ? precioBarato(figu.TIPO) - 300 : (proveedorEnStock === "MATI" ? precioBarato(figu.TIPO) : figu.STOCK[proveedorEnStock]?.PRECIO)
        if (cant_stock == 0) {
            filaFigurita.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${cant_stock} \u00A0\u00A0\u00A0 ${figu.TIPO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
            filaFigurita.style.color = 'red'
        } else {
            filaFigurita.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${cant_stock}  \u00A0\u00A0\u00A0 ${figu.TIPO} \u00A0\u00A0\u00A0 ${figu.NOMBRE} \u00A0\u00A0\u00A0 $${precio} \u00A0\u00A0\u00A0 Proveedor ${proveedorEnStock}`;
        }
    } else if (canalPregunta === "ONLINE"){
        let precio = proveedorEnStock === "PDM" ? figu.STOCK["PDM"].PRECIO : figu.STOCK["MATI"].PRECIO
        if (cant_stock == 0) {
            filaFigurita.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${cant_stock} \u00A0\u00A0\u00A0 ${figu.TIPO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
            filaFigurita.style.color = 'red'
        } else {
            filaFigurita.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${cant_stock}  \u00A0\u00A0\u00A0 ${figu.TIPO} \u00A0\u00A0\u00A0 ${figu.NOMBRE} \u00A0\u00A0\u00A0 $${precio} \u00A0\u00A0\u00A0 Proveedor ${proveedorEnStock}`;
        }
    } else if (canalPregunta === "ARI"){
        // agregar que si el proveedor es pdm sea mas caro
        let precio = proveedorEnStock === "LULY" ? precioBarato(figu.TIPO) + 300 : (proveedorEnStock === "MATI" ? precioBarato(figu.TIPO) : figu.STOCK[proveedorEnStock]?.PRECIO)
        if (cant_stock == 0) {
            filaFigurita.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${cant_stock} \u00A0\u00A0\u00A0 ${figu.TIPO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}`;
            filaFigurita.style.color = 'red'
        } else {
            filaFigurita.innerHTML = `${figu.NUM.length == 5 ? figu.NUM : figu.NUM + '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${cant_stock}  \u00A0\u00A0\u00A0 ${figu.TIPO} \u00A0\u00A0\u00A0 ${figu.NOMBRE} \u00A0\u00A0\u00A0 $${precio} \u00A0\u00A0\u00A0 Proveedor ${proveedorEnStock}`;
        }
    }

}

const mostrarFiguritasFilas = (figusDeLaConsulta, elementResumenListaFigu, canalPregunta) => {


    figusDeLaConsulta.forEach(figu => {

        const filaFigurita = document.createElement('li');
        filaFigurita.classList.add('listaClass')

        let cant_stock = Object.values(figu.STOCK).reduce((total, proveedor) => total + (proveedor.CANT ?? 0), 0)

        imprimirFilas(cant_stock, figu, filaFigurita, canalPregunta)

        elementResumenListaFigu.appendChild(filaFigurita);
    });

}

const mostrarRespuesta = (figusEnStock, figusFaltantes, costoEnvioGratis, precioTotal, canalPregunta) => {

    let figuNUMstock = figusEnStock.map(figu => figu.NUM).join(", ")

    let tercera = ""
    let segunda = `El precio por ${figusEnStock.length == 1 ? 'la figurita original es $' : `las ${figusEnStock.length} figuritas originales es `}${precioTotal}`
    let primera = `Hola! Si, ${figusEnStock.length == 1 ? 'la' : 'las'} tengo en stock. \n`
    let primera2 = `Hola! Las tengo excepto ${figusFaltantes}. \n`
    let primera3 = `Hola! De tu lista tengo ${figuNUMstock}. \n`

    if (canalPregunta == "ONLINE") {
        tercera = `. \nConfirmame si te sirve y actualizo el precio de esta publicación para tu compra${precioTotal >= costoEnvioGratis ? ` con Envio Gratis!!` : `. Saludos!`}`
    }

    console.log(figusEnStock.length)
    if (figusEnStock.length == 0) {
        let singPlu = figusFaltantes.length > 1 ? "las" : "la"
        return {
            textoRespuesta: `Hola! No ${singPlu} tengo en stock. Saludos`,
            precioFinal: 0
        }
    }
    else {
        if (figusFaltantes.length == 0) {
            return {
                textoRespuesta: primera + segunda + tercera,
                precioFinal: precioTotal
            }
        } else {
            if (figusFaltantes.length >= figusEnStock.length) {
                return {
                    textoRespuesta: primera3 + segunda + tercera,
                    precioFinal: precioTotal
                }
            } else {
                return {
                    textoRespuesta: primera2 + segunda + tercera,
                    precioFinal: precioTotal
                }
            }
        }
    }
}

export const elementoPregunta = ({ elementos, datos }) => {

    let { resultados,
        contenedorPreguntaOVenta,
        buttonPregunta,
        buttonVenta } = elementos

    let { figusEnStock,
        figusSinStock,
        totalPrecio,
        figusDeLaConsulta,
        costoEnvioGratis,
        canalPregunta } = datos

    const elementResumenListaFigu = document.createElement('div');
    const elementResumenTotal = document.createElement('div');
    let divPregunta = null

    elementResumenListaFigu.classList.add = ('inptDiv')
    elementResumenTotal.classList.add('inptDiv')

    resultados.appendChild(contenedorPreguntaOVenta)

    setTimeout(() => {
        buttonPregunta.click();
    }, 0);

    //elementPregunta()

    divPregunta = document.createElement('div')
    divPregunta.classList.add('inptCuadro')

    const botonCopiarFigus = document.createElement('button')
    botonCopiarFigus.textContent = 'Copiar Figus'

    mostrarFiguritasFilas(figusDeLaConsulta, elementResumenListaFigu, canalPregunta)
    mostrarCuadroResumen(elementResumenTotal, figusEnStock, figusSinStock, totalPrecio)


    botonCopiarFigus.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(figusEnStock.map(figu => figu.NUM).join("\n "))
            console.log('¡Texto copiado al portapapeles con éxito!');
        } catch (error) {
            console.error('Error al copiar el texto: ', error);
        }
    })

    resultados.style.padding = '0px'

    const mensaje = document.createElement('h3');
    mensaje.style.margin = '30px'
    mensaje.style.whiteSpace = "pre-line";
    const { textoRespuesta, precioFinal } = mostrarRespuesta(figusEnStock, figusSinStock, costoEnvioGratis, totalPrecio, canalPregunta)
    mensaje.textContent = textoRespuesta

    buttonPregunta.addEventListener('click', () => {

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(mensaje.textContent)  // Usa .textContent para acceder al texto
        }

        buttonPregunta.style.backgroundColor = 'lightgreen'
        buttonVenta.style.backgroundColor = ''

        elementResumenTotal.appendChild(botonCopiarFigus)
        divPregunta.appendChild(elementResumenListaFigu)
        divPregunta.appendChild(elementResumenTotal)

        resultados.appendChild(divPregunta)
        resultados.appendChild(mensaje)
    })
    return { mensaje, precioFinal, elementResumenListaFigu }

}