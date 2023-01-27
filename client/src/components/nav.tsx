import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../src/styles/nav.module.scss'
import search from '../scripts/searchbar.mjs'
import Head from 'next/head'
import Cookie from 'js-cookie'
import {getCookie, setCookie} from 'cookies-next'
import parseCookies from '../scripts/cookieParser.mjs'
import { userDetails } from '../utils/userDetails'
import { NextApiRequest, NextApiResponse } from 'next'

const Navbar = ({auth, title}) => {

    const [toggle, Settoggle] = React.useState("close")

    const placeholder = {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        __v: 0
    }

    const [userDetails, SetuserDetails] = React.useState<userDetails>(JSON.parse((typeof auth !== "undefined" && auth !== undefined) ? auth : JSON.stringify(placeholder)))

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
                burger.dropdownEl.current[i].style.display = "flex"
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
                    <h1 className={styles.headlinktext}>{title}</h1>
                </a>
            </Link>
            <div className={styles.menu}>
                {/* <Menu />
                <menu>
                    <div className={styles.menuCont}>
                        <Image src="/menu.png" alt="menu" width={24} height={24} className={styles.menuLogo} onClick={HandleClick} />
                    </div>
                </menu> */}
                {/* <input type='search' placeholder='Search' className={styles.searchbox} id='searchbox' />
                <div className={styles.searchCont} onClick={search}>
                    <Image src="/search.png" alt="Vercel Logo" width={13} height={13} className={styles.searchico} data-switch='off' id='searchico' />
                </div> */}
                {(userDetails.hasOwnProperty("username") && userDetails.username.length > 0) ?
                    <Link href='/dashboard' as={`/dashboard`} passHref>
                        <a className={styles.navDash} onClick={() => {}}>
                            <div />
                            <div>{userDetails.username}</div>
                        </a>
                    </Link>
                        : 
                    <Link href='/login' as='/login' passHref>
                        <a className={styles.login}>Login</a>
                    </Link> 
                }
            </div>
        </nav>
    )
}

export default Navbar