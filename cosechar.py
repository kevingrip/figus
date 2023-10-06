import json

def cosechar(figuritas,base):
    with open(base) as baseJson:
        baseTotalJson = json.load(baseJson)

    posicion = 0

    for figu in figuritas:
        posicion += 1

    for figurita in baseTotalJson:
        if figurita["TIPO"] not in  ("Comunes",'COMUNES'):
            if figurita["NUM"] in figuritas:
                num = figurita["NUM"]
                equipo = figurita["EQUIPO"]
                cant = figurita["CANT"]
                tipo = figurita["TIPO"]
                nombre = figurita["NOMBRE"]
                print(f"NUM: {num}\t|\tTIPO: {tipo}\t|\tSTOCK: {cant}\t|\tPOSICION = {posicion}|\tEQUIPO: {equipo}\t\tNOMBRE: {nombre}\t")