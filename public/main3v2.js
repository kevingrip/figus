import { obtenerFiguritas, obtenerVentas, obtenerPreguntas, obtenerFechasPublicaciones, obtenerPublicacion, actualizarPrecio2000, obtenerVentasML, obtenerPreguntasMDB, setToComprado, agregarVentasMLtoMDB, actualizarStock, setActivePublicacion, obtenerTodasLasPublicaciones } from "./javascript/servicios/api.js";
import { cosecharFigus } from "./javascript/pages/cosecharFigus.js";
import { buscarFigus } from "./javascript/pages/buscarFigus/buscarFigus.js";
import { totalVentas } from "./javascript/pages/totalVentas.js";
import { StockFigusLuly } from "./javascript/pages/StockFigusLuly.js";
import { sinStock } from "./javascript/pages/sinStock.js";
import { noVendidas } from "./javascript/pages/noVendidas.js";
import { preguntasMercadolibre } from "./javascript/pages/preguntasmeli.js";
import { todasLasPublicaciones } from "./javascript/pages/todasLasPublicaciones.js";
import { albumName, nombrePublicacion, seller_name } from "./javascript/utilidades/nombres.js";
import { crearVenta } from "./javascript/pages/buscarFigus/elementoVenta.js";
import { api } from "./config.js";
import { getStockProveedores } from "./javascript/utilidades/stockTotal.js";

async function actualizarFechasPublicaciones() {
    try {
        const fechasPublicaciones = await obtenerFechasPublicaciones();

        const fechaActual = new Date();

        for (const publicacion of fechasPublicaciones) {
            const fechaLimite = new Date(publicacion.FECHA_LIMITE);

            if (fechaActual > fechaLimite) {
                const publicacionML = await obtenerPublicacion(publicacion.MLA, publicacion.SELLER_ID);
                if (publicacionML.price > 2000) {
                    await actualizarPrecio2000(publicacion.MLA, publicacion.SELLER_ID)
                }
                if (publicacionML.available_quantity === 0) {
                    await actualizarStock(publicacion.MLA, publicacion.SELLER_ID)
                }
                if (publicacionML.status != "active") {
                    await setActivePublicacion(publicacion.MLA, publicacion.SELLER_ID, publicacion.status)
                }
            }
        }
    } catch (error) {
        console.error("Error actualizando fechas de publicaciones:", error);
    }
}

actualizarFechasPublicaciones();

const botonesElementosBuscar = [
    {
        botonId: "botonMundialUsaBuscarOnline",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonMundialUsaBuscarAri",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
        canalVenta: "ARI"
    },
    {
        botonId: "botonMundialUsaBuscarLuly",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
        canalVenta: "LULY"
    },
    {
        botonId: "botonMundialQatarBuscar",
        album: "mundialQatar2022",
        baseJson: "baseMundial",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonCopaAmericaBuscar",
        album: "copaAmerica2024",
        baseJson: "base_copam",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonFutArg23Buscar",
        album: "futbolArgentino2023",
        baseJson: "baseFutarg",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonFutArg24Buscar",
        album: "futbolArgentino2024",
        baseJson: "baseFutarg24",
        canalVenta: "ONLINE"
    },
    {
        botonId: "botonLibertadores23Buscar",
        album: "libertadores2023",
        baseJson: "baseLali",
        canalVenta: "ONLINE"
    }
]

const botonesElementosCosecha = [
    {
        botonId: "botonMundialUsaCosecha",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
    },
    {
        botonId: "botonMundialQatarCosecha",
        album: "mundialQatar2022",
        baseJson: "baseMundial",
    },
    {
        botonId: "botonCopaAmericaCosecha",
        album: "copaAmerica2024",
        baseJson: "base_copam",
    },
    {
        botonId: "botonFutArg23Cosecha",
        album: "futbolArgentino2023",
        baseJson: "baseFutarg",
    },
    {
        botonId: "botonFutArg24Cosecha",
        album: "futbolArgentino2024",
        baseJson: "baseFutarg24",
    },
    {
        botonId: "botonLibertadores23Cosecha",
        album: "libertadores2023",
        baseJson: "baseLali",
    }
]

const botonesElementosNoVendidas = [
    {
        botonId: "botonMundialUsaNoVendidas",
        album: "mundialUsa2026",
        baseJson: "baseMundialUsa",
    },
    {
        botonId: "botonMundialQatarNoVendidas",
        album: "mundialQatar2022",
        baseJson: "baseMundial",
    },
    {
        botonId: "botonCopaAmericaNoVendidas",
        album: "copaAmerica2024",
        baseJson: "base_copam",
    },
    {
        botonId: "botonFutArg23NoVendidas",
        album: "futbolArgentino2023",
        baseJson: "baseFutarg",
    },
    {
        botonId: "botonFutArg24NoVendidas",
        album: "futbolArgentino2024",
        baseJson: "baseFutarg24",
    },
    {
        botonId: "botonLibertadores23NoVendidas",
        album: "libertadores2023",
        baseJson: "baseLali",
    }
]

const botones = document.querySelectorAll(".bloqueAlbum");
botones.forEach(boton => {
    boton.addEventListener("click", () => {

        botones.forEach(b => b.classList.remove("pressed"));

        boton.classList.add("pressed");

    });
});

botonesElementosBuscar.forEach(objeto => {
    const boton = document.getElementById(objeto.botonId)
    boton?.addEventListener('click', async () => {
        try {
            const figuritas = await obtenerFiguritas(objeto.album);
            buscarFigus(objeto.baseJson, figuritas, objeto.album, objeto.canalVenta);
        } catch (error) {
            console.error(error);
        }
    })
})

botonesElementosCosecha.forEach(objeto => {
    const boton = document.getElementById(objeto.botonId)
    boton?.addEventListener('click', async () => {
        const figuritas = await obtenerFiguritas(objeto.album);
        cosecharFigus(objeto.baseJson, figuritas, objeto.album);
    })
})

const elementVentas = document.getElementById("totalVentas") || document.getElementById("totalVentasAri") || document.getElementById("totalVentasLuly")
const elementBotonesVenta = document.getElementById("botonesVendedores")
const elementPrecioVenta = document.getElementById("resumenPrecioVenta")

if (elementVentas) {
    const ventasMDB = await obtenerVentas();
    const ventasML = await obtenerVentasML();
    //await agregarVentasMLtoMDB(ventasML)
    await totalVentas(ventasMDB, ventasML, elementVentas, elementBotonesVenta, elementPrecioVenta);
}

const botonStockLuly = document.getElementById("botonStockLuly")
botonStockLuly?.addEventListener("click", async () => {
    const stockLuly = await obtenerFiguritas("mundialUsa2026")
    StockFigusLuly(stockLuly, "mundialUsa2026")
})

const botonesSinStock = [
    {
        boton: "botonSinStockQatar",
        album: "mundialQatar2022"
    },
    {
        boton: "botonSinStockAmerica",
        album: "copaAmerica2024"
    },
    {
        boton: "botonSinStockUSA",
        album: "mundialUsa2026"
    },
    {
        boton: "botonSinStockFutArg23",
        album: "futbolArgentino2023"
    },
    {
        boton: "botonSinStockLibertadores23",
        album: "libertadores2023"
    },
    {
        boton: "botonSinStockFutArg24",
        album: "futbolArgentino2024"
    }
]

botonesSinStock.forEach(obj => {
    const boton = document.getElementById(obj.boton)
    boton?.addEventListener("click", async () => {
        const figus = await obtenerFiguritas(obj.album);
        sinStock(figus, obj.album)
    })
})


window.addEventListener("load", async () => {
    if (window.location.pathname.endsWith("/preguntasmeli.html")) {
        const preguntasMeli = await obtenerPreguntas()

        preguntasMercadolibre(preguntasMeli)
    }

})

console.log(window.location.pathname)
window.addEventListener("load", async () => {

    if (window.location.pathname.endsWith("/todaslaspublicaciones.html")) {
        todasLasPublicaciones()
    }
})



const actualizarVentas = async () => {
    
    const preguntasMDB = await obtenerPreguntasMDB()
    const ventasML = await obtenerVentasML()

    for (const pregunta of preguntasMDB) {
        if (pregunta.COMPRADO === false) {                
                
                const ventaFilt = ventasML.find(venta => 
                    venta.data.buyer_id === pregunta.BUYER_ID &&
                    venta.data.seller === pregunta.SELLER_ID &&
                    new Date(venta.data.date_created) > new Date(pregunta.FECHA) &&
                    venta.data.variante.some(variante => variante.mla === pregunta.MLA)
                ) 
                if (ventaFilt){
                    const figuritas = await obtenerFiguritas(pregunta.ALBUM_REAL)
                    await crearVenta(figuritas, pregunta.FIGUS_EN_STOCK, "ONLINE", seller_name(pregunta.SELLER_ID), pregunta.ALBUM_REAL, venta.data.total_amount, pregunta.FIGUS_SIN_STOCK, "Sin Dato", pregunta.ALBUM_REAL, api, venta.pack_id)
                    await actualizarPrecio2000(pregunta.MLA, pregunta.SELLER_ID)
                    await actualizarStock(pregunta.MLA, pregunta.SELLER_ID)
                    await setToComprado(pregunta._id)
                }
            
        }
    }
}
actualizarVentas()


botonesElementosNoVendidas.forEach(objeto => {
    const boton = document.getElementById(objeto.botonId)
    boton?.addEventListener('click', async () => {
        const figuritas = await obtenerFiguritas(objeto.album);
        const ventas = await obtenerVentas()
        noVendidas(figuritas, ventas, objeto.album)
    })
})

window.addEventListener("load", async () => {
    if (window.location.pathname.endsWith("/indexv2.html")) {
        const figuritas = await obtenerFiguritas("mundialUsa2026");
        const ventas = await obtenerVentas()
        noVendidas(figuritas, ventas, "mundialUsa2026")
    }

})

window.addEventListener("load", async () => {
    if (window.location.pathname.endsWith("/")) {
        const publicaciones = await obtenerTodasLasPublicaciones()
        const figuritas = await obtenerFiguritas("mundialUsa2026")
        for (const publi of publicaciones) {
            if ([1331424923778706,3406057476164753].includes(publi.body.family_id)) {
                let albumBdd;
                let figuId;
                for (const atributo of publi.body.attributes) {

                    if (atributo.id === "ALBUM_NAME") {
                        const { bdd } = nombrePublicacion(atributo.value_name)
                        albumBdd = bdd
                    }
                    if (atributo.id === "CHARACTER") {
                        figuId = atributo.value_name ==="00" ? "FWC0" : atributo.value_name
                    }
                }
                if (albumBdd && figuId) {
                    console.log(figuId)
                    
                    const figuEncontrada = figuritas.find(figu => figu.NUM === figuId)
                    let cant = getStockProveedores(figuEncontrada)
                    console.log(figuId," cant:",cant)
                    await actualizarStock(publi.body.id, publi.body.seller_id, cant)
                }
            }
        }
    }
})
