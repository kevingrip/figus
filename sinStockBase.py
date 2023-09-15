import json
import pyperclip
import pyautogui
import time
from mundial.sacarEspacioMundial import *
import easygui

opciones = easygui.buttonbox("Elija una opción", choices=["Compra Panini", "Check sin stock"], title="Confirmación")

with open ("baseMundial.json","r") as figuJson:
    datosFigu = json.load(figuJson)

figus= ''

figusFinal = ''

contadorLenght = 0

cantidad = 0

if (opciones == "Compra Panini"):

    pyautogui.hotkey('alt','tab')



for linea in datosFigu: 
    if linea["CANT"] in (0,1) and linea["PRECIO"]>500:        
        if (opciones == "Compra Panini") and cantidad < 40:
            cantidad += 1
            if linea["NUM"] =="MRR1":
                time.sleep(0.5)
                pyperclip.copy("MAR1")
                print(linea["NUM"])
                pyautogui.hotkey('ctrl','v')
                time.sleep(0.5)
                pyautogui.press('tab')
                #figus += "MAR1" + ","
            elif linea["NUM"] =="FWC0":
                time.sleep(1)
                pyperclip.copy("CERO 0")
                print(linea["NUM"])
                pyautogui.hotkey('ctrl','v')
                time.sleep(1)
                pyautogui.press('tab')
                #figus += "FWC0" + ","
            else:
                time.sleep(0.5)
                pyperclip.copy(linea["NUM"])
                print(linea["NUM"])
                pyautogui.hotkey('ctrl','v')
                time.sleep(0.5)
                pyautogui.press('tab')
                #figus += linea["NUM"] + ","
            print (cantidad)

            figusNuevo = figus

            for c in figusNuevo:
                contadorLenght += 1
                if contadorLenght != len(figusNuevo)-1:
                    figusFinal += c

            print(figusFinal)
            
        else:
            figus += linea["NUM"] + ","

            figusNuevo = espacioFigu(figus)

            # for c in figusNuevo:
            #     print(c)
            #     contadorLenght += 1
            #     if contadorLenght != len(figusNuevo):
            #         figusFinal += c

print(figusNuevo)
