import json

def agregar_serie(album, prefijo, cantidad,tipo):

    for i in range(1, cantidad + 1):
        if tipo ==1:
            if(i==1):
                album.append({
                    "NUM": f"{prefijo}{i}",
                    "CANT": 0,
                    "PRECIO": 0,
                    "TIPO": "ESCUDO",
                    "DIA": "",
                    "ACTUALIZACION": "",
                    "NOMBRE": ""
                })
            elif(i==13):
                album.append({
                    "NUM": f"{prefijo}{i}",
                    "CANT": 0,
                    "PRECIO": 0,
                    "TIPO": "EQUIPO",
                    "DIA": "",
                    "ACTUALIZACION": "",
                    "NOMBRE": ""
                })
            else:
                album.append({
                    "NUM": f"{prefijo}{i}",
                    "CANT": 0,
                    "PRECIO": 0,
                    "TIPO": "COMUNES",
                    "DIA": "",
                    "ACTUALIZACION": "",
                    "NOMBRE": ""
                })
        elif tipo==2:
            album.append({
                "NUM": f"{prefijo}{i}",
                "CANT": 0,
                "PRECIO": 0,
                "TIPO": "FWC",
                "DIA": "",
                "ACTUALIZACION": "",
                "NOMBRE": ""
            })
        elif tipo==3:
            album.append({
                "NUM": f"{prefijo}{i}",
                "CANT": 0,
                "PRECIO": 0,
                "TIPO": "COCA",
                "DIA": "",
                "ACTUALIZACION": "",
                "NOMBRE": ""
            })

album = []

# Selecciones
selecciones = [
    "ALG",  # Argelia
    "ARG",  # Argentina
    "AUS",  # Australia
    "AUT",  # Austria
    "BEL",  # Bélgica
    "BIH",  # Bosnia y Herzegovina
    "BRA",  # Brasil
    "CAN",  # Canadá
    "CPV",  # Cabo Verde
    "COD",  # RD del Congo
    "COL",  # Colombia
    "CRC",  # Curazao
    "CRO",  # Croacia
    "CZE",  # República Checa
    "CIV",  # Costa de Marfil
    "EGY",  # Egipto
    "ENG",  # Inglaterra
    "FRA",  # Francia
    "GER",  # Alemania
    "GHA",  # Ghana
    "HAI",  # Haití
    "IRN",  # Irán
    "IRQ",  # Irak
    "JOR",  # Jordania
    "JPN",  # Japón
    "KOR",  # Corea del Sur
    "MAR",  # Marruecos
    "MEX",  # México
    "NED",  # Países Bajos
    "NOR",  # Noruega
    "NZL",  # Nueva Zelanda
    "PAN",  # Panamá
    "PAR",  # Paraguay
    "POR",  # Portugal
    "QAT",  # Catar
    "KSA",  # Arabia Saudita
    "SCO",  # Escocia
    "SEN",  # Senegal
    "RSA",  # Sudáfrica
    "ESP",  # España
    "SWE",  # Suecia
    "SUI",  # Suiza
    "TUN",  # Túnez
    "TUR",  # Turquía
    "USA",  # Estados Unidos
    "URU",  # Uruguay
    "UZB",  # Uzbekistán
    "VEN"   # Venezuela
]

for pais in selecciones:
    agregar_serie(album, pais, 20,1)

# Series especiales (ejemplos)
agregar_serie(album, "FWC", 20,2)
agregar_serie(album, "CC", 14,3)      # Coca-Cola

with open("baseMundialUsa.json", "w", encoding="utf-8") as f:
    json.dump(album, f, ensure_ascii=False, indent=2)

print(len(album))