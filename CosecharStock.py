import json
from Funciones import*
from procesadorLali import*
from conversor_libertadores import *
import easygui

def cosecharStock(base):

    cantFWCDoradas = 0
    cantFWCComunes = 0
    escudoArg = 0
    cantComunes = 0
    cantArg = 0
    cantEsc=0
    cantMessi=0
    cantInt=0
    cantROH=0
    cantLEGD=0
    cantLEGC=0
    cantCoca=0

    figus = ''

    COCA = ["C1","C2","C3","C4","C5","C6","C7","C8"]
    COCA_NOMBRE = ["GNABRY","DIBU","DE BRUYNE","MODRIC","DECLAN RICE","GAVI","LOZANO","H.M.SON"]
    

    paisesSinDuplicados = []
    eleccionFigurita = []
    paisesError = []
    listaPaises = []
    suplentes = []
    

    seguirAgregando = True
    mismoPais = False

    precioUyuni = 0
    cantidadTotal = 0

    with open(base,"r") as baseJson:
        baseTotal = json.load(baseJson)
    


    if (base in ("baseMundial.json","albumExtra.json","base_copam.json")):
        

        for fila in baseTotal:
            figus += fila["NUM"]

        letrasPaisesCompleto = acomodar (figus,paisesError,listaPaises)
        sacarPaisesDuplicados(letrasPaisesCompleto,paisesSinDuplicados)

        if base in ("baseMundial.json","albumExtra.json"):
            paisesSinDuplicados[33] = 'Coca Cola'
        if base=='base_copam.json':
            paisesSinDuplicados[0] = 'INTR'

        while seguirAgregando == True:

            if mismoPais == False:  
                if base=="base_copam.json":
                    seleccionarPais = easygui.choicebox("Elija un pais", choices=sorted(paisesSinDuplicados), title="Seleccion Pais")
                else:
                    seleccionarPais = easygui.choicebox("Elija un pais", choices=paisesSinDuplicados, title="Seleccion Pais")

            if seleccionarPais == 'INTR':
                seleccionarPais = 'INT'
            
            
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

            seleccionarFigurita = easygui.buttonbox("Elija una figurita", choices=eleccionFigurita, title="Seleccion figurita")

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
                cantCoca+=1
                # elif seleccionarFigurita == COCA_NOMBRE[8]:
                #     seleccionarFigurita = COCA[8]

            if seleccionarFigurita !="Cambiar Pais":
                for fila in baseTotal:
                    if seleccionarFigurita == fila["NUM"]:                        
                        figuActual = str(fila["CANT"])                        
                        if (fila["NUM"])[:3] == "ARG":
                            if (fila["TIPO"]!='ESC'):
                            # precioUyuni += (200*(int(1)))
                            #print("Precio Individual: $150")
                                if (fila["NUM"]=='ARG19'):
                                    cantMessi+=1
                                else:
                                    cantArg+=1
                            else:
                                escudoArg+=1
                        elif fila["TIPO"] == ("FWCC"):
                            cantFWCComunes +=1
                        elif fila["TIPO"] == ("FWCD"):
                            cantFWCDoradas +=1
                        elif fila["TIPO"] in ("ESC","ESCUDO"):
                            cantEsc +=1
                        elif fila["TIPO"] == 'INT':
                            cantInt+=1
                        elif 'ROH' in fila["NUM"]:
                            cantROH+=1
                        elif fila["TIPO"] == 'LEYENDA DORADA':
                            cantLEGD+=1
                        elif fila["TIPO"] == 'LEYENDA':
                            cantLEGC+=1
                            
                        else: 
                            cantComunes+=1                               
                            # precioUyuni += (80*(int(1)))
                            #print("Precio Individual: $50")
                            # CANT COMUNES 
                        if fila["TIPO"]=='COMUNES' and fila["CANT"]<5:
                            fila["CANT"] += int(1)
                            cantidadTotal += int(1)
                            figuNueva = str(fila["CANT"])
                            # print("Precio acumulado: ",precioUyuni)
                            print ("[+"+str(cantidadTotal)+"]       "+figuActual+' <<< '+str(fila["NUM"])+": >>> "+figuNueva)
                        # CANT EQUIPOS 
                        elif fila["TIPO"]=='EQUIPO' and fila["CANT"]<10:
                            fila["CANT"] += int(1)
                            cantidadTotal += int(1)
                            figuNueva = str(fila["CANT"])
                            # print("Precio acumulado: ",precioUyuni)
                            print ("[+"+str(cantidadTotal)+"]       "+figuActual+' <<< '+str(fila["NUM"])+": >>> "+figuNueva)
                        elif fila["TIPO"]=='AFA' or fila["TIPO"]=='LEYENDA DORADA': 
                            fila["CANT"] += int(1)
                            cantidadTotal += int(1)
                            figuNueva = str(fila["CANT"])
                            # print("Precio acumulado: ",precioUyuni)
                            print ("[+"+str(cantidadTotal)+"]       "+figuActual+' <<< '+str(fila["NUM"])+": >>> "+figuNueva)
                        elif fila["TIPO"]=='ESCUDO': 
                            fila["CANT"] += int(1)
                            cantidadTotal += int(1)
                            figuNueva = str(fila["CANT"])
                            # print("Precio acumulado: ",precioUyuni)
                            print ("[+"+str(cantidadTotal)+"]       "+figuActual+' <<< '+str(fila["NUM"])+": >>> "+figuNueva)
                        elif fila["TIPO"]!='COMUNES' and fila["CANT"]<7: 
                            fila["CANT"] += int(1)
                            cantidadTotal += int(1)
                            figuNueva = str(fila["CANT"])
                            # print("Precio acumulado: ",precioUyuni)
                            print ("[+"+str(cantidadTotal)+"]       "+figuActual+' <<< '+str(fila["NUM"])+": >>> "+figuNueva)
                        else:
                            print("No agregar")
                            suplentes.append(fila["NUM"])
            else:
                print("Cantidad Total agregada: ",cantidadTotal)

            actualizarBase = json.dumps(baseTotal, indent=4)

            with open(base, "w") as archivo:
                archivo.write(actualizarBase)

            if (seleccionarFigurita in eleccionFigurita) or (seleccionarPais == 'Coca Cola'):
                mismoPais = True
                seguirAgregando = True
                eleccionFigurita = []

            if seleccionarFigurita =="Salir":
                seguirAgregando = False
                mismoPais = False
                eleccionFigurita = []
                with open ("suplentes.json","w") as sup:
                    json.dump(suplentes,sup,indent=4)
            
            if seleccionarFigurita == "Cambiar Pais":
                mismoPais = False
                seguirAgregando = True
                eleccionFigurita = []


        if (cantFWCDoradas)>0:
            print("Cantidad de FWC doradas: ",cantFWCDoradas)
        if (cantFWCComunes)>0:
            print("Cantidad de FWC comunes: ",cantFWCComunes)
        if (escudoArg)>0:
            print("Cantidad de Escudos AFA: ",escudoArg)        
        if (cantArg)>0:
            print("Cantidad de jugadores AFA: ",cantArg)
        if (cantMessi)>0:
            print("Cantidad de Messi: ",cantMessi)
        if (cantEsc)>0:
            print("Cantidad de Escudos: ",cantEsc)      
        if (cantCoca)>0:
            print("Cantidad COCA: ", cantCoca)  
        if (cantInt)>0:
            print("Cantidad de INTR: ",cantInt)
        if (cantROH)>0:
            print("Cantidad de ROH: ",cantROH)
        if (cantLEGD)>0:
            print("Cantidad de LEG DORADA: ",cantLEGD)
        if (cantLEGC)>0:
            print("Cantidad de LEG COMUN: ",cantLEGC)
        if (cantComunes)>0:
            print("Cantidad comunes: ",cantComunes)        
        
        

    elif (base in ("baseLali.json","baseFutarg.json")):

        CL = ("CL1","CL2","CL3","CL4","CL5","CL6","CL7","CL8","CL9","CL10","CL11","CL12","CL13")

        elegirCentena = easygui.buttonbox("Familia Figurita", choices=["0 a 99","100 a 199","200 a 299","300 a 399","400 a 499","500 a 599"], title="Confirmación")
        if elegirCentena:
            seguirAgregando = True
        else:
            seguirAgregando = False

        while (seguirAgregando == True):

            # for figurita in baseTotal:
            #     eleccionFigurita.append(figurita["NUM"])
            
            
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
            if seleccionarFigurita:
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
            else:
                elegirCentena = easygui.buttonbox("Familia Figurita", choices=["0 a 99","100 a 199","200 a 299","300 a 399","400 a 499","500 a 599"], title="Confirmación")
                
            eleccionFigurita = []
    
    return (cantidadTotal)