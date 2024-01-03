import json

with open ("baseMundial.json","r") as baseJson:
    baseLali = json.load(baseJson)

for linea in baseLali:
    if linea["PRECIO"]==300:
        linea["PRECIO"]=500


with open ("baseMundial.json","w") as baseEditarJson:
    json.dump (baseLali,baseEditarJson,indent=4)