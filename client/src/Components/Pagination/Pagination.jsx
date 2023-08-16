import React , {useState} from "react";
import styled from "styled-components";


 //* Componente funcional que muestra una paginación para la lista de pokémons.
 

export default function Pagination({page, setPage, pokemonsPerPage}){

    const StyledButtonsPag = styled.button`
    //* Estilos del contenedor de la paginación 

        border-radius: 50% ;
        background-color: none;
        font-size:30px;
        margin: 30px;
        padding:10px ;
        border:none ;
        color: #595959 ;

        &:hover{
            background-color:none;
            color: #595959;
            box-shadow: 0 0 20px #AA76EE, 0 0 40px #AA76EE, 0 0 80px #AA76EE;
            transition: 0.5s;
            border: none;
            cursor: pointer
        }

    `

    const DivStylePag = styled.div`
    //* Estilos del contenedor de la paginación

        display:flex ;
        align-items:center ;
        position:relative ;
        bottom:-4rem ;
        left:57.5rem ;
        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
        font-family: 'Poppins', sans-serif;
    `

    const InputPaginationPag = styled.input`
    //* Estilos del input de la paginación

    background: none;
    border: none;
    border-radius: 10px;
    width: 17px;
    margin-right: 2px;
    margin-top: 2px;
    font-size: 15px;
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    font-family: 'Poppins', sans-serif;
    `

    const [input, setInput] = useState(1)

    //* Función que avanza a la siguiente página

    function nextPage(){
        setInput (input + 1)
        setPage (page + 1);
    }

    //* Función que retrocede a la página anterior
    
    function previousPage(){
        setInput (input - 1)
        setPage (page - 1);
    }
    

    return(
       <DivStylePag>

        //* Botón para retroceder a la página anterior

            <StyledButtonsPag disabled={page === 1 || page < 1} onClick={previousPage}>⇠</StyledButtonsPag>

            //* Input para mostrar el número de página actual

            <InputPaginationPag name='page' autoComplete="off" type="text" value={input}/>

            //* Texto para mostrar el rango de páginas
            <p>de {pokemonsPerPage}</p>

            //* Botón para avanzar a la siguiente página
            
            <StyledButtonsPag disabled={page === 100 || page > 100} onClick={nextPage}>⇢</StyledButtonsPag>
        </DivStylePag>
    )
}