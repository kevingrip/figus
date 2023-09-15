import datetime

def hora():

    hora_actual = datetime.datetime.now().strftime("%H:%M:%S")

    if hora_actual >= '12:59:59' and hora_actual <= '20:00:00':
        return ("buenas tardes")
    elif hora_actual >= '20:00:01' and hora_actual <= '23:59:59':
        return ("buenas noches")
    elif hora_actual >= '00:00:00' and hora_actual <= '05:00:00':
        return ("buenas noches")
    else:
        return ("buen dia")