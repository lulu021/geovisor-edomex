// ==========================================
// CARGA DE ESTACIONES
// ==========================================

async function cargarEstaciones(){

    const respuesta = await fetch("data/estaciones.json");

    const estaciones = await respuesta.json();

    estaciones.forEach(estacion => {

    L.marker([

        estacion.latitud,

        estacion.longitud

    ])
    .addTo(mapa)
    .bindPopup(estacion.nombre);

});  

}