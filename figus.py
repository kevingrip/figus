from Funciones import *
from mundial.procesadorMundial import*
from descontarFigus import*
from conversor_libertadores import *
from procesadorLali import *
from controlFutarg import *
from procesadorFutarg import *
from preguntaUsuario import *
from contarBase import *
from verVenta import *
from nuevaVenta import *
from agregarStock import*
from cosechar import*
from ingresarDatosPantalla import*
from buscar_cosecha import*
import time
from bases import*
from actualizarFecha import *
import pyperclip
from CosecharStock import *

datosIngresar = []

agregarJson = ".json"


Vendidas = []
noVendidas = []
PreguntaNoTengo = []


#MUNDIAL 2022
usuariosMundial = "usuariosMundial"
baseMundial = "baseMundial.json"


#LIBERTADORES 2023
usuariosLibertadores = "usuariosLibertadores"
baseLibertadores = "baseLali.json"



#FUTBOL ARGENTINO 2023
usuariosFutarg = "usuariosFutarg"
baseFutarg = "baseFutarg.json"

usuariosCopam = "usuariosCopam"
baseCopam = "base_copam.json"

#FUTBOL ARGENTINO 2024
usuariosFut24 = "usuariosFut24"
baseFut24 = "baseFutarg24.json"


listaPaises = []
paisesError=[]

ventasTotal = "totalVentas.json"

subInicioHistorial="Ingresar Usuario"


album = easygui.buttonbox("Elija una opción", choices=["Mundial Qatar 2022", "Copa Libertadores 2023", "Futbol Argentino 2023", "Copa America 2024", "Futbol Arg 2024"], title="Confirmación")

if album in ("Mundial Qatar 2022", "Futbol Argentino 2023", "Copa Libertadores 2023", "Copa America 2024","Futbol Arg 2024"):

    inicio = easygui.buttonbox("Elija una opción", choices=["Preguntas", "Ventas","Base de datos"], title=album)
    

if (album == "Mundial Qatar 2022"):

    if inicio=="Preguntas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Pregunta", "Pregunta de Usuario"], title=album)

        if subInicio == "Nueva Pregunta":
        
            ingresarDatos(datosIngresar)

            usuario_mercadolibre = datosIngresar[0]
            figu = datosIngresar[1]

            figu = figu.upper()

            figu = sacar_y(figu)

            lista_usuario=(usuario_ml (usuario_mercadolibre))

            nombre=lista_usuario[0]
            usuario=lista_usuario[1]

            if nombre == "":
                nombre = ''
            
            if usuario == "":
                usuario = 'prueba'

            nombre = nombre.capitalize()

            print ("Nombre: ",nombre)
            print ("Usuario: ",usuario,"\n")

            
            validacionPaises = True

            figu = acomodar (figu,paisesError,listaPaises)
            
            listaFigu = separacion(figu)

            figulista = nombreOriginal(listaFigu)            
            
            figulista_sorted = sorted (figulista)

            #print(figulista_sorted)

            if len(paisesError)>0:
                validacionPaises = False
            else:
                ValidacionNum = checkNum(figulista,album)


            if validacionPaises == True and ValidacionNum == True:
                #mostrarFigusMundial(figulista_sorted) # hacer uno general

                print(procesadorMundial(figulista_sorted,nombre,baseMundial))

                nuevoUsuario = {"usuario": usuario, "figusPedidas": figulista_sorted}

                with open('usuariosMundial.json', 'r') as archivoUsuarios:
                    cargarUsuarios = json.load(archivoUsuarios)

                cargarUsuarios["usuariosMundial"].append(nuevoUsuario)
                                    
                with open('usuariosMundial.json', 'w') as archivoUsuarios:
                    json.dump(cargarUsuarios, archivoUsuarios, indent=4)
                
                pyperclip.copy(procesadorMundial(figulista_sorted,nombre,baseMundial))
            else:
                for pais in paisesError:
                    print ("ERROR: Corregir el pais", pais)
                
                pyperclip.copy(datosIngresar[0] + datosIngresar[1])

        elif subInicio == "Pregunta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            figusUsuario = preguntaUsuario(usuario_venta,usuariosMundial+agregarJson,usuariosMundial,baseMundial)

            if figusUsuario:
                verPreguntaUsuario = procesadorMundial(figusUsuario,usuario_venta,baseMundial)

                print(verPreguntaUsuario)       

    elif inicio == "Ventas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Historial","Nueva Venta"], title=album)

        if subInicio == "Nueva Venta":
            
            subInicioVenta = easygui.buttonbox("Elija una opción", choices=["Venta de usuario","Ingresar Figuritas","Legends"], title=album)

            if subInicioVenta == "Venta de usuario":

                usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")                

                descontarBaseJson(usuario_venta,usuariosMundial,baseMundial,Vendidas,noVendidas)

                nuevaVenta(usuario_venta,Vendidas,noVendidas,album)

                verVenta(usuario_venta,album,subInicioHistorial)

                actualizarFecha(usuario_venta)

            elif subInicioVenta == "Ingresar Figuritas":
                ingresarDatos(datosIngresar)

                usuario_mercadolibre = datosIngresar[0]
                figu = datosIngresar[1]

                figu = figu.upper()

                figu = sacar_y(figu)

                lista_usuario=(usuario_ml (usuario_mercadolibre))

                nombre=lista_usuario[0]
                usuario=lista_usuario[1]

                if nombre == "":
                    nombre = ''
                
                if usuario == "":
                    usuario = 'prueba'

                nombre = nombre.capitalize()

                print ("Nombre: ",nombre)
                print ("Usuario: ",usuario,"\n")

                
                validacionPaises = True

                figu = acomodar (figu,paisesError,listaPaises)

                listaFigu = separacion(figu)

                figulista = nombreOriginal(listaFigu)
                
                figulista_sorted = sorted (figulista)

                #print(figulista_sorted)

                if len(paisesError)>0:
                    validacionPaises = False
                else:
                    ValidacionNum = checkNum(figulista,album)


                if validacionPaises == True:

                    nuevoUsuario = {"usuario": usuario, "figusPedidas": figulista_sorted}

                    with open('usuariosMundial.json', 'r') as archivoUsuarios:
                        cargarUsuarios = json.load(archivoUsuarios)

                    cargarUsuarios["usuariosMundial"].append(nuevoUsuario)
                                        
                    with open('usuariosMundial.json', 'w') as archivoUsuarios:
                        json.dump(cargarUsuarios, archivoUsuarios, indent=4)

                    descontarBaseJson(usuario,usuariosMundial,baseMundial,Vendidas,noVendidas)

                    nuevaVenta(usuario,Vendidas,noVendidas,album)

                    verVenta(usuario,album,subInicioHistorial)

                    actualizarFecha(usuario)
                else:
                    for pais in paisesError:
                        print ("ERROR: Corregir el pais", pais)
            
            elif subInicioVenta == "Legends":

                with open ("legends.json","r") as legendsJson:
                    legends = json.load(legendsJson)

                jugadoresLegend=[]
                tipoLegend=[]
                
                for jugador in legends:
                    jugadoresLegend.append(jugador["nombre"])

                
                nombreLegend = easygui.choicebox("Elija un jugador", choices=jugadoresLegend, title="Confirmacion")
                tipoLegend = easygui.buttonbox("Elija un jugador", choices=["BASE","BRONZE","SILVER","GOLD"], title="Confirmacion")

                for datosJugador in legends: 
                    jugadorLegend = datosJugador["nombre"]           
                    if nombreLegend == datosJugador["nombre"]:
                        for linea in datosJugador:
                            if tipoLegend == linea:
                                datosJugador[tipoLegend] -= 1
                                print("Se ha descontado una figurita de tipo",tipoLegend,"al jugador",datosJugador["nombre"])
                                print(datosJugador)
                
                usuarioVenta = easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")
                
                nuevaVenta(usuarioVenta,nombreLegend,noVendidas,album)

                verVenta(usuarioVenta,album,subInicioHistorial)

                
                with open("legends.json", 'w') as legendsJson:
                    json.dump(legends, legendsJson, indent=4)

            
        elif subInicio == "Historial":

            subInicioHistorial = easygui.buttonbox("Elija una opcion", choices=["Ingresar Usuario","Ventas del dia"], title=album)

            if subInicioHistorial == "Ingresar Usuario":
                usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

                verVenta(usuario_venta,album,subInicioHistorial)
            else:
                usuario_venta=''
                verVenta(usuario_venta,album,subInicioHistorial)      

    elif inicio =="Base de datos":

        subInicioBDD = easygui.buttonbox("Elija una opción", choices=["Total de figuritas","Agregar Stock"], title=album)
    
        if subInicioBDD == "Total de figuritas":

            contarBase(baseMundial)

        elif subInicioBDD == "Agregar Stock":
            cantFigu = agregarStock(baseMundial)
            actualizarFecha(None)
                    
elif (album == "Copa Libertadores 2023"):

    if inicio=="Preguntas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Pregunta", "Pregunta de Usuario"], title=album)

        if subInicio == "Nueva Pregunta":
        
            ingresarDatos(datosIngresar)

            usuario_mercadolibre = datosIngresar[0]
            figu = datosIngresar[1]

            figuLali = conversorLibertadores(figu)

            
            with open("usuariosLibertadores.json","r") as laliJson:
                dataLibertadores = json.load(laliJson)

            listaUsuarioLali = (usuario_ml (usuario_mercadolibre))

            usuarioLali = listaUsuarioLali[1]

            nuevoUsuarioLali = {"usuario": usuarioLali, "figusPedidas": figuLali}

            dataLibertadores["usuariosLibertadores"].append(nuevoUsuarioLali)
                                    
            with open('usuariosLibertadores.json', 'w') as archivoUsuarios:
                json.dump(dataLibertadores, archivoUsuarios, indent=4) 

            procesadorLali(figuLali,baseLibertadores,PreguntaNoTengo)

            buscarCosecha(album,PreguntaNoTengo)

        elif subInicio == "Pregunta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            figusUsuario = preguntaUsuario(usuario_venta,usuariosLibertadores+agregarJson,usuariosLibertadores,baseLibertadores)

            procesadorLali(figusUsuario,baseLibertadores,PreguntaNoTengo)

            buscarCosecha(album,PreguntaNoTengo)

    elif inicio =="Ventas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Venta","Historial"], title=album)

        if subInicio == "Nueva Venta":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            descontarBaseJson(usuario_venta,usuariosLibertadores,baseLibertadores,Vendidas,noVendidas)

            nuevaVenta(usuario_venta,Vendidas,noVendidas,album)

            verVenta(usuario_venta,album,subInicioHistorial)

            actualizarFecha(usuario_venta)
        
        elif subInicio == 'Historial':

            subInicioHistorial = easygui.buttonbox("Elija una opción", choices=["Ingresar Usuario","Ventas del dia"], title=album)
            
            if subInicioHistorial == "Ingresar Usuario":

                usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

                verVenta(usuario_venta,album,subInicioHistorial)

            else:

                usuario_venta=''
                verVenta(usuario_venta,album,subInicioHistorial)

    elif inicio =="Base de datos":

        subInicioBDD = easygui.buttonbox("Elija una opción", choices=["Agregar Stock","Total de figuritas","Cosechar"], title=album)
    
        if subInicioBDD == "Total de figuritas":

            contarBase(baseLibertadores)
        
        elif subInicioBDD == "Agregar Stock":
            cantFigu = agregarStock(baseLibertadores)
            actualizarFecha(None)
        
        elif subInicioBDD == "Cosechar":
            ingresarDatos(datosIngresar)

            pilon = datosIngresar[0]
            figu = datosIngresar[1]

            figuLali = conversorLibertadores(figu)

            with open("cosechas.json","r") as cosechasJSON:
                agregarCosecha = json.load(cosechasJSON)
            
            nuevaCosecha = {"PILON":pilon,"NUMEROS":figuLali}

            agregarCosecha[album].append(nuevaCosecha)

            with open("cosechas.json","w") as AgregarcosechasJSON:
                json.dump(agregarCosecha,AgregarcosechasJSON,indent=4)

            print(figuLali,'\n')

            cosechar(figuLali,baseLibertadores)

elif (album == "Futbol Argentino 2023"):
    
    if inicio=="Preguntas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Pregunta", "Pregunta de Usuario"], title=album)

        if subInicio == "Nueva Pregunta":

            ingresarDatos(datosIngresar)

            usuario_mercadolibre = datosIngresar[0]
            figu = datosIngresar[1]

            figuFutarg = sorted(controlFutarg(figu))

            with open("usuariosFutarg.json","r") as futargJson:
                dataLibertadores = json.load(futargJson)

            listaUsuarioFutarg = (usuario_ml (usuario_mercadolibre))

            usuarioFutarg = listaUsuarioFutarg[1]

            nuevoUsuarioFutarg = {"usuario": usuarioFutarg, "figusPedidas": figuFutarg}

            dataLibertadores["usuariosFutarg"].append(nuevoUsuarioFutarg)
                                    
            with open('usuariosFutarg.json', 'w') as futJson:
                json.dump(dataLibertadores, futJson, indent=4) 

            procesadorFutarg(figuFutarg,baseFutarg,PreguntaNoTengo)

            buscarCosecha(album,PreguntaNoTengo)

        elif subInicio == "Pregunta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title=album)

            figusUsuario = preguntaUsuario(usuario_venta,usuariosFutarg+agregarJson,usuariosFutarg,baseFutarg)

            procesadorFutarg(figusUsuario,baseFutarg,PreguntaNoTengo)

            buscarCosecha(album,PreguntaNoTengo)

    elif inicio =="Ventas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Venta","Historial"], title=album)

        if subInicio == "Nueva Venta":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            descontarBaseJson(usuario_venta,usuariosFutarg,baseFutarg,Vendidas,noVendidas)

            nuevaVenta(usuario_venta,Vendidas,noVendidas,album)

            verVenta(usuario_venta,album,subInicioHistorial)

            actualizarFecha(usuario_venta)

        elif subInicio == 'Historial':

            subInicioHistorial = easygui.buttonbox("Elija una opción", choices=["Ingresar Usuario","Ventas del dia"], title=album)
            
            if subInicioHistorial == "Ingresar Usuario":

                usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

                verVenta(usuario_venta,album,subInicioHistorial)

            else:

                usuario_venta=''
                verVenta(usuario_venta,album,subInicioHistorial)

    elif inicio =="Base de datos":

        subInicioBDD = easygui.buttonbox("Elija una opción", choices=["Agregar Stock","Total de figuritas","Cosechar"], title=album)
    
        if subInicioBDD == "Total de figuritas":

            contarBase(baseFutarg)

        elif subInicioBDD == "Agregar Stock":
            cantFigu = agregarStock(baseFutarg)
            actualizarFecha(None)

        elif subInicioBDD == "Cosechar":
            ingresarDatos(datosIngresar)

            pilon = datosIngresar[0].upper()
            figu = datosIngresar[1]

            figuFutarg = controlFutarg(figu)

            with open("cosechas.json","r") as cosechasJSON:
                agregarCosecha = json.load(cosechasJSON)
            
            nuevaCosecha = {"PILON":pilon,"NUMEROS":figuFutarg}

            agregarCosecha[album].append(nuevaCosecha)

            with open("cosechas.json","w") as AgregarcosechasJSON:
                json.dump(agregarCosecha,AgregarcosechasJSON,indent=4)

            #print(figuFutarg,'\n')

            cosechar(figuFutarg,baseFutarg)
elif (album == "Copa America 2024"):

    if inicio=="Preguntas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Pregunta", "Pregunta de Usuario"], title=album)

        if subInicio == "Nueva Pregunta":
        
            ingresarDatos(datosIngresar)

            usuario_mercadolibre = datosIngresar[0]
            figu = datosIngresar[1]

            figu = figu.upper()

            figu = sacar_y(figu)

            lista_usuario=(usuario_ml (usuario_mercadolibre))

            nombre=lista_usuario[0]
            usuario=lista_usuario[1]

            if nombre == "":
                nombre = ''
            
            if usuario == "":
                usuario = 'prueba'

            nombre = nombre.capitalize()

            print ("Nombre: ",nombre)
            print ("Usuario: ",usuario,"\n")

            
            validacionPaises = True

            figu = acomodar (figu,paisesError,listaPaises)
            
            listaFigu = separacion(figu)

            figulista = nombreOriginal(listaFigu)            
            
            figulista_sorted = sorted (figulista)

            #print(figulista_sorted)

            if len(paisesError)>0:
                validacionPaises = False
            else:
                ValidacionNum = checkNum(figulista,album)


            if validacionPaises == True and ValidacionNum == True:
                #mostrarFigusMundial(figulista_sorted) # hacer uno general

                print(procesadorMundial(figulista_sorted,nombre,baseCopam))

                nuevoUsuario = {"usuario": usuario, "figusPedidas": figulista_sorted}

                with open('usuariosCopam.json', 'r') as archivoUsuarios:
                    cargarUsuarios = json.load(archivoUsuarios)

                cargarUsuarios["usuariosCopam"].append(nuevoUsuario)
                                    
                with open('usuariosCopam.json', 'w') as archivoUsuarios:
                    json.dump(cargarUsuarios, archivoUsuarios, indent=4)
                
                pyperclip.copy(procesadorMundial(figulista_sorted,nombre,baseCopam))
            else:
                for pais in paisesError:
                    print ("ERROR: Corregir el pais", pais)
                
                pyperclip.copy(datosIngresar[0] + datosIngresar[1])

        elif subInicio == "Pregunta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            figusUsuario = preguntaUsuario(usuario_venta,usuariosCopam+agregarJson,usuariosCopam,baseCopam)

            if figusUsuario:
                verPreguntaUsuario = procesadorMundial(figusUsuario,usuario_venta,baseCopam)

                print(verPreguntaUsuario)       

    elif inicio == "Ventas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Historial","Nueva Venta"], title=album)

        if subInicio == "Nueva Venta":
            
            subInicioVenta = easygui.buttonbox("Elija una opción", choices=["Venta de usuario","Ingresar Figuritas","Legends"], title=album)

            if subInicioVenta == "Venta de usuario":

                usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")                

                descontarBaseJson(usuario_venta,usuariosCopam,baseCopam,Vendidas,noVendidas)

                nuevaVenta(usuario_venta,Vendidas,noVendidas,album)

                verVenta(usuario_venta,album,subInicioHistorial)

                actualizarFecha(usuario_venta)

            elif subInicioVenta == "Ingresar Figuritas":
                ingresarDatos(datosIngresar)

                usuario_mercadolibre = datosIngresar[0]
                figu = datosIngresar[1]

                figu = figu.upper()

                figu = sacar_y(figu)

                lista_usuario=(usuario_ml (usuario_mercadolibre))

                nombre=lista_usuario[0]
                usuario=lista_usuario[1]

                if nombre == "":
                    nombre = ''
                
                if usuario == "":
                    usuario = 'prueba'

                nombre = nombre.capitalize()

                print ("Nombre: ",nombre)
                print ("Usuario: ",usuario,"\n")

                
                validacionPaises = True

                figu = acomodar (figu,paisesError,listaPaises)

                listaFigu = separacion(figu)

                figulista = nombreOriginal(listaFigu)
                
                figulista_sorted = sorted (figulista)

                #print(figulista_sorted)

                if len(paisesError)>0:
                    validacionPaises = False
                else:
                    ValidacionNum = checkNum(figulista,album)

                if validacionPaises == True and ValidacionNum == True:

                    nuevoUsuario = {"usuario": usuario, "figusPedidas": figulista_sorted}

                    with open('usuariosCopam.json', 'r') as archivoUsuarios:
                        cargarUsuarios = json.load(archivoUsuarios)

                    cargarUsuarios["usuariosCopam"].append(nuevoUsuario)
                                        
                    with open('usuariosCopam.json', 'w') as archivoUsuarios:
                        json.dump(cargarUsuarios, archivoUsuarios, indent=4)

                    descontarBaseJson(usuario,usuariosCopam,baseCopam,Vendidas,noVendidas)

                    nuevaVenta(usuario,Vendidas,noVendidas,album)

                    verVenta(usuario,album,subInicioHistorial)

                    actualizarFecha(usuario)
                else:
                    for pais in paisesError:
                        print ("ERROR: Corregir el pais", pais)
            
            elif subInicioVenta == "Legends":

                with open ("legends.json","r") as legendsJson:
                    legends = json.load(legendsJson)

                jugadoresLegend=[]
                tipoLegend=[]
                
                for jugador in legends:
                    jugadoresLegend.append(jugador["nombre"])

                
                nombreLegend = easygui.choicebox("Elija un jugador", choices=jugadoresLegend, title="Confirmacion")
                tipoLegend = easygui.buttonbox("Elija un jugador", choices=["BASE","BRONZE","SILVER","GOLD"], title="Confirmacion")

                for datosJugador in legends: 
                    jugadorLegend = datosJugador["nombre"]           
                    if nombreLegend == datosJugador["nombre"]:
                        for linea in datosJugador:
                            if tipoLegend == linea:
                                datosJugador[tipoLegend] -= 1
                                print("Se ha descontado una figurita de tipo",tipoLegend,"al jugador",datosJugador["nombre"])
                                print(datosJugador)
                
                usuarioVenta = easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")
                
                nuevaVenta(usuarioVenta,nombreLegend,noVendidas,album)

                verVenta(usuarioVenta,album,subInicioHistorial)

                
                with open("legends.json", 'w') as legendsJson:
                    json.dump(legends, legendsJson, indent=4)

            
        elif subInicio == "Historial":

            subInicioHistorial = easygui.buttonbox("Elija una opcion", choices=["Ingresar Usuario","Ventas del dia"], title=album)

            if subInicioHistorial == "Ingresar Usuario":
                usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

                verVenta(usuario_venta,album,subInicioHistorial)
            else:
                usuario_venta=''
                verVenta(usuario_venta,album,subInicioHistorial)      

    elif inicio =="Base de datos": 

        subInicioBDD = easygui.buttonbox("Elija una opción", choices=["Agregar Stock","Total de figuritas","Cosechar"], title=album)
    
        if subInicioBDD == "Total de figuritas":

            contarBase(baseCopam)

        elif subInicioBDD == "Agregar Stock":
            cantFigu = agregarStock(baseCopam)
            actualizarFecha(None)
        elif subInicioBDD == "Cosechar":
            cosecharStock(baseCopam)
            actualizarFecha(None)
elif (album == "Futbol Arg 2024"):

    if inicio=="Preguntas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Pregunta", "Pregunta de Usuario"], title=album)

        if subInicio == "Nueva Pregunta":
        
            ingresarDatos(datosIngresar)

            usuario_mercadolibre = datosIngresar[0]
            figu = datosIngresar[1]

            figu = figu.upper()

            figu = sacar_y(figu)

            lista_usuario=(usuario_ml (usuario_mercadolibre))

            nombre=lista_usuario[0]
            usuario=lista_usuario[1]

            if nombre == "":
                nombre = ''
            
            if usuario == "":
                usuario = 'prueba'

            nombre = nombre.capitalize()

            print ("Nombre: ",nombre)
            print ("Usuario: ",usuario,"\n")

            
            validacionPaises = True

            figu = acomodar (figu,paisesError,listaPaises)
            
            listaFigu = separacion(figu)

            figulista = nombreOriginal(listaFigu)            
            
            figulista_sorted = sorted (figulista)

            #print(figulista_sorted)

            if len(paisesError)>0:
                validacionPaises = False
            else:
                ValidacionNum = checkNum(figulista,album)


            if validacionPaises == True and ValidacionNum == True:
                #mostrarFigusMundial(figulista_sorted) # hacer uno general

                print(procesadorMundial(figulista_sorted,nombre,baseFut24))

                nuevoUsuario = {"usuario": usuario, "figusPedidas": figulista_sorted}

                with open('usuariosFut24.json', 'r') as archivoUsuarios:
                    cargarUsuarios = json.load(archivoUsuarios)

                cargarUsuarios["usuariosFut24"].append(nuevoUsuario)
                                    
                with open('usuariosFut24.json', 'w') as archivoUsuarios:
                    json.dump(cargarUsuarios, archivoUsuarios, indent=4)
                
                pyperclip.copy(procesadorMundial(figulista_sorted,nombre,baseFut24))
            else:
                for pais in paisesError:
                    print ("ERROR: Corregir el pais", pais)
                
                pyperclip.copy(datosIngresar[0] + datosIngresar[1])

        elif subInicio == "Pregunta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            figusUsuario = preguntaUsuario(usuario_venta,usuariosFut24+agregarJson,usuariosFut24,baseFut24)

            if figusUsuario:
                verPreguntaUsuario = procesadorMundial(figusUsuario,usuario_venta,baseFut24)

                print(verPreguntaUsuario)       

    elif inicio == "Ventas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Historial","Nueva Venta"], title=album)

        if subInicio == "Nueva Venta":
            
            subInicioVenta = easygui.buttonbox("Elija una opción", choices=["Venta de usuario","Ingresar Figuritas","Legends"], title=album)

            if subInicioVenta == "Venta de usuario":

                usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")                

                descontarBaseJson(usuario_venta,usuariosFut24,baseFut24,Vendidas,noVendidas)

                nuevaVenta(usuario_venta,Vendidas,noVendidas,album)

                verVenta(usuario_venta,album,subInicioHistorial)

                actualizarFecha(usuario_venta)

            elif subInicioVenta == "Ingresar Figuritas":
                ingresarDatos(datosIngresar)

                usuario_mercadolibre = datosIngresar[0]
                figu = datosIngresar[1]

                figu = figu.upper()

                figu = sacar_y(figu)

                lista_usuario=(usuario_ml (usuario_mercadolibre))

                nombre=lista_usuario[0]
                usuario=lista_usuario[1]

                if nombre == "":
                    nombre = ''
                
                if usuario == "":
                    usuario = 'prueba'

                nombre = nombre.capitalize()

                print ("Nombre: ",nombre)
                print ("Usuario: ",usuario,"\n")

                
                validacionPaises = True

                figu = acomodar (figu,paisesError,listaPaises)

                listaFigu = separacion(figu)

                figulista = nombreOriginal(listaFigu)
                
                figulista_sorted = sorted (figulista)

                #print(figulista_sorted)

                if len(paisesError)>0:
                    validacionPaises = False
                else:
                    ValidacionNum = checkNum(figulista,album)

                if validacionPaises == True and ValidacionNum == True:

                    nuevoUsuario = {"usuario": usuario, "figusPedidas": figulista_sorted}

                    with open('usuariosFut24.json', 'r') as archivoUsuarios:
                        cargarUsuarios = json.load(archivoUsuarios)

                    cargarUsuarios["usuariosFut24"].append(nuevoUsuario)
                                        
                    with open('usuariosFut24.json', 'w') as archivoUsuarios:
                        json.dump(cargarUsuarios, archivoUsuarios, indent=4)

                    descontarBaseJson(usuario,usuariosFut24,baseFut24,Vendidas,noVendidas)

                    nuevaVenta(usuario,Vendidas,noVendidas,album)

                    verVenta(usuario,album,subInicioHistorial)

                    actualizarFecha(usuario)
                else:
                    for pais in paisesError:
                        print ("ERROR: Corregir el pais", pais)
            
            elif subInicioVenta == "Legends":

                with open ("legends.json","r") as legendsJson:
                    legends = json.load(legendsJson)

                jugadoresLegend=[]
                tipoLegend=[]
                
                for jugador in legends:
                    jugadoresLegend.append(jugador["nombre"])

                
                nombreLegend = easygui.choicebox("Elija un jugador", choices=jugadoresLegend, title="Confirmacion")
                tipoLegend = easygui.buttonbox("Elija un jugador", choices=["BASE","BRONZE","SILVER","GOLD"], title="Confirmacion")

                for datosJugador in legends: 
                    jugadorLegend = datosJugador["nombre"]           
                    if nombreLegend == datosJugador["nombre"]:
                        for linea in datosJugador:
                            if tipoLegend == linea:
                                datosJugador[tipoLegend] -= 1
                                print("Se ha descontado una figurita de tipo",tipoLegend,"al jugador",datosJugador["nombre"])
                                print(datosJugador)
                
                usuarioVenta = easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")
                
                nuevaVenta(usuarioVenta,nombreLegend,noVendidas,album)

                verVenta(usuarioVenta,album,subInicioHistorial)

                
                with open("legends.json", 'w') as legendsJson:
                    json.dump(legends, legendsJson, indent=4)

            
        elif subInicio == "Historial":

            subInicioHistorial = easygui.buttonbox("Elija una opcion", choices=["Ingresar Usuario","Ventas del dia"], title=album)

            if subInicioHistorial == "Ingresar Usuario":
                usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

                verVenta(usuario_venta,album,subInicioHistorial)
            else:
                usuario_venta=''
                verVenta(usuario_venta,album,subInicioHistorial)      

    elif inicio =="Base de datos": 

        subInicioBDD = easygui.buttonbox("Elija una opción", choices=["Agregar Stock","Total de figuritas","Cosechar"], title=album)
    
        if subInicioBDD == "Total de figuritas":

            contarBase(baseFut24)

        elif subInicioBDD == "Agregar Stock":
            cantFigu = agregarStock(baseFut24)
            actualizarFecha(None)
        elif subInicioBDD == "Cosechar":
            cosecharStock(baseFut24)
            actualizarFecha(None)

