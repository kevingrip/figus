import json



def preguntaUsuario(usuario_ml,baseDeDatos,llaveUsuario):    
    with open (baseDeDatos,"r") as usuariosJson:
        usuariosPreguntas = json.load(usuariosJson)

    usuariosTotalPreguntas = usuariosPreguntas[llaveUsuario]

    for listaUsuarios in usuariosTotalPreguntas:
        if listaUsuarios["usuario"] == usuario_ml:
            return(listaUsuarios["figusPedidas"])