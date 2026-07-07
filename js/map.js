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


// Control de mapas

const mapasBase = {

    "🛰️ ESRI Satélite": esri,

    "🌎 OpenStreetMap": osm

};


L.control.layers(mapasBase).addTo(mapa);


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

                    color: "#444",
                    weight: 1.2,
                    fillColor: obtenerColorDelegacion(feature.properties["Delegació"]),
                    fillOpacity: 0.45

                };

            },

            onEachFeature: function(feature, layer){

                layer.bindPopup(`
                    <b>${feature.properties["Delegació"]}</b><br>
                    Municipio: ${feature.properties.NOM_MUN}<br>
                    Región: ${feature.properties.Region}
                `);

            }

        }).addTo(mapa);

        mapa.fitBounds(capaDelegaciones.getBounds());

    });