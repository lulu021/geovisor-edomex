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

    try{

        const respuesta = await fetch(
            `${CONFIG.weatherxm.baseUrl}/stations/${idEstacion}/latest`,
            {
                headers:{
                    "X-API-KEY": CONFIG.weatherxm.apiKey
                }
            }
        );

        console.log("HTTP:", respuesta.status);

        if(!respuesta.ok){
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        console.log(datos);

        return {

            temperatura: datos.observation?.temperature ?? null,

            sensacion: datos.observation?.feels_like ?? null,

            humedad: datos.observation?.humidity ?? null,

            viento: datos.observation?.wind_speed ?? null,

            direccionViento: datos.observation?.wind_direction ?? null,

            lluvia: datos.observation?.precipitation_rate ?? null,

            presion: datos.observation?.pressure ?? null,

            actualizacion: datos.observation?.timestamp ?? null,

            estado: datos.health ?? null

        };
    }
    catch(error){

        console.error("Error:", error);

    }

}

};