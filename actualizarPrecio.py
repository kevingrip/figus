import json

with open ("baseMundial.json","r") as baseJson:
    baseMundial = json.load(baseJson)

for linea in baseMundial:
    if linea["PRECIO"]==1550:
        linea["PRECIO"]=1350

for linea in baseMundial:
    print(linea)

with open ("baseMundial.json","w") as baseEditarJson:
    json.dump (baseMundial,baseEditarJson,indent=4)