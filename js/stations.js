// ==========================================
// CARGA DE ESTACIONES
// ==========================================

async function cargarEstaciones() {

    const respuesta = await fetch("data/estaciones.json");

    const estaciones = await respuesta.json();
    console.log("Número de estaciones:", estaciones.length);
    console.log(estaciones);

    for (const estacion of estaciones) {

        const marcador = L.circleMarker(
            [
                estacion.latitud,
                estacion.longitud
            ],
            {
                radius: 6,

                color: "#C9A227",

                weight: 1.5,

                fillColor: "#7A1E3A",

                fillOpacity: 1
            }

        ).addTo(mapa);

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

        marcador.on("mouseover", function () {

            this.setStyle({
                radius: 8,
                weight: 2
            });

        });

        marcador.on("mouseout", function () {

            if (!this.isPopupOpen()) {

                this.setStyle({
                    radius: 6,
                    weight: 1.5
                });

            }

        });

        marcador.on("popupopen", function () {

        this.setStyle({
            radius: 9,
            weight: 2.5
        });

    });

        marcador.on("popupclose", function () {

        this.setStyle({
            radius: 6,
            weight: 1.5
        });

    });

        marcador.on("popupopen", async function () {

            const contenedor = document.getElementById(`weather-${estacion.idLocal}`);

            if (!contenedor) return;

            contenedor.innerHTML = "🌤 Consultando datos meteorológicos...";

            const datos = await WeatherXMService.obtenerDatos(estacion.id);

            if (datos) {

                contenedor.innerHTML = `

                <div style="line-height:1.7">
                
                    <div style="
                        text-align:center; 
                        font-size:13px;
                        color:#555;
                        margin-bottom:8px;
                    ">

                        ${WeatherXMService.obtenerDescripcionClima(datos.icono)}

                    </div>

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

                    <div style="
                        font-size:12px;
                        color:#666;
                        line-height:1.4;
                    ">

                        🕒 <b>Última actualización</b><br>

                        ${WeatherXMService.formatearFecha(datos.actualizacion)}

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