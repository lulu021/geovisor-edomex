// ==========================================
// CREAR MAPA
// ==========================================

const mapa = L.map("map").setView(
    CONFIG.centroMapa,
    CONFIG.zoomInicial
);

// ==========================================
// MAPAS BASE
// ==========================================

// ESRI Satélite (principal)

const esri = L.tileLayer(

    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

    {

        attribution: "Tiles © Esri"

    }

).addTo(mapa);

// OpenStreetMap (secundario)

const osm = L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        attribution: "© OpenStreetMap contributors"

    }

);

// ==========================================
// CONTROL DE CAPAS
// ==========================================

const mapasBase = {

    "🛰️ Imagen Satelital": esri,

    "🌎 Mapa Base": osm

};

const capas = {};

const controlCapas = L.control.layers(
    mapasBase,
    capas
).addTo(mapa);

// ==========================================
// ESCALA
// ==========================================

L.control.scale().addTo(mapa);

// ==========================================
// CARGAR DELEGACIONES
// ==========================================

fetch("data/delegaciones.geojson")

    .then(response => response.json())

    .then(data => {

        capaDelegaciones = L.geoJSON(data, {

            style: function(feature){

                return {

                    color: "#7A7A7A",

                    weight: 0.8,

                    fillColor: obtenerColorDelegacion(
                        feature.properties["Delegació"]
                    ),

                    fillOpacity: 0.58

                };

            },

            onEachFeature: function(feature, layer){

                layer.bindPopup(`

                <div style="min-width:220px">

                    <h3 style="margin-bottom:8px;">

                        🌾 ${feature.properties["Delegació"]}

                    </h3>

                    <b>Región:</b><br>

                    ${feature.properties.Region}

                </div>

                `);

            }

        }).addTo(mapa);

        capaDelegaciones.bringToFront();

        mapa.fitBounds(capaDelegaciones.getBounds());

    });

// ==========================================
// CARGAR MUNICIPIOS
// ==========================================

fetch("data/lim_munEdo.geojson")

    .then(response => response.json())

    .then(data => {

        capaMunicipios = L.geoJSON(data, {

            style: {

                color: "#5f5e5e",

                weight: 0.6,

                fillOpacity: 0

            }

        });

        controlCapas.addOverlay(

            capaMunicipios,

            "🗺 Límites Municipales"

        );

    });