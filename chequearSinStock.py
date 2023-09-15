import json
with open("ventasMundial.json","r") as ventasJson:
    ventasMundial = json.load(ventasJson)

ventasTotal = ventasMundial["ventasMundial"]

for ventas in ventasTotal:
    if len(ventas['NoVendidas']) > 0:
        print(ventas['usuario'], ventas['NoVendidas'])