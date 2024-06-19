from bases import*
import random

base = baseCopamerica()

nombres = []
cont=0

nom = ''

for x in base:
    cont+=1
    if x["PRECIO"]>1500 or x["CANT"]>2:
        nombres.append(x["NOMBRE"])

# print(random.sample(nombres, 200))

rd = random.sample(nombres, 200)

for i in rd:
    z = i.capitalize()
    nom+=z+', '

print(nom)