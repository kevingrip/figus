import json
from bases import*


base = baseCopam()

suma=0
noTengo=""
total=0

for x in base:
    total+=1
    if x["CANT"]>0:
        suma+=1
    else:
        noTengo=noTengo+x["NUM"]+", "

print("No tengo: ",noTengo)

print('\n',"Total Tengo: ",suma*500)

print("Total Tengo: ",suma)
print(total)