import json

from bases import*

base = baseFutarg()

for linea in base:
    if linea["PRECIO"]==800:
        linea["PRECIO"]=2000

for linea in base:
    print(linea)

with open ("baseFutarg.json","w") as baseEditarJson:
    json.dump (base,baseEditarJson,indent=4)