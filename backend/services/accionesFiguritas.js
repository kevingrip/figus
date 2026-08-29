import { obtenerModeloFiguritas } from "../models/modeloFigu.js";
import { getProveedorMayorStock } from "../utilidades/cantidades.js";
import { nombrePublicacion } from "../utilidades/nombres.js";

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

export const getFiguritaIndividual = async(figu_NUM,album)=>{
    const nombreAlbum = nombrePublicacion(album)
    const album_figuritas = await getAlbumFiguritas(nombreAlbum.bdd)
    return await album_figuritas.find(figu=>
        figu.NUM === figu_NUM
    )
}