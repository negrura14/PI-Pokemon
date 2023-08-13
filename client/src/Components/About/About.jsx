import React from "react";
import styles from './About.module.css';
import { ROUTES } from '../../helpers/RoutesPath';
import { Link } from 'react-router-dom';

const About = () => {
    return(
        <div className={styles.container}>
        <h1 className={styles.heading}>¡Bienvenidos al Proyecto Integrador de Pokémon!</h1>
        <h2 className={styles.subheading}>Creado por Emanuel Nieto, estudiante de Henry en la cohorte part-time 13a</h2>
        <p className={styles.description}>
            Esta aplicación ha sido desarrollada utilizando React, Express y PostgreSQL.
            Los datos de los Pokémon se obtienen de la API oficial de Pokémon, y además, se almacenan en una base de datos propia del proyecto.
        </p>
        <h2 className={styles.info}>Para más información y novedades, ¡sígueme en mis redes sociales!</h2>
        <div className={styles.socialLinks}>
                <a href="https://github.com/negrura14" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/emanuel-nieto-230aab264" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <Link to={ROUTES.HOME}><button className={styles.my_button}>Back to Home</button></Link>
    </div>
    )
}

export default About;