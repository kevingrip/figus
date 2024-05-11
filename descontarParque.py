from bases import*

base = baseMundial()

cantidad=0

figus = []

for x in base:
    if x["CANT"]>6 and x["NUM"]!='POR17' and x["NUM"]!='FWC0':
        if x["CANT"]-5>5:
            print(x["NUM"],5)
            cantidad+=5
            figus.append({'NUM':x["NUM"],'DESCONTADAS':5})
        else:
            print(x["NUM"],x["CANT"]-6)
            cantidad+=x["CANT"]-6
            figus.append({'NUM':x["NUM"],'DESCONTADAS':x["CANT"]-6})
        
        

print(cantidad)

print(figus)

with open ("pqeMundial.json","w") as pqjson:
    json.dump(figus,pqjson,indent=4)