from bases import *
import random

FIGUSALBUM = 150

baseft = baseFutarg24();

cant=0

cantLPF=0;
cantCOPA=0;
cantESCUDO=0;
cantCOMUN=0;
cantSEMILLERO=0;
cantYPF=0;

lista=[]
restantes=[]
nuevas=[]

cantTotal=0

for i in baseft:
    cantTotal+=i["CANT"]
    if i["TIPO"]=="LPF" and i["CANT"]>0:
        cantLPF+=i["CANT"]
    if i["TIPO"]=="COPA" and i["CANT"]>0:
        cantCOPA+=i["CANT"]
    if i["TIPO"]=="ESCUDO" and i["CANT"]>0:
        cantESCUDO+=i["CANT"]
    if i["TIPO"]=="COMUN" and i["CANT"]>0:
        cantCOMUN+=i["CANT"]
    if i["TIPO"]=="SEMILLERO" and i["CANT"]>0:
        cantSEMILLERO+=i["CANT"]
    if i["TIPO"]=="YPF" and i["CANT"]>0:
        cantYPF+=i["CANT"]


for i in baseft:
    if (i["CANT"]>1) and i["NUM"] not in lista:
        cant+=1
        lista.append(i["NUM"])
print(lista)
print(cant)

for i in baseft:
    if (i["CANT"]==1):
        if (i["NUM"][:3]!='YPF'):
            restantes.append(i["NUM"])

print("Cant Total: ", cantTotal)

agregado=0
while (cantTotal>FIGUSALBUM and agregado<FIGUSALBUM-cant):
    aleatorio= random.randint(0,len(restantes)-1)
    if restantes[aleatorio] not in lista:
        lista.append(restantes[aleatorio])
        agregado+=1
        # nuevas.append(restantes[aleatorio])

lista.sort()
print(lista)
print(len(lista))
print("nuevas:",nuevas)