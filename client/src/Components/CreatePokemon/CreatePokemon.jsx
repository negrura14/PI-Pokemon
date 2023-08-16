import Styles from './CreatePokemon.module.css';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {postPokemon, getAllTypes } from '../../Actions/index';
import {useDispatch, useSelector } from 'react-redux';
import {ROUTES} from '../../helpers/RoutesPath'

//* Componente funcional para la creación de un nuevo Pokémon.
//* Muestra un formulario para ingresar información sobre un nuevo Pokémon y validar los datos ingresados

export default function CreatePokemon() {
    
    function Validation(input){

        let error = {required: false};
        console.log(error)
        if(!input.name){
            error.name = 'Please enter pokemon name'
            error.required = true;
        }else if (!/\S{1,15}[^0-9]/.test(input.name)){
            error.name = 'Name is invalid. It must be contain 2 to 15 characters';
            error.required = true;
        }

        if(input.hp <= 0 || input.hp > 150){
            error.hp = 'Hp value must be greater than 0 but not exceed 150 points'
            error.required = true
        }

        if(input.attack <= 0 || input.attack > 150){
            error.attack = 'Attack value must be greater than 0 but not exceed 150 points'
            error.required = true
        }

        if(input.defense <= 0 || input.defense > 150){
            error.defense = 'Defense value must be greater than 0 but not exceed 150 points'
            error.required = true
        }

        if(input.speed <= 0 || input.speed > 150){
            error.speed = 'Speed value must be greater than 0 but not exceed 150 points'
            error.required = true
        }

        if(input.weight <= 0 || input.weight > 150){
            error.weight = 'Weight value must be greater than 0 but not exceed 150 points'
            error.required = true
        }
        if(input.height <= 0 || input.height > 150){
            error.height = 'Height value must be greater than 0 but not exceed 150 points'
            error.required = true
        }

        return error;
    } 

    //* Obtiene la función de navegación del enrutador
    const navigate = useNavigate();

    //* Obtiene la función `dispatch` del almacén Redux y el estado de los tipos de Pokémon
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)

    //* Estado local para controlar los datos del formulario y los errores de validación
    const [error, setError ] = useState({required: true});

    const [input, setInput ] = useState({
        name: '',
        img: '',
        type: [],
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        weight:0,
        height:0
    });

    //* Función para manejar el cambio de los campos de entrada en el formulario.
   //* Actualiza el estado `input` con los nuevos valores y realiza validación.
 
    function handleChange(e) {
        setInput({
            ...input, [e.target.name] : e.target.value
        })

        //* Realiza validación y actualiza el estado de errores
        let objError = Validation({...input, [e.target.name] : e.target.value})
        setError(objError)
    }
    

    //* Función para manejar la selección de tipos de Pokémon en el formulario.
    //* Agrega el tipo seleccionado al estado `input.type` y realiza validación.
 
    function handleSelect(event){
        setInput({
            ...input, type: [...input.type, event.target.value] 
        })

        //* Realiza validación y actualiza el estado de errores
        let objError = Validation({...input, [event.target.name] : event.target.value})
        setError(objError)
    }


    //* Efecto que maneja la actualización de errores cuando no se han seleccionado tipos

    useEffect(() => {
        if (input.type.length === 0) {
            setError(prevError => ({
                ...prevError,
                required: true,
                type: 'Please choose at least one type'
            }));
        }
    }, [input.type]);

   
    //*Maneja el envío del formulario de creación de Pokémon.
    //* Si no hay errores de validación, realiza una solicitud para crear el nuevo Pokémon,
    //* restablece el formulario y redirige al usuario a la página de inicio.
    //* @param {Event} e - El evento de envío del formulario.
     

    function handleSubmit(e){
        if(error.required){
            e.preventDefault()
            alert('You must complete all the required information')
        }else {
            e.preventDefault();
            dispatch(postPokemon(input))
            alert('Pokemon created succesfully!!')
            setInput({
                name: '',
                img:'',
                type: [],
                hp:0,
                attack:0,
                defense:0,
                speed:0,
                weight:0,
                height:0
            })
            navigate(ROUTES.HOME);
        }
    }

    //*Maneja la eliminación de un tipo seleccionado del estado `input.type`
    function handleDelete(option){
        setInput({
            ...input,
            type: input.type.filter(type => type !== option)
        })
    }

    useEffect(() =>{
        //* Carga los tipos de Pokémon al montar el componente
        dispatch(getAllTypes())
    }, [dispatch])


    //* Componente funcional para la creación de un nuevo Pokémon.
   //* Muestra un formulario para ingresar información sobre un nuevo Pokémon y validar los datos ingresados.
 
    return(
        <div className={Styles.body}>
            
            <h1 className={Styles.h1}>Create pokemon!</h1>
           
            <form className={Styles.form} onSubmit={event=>handleSubmit(event)}>
                <div className={Styles.div}>
                    <label className={Styles.label }htmlFor="">Name:</label>
                    <input className={Styles.input} type="text" value={input.name} name='name' placeholder="Enter a name" onChange={handleChange}/>
                    {!error.name ? null : (<span className={Styles.span}>{error.name}</span>)}
                </div>
                <div className={Styles.div}>
                    <label className={Styles.label} htmlFor="">Image:</label>
                    <input className={Styles.input} type='text' value={input.img} name='img' placeholder="Enter a URL" onChange={handleChange}/>
                </div>
                <div className={Styles.div}>
                    <label className={Styles.label} htmlFor="">Hp:</label>
                    <input className={Styles.input} type='number' value={input.hp} name='hp' placeholder="Enter a value" onChange={handleChange}/>
                    {!error.hp ? null : (<span className={Styles.span}>{error.hp}</span>)}
                </div>
                <div className={Styles.div}>
                    <label className={Styles.label} htmlFor="">Attack:</label>
                    <input className={Styles.input} type='number' value={input.attack} name='attack' placeholder="Enter a value" onChange={handleChange}/>
                    {!error.attack ? null : (<span className={Styles.span}>{error.attack}</span>)}
                </div>
                <div className={Styles.div}>
                    <label className={Styles.label} htmlFor="">Defense:</label>
                    <input className={Styles.input} type='number' value={input.defense} name='defense' placeholder="Enter a value"onChange={handleChange}/>
                    {!error.defense ? null : (<span className={Styles.span}>{error.defense}</span>)}
                </div>
                <div className={Styles.div}>
                    <label className={Styles.label} htmlFor="">Speed:</label>
                    <input className={Styles.input} type='number' value={input.speed} name='speed' placeholder="Enter a value"onChange={handleChange}/>
                    {!error.speed ? null : (<span className={Styles.span}>{error.speed}</span>)}
                </div>
                <div className={Styles.div}>
                    <label className={Styles.label} htmlFor="">Weight:</label>
                    <input className={Styles.input} type='number' value={input.weight} name='weight' placeholder="Enter a value"onChange={handleChange}/>
                    {!error.weight ? null : (<span className={Styles.span}>{error.weight}</span>)}
                </div>
                <div className={Styles.div}>
                    <label className={Styles.label} htmlFor="">Height:</label>
                    <input className={Styles.input} type='number' value={input.height} name='height' placeholder="Enter a value"onChange={handleChange}/>
                    {!error.height ? null : (<span className={Styles.span}>{error.height}</span>)}
                </div>
                <div className={Styles.div}>
                    <label className={Styles.label}>Type:</label>
                    <select className={Styles.select} onChange={event=>handleSelect(event)}>
                    {types &&
                        types.map((type) => {
                        return (
                            <option className={Styles.option} value={type.name} key={type.name}>
                                {type.name}
                            </option>
                        );
                        })}
                    </select>
                    {!error.type ? null : (<span className={Styles.span}>{error.type}</span>)}
                </div>

                <div className={Styles.div}>
                  {input.type.map((e) => {
                    return (
                        <div className={Styles.div_types} key={e}>
                            <h4 className={Styles.h4}>{e}</h4>
                            <button className={Styles.x_button} onClick={() => {handleDelete(e)}}>x</button>
                        </div>
                    );
                  })}
                </div>
                

                <button className={Styles.create_button} type="submit">Create Pokemon!</button>

            </form>
            <Link to={ROUTES.HOME}><button className={Styles.my_button}>Back to Home</button></Link>
        </div>
    )
}