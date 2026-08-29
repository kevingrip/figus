export const getProveedorMayorStock = (figu) => {
    return Object.entries(figu.STOCK).reduce(
        (mayor, [proveedor, datos]) =>
            (datos.CANT ?? 0) > (figu.STOCK[mayor]?.CANT ?? 0)
                ? proveedor
                : mayor,
        Object.keys(figu.STOCK)[0]
    );
};