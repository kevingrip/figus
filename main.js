
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
    const totalVentasElement = document.getElementById('totalVentas');
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


                    if (objeto["PREARMADO"]==="SI"){
                        pantallaVenta.style.backgroundColor='#58d68d'
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
                        nombreAlbum.style.backgroundColor = '#e5d100red'  
                        pantallaVenta.style.border = '3px solid #e5d100red'  
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
                    
                    

                    figusVendidas.style.maxWidth = '90%';
                    figusVendidas.style.minHeight = '20px';
                    figusVendidas.style.wordWrap = 'break-word';
                    pantallaVenta.style.margin = '5px'
                    pantallaVenta.style.padding = '15px'                 


                    
                    // Agregar el elemento div al contenedor totalVentasElement
                    totalVentasElement.appendChild(pantallaVenta);
                    
                                                          
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

    valorInput = valorInput.replace(/INTRO|INTR/g, "INT");
    valorInput = valorInput.replace(/MEXICO|MEJICO|MXICO|MÉXICO|MX|MEXIVO|MÉX/g, "MEX");
    valorInput = valorInput.replace(/URUGUAYO|URUGUAY|URUGUAO|URUGUA|URGUA|URUG/g, "URU");
    valorInput = valorInput.replace(/ESTADOSUNIDOS|EEUU|EE.UU/g, "USA");
    valorInput = valorInput.replace(/BRASIL|BRAZIL/g, "BRA");
    valorInput = valorInput.replace(/CANADA|CANADÁ|CANAD|CANA|CAADA/g, "CAN");
    valorInput = valorInput.replace(/ARGENTINA|AFA|ARH/g, "ARG");
    valorInput = valorInput.replace(/HCL|HC1|ESTADIO|ESTADIOS/g, "HCI");
    valorInput = valorInput.replace(/PERU|PERÚ|PERO/g, "PER");
    valorInput = valorInput.replace(/CHILE/g, "CHI");
    valorInput = valorInput.replace(/VENEZUELA|VENEZ/g, "VEN");
    valorInput = valorInput.replace(/JAMAICA|JAMA/g, "JAM");
    valorInput = valorInput.replace(/PANAM|PANAMA/g, "PAN");
    valorInput = valorInput.replace(/BOLIVIA|BOLIV/g, "BOL");
    valorInput = valorInput.replace(/COLOMBIA|COLOM|COLO/g, "COL");
    valorInput = valorInput.replace(/PARAGUAY|PARAGUA|PARA/g, "PAR");
    valorInput = valorInput.replace(/HONDURAS|HOND|HONDURA/g, "HON");
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

    if (errorEscritura==false){

        let mostrarFiguLimp=""        

        const buttonFiguLimp=document.createElement('button')
        buttonFiguLimp.textContent='Copiar Figus '
        separacionDiv2.appendChild(buttonFiguLimp)
        

        const cantLi = document.createElement('p');
        cantLi.textContent = `Cantidad figus contadas en la pregunta: ${cantFigusConsult}`;
        separacionDiv2.appendChild(cantLi);

        filteredFigus.forEach(figu => {
            mostrarFiguLimp+=figu.NUM+" "
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

        unionDiv.appendChild(separacionDiv1)
        unionDiv.appendChild(separacionDiv2)
        
        resultados.style.padding='0px'
        resultados.appendChild(unionDiv)
        

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
        if (faltantes.length == 0){
            if (cantFigusStock==1){
                if (totalPrecio<3500){
                    if (tipoFigu=='ESCUDO'){
                        mensaje.textContent = `${singPluPri(cantFigusStock)} ${singPluPre(cantFigusStock)} figurita original es 5000${confirmacion}`                        
                    } else if (totalPrecio==850){
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
        mensaje.style.margin='50px'
        resultados.appendChild(mensaje);
        navigator.clipboard.writeText(mensaje.textContent)  // Usa .textContent para acceder al texto
            

    }else{
        const errorEscritura = document.createElement('p');
        errorEscritura.innerHTML = `${valorInput.length>0 ? `Error de escritura. Presta atencion loro.<br> Posible error: ${error}` : 'Ingrese figuritas' }`;
        errorEscritura.classList.add('clientFigu')
        resultados.appendChild(errorEscritura);
    }   
};

const albumCliente = (tipo, event) => {
    tipoAlbum(tipo, event)
        .then(() => {
            buscarCliente(); 
        });
};

const albumInput = (tipo, event) => {
    tipoAlbum(tipo, event)
        .then(() => {
            buscarFigus(); 
        });
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

const albumFigu = (tipo, event) => {
    tipoAlbum(tipo, event)
        .then(() => {
            armarAlbumFigus(); 
        });
};

const armarAlbumFigus = () =>{
    const mostrarEnHtml = document.getElementById('figuUsers');
    mostrarEnHtml.innerHTML = ''; // Limpiar resultados anteriores

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
                    if (figu.CANT>2 && figu.TIPO=="COMUNES" && cantComunes<130 && !figusAlbum.includes(figu.NUM)){
                        figusAlbum.push(figu["NUM"])
                        comunesAlbum.innerHTML+=`<span style="color: #1dff06;">${figu.NUM}</span> `
                        cantComunes++
                        cantComunesMayor1++
                    }                   
                }
            )
            data.forEach(figu=>{
                    if (figu.CANT==2 && figu.TIPO=="COMUNES" && cantComunes<130 && !figusAlbum.includes(figu.NUM)){
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
                    if (cantComunes<130 && !figusAlbum.includes(figu.NUM)){
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
            comunesCant1.innerHTML=`CANT x1 : ${130-cantComunesMayor1}`

            cantComunesOk.innerHTML=`COMUNES >1 : ${cantComunesMayor1}/130`            
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
// Cargar las figus iniciales al cargar la página

cargarFigus();