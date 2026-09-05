import { estilosGastosDato, estilosGastosGeneral } from "./estilosCuenta.js"
import { fechaArgentinaCorta, precioArgentino } from "../../utilidades/conversionesArg.js"

export const agregarItem = (item) => {
    const elementGeneral = document.createElement("div")
    let ventaConImporte
    let enviosPagados
    if ("IMPORTE_NETO" in item) {
        ventaConImporte = crearElementosItems(item,"IMPORTE_NETO")
        estilosGastosGeneral(ventaConImporte)
        elementGeneral.append(ventaConImporte)
    }
    if ("USUARIO_PAGO" in item) {
        enviosPagados = crearElementosItems(item,"USUARIO_PAGO")
        estilosGastosGeneral(enviosPagados)
        enviosPagados.style.backgroundColor = "violet"
        elementGeneral.append(enviosPagados)
    }




    return elementGeneral
}

const crearElementosItems = (item,tipoItem) => {
    const elementGeneral = document.createElement("div")
    const clavesImporteNeto = ["VENTAID", "FECHA", "CUENTA", "TITULO","","","","IMPORTE_NETO"]
    const clavesEnvios = ["VENTAID", "FECHA", "CUENTA", "TITULO", "ZONA", "TRANSPORTISTA", "USUARIO_PAGO", "COSTO_ENVIO"]

    let claves;

    if (tipoItem==="IMPORTE_NETO"){
        claves=clavesImporteNeto
    }else if (tipoItem === "USUARIO_PAGO"){
        claves=clavesEnvios
    }

    claves.forEach(clave => {
        const element = document.createElement("div")
        let fecha;

        if (["FECHA", "FECHA_ML"].includes(clave)) {
            fecha = fechaArgentinaCorta(item[clave])
            element.textContent = `${clave}: \n${fecha}`
        }
        else if (clave === "TITULO") {
            if (!item[clave]) {
                element.textContent = `${clave}: \n-`
            } else if (item[clave].toLowerCase().includes("figuritas")) {
                element.textContent = `${clave}: \nFiguritas`
            } else {
                element.textContent = ``
            }
        } else if (["COSTO_ENVIO"].includes(clave)) {
            element.textContent = `${clave}: \n-${precioArgentino(item[clave])}`
        } else if (["IMPORTE_NETO"].includes(clave)) {
            element.textContent = `${clave}: \n${precioArgentino(item[clave])}`
        } else if (item[clave]){
            element.textContent = `${clave}: \n${item[clave]}`
        } else if (["COSTO_ENVIO"].includes(clave)) {
                    element.textContent = `${clave}: \n-${precioArgentino(item[clave])}`
        }
        else{
            element.textContent = ``
        }
        elementGeneral.append(element)
        estilosGastosDato(element)
    })

    return elementGeneral
}

const agregarEnvioPagado = (item) => {
    const elementGeneral = document.createElement("div")
    const items = ["VENTAID", "FECHA", "CUENTA", "TITULO", "ZONA", "TRANSPORTISTA", "USUARIO_PAGO", "COSTO_ENVIO"]
    for (const [clave, valor] of Object.entries(item)) {
        if (!["_id", "__v", "PRODUCTO"].includes(clave)) {
            let fecha;
            let figurita;
            
            const element = document.createElement("div")

            if (items.includes(clave)) {
                if (["FECHA", "FECHA_ML"].includes(clave)) {
                    fecha = fechaArgentinaCorta(item[clave])
                    element.textContent = `${clave}: \n${fecha}`
                }
                else if (["TITULO"].includes(clave)) {
                    if (item[clave].toLowerCase().includes("figuritas")) {
                        figurita = "Figuritas"
                        element.textContent = `${clave}: \n${figurita}`
                    }else{
                        element.textContent = `T`
                    }
                } else if (["COSTO_ENVIO"].includes(clave)) {
                    element.textContent = `${clave}: \n-${precioArgentino(item[clave])}`
                } else {
                    element.textContent = `${clave}: \n${item[clave]}`
                }
                elementGeneral.append(element)
                estilosGastosDato(element)
            }

        }

    }


    return elementGeneral
}


export const agregarItemsNeto = (lista) => {
    const bloqueNetos = document.getElementById("itemsNetoCuenta")
    bloqueNetos.innerHTML = ""
    const elementGeneral = document.createElement("div")
    elementGeneral.style.backgroundColor = "white"
    elementGeneral.style.display = "flex"
    elementGeneral.style.flexDirection = "column"
    elementGeneral.style.alignItems = "center"
    for (const [clave, valor] of Object.entries(lista)) {
        const element = document.createElement("div")
        let nombre;
        if (clave === "mati_neto") {
            nombre = "Mati"
        } else if (clave === "kevin_neto") {
            nombre = "Kevin"
        }
        element.textContent = `Importe Neto ${nombre}: ${precioArgentino(lista[clave])}`
        elementGeneral.append(element)
    }
    bloqueNetos.append(elementGeneral)
}

export const agregarMovimientos = (movimientos) => {
    const elementGastosHistoricos = document.createElement("div")
    for (const mov of movimientos) {
        const itemMovimiento = agregarItem(mov)
        elementGastosHistoricos.append(itemMovimiento)
    }
    return elementGastosHistoricos
}

export const crearBotonesUsuarios = () =>{
    const usuarios = ["MATI","KEVIN"]
    const botonesUsuarios = []
    
    usuarios.forEach(usuario => {
        const boton = document.createElement("button")
        boton.textContent=usuario
        botonesUsuarios.push(boton)
    });
    return botonesUsuarios
}