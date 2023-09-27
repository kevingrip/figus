import json


def procesadorLali(figuritas,baseDeDatos,figusNoTengo):

    with open(baseDeDatos,'r') as laliJson:
        datosLali = json.load(laliJson)

    cantidadTengo = 0
    cantidadNoTengo = 0
    cantidadTotal = 0
    tengo = ''
    precio = 0
    

    for lineas in datosLali:        
        if lineas.get("NUM") in (figuritas):
            cantidadTotal +=1
            if lineas.get("CANT") > 0:
                #print(lineas)
                cantidadTengo +=1
                tengo += lineas.get("NUM")+", "
                precio += lineas.get("PRECIO")
            else:
                cantidadNoTengo +=1
                figusNoTengo.append(lineas["NUM"])
                #print(lineas)
    print("\n","Hola! Tengo las siguientes: ",tengo,"y el precio es ",precio,". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra. Saludos !","\n")

    print("Tengo: ",cantidadTengo)
    print("No tengo: ",cantidadNoTengo)
    print("Total: ",cantidadTotal,"\n")
    print ("No tengo:" ,figusNoTengo,"\n")