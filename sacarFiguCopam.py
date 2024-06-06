from bases import *
import json

bm = baseCopamerica()

cant=0

for figu in bm:
    if (figu["CANT"]>5):
        if figu["PRECIO"]==850:
            cant+=figu["CANT"]-6
            figu["CANT"] = figu["CANT"] - (figu["CANT"]-6)
            print(figu)

print(cant)

# with open ('base_copam.json','w') as bcm:
#     json.dump(bm,bcm,indent=4)