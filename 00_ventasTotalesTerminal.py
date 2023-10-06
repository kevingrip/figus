import json
import easygui

with open ("totalVentas.json","r") as ventasJson:
    totalVentas = json.load(ventasJson)

ventasMundial = totalVentas["Mundial Qatar 2022"]
ventasLibertadores = totalVentas["Copa Libertadores 2023"]
ventasFutarg = totalVentas["Futbol Argentino 2023"]

ventasMundialLista = []

tipoVenta = easygui.buttonbox("Elija una opcion", choices = ["FLEX VERGUI","FLEX PELUCHE","FLEX MATI","FLEX KEVIN","TODAS LAS VENTAS"])

for fila in ventasMundial:
    if tipoVenta == "TODAS LAS VENTAS":
        print("Dia: ",fila["Dia"],"\n")
        print("Usuario: ",fila["usuario"])
        print("Cuenta: ",fila["Cuenta"])
        print("Envio: ",fila["Envio"])
        print("Etiqueta: ",fila["Etiqueta"])
        print("PrecioFlex: ",fila["PrecioFlex"],"\n")
        print("Vendidas: ",fila["Vendidas"],"\n")
        print("NoVendidas: ",fila["NoVendidas"],"\n")
        print("-----------------------------------------------------------------------------------------------","\n")
    elif fila["Envio"] == tipoVenta:
        print("Dia: ",fila["Dia"],"\n")
        print("Usuario: ",fila["usuario"])
        print("Cuenta: ",fila["Cuenta"])
        print("Envio: ",fila["Envio"])
        print("Etiqueta: ",fila["Etiqueta"])
        print("PrecioFlex: ",fila["PrecioFlex"],"\n")
        print("Vendidas: ",fila["Vendidas"],"\n")
        print("NoVendidas: ",fila["NoVendidas"],"\n")
        print("-----------------------------------------------------------------------------------------------","\n")
    