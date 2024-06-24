from bases import*

base = baseCopamerica()

cant=0

vendidas=[]

for figu in base:
    if figu["CANT"]>2 and figu["TIPO"]=='COMUNES' :
        print(figu["NUM"],figu["NOMBRE"],figu["PRECIO"],figu["CANT"])
        cant+=1
        vendidas.append(figu["NUM"])
# for figu in base:
#     if cant>=61 and cant<100:
#         if figu["CANT"]>3 and figu["CANT"]<5 and figu["PRECIO"]==850 and figu["NUM"]!='URU22':
#             print(figu["NUM"],figu["NOMBRE"],figu["PRECIO"],figu["CANT"])
#             cant+=1
#             vendidas.append(figu["NUM"])

# for figu in base:
#     if cant>=96 and cant<100:
#         if figu["CANT"]>2 and figu["CANT"]<4 and figu["PRECIO"]==850:
#             print(figu["NUM"],figu["NOMBRE"],figu["PRECIO"],figu["CANT"])
#             cant+=1
#             vendidas.append(figu["NUM"])


print(cant)
print(sorted(vendidas))
            