import json
with open("totalVentas.json","r") as ventasJson:
    ventasMundial = json.load(ventasJson)

ventasTotal = ventasMundial["Copa Libertadores 2023"]

for ventas in ventasTotal:
    if len(ventas['NoVendidas']) > 0:
        print(ventas['usuario'], ventas['NoVendidas'])

print('\n')

for ventas in ventasTotal:
    if len(ventas['NoVendidas']) > 0:
        if ventas["usuario"]=='milfa1':
            noVendidas = ventas['NoVendidas']
            print(ventas['usuario'], ventas['NoVendidas'])

print('\n')

with open("baseLali.json","r") as baseJson:
    baseMundial = json.load(baseJson)

for fila in baseMundial:
    for numero in noVendidas:
        if numero==fila["NUM"]:
            print(fila)