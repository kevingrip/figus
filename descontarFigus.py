import json

def descontarBaseJson(usuario_venta,usuarioJson,baseDeDatos,figusTengo,figusNoTengo):

    agregarJson = '.json'

    cantidad = 0

    with open(usuarioJson+agregarJson,"r") as leerusuarioJson:
        datos = json.load(leerusuarioJson)

    usuariosTotales = datos[usuarioJson] 

    for usuario in usuariosTotales:
        if usuario.get("usuario") == usuario_venta:
            figuritas = (usuario.get("figusPedidas"))

    with open(baseDeDatos,'r') as jsonfigu:
         base_figu = json.load(jsonfigu)

    for linea in base_figu:
        if linea.get("NUM") in (figuritas):
            if linea["CANT"]>0:
                linea["CANT"] = linea["CANT"] -1
                print(linea)
                cantidad +=1
                figusTengo.append (linea["NUM"])                
            else:
                figusNoTengo.append(linea["NUM"])

    print(cantidad," figus descontadas de la base")

    with open(baseDeDatos, 'w') as jsonfigu:
        json.dump(base_figu, jsonfigu, indent=4)

    return (figusTengo)
