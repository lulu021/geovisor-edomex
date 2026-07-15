// ==========================================
// CARGA DE ESTACIONES
// ==========================================

async function cargarEstaciones(){

    const respuesta = await fetch("data/estaciones.json");

    const estaciones = await respuesta.json();

    for (const estacion of estaciones) {

    const marcador = L.marker([
    estacion.latitud,
    estacion.longitud
    ]).addTo(mapa);

    marcador.bindPopup(`
    <div style="min-width:220px">

        <h3 style="margin:0 0 8px 0;">
            📍 ${estacion.nombre}
        </h3>

        <b>🏙 Municipio</b><br>
        ${estacion.municipio}

        <hr>

        <div id="weather-${estacion.idLocal}">
            ⏳ Esperando consulta...
        </div>

        <hr>

        <div style="text-align:right;">
            <a href="#" onclick="return false;">Ver detalles</a>
        </div>

    </div>
    `); 
    marcador.on("popupopen", async function () {

        console.log("Abriendo estación:", estacion.nombre);

        const contenedor = document.getElementById(`weather-${estacion.idLocal}`);

        if(!contenedor){
            return;
        }

        contenedor.innerHTML = "🌡 Consultando WeatherXM...";

        const datos = await WeatherXMService.obtenerDatos(estacion.id);

        console.log(datos);
        if(datos){

        contenedor.innerHTML = `
            <b>🌡 Temperatura:</b> ${datos.temperatura.toFixed(1)} °C<br>
            <b>💧 Humedad:</b> ${datos.humedad} %<br>
            <b>💨 Viento:</b> ${datos.viento.toFixed(1)} m/s
        `;

        }
        else{

            contenedor.innerHTML = `
                <span style="color:#b22222;">
                    No fue posible obtener datos.
                </span>
            `;

        }

    });

}


}