import axios from 'axios';

//*Obtiene todos los Pokémon desde la API

export function getAllPokemons() {
    return async function(dispatch){
        dispatch({type: 'Loading'})
        let json = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: 'getPokemons',
            payload: json.data,
        })
    }
};


//*Obtiene todos los tipos de Pokémon desde la API

export function getAllTypes() { 
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'getTypes',
            payload: json.data
        })
    }
};


//*Busca Pokémon por su nombre

export function getPokemonsByName(name) {
    return async function(dispatch){
        try {
            dispatch({ type: 'loading' });
            let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      
            if (json.data.length === 0) {
              throw new Error('No se encontró ningún Pokémon con ese nombre.');
            }
      
            return dispatch({
              type: 'getPokemonsByName',
              payload: json.data,
            });
          } catch (error) {
             
            console.error(error.message);
            
          }
    }
};


//* Busca Pokémon por su ID

export function getPokemonsById(id) {
    return async function(dispatch){
        if(id === 'clear'){
            dispatch({
                type: 'getPokemonsById',
                payload: 'clear'
            })
        }else {
            dispatch({
                type: 'Loading'
            })

            try {
                let response = await axios.get(`http://localhost:3001/pokemons/${id}`);
        let pokemonData = response.data;

        if (pokemonData.length === 0) {
          
          dispatch({
            type: 'getPokemonsById',
            payload: null, 
          });
        } else {
          dispatch({
            type: 'getPokemonsById',
            payload: pokemonData,
          });
        }
            } catch (error) {
                console.log(error);
            }
        }
    }
};


//*Crea una acción para filtrar los Pokémon por tipos

export function filterByTypes(payload){
    return{
        type: 'filterByTypes',
        payload
    }
};

//*Crea una acción para filtrar los Pokémon por origen

export function filterByOrigin(payload){
    return {
        type: 'filterByOrigin',
        payload
    }
};


//* Crea una acción para ordenar los Pokémon por nombre

export function orderByName(payload){
    return{
        type: 'orderByName',
        payload
    }
};


//* Crea una acción para ordenar los Pokémon por ataque

export function orderByAttack(payload){
    return{
        type: 'orderByAttack',
        payload
    }
};

//* Crea una acción para agregar un nuevo Pokémon a la base de datos

export function postPokemon(payload){
    return async function(dispatch){
        const pokemon = await axios.post('http://localhost:3001/pokemons', payload)
        return dispatch({
            type: 'postPokemon',
            payload: pokemon
        })
    }
};


//*Crea una acción para eliminar un Pokémon de la base de datos

export function deletePokemon(id){
    return async function(dispatch){
        await axios.delete(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: 'deletePokemon',
        })
    }

};