import json

with open ("albumExtra.json","r") as aExtraJson:
    albumExtra = json.load (aExtraJson)

with open ("baseMundial.json","r") as MundialJson:
    baseMundial = json.load (MundialJson)


for linea in albumExtra:
    if linea["CANT"] >0:
        for lin in baseMundial:
            if linea["NUM"] == lin["NUM"]:
                if lin ["CANT"] == 0:
                    print(lin)
                    lin ["CANT"] +=1
                    linea["CANT"] -=1

# with open ("albumExtra.json","w") as aExtraJson:
#     json.dump(albumExtra,aExtraJson,indent=4)

# with open ("baseMundial.json","w") as MundialJson:
#     json.dump(baseMundial,MundialJson,indent=4)

print("Cantidad agregada en BaseMundial y descontada en albumExtra")