import json
from ordenarFigus import*

with open ("baseMundial.json","r") as baseJson:
    baseTotal = json.load(baseJson)

tabla = "NUM\n"
sumaPrecio = 0
faltantes = []
cantidad=0

for figurita in baseTotal:
    if figurita["CANT"] == (2) :
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

        mostrar = listaOrdenada(faltantes)

print("Cantidad:" ,cantidad)

#print(tabla)

print("Lista (  o menos ):")
print(mostrar)