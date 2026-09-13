import { api } from "../../config.js";
import { actualizarStock, obtenerTodasLasPublicaciones, setActivePublicacion } from "../servicios/api.js";

export const todasLasPublicaciones = async () => {
    const resultElement = document.getElementById("todasLasPublicaciones")
    const botonesEstadosElement = document.getElementById("elementBotonesEstados")

    const publicaciones = await obtenerTodasLasPublicaciones()

    const estados = [...new Set(publicaciones.map(publicacion => publicacion.status))]

    const elementBotones = crearFiltros(estados)
    botonesEstadosElement.append(elementBotones)

    mostrarPublicaciones(publicaciones)

}

const colorEstado = (bloque, estado) => {
    if (estado === "paused") {
        bloque.style.border = "solid orange 3px"
    } else if (estado === "active") {
        bloque.style.border = "solid green 3px"
    } else if (estado === "under_review") {
        bloque.style.backgroundColor = "red"
    }
}

const crearFiltros = (estados) => {
    const elementBotones = document.createElement("div")
    for (const estado of estados) {
        const boton = document.createElement("button")
        boton.textContent = estado
        elementBotones.append(boton)

        boton.addEventListener("click",async()=>{
            const publicaciones = await obtenerTodasLasPublicaciones()
            const publicaciones_estado = publicaciones.filter(publicacion=>publicacion.status===estado)
            mostrarPublicaciones(publicaciones_estado)
        })
    }
    return elementBotones
}

const crearCardPublicacion = (publicacion) => {
    const card = document.createElement("div")
    const leftCard = document.createElement("div")
    const upCard = document.createElement("div")
    const downCard = document.createElement("div")
    const rightCard = document.createElement("div")

    const id = document.createElement("div")
    const title = document.createElement("a")
    const seller_id = document.createElement("p")
    const elementStock = document.createElement("div")
    const stock = document.createElement("p")
    const available_quantity = document.createElement("p")
    const button_mas = document.createElement("button")
    const button_menos = document.createElement("button")
    const buttonStatus = document.createElement("button")
    const date_created = document.createElement("p")
    const thumbnail = document.createElement("img")
    const price = document.createElement("p")
    const status = document.createElement("h5")

    status.textContent = publicacion.status
    id.textContent = publicacion.id
    title.textContent = publicacion.title
    seller_id.textContent = `SELLER_ID: ${publicacion.seller_id}`
    stock.textContent = "STOCK: "
    available_quantity.textContent = publicacion.available_quantity
    button_mas.textContent = ">"
    button_menos.textContent = "<"
    price.textContent = `$ ${publicacion.price}`
    button_menos.style.width = "1.5vw"
    button_mas.style.width = "1.5vw"
    button_menos.style.height = "3vh"
    button_mas.style.height = "3vh"
    available_quantity.style.marginInlineStart = "5px"
    available_quantity.style.marginInlineEnd = "5px"
    stock.style.marginInlineEnd = "10px"

    elementStock.append(stock, button_menos, available_quantity, button_mas)
    elementStock.style.display = "flex"
    elementStock.style.flexDirection = "row"
    elementStock.style.alignItems = "center"
    title.href = publicacion.permalink
    title.target = "_blank";
    date_created.textContent = publicacion.date_created
    thumbnail.src = publicacion.thumbnail;
    thumbnail.style.width = "auto";
    thumbnail.style.height = "30vh";
    thumbnail.style.objectFit = "contain";
    buttonStatus.textContent = publicacion.status === "paused" ? "Activar" : "Pausar"
    upCard.style.margin = "10px"
    upCard.append(title)

    card.style.display = "flex"
    card.style.flexDirection = "column"
    card.style.margin = "20px"
    card.style.minHeight = "55vh"

    upCard.style.fontSize="3vh"
    upCard.style.marginBottom="30px"

    
 
    downCard.style.display = "flex"
    downCard.style.flexDirection =
        window.innerWidth <= 768 ? "column" : "row";

    
    leftCard.style.backgroundColor="red"
    
    downCard.append(leftCard, rightCard)
    rightCard.append(id, seller_id, date_created, elementStock, price, status, buttonStatus)
    leftCard.append(thumbnail)

    leftCard.style.display = "flex"
    //leftCard.style.width = "20vw"
    leftCard.style.alignItems = "center"
    leftCard.style.justifyContent = "center"
    leftCard.style.width = window.innerWidth <= 768 ? "30vw" : "15vw";

    card.append(upCard, downCard)

    return { card, button_mas, button_menos, buttonStatus, available_quantity }
}

const mostrarPublicaciones = (publicaciones) =>{
    const resultElement = document.getElementById("todasLasPublicaciones")
    resultElement.innerHTML=""

    for (const publicacion of publicaciones) {

        const { card, button_mas, button_menos, buttonStatus, available_quantity } = crearCardPublicacion(publicacion)
        colorEstado(card, publicacion.status)

        button_mas.addEventListener("click", async () => {
            const stockActual = Number(available_quantity.textContent);
            const nuevoStock = stockActual + 1;

            try {

                await actualizarStock(publicacion.id, publicacion.seller_id, nuevoStock)
                available_quantity.textContent = nuevoStock;

            } catch (error) {
                console.log("Error aumentando stock")
            }

        })

        button_menos.addEventListener("click", async () => {
            const stockActual = Number(available_quantity.textContent);

            const nuevoStock = stockActual - 1;

            try {

                await actualizarStock(publicacion.id, publicacion.seller_id, nuevoStock)
                available_quantity.textContent = nuevoStock;

            } catch (error) {
                console.log("Error descontando stock")
            }

        })

        buttonStatus.addEventListener("click", async () => {

            const nuevoEstado = publicacion.status === "paused"
                ? "active"
                : "paused";

            setActivePublicacion(publicacion.id, publicacion.seller_id, publicacion.status)
            
            publicacion.status = nuevoEstado;

            buttonStatus.textContent = nuevoEstado === "paused"
                ? "Activar"
                : "Pausar";

            colorEstado(card, publicacion.status)

        })

        resultElement.style.display = "flex"
        resultElement.flexDirection =
        window.innerWidth <= 768 ? "column" : "row";

        resultElement.append(card)
    }

}