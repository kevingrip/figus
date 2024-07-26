import json

with open ("totalVentas.json","r") as tv:
    totalVentas = json.load(tv)

totalfigus=[]

cant=0

for x in (totalVentas["Copa America 2024"]):
    if x["PREARMADO"]=="NO":
        if x["Dia"]>"24/07/2024":
            for x in (x["Vendidas"]):            
                cant+=1
                totalfigus.append(x)

totalfigus=sorted(totalfigus)

pais=''

numeros = []


for x in totalfigus:
    if pais == '':
        pais=(x[:3])
    if x[:3] == pais:
        numeros.append(int(x[3:]))
    else:
        print(" (",len(numeros),")",pais,sorted(numeros))
        pais=(x[:3])        
        numeros = []
        numeros.append(int(x[3:]))
print(" (",len(numeros),")",pais,sorted(numeros))
    


print(cant)
# print(totalfigus)