import json

from bases import*

base = baseMundial()

for linea in base:
    if linea["TIPO"]=='Comunes' and linea["CANT"]>5:
        linea["PRECIO"]=750
        print(linea)

    

with open ("baseMundial.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)