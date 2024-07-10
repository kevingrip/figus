import json
from bases import*

with open ("suplentes.json","r") as supt:
    sups = json.load(supt)

base = baseCopamerica()

cant=0

for x in sups:
    cant+=1
    for y in base:
        if x==y["NUM"]:
            if y["CANT"]<5:
                print(y)

print(cant)