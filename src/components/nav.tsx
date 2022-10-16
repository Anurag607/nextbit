import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../src/styles/nav.module.css'
import search from '../scripts/searchbar.mjs'

const Nav = (props: any) => {
    return (
        <nav className={styles.nav}>
            <Link href='/'>
                <a className={styles.headlink}>
                    <Image src="/nb.png" alt="Vercel Logo" width={72} height={72} className={styles.logo} />
                    <h1 className={styles.headlink}>{props.title}</h1>
                </a>
            </Link>
            <div className={styles.menu}>
                <span>About Us</span>
                <span>Contact Us</span>
                <span>Help</span>
                <input type='search' className={styles.searchbox} id='searchbox' />
                <Image src="/search.svg" alt="Vercel Logo" width={32} height={32} className={styles.searchico} data-switch='off' onClick={search} id='searchico' />
            </div>
        </nav>
    )
}

export default Nav