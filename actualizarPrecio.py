import json

from bases import*

base = baseMundial()

for linea in base:
    if linea["PRECIO"]==2500:
        linea["PRECIO"]=3500

for linea in base:
    print(linea)

with open ("baseMundial.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)