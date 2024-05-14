import json
from bases import*

with open ("pqeAmericaaa.json","r") as pam:
    base = json.load(pam)

basecopam = baseCopamerica()

for x in basecopam:
    for s in base:
        if(s["MAZO_POST"]>0):
            if s["NUM"] == x["NUM"]:
                x["CANT"]-=s["MAZO_POST"]
                print(x)

with open ("base_copam.json","w") as pam:
    json.dump(basecopam,pam,indent=4)