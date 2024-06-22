import json

from bases import *

# base = baseMundial()
base = baseCopamerica()

paises=[]

pais=''

cantidad=0


for x in base:
    if len(pais)==0:
        pais = (x["NUM"][:3])
    if x["NUM"][:3] == pais:
        cantidad += x["CANT"]
    else:
        cantidad=x["CANT"]
        pais = x["NUM"][:3]
    print(x["NUM"],cantidad)

print(paises)