import json
with open ("baseMundial.json","r") as bmJson:
    baseMundial = json.load(bmJson)

with open ("totalVentas.json","r") as vJson:
    totalVentas = json.load(vJson)

ventasMundial = totalVentas["Mundial Qatar 2022"]

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

for linea in ventasMundial:
    if len(linea["NoVendidas"])>0:
        if linea["Cuenta"] == 'LAFI GURITA':
            print(linea["Dia"],"\n",linea["usuario"])
            for x in linea["NoVendidas"]:
                for figu in baseMundial:
                    if figu["NUM"] == x:
                        print(x,"CANT:" ,figu["CANT"])
            print("\n")