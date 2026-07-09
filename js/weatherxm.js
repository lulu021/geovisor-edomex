const WeatherXMService = {

    // Datos obtenidos de la API
    estaciones: [],

    // Fecha de la última actualización
    ultimaActualizacion: null,

    // Estado de carga
    cargado: false,

    // ==========================
    // Obtener estaciones
    // ==========================

    async obtenerEstaciones(){

        console.log("Servicio WeatherXM listo.");

    },

    // ==========================
    // Obtener datos de una estación
    // ==========================

    async obtenerDatos(idEstacion){

        console.log("Consultando:", idEstacion);

    }

};