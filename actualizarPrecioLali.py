import json

with open ("baseLali.json","r") as baseJson:
    baseLali = json.load(baseJson)

for linea in baseLali:
    if linea["PRECIO"]==1200:
        linea["PRECIO"]=2500


with open ("baseLali.json","w") as baseEditarJson:
    json.dump (baseLali,baseEditarJson,indent=4)