import json

def contarBase(base):
        with open(base,"r") as listaJson:
                baseFigu = json.load(listaJson)

        cant= 0

        for linea in baseFigu:
                cant += linea["CANT"]

        print(cant)

contarBase("baseMundial.json")
