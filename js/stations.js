// ==========================================
// CARGA DE ESTACIONES
// ==========================================

async function cargarEstaciones(){

    const respuesta = await fetch("data/estaciones.json");

    const estaciones = await respuesta.json();

    console.log(estaciones);

}