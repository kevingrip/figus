def listaOrdenada(figus):
    ventaOrdenada=''
    anterior=''
    for figurita in figus:
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
    return (ventaOrdenada)