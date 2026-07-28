export const precioBarato = (tipo) => {
    if (tipo == "COMUNES") {
        return 500
    } else if (tipo == "EQUIPO") {
        return 800
    } else if (tipo == "AFA") {
        return 3000
    } else if (tipo == "ESCUDO AFA") {
        return 4000
    } else if (tipo == "FWC") {
        return 4000
    } else if (tipo == "ESCUDO") {
        return 2500
    } else if (tipo == "MESSI") {
        return 30000
    } else if (tipo == "ESPECIAL") {
        return 6000
    }
}