import json


def procesadorLali(figuritas,baseDeDatos):

    with open(baseDeDatos,'r') as laliJson:
        datosLali = json.load(laliJson)

    cantidadTengo = 0
    cantidadNoTengo = 0
    cantidadTotal = 0
    tengo = ''
    figusNoTengo = ''
    precio = 0
    

    for lineas in datosLali:        
        if lineas.get("NUM") in (figuritas):
            cantidadTotal +=1
            if lineas.get("CANT") > 0:
                print(lineas)
                cantidadTengo +=1
                tengo += lineas.get("NUM")+", "
                precio += lineas.get("PRECIO")
            else:
                cantidadNoTengo +=1
                figusNoTengo += lineas["NUM"] + ', '
                print(lineas)
    print("Hola! Tengo las siguientes: ",tengo,"y el precio es ",precio,". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra. Saludos !")

    print("Tengo: ",cantidadTengo)
    print("No tengo: ",cantidadNoTengo)
    print (figusNoTengo)
    print("Total: ",cantidadTotal)