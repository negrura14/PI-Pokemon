import React from "react";
import styles from './Loading.module.css';
import Loading from './img/Loading.gif'


export default function LoadingPage(){
    return(
        <div className={styles.loading_container}>
            <img className={styles.img_loading} src={Loading} alt="gif" />
        </div>
    );
}