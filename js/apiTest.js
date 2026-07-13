async function probarBounds(){

    const minLat = 18.9;
    const maxLat = 20.3;
    const minLon = -100.6;
    const maxLon = -98.4;

    const url =
    `${CONFIG.weatherxm.baseUrl}/stations/bounds` +
        `?min_lat=${minLat}` +
        `&max_lat=${maxLat}` +
        `&min_lon=${minLon}` +
        `&max_lon=${maxLon}`;

    console.log(url);

    try{

        const respuesta = await fetch(url,{

            headers:{
                "X-API-KEY": CONFIG.weatherxm.apiKey
            }

        });

        console.log("HTTP:",respuesta.status);

        const datos = await respuesta.json();

        console.log(datos);

    }
    catch(error){

        console.error(error);

    }

}

probarBounds();