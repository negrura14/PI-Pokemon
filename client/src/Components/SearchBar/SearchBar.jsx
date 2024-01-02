import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemonsByName } from "../../Actions";
import './SearchBar.css';


//* Componente funcional que muestra un campo de búsqueda de pokémons por nombre.
 
export default function SearchBar({ setPage }){
    const dispatch = useDispatch();
    const [state, setState] = useState('');
    const navigate = useNavigate();
    
    

    //* Función que se ejecuta cuando el valor del campo de búsqueda cambia.
     
    function handleChange(event){
        event.preventDefault()
        setState(event.target.value)
        if(event.target.value === ''){
            dispatch(getPokemonsByName(''))
        }
        
    };


    //* Función que se ejecuta cuando se envía el formulario de búsqueda.
     
    function handleSubmit(event){
        event.preventDefault();
        dispatch(getPokemonsByName(state))
        setState('');
        setPage(1);
    }

   
    
    

    return(
        <form className="form_searchBar" onSubmit={event => handleSubmit(event)}>
            <input className="input_searchBar" type="text" placeholder="Enter name" value={state} onChange={handleChange} />
            <button className="button_searchBar" type='submit'>Search</button>
        </form>
    )
}