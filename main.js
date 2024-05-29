
let filePath='./baseMundial.json';
const tipoAlbum = (tipo, event) => {
    return new Promise((resolve, reject) => {
        filePath = `./${tipo}.json`;
        console.log(filePath);

        document.querySelectorAll('.bloqueAlbum').forEach(button => {
            button.classList.remove('pressed');
        });

        event.target.classList.add('pressed');

        cargarFigus().then(() => {
            resolve(); // Resuelve la promesa después de que cargarFigus() haya completado su ejecución
        }).catch(error => {
            reject(error); // Rechaza la promesa si hay algún error en cargarFigus()
        });
    });
};



// Función para cargar las figus iniciales y filtrarlas dinámicamente
const cargarFigus = () => {
    return fetch(filePath)
        .then(response => response.json())
        .then(figus => {
            // Almacenar todas las figus
            window.todasLasFigus = figus;
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            throw error; // Propaga el error para que se maneje en la cadena de promesas
        });
};


const sinStock = () =>{
    let figus = window.todasLasFigus
    let cant=0

    const resultSinStock = document.getElementById('resultadosSinStock');
    resultSinStock.innerHTML = ''; // Limpiar resultados anteriores
    let figuritas0=[];
    let figus0str='';
    let figuritas1=[];
    let figus1str='';
    let figuritas2=[];
    let figus2str='';

    figus.forEach(figu => {
        if (figu["CANT"]==0){
            figuritas0.push(figu["NUM"])
            cant+=1
        }else if(figu["CANT"]==1){
            figuritas1.push(figu["NUM"])
        }else if(figu["CANT"]==2){
            figuritas2.push(figu["NUM"])
        }
    })

    figuritas0.sort()
    figuritas1.sort()
    figuritas2.sort()

    let primero = '' 
    let segundo = '' 
    let paiss = [] 

    figuritas0.forEach(figu => { 
        if (paiss.length === 0) { 
            paiss.push(figu.substring(0, 3)); 
        } if (!paiss.includes(figu.substring(0, 3))) { 
            paiss.push(figu.substring(0, 3)) 
        } }) 

    for (let x = 0; x < paiss.length; x++) { 
        primero = '' 
        segundo = '' 
        figuritas0.forEach(figu => { 
            if (paiss[x] === figu.substring(0, 3)) { 
                if (figu.length === 4) { 
                    primero += figu + ', ' 
                } else { 
                    segundo += figu + ', ' 
                } 
            } 
        }) 
        figus0str += primero + segundo 
    } 

    figuritas1.forEach(figu =>{
        figus1str+=figu+=', ';
    })

    figuritas2.forEach(figu =>{
        figus2str+=figu+=', ';
    })

    const p1 = document.createElement('p');
    const s0h3 = document.createElement('h3');
    p1.textContent = figus0str.slice(0, -2);
    s0h3.textContent = `Sin Stock: ( ${cant} )`
    resultSinStock.appendChild(s0h3);
    resultSinStock.appendChild(p1);

    const p2 = document.createElement('p');
    const s1h3 = document.createElement('h3');
    p2.textContent = figus1str.slice(0, -2);
    s1h3.textContent = '1 en Stock: '
    resultSinStock.appendChild(s1h3);
    resultSinStock.appendChild(p2);

    const p3 = document.createElement('p');
    const s2h3 = document.createElement('h3');
    p3.textContent = figus2str.slice(0, -2);
    s2h3.textContent = '2 en Stock: '
    resultSinStock.appendChild(s2h3);
    resultSinStock.appendChild(p3);
}

const figusSinStock = (tipo, event) => {
    tipoAlbum(tipo, event)
        .then(() => {
            sinStock(); // Llama a sinStock() después de que tipoAlbum() haya completado su ejecución
        });
};

const ultimaActualizacion = () => {
    var spanUltimaActualizacion = document.getElementById('ultimaActualizacion');
    let filePath='./baseMundial.json';

    fetch(filePath)
        .then(response => response.json())
        .then(figus => {
            // Almacenar todas las figus
            window.figusdelmundial = figus;
            
            // Actualizar el contenido del span después de obtener los datos            
            const horaFigu = window.figusdelmundial.find(figu =>
                figu["NUM"]=='FWC0'
            )
            console.log(window.figusdelmundial)
            console.log(horaFigu["DIA"],horaFigu["ACTUALIZACION"])
            spanUltimaActualizacion.textContent = horaFigu["DIA"]+' '+horaFigu["ACTUALIZACION"];
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            throw error; // Propaga el error para que se maneje en la cadena de promesas
        });
    
    
    
};

ultimaActualizacion()



// Función para buscar y mostrar las figus filtradas
const buscarFigus = () => {
    let valorInput = document.getElementById('entrada').value.toUpperCase();
    
    // console.log(valorInput)
    let figuritas =''
    let pais = ''
    let num= ''
    let caracterAnt =''
    let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let numeros = '1234567890'

    valorInput = valorInput.replace("INTR", "INT");
    valorInput = valorInput.replace(/y/gi, '')
    
    for (let i = 0; i < valorInput.length; i++) {
        if (letras.includes(valorInput[i])){
            if (pais.length<3){
                pais += valorInput[i] 
            }else{
                pais=''
                pais += valorInput[i]
            }
                       
        }
        if (numeros.includes(valorInput[i])){
            num=valorInput[i]
            if (numeros.includes(caracterAnt)){
                figuritas+=num
            }else{
                if (figuritas.length==0){
                    figuritas+=pais+num
                }else{
                    figuritas+=' '+pais+num
                }
                
            }                        
        }
        caracterAnt = valorInput[i]
    }
    console.log(figuritas)

    // const sacarEspacio = valorInput.replace(/\s+(\d)/g, '$1');
    
    const figusSeleccionadas = figuritas.split(/[,\s-]+/).map(figu => figu.trim());

    console.log(figusSeleccionadas)

    // Filtrar las figus seleccionadas
    const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas.includes(figu.NUM));

    console.log(filteredFigus)

    let cantFigusStock =0;
    let cantFigusSinStock =0;
    let cantFigusConsult=0;
    let totalPrecio = 0;
    let faltantes ='';
    let figuInd='';
    let figuRemp='';

    filteredFigus.forEach(figu => {
        
        cantFigusConsult+=1;

        if (figu.CANT>0) {
            cantFigusStock+=1;
            totalPrecio += figu.PRECIO;
            if (figu.NUM.includes('INT')){
                figuRemp = figu.NUM.replace('INT','INTR')
                figuInd=figuRemp
            }else{
                figuInd=figu.NUM;
            }
        } else{
            cantFigusSinStock+=1
            if (figu.NUM.includes('INT')){
                figuRemp = figu.NUM.replace('INT','INTR')
                faltantes+=figuRemp+" ";
            }else{
                faltantes+=figu.NUM+" ";
            }            
        }
    });


    // Mostrar resultados en el HTML
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = ''; // Limpiar resultados anteriores

    const cantLi = document.createElement('p');
    cantLi.textContent = `Cantidad figus contadas en la pregunta: ${cantFigusConsult}`;
    resultados.appendChild(cantLi);


    filteredFigus.forEach(figu => {
        const li = document.createElement('li');
        li.textContent = `${figu.NUM}${figu.NUM.length===5 ? ':\u00A0' : '\u00A0\u00A0:\u00A0'} $${figu.PRECIO.toString().length===3 ? `${figu.PRECIO}\u00A0\u00A0\u00A0` : `${figu.PRECIO.toString().length===4 ? `${figu.PRECIO}\u00A0\u00A0` : figu.PRECIO}`} | Stock: ${figu.CANT.toString().length==1 ? `${figu.CANT}\u00A0\u00A0` : figu.CANT} | ${figu.NOMBRE}` ;
        resultados.appendChild(li);
    });

    const totalFi = document.createElement('p');
    totalFi.textContent = `Cant figus en Stock: ${cantFigusStock}`;
    resultados.appendChild(totalFi);

    const totalSi = document.createElement('p');
    totalSi.textContent = `Cant figus sin Stock: ${cantFigusSinStock}`;
    resultados.appendChild(totalSi);

    

    const totalLi = document.createElement('p');
    totalLi.textContent = `Total Precio: $${totalPrecio}`;
    resultados.appendChild(totalLi);

    

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