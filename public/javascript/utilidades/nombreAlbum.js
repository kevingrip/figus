export const albumName = (nombreJson) => {
    if (nombreJson == "baseMundial") {
        return "Mundial Qatar 2022"
    } else if (nombreJson == "base_copam") {
        return "Copa America 2024"
    } else if (["baseMundialUsa","mundialUsa2026"].includes(nombreJson)) {
        return "Mundial USA 2026"
    } else if (nombreJson == "baseFutarg") {
        return "Futbol Argentino 2023"
    } else if (nombreJson == "baseFutarg24") {
        return "Futbol Arg 2024"
    } else if (nombreJson == "baseLali") {
        return "Copa Libertadores 2023"
    }
}