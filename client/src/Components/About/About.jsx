import React from "react";
import styles from './About.module.css';

const About = () => {
    return(
        <div>
            <h1 className={styles.abouth1}>Bienvenidos al PI de Pokemon</h1>
            <h2 className={styles.h2}>
                 Mi nombre es Emanuel Nieto, estudiante de Henry de la cohorte part-time 13a</h2>
            <h1 className={styles.h1}> Esta aplicacion esta creada con React y Express con una Base de Datos creada en PostgreSQL</h1>
        </div>
    )
}

export default About;