from bases import *
import random

FIGUSALBUM = 150

baseft = baseFutarg24();

cant=0

cantLPF=0;
cantCOPA=0;
cantESCUDO=0;
cantCOMUNx1=0;
cantCOMUNx2=0;
cantCOMUNmay2=0;
cantSEMILLERO=0;
cantYPF=0;

figusOk=[]
randomX1=[]

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
    if i["TIPO"]=="COMUNES" and i["CANT"]==1:
        cantCOMUNx1+=1
        randomX1.append(i["NUM"])
    if i["TIPO"]=="COMUNES" and i["CANT"]==2:
        cantCOMUNx2+=1
        figusOk.append(i["NUM"])
    if i["TIPO"]=="COMUNES" and i["CANT"]>2:
        cantCOMUNmay2+=1
        figusOk.append(i["NUM"])
    if i["TIPO"]=="SEMILLERO" and i["CANT"]>0:
        cantSEMILLERO+=i["CANT"]
    if i["TIPO"]=="YPF" and i["CANT"]>0:
        cantYPF+=i["CANT"]



canti=0
while(canti<46):
    aleat= random.randint(0,61)
    if (randomX1[aleat] not in figusOk):
        figusOk.append(randomX1[aleat])
        canti+=1

print(sorted(figusOk))
print(len(figusOk))

for i in baseft:
    if (i["CANT"]>2) and i["NUM"] not in lista and i["NUM"] not in ("YPF6"):
        cant+=1
        lista.append(i["NUM"])



for i in baseft:
    if (i["CANT"]==2 and i["NUM"] not in ("YPF6","LPF1","LPF2","LPF3")):
        if (i["NUM"][:3]!='YPF'):
            restantes.append(i["NUM"])

print("LPF: ",cantLPF)
print("COPA: ",cantCOPA)
print("ESCUDO: ",cantESCUDO)
print("SEM: ",cantSEMILLERO)
print("YPF: ",cantYPF)
print("COMUNES x1: ",cantCOMUNx1)
print("COMUNES x2: ",cantCOMUNx2)
print("COMUNES >2: ",cantCOMUNmay2)


print("list",len(lista))
print("rest",len(restantes))

print("Cant Total: ", cantTotal)

agregado=0
while (cantTotal>FIGUSALBUM and agregado<FIGUSALBUM-cant):
    aleatorio= random.randint(0,len(restantes)-1)
    if restantes[aleatorio] not in lista:
        lista.append(restantes[aleatorio])
        agregado+=1
        # nuevas.append(restantes[aleatorio])

lista.sort()

listaOrdenada= sorted(lista, key=lambda x: (x[:3], int(x[3:])))


print(listaOrdenada)
print(len(lista))


