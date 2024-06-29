import json
import easygui

with open ("suplentes.json","r") as sup:
    supl = json.load(sup)

def descSupl(cantIng):
    cantPaq = int(easygui.enterbox("Ingrese cant paq"))
    cantPaq = cantPaq*5
    cantSup = cantIng - cantPaq
    supl["suplentes"]= supl["suplentes"]-cantSup
    print("Cantidad de suplentes en la cosecha: ",cantSup)
    print("Quedan: ",supl["suplentes"]," suplentes")

    # with open ("suplentes.json","w") as sup:
    #     json.dump(supl,sup,indent=4)