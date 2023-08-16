/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import './NavBar.css'
import { Link } from "react-router-dom";
import { ROUTES } from '../../helpers/RoutesPath.js';

//* Componente funcional que representa la barra de navegación superior

export default function({allTypes, handleSort, handleOrderByAttack, handleOrigin, handleFilterByType}){
    return(

        <nav>
            <div className="navbar_container">
            //*Barra de búsqueda
                <div>
                    <SearchBar/>
                </div>
            
            //* Opciones de ordenamiento y filtrado
                <div>
                    <label className="navbar_label">Order by: </label>
                    <select className="select_navbar" onChange={event => handleSort(event)}>  

                    //* Opciones de ordenamiento
                        <option className="option_navbar" value="ascendent">Aa to Zz</option> 
                        <option className="option_navbar" value="descendent">Zz to Aa</option> 
                    </select>

                    
                    <select className="select_navbar" defaultValue ='attack' onChange={event => handleOrderByAttack(event)}>
                        //* Opciones de ordenamiento por ataque

                        <option className="option_navbar" value="attack" disabled>Attack</option>
                        <option className="option_navbar" value="ascendent">Low Attack</option> 
                        <option className="option_navbar" value="descendent">Top Attack</option> 
                    </select>
                </div>
                
                <div>
                    <label className="navbar_label">Filter by: </label>

                    //* Opciones de filtrado por origen

                    <select className="select_navbar" defaultValue ='Origin' onChange={event => handleOrigin(event)}>
                        <option className="option_navbar" value="All">Created In</option>    
                        <option className="option_navbar" value="api">Api</option> 
                        <option className="option_navbar" value="createdInDb">Data Base</option> 
                    </select>
                

                    <select className="select_navbar" defaultValue ='Types' onChange={event => handleFilterByType(event)}>   
                        
                        //* Opciones de filtrado por tipo
                        
                        <option className="option_navbar" value="Types" disabled>Types</option>
                        <option className="option_navbar" value="all">All Types</option>
                            {allTypes && allTypes.map((t) => (
                            <option className="option_navbar" value={t.name} key={t.name}>{t.name}</option>))}
                    </select>
                </div>

                //* Botones para crear Pokémon y ver la página "Acerca de"
                
                <div>
                    <Link to={ROUTES.CREATE}><button className="navbar_button">Create Pokemon</button></Link>
                    <Link to={ROUTES.ABOUT}><button className="about_button">About</button></Link>
                </div>
           
            </div>
        </nav>
        
    )
}