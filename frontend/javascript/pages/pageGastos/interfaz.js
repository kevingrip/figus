import { estiloElementForm, estiloFormulario, estilosGastosDato, estilosGastosGeneral } from "./estilos.js"
import { fechaArgentinaCorta, precioArgentino } from "../../utilidades/conversionesArg.js"
import { crearNuevoGasto } from "../../servicios/api.js"

export const agregarItemGasto = (gasto) => {
    const elementGeneral = document.createElement("div")

    for (const [clave, valor] of Object.entries(gasto)) {
        if (!["_id", "__v"].includes(clave)) {
            const element = document.createElement("div")

            if (clave === "FECHA") {
                const fecha = fechaArgentinaCorta(gasto[clave])
                element.textContent = `${clave}: \n${fecha}`
            }
            else if (clave === "MONTO") {
                element.textContent = `${clave}: \n${precioArgentino(gasto[clave])}`
            } else {
                element.textContent = `${clave}: \n${gasto[clave]}`
            }

            elementGeneral.append(element)
            estilosGastosDato(element)
        }
    }

    estilosGastosGeneral(elementGeneral)
    return elementGeneral
}

export const agregarItemsNeto = (lista) => {
    const bloqueNetos = document.getElementById("itemsNeto")
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

export const datosFormulario = (datosCreados) => {
    let cuentaSeleccionada;
    const btnMati = document.querySelector("#botonMati")
    const btnKevin = document.querySelector("#botonKevin")

    const elementForm = document.getElementById("divForm")
    estiloElementForm(elementForm)
    const formulario = document.getElementById("formularioCuenta")
    estiloFormulario(formulario)


    btnMati.addEventListener("click", () => {
        cuentaSeleccionada = "MATI"
        btnMati.style.backgroundColor = "lightgreen"
        btnKevin.style.backgroundColor = ""
    })
    btnKevin.addEventListener("click", () => {
        cuentaSeleccionada = "KEVIN"
        btnMati.style.backgroundColor = ""
        btnKevin.style.backgroundColor = "lightgreen"
    })

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        const inputDescripcion = document.querySelector("#cuentaInputDescripcion")
        const inputMonto = document.querySelector("#cuentaInputGasto")
        const descripcion = inputDescripcion.value
        const monto = inputMonto.value
        const datos = {
            DESCRIPCION: descripcion,
            CUENTA: cuentaSeleccionada,
            MONTO: monto
        }
        try {
            if (cuentaSeleccionada) {
                const nuevoGasto = await crearNuevoGasto(datos)
                console.dir(nuevoGasto)
                formulario.reset()
                btnMati.style.backgroundColor = ""
                btnKevin.style.backgroundColor = ""
                cuentaSeleccionada = ""

                if (datosCreados) {
                    datosCreados(nuevoGasto)
                }
            }else{
                alert("Debe seleccionar cuenta")
            }

        } catch (error) {
            console.error("Error al crear nuevo gasto")
        }

    })
}

export const agregarGastosHistoricos = (gastos) => {
    const elementGastosHistoricos = document.createElement("div")
    for (const gasto of gastos) {
        const itemGasto = agregarItemGasto(gasto)
        elementGastosHistoricos.append(itemGasto)
    }
    return elementGastosHistoricos
}