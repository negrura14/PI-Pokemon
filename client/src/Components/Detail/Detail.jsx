import React, {useEffect} from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsById, deletePokemon } from '../../Actions/index';
import LoadingPage from '../LoadingPage/LoadingPage';
import Styles from './Detail.module.css';
import {ROUTES} from '../../helpers/RoutesPath'


//* Componente funcional para mostrar los detalles de un Pokémon específico.
//* Carga los detalles del Pokémon mediante la solicitud de Redux y permite eliminar el Pokémon si es una creación local.

export default function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const pokemon = useSelector((state) => state.details);
  
    useEffect(()=>{

        //* Carga los detalles del Pokémon por ID al montar el componente
        dispatch(getPokemonsById(id))

        //* Limpia los detalles del Pokémon al desmontar el componente
        return(function cleanUp(){
            dispatch(getPokemonsById('clear'))
        }) 
    },[dispatch, id]);


    //* Maneja la eliminación del Pokémon y redirige al usuario a la página de inicio
    function handleDelete(){
        dispatch(deletePokemon(id));
        navigate(ROUTES.HOME)
    }

    return(
        <div>
            
            { pokemon.length > 0 ? 
                <div className={Styles.container}>
                    <div className={Styles.details_container}>
                        <div className={Styles.header}>
                            <img className={Styles.img} src={pokemon[0].img} alt='img'></img>
                            <h2 className={Styles.title}>Hi, my name is {pokemon[0].name}</h2>
                        </div>

                        <div className={Styles.description}>
                            <h2 className={Styles.title}><span>Type: </span>{pokemon[0].type.map((type)=>(<p className={Styles.p_details}>{type}</p>))}</h2>
                            <h3 className={Styles.title}><span>Hp: </span>{pokemon[0].hp}</h3>
                            <h3 className={Styles.title}><span>Attack: </span>{pokemon[0].attack}</h3>
                            <h3 className={Styles.title}><span>Defense: </span>{pokemon[0].defense}</h3>
                            <h3 className={Styles.title}><span>Speed: </span>{pokemon[0].speed}</h3>
                            <h3 className={Styles.title}><span>Weight: </span>{pokemon[0].weight}</h3> 
                            <h3 className={Styles.title}><span>Height: </span>{pokemon[0].height}</h3>
                            {typeof pokemon[0].id === 'string' && (
                                <button className={Styles.delete} onClick={handleDelete}>Delete Pokemon</button>
                            )}
                            <Link to={ROUTES.HOME}><button className={Styles.my_button}>Back to Home</button></Link>
                        </div>
                    </div>
                </div>
                :  (<LoadingPage/>) 
            }
        </div>
    )
}