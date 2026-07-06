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

