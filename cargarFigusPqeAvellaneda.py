import json
import easygui

with open ("pqeAmericaaa.json","r") as pam:
    base = json.load(pam)

choicesTot=['Salir']
chois = []
nb = []
nchois = []
numchoise=[]

for x in base:
    chois.append(x["NUM"])

choicesTot+=sorted(chois)

fig = easygui.buttonbox("fig", choices=choicesTot)

if fig == 'Salir':
        chois=[]

while chois:

    nchois=[]
    
    
    nb.append(fig)

    for s in choicesTot:
        if s not in nb:
            nchois.append(s)
    
    numchoise=[]
    
    for x in base:
        if x["NUM"] == fig:
            for n in range(0,x["SAQUE"]+1):
                numchoise.append(str(n))
            desc = int(easygui.buttonbox("DESCONTAR", choices=numchoise))
            x["TENGO"]=desc
            x["DESCONTAR"]=x['SAQUE']-desc
            print(x)
    
    choicesTot=nchois

    fig = easygui.buttonbox("fig", choices=choicesTot)

    if fig == 'Salir':
        chois=[]
print("guardado")

with open ("pqeAmericaaa.json","w") as pam:
    json.dump(base,pam,indent=4)