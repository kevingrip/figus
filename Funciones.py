from rename import *

import pyautogui

import webbrowser

#para java
def sacar_espacio(figu):
    nuevoFigu=''
    for caracter in figu:
        if caracter != ' ':
            nuevoFigu = nuevoFigu+caracter
    return nuevoFigu

#para java
def transformar(figuritas,lista,paises):
    figuritas=figuritas+','
    repositorio=''
    guardarPaises=''
    for caracter in figuritas:
        if caracter == ',':
            lista.append(repositorio)
            repositorio = ''
        else:
            if caracter in ('1234567890'):
                if len(guardarPaises)>0:
                    paises.append(guardarPaises)
                    repositorio=repositorio+caracter
                    guardarPaises = ''
            else:
                guardarPaises = guardarPaises+caracter
                repositorio=repositorio+caracter

def sacar_y(figu):

    f=''

    for i in figu:

        if i in ('Y'):

            f=f+','

        else:

            f=f+i

    return (f)
 
def separacion (figuritas):

 

    numeros='1234567890'
    figuritas_nuevo=''
    figuritas_nuevo_2=''

 

    for i in figuritas:
        if i==' ' and ant in numeros:
            figuritas_nuevo=figuritas_nuevo+'|'
        else:
            figuritas_nuevo=figuritas_nuevo+i
        if i in numeros:
            ant=i
        else:
            ant='x'

 

    for i in figuritas_nuevo:
        if i!=' ':
            figuritas_nuevo_2=figuritas_nuevo_2+i
    return figuritas_nuevo_2

def acomodar (fig,error,lista_paises):
    figu=fig+' '
    abecedario='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    numeros='1234567890'
    pais=''
    num=''
    lista=[]
    figur=''
    figur_invertido=''
    figur_inv=''
    ant=''
    paises=[]
    corregido=''
    paisesRename=[]
    
    for letra in figu:
        if letra in abecedario:
            pais=pais+letra
        if letra in numeros:
            if len(pais)>0:
                lista.append(pais)
                lista_paises.append(pais)
                pais=''
            num=num+letra
        if letra==' ' or letra in (',','/','-'):
            lista.append(num)
            num=''

    renamePaises(lista,lista_paises,paisesRename)

    for pais in lista_paises:
        if pais not in paisesRename:
            error.append(pais)

    for i in range(len(lista)):
        if len(lista[i])!=0:
            paises.append(lista[i])

    for i in paises:
        if i in lista_paises:
            figur=figur+i+' '
        else:
            figur=figur+i+','

    for i in figur:
        figur_invertido=i+figur_invertido

    for i in figur_invertido:
        if i==',' and ant in abecedario:
            figur_inv=' '+figur_inv
        else:
            figur_inv=i+figur_inv
        if i in abecedario:
            ant=i
        else:
            ant='0'

    for i in figur_inv:
        if len(corregido)!=len(figur_inv)-1:
            corregido=corregido+i

    return(corregido)

# abrir url
def abrir_url(url):
    try:
        webbrowser.open(url)
    except webbrowser.Error as e:
        print(f"No se pudo abrir la URL: {e}")

def usuario_ml (usuario_mercadolibre):
    validacion=True
    validacionNombre = True
    nombre=''
    usuario=''
    lista_usuario=[]


    for letra in usuario_mercadolibre:
        usuario_mercadolibre=usuario_mercadolibre+')'
        if letra=="(":
            validacion=False
        if validacion is True:
            if validacionNombre is True:
                if letra!=' ':
                    nombre += letra
                else:
                    validacionNombre = False
        if validacion is False:
            if letra!="(" and letra!=")":
                usuario=usuario+letra
    lista_usuario.append(nombre)
    lista_usuario.append(usuario)
    return lista_usuario

def nombreOriginal(listaFigu):
    listaFigu = listaFigu + '|'
    numerosPosibles = '01234567891011121314151617181920212223242526272829'
    abecedario = 'abcdefghijklmnñopqrstuvwxyz'
    abecedario = abecedario.upper()
    listaNueva = []
    pais = ''
    agregar = ''
    numero = ''

    for caracter in listaFigu:
        if caracter in abecedario:
            pais=pais+caracter
        if caracter == ',':
            agregar = pais+numero
            listaNueva.append(agregar)
            agregar = ''
            numero = ''
        if caracter in numerosPosibles:
            numero = numero+caracter
        if caracter == '|':
            agregar = pais+numero
            listaNueva.append(agregar)
            agregar = ''
            numero = ''
            pais = ''
    return listaNueva

def sacarPaisesDuplicados(lista,listaCorregida):

    listaInterna = []
    pais = ''
    
    for caracter in lista:
        if caracter == ' ':
            listaInterna.append(pais)
            pais=''
        else:
            pais +=caracter

    for pais in listaInterna:
        if pais not in listaCorregida:
            listaCorregida.append(pais)


def checkNum(lista):
    validacion=False
    for figurita in lista:
        if len(figurita)>=5:
            if figurita[:3] != 'FWC':
                if int(figurita[3:])>19:
                    validacion=True
                    print("Error",figurita)
            else:
                if int(figurita[3:])>29:
                    validacion=True
                    print("Error",figurita)
    if validacion == True:
        return(False)
    else:
        return(True)