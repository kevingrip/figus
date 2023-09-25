

def controlFutarg(ingresaFigu):
    numero = ''
    figus = []
    validacion = False
    ingresaFigu +=','

    for caracter in ingresaFigu:
        if caracter not in (".",",","/"," ","-"):
            numero = numero + caracter
        else:
            if len(numero)<= 3:
                if caracter!=' ':
                    figus.append(int(numero))
                    numero =''
            else:
                validacion = True

    if validacion is True:
        return ("Error de numero")
    else:
        return (figus)
