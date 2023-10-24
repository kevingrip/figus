import json

with open ("baseFutarg.json","r") as baseJson:
    baseFutarg = json.load(baseJson)

for linea in baseFutarg:
    if linea["TIPO"] =="ESC":
        if linea["PRECIO"]==500:
            linea["PRECIO"]=800


with open ("baseFutarg.json","w") as baseEditarJson:
    json.dump (baseFutarg,baseEditarJson,indent=4)