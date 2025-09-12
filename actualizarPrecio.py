import json

from bases import*

base = baseCopamerica()

for linea in base:
    if linea["TIPO"]=='COMUNES' and linea["PRECIO"]==2000:
        linea["PRECIO"]=1500
        print(linea)

    

with open ("base_copam.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)