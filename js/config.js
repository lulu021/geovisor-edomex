const CONFIG = {

    // ==========================
    // MAPA
    // ==========================

    centroMapa: [19.35, -99.65],

    zoomInicial: 8,

    // ==========================
    // WEATHERXM
    // ==========================

    weatherxm: {

        // API
        apiKey: "858bf239-a387-48f5-959d-79bc2bf2b433",

        baseUrl: "https://pro.weatherxm.com/api/v1",

        // Reservado para futuras versiones
        apiVersion: "v1",

        // ==========================
        // Caché
        // ==========================

        cacheMinutos: 5,

        tiempoActualizacion: 5 * 60 * 1000,

        // ==========================
        // Estaciones
        // ==========================

        cargarAlInicio: true,

        mostrarSinDatos: true

    }

};