// ============================
// CAPAS DEL GEOVISOR
// ============================

let capaDelegaciones;
let capaMunicipios; 

// ==========================================
// PALETA OFICIAL DE DELEGACIONES REGIONALES
// ==========================================

function obtenerColorDelegacion(nombre){

    const colores = {

        "Delegación Regional I. Atlacomulco":"#f4e4da",

        "Delegación Regional II. Jilotepec":"#eaccc2",

        "Delegación Regional III. Metepec":"#dcc9d9",

        "Delegación Regional IV. Valle de Bravo":"#dee8d7",

        "Delegación Regional V. Tejupilco":"#f6e7b5",

        "Delegación Regional VI. Tenancingo":"#99c3df",

        "Delegación Regional VII. Cuautitlán Izcalli":"#f1bbcd",

        "Delegación Regional VIII. Zumpango":"#f4f5f5",

        "Delegación Regional IX. Teotihuacán":"#c7e2ba",

        "Delegación Regional X. Texcoco":"#ceb9b5",

        "Delegación Regional XI. Amecameca":"#ade2e5"

    };

    return colores[nombre] || "#D9D9D9";

} 