import json
import easygui

with open ('totalVentas.json','r') as tv:
    totalVentas = json.load(tv)

usuario = easygui.enterbox("Ingrese usuario")

for venta in totalVentas["Futbol Arg 2024"]:
    
    if (venta["usuario"]) ==usuario and venta["ARMADO"]=='NO':
        venta["ARMADO"]='SI'
        venta["PREARMADO"]='SI'
        print(venta)
    
with open ('totalVentas.json','w') as tv:
    json.dump(totalVentas,tv,indent=4)