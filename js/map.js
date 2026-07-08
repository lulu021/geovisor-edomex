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

                    color: "#1b0505",
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

    </div>
    `);

    // Resaltar al pasar el mouse
    layer.on({

        mouseover: function(e){

            const layer = e.target;

            layer.setStyle({

                weight: 4,
                color: "#000000",
                opacity: 1,
                fillOpacity: 0.75

            });

            layer.bringToFront();

        },

        mouseout: function(e){

            capaDelegaciones.resetStyle(e.target);

        }

    });

}

        }).addTo(mapa);

//        controlCapas.addOverlay(
//            capaDelegaciones,
//          "🌾 Delegaciones Regionales"
//);
        capaDelegaciones.bringToFront();
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

                color: "#160606",
                weight: 0.5,
                fillOpacity: 0

            },

            onEachFeature: function(feature, layer){

                layer.bindTooltip(feature.properties.NOMGEO, {

                    sticky: true,
                    direction: "center"

                });

                // Los municipios solo sirven como referencia visual
                layer.off("click");

            }
        });

        controlCapas.addOverlay(
            capaMunicipios,
            "🗺 Municipios"
);

    });

