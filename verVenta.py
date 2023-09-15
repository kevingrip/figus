import json


def verVenta(usuario,base,llaveVentas):
    with open (base,"r") as ventasLeerJSON:
        ventasMundialTotal = json.load(ventasLeerJSON)

    ventasMundial = ventasMundialTotal[llaveVentas]

    for venta in ventasMundial:
        if venta["usuario"] == usuario:
            print (venta["usuario"])
            print("\n")
            print(venta["Vendidas"])