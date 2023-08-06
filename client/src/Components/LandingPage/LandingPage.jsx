import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../helpers/RoutesPath';
import pokemonImg from '../../img/pokemonTitle.png'
import styles from './LandingPage.module.css';



export default function LandingPage() {
    return (
        
        <div className={styles.land}>
            <img src={pokemonImg} alt="img not found" className={styles.image} />
            <h2 className={styles.autor}>By Emanuel Nieto</h2>
            <Link to={ROUTES.HOME}>
              <button className={styles.btnIng}>Start!</button>
             </Link>
         </div>
    )
}