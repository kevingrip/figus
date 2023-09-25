import json
import datetime


def verVenta(usuario,llaveVentas,opcionElegida):
    with open ("totalVentas.json","r") as ventasLeerJSON:
        ventasTotal = json.load(ventasLeerJSON)

    # with open ("baseMundial.json","r") as ventasLeerJSON:
    #     ventasMundial = json.load(ventasLeerJSON)

    ventasTotalAlbum = ventasTotal[llaveVentas]

    hoy = datetime.datetime.now().strftime("%d/%m/%Y")

    if opcionElegida == 'Ingresar Usuario':        
        for venta in ventasTotalAlbum:
            if venta["usuario"] == usuario:
                print ("Usuario: ",venta["usuario"])
                print("Dia de la venta: ",venta["Dia"])
                print("Sucursal: ",venta["Cuenta"])
                print("Envio: ",venta["Envio"])
                print("Etiqueta: ",venta["Etiqueta"],"\n")
                # VER LINEA POR LINEA DE LA BASE
                # for linea in ventasMundial:
                #     if linea["NUM"] in (venta["Vendidas"]):
                #         print(linea)
                print("Vendidas: ",venta["Vendidas"],"\n")
                print("Cantidad de figuritas vendidas: ",len(venta["Vendidas"]),"\n")
                print("No Vendidas",venta["NoVendidas"])   
    elif opcionElegida == 'Ventas del dia':        
        for venta in ventasTotalAlbum:
            if (venta["Dia"]) == hoy:
                print("Dia de la venta: ",venta["Dia"])
                print("Sucursal: ",venta["Cuenta"])
                print("Usuario: ",venta["usuario"])
                print("Envio: ",venta["Envio"])
                print("Etiqueta: ",venta["Etiqueta"],"\n")
                print("Vendidas: ",venta["Vendidas"],"\n")
                print("Cantidad de figuritas vendidas: ",len(venta["Vendidas"]),"\n")
                print("No Vendidas",venta["NoVendidas"],"\n")   
                print("------------------------------------------------------------------------------------------------","\n")    
