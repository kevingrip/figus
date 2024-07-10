tiene = ["ARG12", "ARG17", "ARG20", "PER7", "PER9", "PER13", "PER15", "PER16", "PER19", "PER20", "PER22", "CHI4", "CHI7", "CHI13", "CHI14", "CHI17", "CHI22", "MEX4", "MEX12", "ECU8", "ECU10", "ECU14", "VEN17", "VEN18", "VEN20", "JAM1", "JAM14", "JAM15", "JAM19", "USA4", "USA8", "USA16", "USA22", "URU3", "URU4", "URU5", "URU6", "URU13", "PAN5", "PAN7", "PAN8", "PAN21", "BOL4", "BOL6", "BOL10", "BOL14", "BOL16", "BOL19", "BRA14", "BRA3", "BRA14", "COL1", "COL3", "COL6", "COL14", "COL15", "COL16", "PAR4", "PAR6", "PAR10", "CAN1", "CAN2", "CAN5", "CAN8", "CAN9", "CAN11", "CAN14", "CAN15", "CAN16", "CRC4", "CRC6", "CRC8", "CRC18", "HON3", "HON6", "HON12", "HON25", "TRI1", "TRI5", "TRI14", "TRI16", "TRI20", "TRI21", "TRI22"]

import json

from bases import *

base = baseCopamerica()

cant=0
noCant= 0

precio=0

for x in base:
    if x["CANT"]>0:
        if x["NUM"] not in tiene:
            precio+=x["PRECIO"]
            cant+=1
    else:
        noCant+=1

print(cant)

print(precio)

print("nocant: ", noCant)