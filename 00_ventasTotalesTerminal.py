import json

with open ("totalVentas.json","r") as ventasJson:
    totalVentas = json.load(ventasJson)

ventasMundial = totalVentas["ventasMundial"]
ventasLibertadores = totalVentas["ventasLibertadores"]
ventasFutarg = totalVentas["ventasFutarg"]

ventasMundialLista = []

for fila in ventasMundial:
    print("Dia: ",fila["Dia"],"\n")
    print("Usuario: ",fila["usuario"])
    print("Cuenta: ",fila["Cuenta"])
    print("Envio: ",fila["Envio"])
    print("Etiqueta: ",fila["Etiqueta"])
    print("PrecioFlex: ",fila["PrecioFlex"],"\n")
    print("Vendidas: ",fila["Vendidas"],"\n")
    print("NoVendidas: ",fila["NoVendidas"],"\n")
    print("-----------------------------------------------------------------------------------------------","\n")
    