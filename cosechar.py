import json

def cosechar(figuritas,base):
    with open(base) as baseJson:
        baseTotalJson = json.load(baseJson)

    for figurita in baseTotalJson:
        if figurita["TIPO"] not in  ("Comunes",'COMUNES'):
            if figurita["NUM"] in figuritas:
                posicion = 0
                num = figurita["NUM"]
                equipo = figurita["EQUIPO"]
                cant = figurita["CANT"]
                tipo = figurita["TIPO"]
                nombre = figurita["NOMBRE"]
                for numero in figuritas:
                    if numero != figurita["NUM"]:
                        posicion +=1
                print(f"NUM: {num}\t|\tTIPO: {tipo}\t|\tSTOCK: {cant}\t|\tPOSICION = {posicion}|\tEQUIPO: {equipo}\t\tNOMBRE: {nombre}\t")