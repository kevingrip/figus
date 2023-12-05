import json
import pyperclip
from Funciones import*
import easygui
import os

def agregarStock(base,pais):

    cantFWCesc = 0
    cantFWCcomunes = 0
    cantComunes = 0
    cantArg = 0

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
            
    


    if (base == "baseMundial.json") or (base == "albumExtra.json"):
        

        for fila in baseTotal:
            figus += fila["NUM"]

        letrasPaisesCompleto = acomodar (figus,paisesError,listaPaises)
        sacarPaisesDuplicados(letrasPaisesCompleto,paisesSinDuplicados)

        paisesSinDuplicados[33] = 'Coca Cola'
        paisesSinDuplicados[21] = 'MAR'

        while seguirAgregando == True:

            if mismoPais == False:            
                seleccionarPais = pais

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
                            if fila["NUM"] in (["FWC8","FWC9","FWC10","FWC11","FWC12","FWC13","FWC14","FWC15","FWC16","FWC17","FWC18"]):
                                # precioUyuni += (100*(int(1)))
                                #print("Precio Individual: $100")
                                cantFWCcomunes +=1
                            else:
                                # precioUyuni += (300*(int(1)))
                                #print("Precio Individual: $300")
                                cantFWCesc +=1
                        else:
                            if (fila["NUM"])[:3] == "ARG":
                                if (fila["TIPO"]!='ESC'):
                                # precioUyuni += (200*(int(1)))
                                #print("Precio Individual: $150")
                                    cantArg+=1
                            else: 
                                cantComunes+=1                               
                                # precioUyuni += (80*(int(1)))
                                #print("Precio Individual: $50")                        
                        cantidadTotal += int(1)
                        # print("Precio acumulado: ",precioUyuni)
                        return (fila["NUM"])                     
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
        


with open ("albumExtra.json","r") as aExtraJson:
    albumExtra = json.load (aExtraJson)

with open ("baseMundial.json","r") as MundialJson:
    baseMundial = json.load (MundialJson)

nombre=''

num = ''

cont=0

if len(nombre)>0:
    for linea in baseMundial:
        if linea["NOMBRE"] == nombre:
            print(linea["NOMBRE"])
            print(linea["NUM"])
            print('\n',"Nombre Correcto",'\n')
            pyperclip.copy(linea["NUM"])
        elif nombre in linea["NOMBRE"]:
            print(linea["NOMBRE"],'-',linea["NUM"])
            cont+=1
    if cont>0:
        print('\n',"Corregir nombre y volver a ejecutar",'\n')


for linea in baseMundial:
    if linea["NOMBRE"] == nombre:

        if len(nombre)>0:

            validacion = False

            for linea in baseMundial:                    
                    if linea["NOMBRE"] == nombre:
                        print("Cantidad actual en BaseMundial:",linea["CANT"])
                        if linea["CANT"] < 5:
                            validacion = True
                            if linea["CANT"] == 0:
                                print("No disponible en la base general")
                        

            if validacion == True:
                for linea in albumExtra:
                    if linea["NOMBRE"] == nombre:
                        if linea["CANT"] < 2:          
                            print("Agregar al album",num)
                        else:
                            print("No agregar al album")
            else:
                print("No agregar al album")

if len(nombre)==0:
    pais = easygui.enterbox("Ingrese pais")
    cantFigus = int(easygui.enterbox("Ingrese cantidad de figus"))
    while cantFigus >0:
        for i in range(0,cantFigus):
            num = agregarStock("albumExtra.json",pais)
            for linea in albumExtra:       
                if linea["NUM"] == num:
                    if linea["CANT"] < 2:                
                        linea["CANT"] +=1
                        print('\n')
                        print(num,"agregado")
                        print ("Cantidad: ",linea["CANT"])
                    else:
                        print('\n')
                        print(linea["NUM"])                    
                        print("No agregar al album")
                        for l in baseMundial:
                            if linea["NUM"] == l["NUM"]:
                                l["CANT"] +=1
                        print("Figu agregada a baseMundial")
                        with open ("baseMundial.json","w") as bmJson:
                            json.dump(baseMundial,bmJson,indent=4)

        with open ("albumExtra.json","w") as editarJson:
            json.dump(albumExtra,editarJson,indent=4)     
        pais = easygui.enterbox("Ingrese pais")
        cantFigus = int(easygui.enterbox("Ingrese cantidad de figus"))   
        

elif len(num)>0:
    print("Borrar nombre para ingresar figuritas")
