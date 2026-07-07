// Crear mapa centrado en Estado de México

const mapa = L.map("map").setView(
    CONFIG.centroMapa,
    CONFIG.zoomInicial
);


// ESRI Satélite (mapa principal)

const esri = L.tileLayer(

    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

    {
        attribution:
        "Tiles © Esri"
    }

).addTo(mapa);


// OpenStreetMap (mapa secundario)

const osm = L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        attribution:
        "© OpenStreetMap contributors"

    }

);


// Control de mapas (panel de capas)

const mapasBase = {

    "🛰️ ESRI Satélite": esri,

    "🌎 OpenStreetMap": osm

};

const capas = {};

const controlCapas = L.control.layers(mapasBase, capas).addTo(mapa);


// Escala

L.control.scale().addTo(mapa);

// ============================
// CARGAR DELEGACIONES
// ============================

fetch("data/delegaciones.geojson")
    .then(response => response.json())
    .then(data => {

        capaDelegaciones = L.geoJSON(data, {

            style: function(feature){

                return {

                    color: "#6e6e6e",
                    weight: 1,

                    fillColor: obtenerColorDelegacion(feature.properties["Delegació"]),

                    fillOpacity: 0.50

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
                <br><br>
                <b>Municipio:</b><br>
                ${feature.properties.NOM_MUN}
                </div>

                `);

            }

        }).addTo(mapa);

        controlCapas.addOverlay(
            capaDelegaciones,
            "🌾 Delegaciones Regionales"
);

        mapa.fitBounds(capaDelegaciones.getBounds());

    });

// ============================
// CARGAR MUNICIPIOS
// ============================

fetch("data/lim_munEdo.geojson")
    .then(response => response.json())
    .then(data => {

        capaMunicipios = L.geoJSON(data, {

            style: {

                color: "#9A9A9A",
                weight: 0.55,
                fillOpacity: 0.6

            },

            onEachFeature: function(feature, layer){

                layer.bindTooltip(

                    feature.properties.NOMGEO,

                    {

                        sticky: true

                    }

                );

            }

        });

    });

    controlCapas.addOverlay(
    capaMunicipios,
    "🗺 Municipios"
);