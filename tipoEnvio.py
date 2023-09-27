import json
import easygui

def envioFlex():
    with open("envios.json","r") as correoJson:
        correo = json.load(correoJson)
        

    return(correo["FLEX"])

def agregarFlex(etiquetaNueva):
    with open("envios.json","r") as correoJson:
        correo = json.load(correoJson)
    
    correoFlex = correo["FLEX"]

    correoFlex.append(etiquetaNueva)

    correo["FLEX"] = correoFlex

    with open("envios.json","w") as correoEditarJson:
        json.dump (correo,correoEditarJson,indent=4)

def tipoCorreo():
    with open("envios.json","r") as correoJson:
        correo = json.load(correoJson)

    etiquetasCorreo = []
        
    for etiqueta in correo:
        if etiqueta != "FLEX":
            etiquetasCorreo.append(etiqueta)

    return(etiquetasCorreo)

def etiquetaCorreo(tipo):
    with open("envios.json","r") as correoJson:
        correo = json.load(correoJson)
    
    etiquetas = correo[tipo]

    elegida = easygui.buttonbox("Ingrese etiqueta",choices=etiquetas, title="Etiquetas")

    return (elegida)

def agregarCorreo(tipoEtiqueta,etiquetaNueva):
    with open("envios.json","r") as correoJson:
        correo = json.load(correoJson)

    correo[tipoEtiqueta] = []

    agregarNuevo = correo[tipoEtiqueta]

    agregarNuevo.append(etiquetaNueva)

    correo[tipoEtiqueta] = agregarNuevo

    with open("envios.json","w") as correoEditarJson:
        json.dump (correo,correoEditarJson,indent=4)




