import json

with open ("baseMundial.json","r") as baseJson:
    baseTotal = json.load(baseJson)

tabla = "NUM\t\t\tCANT\t\tPRECIO\t\tTIPO\n"
sumaPrecio = 0
faltantes = []

for figurita in baseTotal:
    if figurita["CANT"] ==1 and figurita["TIPO"] in ("FWC","ESC"):
        num = figurita["NUM"]
        cant = figurita["CANT"]
        precio = figurita["PRECIO"]
        tipo = figurita["TIPO"]
        total = f"{num}\t\t\t{cant}\t\t\t\t{precio}\t\t\t\t{tipo}\n"

        tabla +=total

        sumaPrecio += precio

        faltantes.append(figurita["NUM"])

print(tabla)

print(faltantes)