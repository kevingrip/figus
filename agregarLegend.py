import json
import tkinter as tk  
import easygui
with open ("legends.json","r") as legendsJson:
    legends = json.load(legendsJson)

salir = False
sumaAgregarBase = 0
sumaAgregarBronze = 0
sumaAgregarSilver = 0
sumaAgregarGold = 0 



extras = []

for leyendas in legends:
    extras.append(leyendas["nombre"])

extras = sorted(extras)

extraElegido = easygui.buttonbox("Elija una leyenda", choices=extras, title="LEYENDAS")


while salir == False and extraElegido:

    agregarLegend = easygui.buttonbox("agregar Legend", choices=["BASE","BRONZE","SILVER","GOLD","CAMBIAR JUGADOR","SALIR"], title="Confirmación")

    if agregarLegend == "BASE":
        sumaAgregarBase +=1
    elif agregarLegend == "BRONZE":
        sumaAgregarBronze +=1
    elif agregarLegend == "SILVER":
        sumaAgregarSilver +=1
    elif agregarLegend == "GOLD":
        sumaAgregarGold +=1
    elif agregarLegend == "CAMBIAR JUGADOR":

        for leyendas in legends:
            if leyendas["nombre"]== extraElegido:
                leyendas["BASE"] += sumaAgregarBase
                leyendas["BRONZE"] += sumaAgregarBronze
                leyendas["SILVER"] += sumaAgregarSilver
                leyendas["GOLD"] += sumaAgregarGold

        with open ("legends.json","w") as legendsAgregarJson:
            json.dump(legends, legendsAgregarJson, indent=4)

        sumaAgregarBase = 0
        sumaAgregarBronze = 0
        sumaAgregarSilver = 0
        sumaAgregarGold = 0 

        extraElegido = easygui.buttonbox("Elija una leyenda", choices=extras, title="LEYENDAS")

        
    elif agregarLegend == "SALIR":

        for leyendas in legends:
            if leyendas["nombre"]== extraElegido:
                leyendas["BASE"] += sumaAgregarBase
                leyendas["BRONZE"] += sumaAgregarBronze
                leyendas["SILVER"] += sumaAgregarSilver
                leyendas["GOLD"] += sumaAgregarGold

        with open ("legends.json","w") as legendsAgregarJson:
            json.dump(legends, legendsAgregarJson, indent=4)

        salir = True