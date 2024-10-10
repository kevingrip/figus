from bases import *

bf24 = baseFutarg24()

lista=['ARJ12', 'ARJ14', 'ARJ16', 'ATU1', 'ATU10', 'ATU12', 'ATU14', 'ATU16', 'ATU2', 'ATU4', 'ATU5', 'BAN12', 'BAN14', 'BAN16', 'BAN2', 'BAN4', 'BAN6', 'BAN8', 'BAR11', 'BAR15', 'BAR2', 'BAR5', 'BAR7', 'BAR9', 'BEL10', 'BEL14', 'BEL16', 'BEL8', 'BOC10', 'BOC2','BOC6', 'CCO1', 'CCO10', 'CCO12', 'CCO14', 'CCO2', 'CCO4', 'CCO6', 'CCO8', 'CEN10', 'CEN12', 'CEN14', 'CEN2', 'CEN4', 'CEN6', 'CEN8', 'EST10', 'EST12', 'EST14', 'EST2', 'EST6', 'EST8', 'GIM10', 'GIM11', 'GIM14', 'GIM16', 'GIM17', 'GIM3', 'GIM6', 'GOD1', 'GOD10', 'GOD12', 'GOD15', 'GOD2', 'GOD4', 'GOD6', 'GOD8', 'HUR15', 'HUR2', 'HUR4', 'IND11', 'IND12', 'IND14', 'IND2', 'IND3', 'IND4', 'IND6', 'IND8', 'INS10', 'INS17', 'INS4', 'INS6', 'INS8', 'INS9', 'IRM14', 'IRM16', 'IRM17', 'IRM2', 'IRM3', 'IRM4', 'IRM6', 'IRM9', 'LAN11', 'LAN17', 'LAN2', 'LAN3', 'LAN9', 'NOB1', 'NOB3', 'PLA12', 'PLA16', 'PLA6', 'RAC1', 'RAC8', 'RIE1', 'RIE12', 'RIE16', 'RIE9', 'RIV10', 'RIV12', 'RIV14', 'SAR1', 'SAR13', 'SAR15', 'SAR6', 'SEM1', 'SLO12', 'SLO6', 'TAL13', 'TAL15', 'TAL7', 'TIG1', 'TIG14', 'TIG2', 'TIG4', 'TIG6', 'TIG8', 'TIG9', 'UNI1', 'UNI16', 'UNI2', 'UNI4', 'VEL1', 'VEL14', 'VEL16', 'VEL2', 'VEL6', 'VEL9', 'YPF1','DYJ1','LAN10','NOB14','PLA14','RIE8','SLO14','SLO15','UNI6','HUR8','HUR17','SAR4']

contar=0

for i in bf24:
    if i["NUM"] in lista:
        
        i["CANT"]-=1
        print(i)
        contar+=1

with open("baseFutarg24.json","w") as bf:
    json.dump(bf24,bf,indent=4)

print("Figuritas descontadas: ",contar)