# AGREGAR AL ALBUM EXTRA LAS QUE ESTAN REPETIDAS EN LA CAJA

import json

with open ("albumExtra.json","r") as alExtraJson:
    albumExtra = json.load(alExtraJson)

with open ("baseMundial.json","r") as bmJson:
    baseMundial = json.load(bmJson)

cantidad =0 

for linea in albumExtra:
    if linea["CANT"] == (1):
        for lin in baseMundial:
            if linea["NUM"] == lin["NUM"]:
                if lin["CANT"] >0:
                    lin["CANT"] -=1
                    linea["CANT"] +=1
                    print(linea)
                    cantidad+=1


print(cantidad)
                    

with open ("albumExtra.json","w") as alExtraJson:
    json.dump(albumExtra,alExtraJson,indent=4)

with open ("baseMundial.json","w") as bmJson:
    json.dump(baseMundial,bmJson,indent=4)