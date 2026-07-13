import { obtenerMundialUsa } from "./api.js";

const figusMundialUsa = await obtenerMundialUsa();

const figusInput = ["ALG2","ARG5","BRA6","BEL13"];

const boton = document.getElementById('btnBuscar');
const textoIngresado = document.getElementById('entrada');


boton.addEventListener('click',()=>{

    let texto = textoIngresado.value.toUpperCase();
    texto=reemplazarPais(texto)

    texto = texto.replace(/([A-Z]{3})\s+(\d+)/g, '$1$2');
    const figusInput = texto
        .split(/[,\s-]+/)
        .map(figu => figu.trim())
        .filter(figu => figu !== "");

    const result = figusMundialUsa.filter(figu =>{
    return figusInput.includes(figu.NUM)
    });

    const resultado = document.getElementById("resultados")
    resultados.innerHTML = '';

    result.forEach(figu => {
        const li = document.createElement('li');
        resultados.innerHTML += "NUM:"+figu.NUM +" CANT:"+ figu.CANT +" PRECIO:"+ figu.PRECIO+"<br>";
    });

    console.log(result);
})

function reemplazarPais(valorInput) {
    valorInput = valorInput.replace(/WALLES|WALES|GALES|GALS/g, "WAL");
    valorInput = valorInput.replace(/INTRO|INTR/g, "INT");
    valorInput = valorInput.replace(/MEXICO|MEJICO|MXICO|MÉXICO|MX|MEXIVO|MÉX/g, "MEX");
    valorInput = valorInput.replace(/URUGUAYO|URUGUAY|URUGUAO|URUGUA|URGUA|URUG/g, "URU");
    valorInput = valorInput.replace(/ESTADOSUNIDOS|EEUU|EE.UU/g, "USA");
    valorInput = valorInput.replace(/BRASIL|BRAZIL/g, "BRA");
    valorInput = valorInput.replace(/CANADA|CANADÁ|CANAD|CANA|CAADA/g, "CAN");
    valorInput = valorInput.replace(/COSTA RICA|COSTARICA/g, "CRC");
    valorInput = valorInput.replace(/ARGENTINA|AFA|ARH/g, "ARG");
    valorInput = valorInput.replace(/AUSTRALIA|AUT|AUST|AUTRALIA/g, "AUS");
    valorInput = valorInput.replace(/BELGICA|BLGICA|BELJICA|BELGIUM|BELGI|BELG/g, "BEL");
    valorInput = valorInput.replace(/CANADA|CANAD|CANA|CAADA/g, "CAN");
    valorInput = valorInput.replace(/CAMERUN|CAMERÚN|CAMEROON|CAMERN|CAM|CAMERON|CRM|CAME|CAMERRON|CAMER/g, "CMR");
    valorInput = valorInput.replace(/COSTARICA|C. RICA|COSTA RICA|COST|COSRIC/g, "CRC");
    valorInput = valorInput.replace(/CROACIA|CROATIA|CROA|CROCIA/g, "CRO");
    valorInput = valorInput.replace(/DINAMARCA|DENMARK|DINMICA|DENAMARK|DENMARARK|DIAMARCA|DINA/g, "DEN");

    valorInput = valorInput.replace(/FCW|ESTADIO|FWCC/g, "FWC");
    valorInput = valorInput.replace(/INGLATERRA|ENGLAND|ING|ENGLAN/g, "ENG");
    valorInput = valorInput.replace(/ESPAÑA|SPAIN|ESPAA|SPANIA/g, "ESP");
    valorInput = valorInput.replace(/FRANCIA|FRANCE|FRAC|FRAN/g, "FRA");
    valorInput = valorInput.replace(/ALEMANIA|ALEMANA|GERMANY|GERMAN|ALEM|GERM|ALE/g, "GER");
    valorInput = valorInput.replace(/GHANA|GANA|GHAN/g, "GHA");
    valorInput = valorInput.replace(/IRIRAN|IRÁN|IRAN|IRAM|LRN/g, "IRN");
    valorInput = valorInput.replace(/JAPON|JAPAN|JAPN|JAP/g, "JPN");
    valorInput = valorInput.replace(/KOREA|COREA|KOREADELSUR|COR|COREADELSUR|KOREAREPUBLIC|KORE|KOREAREPBLICA|KOREAREPUBIC/g, "KOR");
    valorInput = valorInput.replace(/ARABIASAUDITA|ARABIASAUDI|SAUDIARABIA|ARABIA|SAUDIAR|ARABSAU|SAUDARABIA|ARAB|ARA/g, "KSA");
    valorInput = valorInput.replace(/MARRUECOS|MOROCCO|MORROCO|MAROCCO|MOROCO|MARRU|MARR|MRR|MOR/g, "MAR");
    valorInput = valorInput.replace(/HOLANDA|NETHERLANDS|NEDERLAND|PAISESBAJOS|OLANDA|NETHER|NETHELAND|PASESBAJOS|HOL|HOLAN|NETHERLAND/g, "NED");
    valorInput = valorInput.replace(/POLONIA|POLAND/g, "POL");
    valorInput = valorInput.replace(/PORTUGAL|PORT/g, "POR");
    valorInput = valorInput.replace(/QATAR|QATARÍ|QATA/g, "QAT");
    valorInput = valorInput.replace(/SENEGAL|SENEG/g, "SEN");
    valorInput = valorInput.replace(/SERBIA|SER|SERB/g, "SRB");
    valorInput = valorInput.replace(/SUIZA|SUSA|SWITZERLAND|SIU|SWITZERLABD/g, "SUI");
    valorInput = valorInput.replace(/TUNEZ|TÚNEZ|TUNISIA|TNEZ|TUNES|TUNI|TINISIA/g, "TUN");
    valorInput = valorInput.replace(/ESTADOSUNIDOS|ESTADOS UNIDOS|EEUU|EE.UU/g, "USA");

    valorInput = valorInput.replace(/HCL|HC1|ESTADIO|ESTADIOS/g, "HCI");
    valorInput = valorInput.replace(/PERU|PERÚ|PERO/g, "PER");
    valorInput = valorInput.replace(/CHILE/g, "CHI");
    valorInput = valorInput.replace(/VENEZUELA|VENEZ/g, "VEN");
    valorInput = valorInput.replace(/JAMAICA|JAMA/g, "JAM");
    valorInput = valorInput.replace(/PANAMA|PANAM/g, "PAN");
    valorInput = valorInput.replace(/BOLIVIA|BOLIV/g, "BOL");
    valorInput = valorInput.replace(/COLOMBIA|COLOM|COLO/g, "COL");
    valorInput = valorInput.replace(/PARAGUAY|PARAGUA|PARAG|PARA/g, "PAR");
    valorInput = valorInput.replace(/HONDURAS|HONDURA|HONDU|HOND/g, "HON");
    valorInput = valorInput.replace(/TRINIDADTOBAGO|TRINIDAD|TYT|TRINIDADANDTOBAGO|TRT|TRIN/g, "TRI");
    valorInput = valorInput.replace(/LEGENDARIA|LEYENDAS|LEENDA|LEENDAS|LEGENDARIOS|LEGEND|LEGENDA|LEGENDARIAS/g, "LEG");
    valorInput = valorInput.replace(/RHO/g, "ROH");
    valorInput = valorInput.replace(/ECUADOR/g, "ECU");
    
    valorInput = valorInput.replace(/ YPF/g, "YPF");
    valorInput = valorInput.replace(/ Y/g, "")
    valorInput = valorInput.replace(/ DE /g, "")
    
    return valorInput
}