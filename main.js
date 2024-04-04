
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

    let cantFigus =0;
    let totalPrecio = 0;
    let faltantes ='';
    let figuInd='';
    filteredFigus.forEach(figu => {
        if (figu.CANT>0) {
            cantFigus+=1;
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
        li.textContent = `${figu.NUM} : ${figu.CANT} - $${figu.PRECIO}`;
        resultados.appendChild(li);
    });

    const totalLi = document.createElement('h2');
    totalLi.textContent = `Total Precio: ${totalPrecio}`;
    resultados.appendChild(totalLi);

    const totalFi = document.createElement('h2');
    totalFi.textContent = `Figus en Stock: ${cantFigus}`;
    resultados.appendChild(totalFi);

    const mensaje = document.createElement('h3');
    if (faltantes.length == 0){
        if (cantFigus==1){
            if (totalPrecio<3000){
                mensaje.textContent = `Si, la tengo en stock. El precio por la figurita original es 3000. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }else{
                mensaje.textContent = `Si, la tengo en stock. El precio por la figurita original es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }
            
        } else{
            mensaje.textContent = `Si, las tengo en stock. El precio por las ${cantFigus} figuritas originales es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
        }
        
    } else {
        if (cantFigus==1){
            mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por ${figuInd} es 3000. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
        }else{
            if (totalPrecio<3000){
                mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por las ${cantFigus} figuritas originales es 3000. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }else{
                mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por las ${cantFigus} figuritas originales es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }
            
        }
        
    }
    
    resultados.appendChild(mensaje);
};


// Cargar las figus iniciales al cargar la página

cargarFigus();