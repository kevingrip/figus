from bases import *

bf24 = baseFutarg24()

lista=["BAN1", "BAR17", "BEL3", "BEL7", "BEL11", "BEL13", "BEL17", "BOC3", "BOC5", "BOC15", "CCO1", "COP2", "COP4", "DYJ1", "DYJ2", "DYJ4", "DYJ6", "DYJ8", "DYJ9", "DYJ10", "DYJ12", "DYJ14", "DYJ15", "EST2", "EST6", "EST10", "EST12", "EST17", "GIM2", "GIM3", "GIM4", "GIM6", "GIM9", "GIM12", "GIM13", "GIM14", "GIM16", "GIM17", "GOD2", "GOD3", "GOD4", "GOD6", "GOD13", "GOD14", "HUR5", "HUR6", "HUR14", "HUR17", "IND9", "IND12", "INS2", "INS4", "INS6", "INS7", "INS8", "INS10", "INS12", "INS14", "INS15", "INS16", "INS17", "IRM4", "IRM6", "IRM9", "IRM12", "IRM14", "IRM16", "LAN1", "LAN2", "LAN4", "LAN5", "LAN7", "LAN8", "LAN9", "LAN10", "LAN11", "LAN13", "LAN15", "LAN16", "LPF3", "NOB2", "NOB3", "NOB5", "NOB7", "NOB8", "NOB9", "NOB10", "NOB12", "NOB13", "NOB15", "NOB16", "PLA2", "PLA3", "PLA4", "PLA5", "PLA10", "PLA11", "PLA13", "PLA15", "PLA16", "PLA17", "RAC2", "RAC10", "RAC16", "RIE1", "RIE2", "RIE4", "RIE6", "RIE7", "RIE10", "RIE12", "RIE14", "RIE15", "RIE16", "SAR1", "SAR2", "SAR3", "SAR5", "SAR6", "SAR7", "SAR8", "SAR10", "SAR12", "SAR16", "SEM3", "SEM5", "SEM7", "SEM9", "SLO3", "SLO4", "SLO5", "SLO7", "SLO8", "SLO9", "SLO10", "SLO12", "SLO15", "TAL8", "TAL10", "TAL17", "TIG1", "TIG9", "TIG11", "UNI8", "UNI9", "UNI11", "VEL1", "VEL10", "VEL17", "YPF8"]

contar=0

for i in bf24:
    if i["NUM"] in lista:
        
        i["CANT"]-=1
        print(i)
        contar+=1

with open("baseFutarg24.json","w") as bf:
    json.dump(bf24,bf,indent=4)

print("Figuritas descontadas: ",contar)