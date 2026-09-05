import { obtenerModeloFiguritas } from "../models/modeloFigu.js";
import { getProveedorMayorStock } from "../utilidades/cantidades.js";
import { nombrePublicacion } from "../utilidades/nombres.js";
import { getPublicaciones, modificarPrecio } from "./mercadolibre/publicaciones.js";
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

        console.log("ANTES:", await modelo.findOne({ NUM: figu.NUM }));

        const resultado = await modelo.findOneAndUpdate(
            { NUM: figu.NUM },
            { $inc: inc },
            { returnDocument: "after" }
        );

        console.log("DESPUÉS:", resultado);

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

export const subirPrecioStock_1 = async () => {
    const publicaciones = await getPublicaciones();

    for (const publi of publicaciones) {
        if ([1331424923778706, 3406057476164753, 7115922794008337].includes(publi.family_id)) {
            const publicacionesAuto = await Precios.find()

            if (publi.available_quantity === 1) {

                const publicacion = publicacionesAuto.find(publicacion => publicacion.MLA === publi.id)

                if (!publicacion || publicacion.PRECIO_NUEVO === publi.price) {

                    const nuevoPrecio = Number(publi.price) + 3000;
                    try {
                        await Precios.findOneAndUpdate(
                            { MLA: publi.id }, // Criterio de búsqueda para verificar si existe
                            {
                                PRECIO_ANT: publi.price,
                                PRECIO_NUEVO: nuevoPrecio
                            },
                            {
                                upsert: true, // Si no existe, lo crea
                                new: true,    // Devuelve el documento actualizado/creado
                                setDefaultsOnInsert: true
                            }
                        )
                        modificarPrecio(publi.id, publi.seller_id, nuevoPrecio)
                        console.log("Se actualizo el precio de ",publi.id, " a ",nuevoPrecio)
                    } catch (error) {
                        console.error("No se pudo actualizar precio",error)
                    }
                }

            } else if (publi.available_quantity === 2) {
                const publicacion = publicacionesAuto.find(publicacion => publicacion.MLA === publi.id)

                if (!publicacion || publicacion.PRECIO_NUEVO == publi.price) {

                    const nuevoPrecio = Number(publi.price) + 2000;
                    await Precios.findOneAndUpdate(
                        { MLA: publi.id }, // Criterio de búsqueda para verificar si existe
                        {
                            PRECIO_ANT: publi.price,
                            PRECIO_NUEVO: nuevoPrecio
                        },
                        {
                            upsert: true, // Si no existe, lo crea
                            new: true,    // Devuelve el documento actualizado/creado
                            setDefaultsOnInsert: true
                        }
                    )
                    modificarPrecio(publi.id, publi.seller_id, nuevoPrecio)
                }
            } else if (publi.available_quantity > 2) {
                const publicacion = publicacionesAuto.find(publicacion => publicacion.MLA === publi.id)
                if (publicacion) {
                    await modificarPrecio(publi.id, publi.seller_id, publicacion.PRECIO_ANT)
                    await Precios.deleteOne({ MLA: publi.id })
                }
            }


        }
    }
}