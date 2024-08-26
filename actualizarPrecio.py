import json

from bases import*

base = baseMundial()

for linea in base:
    if linea["TIPO"]=='FWCD' and linea["PRECIO"]==4500:
        linea["PRECIO"]=6000
        print(linea)

    

with open ("baseMundial.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)