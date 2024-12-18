from bases import *

bf24 = baseFutarg24()

lista=["ATU1", "BAN1", "BAR17", "BEL3", "BEL5", "BEL7", "BEL9", "BEL11", "BEL13", "BEL15", "BEL17", "BOC3", "BOC5", "BOC7", "BOC13", "BOC14", "BOC15", "BOC17", "CCO1", "CCO5", "CCO13", "CCO15", "COP2", "COP4", "DYJ1", "DYJ2", "DYJ6", "DYJ7", "DYJ8", "DYJ9", "DYJ14", "DYJ15", "EST8", "EST10", "EST17", "GIM3", "GIM4", "GIM5", "GIM6", "GIM9", "GIM11", "GIM12", "GIM13", "GIM14", "GIM17", "GOD3", "GOD4", "GOD5", "GOD6", "GOD13", "GOD14", "HUR5", "HUR6", "HUR14", "HUR15", "HUR17", "IND9", "INS4", "INS6", "INS7", "INS8", "INS10", "INS11", "INS12", "INS14", "INS15", "INS17", "IRM8", "IRM9", "IRM12", "IRM13", "IRM14", "IRM16", "IRM17", "LAN1", "LAN3", "LAN5", "LAN7", "LAN8", "LAN9", "LAN10", "LAN11", "LAN13", "LAN15", "LAN16", "LAN17", "LPF3", "NOB3", "NOB5", "NOB7", "NOB8", "NOB9", "NOB10", "NOB11", "NOB12", "NOB13", "NOB15", "NOB16", "NOB17", "PLA2", "PLA3", "PLA5", "PLA7", "PLA9", "PLA10", "PLA11", "PLA13", "PLA16", "PLA17", "RIE1", "RIE2", "RIE5", "RIE6", "RIE7", "RIE10", "RIE12", "RIE16", "SAR1", "SAR3", "SAR5", "SAR7", "SAR8", "SAR10", "SAR16", "SEM3", "SEM5", "SEM7", "SEM9", "SLO3", "SLO5", "SLO7", "SLO9", "SLO11", "SLO13", "SLO15", "SLO17", "TAL8", "TAL17", "TIG1", "TIG9", "TIG11", "UNI9", "UNI11", "UNI13", "UNI15", "VEL1", "VEL10", "VEL12", "VEL17", "YPF8"]

contar=0

for i in bf24:
    if i["NUM"] in lista:
        
        i["CANT"]-=1
        print(i)
        contar+=1

with open("baseFutarg24.json","w") as bf:
    json.dump(bf24,bf,indent=4)

print("Figuritas descontadas: ",contar)