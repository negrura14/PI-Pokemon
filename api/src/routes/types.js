const router = require('express').Router();
const axios = require('axios');
const {Type} = require('../db')

//* Maneja la ruta GET para obtener los tipos de Pokémon.

//* Ruta para obtener todos los tipos de Pokémon
// router.get('', async(req, res)=>{

//     const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
//     const typesArray = await typesApi.data.results;

//     typesArray.forEach(type => {
//         Type.findOrCreate({
//             where: {
//                 name: type.name
//             }
//         })
//     });
//     const allTypes = await Type.findAll();
//     res.send(allTypes);
// });


router.get('', async (req, res) => {
    try {
      //* Realiza una solicitud a la API de Pokémon para obtener los tipos
      const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
      const typesArray = await typesApi.data.results;
  
      //* Itera sobre los tipos obtenidos y los almacena en la base de datos si no existen
      typesArray.forEach(async type => {
        await Type.findOrCreate({
          where: {
            name: type.name
          }
        });
      });
  
      //* Obtiene todos los tipos de la base de datos
      const allTypes = await Type.findAll();
      res.send(allTypes);
    } catch (error) {
      res.status(500).send('Error al obtener los tipos de Pokémon.');
    }
  });

module.exports = router;