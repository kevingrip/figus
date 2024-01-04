def renamePaises(listaOriginal,lista3LetrasPaises,variantesTotales):

    FWC = ['FWC','FCW','FW','DORADAS','ESTADIO','MUSEO']
    ARG = ['ARG','ARGENTINA','AFA','ARH']
    AUS = ['AUS','AUSTRALIA','AUT','AUST','AUTRALIA']
    BEL = ['BEL','BELGICA','BLGICA','BELJICA','BL','BELGIUM','BELGI','BELG']
    BRA = ['BRA','BRASIL','BRAZIL']
    CAN = ['CAN','CANADA','CANAD','CANA',"CAADA"]
    CMR = ['CMR','CAMERUN','CAMEROON','CAMERN','CAM','CM','CAMERON','CRM','CAME','CAMERRON','CAMER']
    CRC = ['CRC','COSTARICA','COSTA RICA','COST','ELESCUDODECOSTARICA','CR','COSRIC']
    CRO = ['CRO','CROACIA','CROATIA','CROA','CROCIA']
    DEN = ['DEN','DINAMARCA','DENMARK','DINMICA','DENAMARK','DENMARARK','DIAMARCA','DINA']
    ECU = ['ECU','ECUADOR']
    ENG = ['ENG','INGLATERRA','ENGLAND','ING']
    ESP = ['ESP','ESPAÑA','SPAIN','ESPAA']
    FRA = ['FRA','FRANCIA','FRANCE','FRAC','FRAN']
    GER = ['GER','GERMAN','ALEMANIA','ALE','GERM','GERMANY','ALEM']
    GHA = ['GHA','GHANA','GANA','GHAN']
    IRN = ['IRN','IRAN','IRÁN','IRIRAN','LRN','IRAM']
    JPN = ['JPN','JAPON','JAPAN','JAPN','JAP']
    KOR = ['KOR','KOREA','COREA','KOREADELSUR','COR','COREADELSUR','KOREAREPUBLIC','KORE']
    KSA = ['KSA','ARABIASAUDITA','ARABIA','SAUDIAR','ARAB','ARABIASAUDI','SAUDIARABIA','ARABSAU']
    MEX = ['MEX','MEXICO','MEJICO','MXICO','MÉXICO','MX','MEXIVO']
    MRR = ['MRR','MAR','MARRUECOS','MARRU','MOROCCO','MORROCO','MARR','MAROCCO']
    NED = ['NED','HOLANDA','NETHERLANDS','NEDERLAND','PAISESBAJOS','OLANDA','NETHER','NETHELAND','PASESBAJOS','HOL','HOLAN','NETHERLAND']
    POL = ['POL','POLONIA','POLAND','PO']
    POR = ['POR','PORTUGAL','PORT']
    QAT = ['QAT','QATAR',"QATARÍ"]
    SEN = ['SEN','SENEGAL','SENEG']
    SRB = ['SRB','SERBIA','SER','SERB']
    SUI = ['SUI','SUIZA','SUSA','SWITZERLAND','SIU','SWITZERLABD']
    TUN = ['TUN','TUNEZ','TUNISIA','TNEZ','TUNES','TN','TUNI','TINISIA']
    URU = ['URU','URUGUA','URUGUAYO','URUGUAO','URUG']
    USA = ['USA','ESTADOSUNIDOS','EEUU','EE.UU']
    WAL = ['WAL','WALES','GALES','GAL','GALS','WALLES']
    COCA = ['C','COCA','COC','COCACOLA']
    paisesFigus = [FWC,ARG,AUS,BEL,BRA,CAN,CMR,CRC,CRO,DEN,ECU,ENG,ESP,FRA,GER,GHA,IRN,JPN,KOR,KSA,MEX,MRR,NED,POL,POR,QAT,SEN,SRB,SUI,TUN,URU,USA,WAL,COCA]
    listaDePaises = []

    for listas in paisesFigus:
        listaDePaises.append(listas)
        for p in listas:
            variantesTotales.append(p)

    for i in range(len(listaOriginal)):

        for l in range(len(listaDePaises)):            
            if listaOriginal[i] in listaDePaises[l]:
                listaOriginal[i]=listaDePaises[l][0]

    for i in range(len(lista3LetrasPaises)):

        for l in range(len(listaDePaises)):            
            if lista3LetrasPaises[i] in listaDePaises[l]:
                lista3LetrasPaises[i]=listaDePaises[l][0]
