import json

def procesadorFutarg(figuritas,baseDeDatos,excepto):

    with open(baseDeDatos,'r') as futargJson:
        datosFutarg = json.load(futargJson)

    tengo = ''
    cantidadTengo = 0
    cantidadNoTengo = 0
    precio = 0    

    for linea in datosFutarg:
        if linea.get("NUM") in figuritas:
            if linea.get("CANT") > 0:
                cantidadTengo +=1
                tengo += str(linea.get("NUM"))+', '
                precio += linea.get("PRECIO")
            else:
                cantidadNoTengo +=1
                excepto.append(linea["NUM"])
    

    print("\n")

    if (cantidadNoTengo == 0): 
        print("Hola! Si, las tengo todas. El precio por las ",str(cantidadTengo),"figuritas es ",str(precio),". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra")
    elif (cantidadNoTengo >= cantidadTengo):
        print("Hola! Tengo la ",tengo,"y el precio por las ",str(cantidadTengo),"figuritas es ",str(precio),". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra","\n")
        print("No tengo:", excepto)
    else:
        print("Hola! Tengo la ",tengo,"y el precio por las ",str(cantidadTengo),"figuritas es ",str(precio),". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra","\n")
        print("No tengo:", excepto)
        #print("Hola! Las tengo excepto la ",excepto,"y el precio por las ",str(cantidadTengo),"figuritas es ",str(precio),". Confirmame si te sirve y actualizo el precio de esta publicacion para tu compra")
    print("\n")