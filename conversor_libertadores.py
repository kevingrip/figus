import pyperclip


def conversorLibertadores(figuritas):

    #libertadores='CL2, CL4, 95, 126, 204, 213, 242, 256, 265, 270, 290, 311, 333, 358, 359, 360, 387, 413, 432, 435, 450, 511, 543'
    libertadores_figu=''
    listaLibertadores = []

    for i in figuritas:
        if i in ('.',',','y','-'):
            listaLibertadores.append(libertadores_figu)
            libertadores_figu=''
        elif i !=' ':
            libertadores_figu=libertadores_figu+i

    #libertadores_figu="'"+libertadores_figu+"'"
    listaLibertadores.append(libertadores_figu)


    return (listaLibertadores)