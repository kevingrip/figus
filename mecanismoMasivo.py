import json

with open ("totalVentas.json","r") as tv:
    totalVentas = json.load(tv)

totalfigus=[]

cant=0

for x in (totalVentas["Copa America 2024"]):
    if x["PREPARADO"]=="NO":
        if x["Dia"]>"11/07/2024":
            for x in (x["Vendidas"]):            
                cant+=1
                totalfigus.append(x)

totalfigus=sorted(totalfigus)

# for x in totalfigus:
#     print(x)

print(cant)
print(totalfigus)