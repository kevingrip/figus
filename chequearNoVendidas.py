import json
with open("totalVentas.json","r") as ventasJson:
    ventasMundial = json.load(ventasJson)

ventasTotal = ventasMundial["Mundial Qatar 2022"]

for ventas in ventasTotal:
    if len(ventas['NoVendidas']) > 0:
        print(ventas['usuario'], ventas['NoVendidas'])

print('\n')

for ventas in ventasTotal:
    if len(ventas['NoVendidas']) > 0:
        if ventas["usuario"]=='MARUCHIDASCEN':
            noVendidas = ventas['NoVendidas']
            print(ventas['usuario'], ventas['NoVendidas'])

print('\n')

with open("baseMundial.json","r") as baseJson:
    baseMundial = json.load(baseJson)

for fila in baseMundial:
    for numero in noVendidas:
        if numero==fila["NUM"]:
            print(fila)