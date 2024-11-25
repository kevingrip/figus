from bases import *

bf24 = baseFutarg24()

lista=['ARJ1', 'ARJ14', 'ARJ15', 'ARJ16', 'ARJ2', 'ARJ8', 'ARJ9', 'ATU10', 'ATU12', 'ATU14', 'ATU16', 'ATU17', 'ATU2', 'ATU4', 'ATU5', 'ATU6', 'ATU8', 'BAN10', 'BAN12', 'BAN14', 'BAN16', 'BAN2', 'BAN3', 'BAN4', 'BAN6', 'BAN8', 'BAR2', 'BEL1', 'BOC12', 'BOC8', 'BOC16', 'BOC17', 'CCO1', 'CCO10', 'CCO12', 'CCO14', 'CCO2', 'CCO4', 'CCO6', 'CCO8', 'CCO9', 'CEN2', 'CEN4', 'COP10', 'COP5', 'COP6', 'COP9', 'DYJ12', 'DYJ14', 'DYJ16', 'DYJ2', 'DYJ4', 'DYJ6', 'EST1', 'EST10', 'EST12', 'EST14', 'EST2', 'EST4', 'EST8', 'GIM10', 'GIM13', 'GIM14', 'GIM4', 'GIM5', 'GIM8', 'GOD10', 'GOD12', 'GOD13', 'GOD15', 'GOD16', 'GOD4', 'GOD8', 'HUR10', 'HUR12', 'HUR14', 'HUR16', 'HUR17', 'HUR2', 'HUR4', 'HUR6', 'HUR8', 'IND11', 'IND13', 'IND2', 'IND5', 'INS2', 'IRM3', 'IRM5', 'NOB6', 'PLA1', 'PLA14', 'RAC16', 'RAC2', 'RAC8', 'RIE12', 'RIE2', 'RIE4', 'RIE6', 'RIV10', 'RIV11', 'RIV8', 'SAR10', 'SAR12', 'SAR14', 'SAR16', 'SAR8', 'BEL9', 'BEL12', 'CEN10', 'SEM6', 'SLO10', 'SLO11', 'SLO12', 'SLO14', 'SLO15', 'SLO16', 'SLO17', 'SLO2', 'SLO4', 'SLO5', 'SLO6', 'SLO8', 'TAL10', 'TAL12', 'TAL14', 'TAL16', 'TAL2', 'TAL4', 'TAL8', 'TIG12', 'TIG16', 'TIG2', 'TIG8', 'UNI10', 'UNI12', 'UNI13', 'UNI14', 'UNI16', 'UNI17', 'UNI2', 'UNI4', 'UNI8', 'UNI9', 'VEL12', 'VEL14', 'VEL17', 'VEL4', 'VEL6', 'YPF10']

contar=0

for i in bf24:
    if i["NUM"] in lista:
        
        i["CANT"]-=1
        print(i)
        contar+=1

with open("baseFutarg24.json","w") as bf:
    json.dump(bf24,bf,indent=4)

print("Figuritas descontadas: ",contar)