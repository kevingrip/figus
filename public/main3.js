import { obtenerFiguritas,obtenerVentas } from "./api.js";
import { cosecharFigus } from "./javascript/cosecharFigus.js";
import {buscarFigus} from "./javascript/buscarFigus.js"

const botones = document.querySelectorAll(".bloqueAlbum");
botones.forEach(boton => {
    boton.addEventListener("click", () => {

        botones.forEach(b => b.classList.remove("pressed"));

        boton.classList.add("pressed");

    });
});

const botonMundialUsaBuscar = document.getElementById("botonMundialUsaBuscar")
botonMundialUsaBuscar?.addEventListener('click',async ()=>{
    const figusMundialUsa = await obtenerFiguritas("mundialUsa2026");
    buscarFigus("baseMundialUsa",figusMundialUsa,"mundialUsa2026");
})

const botonMundialQatarBuscar = document.getElementById("botonMundialQatarBuscar")
botonMundialQatarBuscar?.addEventListener('click',async ()=>{
    const figusMundialQatar = await obtenerFiguritas("mundialQatar2022");
    buscarFigus("baseMundial",figusMundialQatar,"mundialQatar2022");
})

const botonCopaAmericaBuscar = document.getElementById("botonCopaAmericaBuscar")
botonCopaAmericaBuscar?.addEventListener('click',async ()=>{
    const figusCopaAmerica = await obtenerFiguritas("copaAmerica2024");
    buscarFigus("base_copam",figusCopaAmerica,"copaAmerica2024");
})

const botonMundialUsaCosecha = document.getElementById("botonMundialUsaCosecha")
botonMundialUsaCosecha?.addEventListener('click',async ()=>{
    const figusMundialUsa = await obtenerFiguritas("mundialUsa2026");
    cosecharFigus("baseMundialUsa",figusMundialUsa,"mundialUsa2026");
})

const botonCopaAmericaCosecha = document.getElementById("botonCopaAmericaCosecha")
botonCopaAmericaCosecha?.addEventListener('click',async ()=>{
    const figusCopaAmerica = await obtenerFiguritas("copaAmerica2024");
    cosecharFigus("base_copam",figusCopaAmerica,"copaAmerica2024");
})

const botonMundialQatarCosecha = document.getElementById("botonMundialQatarCosecha")
botonMundialQatarCosecha?.addEventListener('click',async ()=>{
    const figusMundialQatar = await obtenerFiguritas("mundialQatar2022");
    cosecharFigus("baseMundialQatar",figusMundialQatar,"mundialQatar2022");
})


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

const totalVentas = async() =>{
    const totalVentasElement = document.getElementById('totalVentas');
    
    const ventas = await obtenerVentas();
    
    console.log(ventas);

    if (totalVentasElement){
        totalVentasElement.textContent = ventas[0].VENDIDAS;
    }
    

    // fetch(filePath)
    //     .then(response => response.json())
    //     .then(data => {
            
    //         const ventasDiv = document.createElement('div');
    //         const cantidadFlex = document.createElement('h3');
    //         const cantidadCorreo = document.createElement('h3');
    //         const cantidadAcordar = document.createElement('h3');

    //         let cantFlex= 0
    //         let cantCorreo= 0
    //         let cantAcordar= 0

    //         for (let album in data){
    //             eleccionAlbum = data[album]
                
    //             const EnviosFiltered = eleccionAlbum.filter(prep => prep.ARMADO ==="NO")
                
    //             EnviosFiltered.forEach(filtered=>{
    //                 if (filtered.Envio === "FLEX") {
    //                     cantFlex++;
    //                 } else if (filtered.Envio === "CORREO") {
    //                     cantCorreo++;
    //                 } else {
    //                     // Si hay otros tipos de envío, puedes manejarlos aquí si es necesario
    //                     cantAcordar++;
    //                 }
    //             });
    //         }

    //         cantidadFlex.textContent=`Cantidad Flex: ${cantFlex}`
    //         ventasDiv.appendChild(cantidadFlex)
    //         cantidadCorreo.textContent=`Cantidad Correo: ${cantCorreo}`
    //         ventasDiv.appendChild(cantidadCorreo)
    //         cantidadAcordar.textContent=`Cantidad Acordar: ${cantAcordar}`
    //         ventasDiv.appendChild(cantidadAcordar)
            
    //         ventasDiv.style.color='purple'

    //         totalVentasElement.appendChild(ventasDiv);

    //         for (let album in data){
    //             // console.log(album)
            
    //             eleccionAlbum = data[album]
                
    //             const noPrep = eleccionAlbum.filter(prep =>prep.ARMADO ==="NO")

    //             // console.log(noPrep)

    //             noPrep.forEach(objeto => {
    //                 let count = 0
    //                 // Crear un elemento div para cada objeto
                    
    //                 const pantallaVenta = document.createElement('div');

                    
    //                 const nombreAlbum = document.createElement('h2');
    //                 const nombreUsuario = document.createElement('h3');
    //                 const fecha = document.createElement('h5');
    //                 const nombreCuenta = document.createElement('p');
    //                 const figusVendidas = document.createElement('div');
    //                 const fVendidas1 = document.createElement('p');
    //                 const fVendidas2 = document.createElement('p');
    //                 const figusNoVendidas = document.createElement('p');
    //                 const tipoEnvio = document.createElement('h4');
    //                 const cantidad = document.createElement('p')

    //                 nombreAlbum.textContent = album
                    
    //                 nombreUsuario.textContent = `USUARIO:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${objeto["usuario"]}`             
    //                 nombreCuenta.textContent = `MercadoLibre: ${objeto["Cuenta"]}`
    //                 fecha.textContent = `${objeto["Dia"]}`
    //                 let figuNoVend = objeto["NoVendidas"].toString()
    //                 const figuCont = objeto["Vendidas"]

    //                 figuCont.forEach(()=>{count = count+1})
    //                 cantidad.textContent = `Cantidad vendida: ${count}`
                    
    //                 // console.log(figuVend)
    //                 //let figuVenTab = figuVend.replace(/,/g,"\u00A0\u00A0\u00A0\u00A0")
    //                 //let figuVenTab = figuVend.replace(/,/g,"<br>")
    //                 let ant;
    //                 let cont=0;
    //                 let result="";
    //                 let result2="";
    //                 let fila=0;
    //                 let cantPaises=0;
    //                 let contFil=0;

    //                 objeto["Vendidas"].forEach(figu=>{
    //                     if (figu.substring(0,3)!=ant){
    //                         cantPaises++;
    //                     }
    //                     ant=figu.substring(0,3)
    //                 }
    //             )

    //                 objeto["Vendidas"].forEach(figu=>{
                        

    //                         if (cont==0){

    //                             ant=figu.substring(0,3)    
    //                             if (figu.substring(0,3)=="INT"){
    //                                 result+=figu.substring(0,3)+": "+figu.substring(3,5)
    //                             }else{
    //                                 result+=figu.substring(0,3)+" : "+figu.substring(3,5)
    //                             }                      
                                

    //                         }else{

    //                             if (figu.substring(0,3)!=ant){

    //                                 if (fila<(cantPaises/2)-1 || fila<9){
    //                                     result+="<br>"+figu.substring(0,3)+" :\u00A0"+figu.substring(3,5);
    //                                 }else{
    //                                     if (contFil==0){
    //                                         result2+=figu.substring(0,3)+" :\u00A0"+figu.substring(3,5);
    //                                         contFil++;
    //                                     }else{
    //                                         result2+="<br>"+figu.substring(0,3)+" :\u00A0"+figu.substring(3,5);
    //                                     }
                                        
    //                                 }
                                    
    //                                 fila++;                                    
    //                             }else{

    //                                 if (fila<(cantPaises/2) || fila<10){
    //                                     result+=", "+figu.substring(3,5);       
    //                                 }else{
    //                                     result2+=", "+figu.substring(3,5);       
    //                                 }
                                                                 
                                    
    //                             }
    //                         }
                                               
                        
    //                     ant=figu.substring(0,3)
    //                     cont++
    //                 })

    //                 result = result.replace("INT","INTR")

    //                 figusVendidas.classList.add('fVendidas')

    //                 if (result2.length>0){
    //                     fVendidas1.classList.add('fVendidas1')
    //                     fVendidas2.classList.add('fVendidas2')
    //                 }
                    

    //                 fVendidas1.innerHTML = `${result}`
    //                 fVendidas2.innerHTML = `${result2}`
    //                 figusVendidas.appendChild(fVendidas1)
    //                 figusVendidas.appendChild(fVendidas2)
    //                 figusNoVendidas.textContent = figuNoVend.length>0?`Sin Stock : ${figuNoVend}`:'';
    //                 figusNoVendidas.style.color = 'red'

    //                 const buttonArmado = document.createElement('button')
    //                 buttonArmado.innerHTML='ARMADO'

    //                 buttonArmado.addEventListener('click',()=>{                        
    //                     if (objeto["PREARMADO"]==="NO"){
    //                         objeto["PREARMADO"]="SI"
    //                         pantallaVenta.style.backgroundColor='#58d68d'
    //                     }else{
    //                         objeto["PREARMADO"]="NO"
    //                         pantallaVenta.style.backgroundColor=''
    //                     }
    //                 })

    //                 if (objeto["PREARMADO"]==="SI"){
    //                     pantallaVenta.style.backgroundColor='#58d68d'
    //                 }
                    
                    
                    
    //                 if (objeto["Envio"]==='FLEX'){
    //                     tipoEnvio.textContent = `ENVIOS FLEX`
    //                     tipoEnvio.style.color = '#39ff14'
    //                     tipoEnvio.style.fontSize  = '20px'
    //                     tipoEnvio.style.fontStyle = 'italic';
    //                     tipoEnvio.style.maxWidth = '150px';
    //                     tipoEnvio.style.border = '2px solid black';
    //                     tipoEnvio.style.borderRadius = '5px'
    //                     tipoEnvio.style.display = 'flex';
    //                     tipoEnvio.style.justifyContent = 'center';

    //                     cantFlex+=1
    //                 }else if (objeto["Envio"]==='CORREO'){
    //                     tipoEnvio.textContent = `${objeto["Envio"]}`
    //                     tipoEnvio.style.color = '#e5d100'
    //                     tipoEnvio.style.fontSize  = '20px'
    //                 }else {
    //                     tipoEnvio.textContent = `${objeto["Envio"]}`
    //                     tipoEnvio.style.color = 'blue'
    //                     tipoEnvio.style.fontSize  = '20px'
    //                 }

    //                 nombreAlbum.style.height = '25px' 
    //                 nombreAlbum.style.display = 'flex';
    //                 nombreAlbum.style.alignItems = 'center' 
    //                 nombreAlbum.style.padding = '10px' 

    //                 if (album==='Copa America 2024'){
    //                     nombreAlbum.style.backgroundColor = 'skyblue' 
    //                     pantallaVenta.style.border = '3px solid skyblue'   
    //                 }else if (album==='Mundial Qatar 2022'){
    //                     nombreAlbum.style.backgroundColor = 'orange'  
    //                     pantallaVenta.style.border = '3px solid orange'  
    //                 }else if (album==='Futbol Argentino 2023'){
    //                     nombreAlbum.style.backgroundColor = '#d72bde' 
    //                     pantallaVenta.style.border = '3px solid #d72bde'  

    //                 }else if (album==='Copa Libertadores 2023'){
    //                     nombreAlbum.style.backgroundColor = 'gold' 
    //                     pantallaVenta.style.border = '3px solid gold'  

    //                 }else if (album==='Futbol Arg 2024'){
    //                     nombreAlbum.style.backgroundColor = 'green' 
    //                     pantallaVenta.style.border = '3px solid green' 
    //                     nombreAlbum.style.color='white'

    //                 }

    //                 figusVendidas.style.border = '1px solid lightgrey' 
    //                 figusVendidas.style.padding = '10px'

    //                 if (window.innerWidth < 768) {
    //                     nombreUsuario.style.fontSize='4vw'
    //                 }else{
    //                     nombreUsuario.style.fontSize='1.5vw'
    //                 }
                    
                    

    //                 pantallaVenta.appendChild(nombreAlbum);
    //                 pantallaVenta.appendChild(nombreUsuario);
    //                 pantallaVenta.appendChild(figusVendidas);     
    //                 pantallaVenta.appendChild(cantidad);               
    //                 pantallaVenta.appendChild(tipoEnvio);
    //                 pantallaVenta.appendChild(fecha);
    //                 pantallaVenta.appendChild(figusNoVendidas);
    //                 pantallaVenta.appendChild(nombreCuenta);

                    
    //                 pantallaVenta.appendChild(buttonArmado);

                    
                    

    //                 figusVendidas.style.maxWidth = '90%';
    //                 figusVendidas.style.minHeight = '20px';
    //                 figusVendidas.style.wordWrap = 'break-word';
    //                 pantallaVenta.style.margin = '5px'
    //                 pantallaVenta.style.padding = '15px'                 

                    
                    
    //                 // Agregar el elemento div al contenedor totalVentasElement
                    
    //                 totalVentasElement.appendChild(pantallaVenta);      
                                                        
    //             });
                
    //         }
    //         const descargarActualizado = document.createElement('button')
    //         descargarActualizado.innerHTML='Descargar Actualizado'

    //         descargarActualizado.addEventListener('click',()=>{
    //             const datosJson = JSON.stringify(data, null, 2);
    //             const blob = new Blob([datosJson], { type: 'application/json' });
    //             const enlace = document.createElement('a');
    //             enlace.href = URL.createObjectURL(blob);
    //             enlace.download = `totalVentas.json`;
    //             enlace.click();
    //         })

    //         totalVentasElement.appendChild(descargarActualizado); 
    //     })
    //     .catch(error => {
    //         console.error('Error al cargar el archivo JSON:', error);
    //         throw error; // Propaga el error para que se maneje en la cadena de promesas
    //     });

}
totalVentas();

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

const ordenarPorCantidad = async (base, event) => {
    const lista = document.getElementById("ordenadasCantidad");
    if (!lista) return console.error("No se encontró UL 'ordenadasCantidad'");

    lista.innerHTML = "";

    try {
        // Espera a que tipoAlbum cargue las figus en window.todasLasFigus
        await tipoAlbum(base, event);

        // Usamos los datos globales
        const datos = window.todasLasFigus;

        if (!Array.isArray(datos)) return console.error("No hay datos en window.todasLasFigus");

        const resultado = datos
            .filter(p => p.TIPO === "COMUNES")
            .sort((a, b) => b.CANT - a.CANT);

        resultado.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.NUM} - ${p.NOMBRE} (Stock: ${p.CANT})`;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error("Error al ordenar por cantidad:", error);
    }
};

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
    }else if (nombreJson == "baseMundialUsa"){
        return "Mundial USA 2026"
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