import json

with open ("baseLali.json","r") as baseJson:
    baseLali = json.load(baseJson)

for linea in baseLali:
    if linea["TIPO"]=='CL':
        if linea["PRECIO"]==200:
            linea["PRECIO"]=300


with open ("baseLali.json","w") as baseEditarJson:
    json.dump (baseLali,baseEditarJson,indent=4)