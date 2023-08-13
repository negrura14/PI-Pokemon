const axios = require('axios');
const { Pokemon, Type } = require('../db')


//*Obtengo los datos de los pokemones desde la API 


const getApiPokemons = async()=>{
    
    //* Realiza una solicitud HTTP para obtener la primera página de datos de pokémones
    const firstApiPage = await axios.get('https://pokeapi.co/api/v2/pokemon');
    
    
    //* Realiza una solicitud HTTP para obtener la siguiente página de datos de pokémones
    const secondApiPage = await axios.get(firstApiPage.data.next); 

    //* Combina los resultados de ambas páginas en un solo array de pokémones
    const allPokemons = firstApiPage.data.results.concat(secondApiPage.data.results);

    //* Utiliza Promise.all para realizar solicitudes HTTP a cada pokémon y obtener sus propiedades
    const PokemonProps =  await Promise.all(

        allPokemons.map(async ele=>{

            //* Realiza una solicitud HTTP para obtener los detalles del pokémon actual
            const pokemon = await axios.get(ele.url);

            //* Retorna un objeto con las propiedades deseadas del pokémon
            return{
                id: pokemon.data.id,
                img: pokemon.data.sprites.other.home.front_default,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                type: pokemon.data.types && pokemon.data.types.map(ele=> ele.type.name)
               
            }
        }) 
    ) 
    //* Retorna el array de objetos con las propiedades de los pokémones
    return PokemonProps;
}


//* Exporta la función para que esté disponible en otros archivos
module.exports = getApiPokemons;

