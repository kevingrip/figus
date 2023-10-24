import json
with open ("baseMundial.json","r") as bmJson:
    baseMundial = json.load(bmJson)

with open ("totalVentas.json","r") as vJson:
    totalVentas = json.load(vJson)

ventasMundial = totalVentas["Mundial Qatar 2022"]

for linea in ventasMundial:
    if linea["usuario"]=='WILLY22':
        if len(linea["NoVendidas"])>0: 
            print('\n')
            print(linea["usuario"])
            print(linea["Dia"])
            print("No vendidas:", linea["NoVendidas"])
            noVendidas = linea["NoVendidas"]
            for linea in baseMundial:
                if linea["NUM"] in noVendidas:
                    if linea["CANT"]>0:
                        # linea["CANT"] -=1
                        print (linea)

# with open ("baseMundial.json","w") as bJson:
#     json.dump(baseMundial,bJson,indent=4)

# NoVendidas= ['CRC6', 'CRO17', 'GER1', 'KOR17', 'NED5', 'SRB1', 'TUN18']

# for linea in baseMundial:
#     if linea["NUM"] in NoVendidas:
#         if linea["CANT"]>0:
#             print (linea)