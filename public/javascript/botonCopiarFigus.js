export const botonCopiar = (figuritas) =>{
const botonCopiarFigus = document.createElement('button')
botonCopiarFigus.textContent = 'Copiar Figus'

botonCopiarFigus.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(figuritas.map(figu => figu.NUM).join("\n "))
            console.log('¡Texto copiado al portapapeles con éxito!');
        } catch (error) {
            console.error('Error al copiar el texto: ', error);
        }
})
return botonCopiarFigus
}