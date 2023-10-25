import json

with open ("baseMundial.json","r") as baseJson:
    baseTotal = json.load(baseJson)

tabla = "NUM\n"
sumaPrecio = 0
faltantes = []
cantidad=0

for figurita in baseTotal:
    if figurita["CANT"] == (0) and figurita["PRECIO"] <800:
        num = figurita["NUM"]
        cant = figurita["CANT"]
        precio = figurita["PRECIO"]
        tipo = figurita["TIPO"]
        #total = f"{num}\t\t\t{cant}\t\t\t\t{precio}\t\t\t\t{tipo}\n"
        total = f"{num}\n"
        cantidad +=1

        tabla +=total

        sumaPrecio += precio

        faltantes.append(figurita["NUM"])

print(tabla)

print(faltantes)

print(cantidad)