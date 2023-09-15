import json
import pyperclip
import datetime


def actualizarGoogle(baseDeDatos):
    
    if (baseDeDatos == "baseMundial.json"):

        with open(baseDeDatos, "r") as figuJson:
            baseFigu = json.load(figuJson)

        # Inicializa una cadena para almacenar la tabla
        tabla = "NUM\tCANT\tPRECIO\tTIPO\tDIA\tACTUALIZACION\tNOMBRE\n"

        # Recorre los datos y agrega cada línea a la tabla
        for linea in baseFigu:
            num = linea.get("NUM")
            cant = linea.get("CANT")
            precio = linea.get("PRECIO")
            tipo = linea.get("TIPO")
            dia = datetime.datetime.now().strftime("%d/%m/%Y")
            actualizacion = datetime.datetime.now().strftime("%H:%M:%S")
            nombre = linea.get("NOMBRE")
            
            # Construye la línea con valores separados por tabulaciones
            linea_tabulada = f"{num}\t{cant}\t{precio}\t{tipo}\t{dia}\t{actualizacion}\t{nombre}\n"
            
            # Agrega la línea a la tabla
            tabla += linea_tabulada

        # Copia la tabla en el portapapeles
        pyperclip.copy(tabla)

        # Imprime la tabla en la consola (opcional)
        print(tabla)

    elif (baseDeDatos == "baseFutarg.json"):
        with open(baseDeDatos, "r") as figuJson:
            baseFigu = json.load(figuJson)

        # Inicializa una cadena para almacenar la tabla
        tabla = "NUM\tEQUIPO\tCANT\tTIPO\tPRECIO\tNOMBRE\n"

        # Recorre los datos y agrega cada línea a la tabla
        for linea in baseFigu:
            num = linea.get("NUM")
            equipo = linea.get("EQUIPO")
            cant = linea.get("CANT")
            tipo = linea.get("TIPO")
            precio = linea.get("PRECIO")
            nombre = linea.get("NOMBRE")       
            
            # Construye la línea con valores separados por tabulaciones
            linea_tabulada = f"{num}\t{equipo}\t{cant}\t{tipo}\t{precio}\t{nombre}\n"
            
            # Agrega la línea a la tabla
            tabla += linea_tabulada

        # Copia la tabla en el portapapeles
        pyperclip.copy(tabla)

        # Imprime la tabla en la consola (opcional)
        print(tabla)

    elif (baseDeDatos == "baseLali.json"):
        with open(baseDeDatos, "r") as figuJson:
            baseFigu = json.load(figuJson)

        # Inicializa una cadena para almacenar la tabla
        tabla = "ID\tNUM\tEQUIPO\tCANT\tTIPO\tPRECIO\tNOMBRE\n"

        tabla_print = "NUM\tTIPO\tEQUIPO\tCANT\tPRECIO\tNOMBRE\n"

        # Recorre los datos y agrega cada línea a la tabla
        for linea in baseFigu:
            id = linea.get("ID")
            num = linea.get("NUM")
            equipo = linea.get("EQUIPO")
            cant = linea.get("CANT")
            tipo = linea.get("TIPO")
            precio = linea.get("PRECIO")
            nombre = linea.get("NOMBRE")       
            
            # Construye la línea con valores separados por tabulaciones
            linea_tabulada = f"{id}\t{num}\t{equipo}\t{cant}\t{tipo}\t{precio}\t{nombre}\n"

            linea_print = f"{num}\t{tipo}\t{equipo}\t{cant}\t{precio}\t{nombre}\n"
            
            # Agrega la línea a la tabla
            tabla += linea_tabulada

            tabla_print += linea_print

        # Copia la tabla en el portapapeles
        pyperclip.copy(tabla)

        # Imprime la tabla en la consola (opcional)
        print(tabla_print)