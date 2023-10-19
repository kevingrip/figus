from hora import *
from mundial.sacarEspacioMundial import *
import json


def procesadorMundial(figuritas,nombre,baseMundial):

    with open(baseMundial, 'r') as archivo_json:
        datos = json.load(archivo_json)

    precio_total = 0
    exceptoFigu = ''
    tengo = ''
    cantidadTengo = 0
    cantidadFaltan = 0

    precio1Comun = 1000
    precio2Comun = 800
    precio3Comun = 750
    precioHasta5Comun = 700
    precioSoloComunes = 400

    precioUnidadDorada = 1350


    for fila in datos:
        if fila.get('NUM') in figuritas and int(fila.get('CANT')) > 0:
            precio_total += int(fila.get('PRECIO'))
            cantidadTengo += 1
            tengo += fila.get('NUM') + ', '
        else:
            if fila.get('NUM') in figuritas and int(fila.get('CANT')) == 0:
                exceptoFigu += fila.get('NUM') + ','
                cantidadFaltan += 1

    excepto = espacioFigu(exceptoFigu)

    if cantidadFaltan>1:
        falta='faltan'
    else:
        falta='falta'

    if cantidadTengo == 1:
        resto = ''
    else:
        resto = 'el resto las tengo todas.'


    if len(nombre)>0:
        nombre=" "+nombre

    if cantidadTengo == 0:
        respuesta="Hola"+nombre+", "+hora()+"! No las tengo en stock en este momento. Consultame nuevamente en estos dias por si ingresan, saludos!"
    else:
        if len(excepto)>0:
            if precio_total>=10000:
                if len(excepto) == 1:
                    respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+resto+" El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(precio_total) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación con envio gratis!"
                else:
                    respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+resto+" El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(precio_total) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación con envio gratis!"
            else:
                if (precio_total/cantidadTengo) == 300:
                    if (cantidadTengo == 1):
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+" El precio por la figurita original es " + str(cantidadTengo*precio1Comun) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 2):
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+resto+" El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(cantidadTengo*precio2Comun) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 3):
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+resto+" El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(cantidadTengo*precio3Comun) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo > 3 and cantidadTengo < 6): 
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+resto+" El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(cantidadTengo*precioHasta5Comun) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    else:
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+resto+" El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(cantidadTengo*precioSoloComunes) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                elif (precio_total/cantidadTengo) == 950:
                    if (cantidadTengo == 1):
                        respuesta="Hola"+nombre+", "+hora()+"! Tengo la "+tengo+"El precio por la figurita original es " + str(cantidadTengo*precioUnidadDorada) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 2):
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+" El precio por las "+str(cantidadTengo)+" figuritas originales es " + str(cantidadTengo*(precioUnidadDorada-50)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 3):
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+" El precio por las "+str(cantidadTengo)+" figuritas originales es " + str(cantidadTengo*(precioUnidadDorada-100)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 4):
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+" El precio por las "+str(cantidadTengo)+" figuritas originales es " + str(cantidadTengo*(precioUnidadDorada-150)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 5):
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+" El precio por las "+str(cantidadTengo)+" figuritas originales es " + str(cantidadTengo*(precioUnidadDorada-200)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 6):
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+" El precio por las "+str(cantidadTengo)+" figuritas originales es " + str(cantidadTengo*(precioUnidadDorada-250)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                else:
                    if cantidadTengo == 1:
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista tengo la "+tengo+"El precio por la figurita original es " + str(precio_total) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    else:
                        respuesta="Hola"+nombre+", "+hora()+"! De tu lista me "+falta+" "+excepto+resto+" El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(precio_total) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
        else:
            if precio_total>=10000:
                respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo todas en stock. El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(precio_total) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación con envio gratis!"
            else:
                if (precio_total/cantidadTengo) == 300:
                    if (cantidadTengo == 1):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, la tengo en stock. El precio es " + str(cantidadTengo*precio1Comun) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 2):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo todas en stock. El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(cantidadTengo*precio2Comun) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 3):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo todas en stock. El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(cantidadTengo*precio3Comun) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo > 3 and cantidadTengo < 6):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo todas en stock. El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(cantidadTengo*precioHasta5Comun) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    else:
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo todas en stock. El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(cantidadTengo*precioSoloComunes) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                elif precio_total == 950:
                    respuesta="Hola"+nombre+", "+hora()+"! Si, la tengo en stock. El precio es " + str(cantidadTengo*precioUnidadDorada) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                elif (precio_total/cantidadTengo) == 950:
                    if (cantidadTengo == 1):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, la tengo en stock. El precio es " + str(cantidadTengo*precioUnidadDorada) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 2):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo en stock. El precio es " + str(cantidadTengo*(precioUnidadDorada-50)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 3):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo en stock. El precio es " + str(cantidadTengo*(precioUnidadDorada-100)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 4):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo en stock. El precio es " + str(cantidadTengo*(precioUnidadDorada-150)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 5):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo en stock. El precio es " + str(cantidadTengo*(precioUnidadDorada-200)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    elif (cantidadTengo == 6):
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo en stock. El precio es " + str(cantidadTengo*(precioUnidadDorada-250)) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                else:
                    if cantidadTengo == 1:
                        respuesta="Hola"+nombre+", "+hora()+"! Si, la tengo en stock. El precio es " + str(precio_total) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"
                    else:
                        respuesta="Hola"+nombre+", "+hora()+"! Si, las tengo todas en stock. El precio por las "+ str(cantidadTengo) + " figuritas originales es " + str(precio_total) + ". Confirmame si te sirve y actualizo el precio para que puedas realizar la compra en esta misma publicación. Saludos!"

    return (respuesta)