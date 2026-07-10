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
            `${CONFIG.baseUrl}/stations/${idEstacion}/latest`,
            {
                headers:{
                    "X-API-KEY": CONFIG.apiKey
                }
            }
        );

        console.log("HTTP:", respuesta.status);

        if(!respuesta.ok){
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        console.log(datos);

    }
    catch(error){

        console.error("Error:", error);

    }

}

};