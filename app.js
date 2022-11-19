require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async()=>{
    const busquedas = new Busquedas();
    let opt;


    do {
        opt =  await inquirerMenu();
        switch(opt){
            case 1:
                //Mostrar Mensaje.
                const busqueda = await leerInput('Ciudad: ');
                
                // Buscar los Lugares
                const lugares =  await busquedas.ciudad(busqueda);

                //Selccionar lugar
                const id_sel = await listarLugares(lugares);
                const lugar_sel = lugares.find(l => l.id === id_sel);
                const {nombre , lat , lng} = lugar_sel;

               // Clima

               const clima = await busquedas.climaLugar(lugar_sel.lat, lugar_sel.lng);
               const {temp_max , temp_min, desc}= clima;

               //Mostrar resultador

               console.log("\nInformacion de la Ciudad\n".green);
               console.log('Ciudad: ' ,nombre );
               console.log('Lat: ' ,lat );
               console.log('Long: ' , lng);
               console.log('Temperatura: ' ,desc );
               console.log('Minima: ' ,temp_min + '°C');
               console.log('Maxima: ' , temp_max);
            break;
        }

        if(opt !==0)   await pausa();
      
    } while(opt !== 0)

}

main();