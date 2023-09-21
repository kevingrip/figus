import json
import datetime
import easygui

def nuevaVenta(usuario,vendidas,noVendidas,llaveVentas):
    with open("totalVentas.json","r") as ventasLeerJson:
        cargarVenta = json.load(ventasLeerJson)

    dia = datetime.datetime.now().strftime("%d/%m/%Y")

    sucursal = easygui.buttonbox("Cuenta", choices=["LAFI GURITA", "LA ZUCU"], title="Confirmación")

    datoEnvio = easygui.buttonbox("Envio", choices=["CORREO", "FLEX", "ACORDAR ENTREGA"], title="Confirmación")

    if datoEnvio == "FLEX":
        datoEnvio = easygui.buttonbox("Envio", choices=["FLEX VERGUI","FLEX PELUCHE","FLEX MATI","FLEX KEVIN"], title="Confirmación")
        datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["Recoleta","CABA","Lomas de Zamora"], title="Confirmación")
        valorFlex = 1700
    elif datoEnvio == "CORREO":
        datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["AND026","AND040","OCS053","OCS064","OCS090","PCK350","SME1","SLA1","SSF1","STD1","URB161","URB162"], title="Confirmación")
        valorFlex = 0
    else:
        datoEtiqueta = easygui.buttonbox("Punto de retiro", choices=["Nuñez","Hurlingham","M.Coronado","San Justo"], title="Confirmación")
        valorFlex = 0

    nuevaVenta = {"usuario": usuario, "Vendidas": vendidas, "NoVendidas": noVendidas, "Dia": dia,"Cuenta": sucursal,"Envio": datoEnvio,"Etiqueta": datoEtiqueta,"PrecioFlex": valorFlex}

    cargarVenta[llaveVentas].append(nuevaVenta)
                                    
    with open("totalVentas.json", 'w') as ventasEditarJSON:
        json.dump(cargarVenta, ventasEditarJSON, indent=4)