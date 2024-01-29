import json
from rename import *
import pyperclip
import easygui
import pyautogui
import time

 
p=pyautogui
 
 
with open ("subidoML.json","r") as subido:
    cant = json.load(subido)
 
with open ("baseMundial.json","r") as bjson:
    baseMundial = json.load(bjson)
 
 
# for figurita in baseMundial:
#     if figurita["CANT"] > 1 and figurita["PRECIO"] == 650:
#         print(figurita)
 
seguir = True
 
ml=''
 
codigo="8018190030839"
 
p.hotkey("alt","tab")
 
carpeta = "C:/Users/Usuario/Documents/eCommerce/figuritas/src/assets/album/"
contador=0
 
opcion = easygui.buttonbox(ml, choices=["Avanzar","Salir"])
 
if opcion == "Salir":
    seguir = False
else:
    seguir = True
    for i in cant:
        i["SUBIDO"] +=1
 
 
 
while seguir == True:
 
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
                numReal = figurita["NUM"][-1]
            else:
                figuritaNum=figurita["NUM"]
                num = figurita["NUM"][3:]
                numReal = figurita["NUM"][3:]
            if vueltas == i["SUBIDO"]:
                ml = (figuritaNum+" - "+paisCorrecto+" "+num+" - "+figurita["NOMBRE"])
                print(ml+" "+ str(vueltas))
                pyperclip.copy(ml)
                pyautogui.hotkey("ctrl","v")
                time.sleep(0.5)
                p.hotkey("tab")
                time.sleep(0.5)
                p.press("enter")
                if numReal == "2":
                    time.sleep(2)
                    p.click(1500,190)
                    time.sleep(1)
                    pyperclip.copy(carpeta+figurita["NUM"][:3])
                    time.sleep(0.1)
                    pyautogui.hotkey("ctrl","v")
                    time.sleep(0.1)
                    p.press("enter")
                time.sleep(1)
                p.click(876,842)
                time.sleep(0.5)
                pyperclip.copy(numReal)
                pyautogui.hotkey("ctrl","v")
                time.sleep(0.1)
                p.press("enter")

                time.sleep(0.5)
                pyautogui.hotkey("end")
                time.sleep(0.5)
                pyautogui.hotkey("pageup")
                time.sleep(0.5)
                pyautogui.hotkey("pageup")
                time.sleep(0.5)
                pyautogui.hotkey("pageup")                

                time.sleep(1.5)
                p.doubleClick(943,315)
                pyperclip.copy(codigo)
                pyautogui.hotkey("ctrl","v")
                time.sleep(1)
                if numReal == "19":
                    seguir = False
                else:
                    p.click(389,750)
                    time.sleep(1)
                    p.press("up")
                    time.sleep(1)
                    p.click(825,207)
               
 
    for i in cant:
            i["SUBIDO"] +=1
   
 
    if seguir == False:
        for i in cant:
                i["SUBIDO"] -=1
 
    with open ("subidoML.json","w") as sjs:
        json.dump(cant,sjs,indent=4)