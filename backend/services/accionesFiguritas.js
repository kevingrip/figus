import { obtenerModeloFiguritas } from "../models/modeloFigu.js";

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