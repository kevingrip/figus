import json

from bases import*

base = baseMundial()


with open ("totalVentas.json","r") as vJson:
    totalVentas = json.load(vJson)

ventasMundial = totalVentas["Mundial Qatar 2022"]
ventasCopam = totalVentas["Copa America 2024"]
ventasLali = totalVentas["Copa Libertadores 2023"]

# for linea in ventasMundial:
#     if linea["usuario"]=='WILLY22':
#         if len(linea["NoVendidas"])>0: 
#             print('\n')
#             print(linea["usuario"])
#             print(linea["Dia"])
#             print("No vendidas:", linea["NoVendidas"])
#             noVendidas = linea["NoVendidas"]
#             for linea in baseMundial:
#                 if linea["NUM"] in noVendidas:
#                     if linea["CANT"]>0:
#                         print (linea)

str=''

precio=0

cant=0

tengo=[]
noTengo=[]

for linea in ventasMundial:
    if len(linea["NoVendidas"])>0:
        if linea["usuario"] == 'B001989':
            print(linea["Dia"],"\n",linea["usuario"])
            for x in linea["NoVendidas"]:
                for figu in base:
                        if figu["NUM"] == x:
                            if figu["CANT"] !=0:
                                tengo.append({'num':x,'CANT':figu['CANT'],'$':figu['PRECIO']})
                                str+=figu["NUM"]+', '
                                precio+=figu["PRECIO"]
                                cant+=1
                            else:
                                noTengo.append({'num':x,"CANT":figu["CANT"],'$':figu["PRECIO"]})
                                # str+=figu["NUM"]+', '
                                # precio+=figu["PRECIO"]
                                # cant+=1
            print("\n")



for x in tengo:
    print(x)


print("Tengo:")
print(str)
print('Precio:',precio)
print('Cant:',cant)

print("No Tengo:")
for x in noTengo:
    print(x['num'])