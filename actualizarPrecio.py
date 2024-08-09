import json

from bases import*

base = baseMundial()

for linea in base:
    if linea["TIPO"]=='Comunes' and linea["PRECIO"]==750:
        linea["PRECIO"]=1000
        print(linea)

    

with open ("baseMundial.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)