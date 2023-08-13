import axios from 'axios';

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

export function getAllTypes() { 
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'getTypes',
            payload: json.data
        })
    }
};

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

export function filterByTypes(payload){
    return{
        type: 'filterByTypes',
        payload
    }
};

export function filterByOrigin(payload){
    return {
        type: 'filterByOrigin',
        payload
    }
};

export function orderByName(payload){
    return{
        type: 'orderByName',
        payload
    }
};

export function orderByAttack(payload){
    return{
        type: 'orderByAttack',
        payload
    }
};

export function postPokemon(payload){
    return async function(dispatch){
        const pokemon = await axios.post('http://localhost:3001/pokemons', payload)
        return dispatch({
            type: 'postPokemon',
            payload: pokemon
        })
    }
};

export function deletePokemon(id){
    return async function(dispatch){
        await axios.delete(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: 'deletePokemon',
        })
    }

};