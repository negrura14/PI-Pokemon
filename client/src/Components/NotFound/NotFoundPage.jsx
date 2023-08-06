import React from "react";
import sayduck404 from '../../img/syduck4.png'
import styles from './NotFoundPage.module.css'
import { Link, useNavigate } from 'react-router-dom';
import {ROUTES} from '../../helpers/RoutesPath'
import gif from './img/gif.gif'


export default function NotFoundPage(){
    return(
        <div className={styles.container}>
            <Link to={ROUTES.HOME}>
                <button className={styles.btn}>Go Back</button>
            </Link>
            <img className={styles.img} src={sayduck404} alt="img not found" />
            <h1 className={styles.h1}>ERROR 404</h1>
            <h2 className={styles.h2} >Not found</h2>
        </div>
    )
}