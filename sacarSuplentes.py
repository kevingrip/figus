from bases import *
import json
base = baseCopamerica()

with open ('suplentes.json','r') as sp:
    supl = json.load(sp)

suma=0

entero=2

for x in base:
    if (x["CANT"]>entero  and x["TIPO"]!='ESCUDO' and x["NUM"][:3]!='ARG' and x["TIPO"]!='LEYENDA DORADA') and suma<93:
        print(x["NUM"],x["CANT"]-entero)
        descontar = x["CANT"]-entero
        x["CANT"]-=descontar
        supl["nuevasSuplentes"]=supl["nuevasSuplentes"]+descontar
        suma+=descontar
        

print(suma)


with open ('base_copam.json',"w") as bcm:
    json.dump(base,bcm,indent=4)

# with open ('suplentes.json',"w") as sup:
#     json.dump(supl,sup,indent=4)