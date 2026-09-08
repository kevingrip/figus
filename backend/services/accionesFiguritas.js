import { obtenerModeloFiguritas } from "../models/modeloFigu.js";
import { getProveedorMayorStock } from "../utilidades/cantidades.js";
import { nombrePublicacion } from "../utilidades/nombres.js";
import { activarEstado, getPublicaciones, modificarPrecio } from "./mercadolibre/publicaciones.js";
import { Precios } from "../models/modeloAumentarPrecio.js";

export const obtenerCantidadFigurita = async (album, figu) => {

    const modelo = obtenerModeloFiguritas(album);

    const figuEncontrada = await modelo.findOne({
        NUM: figu
    }).lean();

    if (!figuEncontrada) {
        throw new Error(`Figurita ${figu} no encontrada`);
    }

    return Object.values(figuEncontrada.STOCK || {})
        .reduce(
            (total, proveedor) => total + (proveedor.CANT ?? 0),
            0
        );
};

export const getAlbumFiguritas = async (album) => {

    const modelo = obtenerModeloFiguritas(album);

    const figuritas = await modelo.find().lean();

    figuritas.sort((a, b) => {
        const matchA = a.NUM.match(/([A-Za-z]+)(\d+)/); // Separar letras y números
        const matchB = b.NUM.match(/([A-Za-z]+)(\d+)/);

        if (matchA && matchB) {
            const letraA = matchA[1];
            const numeroA = parseInt(matchA[2]);
            const letraB = matchB[1];
            const numeroB = parseInt(matchB[2]);

            // Primero ordenar por letra
            if (letraA !== letraB) {
                return letraA.localeCompare(letraB);
            }

            // Luego ordenar por número
            return numeroA - numeroB;
        }

        return a.NUM.localeCompare(b.NUM); // Si no coincide con el patrón, usar orden alfabético normal
    });

    return figuritas
}

export const getFiguritasMayores = async (album) => {
    const figuritas = await getAlbumFiguritas(album);
    const figuritas_ordenMayores = figuritas.sort((a, b) => {

        const cantidadA = Object.values(a.STOCK || {})
            .reduce(
                (total, proveedor) => total + (proveedor.CANT ?? 0),
                0
            );

        const cantidadB = Object.values(b.STOCK || {})
            .reduce(
                (total, proveedor) => total + (proveedor.CANT ?? 0),
                0
            );

        return cantidadB - cantidadA;
    });

    return figuritas_ordenMayores
}

export const descontarFiguritaMDB = async (album, figu, cantidad, venta) => {
    try {
        let cant = cantidad ? cantidad * -1 : -1;

        const modelo = await obtenerModeloFiguritas(album);
        const proveedor = getProveedorMayorStock(figu)

        const cantReal = `STOCK.${proveedor}.CANT`;
        const cantHistorica = `STOCK.${proveedor}.CANT_HISTORICA`;

        const inc = {
            [cantReal]: cant
        };

        // Si NO es una venta, modificar también la histórica
        if (venta !== true) {
            inc[cantHistorica] = cant;
        }

        const resultado = await modelo.findOneAndUpdate(
            { NUM: figu.NUM },
            { $inc: inc },
            { returnDocument: "after" }
        );

    } catch (error) {

        console.error(error);

    }
}

export const getFiguritaIndividual = async (figu_NUM, album) => {
    const nombreAlbum = nombrePublicacion(album)
    const album_figuritas = await getAlbumFiguritas(nombreAlbum.bdd)
    return await album_figuritas.find(figu =>
        figu.NUM === figu_NUM
    )
}
export const descontarVentaFiguritasMDB = async (album, figuritas) => {

    try {
        const modeloFiguritas = await obtenerModeloFiguritas(album)
        for (const figurita of figuritas) {
            const figuEncontrada = await modeloFiguritas.findOne({ NUM: figurita.NUM })
            if (figuEncontrada) {
                const proveedor = getProveedorMayorStock(figuEncontrada)
                if (proveedor && figuEncontrada.STOCK[proveedor].CANT > 0) {
                    figuEncontrada.STOCK[proveedor].CANT -= 1;
                    figuEncontrada.markModified('STOCK');
                    await figuEncontrada.save()
                }
            }
        }
    } catch (error) {
        console.error("No se pudo descontar las figuritas de la venta", error)
    }
}

const preciosEscudos = (publi) => {
    if (publi.family_id === 7115922794008337) {
        if (publi.available_quantity > 0 && publi.status != "active") {
            if (!["MLA3916353670","MLA2070411091"].includes(publi.id)){
                activarEstado(publi.id, publi.seller_id)
            }
        }
        else if (publi.figurita === "ARG1" || publi.figurita === "ESCUDOSELECCIÓNARGENTINA") {
            if (publi.available_quantity > 2 && publi.price != 9500) {
                modificarPrecio(publi.id, publi.seller_id, 9500)
            } else if (publi.available_quantity === 2 && publi.price != 11999) {
                modificarPrecio(publi.id, publi.seller_id, 11999)
            } else if (publi.available_quantity === 1 && publi.price != 15000) {
                modificarPrecio(publi.id, publi.seller_id, 15000)
            }
        } else {
            if (publi.available_quantity > 2 && publi.price != 3699) {
                modificarPrecio(publi.id, publi.seller_id, 3699)
            } else if (publi.available_quantity === 2 && publi.price != 5099) {
                modificarPrecio(publi.id, publi.seller_id, 5099)
            } else if (publi.available_quantity === 1 && publi.price != 6699) {
                modificarPrecio(publi.id, publi.seller_id, 6699)
            }
        }

    }
}

const preciosFWC = (publi) => {
    if (publi.family_id === 3406057476164753) {
        if (publi.available_quantity > 0 && publi.status != "active") {
            activarEstado(publi.id, publi.seller_id)
        }
        if (publi.figurita === "FWC19" || publi.figurita === "FWC14" || publi.figurita==="00") {
            if (publi.available_quantity > 2 && publi.price != 10499) {
                modificarPrecio(publi.id, publi.seller_id, 10499)
            } else if (publi.available_quantity === 2 && publi.price != 13999) {
                modificarPrecio(publi.id, publi.seller_id, 13999)
            } else if (publi.available_quantity === 1 && publi.price != 17999) {
                modificarPrecio(publi.id, publi.seller_id, 17999)
            }
        } else {
            if (publi.available_quantity > 2 && publi.price != 7999) {
                modificarPrecio(publi.id, publi.seller_id, 7999)
            } else if (publi.available_quantity === 2 && publi.price != 8999) {
                modificarPrecio(publi.id, publi.seller_id, 8999)
            } else if (publi.available_quantity === 1 && publi.price != 9999) {
                modificarPrecio(publi.id, publi.seller_id, 9999)
            }
        }        
    }
}

const preciosAFA = (publi) => {
    if (publi.family_id === 1331424923778706) {
        if (publi.available_quantity > 0 && publi.status != "active") {
            if (!["MLA3916353670","MLA2070411091"].includes(publi.id)){
                activarEstado(publi.id, publi.seller_id)
            }            
        }
        else if (publi.figurita === "ARG17") {
            if (publi.available_quantity > 2 && publi.price != 37000) {
                modificarPrecio(publi.id, publi.seller_id, 37000)
            } else if (publi.available_quantity === 2 && publi.price != 43000) {
                modificarPrecio(publi.id, publi.seller_id, 43000)
            } else if (publi.available_quantity === 1 && publi.price != 47000) {
                modificarPrecio(publi.id, publi.seller_id, 47000)
            }
        } else if (publi.figurita === "ARG1" || publi.figurita === "ESCUDOSELECCIÓNARGENTINA") {
            if (publi.available_quantity > 2 && publi.price != 9500) {
                modificarPrecio(publi.id, publi.seller_id, 9500)
            } else if (publi.available_quantity === 2 && publi.price != 11999) {
                modificarPrecio(publi.id, publi.seller_id, 11999)
            } else if (publi.available_quantity === 1 && publi.price != 15000) {
                modificarPrecio(publi.id, publi.seller_id, 15000)
            }
        }else {
            if (publi.available_quantity > 2 && publi.price != 5000) {
                modificarPrecio(publi.id, publi.seller_id, 5000)
            } else if (publi.available_quantity === 2 && publi.price != 7500) {
                modificarPrecio(publi.id, publi.seller_id, 7500)
            } else if (publi.available_quantity === 1 && publi.price != 11075) {
                modificarPrecio(publi.id, publi.seller_id, 11075)
            }
        }
    }
    
}

export const subirPrecioStock_1 = async () => {
    const publicaciones = await getPublicaciones();

    for (const publi of publicaciones) {
        if ([1331424923778706, 3406057476164753, 7115922794008337].includes(publi.family_id)) {

            preciosEscudos(publi)            
            preciosFWC(publi)
            preciosAFA(publi)

            // if (publi.available_quantity === 1) {

            //     const publicacion = publicacionesAuto.find(publicacion => publicacion.MLA === publi.id)

            //     if (!publicacion || publicacion.PRECIO_NUEVO === publi.price) {

            //         const nuevoPrecio = Number(publi.price) + 3000;
            //         try {
            //             await Precios.findOneAndUpdate(
            //                 { MLA: publi.id }, // Criterio de búsqueda para verificar si existe
            //                 {
            //                     PRECIO_ANT: publi.price,
            //                     PRECIO_NUEVO: nuevoPrecio
            //                 },
            //                 {
            //                     upsert: true, // Si no existe, lo crea
            //                     new: true,    // Devuelve el documento actualizado/creado
            //                     setDefaultsOnInsert: true
            //                 }
            //             )
            //             modificarPrecio(publi.id, publi.seller_id, nuevoPrecio)
            //             console.log("Se actualizo el precio de ",publi.id, " a ",nuevoPrecio)
            //         } catch (error) {
            //             console.error("No se pudo actualizar precio",error)
            //         }
            //     }

            // } else if (publi.available_quantity === 2) {
            //     const publicacion = publicacionesAuto.find(publicacion => publicacion.MLA === publi.id)

            //     if (!publicacion || publicacion.PRECIO_NUEVO == publi.price) {

            //         const nuevoPrecio = Number(publi.price) + 2000;
            //         await Precios.findOneAndUpdate(
            //             { MLA: publi.id }, // Criterio de búsqueda para verificar si existe
            //             {
            //                 PRECIO_ANT: publi.price,
            //                 PRECIO_NUEVO: nuevoPrecio
            //             },
            //             {
            //                 upsert: true, // Si no existe, lo crea
            //                 new: true,    // Devuelve el documento actualizado/creado
            //                 setDefaultsOnInsert: true
            //             }
            //         )
            //         modificarPrecio(publi.id, publi.seller_id, nuevoPrecio)
            //     }
            // } else if (publi.available_quantity > 2) {
            //     const publicacion = publicacionesAuto.find(publicacion => publicacion.MLA === publi.id)
            //     if (publicacion) {
            //         await modificarPrecio(publi.id, publi.seller_id, publicacion.PRECIO_ANT)
            //         await Precios.deleteOne({ MLA: publi.id })
            //     }
            // }


        }
    }
}