import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../src/styles/nav.module.css'
import search from '../scripts/searchbar.mjs'
import Head from 'next/head'

const Nav = (props: any) => {

    const [toggle, Settoggle] = React.useState("close")

    const burger = {
        menu : React.useRef(null),
        dropdown : React.useRef(null),
        dropdownEl : React.useRef([])
    }

    React.useEffect(() => {
        if(toggle === "close") {
            for(let i = 0; i < burger.dropdownEl.current.length; i++) {
                burger.dropdownEl.current[i].style.display = "none"
            }
        }
        else {
            for(let i = 0; i < burger.dropdownEl.current.length; i++) {
                burger.dropdownEl.current[i].style.display = "block"
            }
        }
    }, [burger.dropdownEl, toggle])

    const AddToRefs = (el : any) => {
        if(el && !burger.dropdownEl.current.includes(el)) {
            burger.dropdownEl.current.push(el)
        }
    }

    const TabGen = (props:any) => {
        return <span ref={AddToRefs}>{props.tab}</span>
    }

    const Menu = () => {
        let row = new Array(3).fill(1)
        let tabs = ['About Us', 'Contact Us', 'Help']

        row.map((el,i) => {
            <span key={i} ref={(element) => {burger.dropdownEl.current[i] = element}}>{el}</span>
        })

        return (
            <div ref={burger.dropdown} className={(toggle === "close") ? `${styles.Navel} ${styles.close}` : `${styles.Navel} ${styles.open}`}>
                {
                    row.map((el,i) => {
                        return <TabGen key={i} tab={tabs[i]} el={el} />
                    })
                }
            </div>
        )
    }

    const HandleClick = () => {
        if(toggle === "close") {
            Settoggle("open")
        }
        else {
            Settoggle("close")
        }
    }


    return (
        <nav className={styles.nav}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
            </Head>
            <Link href='/'>
                <a className={styles.headlink}>
                    <Image src="/nb.png" alt="Vercel Logo" width={72} height={72} className={styles.logo} />
                    <h1 className={styles.headlink}>{props.title}</h1>
                </a>
            </Link>
            <div className={styles.menu}>
                <Menu />
                <menu>
                    <Image src="/menu.png" alt="menu" width={32} height={32} className={styles.menuLogo} onClick={HandleClick} />
                </menu>
                <input type='search' className={styles.searchbox} id='searchbox' />
                <Image src="/search.svg" alt="Vercel Logo" width={32} height={32} className={styles.searchico} data-switch='off' onClick={search} id='searchico' />
            </div>
        </nav>
    )
}

export default Nav