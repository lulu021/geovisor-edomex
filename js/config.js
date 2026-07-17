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
        apiKey: "79e556c1-822d-463c-8433-089277a3e6bd",

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