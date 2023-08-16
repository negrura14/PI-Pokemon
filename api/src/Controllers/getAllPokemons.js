const getApiPokemons = require('./getApiPokemons');
const getDbPokemonInfo = require('./getPokemonDb');

/**
 * Obtiene información de todos los Pokémon combinando datos de la API y la base de datos.
 *
 * @returns {Promise<Array>} Una promesa que resuelve en un array de información de Pokémon.
 */


// const getAllPokemons = async()=>{
//     const [apiPokemonInfo, dbPokemonsInfo] = await Promise.all([getApiPokemons(), getDbPokemonInfo()]); 

//     const allPokemonsInfo = apiPokemonInfo.concat(dbPokemonsInfo);
//     return allPokemonsInfo;
// };

// const getAllPokemons = async () => {
//     const apiPromise = getApiPokemons();
//     const dbPromise = getDbPokemonInfo();
    
//     const [apiPokemonInfo, dbPokemonsInfo] = await Promise.all([apiPromise, dbPromise]);
    
//     return apiPokemonInfo.concat(dbPokemonsInfo);
//   };

  const getAllPokemons = () => {
    return Promise.all([getApiPokemons(), getDbPokemonInfo()])
      .then(([apiPokemonInfo, dbPokemonsInfo]) => apiPokemonInfo.concat(dbPokemonsInfo));
  };

module.exports = {getAllPokemons}