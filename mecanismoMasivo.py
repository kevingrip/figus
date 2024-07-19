import json

with open ("totalVentas.json","r") as tv:
    totalVentas = json.load(tv)

totalfigus=[]

cant=0

for x in (totalVentas["Copa America 2024"]):
    if x["PREPARADO"]=="NO" and x["usuario"] not in ('NIJUMALA'):
        if x["Dia"]>"16/07/2024":
            for x in (x["Vendidas"]):            
                cant+=1
                totalfigus.append(x)

totalfigus=sorted(totalfigus)

pais=''

numeros = []

for x in totalfigus:
    print(x)

for x in totalfigus:
    if pais == '':
        pais=(x[:3])
    if x[:3] == pais:
        numeros.append(int(x[3:]))
    else:
        print(pais,sorted(numeros),"--------->",len(numeros),"Figuritas")
        pais=(x[:3])        
        numeros = []
        numeros.append(int(x[3:]))
    


print(cant)
print(totalfigus)