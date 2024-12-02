from bases import *

bf24 = baseFutarg24()

lista=['ARJ1', 'ARJ10', 'ARJ12', 'ARJ2', 'ARJ3', 'ARJ4', 'ARJ6', 'ARJ9', 'ATU10', 'ATU12', 'ATU13', 'ATU14', 'ATU2', 'ATU4', 'ATU6', 'ATU8', 'ATU9', 'BAN11', 'BAN12', 'BAN14', 'BAN15', 'BAN16', 'BAN9', 'BAR11', 'BAR14', 'BAR3','BAR12', 'BEL3', 'BEL5', 'BOC11', 'BOC14', 'BOC3', 'CCO1', 'CCO10', 'CCO12', 'CCO15', 'CCO4', 'CCO6', 'CCO8', 'CEN2', 'CEN4', 'CEN6', 'CEN7', 'CEN9', 'COP10', 'COP6', 'DYJ10', 'DYJ11', 'DYJ13', 'DYJ16', 'DYJ5', 'DYJ7', 'DYJ8', 'EST1', 'EST12', 'EST13', 'EST3', 'EST4', 'EST5', 'EST9', 'GIM12', 'GIM16', 'GIM2', 'GIM4', 'GIM6', 'GOD14', 'GOD2', 'GOD6', 'GOD9', 'HUR1', 'HUR10', 'HUR11', 'HUR13', 'HUR14', 'HUR15', 'HUR16', 'HUR3', 'HUR6', 'HUR8', 'IND11', 'IND13', 'IND3', 'IND5', 'INS10', 'INS16', 'INS4', 'IRM1', 'IRM10', 'IRM12', 'IRM16', 'IRM7', 'LAN1', 'LAN16', 'LAN2', 'NOB15', 'PLA1', 'RAC8', 'RAC9', 'RIE11', 'RIE13', 'RIE2', 'RIE4', 'RIE5', 'RIE6', 'RIE7','RIV5', 'SAR1', 'SAR13','SAR14', 'SEM2', 'SEM4', 'SEM5', 'SLO1', 'SLO13', 'SLO7', 'SLO9', 'TAL12', 'TAL14', 'TAL16', 'TAL5', 'TAL6', 'TAL8', 'TIG1', 'TIG10', 'TIG11', 'TIG13', 'TIG14', 'TIG16', 'TIG2', 'TIG4', 'TIG6', 'TIG8', 'UNI10', 'UNI11', 'UNI12', 'UNI14', 'UNI15', 'UNI16', 'UNI3', 'UNI4', 'UNI6', 'UNI8', 'UNI9', 'VEL2', 'VEL4', 'VEL9', 'VEL11', 'YPF1', 'YPF10', 'YPF3']

contar=0

for i in bf24:
    if i["NUM"] in lista:
        
        i["CANT"]-=1
        print(i)
        contar+=1

with open("baseFutarg24.json","w") as bf:
    json.dump(bf24,bf,indent=4)

print("Figuritas descontadas: ",contar)