import json

with open ("baseMundial.json","r") as baseJson:
    baseTotal = json.load(baseJson)

tabla = "NUM\t\t\tCANT\t\tPRECIO\n"

for figurita in baseTotal:
    if figurita["CANT"] == 0:
        num = figurita["NUM"]
        cant = figurita["CANT"]
        precio = figurita["PRECIO"]
        total = f"{num}\t\t\t{cant}\t\t\t\t{precio}\n"

        tabla +=total

print(tabla)