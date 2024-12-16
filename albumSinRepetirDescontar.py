from bases import *

bf24 = baseFutarg24()

lista=[
                "ARJ3", "ARJ4", "ARJ5", "ARJ6", "ARJ7", "ARJ9","ARJ10", "ARJ11", "ARJ12", "ARJ13",  "ARJ15",     "ATU3", "ATU5", "ATU7", "ATU9","ATU11", "ATU13", "ATU15", "ATU17", "BAN3", "BAN5", "BAN7", "BAN8", "BAN9", "BAN10", "BAN11", "BAN12", "BAN13",  "BAN16", "BAN17", "BAR2", "BAR4", "BAR5", "BAR7",  "BAR10", "BAR11", "BAR12", "BAR13", "BAR15", "BAR16", "BAR17", "BEL3", "BEL4", "BEL5", "BEL6", "BEL7", "BEL9", "BEL11", "BEL12", "BEL13", "BEL14", "BEL15", "BEL17","BOC3","BOC5","BOC7", "CCO3", "CCO6", "CCO7", "CCO8","CCO11", "CCO12", "CCO13", "CCO14", "CCO16", "CCO17","CEN13", "DYJ3", "DYJ5", "DYJ9","DYJ13", "DYJ15", "DYJ17","EST1", "EST7","GIM1","GIM16", "GOD13", "GOD15", "HUR1", "HUR5", "HUR7", "HUR9","HUR11", "HUR13", "HUR15", "HUR17",  "IND3", "IND9","IND11", "IND17", "IRM3", "IRM5","INS16", "LAN1", "LAN3", "LAN5", "LAN7", "LAN9", "LAN11", "LAN13", "LAN15","NOB3", "NOB5", "NOB7", "NOB9", "NOB17", "PLA5", "PLA7", "PLA13", "PLA15", "RAC9", "RIE3", "RIE5", "RIE7", "RIV1","RIV9",  "SAR5", "SAR7", "SAR15","SLO7", "SLO9", "SLO15", "TAL1", "TAL7", "TAL15", "TAL17","TIG3", "TIG5", "TIG9","TIG11", "TIG13", "TIG15", "TIG17", "UNI3", "UNI9", "UNI11", "UNI13", "UNI15", "VEL9", "VEL11", "VEL13", "VEL15", "YPF8","YPF4","LPF3","COP5","COP10","SEM3","SEM5"
            ]

contar=0

for i in bf24:
    if i["NUM"] in lista:
        
        i["CANT"]-=1
        print(i)
        contar+=1

with open("baseFutarg24.json","w") as bf:
    json.dump(bf24,bf,indent=4)

print("Figuritas descontadas: ",contar)