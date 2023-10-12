import json

with open ("baseMundial.json","r") as baseJson:
    baseMundial = json.load(baseJson)

for linea in baseMundial:
    if linea["NUM"][:3]=="ARG":
        if linea["PRECIO"]==600:
            linea["PRECIO"]=850

for linea in baseMundial:
    if linea["NUM"][:3]=="ARG":
        print(linea)

with open ("baseMundial.json","w") as baseEditarJson:
    json.dump (baseMundial,baseEditarJson,indent=4)