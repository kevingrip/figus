import json

def cosechar(figuritas,base):
    with open(base) as baseJson:
        baseTotalJson = json.load(baseJson)

    for figurita in baseTotalJson:
        if figurita["TIPO"] not in  ("Comunes",'COMUNES'):
            if figurita["NUM"] in figuritas:
                num = figurita["NUM"]
                equipo = figurita["EQUIPO"]
                cant = figurita["CANT"]
                tipo = figurita["TIPO"]
                nombre = figurita["NOMBRE"]
                print(f"NUM: {num}\t|\tTIPO: {tipo}\t|\tEQUIPO: {equipo}\t|\tNOMBRE: {nombre}\t|\tSTOCK: {cant}")