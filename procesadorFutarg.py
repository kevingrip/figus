import json

def procesadorFutarg(figuritas,baseDeDatos):

    with open(baseDeDatos,'r') as futargJson:
        datosFutarg = json.load(futargJson)

    tengo = ''
    excepto = ''
    cantidadTengo = 0
    cantidadNoTengo = 0
    precio = 0    

    for linea in datosFutarg:
        if linea.get("NUM") in figuritas:
            print(linea)
            if linea.get("CANT") > 0:
                cantidadTengo +=1
                tengo += str(linea.get("NUM"))+', '
                precio += linea.get("PRECIO")
            else:
                cantidadNoTengo +=1
                excepto += str(linea.get("NUM"))+', '
    

    if (cantidadNoTengo == 0): 
        print("Hola! Si, las tengo todas. El precio por las ",str(cantidadTengo),"figuritas es ",str(precio),". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra")
    elif (cantidadNoTengo >= cantidadTengo):
        print("Hola! Tengo la ",tengo,"y el precio por las ",str(cantidadTengo),"figuritas es ",str(precio),". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra")
    else:
        print("Hola! Tengo la ",tengo,"y el precio por las ",str(cantidadTengo),"figuritas es ",str(precio),". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra")
        #print("Hola! Las tengo excepto la ",excepto,"y el precio por las ",str(cantidadTengo),"figuritas es ",str(precio),". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra")
    