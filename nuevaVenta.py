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
        empresaEtiqueta = easygui.buttonbox("Etiqueta", choices=["AND","COR","OCA","OCS","PCK","SME","SLA","SRO","SSF","STD","URB","SCF"], title="Confirmación")
        if empresaEtiqueta == "AND":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["AND026","AND040"], title="Confirmación")
        elif empresaEtiqueta == "COR":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["COR140"], title="Confirmación")
        elif empresaEtiqueta == "OCA":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["OCA291"], title="Confirmación")
        elif empresaEtiqueta == "OCS":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["OCS053","OCS062","OCS064","OCS090"], title="Confirmación")
        elif empresaEtiqueta == "PCK":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["PCK350","PCK390"], title="Confirmación")
        elif empresaEtiqueta == "SME":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["SME1"], title="Confirmación")
        elif empresaEtiqueta == "SLA":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["SLA1"], title="Confirmación")
        elif empresaEtiqueta == "SSF":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["SSF1","SSF1_X"], title="Confirmación")
        elif empresaEtiqueta == "SRO":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["SRO1"], title="Confirmación")
        elif empresaEtiqueta == "STD":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["STD1"], title="Confirmación")
        elif empresaEtiqueta == "SCF":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["SCF2"], title="Confirmación")
        elif empresaEtiqueta == "URB":
            datoEtiqueta = easygui.buttonbox("Etiqueta", choices=["URB161","URB162","URB190","URB175"], title="Confirmación")
        valorFlex = 0
    else:
        datoEtiqueta = easygui.buttonbox("Punto de retiro", choices=["Nuñez","Hurlingham","M.Coronado","San Justo"], title="Confirmación")
        valorFlex = 0

    nuevaVenta = {"usuario": usuario, "Vendidas": vendidas, "NoVendidas": noVendidas, "Dia": dia,"Cuenta": sucursal,"Envio": datoEnvio,"Etiqueta": datoEtiqueta,"PrecioFlex": valorFlex}

    cargarVenta[llaveVentas].append(nuevaVenta)
                                    
    with open("totalVentas.json", 'w') as ventasEditarJSON:
        json.dump(cargarVenta, ventasEditarJSON, indent=4)