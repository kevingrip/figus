import json

from bases import*

base = baseCopamerica()

for linea in base:
    if linea["TIPO"]=='EQUIPO':
        linea["PRECIO"]=2000
        print(linea)

    

with open ("base_copam.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)