import json
from Funciones import*
from procesadorLali import*
from conversor_libertadores import *
import easygui

def agregarStock(base):

    figus = ''

    COCA = ["C1","C2","C3","C4","C5","C6","C7","C8"]
    COCA_NOMBRE = ["GNABRY","DIBU","DE BRUYNE","MODRIC","DECLAN RICE","GAVI","LOZANO","H.M.SON"]
    

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
                if seleccionarPais in fila["NUM"] and seleccionarPais != 'Coca Cola':
                    eleccionFigurita.append(fila["NUM"])
                if seleccionarPais == 'Coca Cola':
                    eleccionFigurita = COCA_NOMBRE
            if eleccionFigurita == COCA_NOMBRE:
                if "Cambiar Pais" not in eleccionFigurita:
                    eleccionFigurita.append("Cambiar Pais")
                    eleccionFigurita.append("Salir")
            else:
                eleccionFigurita.append("Cambiar Pais")
                eleccionFigurita.append("Salir")
            seleccionarFigurita = easygui.buttonbox("Elija una figurita", choices=eleccionFigurita, title="Confirmación")

            if seleccionarPais == 'Coca Cola':
                if seleccionarFigurita == COCA_NOMBRE[0]:
                    seleccionarFigurita = COCA[0]
                elif seleccionarFigurita == COCA_NOMBRE[1]:
                    seleccionarFigurita = COCA[1]
                elif seleccionarFigurita == COCA_NOMBRE[2]:
                    seleccionarFigurita = COCA[2]
                elif seleccionarFigurita == COCA_NOMBRE[3]:
                    seleccionarFigurita = COCA[3]
                elif seleccionarFigurita == COCA_NOMBRE[4]:
                    seleccionarFigurita = COCA[4]
                elif seleccionarFigurita == COCA_NOMBRE[5]:
                    seleccionarFigurita = COCA[5]
                elif seleccionarFigurita == COCA_NOMBRE[6]:
                    seleccionarFigurita = COCA[6]
                elif seleccionarFigurita == COCA_NOMBRE[7]:
                    seleccionarFigurita = COCA[7]
                elif seleccionarFigurita == COCA_NOMBRE[8]:
                    seleccionarFigurita = COCA[8]

            if seleccionarFigurita !="Cambiar Pais":
                for fila in baseTotal:
                    if seleccionarFigurita == fila["NUM"]:                        
                        figuActual = str(fila["CANT"])
                        if fila["TIPO"] in ("FWC","ESC"):
                            precioUyuni += (240*(int(1)))
                        else:
                            precioUyuni += (30*(int(1)))
                        fila["CANT"] += int(1)
                        cantidadTotal += int(1)
                        figuNueva = str(fila["CANT"])
                        #precio = ". Precio: $",str(precioUyuni)
                        print ("(+"+str(cantidadTotal)+") "+str(fila["NUM"])+": "+figuActual+" ==> "+figuNueva)
            else:
                print("Cantidad Total agregada: ",cantidadTotal)

            actualizarBase = json.dumps(baseTotal, indent=4)

            with open(base, "w") as archivo:
                archivo.write(actualizarBase)

            if seleccionarFigurita =="Salir":
                seguirAgregando = False
                mismoPais = False
                eleccionFigurita = []
            
            if seleccionarFigurita == "Cambiar Pais":
                mismoPais = False
                seguirAgregando = True
                eleccionFigurita = []

            if (seleccionarFigurita in eleccionFigurita) or (seleccionarPais == 'Coca Cola'):
                mismoPais = True
                seguirAgregando = True
                eleccionFigurita = []

    elif (base in ("baseLali.json","baseFutarg.json")):

        CL = ("CL1","CL2","CL3","CL4","CL5","CL6","CL7","CL8","CL9","CL10","CL11","CL12","CL13")

        while (seguirAgregando == True):

            # for figurita in baseTotal:
            #     eleccionFigurita.append(figurita["NUM"])

            elegirCentena = easygui.buttonbox("Familia Figurita", choices=["0 a 99","100 a 199","200 a 299","300 a 399","400 a 499","500 a 599"], title="Confirmación")
            
            
            if elegirCentena == "0 a 99":
                for figurita in baseTotal: 
                    if figurita["NUM"] not in (CL):
                        if (int(figurita["NUM"])<100):
                            eleccionFigurita.append(figurita["NUM"])
            elif elegirCentena == "100 a 199":
                for figurita in baseTotal:
                    if figurita["NUM"] not in (CL):
                        if (int(figurita["NUM"])>99) and (int(figurita["NUM"]))<200:
                            eleccionFigurita.append(figurita["NUM"])
            elif elegirCentena == "200 a 299":
                for figurita in baseTotal:
                    if figurita["NUM"] not in (CL):
                        if (int(figurita["NUM"]))>199 and (int(figurita["NUM"]))<300:
                            eleccionFigurita.append(figurita["NUM"])
            elif elegirCentena == "300 a 399":
                for figurita in baseTotal:
                    if figurita["NUM"] not in (CL):
                        if (int(figurita["NUM"]))>299 and (int(figurita["NUM"]))<400:
                            eleccionFigurita.append(figurita["NUM"])
            elif elegirCentena == "400 a 499":
                for figurita in baseTotal:
                    if figurita["NUM"] not in (CL):
                        if (int(figurita["NUM"]))>399 and (int(figurita["NUM"]))<500:
                            eleccionFigurita.append(figurita["NUM"])
            elif elegirCentena == "500 a 599":
                for figurita in baseTotal:
                    if figurita["NUM"] not in (CL):
                        if (int(figurita["NUM"]))>499 and (int(figurita["NUM"]))<600:
                            eleccionFigurita.append(figurita["NUM"])

            seleccionarFigurita = easygui.choicebox("Elija una figurita", choices=eleccionFigurita, title="Confirmación")
            if len(seleccionarFigurita) > 0:
                cantidadAgregar = 1

                for figurita in baseTotal:
                    if (str(figurita["NUM"]) == seleccionarFigurita):
                        figuActual = "Cantidad anterior de "+str(figurita["NUM"])+": "+str(figurita["CANT"])
                        figurita["CANT"] += int(cantidadAgregar)
                        figuNueva = "/ Cantidad actual: "+str(figurita["CANT"])
                        print (figuActual, figuNueva)

                actualizarBase = json.dumps(baseTotal, indent=4)

                

                with open(base, "w") as archivo:
                    archivo.write(actualizarBase)
                
            eleccionFigurita = []