
let filePath='./base_copam.json';
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

const cargarVentas = () => {
    return fetch('./totalVentas.json')
        .then(response => response.json())
        .then(ventas => {
            
            window.todasLasVentas = ventas            
                        
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            throw error; // Propaga el error para que se maneje en la cadena de promesas
        });
};

cargarVentas().then(() => {
    totalVentas();
    buscarFigus();
});



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

const totalVentas = () =>{
    const totalVentasElement = document.getElementById('totalVentas');
    let filePath='./totalVentas.json';    

    
    console.log(window.todasLasVentas)
    
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            
            const ventasDiv = document.createElement('div');
            const cantidadFlex = document.createElement('h3');
            const cantidadCorreo = document.createElement('h3');
            const cantidadAcordar = document.createElement('h3');

            let cantFlex= 0
            let cantCorreo= 0
            let cantAcordar= 0

            for (let album in data){
                eleccionAlbum = data[album]
                
                const EnviosFiltered = eleccionAlbum.filter(prep => prep.ARMADO ==="NO")
                
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
                
                const noPrep = eleccionAlbum.filter(prep =>prep.ARMADO ==="NO")

                // console.log(noPrep)

                noPrep.forEach(objeto => {
                    let count = 0
                    // Crear un elemento div para cada objeto
                    
                    const pantallaVenta = document.createElement('div');

                    
                    const nombreAlbum = document.createElement('h2');
                    const nombreUsuario = document.createElement('h3');
                    const fecha = document.createElement('h5');
                    const nombreCuenta = document.createElement('p');
                    const figusVendidas = document.createElement('div');
                    const fVendidas1 = document.createElement('p');
                    const fVendidas2 = document.createElement('p');
                    const figusNoVendidas = document.createElement('p');
                    const tipoEnvio = document.createElement('h4');
                    const cantidad = document.createElement('p')

                    nombreAlbum.textContent = album
                    
                    nombreUsuario.textContent = `USUARIO:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${objeto["usuario"]}`             
                    nombreCuenta.textContent = `MercadoLibre: ${objeto["Cuenta"]}`
                    fecha.textContent = `${objeto["Dia"]}`
                    let figuNoVend = objeto["NoVendidas"].toString()
                    const figuCont = objeto["Vendidas"]

                    figuCont.forEach(()=>{count = count+1})
                    cantidad.textContent = `Cantidad vendida: ${count}`
                    
                    // console.log(figuVend)
                    //let figuVenTab = figuVend.replace(/,/g,"\u00A0\u00A0\u00A0\u00A0")
                    //let figuVenTab = figuVend.replace(/,/g,"<br>")
                    let ant;
                    let cont=0;
                    let result="";
                    let result2="";
                    let fila=0;
                    let cantPaises=0;
                    let contFil=0;

                    objeto["Vendidas"].forEach(figu=>{
                        if (figu.substring(0,3)!=ant){
                            cantPaises++;
                        }
                        ant=figu.substring(0,3)
                    }
                )

                    objeto["Vendidas"].forEach(figu=>{
                        

                            if (cont==0){

                                ant=figu.substring(0,3)    
                                if (figu.substring(0,3)=="INT"){
                                    result+=figu.substring(0,3)+": "+figu.substring(3,5)
                                }else{
                                    result+=figu.substring(0,3)+" : "+figu.substring(3,5)
                                }                      
                                

                            }else{

                                if (figu.substring(0,3)!=ant){

                                    if (fila<(cantPaises/2)-1 || fila<9){
                                        result+="<br>"+figu.substring(0,3)+" :\u00A0"+figu.substring(3,5);
                                    }else{
                                        if (contFil==0){
                                            result2+=figu.substring(0,3)+" :\u00A0"+figu.substring(3,5);
                                            contFil++;
                                        }else{
                                            result2+="<br>"+figu.substring(0,3)+" :\u00A0"+figu.substring(3,5);
                                        }
                                        
                                    }
                                    
                                    fila++;                                    
                                }else{

                                    if (fila<(cantPaises/2) || fila<10){
                                        result+=", "+figu.substring(3,5);       
                                    }else{
                                        result2+=", "+figu.substring(3,5);       
                                    }
                                                                 
                                    
                                }
                            }
                                               
                        
                        ant=figu.substring(0,3)
                        cont++
                    })

                    result = result.replace("INT","INTR")

                    figusVendidas.classList.add('fVendidas')

                    if (result2.length>0){
                        fVendidas1.classList.add('fVendidas1')
                        fVendidas2.classList.add('fVendidas2')
                    }
                    

                    fVendidas1.innerHTML = `${result}`
                    fVendidas2.innerHTML = `${result2}`
                    figusVendidas.appendChild(fVendidas1)
                    figusVendidas.appendChild(fVendidas2)
                    figusNoVendidas.textContent = figuNoVend.length>0?`Sin Stock : ${figuNoVend}`:'';
                    figusNoVendidas.style.color = 'red'

                    const buttonArmado = document.createElement('button')
                    buttonArmado.innerHTML='ARMADO'

                    buttonArmado.addEventListener('click',()=>{                        
                        if (objeto["PREARMADO"]==="NO"){
                            objeto["PREARMADO"]="SI"
                            objeto["ARMADO"]="SI"
                            pantallaVenta.style.backgroundColor='#58d68d'
                        }else{
                            objeto["PREARMADO"]="NO"
                            objeto["ARMADO"]="NO"
                            pantallaVenta.style.backgroundColor=''
                        }
                    })


                    
                    
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
                        tipoEnvio.style.color = '#e5d100'
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
                        pantallaVenta.style.border = '3px solid skyblue'   
                    }else if (album==='Mundial Qatar 2022'){
                        nombreAlbum.style.backgroundColor = 'orange'  
                        pantallaVenta.style.border = '3px solid orange'  
                    }else if (album==='Futbol Argentino 2023'){
                        nombreAlbum.style.backgroundColor = '#d72bde' 
                        pantallaVenta.style.border = '3px solid #d72bde'  

                    }else if (album==='Copa Libertadores 2023'){
                        nombreAlbum.style.backgroundColor = 'gold' 
                        pantallaVenta.style.border = '3px solid gold'  

                    }else if (album==='Futbol Arg 2024'){
                        nombreAlbum.style.backgroundColor = 'green' 
                        pantallaVenta.style.border = '3px solid green' 
                        nombreAlbum.style.color='white'

                    }

                    figusVendidas.style.border = '1px solid lightgrey' 
                    figusVendidas.style.padding = '10px'
                    
                    

                    pantallaVenta.appendChild(nombreAlbum);
                    pantallaVenta.appendChild(nombreUsuario);
                    pantallaVenta.appendChild(figusVendidas);     
                    pantallaVenta.appendChild(cantidad);               
                    pantallaVenta.appendChild(tipoEnvio);
                    pantallaVenta.appendChild(fecha);
                    pantallaVenta.appendChild(figusNoVendidas);
                    pantallaVenta.appendChild(nombreCuenta);

                    
                    pantallaVenta.appendChild(buttonArmado);

                    
                    

                    figusVendidas.style.maxWidth = '90%';
                    figusVendidas.style.minHeight = '20px';
                    figusVendidas.style.wordWrap = 'break-word';
                    pantallaVenta.style.margin = '5px'
                    pantallaVenta.style.padding = '15px'                 

                    
                    
                    // Agregar el elemento div al contenedor totalVentasElement
                    
                    totalVentasElement.appendChild(pantallaVenta);      
                                                        
                });
                
            }
            const descargarActualizado = document.createElement('button')
            descargarActualizado.innerHTML='Descargar Actualizado'

            descargarActualizado.addEventListener('click',()=>{
                const datosJson = JSON.stringify(data, null, 2);
                const blob = new Blob([datosJson], { type: 'application/json' });
                const enlace = document.createElement('a');
                enlace.href = URL.createObjectURL(blob);
                enlace.download = `totalVentas.json`;
                enlace.click();
            })

            totalVentasElement.appendChild(descargarActualizado); 
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            throw error; // Propaga el error para que se maneje en la cadena de promesas
        });

}



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
const cosecharFigus = (tipo) => {

    const resultados = document.getElementById('resultados');
    resultados.innerHTML=''
    let figusSeleccionadas=""    


    const divDescargar = document.createElement('div')
    divDescargar.style.display='flex'
    divDescargar.style.justifyContent='center'
    divDescargar.style.margin='20px'

    const buttonDescargarBase = document.createElement('button')
    buttonDescargarBase.style.backgroundColor='skyblue'
    buttonDescargarBase.innerHTML='Descargar Base'    
    
    resultados.appendChild(buttonDescargarBase)
    divDescargar.appendChild(buttonDescargarBase)

    

    

    const intDiv = document.createElement('div');
    intDiv.style.display = 'flex'; // Alinea los botones "INT" en una sola línea
    intDiv.style.flexWrap = 'wrap'; // Permite que los botones "INT" se ajusten si son muchos
    resultados.appendChild(intDiv);

    const hciDiv = document.createElement('div');
    hciDiv.style.display = 'flex'; // Alinea los botones "INT" en una sola línea
    hciDiv.style.flexWrap = 'wrap'; // Permite que los botones "INT" se ajusten si son muchos
    resultados.appendChild(hciDiv);

    const legDiv = document.createElement('div');
    legDiv.style.display = 'flex'; // Alinea los botones "INT" en una sola línea
    legDiv.style.flexWrap = 'wrap'; // Permite que los botones "INT" se ajusten si son muchos
    resultados.appendChild(legDiv);
    
    const rohDiv = document.createElement('div');
    rohDiv.style.display = 'flex'; // Alinea los botones "INT" en una sola línea
    rohDiv.style.flexWrap = 'wrap'; // Permite que los botones "INT" se ajusten si son muchos
    resultados.appendChild(rohDiv);

    const argDiv = document.createElement('div');
    argDiv.style.display = 'flex'; // Alinea los botones "INT" en una sola línea
    argDiv.style.flexWrap = 'wrap'; // Permite que los botones "INT" se ajusten si son muchos
    resultados.appendChild(argDiv);
    

    window.todasLasFigus.forEach(figu=>{
        
        
        const createButton = document.createElement('button')
        createButton.style.width='65px'
        if (figu.NUM.includes('INT')){
            const createButton = document.createElement('button')
            createButton.style.width='65px'
            createButton.textContent=figu.NUM
            intDiv.appendChild(createButton);
            
            if (figu.CANT ==0){
                createButton.style.backgroundColor='red'
            }else if (figu.CANT ==1){
                createButton.style.backgroundColor='orange'
            }else if (figu.CANT >9){
                createButton.style.backgroundColor='lightgreen'
            }

            createButton.addEventListener('click',()=>{
                figusSeleccionadas=figu.NUM
                figu.CANT++
                const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas==(figu.NUM));
                //console.log(filteredFigus)

                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >9){
                    createButton.style.backgroundColor='lightgreen'
                }else{
                    createButton.style.backgroundColor='yellow'
                }
    
                filteredFigus.forEach(figu => {
                    const li = document.createElement('li');
                    li.classList.add('listaClass')
                    if (figu.CANT==0){                
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                        li.style.color='red'
                    }else{
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                    }            
                    resultados.appendChild(li);            
                });
            })     

            
        }else if (figu.NUM.includes('HCI')){
            const createButton = document.createElement('button')
            createButton.style.width='65px'
            createButton.textContent=figu.NUM
            hciDiv.appendChild(createButton);

            if (figu.CANT ==0){
                createButton.style.backgroundColor='red'
            }else if (figu.CANT ==1){
                createButton.style.backgroundColor='orange'
            }else if (figu.CANT >9){
                createButton.style.backgroundColor='lightgreen'
            }

            createButton.addEventListener('click',()=>{
                figusSeleccionadas=figu.NUM
                figu.CANT++
                const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas==(figu.NUM));
                //console.log(filteredFigus)

                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >9){
                    createButton.style.backgroundColor='lightgreen'
                }else{
                    createButton.style.backgroundColor='yellow'
                }
    
                filteredFigus.forEach(figu => {
                    const li = document.createElement('li');
                    li.classList.add('listaClass')
                    if (figu.CANT==0){                
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                        li.style.color='red'
                    }else{
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                    }            
                    resultados.appendChild(li);            
                });
            })    

        
        }else if (figu.NUM.includes('LEG')){
            const createButton = document.createElement('button')
            createButton.style.width='65px'
            createButton.textContent=figu.NUM
            legDiv.appendChild(createButton);

            if (figu.CANT ==0){
                createButton.style.backgroundColor='red'
            }else if (figu.CANT ==1){
                createButton.style.backgroundColor='orange'
            }else if (figu.CANT >9){
                createButton.style.backgroundColor='lightgreen'
            }

            createButton.addEventListener('click',()=>{
                figu.CANT++
                figusSeleccionadas=figu.NUM
                const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas==(figu.NUM));
                //console.log(filteredFigus)

                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >9){
                    createButton.style.backgroundColor='lightgreen'
                }else{
                    createButton.style.backgroundColor='yellow'
                }
    
                filteredFigus.forEach(figu => {
                    const li = document.createElement('li');
                    li.classList.add('listaClass')
                    if (figu.CANT==0){                
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                        li.style.color='red'
                    }else{
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                    }            
                    resultados.appendChild(li);            
                });
            })    

        
        }else if (figu.NUM.includes('LEG')){
            const createButton = document.createElement('button')
            createButton.style.width='65px'
            createButton.textContent=figu.NUM
            legDiv.appendChild(createButton);

            if (figu.CANT ==0){
                createButton.style.backgroundColor='red'
            }else if (figu.CANT ==1){
                createButton.style.backgroundColor='orange'
            }else if (figu.CANT >9){
                createButton.style.backgroundColor='lightgreen'
            }

            createButton.addEventListener('click',()=>{
                figu.CANT++
                figusSeleccionadas=figu.NUM
                const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas==(figu.NUM));
                //console.log(filteredFigus)

                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >9){
                    createButton.style.backgroundColor='lightgreen'
                }else{
                    createButton.style.backgroundColor='yellow'
                }
    
                filteredFigus.forEach(figu => {
                    const li = document.createElement('li');
                    li.classList.add('listaClass')
                    if (figu.CANT==0){                
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                        li.style.color='red'
                    }else{
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                    }            
                    resultados.appendChild(li);            
                });
            })    

        
        }else if (figu.NUM.includes('ROH')){
            const createButton = document.createElement('button')
            createButton.style.width='65px'
            createButton.textContent=figu.NUM
            rohDiv.appendChild(createButton);

            if (figu.CANT ==0){
                createButton.style.backgroundColor='red'
            }else if (figu.CANT ==1){
                createButton.style.backgroundColor='orange'
            }else if (figu.CANT >9){
                createButton.style.backgroundColor='lightgreen'
            }

            createButton.addEventListener('click',()=>{
                figu.CANT++
                figusSeleccionadas=figu.NUM
                const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas==(figu.NUM));
                //console.log(filteredFigus)

                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >9){
                    createButton.style.backgroundColor='lightgreen'
                }else{
                    createButton.style.backgroundColor='yellow'
                }
    
                filteredFigus.forEach(figu => {
                    const li = document.createElement('li');
                    li.classList.add('listaClass')
                    if (figu.CANT==0){                
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                        li.style.color='red'
                    }else{
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                    }            
                    resultados.appendChild(li);            
                });
            })    

            
        }else if (figu.NUM.includes('ARG')){
            const createButton = document.createElement('button')
            createButton.style.width='65px'
            createButton.textContent=figu.NUM
            argDiv.appendChild(createButton);

            if (figu.CANT ==0){
                createButton.style.backgroundColor='red'
            }else if (figu.CANT ==1){
                createButton.style.backgroundColor='orange'
            }else if (figu.CANT >14){
                createButton.style.backgroundColor='lightgreen'
            }

            createButton.addEventListener('click',()=>{
                figu.CANT++

                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >14){
                    createButton.style.backgroundColor='lightgreen'
                }
                figusSeleccionadas=figu.NUM
                const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas==(figu.NUM));
                //console.log(filteredFigus)
    
                filteredFigus.forEach(figu => {
                    const li = document.createElement('li');
                    li.classList.add('listaClass')
                    if (figu.CANT==0){                
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                        li.style.color='red'
                    }else{
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                    }            
                    resultados.appendChild(li);            
                });
            })    

        
        }else{
            createButton.textContent=figu.NUM
            //console.log(figu.NUM)

            if (figu.TIPO=='EQUIPO'){
                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >9){
                    createButton.style.backgroundColor='lightgreen'
                }
            }else{
                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >4){
                    createButton.style.backgroundColor='lightgreen'
                }
            }

            
            
            resultados.appendChild(createButton)
            createButton.addEventListener('click',()=>{
                
                figu.CANT++
                if (figu.CANT ==0){
                    createButton.style.backgroundColor='red'
                }else if (figu.CANT ==1){
                    createButton.style.backgroundColor='orange'
                }else if (figu.CANT >4){
                    createButton.style.backgroundColor='lightgreen'
                }else{
                    createButton.style.backgroundColor='yellow'
                }
                figusSeleccionadas=figu.NUM
                const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas==(figu.NUM));
                //console.log(filteredFigus)
    
                filteredFigus.forEach(figu => {
                    const li = document.createElement('li');
                    li.classList.add('listaClass')
                    if (figu.CANT==0){                
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                        li.style.color='red'
                    }else{
                        li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                    }            
                    resultados.appendChild(li);            
                });
                
            })     
            
        }           
        
    }) 
    
    resultados.appendChild(divDescargar)

  

    
    buttonDescargarBase.addEventListener('click',()=>{
                
                    const datosJson = JSON.stringify(window.todasLasFigus, null, 2);
                    const blob = new Blob([datosJson], { type: 'application/json' });
                    const enlace = document.createElement('a');
                    enlace.href = URL.createObjectURL(blob);
                    enlace.download = `${tipo}.json`;
                    enlace.click();

                    
                    URL.revokeObjectURL(enlace.href);
                }            
        )      
            
};


const buscarFigus = (tipo) => {
    let valorInput = document.getElementById('entrada').value.toUpperCase();
    
    // console.log(valorInput)
    let figuritas =''
    let pais = ''
    let num= ''
    let caracterAnt =''
    let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let numeros = '1234567890'

    valorInput = valorInput.replace(/INTRO|INTR/g, "INT");
    valorInput = valorInput.replace(/MEXICO|MEJICO|MXICO|MÉXICO|MX|MEXIVO|MÉX/g, "MEX");
    valorInput = valorInput.replace(/URUGUAYO|URUGUAY|URUGUAO|URUGUA|URGUA|URUG/g, "URU");
    valorInput = valorInput.replace(/ESTADOSUNIDOS|EEUU|EE.UU/g, "USA");
    valorInput = valorInput.replace(/BRASIL|BRAZIL/g, "BRA");
    valorInput = valorInput.replace(/CANADA|CANADÁ|CANAD|CANA|CAADA/g, "CAN");
    valorInput = valorInput.replace(/COSTA RICA|COSTARICA/g, "CRC");
    valorInput = valorInput.replace(/ARGENTINA|AFA|ARH/g, "ARG");
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


    // Filtrar las figus seleccionadas
    const filteredFigus = window.todasLasFigus.filter(figu => figusSeleccionadas.includes(figu.NUM));
    
    errorEscritura=false;
    let error="";

    figusSeleccionadas.forEach(figuNum => {
        // Buscar si la figura está en el array de figuras encontradas
        const figu = filteredFigus.find(fig => fig.NUM === figuNum);
        
        // Si no está en el array, se muestra un mensaje en consola
        if (!figu) {
            errorEscritura = true;
            error+=figuNum+" ";
        }
    });

    console.log(filteredFigus)

    let cantFigusStock =0;
    let cantFigusSinStock =0;
    let cantFigusConsult=0;
    let totalPrecio = 0;
    let faltantes ='';
    let figuInd='';
    let figuRemp='';
    let tipoFigu = ''
    let figuList = []
    let figusEnStock = []
    let figusSinStock = []

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

    faltantes=faltantes.substring(0,(faltantes.length)-1)


    // Mostrar resultados en el HTML
    const resultados = document.getElementById('resultados'); 

    const unionDiv = document.createElement('div');
    const separacionDiv1 = document.createElement('div');
    const separacionDiv2 = document.createElement('div');
    

    unionDiv.classList.add('inptCuadro')
    separacionDiv1.classList.add=('inptDiv')        
    separacionDiv2.classList.add('inptDiv')    
    
    resultados.innerHTML = ''; // Limpiar resultados anteriores

    const operacionDiv = document.createElement('div')
    const buttonPregunta = document.createElement('button')
    buttonPregunta.innerHTML='Pregunta'
    buttonPregunta.classList.add('boton')
    const buttonVenta = document.createElement('button')
    buttonVenta.innerHTML='Venta'
    buttonVenta.classList.add('boton')


    operacionDiv.appendChild(buttonPregunta)
    operacionDiv.appendChild(buttonVenta)
    operacionDiv.classList.add('centrar')
    operacionDiv.style.backgroundColor='#c44cf0dc'
    

    let divPregunta = null

    if (errorEscritura==false){

        resultados.appendChild(operacionDiv)

        setTimeout(() => {
            buttonPregunta.click();
        },0);
        
        divPregunta=document.createElement('div')
        divPregunta.classList.add('inptCuadro')

        let mostrarFiguLimp=""

        const buttonFiguLimp=document.createElement('button')
        buttonFiguLimp.textContent='Copiar Figus'
        separacionDiv2.appendChild(buttonFiguLimp)
        

        const cantLi = document.createElement('p');
        cantLi.textContent = `Cantidad figus contadas en la pregunta: ${cantFigusConsult}`;
        separacionDiv2.appendChild(cantLi);

        filteredFigus.forEach(figu => {
            mostrarFiguLimp+=figu.NUM+" "
            figuList.push(figu.NUM)
            const li = document.createElement('li');
            li.classList.add('listaClass')
            if (figu.CANT==0){                
                li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
                li.style.color='red'
            }else{
                li.innerHTML = `${figu.NUM.length==5?figu.NUM:figu.NUM+ '&nbsp;'} \u00A0\u00A0\u00A0 Stock ${figu.CANT.toString().length==1 ? `${figu.CANT}`+ '&nbsp;' : figu.CANT} \u00A0\u00A0\u00A0  $ ${figu.PRECIO.toString().length==3?figu.PRECIO+ '&nbsp;':figu.PRECIO} \u00A0\u00A0\u00A0 ${figu.NOMBRE}` ;
            }            
            separacionDiv1.appendChild(li);            
        });

        buttonFiguLimp.addEventListener('click', async ()=>{
            try{
                await navigator.clipboard.writeText(mostrarFiguLimp)
                console.log('¡Texto copiado al portapapeles con éxito!');
            }catch(error){
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

        resultados.style.padding='0px'
              
        

        let costoEnvioGratis=30000

        const confirmacion = '. Confirmame si te sirve y actualizo el precio de esta publicación para tu compra'

        const singPluPre = (cant) =>{

            return `El precio por ${cant==1?'la figurita':`las ${cant} figuritas originales es `}`
        }

        const singPluPri = (cant) =>{

            return `Hola! Si, ${cant==1?'la':'las'} tengo en stock.`
        }
        

        const faltanText = (falta) =>{
            return `Hola! Las tengo excepto ${falta}. `
        }        
    
        const mensaje = document.createElement('h3');
        mensaje.style.margin='30px'
        if (faltantes.length == 0){
            if (cantFigusStock==1){
                if (totalPrecio<3500){
                    if (tipoFigu=='ESCUDO'){
                        mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es 5000${confirmacion}`                        
                    } else if (totalPrecio==850 || totalPrecio==750){
                        mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es 3900${confirmacion}`
                    } else{
                        mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es 4500${confirmacion}`
                    }
                }else{
                    mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es ${totalPrecio}${confirmacion}`
                }
                
            } else if (totalPrecio>=costoEnvioGratis){
                mensaje.textContent = `Hola! Si, en este momento cuento con todas en stock y te damos el envio gratis por un total de ${totalPrecio}${confirmacion}`
            }
            else{                                 
                mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} ${(totalPrecio/cantFigusStock === 850)?(cantFigusStock <=3 ? cantFigusStock*2100 : (3*2100+(1000*(cantFigusStock-3)))):(totalPrecio<3000?totalPrecio*2:totalPrecio<10000?totalPrecio+1500:totalPrecio<=25500?totalPrecio+3000:totalPrecio)} ${confirmacion}`
            }
        } else {
            if (cantFigusStock==1){                
                mensaje.textContent = `${faltanText(faltantes)}${singPluPre(cantFigusStock)} ${figuInd} es ${totalPrecio==850?3700:totalPrecio<3500?4000:totalPrecio}${confirmacion}`
            }else{
                if (cantFigusStock==0){
                    mensaje.textContent = `Hola! No la tengo en stock en este momento. Podes consultarme nuevamente en unos dias para ver si ingresó. Saludos!`
                }else{
                    mensaje.textContent = `${faltanText(faltantes)}${singPluPre(cantFigusStock)} ${totalPrecio<6000?((cantFigusStock*1200)+1700):totalPrecio<((cantFigusStock+1)*1000) && totalPrecio<costoEnvioGratis ? totalPrecio+2000 : totalPrecio}${confirmacion}${totalPrecio>=costoEnvioGratis?' con Envio Gratis!!':'. Saludos!'}`
                }
            }
            
        }      
        

        
        buttonPregunta.addEventListener('click',()=>{
            buttonPregunta.style.backgroundColor='lightgreen'
            buttonVenta.style.backgroundColor=''

            if (resultados.contains(divVenta)){
                resultados.removeChild(divVenta)
            }
            if(!resultados.contains(divPregunta)){
                resultados.appendChild(divPregunta)
                resultados.appendChild(mensaje)
            }
            
        })


        let divVenta = null
        let divNombreUsuarioVenta = null
        let entradaUsuario = null
        let divEnvio = null

        buttonVenta.addEventListener('click',()=>{
            buttonPregunta.style.backgroundColor=''
            buttonVenta.style.backgroundColor='lightgreen'

            if (!divVenta) {
                divVenta = document.createElement('div');
            }

            if(cantFigusSinStock>0 && cantFigusStock==0){

                const errorVenta = document.createElement('h4')
                errorVenta.textContent='No se puede realizar la venta porque la figurita no esta en stock'
                resultados.removeChild(divPregunta) 
                resultados.removeChild(mensaje)
                divVenta.appendChild(errorVenta)
                divVenta.style.display='flex'
                divVenta.style.justifyContent='center'
                divVenta.style.color='red'
                resultados.appendChild(divVenta)

            }else{                
    
                if (resultados.contains(divPregunta)){
                    resultados.removeChild(divPregunta) 
                    resultados.removeChild(mensaje)
                }
                if(!resultados.contains(divVenta)){
                    resultados.appendChild(divVenta)
                }
    
                if (!divNombreUsuarioVenta){
                    divNombreUsuarioVenta = document.createElement('div')
                    divNombreUsuarioVenta.style.display='flex'
                    divNombreUsuarioVenta.style.justifyContent='center'
                    divNombreUsuarioVenta.style.alignItems='center'
                    entradaUsuario = document.createElement('input')
                    entradaUsuario.placeholder='Ingrese nombre usuario'
                    entradaUsuario.style.margin='20px'
                    entradaUsuario.classList.add('usuarioVenta')
                    divNombreUsuarioVenta.appendChild(entradaUsuario)
                    divVenta.appendChild(divNombreUsuarioVenta)                
                }
    
                if (!divEnvio){
                    divEnvio = document.createElement('div')
                    const botonCorreo = document.createElement('button')
                    const botonFlex = document.createElement('button')
                    botonCorreo.classList.add('boton')
                    botonFlex.classList.add('boton')
                    botonCorreo.textContent='Correo'
                    botonFlex.textContent='Flex'
    
                    botonCorreo.style.marginRight='10px'
                    botonFlex.style.marginLeft='10px'
    
                    divEnvio.style.display='flex'
                    divEnvio.style.justifyContent='center'
                    divEnvio.style.alignItems='center'
                    divEnvio.style.height='50px'
    
                    divEnvio.appendChild(botonCorreo)
                    divEnvio.appendChild(botonFlex)
                    divVenta.appendChild(divEnvio)
                    
    
                    botonCorreo.addEventListener('click',()=>{
                        tipoEnvio = "CORREO"
                        botonCorreo.style.backgroundColor='lightgreen'
                        botonFlex.style.backgroundColor=''
                        agregarCuenta()
                        }                    
                    )
        
                    botonFlex.addEventListener('click',()=>{
                        tipoEnvio = "FLEX"
                        botonCorreo.style.backgroundColor=''
                        botonFlex.style.backgroundColor='lightgreen'
                        agregarCuenta()
                        }
                    )
                }
                
                
    
                let tipoEnvio;
                let tipoCuenta;
    
                let divCuenta = null
                let divDescargarVenta=null
    
                const agregarCuenta = () =>{
    
                    if(divDescargarVenta){
                        divVenta.removeChild(divDescargarVenta)
                        divDescargarVenta=null
                    }
                    
                    if(divCuenta){
                        divVenta.removeChild(divCuenta)
                       divCuenta=null
                       agregarCuenta()
                    }else{
                        divCuenta = document.createElement('div')
                        const botonKevin = document.createElement('button')
                        const botonMati = document.createElement('button')
                        botonKevin.classList.add('boton')
                        botonMati.classList.add('boton')
                        botonKevin.textContent='Kevin'
                        botonMati.textContent='Mati'
                
                        botonKevin.style.marginRight='10px'
                        botonMati.style.marginLeft='10px'
                
                        divCuenta.style.display='flex'
                        divCuenta.style.justifyContent='center'
                        divCuenta.style.alignItems='center'
                        divCuenta.style.height='50px'
                
                        divCuenta.appendChild(botonKevin)
                        divCuenta.appendChild(botonMati)
                        divVenta.appendChild(divCuenta)
    
                        botonKevin.addEventListener('click',()=>{
                            botonKevin.style.backgroundColor='lightgreen'
                            botonMati.style.backgroundColor=''
                            tipoCuenta="KEVIN"
                            crearBotonDescargar()
                        })
                        botonMati.addEventListener('click',()=>{
                            botonMati.style.backgroundColor='lightgreen'
                            botonKevin.style.backgroundColor=''
                            tipoCuenta="MATI"
                            crearBotonDescargar()
                        })
                    }
                        
                }           
    
                const crearBotonDescargar = () => {
    
                    if(divDescargarVenta){
                        divVenta.removeChild(divDescargarVenta)
                        divDescargarVenta=null
                        crearBotonDescargar()
    
                    }else{
                        divDescargarVenta = document.createElement('div')
                        divDescargarVenta.style.display='flex'
                        divDescargarVenta.style.justifyContent='center'
                        divDescargarVenta.style.alignItems='center'
                        divDescargarVenta.style.margin='20px'
                        const descargarArchivos = document.createElement('button')
                        descargarArchivos.innerHTML='Descargar'
                        descargarArchivos.style.backgroundColor='skyblue'
                        divDescargarVenta.appendChild(descargarArchivos)
                        divVenta.appendChild(divDescargarVenta)
    
                        descargarArchivos.addEventListener('click',()=>{
                            const nombreUsuario = entradaUsuario.value
                            if (!nombreUsuario){
                                alert("INGRESAR USUARIO")
                            }else{
                                window.todasLasFigus.forEach(figu =>{
                                    figuList.forEach(vend =>{
                                        if (vend == figu.NUM)
                                            if (figu.CANT>0){
                                                figu.CANT-=1
                                                figusEnStock.push(figu.NUM)
                                            }else{
                                                figusSinStock.push(figu.NUM)
                                            }
                                    })                        
                                })
                                const datosJson = JSON.stringify(window.todasLasFigus, null, 2);
                                const blob = new Blob([datosJson], { type: 'application/json' });
                                const enlace = document.createElement('a');
                                enlace.href = URL.createObjectURL(blob);
                                enlace.download = `${tipo}.json`;
                                enlace.click();                            
                                                    
                                const agregarVenta = {
                                    usuario: nombreUsuario,
                                    Vendidas: figusEnStock,
                                    NoVendidas: figusSinStock,
                                    Dia: new Date().toLocaleDateString('es-ES'),
                                    Cuenta: tipoCuenta,
                                    Envio: tipoEnvio,
                                    ARMADO: "NO",
                                    PREARMADO: "NO"
                                }
    
                                window.todasLasVentas[albumName(tipo)].push(agregarVenta);
    
                                const ventasJson = JSON.stringify(window.todasLasVentas, null, 2);
                                const blob2 = new Blob([ventasJson], { type: 'application/json' });
                                const enlace2 = document.createElement('a');
                                enlace2.href = URL.createObjectURL(blob2);
                                enlace2.download = `totalVentas.json`;
                                enlace2.click();
    
                                const actualizarUltimaActualizacion = {
                                    "DIA": new Date().toLocaleDateString('es-ES'),
                                    "ACTUALIZACION": new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                                    "USUARIO": nombreUsuario
                                }
    
                                const ultimaActualizacionJson = JSON.stringify(actualizarUltimaActualizacion, null, 2);
                                const blob3 = new Blob([ultimaActualizacionJson], { type: 'application/json' });
                                const enlace3 = document.createElement('a');
                                enlace3.href = URL.createObjectURL(blob3);
                                enlace3.download = `actualizado.json`;
                                enlace3.click();
    
                                // Liberar la URL del Blob
                                URL.revokeObjectURL(enlace.href);
                            }
                        }
                    )
                        }                
                }   
            }

                        
            
        })
        
        
        navigator.clipboard.writeText(mensaje.textContent)  // Usa .textContent para acceder al texto

    }else{
        const errorEscritura = document.createElement('p');
        errorEscritura.innerHTML = `${valorInput.length>0 ? `Error de escritura. Presta atencion loro.<br> Posible error: ${error}` : 'Ingrese figuritas' }`;
        errorEscritura.classList.add('clientFigu')
        resultados.appendChild(errorEscritura);
    }   
};


const buscarCliente = () => {
    let valorInput = document.getElementById('entrada').value.toUpperCase();    

    const mostrarEnHtml = document.getElementById('figuUsers');
    mostrarEnHtml.innerHTML = ''; // Limpiar resultados anteriores
    existeUsuario=false;
    
    fetch(filePath)
        .then(response => response.json())
        .then(data => {

            Object.keys(data).forEach(llave=>{
                data[llave].forEach(usuario =>{
                    if (usuario.usuario==valorInput){
                        existeUsuario=true;
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
            
                
            if  (existeUsuario==false){
                
                const figuUsuario = document.createElement('p');
                figuUsuario.classList.add('clientFigu')
                figuUsuario.innerHTML = `No se encuentra el usuario`;
                mostrarEnHtml.appendChild(figuUsuario);
            }      
        })    
}

const noVendidas = (tipo) => {
    
    const noVendidasHtml = document.getElementById('noVendidas');
    let filePath='./totalVentas.json';

    noVendidasHtml.innerHTML=''
    
    fetch(filePath)
        .then(response => response.json())
        .then(data => {

            const pantalla = document.createElement('div')
            

                totalFigus = data[albumName(tipo)]

                const nombreAlbum = document.createElement('h2')
                nombreAlbum.innerHTML=albumName(tipo)

                pantalla.appendChild(nombreAlbum)

                const armadoFiltrado = totalFigus.filter(item => item.ARMADO ==="SI" && item.NoVendidas.length>0 && convertirFecha(item.Dia)>fecha2meses)

                armadoFiltrado.forEach(item=>{
                    const user = document.createElement('h3')
                    const cuenta = document.createElement('h5')
                    const figu = document.createElement('p')
                    const fecha = document.createElement('h5')

                    user.innerHTML=item.usuario
                    cuenta.innerHTML=`Cuenta: ${item.Cuenta}`
                    
                    let figuNoVendida=[]

                    window.todasLasFigus.forEach(figu=>{
                        item.NoVendidas.forEach(num=>{
                            if (num==(figu.NUM)){
                                figuNoVendida.push({NUM:figu.NUM,CANT:figu.CANT})                                 
                            } 
                        })
                    })

                    

                    figuNoVendida.forEach(obj =>{
                        if (obj.CANT==0){
                            figu.innerHTML+= `<span style="background-color: red; color:white; padding:5px; border:1px solid #000">${obj.NUM} </span>`
                        }else if (obj.CANT==1){
                            figu.innerHTML+= `<span style="color: white; background-color:orange; padding:5px; border:1px solid #000">${obj.NUM} </span>`
                        }
                        else if (obj.CANT>=5){
                            figu.innerHTML+= `<span style="color: white;background-color:green; padding:5px; border:1px solid #000">${obj.NUM} </span>`
                        }else{
                            figu.innerHTML+= `<span style="color: white;background-color:skyblue; padding:5px; border:1px solid #000">${obj.NUM} </span>`
                        }
                    })        
                    
                    const buttonText = document.createElement('button')
                    buttonText.innerHTML='Copiar'                    

                    fecha.innerHTML=item.Dia

                    const marcoPantallita = document.createElement('div')

                    marcoPantallita.appendChild(user)
                    marcoPantallita.appendChild(fecha)
                    marcoPantallita.appendChild(figu)    
                    marcoPantallita.appendChild(cuenta)
                    marcoPantallita.appendChild(buttonText)               
                    
                    buttonText.addEventListener('click',()=>{
                        buttonText.style.backgroundColor='pink'
                        const figus = figuNoVendida.map(figu => figu.NUM).join(", ");
                        navigator.clipboard.writeText(`Hola! Te queria avisar que tenemos stock en ${figus}, por si aun le interesa. Saludos!`)
                    })

                    marcoPantallita.style.border = '1px solid lightgrey' 
                    marcoPantallita.style.padding = '15px'
                    
                    pantalla.appendChild(marcoPantallita)
                    

                })                
            
            
            pantalla.style.margin = '5px'
            pantalla.style.padding = '15px'
            pantalla.classList.add('fVendidas1')
            noVendidasHtml.appendChild(pantalla)

        }
    )
}

const albumFigu = (tipo, event,pag) => {
    tipoAlbum(tipo, event)
    .then(() => {
        if (pag =="album150"){
            armarAlbumFigus();
        }
        else if (pag =="buscarUsuario"){
            buscarCliente(); 
        }
        else if (pag =="buscarFigus"){
            buscarFigus(tipo); 
        }
        else if (pag=='sinStock'){
            sinStock();
        }else if (pag=='cosecharFigus'){
            cosecharFigus(tipo);
        }
        else if (pag=='noVendidas'){
            noVendidas(tipo);
        }
    });
};

const armarAlbumFigus = () =>{
    const mostrarEnHtml = document.getElementById('figuUsers');
    mostrarEnHtml.innerHTML = ''; // Limpiar resultados anteriores

    const cantComunesAlbum = 130

    fetch(filePath)
        .then(response => response.json())
        .then(data => {            

            const cantComunesOk = document.createElement('h4')
            const comunesAlbum = document.createElement('p')            
            const tituloAlbum = document.createElement('h3')
            comunesAlbum.innerHTML='Comunes: <br>'
            let figusAlbum = [];
            let cantComunes = 0
            let cantComunesMayor1=0
            

            data.forEach(figu=>{
                    if (figu.CANT>2 && figu.TIPO=="COMUNES" && cantComunes<cantComunesAlbum && !figusAlbum.includes(figu.NUM)){
                        figusAlbum.push(figu["NUM"])
                        comunesAlbum.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `
                        cantComunes++
                        cantComunesMayor1++
                    }                   
                }
            )
            data.forEach(figu=>{
                    if (figu.CANT==2 && figu.TIPO=="COMUNES" && cantComunes<cantComunesAlbum && !figusAlbum.includes(figu.NUM)){
                        figusAlbum.push(figu["NUM"])
                        comunesAlbum.innerHTML+=`<span style="color: #e5d100;">${figu.NUM}</span> `
                        cantComunes++
                        cantComunesMayor1++
                    }
                }
            )

            let cantComunesX1=[]
            let randomsX1 = []
            data.forEach(figu=>{
                    if (figu.CANT==1 && figu.TIPO=="COMUNES"){
                        cantComunesX1.push(figu.NUM)
                    }
                }
            )

            cantComunesX1.forEach(figu=>{
                    if (cantComunes<cantComunesAlbum && !figusAlbum.includes(figu.NUM)){
                        let randomInt = Math.floor(Math.random() * cantComunesX1.length);
                        
                        while (randomsX1.includes(randomInt)){
                            randomInt = Math.floor(Math.random() * cantComunesX1.length);                         
                        }
                        randomsX1.push(randomInt)
                        figusAlbum.push(cantComunesX1[randomInt])
                        comunesAlbum.innerHTML+=`<span style="color: red;">${cantComunesX1[randomInt]}</span> `
                        cantComunes++
                    }
                }
            )

            let cantFiguYPF =0;
            const figusYPF = document.createElement('p')
            figusYPF.innerHTML=`YPF: <br>`

            let cantFiguCopa =0;
            const figusCopa = document.createElement('p')
            figusCopa.innerHTML=`COPA: <br>`  

            let cantFiguSem =0;
            const figusSem = document.createElement('p')
            figusSem.innerHTML=`SEM: <br>`

            let cantFiguLPF =0;
            const figusLPF = document.createElement('p')
            figusLPF.innerHTML=`LPF: <br>`

            let cantFiguEscudos =0;
            const figusEscudos = document.createElement('p')
            figusEscudos.innerHTML=`Escudos: <br>`

            let cantFiguRiv =0;
            const figusRiv = document.createElement('p')
            figusRiv.innerHTML=`River: <br>`

            let cantFiguBoc =0;
            const figusBoc = document.createElement('p')
            figusBoc.innerHTML=`Boca: <br>`

            data.forEach(figu =>{
                if (figu.CANT>2){
                    if (figu.TIPO=="YPF" && cantFiguYPF<2){
                        cantFiguYPF++    
                        figusYPF.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])   
                    }
                    if (figu.TIPO=="COPA" && cantFiguCopa<2){
                        cantFiguCopa++
                        figusCopa.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="SEMILLERO" && cantFiguSem<2){
                        cantFiguSem++
                        figusSem.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="LPF" && cantFiguLPF<1){
                        cantFiguLPF++
                        figusLPF.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="ESCUDO" && cantFiguEscudos<7){
                        cantFiguEscudos++
                        figusEscudos.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="ESP" && figu.NUM.substring(0,3)=="RIV" && cantFiguRiv<3){
                        cantFiguRiv++
                        figusRiv.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="ESP" && figu.NUM.substring(0,3)=="BOC" && cantFiguBoc<3){
                        cantFiguBoc++
                        figusBoc.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                }
            })

            data.forEach(figu =>{
                if (figu.CANT==2){
                    if (figu.TIPO=="YPF" && cantFiguYPF<2){
                        cantFiguYPF++    
                        figusYPF.innerHTML+=`<span style="color: #e5d100;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])       
                    }
                    if (figu.TIPO=="COPA" && cantFiguCopa<2){
                        cantFiguCopa++
                        figusCopa.innerHTML+=`<span style="color: #e5d100;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="SEMILLERO" && cantFiguSem<2){
                        cantFiguSem++
                        figusSem.innerHTML+=`<span style="color: #e5d100;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="LPF" && cantFiguLPF<1){
                        cantFiguLPF++
                        figusLPF.innerHTML+=`<span style="color: #e5d100;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="ESCUDO" && cantFiguEscudos<7){
                        cantFiguEscudos++
                        figusEscudos.innerHTML+=`<span style="color: #e5d100;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="ESP" && figu.NUM.substring(0,3)=="RIV" && cantFiguRiv<3){
                        cantFiguRiv++
                        figusRiv.innerHTML+=`<span style="color: #e5d100;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="ESP" && figu.NUM.substring(0,3)=="BOC" && cantFiguBoc<3){
                        cantFiguBoc++
                        figusBoc.innerHTML+=`<span style="color: #e5d100;">${figu.NUM}</span> `  
                        figusAlbum.push(figu["NUM"])
                    }
                }
            })

            data.forEach(figu =>{
                if(figu.CANT==1){
                    if (figu.TIPO=="YPF" && cantFiguYPF<2){
                        cantFiguYPF++    
                        figusYPF.innerHTML+=  `<span style="color: red;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])      
                    }
                    if (figu.TIPO=="COPA" && cantFiguCopa<2){
                        cantFiguCopa++
                        figusCopa.innerHTML+=  `<span style="color: red;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="SEMILLERO" && cantFiguSem<2){
                        cantFiguSem++
                        figusSem.innerHTML+=  `<span style="color: red;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                    if (figu.TIPO=="ESCUDO" && cantFiguEscudos<7){
                        cantFiguEscudos++
                        figusEscudos.innerHTML+=  `<span style="color: red;">${figu.NUM}</span> `
                        figusAlbum.push(figu["NUM"])
                    }
                }
            })

            let sobrantes=[]
            data.forEach(figu=>{
                if (figu.CANT>1 && !figusAlbum.includes(figu.NUM)){
                    sobrantes.push(figu.NUM)
                }
            })

            const figusSobrantes = document.createElement('p')
            figusSobrantes.innerHTML='Sobrantes: '
            figusSobrantes.style.color='green'
            sobrantes.forEach(figu=> figusSobrantes.innerHTML+=figu+" ")
            

            const comunesCant1=document.createElement('h4')
            comunesCant1.innerHTML=`CANT x1 : ${cantComunesAlbum-cantComunesMayor1}`

            cantComunesOk.innerHTML=`COMUNES >1 : ${cantComunesMayor1}/${cantComunesAlbum}`            
            tituloAlbum.innerHTML=`Album (${cantComunes+cantFiguYPF+cantFiguCopa+cantFiguLPF+cantFiguSem+cantFiguEscudos+cantFiguRiv+cantFiguBoc}): `
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
            buttonCopiar.innerHTML=`Copiar ${cantComunes+cantFiguYPF+cantFiguCopa+cantFiguLPF+cantFiguSem+cantFiguEscudos+cantFiguRiv+cantFiguBoc} figus `
            mostrarEnHtml.appendChild(buttonCopiar)

            buttonCopiar.addEventListener('click',()=>{
                let figusParaAlbum = "";
                figusAlbum.forEach(figu=>figusParaAlbum+=figu+" ")
                navigator.clipboard.writeText(figusParaAlbum)
            })
        })

}

const albumName = (nombreJson) =>{
    if (nombreJson == "baseMundial"){
        return "Mundial Qatar 2022"
    }else if (nombreJson == "base_copam"){
        return "Copa America 2024"
    }else if (nombreJson == "baseFutarg"){
        return "Futbol Argentino 2023"
    }else if (nombreJson == "baseFutarg24"){
        return "Futbol Arg 2024"
    }else if (nombreJson == "baseLali"){
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

  const hoy= new Date();
  hoy.setHours(0,0,0,0)


// Cargar las figus iniciales al cargar la página

cargarFigus();
