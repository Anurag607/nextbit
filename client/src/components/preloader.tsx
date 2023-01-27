import React from 'react'
import styles from '../../src/styles/preloader.module.scss'

export default function Preloader() {

    return (
        <div id="preloader" className={styles["preloader"]} style={{background: "url('/preloader.gif') no-repeat center center"}}>
            <div className={styles["nb"]}>
                <img src="/nb.png" alt="nb" />
            </div>
        </div>
    )
}