import json
import pyperclip

with open ("albumExtra.json","r") as aExtraJson:
    albumExtra = json.load (aExtraJson)

with open ("baseMundial.json","r") as MundialJson:
    baseMundial = json.load (MundialJson)

nombre=''

num = ''

cont=0

if len(nombre)>0:
    for linea in baseMundial:
        if linea["NOMBRE"] == nombre:
            print(linea["NOMBRE"])
            print(linea["NUM"])
            print('\n',"Nombre Correcto",'\n')
            pyperclip.copy(linea["NUM"])
        elif nombre in linea["NOMBRE"]:
            print(linea["NOMBRE"],'-',linea["NUM"])
            cont+=1
    if cont>0:
        print('\n',"Corregir nombre y volver a ejecutar",'\n')


for linea in baseMundial:
    if linea["NOMBRE"] == nombre:

        if len(nombre)>0:

            validacion = False

            for linea in baseMundial:                    
                    if linea["NOMBRE"] == nombre:
                        print("Cantidad actual en BaseMundial:",linea["CANT"])
                        if linea["CANT"] < 5:
                            validacion = True
                            if linea["CANT"] == 0:
                                print("No disponible en la base general")
                        

            if validacion == True:
                for linea in albumExtra:
                    if linea["NOMBRE"] == nombre:
                        if linea["CANT"] < 2:          
                            print("Agregar al album",num)
                        else:
                            print("No agregar al album")
            else:
                print("No agregar al album")

if len(nombre)==0:
    for linea in albumExtra:
        if linea["NUM"] == num:
            if linea["CANT"] < 2:                
                linea["CANT"] +=1
                print(num,"agregado")
                print ("Cantidad: ",linea["CANT"])
            else:
                print(linea["NUM"])
                print("No agregar al album",'\n')
                for l in baseMundial:
                    if linea["NUM"] == l["NUM"]:
                        l["CANT"] +=1
                print("Figu agregada a baseMundial")
                with open ("baseMundial.json","w") as bmJson:
                    json.dump(baseMundial,bmJson,indent=4)

    with open ("albumExtra.json","w") as editarJson:
        json.dump(albumExtra,editarJson,indent=4)
elif len(num)>0:
    print("Borrar nombre para ingresar figuritas")