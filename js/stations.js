// ==========================================
// CARGA DE ESTACIONES
// ==========================================

async function cargarEstaciones(){

    const respuesta = await fetch("data/estaciones.json");

    const estaciones = await respuesta.json();

    for (const estacion of estaciones) {

    L.marker([
        estacion.latitud,
        estacion.longitud
    ])
    .addTo(mapa)
    .bindPopup(`
    <div style="min-width:220px">

        <h3 style="margin:0 0 8px 0;">
            📍 ${estacion.nombre}
        </h3>

        <b>🏙 Municipio</b><br>
        ${estacion.municipio}

        <hr>

        <div id="weather-${estacion.idLocal}">
            🌡 Actualizando...
        </div>

        <hr>

        <div style="text-align:right;">
            <a href="#" onclick="return false;">Ver detalles</a>
        </div>

    </div>
    `);

    const datos = await WeatherXMService.obtenerDatos(estacion.id);

    console.log(datos);
    const contenedor = document.getElementById(`weather-${estacion.idLocal}`);

    if (contenedor && datos) {

        contenedor.innerHTML = `
            <b>🌡 Temperatura:</b> ${datos.temperatura} °C<br>
            <b>💧 Humedad:</b> ${datos.humedad} %<br>
            <b>💨 Viento:</b> ${datos.viento} m/s
        `;

    }

}


}