from bases import *

bf24 = baseFutarg24()

lista=['ARJ10', 'ARJ11', 'ARJ12', 'ARJ13', 'ARJ15', 'ARJ3', 'ARJ4', 'ARJ5', 'ARJ7', 'ARJ9', 'ATU11', 'ATU13', 'ATU15', 'ATU17', 'ATU3', 'ATU5', 'ATU7', 'ATU9', 'BAN11', 'BAN13', 'BAN15', 'BAN17', 'BAN2', 'BAN3', 'BAN7', 'BAR11', 'BAR15', 'BAR17', 'BAR3', 'BAR5', 'BAR7', 'BEL13', 'BEL17', 'BEL3', 'BEL5', 'BOC1', 'BOC14', 'BOC3', 'BOC7', 'CCO5', 'CEN17', 'CEN5', 'CEN9', 'COP1', 'COP2', 'COP4', 'COP5', 'COP6', 'COP9', 'DYJ13', 'DYJ15', 'DYJ7', 'EST13', 'EST15', 'EST17', 'EST5', 'EST7', 'GIM1', 'GIM12', 'GIM2', 'GIM3', 'GIM9', 'GOD11', 'GOD13', 'GOD15', 'GOD17', 'GOD2', 'GOD9', 'HUR1', 'HUR11', 'HUR13', 'HUR15', 'HUR3', 'HUR5', 'HUR7', 'IND13', 'IND15', 'IND7', 'INS17', 'IRM1', 'IRM5', 'IRM7', 'LAN1', 'LAN11', 'LAN15', 'LAN16', 'LAN17', 'LAN3', 'LAN5', 'LAN7', 'NOB11', 'NOB13', 'NOB15', 'NOB5', 'NOB7', 'PLA1', 'PLA11', 'PLA13', 'PLA15', 'PLA3', 'PLA5', 'PLA9', 'RAC11', 'RAC13', 'RAC15', 'RAC17', 'RAC3', 'RAC5', 'RAC9', 'RIE15', 'RIE5', 'RIE7', 'RIV11', 'SAR3', 'SAR5', 'SAR7', 'SEM2', 'SEM5', 'SEM6', 'SEM7', 'SEM8', 'SEM9', 'SLO11', 'SLO13', 'SLO15', 'SLO17', 'SLO3', 'SLO5', 'SLO7', 'SLO9', 'TAL17', 'TIG11', 'TIG13', 'TIG17', 'TIG5', 'TIG9', 'UNI11', 'UNI13', 'UNI15', 'UNI17', 'UNI3', 'UNI5', 'UNI8', 'UNI9', 'VEL17', 'VEL3', 'VEL4', 'VEL5', 'VEL7', 'YPF8']

contar=0

for i in bf24:
    if i["NUM"] in lista:
        
        i["CANT"]-=1
        print(i)
        contar+=1

with open("baseFutarg24.json","w") as bf:
    json.dump(bf24,bf,indent=4)

print("Figuritas descontadas: ",contar)