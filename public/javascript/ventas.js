import { api } from "../config.js";

function crearBotonContenedor(figu,album) {
    const contenedor = document.createElement("div");
    contenedor.style.display = "inline-flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";
    contenedor.style.justifyContent = "space-between";
    contenedor.style.width = "60px";
    contenedor.style.height = "70px";
    contenedor.style.border = "1px solid black";

    const informacion = document.createElement("div");
    informacion.style.display = "flex";
    informacion.style.flexDirection = "column";
    informacion.style.alignItems = "center";

    const textoSuperior = document.createElement("div");
    textoSuperior.textContent = figu;
    textoSuperior.style.fontSize = "13px";
    textoSuperior.style.fontWeight = "bold";

    const textoInferior = document.createElement("div");
    //textoInferior.textContent = `Cant: ${figu.CANT}`;
    textoInferior.style.fontSize = "11px";

    informacion.appendChild(textoSuperior);
    informacion.appendChild(textoInferior);

    contenedor.style.margin="3px"

    contenedor.appendChild(informacion);

    if (album=="mundialQatar2022"){
        contenedor.style.backgroundColor="orange"
    }else if (album=="mundialUsa2026"){
        contenedor.style.backgroundColor="violet"
    }
    
    return contenedor
}

export const totalVentas = async (todasLasVentas) => {
    const totalVentasElement = document.getElementById('totalVentas');

    const contenedorPadre = document.createElement("div")    

    if (totalVentasElement) {
        let totalPrecioVentas=0
        todasLasVentas.forEach(venta => {
            console.log(venta);
            const album = venta.ALBUM;

            totalPrecioVentas+=venta.PRECIO

            const contenedorVenta = document.createElement("div")
            const contenedorInfo = document.createElement("div")
            const contenedorFigus = document.createElement("div")

            const tituloAlbum = document.createElement("p")
            tituloAlbum.textContent=album

            const envio = document.createElement("p")
            envio.textContent= venta.ENVIO ? `Envio: ${venta.ENVIO}`: ""

            const cuenta = document.createElement("p")
            cuenta.textContent=`Cuenta: ${venta.CUENTA}`
            
            const cantidad = document.createElement("p")
            cantidad.textContent=`Cantidad: ${venta.VENDIDAS.length}`

            const precio = document.createElement("p")
            precio.textContent=`Precio: ${venta.PRECIO}`

            const dia = document.createElement("p")
            dia.textContent=`Dia de venta: ${new Date(venta.DIA).toLocaleDateString("es-AR")} // ${new Date(venta.DIA).toLocaleTimeString("es-AR")}`

            contenedorInfo.appendChild(tituloAlbum)
            contenedorInfo.appendChild(dia)
            contenedorInfo.appendChild(cuenta)
            contenedorInfo.appendChild(cantidad)
            contenedorInfo.appendChild(precio)
            contenedorInfo.appendChild(envio);
            

            contenedorInfo.style.display="flex"
            contenedorInfo.style.justifyContent="space-evenly"
            contenedorInfo.style.backgroundColor ="#E0E0E0"


            venta.VENDIDAS.forEach(figu=>{ 
                console.log(figu)
                contenedorFigus.appendChild(crearBotonContenedor(figu.NUM,album))
            })

            contenedorVenta.appendChild(contenedorInfo)
            contenedorVenta.appendChild(contenedorFigus)            
            totalVentasElement.appendChild(contenedorVenta)
        });

        const totalVendido = document.createElement("div")
        totalVendido.textContent=`Total Vendido: $ ${totalPrecioVentas}`
        totalVentasElement.prepend(totalVendido)        
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