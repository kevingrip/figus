def espacioFigu(figus):
    cantCaracter = 0
    figusNuevo=''
    for caracter in figus:
        cantCaracter +=1
        if caracter == ',':
            cantCaracter = 0
            figusNuevo += ', '
        else:
            if cantCaracter == 4:
                figusNuevo +=  " "+caracter
            else:
                figusNuevo += caracter
    return (figusNuevo)