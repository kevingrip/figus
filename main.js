
let filePath;
const tipoAlbum = (tipo) => {
    
    if (tipo === null) {
        filePath = './baseMundial.json';
        console.log(filePath);
    } else {
        filePath = `./${tipo}.json`; // Remove single quotes around template literal
        console.log(filePath);
    }
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
    filteredFigus.forEach(figu => {
        if (figu.CANT>0) {
            cantFigus+=1;
            totalPrecio += figu.PRECIO;
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
    totalFi.textContent = `Cant Figus: ${cantFigus}`;
    resultados.appendChild(totalFi);

    const mensaje = document.createElement('h3');
    mensaje.textContent = `Las tengo excepto ${faltantes}`
    resultados.appendChild(mensaje);
};


// Cargar las figus iniciales al cargar la página

