import json
import datetime



def actualizarFecha(user):

    with open ("actualizado.json","r") as bjs:
        data = json.load(bjs)

    if user is None:
        fechaActualizada = {"DIA":datetime.datetime.now().strftime("%d/%m/%Y"),"ACTUALIZACION":datetime.datetime.now().strftime("%H:%M:%S"),"USUARIO":data["USUARIO"]}
    else:
        fechaActualizada = {"DIA":datetime.datetime.now().strftime("%d/%m/%Y"),"ACTUALIZACION":datetime.datetime.now().strftime("%H:%M:%S"),"USUARIO":user}

    with open ("actualizado.json","w") as bjs:
        json.dump(fechaActualizada,bjs,indent=4)