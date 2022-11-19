
const axios = require('axios');

class Busquedas{
    historial = ['Madrid', 'SanJose' , 'Bogota'];

    constructor(){

        //TODO: Leer DB si existe
    }

    getParamsMapbox(){

        return {
            'access_token': process.env.MAPBOX_KEY,
            'lenguage': 'es',
            'units': 'imperial'

        }

    }

    getParamsclima(){
        return{
            'appid': process.env.OPENWEATHER_KEY,
            'lan': 'es'
        }
    }

    async ciudad(lugar = ''){

        try {
            //Petición Htpp

            const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.getParamsMapbox()

            });

            const resp = await instance.get();
            return resp.data.features.map(lugar=> ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
            
        } catch (error) {

            return[]
            
        }
        
    }

    async climaLugar(lat , lon){

        try {

            
            // instancia axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.getParamsclima() , lat ,lon}

            });

            const resp = await instance.get();
            const {main, weather} = resp.data;
            return {
                desc: weather.description,
                temp_min: (main.temp_min-32/18000),
                temp_max: main.temp_max,
            }
          
            
        } catch (error) {

            console.log(error);
            
        }

    }

}

module.exports = Busquedas