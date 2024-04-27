
let filePath='./baseMundial.json';
const tipoAlbum = (tipo,event) => {
    
    filePath = `./${tipo}.json`; // Remove single quotes around template literal
    console.log(filePath);

    document.querySelectorAll('.bloqueAlbum').forEach(button => {
        button.classList.remove('pressed');
    });

    event.target.classList.add('pressed');
    
    cargarFigus();

};


// Función para cargar las figus iniciales y filtrarlas dinámicamente
const cargarFigus = () => {
    fetch(filePath)
        .then(response => response.json())
        .then(figus => {
            // Almacenar todas las figus
            window.todasLasFigus = figus;
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
};

const tipoClase = () =>{

}


// Función para buscar y mostrar las figus filtradas
const buscarFigus = () => {
    const valorInput = document.getElementById('entrada').value.toUpperCase();
    
    console.log(valorInput)

    const sacarEspacio = valorInput.replace(/\s+(\d)/g, '$1');
    
    const figusSeleccionadas = sacarEspacio.split(/[,\s-]+/).map(figu => figu.trim());

    console.log(figusSeleccionadas)

    // Filtrar las figus seleccionadas
    const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas.includes(figu.NUM));

    console.log(filteredFigus)

    let cantFigusStock =0;
    let cantFigusConsult=0;
    let totalPrecio = 0;
    let faltantes ='';
    let figuInd='';
    filteredFigus.forEach(figu => {
        cantFigusConsult+=1;
        if (figu.CANT>0) {
            cantFigusStock+=1;
            totalPrecio += figu.PRECIO;
            figuInd=figu.NUM;
        } else{
            faltantes+=figu.NUM+" ";
        }
    });

    // Mostrar resultados en el HTML
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = ''; // Limpiar resultados anteriores
    filteredFigus.forEach(figu => {
        const li = document.createElement('li');
        li.textContent = `${figu.NUM} => ${figu.CANT} - $${figu.PRECIO}`;
        resultados.appendChild(li);
    });

    const cantLi = document.createElement('p');
    cantLi.textContent = `Cantidad figus contadas: ${cantFigusConsult}`;
    resultados.appendChild(cantLi);

    const totalLi = document.createElement('p');
    totalLi.textContent = `Total Precio: $${totalPrecio}`;
    resultados.appendChild(totalLi);

    const totalFi = document.createElement('p');
    totalFi.textContent = `Figus en Stock: ${cantFigusStock}`;
    resultados.appendChild(totalFi);

    const mensaje = document.createElement('h3');
    if (faltantes.length == 0){
        if (cantFigusStock==1){            
            if (totalPrecio<3000){
                mensaje.textContent = `Si, la tengo en stock. El precio por la figurita original es 3000. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }else{
                mensaje.textContent = `Si, la tengo en stock. El precio por la figurita original es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }
            
        } else if (totalPrecio>22999){
            mensaje.textContent = `Si, la tengo en stock. El precio por la figurita original es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra con Envio Gratis!!`
        }
        else{
            mensaje.textContent = `Si, las tengo en stock. El precio por las ${cantFigusStock} figuritas originales es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
        }
    } else {
        if (cantFigusStock==1){
            if (totalPrecio<3000){
                mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por ${figuInd} es 3000. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }else{
                mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por ${figuInd} es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }
            
        }else{
            if (cantFigusStock==0){
                mensaje.textContent = `No la tengo en stock en este momento. Podes consultarme nuevamente en unos dias para ver si ingresó. Saludos!`
            }else{
            
                if (totalPrecio<3000){
                    mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por las ${cantFigusStock} figuritas originales es 3000. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                }else if (totalPrecio>22999){
                    mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por las ${cantFigusStock} figuritas originales es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra con Envio Gratis!!`
                }else{
                        mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por las ${cantFigusStock} figuritas originales es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                }
            }
        }
        
    }
    
    resultados.appendChild(mensaje);
};


// Cargar las figus iniciales al cargar la página

cargarFigus();