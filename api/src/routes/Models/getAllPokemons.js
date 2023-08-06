const getApiPokemons = require('./getApiPokemons');
const getDbPokemonInfo = require('./getPokemonDb');

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