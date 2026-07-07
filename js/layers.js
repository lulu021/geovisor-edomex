// ============================
// CAPAS DEL GEOVISOR
// ============================

let capaDelegaciones;

// Colores por delegación
function obtenerColorDelegacion(nombre){

    const colores = {

        "Delegación Regional I. Atlacomulco":"#1f78b4",
        "Delegación Regional II. Jilotepec":"#33a02c",
        "Delegación Regional III. Metepec":"#e31a1c",
        "Delegación Regional IV. Valle de Bravo":"#ff7f00",
        "Delegación Regional V. Tejupilco":"#6a3d9a",
        "Delegación Regional VI. Tenancingo":"#b15928",
        "Delegación Regional VII. Cuautitlán Izcalli":"#a6cee3",
        "Delegación Regional VIII. Zumpango":"#fb9a99",
        "Delegación Regional IX. Teotihuacán":"#cab2d6",
        "Delegación Regional X. Texcoco":"#ffff99",
        "Delegación Regional XI. Amecameca":"#fdbf6f"

    };

    return colores[nombre] || "#808080";
}