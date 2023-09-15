import json
import datetime

with open ("ventasFutarg.json","r") as leerJson:
    ventasFutarg = json.load(leerJson)

ventas = ventasFutarg["ventasFutarg"]

hoy = datetime.datetime.now().strftime("%d/%m/%Y")

for fila in ventas:
    if fila["Dia"] == hoy:
        print("\n")
        print(fila["usuario"])
        print("\n")
        print("Vendidas: ",fila["Vendidas"],"\n")
        print("NO Vendidas: ",fila["NoVendidas"])
        print("\n")