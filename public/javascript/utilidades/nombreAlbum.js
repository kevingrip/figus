export const albumName = (nombre) => {
    if (["mundialQatar2022","baseMundial"].includes(nombre)) {
        return "Mundial Qatar 2022"
    } else if (["copaAmerica2024","base_copam"].includes(nombre)) {
        return "Copa America 2024"
    } else if (["baseMundialUsa","mundialUsa2026"].includes(nombre)) {
        return "Mundial USA 2026"
    } else if (["futbolArgentino2023","baseFutarg"].includes(nombre)) {
        return "Futbol Argentino 2023"
    } else if (["futbolArgentino2024","baseFutarg24"].includes(nombre)) {
        return "Futbol Arg 2024"
    } else if (["libertadores2023","baseLali"].includes(nombre)) {
        return "Copa Libertadores 2023"
    }
}