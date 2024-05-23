import json

from bases import*

base = baseCopamerica()

for linea in base:
    if linea["TIPO"]=='ESCUDO' and linea["PRECIO"]==1500:
        linea["PRECIO"]=2000

for linea in base:
    print(linea)

with open ("base_copam.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)