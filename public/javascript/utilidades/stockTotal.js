export const getStockProveedores = (figu) =>{
    return Object.values(figu.STOCK).reduce((total, proveedor) => total + (proveedor.CANT ?? 0), 0)
}