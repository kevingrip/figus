import json
import datetime
from bases import *



def actualizarFecha():

    baseNueva=baseMundial()
    
    for linea in baseNueva:
        linea["DIA"] = datetime.datetime.now().strftime("%d/%m/%Y")
        linea["ACTUALIZACION"] = datetime.datetime.now().strftime("%H:%M:%S")

    with open ("baseMundial.json","w") as bjs:
        json.dump(baseNueva,bjs,indent=4)