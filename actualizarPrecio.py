import json

from bases import*

base = baseCopamerica()

for linea in base:
    if linea["TIPO"]=='LEYENDA DORADA' and linea["PRECIO"]==6000:
        linea["PRECIO"]=9000
        print(linea)

    

with open ("base_copam.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)