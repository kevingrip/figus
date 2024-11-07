import json

from bases import*

base = baseFutarg24()

for linea in base:
    if linea["TIPO"]=='ESP':
        linea["PRECIO"]=1500
        print(linea)

    

with open ("baseFutarg24.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)