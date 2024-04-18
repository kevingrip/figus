from bases import*

base = baseMundial()



def bm():
    for x in base:
        if x["NUM"] in ("FWC28","ESP1","POR1","FWC19","FWC23","CMR1","C4"):
            x["CANT"]+=1
        elif x["NUM"] in ("FWC20","FWC27","C2","C3"):
            x["CANT"]+=2
        elif x["NUM"] in ("FWC22","FWC26"):
            x["CANT"]+=3
    return(base)

