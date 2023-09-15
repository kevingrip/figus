import json
import datetime

def nuevaVenta(baseVentas,usuario,vendidas,noVendidas,llaveVentas):
    with open(baseVentas,"r") as ventasLeerJson:
        cargarVenta = json.load(ventasLeerJson)

        dia = datetime.datetime.now().strftime("%d/%m/%Y")

        nuevaVenta = {"usuario": usuario, "Vendidas": vendidas, "NoVendidas": noVendidas, "Dia": dia}

        cargarVenta[llaveVentas].append(nuevaVenta)
                                    
    with open(baseVentas, 'w') as ventasEditarJSON:
        json.dump(cargarVenta, ventasEditarJSON, indent=4)