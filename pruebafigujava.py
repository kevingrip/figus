from Funciones import*

figu = 'FWC8,AuS12,CANADA4 y ECU9,JPN9,NED12 y MEX9,MRR14,FWC7,C1,Wal17'
listaPedido = []
paises=[]

figu=figu.upper()

figu=sacar_y(figu)

figu = sacar_espacio(figu)

transformar(figu,listaPedido,paises)

listaPedidoOrdenada = sorted(listaPedido)

paisesOrdenados = sorted(paises)

rename_ARGENTINA(listaPedidoOrdenada,paisesOrdenados)

rename_AUSTRALIA(listaPedidoOrdenada,paisesOrdenados)

rename_BELGICA(listaPedidoOrdenada,paisesOrdenados)

rename_BRASIL(listaPedidoOrdenada,paisesOrdenados)

rename_CANADA(listaPedidoOrdenada,paisesOrdenados)

rename_CAMERUN(listaPedidoOrdenada,paisesOrdenados)

rename_COSTA_RICA(listaPedidoOrdenada,paisesOrdenados)

rename_CROACIA(listaPedidoOrdenada,paisesOrdenados)

rename_DINAMARCA(listaPedidoOrdenada,paisesOrdenados)

rename_ECUADOR(listaPedidoOrdenada,paisesOrdenados)

rename_INGLATERRA(listaPedidoOrdenada,paisesOrdenados)

rename_ESPAÑA(listaPedidoOrdenada,paisesOrdenados)

rename_FRANCIA(listaPedidoOrdenada,paisesOrdenados)

rename_FWC(listaPedidoOrdenada,paisesOrdenados)

rename_ALEMANIA(listaPedidoOrdenada,paisesOrdenados)

rename_GHANA(listaPedidoOrdenada,paisesOrdenados)

rename_IRAN(listaPedidoOrdenada,paisesOrdenados)

rename_JAPON(listaPedidoOrdenada,paisesOrdenados)

rename_KOREA(listaPedidoOrdenada,paisesOrdenados)

rename_ARABIA_SAUDITA(listaPedidoOrdenada,paisesOrdenados)

rename_MEXICO(listaPedidoOrdenada,paisesOrdenados)

rename_MARRUECOS(listaPedidoOrdenada,paisesOrdenados)

rename_HOLANDA(listaPedidoOrdenada,paisesOrdenados)

rename_POLONIA(listaPedidoOrdenada,paisesOrdenados)

rename_PORTUGAL(listaPedidoOrdenada,paisesOrdenados)

rename_QATAR(listaPedidoOrdenada,paisesOrdenados)

rename_SENEGAL(listaPedidoOrdenada,paisesOrdenados)

rename_SERBIA(listaPedidoOrdenada,paisesOrdenados)

rename_SUIZA(listaPedidoOrdenada,paisesOrdenados)

rename_TUNEZ(listaPedidoOrdenada,paisesOrdenados)

rename_URUGUAY(listaPedidoOrdenada,paisesOrdenados)

rename_ESTADOS_UNIDOS(listaPedidoOrdenada,paisesOrdenados)

rename_WALES(listaPedidoOrdenada,paisesOrdenados)

print (listaPedidoOrdenada)

print (paisesOrdenados)