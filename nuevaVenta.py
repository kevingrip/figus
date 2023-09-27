import json
import datetime
import easygui
from tipoEnvio import*

def nuevaVenta(usuario,vendidas,noVendidas,llaveVentas):
    with open("totalVentas.json","r") as ventasLeerJson:
        cargarVenta = json.load(ventasLeerJson)

    dia = datetime.datetime.now().strftime("%d/%m/%Y")

    sucursal = easygui.buttonbox("Cuenta", choices=["LAFI GURITA", "LA ZUCU"], title="Confirmación")

    datoEnvio = easygui.buttonbox("Envio", choices=["CORREO", "FLEX", "ACORDAR ENTREGA"], title="Confirmación")

    if datoEnvio == "FLEX":
        datoEnvio = easygui.buttonbox("Envio", choices=["FLEX VERGUI","FLEX PELUCHE","FLEX MATI","FLEX KEVIN"], title="Confirmación")
        etiqueta = envioFlex()
        print(etiqueta)
        etiqueta.append("Agregar nuevo")
        datoEtiqueta = easygui.buttonbox("Etiqueta", choices=etiqueta, title="Confirmación")
        if (datoEtiqueta == "Agregar nuevo"):
            nuevaEtiqueta = easygui.enterbox("Ingrese nueva etiqueta").upper()
            agregarFlex(nuevaEtiqueta)
            datoEtiqueta = nuevaEtiqueta
        valorFlex = 1700
    elif datoEnvio == "CORREO":
        tipoEtiqueta = tipoCorreo()
        tipoEtiqueta.append("Agregar nuevo")
        empresaEtiqueta = easygui.buttonbox("Etiqueta", choices=tipoEtiqueta, title="Etiquetas")
    
        if empresaEtiqueta == "Agregar nuevo":
            etiquetaNueva= easygui.enterbox("Ingrese etiqueta").upper()
            tipoEtiqueta = etiquetaNueva[:3]
            datoEtiqueta = etiquetaNueva
            agregarCorreo(tipoEtiqueta,etiquetaNueva)
        else:
            datoEtiqueta = etiquetaCorreo(empresaEtiqueta)
        
        valorFlex = 0
        
    else:
        datoEtiqueta = easygui.buttonbox("Punto de retiro", choices=["Nuñez","Hurlingham","M.Coronado","San Justo"], title="Confirmación")
        valorFlex = 0

    nuevaVenta = {"usuario": usuario, "Vendidas": vendidas, "NoVendidas": noVendidas, "Dia": dia,"Cuenta": sucursal,"Envio": datoEnvio,"Etiqueta": datoEtiqueta,"PrecioFlex": valorFlex}

    cargarVenta[llaveVentas].append(nuevaVenta)
                                    
    with open("totalVentas.json", 'w') as ventasEditarJSON:
        json.dump(cargarVenta, ventasEditarJSON, indent=4)