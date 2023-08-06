/* eslint-disable no-unused-vars */
import React from "react";
import Styles from './Home.module.css'
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Card from '../Card/Card'
import Navbar from "../NavBar/Navbar";
import LoadingPage from "../LoadingPage/LoadingPage";
import Pagination from "../Pagination/Pagination";
import { 
    getAllPokemons, 
    getAllTypes, 
    filterByTypes,
    orderByName, 
    orderByAttack,
    filterByOrigin,
} from "../../Actions/index";
import NotFoundPage from "../NotFound/NotFoundPage";


function Home() {
    
    const dispatch = useDispatch();
    const allTypes =  useSelector(state => state.types);
    const loading =  useSelector(state => state.loading);
    const copyPokemons =  useSelector(state => state.copyPokemons);

    //paginado
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12)

    const max = copyPokemons.length / perPage;
    const pokemonsPerPage = Math.ceil(max)
    
    
    
    useEffect(()=>{
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
    },[dispatch]);

    
    const [order, setOrder] = useState('') 
    
    function handleSort(event){
        event.preventDefault();
        dispatch(orderByName(event.target.value));
        setOrder(`ordered ${event.target.value}`)
    }

    function handleOrderByAttack(event){
        event.preventDefault();
        dispatch(orderByAttack(event.target.value));
        setOrder(`ordered ${event.target.value}`)
    }

    function handleOrigin(event){
        event.preventDefault()
        dispatch(filterByOrigin(event.target.value))
    }

    function handleFilterByType(event){
        event.preventDefault()
        dispatch(filterByTypes(event.target.value))
    }
    //* Esta funcion permite hacer un evento de la prevencion de default que despacha un GET con todos los pokemons
    function handleClick(event){
        event.preventDefault();
        dispatch(getAllPokemons())
    }

    if(loading){
        return (    
        <div className={Styles.home_container}> 
            <div>
                <Navbar
                    allTypes={allTypes}
                    handleSort={handleSort}
                    handleFilterByType={handleFilterByType}
                    handleOrderByAttack={handleOrderByAttack}
                    handleOrigin={handleOrigin}
                    handleClick={handleClick}
                />
            </div>

            <div>
                <LoadingPage/>
            </div>
            
        </div>
    ) 
} else {
    return(
        <div className={Styles.home_container}> 
            <div>
                <Navbar
                    allTypes={allTypes}
                    handleSort={handleSort}
                    handleFilterByType={handleFilterByType}
                    handleOrderByAttack={handleOrderByAttack}
                    handleOrigin={handleOrigin}
                    handleClick={handleClick}
                />
            </div>

            <div>
                {copyPokemons && copyPokemons.hasOwnProperty('error') ?
                    <NotFoundPage/>
                    : copyPokemons
                        .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                        .map((pokemon)=>{
                        return( 
                            <Card id={pokemon.id} key={pokemon.id} img = {pokemon.img} name = {pokemon.name} type = {pokemon.type} createInDb = {pokemon.createdInDb}/>
                        );
                    })
                }
            </div>

            {copyPokemons && copyPokemons.hasOwnProperty('error') ? null : <Pagination page={page} setPage={setPage} pokemonsPerPage={pokemonsPerPage}/>}
            
            
        </div>
    )
}}

export default Home;



                        
                    
                  