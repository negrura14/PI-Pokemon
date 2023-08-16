const {Pokemon, Type} = require('../db');

//*Obtengo todos los pokemons que se encuentren en la BD incluyendo sus tipos.
const getDbPokemonInfo = async()=>{
    const dbPokemons = await Pokemon.findAll({
        include: {
            model: Type,
            as: 'type',
            atributes: ['name'], 
            through: {
                atributes: []
            }
        }
    })

     //* Convertir los objetos de la base de datos a formato JSON
    const pokeJson = dbPokemons.map(pokemon => pokemon.toJSON());

    //* Mapear la información de tipos a cada Pokémon
    const pokeType = pokeJson.map(pokemon=>{
       const typeName = pokemon.type.map(type=> type.name)
       return {...pokemon, type: typeName}
    })


    return pokeType;
}

module.exports = getDbPokemonInfo;