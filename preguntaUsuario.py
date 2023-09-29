import json



def preguntaUsuario(usuario_ml,baseUsuarios,llaveUsuario,base):    
    with open (baseUsuarios,"r") as usuariosJson:
        usuariosPreguntas = json.load(usuariosJson)

    with open (base,"r") as baseJson:
        BaseDeDatos = json.load(baseJson)

    validacion = False

    usuariosTotalPreguntas = usuariosPreguntas[llaveUsuario]

    

    for listaUsuarios in usuariosTotalPreguntas:
        if listaUsuarios["usuario"] == usuario_ml:
            validacion = True
            lista = (listaUsuarios["figusPedidas"])
            for fila in BaseDeDatos:
                if fila["NUM"] in lista:
                    print(fila)
    
    if validacion == True:
        return (lista)
    else:
        return (print("Usuario no esta en la lista"))
            

        