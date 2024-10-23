from bases import *

bf24 = baseFutarg24()

lista=['ARJ1', 'ARJ11', 'ARJ13', 'ARJ5', 'ATU11', 'ATU12', 'ATU13', 'ATU14', 'ATU15', 'ATU16', 'ATU6', 'ATU7', 'ATU8', 'BAN1', 'BAN10', 'BAN2', 'BAN4', 'BAN5', 'BAN6', 'BAN7', 'BAR13', 'BAR17', 'BEL11', 'BEL13', 'BEL15', 'BEL3', 'BEL7', 'BOC11', 'BOC12', 'BOC10', 'BOC15', 'BOC16', 'BOC4', 'BOC8', 'CCO10', 'CCO11', 'CCO12', 'CCO13', 'CCO14', 'CCO15', 'CCO2', 'CCO3', 'CCO4', 'CCO6', 'CCO7', 'CCO8', 'CEN11', 'CEN14', 'CEN3', 'CEN4', 'CEN5', 'CEN6', 'CEN7', 'COP9', 'DYJ14', 'EST16', 'EST4', 'GIM12', 'GIM14', 'GIM2', 'GIM4', 'GIM5', 'GIM8', 'GIM9', 'GOD16', 'GOD3', 'GOD5', 'HUR10', 'HUR16', 'HUR5', 'HUR7', 'HUR9', 'IND1', 'IND12', 'IND14', 'IND16', 'IND17', 'IND4', 'IND5', 'INS1', 'INS12', 'INS14', 'INS16', 'INS6', 'IRM12', 'IRM14', 'IRM2', 'IRM6', 'LAN16', 'LAN5', 'LAN6', 'LAN8', 'NOB10', 'NOB11', 'NOB14', 'NOB2', 'NOB4', 'NOB6', 'NOB9', 'PLA11', 'PLA12', 'PLA17', 'PLA3', 'PLA4', 'PLA9', 'RAC11', 'RAC17', 'RAC3', 'RIE14', 'RIE4', 'RIE6', 'RIE8', 'RIV13', 'RIV14', 'RIV15', 'RIV16', 'RIV17', 'RIV8', 'RIV9', 'SAR11', 'SAR16', 'SAR17', 'SAR4', 'SAR6', 'SAR8', 'SAR9', 'SEM3', 'SEM5', 'SLO12', 'SLO2', 'SLO4', 'TAL1', 'TAL16', 'TAL9', 'TIG10', 'TIG12', 'TIG15', 'TIG16', 'UNI11', 'UNI13', 'UNI15', 'UNI16', 'VEL2', 'VEL3', 'VEL4', 'VEL5', 'VEL6', 'VEL7', 'YPF5']

contar=0

for i in bf24:
    if i["NUM"] in lista:
        
        i["CANT"]-=1
        print(i)
        contar+=1

with open("baseFutarg24.json","w") as bf:
    json.dump(bf24,bf,indent=4)

print("Figuritas descontadas: ",contar)