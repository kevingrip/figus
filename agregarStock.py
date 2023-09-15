import json
from Funciones import*
from procesadorLali import*
from conversor_libertadores import *
import easygui

def agregarStock(base):

    figus = ''

    paisesSinDuplicados = []
    eleccionFigurita = []
    paisesError = []
    listaPaises = []
    

    seguirAgregando = True
    mismoPais = False

    precioUyuni = 0
    cantidadTotal = 0

    with open(base,"r") as baseJson:
        baseTotal = json.load(baseJson)
            
    


    if (base == "baseMundial.json"):
        

        for fila in baseTotal:
            figus += fila["NUM"]

        letrasPaisesCompleto = acomodar (figus,paisesError,listaPaises)
        sacarPaisesDuplicados(letrasPaisesCompleto,paisesSinDuplicados)

        paisesSinDuplicados[33] = 'Coca Cola'
        paisesSinDuplicados[21] = 'MAR'

        while seguirAgregando == True:

            if mismoPais == False:            
                seleccionarPais = easygui.choicebox("Elija un pais", choices=paisesSinDuplicados, title="Confirmación")

            if seleccionarPais == 'MAR':
                seleccionarPais = 'MRR'
            
            for fila in baseTotal:
                if seleccionarPais in fila["NUM"]:
                    eleccionFigurita.append(fila["NUM"])
                #else:
                    #eleccionFigurita = ["C1","C2","C3","C4","C5","C6","C7","C8"]
            cantidadAgregar = easygui.buttonbox("Cantidad a agregar", choices=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"], title="Confirmación")
            seleccionarFigurita = easygui.choicebox("Elija una figurita", choices=eleccionFigurita, title="Confirmación")

            for fila in baseTotal:
                if seleccionarFigurita == fila["NUM"]:                        
                    figuActual = str(fila["CANT"])
                    if fila["TIPO"] in ("FWC","ESC"):
                        precioUyuni += (240*(int(cantidadAgregar)))
                    else:
                        precioUyuni += (30*(int(cantidadAgregar)))
                    fila["CANT"] += int(cantidadAgregar)
                    cantidadTotal += int(cantidadAgregar)
                    figuNueva = str(fila["CANT"])
                    #precio = ". Precio: $",str(precioUyuni)
                    print ("(+"+str(cantidadAgregar)+") "+str(fila["NUM"])+": "+figuActual+" ==> "+figuNueva)
                    print("Cantidad Total agregada: ",cantidadTotal)

            actualizarBase = json.dumps(baseTotal, indent=4)

            with open(base, "w") as archivo:
                archivo.write(actualizarBase)

            seguir = easygui.buttonbox("Desea seguir con el mismo pais?", choices=["Si","No","Salir"], title="Confirmación")

            if seguir =="Salir":
                seguirAgregando = False
            
            if seguir == "Si":
                seguirAgregando = True
                mismoPais = True
                eleccionFigurita = []
            
            if seguir == "No":
                mismoPais = False
                seguirAgregando = True
                eleccionFigurita = []
    elif (base in ("baseLali.json","baseFutarg.json")):

        while (seguirAgregando == True):

            for figurita in baseTotal:
                eleccionFigurita.append(figurita["NUM"])

            seleccionarFigurita = easygui.choicebox("Elija una figurita", choices=eleccionFigurita, title="Confirmación")
            cantidadAgregar = easygui.buttonbox("Cantidad a agregar", choices=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"], title="Confirmación")

            for figurita in baseTotal:
                if (str(figurita["NUM"]) == seleccionarFigurita):
                    figuActual = "Cantidad anterior de "+str(figurita["NUM"])+": "+str(figurita["CANT"])
                    figurita["CANT"] += int(cantidadAgregar)
                    figuNueva = "/ Cantidad actual: "+str(figurita["CANT"])
                    print (figuActual, figuNueva)

            actualizarBase = json.dumps(baseTotal, indent=4)

            with open(base, "w") as archivo:
                archivo.write(actualizarBase)