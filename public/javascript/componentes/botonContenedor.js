export function crearBotonContenedor(figu, album, altura) {
    const contenedor = document.createElement("div");
    contenedor.style.display = "inline-flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";
    contenedor.style.justifyContent = "space-between";
    contenedor.style.width = "60px";
    contenedor.style.height = altura || "70px";
    contenedor.style.border = "1px solid black";

    const informacion = document.createElement("div");
    informacion.style.display = "flex";
    informacion.style.flexDirection = "column";
    informacion.style.alignItems = "center";

    const textoSuperior = document.createElement("div");
    textoSuperior.textContent = figu.NUM || figu;
    textoSuperior.style.fontSize = "13px";
    textoSuperior.style.fontWeight = "bold";

    const textoInferior = document.createElement("div");

    let cantTotal = 0;
    if (parseInt(contenedor.style.height) > 20) {        

        Object.entries(figu.STOCK ?? {}).forEach(([proveedor, valor]) => {
            cantTotal += Number(valor.CANT) || 0;
        });

        textoInferior.textContent = `Cant: ${cantTotal}`;
    }

    textoInferior.style.fontSize = "11px";

    informacion.appendChild(textoSuperior);
    informacion.appendChild(textoInferior);

    contenedor.style.margin = "3px"

    contenedor.appendChild(informacion);
    let color;
    if (album == "mundialQatar2022") {
        color = "#e27a2b"
    } else if (album == "mundialUsa2026") {
        color = "#a050eb"
    } else if (album == "copaAmerica2024") {
        color = "#79c7f4"
    }
    contenedor.style.backgroundColor = color

    return { contenedor, color, cantTotal }
}