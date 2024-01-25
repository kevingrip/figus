import json
from rename import *
import pyperclip
import easygui
import pyautogui

with open ("subidoML.json","r") as subido:
    cant = json.load(subido)

with open ("baseMundial.json","r") as bjson:
    baseMundial = json.load(bjson)


# for figurita in baseMundial:
#     if figurita["CANT"] > 1 and figurita["PRECIO"] == 650:
#         print(figurita)

seguir = True

ml=''

while seguir == True:

    opcion = easygui.buttonbox(ml, choices=["Avanzar","Salir"])

    if opcion == "Salir":
        seguir = False
    else:
        seguir = True
        for i in cant:
            i["SUBIDO"] +=1


    pais=''
    paisCorrecto=''
    vueltas=0

    for figurita in baseMundial:
        if figurita["PRECIO"] == 650:
            vueltas +=1
            pais = (figurita["NUM"][:3])
            paisOK = (paisOriginal(pais))
            if paisOK == 'FWC':
                print(paisOK)
            elif paisOK == None:
                print("COCA")
            else:
                paisCorrecto = (paisOK.capitalize())
            if len(figurita["NUM"]) ==4:
                figuritaNum = figurita["NUM"][:3]+"0"+figurita["NUM"][-1]
                num = "0"+figurita["NUM"][-1]
            else:
                figuritaNum=figurita["NUM"]
                num = figurita["NUM"][3:]
            if vueltas == i["SUBIDO"]:
                ml = (figuritaNum+" - "+paisCorrecto+" "+num+" - "+figurita["NOMBRE"])
                print(ml)
                pyperclip.copy(ml)
                pyautogui.hotkey("ctrl","v")

    with open ("subidoML.json","w") as sjs:
        json.dump(cant,sjs,indent=4)