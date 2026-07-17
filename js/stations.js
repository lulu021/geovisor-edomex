// ==========================================
// CARGA DE ESTACIONES
// ==========================================

async function cargarEstaciones() {

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
                Seleccione la estación para consultar.
            </div>

            <hr>

            <div style="text-align:right;">
                <a href="#" onclick="return false;">Ver detalles</a>
            </div>

        </div>
        `);

        marcador.on("popupopen", async function () {

            const contenedor = document.getElementById(`weather-${estacion.idLocal}`);

            if (!contenedor) return;

            contenedor.innerHTML = "🌤 Consultando datos meteorológicos...";

            const datos = await WeatherXMService.obtenerDatos(estacion.id);

            if (datos) {

                contenedor.innerHTML = `

                <div style="line-height:1.7">

                    <div>
                        🌡 <b>Temperatura:</b>
                        ${datos.temperatura.toFixed(1)} °C
                    </div>

                    <div>
                        🌧 <b>Precipitación:</b>
                        ${datos.lluvia.toFixed(1)} mm/h
                    </div>

                    <div>
                        💨 <b>Viento:</b>
                        ${datos.viento.toFixed(1)} m/s
                    </div>

                    <hr>

                    <div style="font-size:12px;color:#666;">

                        🕒 ${WeatherXMService.formatearFecha(datos.actualizacion)}

                    </div>

                </div>

                `;

            } else {

                contenedor.innerHTML = `

                <div style="text-align:center;line-height:1.6;">

                    <div style="font-size:34px;">
                        📡
                    </div>

                    <b>Sin datos disponibles</b>

                    <br><br>

                    La estación no reportó información reciente.

                    <br><br>

                    Intente nuevamente más tarde.

                </div>

                `;

            }

        });

    }

}