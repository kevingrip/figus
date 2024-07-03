
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

const totalVentas = () =>{
    var totalVentasElement = document.getElementById('totalVentas');
    let filePath='./totalVentas.json';
    
    
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            // Almacenar todas las figus
            
            // console.log(data)
            // console.log(actualizacion[0],actualizacion[0])
            // console.log(data)

            const ventasDiv = document.createElement('div');
            const cantidadFlex = document.createElement('h3');
            const cantidadCorreo = document.createElement('h3');
            const cantidadAcordar = document.createElement('h3');

            let cantFlex= 0
            let cantCorreo= 0
            let cantAcordar= 0

            for (let album in data){
                eleccionAlbum = data[album]
                
                const EnviosFiltered = eleccionAlbum.filter(prep => prep.PREPARADO ==="NO")
                
                EnviosFiltered.forEach(filtered=>{
                    if (filtered.Envio === "FLEX") {
                        cantFlex++;
                    } else if (filtered.Envio === "CORREO") {
                        cantCorreo++;
                    } else {
                        // Si hay otros tipos de envío, puedes manejarlos aquí si es necesario
                        cantAcordar++;
                    }
                });
                }

            cantidadFlex.textContent=`Cantidad Flex: ${cantFlex}`
            ventasDiv.appendChild(cantidadFlex)
            cantidadCorreo.textContent=`Cantidad Correo: ${cantCorreo}`
            ventasDiv.appendChild(cantidadCorreo)
            cantidadAcordar.textContent=`Cantidad Acordar: ${cantAcordar}`
            ventasDiv.appendChild(cantidadAcordar)
            
            ventasDiv.style.color='purple'

            totalVentasElement.appendChild(ventasDiv);

            for (let album in data){
                // console.log(album)
            
                eleccionAlbum = data[album]
                
                const noPrep = eleccionAlbum.filter(prep =>prep.PREPARADO ==="NO")

                // console.log(noPrep)

                noPrep.forEach(objeto => {
                    let count = 0
                    // Crear un elemento div para cada objeto
                    
                    const objetoDiv = document.createElement('div');

                    
                    const nombreAlbum = document.createElement('h2');
                    const nombreUsuario = document.createElement('h3');
                    const dia = document.createElement('h5');
                    const nombreCuenta = document.createElement('p');
                    const figusVendidas = document.createElement('p');
                    const figusNoVendidas = document.createElement('p');
                    const tipoEnvio = document.createElement('h4');
                    const cantidad = document.createElement('p')
                    const button = document.createElement('button');

                    nombreAlbum.textContent = album
                    
                    nombreUsuario.textContent = `USUARIO:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${objeto["usuario"]}`             
                    nombreCuenta.textContent = `MercadoLibre: ${objeto["Cuenta"]}`
                    dia.textContent = `${objeto["Dia"]}`
                    let figuVend = objeto["Vendidas"].toString()
                    let figuNoVend = objeto["NoVendidas"].toString()
                    const figuCont = objeto["Vendidas"]

                    figuCont.forEach(()=>{count = count+1})
                    cantidad.textContent = `Cantidad vendida: ${count}`
                    
                    // console.log(figuVend)
                    let figuVenTab = figuVend.replace(/,/g,"\u00A0\u00A0\u00A0\u00A0")
                    figusVendidas.textContent = `${figuVenTab}`
                    figusNoVendidas.textContent = `${figuNoVend}`
                    figusNoVendidas.style.color = 'red'

                    if (objeto["usuario"].includes('BOSCAROLNOELIA')||objeto["usuario"].includes('DANILOJAVIERBROGLIA')||objeto["usuario"].includes('ADELA')){
                        objetoDiv.style.backgroundColor='skyblue'
                    }
                    
                    if (objeto["Envio"]==='FLEX'){
                        tipoEnvio.textContent = `ENVIOS FLEX`
                        tipoEnvio.style.color = '#39ff14'
                        tipoEnvio.style.fontSize  = '20px'
                        tipoEnvio.style.fontStyle = 'italic';
                        tipoEnvio.style.maxWidth = '150px';
                        tipoEnvio.style.border = '2px solid black';
                        tipoEnvio.style.borderRadius = '5px'
                        tipoEnvio.style.display = 'flex';
                        tipoEnvio.style.justifyContent = 'center';

                        cantFlex+=1
                    }else if (objeto["Envio"]==='CORREO'){
                        tipoEnvio.textContent = `${objeto["Envio"]}`
                        tipoEnvio.style.color = 'orange'
                        tipoEnvio.style.fontSize  = '20px'
                    }else {
                        tipoEnvio.textContent = `${objeto["Envio"]}`
                        tipoEnvio.style.color = 'blue'
                        tipoEnvio.style.fontSize  = '20px'
                    }

                    nombreAlbum.style.height = '25px' 
                    nombreAlbum.style.display = 'flex';
                    nombreAlbum.style.alignItems = 'center' 
                    nombreAlbum.style.padding = '10px' 

                    if (album==='Copa America 2024'){
                        nombreAlbum.style.backgroundColor = 'skyblue' 
                        objetoDiv.style.border = '3px solid skyblue'   
                    }else if (album==='Mundial Qatar 2022'){
                        nombreAlbum.style.backgroundColor = 'orangered'  
                        objetoDiv.style.border = '3px solid orangered'  
                    }else if (album==='Futbol Argentino 2023'){
                        nombreAlbum.style.backgroundColor = '#d72bde' 
                        objetoDiv.style.border = '3px solid #d72bde'  

                    }else if (album==='Copa Libertadores 2023'){
                        nombreAlbum.style.backgroundColor = 'gold' 
                        objetoDiv.style.border = '3px solid gold'  

                    }

                    figusVendidas.style.border = '1px solid lightgrey' 
                    figusVendidas.style.padding = '10px'
                    
                    

                    objetoDiv.appendChild(nombreAlbum);
                    objetoDiv.appendChild(nombreUsuario);
                    objetoDiv.appendChild(cantidad);
                    objetoDiv.appendChild(figusVendidas);
                    objetoDiv.appendChild(figusNoVendidas);
                    objetoDiv.appendChild(nombreCuenta);
                    objetoDiv.appendChild(tipoEnvio);
                    objetoDiv.appendChild(dia);
                    objetoDiv.appendChild(button)
                    
                    button.textContent="ARMADO"

                    figusVendidas.style.maxWidth = '90%';
                    figusVendidas.style.minHeight = '20px';
                    figusVendidas.style.wordWrap = 'break-word';
                    objetoDiv.style.margin = '5px'
                    objetoDiv.style.padding = '15px'                    


                    
                    // Agregar el elemento div al contenedor totalVentasElement
                    totalVentasElement.appendChild(objetoDiv);
                    
                    button.addEventListener('click', () => {
                        if (objetoDiv.style.backgroundColor === 'red'){
                            objetoDiv.style.backgroundColor = 'white'                                                
                        }else{
                            objetoDiv.style.backgroundColor = 'red';
                            nombreUsuario.style.backgroundColor = 'white';
                            nombreAlbum.style.backgroundColor = 'red'    
                        }                    
                    });

                    
                    
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            throw error; // Propaga el error para que se maneje en la cadena de promesas
        });
}

totalVentas()

const ultimaActualizacion = () => {
    var spanUltimaActualizacion = document.getElementById('ultimaActualizacion');
    var userUpdate = document.getElementById('userUpdate')
    let filePath='./actualizado.json';

    fetch(filePath)
        .then(response => response.json())
        .then(item => {
            // Almacenar todas las figus
            
            console.log(item)
            
            // console.log(actualizacion[0],actualizacion[0])
            spanUltimaActualizacion.textContent = item["DIA"]+' a las '+item["ACTUALIZACION"];
            userUpdate.textContent = item["USUARIO"]
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

    valorInput = valorInput.replace(/INTR/g, "INT");
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
    let tipoFigu = ''

    filteredFigus.forEach(figu => {
        
        cantFigusConsult+=1;

        if (figu.CANT>0) {
            cantFigusStock+=1;
            tipoFigu = figu.TIPO
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
        const p = document.createElement('p')
        li.textContent = `${figu.NUM}${figu.NUM.length===5 ? ':\u00A0' : '\u00A0\u00A0:\u00A0'} $${figu.PRECIO.toString().length===3 ? `${figu.PRECIO}\u00A0\u00A0\u00A0` : `${figu.PRECIO.toString().length===4 ? `${figu.PRECIO}\u00A0\u00A0` : figu.PRECIO}`} | Stock: ${figu.CANT.toString().length==1 ? `${figu.CANT}\u00A0\u00A0` : figu.CANT}` ;
        p.textContent = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${figu.NOMBRE}`
        resultados.appendChild(li);
        resultados.appendChild(p);
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
            if (totalPrecio<3500){
                if (tipoFigu!='ESCUDO'){
                    mensaje.textContent = `Si, la tengo en stock. El precio por la figurita original es 3900. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                } else {
                    mensaje.textContent = `Si, la tengo en stock. El precio por la figurita original es 5000. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                }
            }else{
                mensaje.textContent = `Si, la tengo en stock. El precio por la figurita original es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }
            
        } else if (totalPrecio>22999){
            mensaje.textContent = `Si, en este momento cuento con todas en stock y te damos el envio gratis por un total de ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra !!`
        }
        else{
            if (totalPrecio/cantFigusStock === 850){
                if (cantFigusStock<=3){
                    mensaje.textContent = `Si, las tengo en stock. El precio por las ${cantFigusStock} figuritas originales es ${cantFigusStock*2100}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                }else{
                    mensaje.textContent = `Si, las tengo en stock. El precio por las ${cantFigusStock} figuritas originales es ${cantFigusStock*1100}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                }
                
            }else{
                if (totalPrecio<3000){
                    mensaje.textContent = `Si, las tengo en stock. El precio por las ${cantFigusStock} figuritas originales es ${totalPrecio*2}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                }else if (totalPrecio<4000){
                    mensaje.textContent = `Si, las tengo en stock. El precio por las ${cantFigusStock} figuritas originales es ${totalPrecio+1500}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                }else{
                    mensaje.textContent = `Si, las tengo en stock. El precio por las ${cantFigusStock} figuritas originales es ${totalPrecio+2000}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
                }
                
            }
            
        }
    } else {
        if (cantFigusStock==1){
            if (totalPrecio<3000){
                mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por ${figuInd} es 3700. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }else{
                mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por ${figuInd} es ${totalPrecio}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
            }
            
        }else{
            if (cantFigusStock==0){
                mensaje.textContent = `No la tengo en stock en este momento. Podes consultarme nuevamente en unos dias para ver si ingresó. Saludos!`
            }else{
            
                if (totalPrecio<3500){
                    mensaje.textContent = `Las tengo excepto ${faltantes}. El precio por las ${cantFigusStock} figuritas originales es ${cantFigusStock*1200}. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra. Saludos!`
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