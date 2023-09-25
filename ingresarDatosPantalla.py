import tkinter as tk    

def ingresarDatos(datos):

    def leer_figu():
        global usuario_mercadolibre, figu
        texto_1 = entrada_texto_1.get("1.0", "end-1c")  # Obtener el primer texto
        texto_2 = entrada_texto_2.get("1.0", "end-1c")  # Obtener el segundo texto
        usuario_mercadolibre = texto_1
        figu = texto_2
        ventana.destroy()  
    # Crear la ventana
    ventana = tk.Tk()
    ventana.title("Figuritas")

    ventana.state('zoomed')

    # Crear etiquetas y cuadros de entrada de texto
    etiqueta_0 = tk.Label(ventana, text="")
    etiqueta_0.pack(pady=125)

    etiqueta_1 = tk.Label(ventana, text="Usuario:")
    etiqueta_1.pack(pady=5)
    entrada_texto_1 = tk.Text(ventana, height=1, width=40)
    entrada_texto_1.pack()

    etiqueta_2 = tk.Label(ventana, text="Ingrese Figuritas:")
    etiqueta_2.pack(pady=5)
    entrada_texto_2 = tk.Text(ventana, height=5, width=160)
    entrada_texto_2.pack()

    # Crear un botón
    boton = tk.Button(ventana, text="Continuar", command=leer_figu)
    boton.pack(pady=10)

    # Iniciar el bucle de la GUI
    ventana.mainloop()

    datos.append(usuario_mercadolibre)
    datos.append(figu)



