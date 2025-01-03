import json
import easygui

with open ("totalVentas.json","r", encoding='utf-8') as tv:
    totalVentas = json.load(tv)

usuario = easygui.enterbox("Ingrese usuario")

for album in totalVentas:
    for venta in totalVentas[album]:
    
        if (venta["usuario"]) ==usuario and venta["ARMADO"]=='NO':
            venta["ARMADO"]='SI'
            venta["PREARMADO"]='SI'
            print(venta)


    
with open ('totalVentas.json','w', encoding='utf-8') as tv:
    json.dump(totalVentas,tv,indent=4)