import json
import easygui

with open ('totalVentas.json','r') as tv:
    totalVentas = json.load(tv)

for album in totalVentas:
    for venta in totalVentas[album]:
        
        if venta["ARMADO"]=='NO' and venta["PREARMADO"]=='NO' :
            venta["PREARMADO"]='SI'
            print(venta)
    
with open ('totalVentas.json','w') as tv:
    json.dump(totalVentas,tv,indent=4)