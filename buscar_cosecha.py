import json

def buscarCosecha(album,figusNoTengo):
    
    with open("cosechas.json","r") as cosechasJSON:
        cosechas = json.load(cosechasJSON)

    cosechaFutarg = cosechas[album]



    for pilones in cosechaFutarg:
        ubicacion=0
        for figuritas in (pilones["NUMEROS"]):
            ubicacion +=1
            if figuritas in figusNoTengo:
                print(figuritas, " en el pilon",pilones["PILON"], "en la ubicacion",ubicacion)