import json

from bases import*

base = baseMundial()

for linea in base:
    if linea["TIPO"]=='AFA' and linea["PRECIO"]==750 and linea["CANT"]>1:
        linea["PRECIO"]=3000
        print(linea)

    

with open ("baseMundial.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)