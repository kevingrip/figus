# import json
# from rename import paisOriginal
# import pyperclip


# with open ("baseMundial.json", "r") as bjs:
#     base = json.load(bjs)

# nuevaBase= ""

# cont=0

# for i in base:
#     pais = paisOriginal(i["NUM"][:3])
#     i["EQUIPO"] = pais
#     num = i["NUM"]
#     i["numID"] = cont
#     i["ALBUM"] = "Mundial Qatar 2022"
#     i["IMAGEN"] = f"../src/assets/album/{i['NUM'][:3]}/{i['NUM'][3:]}.png"
#     del i["DIA"]
#     del i["ACTUALIZACION"]
#     if i["TIPO"]!='COCA':
#         nuevaBase+=str(i)+","+"\n"
#         pyperclip.copy(nuevaBase)
#     cont+=1
# print(nuevaBase)



import json
import pyperclip


with open ("baseFutarg.json", "r") as bjs:
    base = json.load(bjs)

nuevaBase= ""
cont=0

for i in base:
    i["NUM"] = str(i["NUM"])
    i["ALBUM"] = "Futbol Argentino 2023"
    i["IMAGEN"] = ""
    # del i["ID"]
    i["numID"] = cont
    if i["TIPO"]!='COCA':
        nuevaBase+=str(i)+","+"\n"
        pyperclip.copy(nuevaBase)
    cont+=1
print(nuevaBase)