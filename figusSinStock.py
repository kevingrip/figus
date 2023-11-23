import json
from ordenarFigus import*

with open ("baseMundial.json","r") as baseJson:
    baseTotal = json.load(baseJson)

tabla = "NUM\n"
sumaPrecio = 0
faltantes = []
cantidad=0

for figurita in baseTotal:
    if figurita["CANT"] == (2) and figurita["PRECIO"] >800 and figurita["NUM"] not in ('FWC16', 'BRA3', 'BRA8', 'CAN2', 'CMR2', 'CMR3', 'CMR7', 'CRO3', 'CRO8', 'CRO10', 'CRO15', 'DEN12', 'DEN15', 'DEN18', 'ECU7', 'ENG2', 'ENG14', 'ESP4', 'ESP12', 'GER3', 'GHA4', 'GHA13', 'GHA14', 'GHA18', 'IRN9', 'JPN16', 'KOR11', 'KOR13', 'KSA2', 'KSA12', 'KSA18', 'KSA19', 'MEX11', 'MRR13', 'NED2', 'NED5', 'NED7', 'NED17', 'NED18', 'POR3', 'POR4', 'POR7', 'QAT3', 'QAT11', 'QAT13', 'QAT19', 'SEN7', 'SEN13', 'SUI3', 'SUI13', 'TUN7', 'URU2', 'URU6', 'URU15', 'USA6', 'WAL4', 'WAL8', 'WAL17', 'WAL18', 'CAN1', 'CMR1', 'CRC1', 'CRO1', 'MEX1', 'MRR1'):
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