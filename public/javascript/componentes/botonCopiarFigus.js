export const botonCopiar = (figuritas, pdm) => {
    const botonCopiarFigus = document.createElement('button')
    botonCopiarFigus.textContent = 'Copiar Figus'

    botonCopiarFigus.addEventListener('click', async () => {
        try {
            let figus;
            let pais=null;
            if (pdm) {
                figus = figuritas.map(figu => {                    
                    if (figu.TIPO == "COCA") {
                        return figu.NUM.slice(0, 2) + " " + figu.NUM.slice(2);
                    } else {
                        return figu.NUM.slice(0, 3) + " " + figu.NUM.slice(3);
                    }
                }).join(", ")
            }else{
                figus = figuritas.map(figu => figu.NUM).join(", ")
            }
            await navigator.clipboard.writeText(figus)
            console.log('¡Texto copiado al portapapeles con éxito!');
        } catch (error) {
            console.error('Error al copiar el texto: ', error);
        }
    })
    return botonCopiarFigus
}