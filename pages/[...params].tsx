/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../src/styles/404.module.css'

const Page = () => {

    const router = useRouter()

    const {url} = router.query

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>{url}</title>
            </Head>
            <h1>404</h1>
            <p>Oops! The Page you are looking for might have been removed, had it's name changed or is temporarily unavailabe.</p>
        </div>
    )

}

export default Page