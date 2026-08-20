import { api } from "../../config.js";
import { obtenerTodasLasPublicaciones, setActivePublicacion } from "../servicios/api.js";

const colorEstado = (bloque, estado) => {
    if (estado === "paused") {
        bloque.style.border = "solid orange 3px"
    } else if (estado === "active") {
        bloque.style.border = "solid green 3px"
    }
}

export const todasLasPublicaciones = async () => {
    const resultElement = document.getElementById("todasLasPublicaciones")
    
    const publicaciones = await obtenerTodasLasPublicaciones()


    const pausedPublic = document.createElement("div")
    const activePublic = document.createElement("div")

    for (const publicacion of publicaciones) {
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

        id.textContent = publicacion.id
        title.textContent = publicacion.title
        seller_id.textContent = publicacion.seller_id
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
        thumbnail.style.width = "15vh";
        thumbnail.style.height = "15vh";
        thumbnail.style.objectFit = "contain";
        buttonStatus.textContent = publicacion.status === "paused" ? "Activar" : "Pausar"
        colorEstado(card, publicacion.status)

        button_mas.addEventListener("click", async () => {
            const stockActual = Number(available_quantity.textContent);

            const nuevoStock = stockActual + 1;



            const sumarStock = await fetch(`${api}/mercadolibre/publicaciones/${publicacion.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cantidad: nuevoStock,
                    vendedor: publicacion.seller_id
                })
            });

            if (!sumarStock.ok) {
                throw new Error("Error sumando stock");
            }

            available_quantity.textContent = nuevoStock;
        })

        button_menos.addEventListener("click", async () => {
            const stockActual = Number(available_quantity.textContent);

            const nuevoStock = stockActual - 1;

            const sumarStock = await fetch(`${api}/mercadolibre/publicaciones/${publicacion.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cantidad: nuevoStock,
                    vendedor: publicacion.seller_id
                })
            });

            if (!sumarStock.ok) {
                throw new Error("Error sumando stock");
            }

            available_quantity.textContent = nuevoStock;
        })

        buttonStatus.addEventListener("click", async () => {

            const nuevoEstado = publicacion.status === "paused"
                ? "active"
                : "paused";

            setActivePublicacion(publicacion.id,publicacion.seller_id,publicacion.status)
            

            if (!activarPublicacion.ok) {
                throw new Error("Error activando la publicacion");
            }
            publicacion.status = nuevoEstado;

            buttonStatus.textContent = nuevoEstado === "paused"
                ? "Activar"
                : "Pausar";

            colorEstado(card, publicacion.status)


        })

        card.style.display = "flex"
        card.style.flexDirection = "column"
        card.style.margin = "20px"
        card.style.minHeight = "55vh"

        downCard.style.display = "flex"
        downCard.style.flexDirection =
            window.innerWidth <= 768 ? "column" : "row";
        upCard.style.margin = "10px"
        upCard.append(title)
        downCard.append(leftCard, rightCard)
        rightCard.append(id, seller_id, date_created, elementStock, price, buttonStatus)
        leftCard.append(thumbnail)

        leftCard.style.display = "flex"
        //leftCard.style.width = "20vw"
        leftCard.style.alignItems = "center"
        leftCard.style.justifyContent = "center"
        leftCard.style.width = window.innerWidth <= 768 ? "30vw" : "15vw";

        card.append(upCard, downCard)
        if (publicacion.status === "paused") {
            pausedPublic.append(card)
        } else {
            activePublic.append(card)
        }
        resultElement.style.display = "flex"

        resultElement.append(pausedPublic, activePublic)
    }




    //const public_ = await publicaciones.json();

    //console.log(public_)
}