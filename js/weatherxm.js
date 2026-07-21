const WeatherXMService = {

    // ==========================
    // Datos del servicio
    // ==========================

    // Datos obtenidos de la API
    estaciones: [],

    // Fecha de la última actualización
    ultimaActualizacion: null,

    // Estado de carga
    cargado: false,

    // Caché de datos por estación
    cache: {},

    // ==========================
    // Inicializar servicio
    // ==========================

    async obtenerEstaciones(){

        // Preparado para futuras versiones
        // Aquí posteriormente se podrá obtener automáticamente
        // la lista de estaciones desde WeatherXM.

    },

    // ==========================
    // Obtener datos de una estación
    // ==========================

    async obtenerDatos(idEstacion){

        // --------------------------
        // Revisar caché
        // --------------------------

        const cacheEstacion = this.cache[idEstacion];

        if(cacheEstacion){

            const tiempoTranscurrido =
                Date.now() - cacheEstacion.fecha;

            if(tiempoTranscurrido < CONFIG.weatherxm.tiempoActualizacion){

                return cacheEstacion.datos;

            }

        }

        try{

            const respuesta = await fetch(

                `${CONFIG.weatherxm.baseUrl}/stations/${idEstacion}/latest`,

                {

                    headers:{

                        "X-API-KEY": CONFIG.weatherxm.apiKey

                    }

                }

            );

            if(!respuesta.ok){

                throw new Error(`HTTP ${respuesta.status}`);

            }

            const datos = await respuesta.json();
            console.log("Respuesta completa WeatherXM:", datos);  

            // --------------------------
            // Adaptar respuesta WeatherXM
            // --------------------------

            const datosAdaptados = {

                temperatura: datos.observation?.temperature ?? null,

                sensacion: datos.observation?.feels_like ?? null,

                humedad: datos.observation?.humidity ?? null,

                viento: datos.observation?.wind_speed ?? null,

                direccionViento: datos.observation?.wind_direction ?? null,

                lluvia: datos.observation?.precipitation_rate ?? null,

                presion: datos.observation?.pressure ?? null,

                actualizacion: datos.observation?.timestamp ?? null,

                icono: datos.observation?.icon ?? null,

                estado: datos.health ?? null

            };

            // --------------------------
            // Guardar en caché
            // --------------------------

            this.cache[idEstacion] = {

                datos: datosAdaptados,

                fecha: Date.now()

            };

            return datosAdaptados;

        }

        catch(error){

            console.error("Error WeatherXM:", error);

            return null;

        }

    },

    // ==========================
    // Formatear fecha
    // ==========================

    formatearFecha(fechaISO){

        if(!fechaISO){

            return "Sin información";

        }

        const fecha = new Date(fechaISO);

        return fecha.toLocaleString("es-MX",{

            day:"2-digit",

            month:"2-digit",

            year:"numeric",

            hour:"2-digit",

            minute:"2-digit"

        });

    },

    obtenerDescripcionClima(icono){

    const iconos = {

        "clear-day": "☀️ Soleado",

        "clear-night": "🌙 Despejado",

        "partly-cloudy-day": "⛅ Parcialmente nublado",

        "partly-cloudy-night": "☁️ Parcialmente nublado",

        "cloudy": "☁️ Nublado",

        "rain": "🌧 Lluvia",

        "showers-day": "🌦 Chubascos",

        "showers-night": "🌦 Chubascos",

        "fog": "🌫 Niebla",

        "wind": "💨 Viento"

    };

    return iconos[icono] || "🌤 Condiciones disponibles";

},

};