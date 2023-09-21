import json
import easygui

with open("baseLali.json","r") as laliJson:
    baseLali = json.load(laliJson)

no_vendidas = ['CL10', '2', '9', '11', '17', '39', '41', '75', '84', '87', '91', '102', '104', '106', '113', '119', '139', '143', '148', '158', '165', '168', '184', '214', '218', '242', '251', '254', '256', '269', '324', '359', '361', '373', '388', '432', '447', '452', '457', '460', '464', '468', '469', '507', '509', '514', '517', '527']

salir = True

while salir == True:
    nombre_jugador = easygui.enterbox("Ingrese nombre", title="LAFI GURITA")
    nomjug = nombre_jugador.capitalize()
    for jugador in baseLali:
        if nomjug in jugador["NOMBRE"]:
            if jugador["NUM"] in no_vendidas:
                print(jugador)