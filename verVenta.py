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
                print("Cantidad de figuritas vendidas: ",len(venta["Vendidas"]),"\n")
                if llaveVentas == "Mundial Qatar 2022":
                    listaVendidas = venta["Vendidas"]
                    ventaOrdenada = ''
                    anterior = ''
                    for figurita in listaVendidas:
                        if anterior == '':
                            anterior = figurita[:3]
                        if figurita[:3] == anterior:
                            if len(figurita) ==5:
                                ventaOrdenada+= (figurita[:3]+' '+figurita[-2:])
                                ventaOrdenada+='\t'
                            elif len(figurita) ==4:
                                ventaOrdenada+= (figurita[:3]+' '+figurita[-1:]+' ')
                                ventaOrdenada+='\t'
                            else:
                                ventaOrdenada+=figurita
                        else:
                            ventaOrdenada+='\n'
                            if len(figurita) ==5:
                                ventaOrdenada+= (figurita[:3]+' '+figurita[-2:])
                                ventaOrdenada+='\t'
                            elif len(figurita) ==4:
                                ventaOrdenada+= (figurita[:3]+' '+figurita[-1:]+' ')
                                ventaOrdenada+='\t'
                            else:
                                ventaOrdenada+=figurita
                                ventaOrdenada+='\t'
                            anterior = figurita[:3]
                    print("Vendidas: ")
                    print(ventaOrdenada,"\n")
                else:
                    print("Vendidas: ",venta["Vendidas"],"\n")
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
