import json
import easygui

with open ('totalVentas.json','r') as tv:
    totalVentas = json.load(tv)

usuario = easygui.enterbox("Ingrese usuario")

for album in totalVentas:
    for venta in totalVentas[album]:
    
        if (venta["usuario"]) ==usuario and venta["ARMADO"]=='NO':
            venta["ARMADO"]='SI'
            venta["PREARMADO"]='SI'
            print(venta)


    
with open ('totalVentas.json','w') as tv:
    json.dump(totalVentas,tv,indent=4)