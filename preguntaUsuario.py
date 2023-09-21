import json



def preguntaUsuario(usuario_ml,baseUsuarios,llaveUsuario,base):    
    with open (baseUsuarios,"r") as usuariosJson:
        usuariosPreguntas = json.load(usuariosJson)

    with open (base,"r") as baseJson:
        BaseDeDatos = json.load(baseJson)

    usuariosTotalPreguntas = usuariosPreguntas[llaveUsuario]

    

    for listaUsuarios in usuariosTotalPreguntas:
        if listaUsuarios["usuario"] == usuario_ml:
            lista = (listaUsuarios["figusPedidas"])
            for fila in BaseDeDatos:
                if fila["NUM"] in lista:
                    print(fila)
    
    return (lista)
            

        