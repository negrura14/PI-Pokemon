import Styles from './CreatePokemon.module.css';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {postPokemon, getAllTypes } from '../../Actions/index';
import {useDispatch, useSelector } from 'react-redux';
import {ROUTES} from '../../helpers/RoutesPath'


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

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)

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

    function handleChange(e) {
        setInput({
            ...input, [e.target.name] : e.target.value
        })

        let objError = Validation({...input, [e.target.name] : e.target.value})
        setError(objError)
    }
    
    function handleSelect(event){
        setInput({
            ...input, type: [...input.type, event.target.value] 
        })
        let objError = Validation({...input, [event.target.name] : event.target.value})
        setError(objError)
    }

    useEffect(() => {
        if (input.type.length === 0) {
            setError(prevError => ({
                ...prevError,
                required: true,
                type: 'Please choose at least one type'
            }));
        }
    }, [input.type]);

    // useEffect(() =>{
    //     if(input.type.length === 0){
    //         setError({...error, required: true, type: 'Please choose at least one type'})

    //     }
    // }, [input.type, error.required])

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

    function handleDelete(option){
        setInput({
            ...input,
            type: input.type.filter(type => type !== option)
        })
    }

    useEffect(() =>{
        dispatch(getAllTypes())
    }, [dispatch])

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
                  {input.type.map((el) => {
                    return (
                        <div className={Styles.div_types} key={el}>
                            <h4 className={Styles.h4}>{el}</h4>
                            <button className={Styles.x_button} onClick={() => {handleDelete(el)}}>x</button>
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