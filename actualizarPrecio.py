import json

from bases import*

base = baseCopamerica()

for linea in base:
    if linea["TIPO"]=='CIUDAD' and linea["PRECIO"]==3000 and linea["CANT"]>1:
        linea["PRECIO"]=6000
        print(linea)

    

with open ("base_copam.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)