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

export const nombrePublicacion = (mla_id) => {
    if (["MLA1241847466", "MLA1287984004", "MLA3668808570"].includes(mla_id)) {
        return { album: "Mundial QATAR 2022", bdd: "mundialQatar2022" }
    } else if (["MLA3643992402", "MLA3643993376", "MLA1911338959", "MLA3589325682", "MLA3668909352","MUNDIAL 2026","FIFA World Cup USA 2026"].includes(mla_id)) {
        return { album: "Mundial USA 2026", bdd: "mundialUsa2026" }
    } else if (["MLA1413919557", "MLA1921984423"].includes(mla_id)) {
        return { album: "Copa America 2024", bdd: "copaAmerica2024" }
    } else if (["MLA1923493602"].includes(mla_id)) {
        return { album: "Futbol Argentino 2024", bdd: "futbolArgentino2024" }
    } else if (["MLA1377452117"].includes(mla_id)) {
        return { album: "Futbol Argentino 2023", bdd: "futbolArgentino2023" }
    }
    return mla_id
}

export const seller_name = (seller_id) =>{
    if (seller_id===1005868067){
        return "KEVIN"
    }
    if (seller_id===2385461382){
        return "MAMA"
    }
}