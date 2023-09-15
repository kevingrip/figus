from Funciones import *
from mundial.procesadorMundial import*
from descontarFigus import*
from actualizarGoogle import *
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

import easygui
import pyperclip
import tkinter as tk    
import time


agregarJson = ".json"

precioUyuni = 0
precio=''

#MUNDIAL
usuariosMundial = "usuariosMundial"
baseMundial = "baseMundial.json"
baseVentasMundial = "ventasMundial"
VendidasMundial = []
noVendidasMundial = []

#LIBERTADORES
usuariosLibertadores = "usuariosLibertadores"
baseLibertadores = "baseLali.json"
baseVentasLibertadores = "ventasLibertadores"
vendidasLali = []
noVendidasLali = []

usuariosFutarg = "usuariosFutarg"
baseFutarg = "baseFutarg.json"
baseVentasFutarg = "ventasFutarg"
vendidasFutarg = []
noVendidasFutarg = []

listaPaises = []
paisesError=[]


def leer_figu():
    global usuario_mercadolibre, figu
    texto_1 = entrada_texto_1.get("1.0", "end-1c")  # Obtener el primer texto
    texto_2 = entrada_texto_2.get("1.0", "end-1c")  # Obtener el segundo texto
    usuario_mercadolibre = texto_1
    figu = texto_2
    ventana.destroy()   

album = easygui.buttonbox("Elija una opción", choices=["Mundial Qatar 2022", "Copa Libertadores 2023", "Futbol Argentino 2023"], title="Confirmación")

if album in ("Mundial Qatar 2022", "Futbol Argentino 2023", "Copa Libertadores 2023"):

    inicio = easygui.buttonbox("Elija una opción", choices=["Preguntas", "Ventas","Base de datos"], title="Confirmación")
    

if (album == "Mundial Qatar 2022"):

    if inicio=="Preguntas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Pregunta", "Pregunta de Usuario"], title="Confirmación")

        if subInicio == "Nueva Pregunta":
        
            # Crear la ventana
            ventana = tk.Tk()
            ventana.title("Figuritas")

            ventana.state('zoomed')

            # Crear etiquetas y cuadros de entrada de texto
            etiqueta_0 = tk.Label(ventana, text="")
            etiqueta_0.pack(pady=125)

            etiqueta_1 = tk.Label(ventana, text="Usuario:")
            etiqueta_1.pack(pady=5)
            entrada_texto_1 = tk.Text(ventana, height=1, width=40)
            entrada_texto_1.pack()

            etiqueta_2 = tk.Label(ventana, text="Ingrese Figuritas:")
            etiqueta_2.pack(pady=5)
            entrada_texto_2 = tk.Text(ventana, height=5, width=160)
            entrada_texto_2.pack()

            # Crear un botón
            boton = tk.Button(ventana, text="Continuar", command=leer_figu)
            boton.pack(pady=10)

            # Variables para guardar los textos ingresados
            usuario_mercadolibre = ""
            figu = ""

            # Iniciar el bucle de la GUI
            ventana.mainloop()

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


            if validacionPaises == True:
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

        elif subInicio == "Pregunta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            figusUsuario = preguntaUsuario(usuario_venta,usuariosMundial+agregarJson,usuariosMundial)

            verPreguntaUsuario = procesadorMundial(figusUsuario,usuario_venta,baseMundial)

            print(verPreguntaUsuario)


    elif inicio == "Ventas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Venta","Venta de Usuario"], title="Confirmación")

        if subInicio == "Nueva Venta":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            descontarBaseJson(usuario_venta,usuariosMundial,baseMundial,VendidasMundial,noVendidasMundial)

            with open("ventasMundial.json","r") as ventasMundialJson:
                cargarVenta = json.load(ventasMundialJson)

            nuevaVenta = {"usuario": usuario_venta, "Vendidas": VendidasMundial, "NoVendidas": noVendidasMundial}

            cargarVenta["ventasMundial"].append(nuevaVenta)
                                    
            with open('ventasMundial.json', 'w') as ventasJSON:
                json.dump(cargarVenta, ventasJSON, indent=4)

        elif subInicio == "Venta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            verVenta(usuario_venta,baseVentasMundial+agregarJson,baseVentasMundial)
        

    elif inicio =="Base de datos":

        subInicioBDD = easygui.buttonbox("Elija una opción", choices=["Actualizar en Google","Total de figuritas","Agregar Stock"], title="Confirmación")
    
        if subInicioBDD == "Actualizar en Google":

            actualizarGoogle(baseMundial)

            url='https://docs.google.com/spreadsheets/d/1Bax2cYBg9ijV640UvJGaRIxxp4JE1VnZrApZnU0JkC0/edit#gid=0'

            abrir_url(url)

            time.sleep(5)

            pyautogui.hotkey('ctrl','v')

        elif subInicioBDD == "Total de figuritas":

            contarBase(baseMundial)

        elif subInicioBDD == "Agregar Stock":
            agregarStock(baseMundial)
                    
elif (album == "Copa Libertadores 2023"):

    if inicio=="Preguntas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Pregunta", "Pregunta de Usuario"], title="Confirmación")

        if subInicio == "Nueva Pregunta":
        
            # Crear la ventana
            ventana = tk.Tk()
            ventana.title("Figuritas")

            ventana.state('zoomed')

            # Crear etiquetas y cuadros de entrada de texto
            etiqueta_0 = tk.Label(ventana, text="")
            etiqueta_0.pack(pady=125)

            etiqueta_1 = tk.Label(ventana, text="Usuario:")
            etiqueta_1.pack(pady=5)
            entrada_texto_1 = tk.Text(ventana, height=1, width=40)
            entrada_texto_1.pack()

            etiqueta_2 = tk.Label(ventana, text="Ingrese Figuritas:")
            etiqueta_2.pack(pady=5)
            entrada_texto_2 = tk.Text(ventana, height=5, width=160)
            entrada_texto_2.pack()

            # Crear un botón
            boton = tk.Button(ventana, text="Continuar", command=leer_figu)
            boton.pack(pady=10)

            # Variables para guardar los textos ingresados
            usuario_mercadolibre = ""
            figu = ""

            # Iniciar el bucle de la GUI
            ventana.mainloop()

            figuLali = conversorLibertadores(figu)

            
            with open("usuariosLibertadores.json","r") as laliJson:
                dataLibertadores = json.load(laliJson)

            listaUsuarioLali = (usuario_ml (usuario_mercadolibre))

            usuarioLali = listaUsuarioLali[1]

            nuevoUsuarioLali = {"usuario": usuarioLali, "figusPedidas": figuLali}

            dataLibertadores["usuariosLibertadores"].append(nuevoUsuarioLali)
                                    
            with open('usuariosLibertadores.json', 'w') as archivoUsuarios:
                json.dump(dataLibertadores, archivoUsuarios, indent=4) 

            procesadorLali(figuLali,baseLibertadores)

        elif subInicio == "Pregunta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            figusUsuario = preguntaUsuario(usuario_venta,usuariosLibertadores+agregarJson,usuariosLibertadores)

            procesadorLali(figusUsuario,baseLibertadores)

    elif inicio =="Ventas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Venta","Venta de Usuario"], title="Confirmación")

        if subInicio == "Nueva Venta":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            descontarBaseJson(usuario_venta,usuariosLibertadores,baseLibertadores,vendidasLali,noVendidasLali)

            nuevaVenta(baseVentasLibertadores+agregarJson,usuario_venta,vendidasLali,noVendidasLali,baseVentasLibertadores)
        
        elif subInicio == "Venta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            verVenta(usuario_venta,baseVentasLibertadores+agregarJson,baseVentasLibertadores)

    elif inicio =="Base de datos":

        subInicioBDD = easygui.buttonbox("Elija una opción", choices=["Agregar Stock","Total de figuritas","Cosechar","Actualizar en Google"], title="Confirmación")
    
        if subInicioBDD == "Actualizar en Google":

            actualizarGoogle(baseLibertadores)

            url='https://docs.google.com/spreadsheets/d/13hmHUwaHjUXLRCL_zNl5voooERbgDDhCX49EjizX7k0/edit#gid=0'

            abrir_url(url)

            time.sleep(5)

            pyautogui.hotkey('ctrl','v')

        elif subInicioBDD == "Total de figuritas":

            contarBase(baseLibertadores)
        
        elif subInicioBDD == "Agregar Stock":
            agregarStock(baseLibertadores)
        
        elif subInicioBDD == "Cosechar":
            # Crear la ventana
            ventana = tk.Tk()
            ventana.title("Figuritas")

            ventana.state('zoomed')

            # Crear etiquetas y cuadros de entrada de texto
            etiqueta_0 = tk.Label(ventana, text="")
            etiqueta_0.pack(pady=125)

            entrada_texto_1 = tk.Text(ventana, height=0, width=0)
            entrada_texto_1.pack()

            etiqueta_2 = tk.Label(ventana, text="Ingrese Figuritas:")
            etiqueta_2.pack(pady=5)
            entrada_texto_2 = tk.Text(ventana, height=5, width=160)
            entrada_texto_2.pack()

            # Crear un botón
            boton = tk.Button(ventana, text="Continuar", command=leer_figu)
            boton.pack(pady=10)

            # Variables para guardar los textos ingresados
            usuario_mercadolibre = ""
            figu = ""

            # Iniciar el bucle de la GUI
            ventana.mainloop()

            figuLali = conversorLibertadores(figu)
            print(figuLali,'\n')

            cosechar(figuLali,baseLibertadores)

elif (album == "Futbol Argentino 2023"):
    
    if inicio=="Preguntas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Pregunta", "Pregunta de Usuario"], title="Confirmación")

        if subInicio == "Nueva Pregunta":
            # Crear la ventana
            ventana = tk.Tk()
            ventana.title("Figuritas")

            ventana.state('zoomed')

            # Crear etiquetas y cuadros de entrada de texto
            etiqueta_0 = tk.Label(ventana, text="")
            etiqueta_0.pack(pady=125)

            etiqueta_1 = tk.Label(ventana, text="Usuario:")
            etiqueta_1.pack(pady=5)
            entrada_texto_1 = tk.Text(ventana, height=1, width=40)
            entrada_texto_1.pack()

            etiqueta_2 = tk.Label(ventana, text="Ingrese Figuritas:")
            etiqueta_2.pack(pady=5)
            entrada_texto_2 = tk.Text(ventana, height=5, width=160)
            entrada_texto_2.pack()

            # Crear un botón
            boton = tk.Button(ventana, text="Continuar", command=leer_figu)
            boton.pack(pady=10)

            # Variables para guardar los textos ingresados
            usuario_mercadolibre = ""
            figu = ""

            # Iniciar el bucle de la GUI
            ventana.mainloop()

            figuFutarg = controlFutarg(figu)

            with open("usuariosFutarg.json","r") as futargJson:
                dataLibertadores = json.load(futargJson)

            listaUsuarioFutarg = (usuario_ml (usuario_mercadolibre))

            usuarioFutarg = listaUsuarioFutarg[1]

            nuevoUsuarioFutarg = {"usuario": usuarioFutarg, "figusPedidas": figuFutarg}

            dataLibertadores["usuariosFutarg"].append(nuevoUsuarioFutarg)
                                    
            with open('usuariosFutarg.json', 'w') as futJson:
                json.dump(dataLibertadores, futJson, indent=4) 

            procesadorFutarg(figuFutarg,baseFutarg)

        elif subInicio == "Pregunta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            figusUsuario = preguntaUsuario(usuario_venta,usuariosFutarg+agregarJson,usuariosFutarg)

            procesadorFutarg(figusUsuario,baseFutarg)

    elif inicio =="Ventas":

        subInicio = easygui.buttonbox("Elija una opción", choices=["Nueva Venta","Venta de Usuario"], title="Confirmación")

        if subInicio == "Nueva Venta":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            descontarBaseJson(usuario_venta,usuariosFutarg,baseFutarg,vendidasFutarg,noVendidasFutarg)

            nuevaVenta(baseVentasFutarg+agregarJson,usuario_venta,vendidasFutarg,noVendidasFutarg,baseVentasFutarg)

        elif subInicio == "Venta de Usuario":

            usuario_venta= easygui.enterbox("Ingrese nombre de usuario:", title="LAFI GURITA")

            verVenta(usuario_venta,baseVentasFutarg+agregarJson,baseVentasFutarg)

    elif inicio =="Base de datos":

        subInicioBDD = easygui.buttonbox("Elija una opción", choices=["Agregar Stock","Total de figuritas","Cosechar","Actualizar en Google"], title="Confirmación")
    
        if subInicioBDD == "Actualizar en Google":

            actualizarGoogle(baseFutarg)

            url='https://docs.google.com/spreadsheets/d/1TB_6yGecNUFHeaFfEX_RAj_85Sk1Dpu3JUHXniZeO0w/edit#gid=0'

            abrir_url(url)

            time.sleep(5)

            pyautogui.hotkey('ctrl','v')
    
        elif subInicioBDD == "Total de figuritas":

            contarBase(baseFutarg)

        elif subInicioBDD == "Agregar Stock":
            agregarStock(baseFutarg)

        elif subInicioBDD == "Cosechar":
            # Crear la ventana
            ventana = tk.Tk()
            ventana.title("Figuritas")

            ventana.state('zoomed')

            # Crear etiquetas y cuadros de entrada de texto
            etiqueta_0 = tk.Label(ventana, text="")
            etiqueta_0.pack(pady=125)

            entrada_texto_1 = tk.Text(ventana, height=0, width=0)
            entrada_texto_1.pack()

            etiqueta_2 = tk.Label(ventana, text="Ingrese Figuritas:")
            etiqueta_2.pack(pady=5)
            entrada_texto_2 = tk.Text(ventana, height=5, width=160)
            entrada_texto_2.pack()

            # Crear un botón
            boton = tk.Button(ventana, text="Continuar", command=leer_figu)
            boton.pack(pady=10)

            # Variables para guardar los textos ingresados
            figu = ""

            # Iniciar el bucle de la GUI
            ventana.mainloop()

            figuFutarg = controlFutarg(figu)
            print(figuFutarg,'\n')

            cosechar(figuFutarg,baseFutarg)