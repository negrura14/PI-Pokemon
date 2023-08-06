import React from "react";
import { Link } from 'react-router-dom';
import Styles from './Card.module.css';

export default function Card({id, name, type, img}){
    let key = 1;
    return (
        <Link className={Styles.linkCard} to={`/Home/${id}`}>
            <div className={Styles.containerCard}>
                <div className={Styles.imgCardCont}>
                    <img className={Styles.imgCard} src={img} alt="not found"/>
                </div>

                <div className={Styles.detailCard}>
                    <h2 className={Styles.namePoke}>{name}</h2>
                    {type.map((type) =>(
                        <p className={Styles.cardPar} key={++key}>{type}</p>
                    ))}
                </div>
            </div>
        </Link>
    )
}