/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../src/styles/sub.module.css'

const Page = () => {

    const router = useRouter()

    const {url} = router.query

    return (
        <div className={styles.wrapper}>
            <Image className={styles.img} src="/email.png" alt="letter" width={300} height={300} />
            <h1>Thank You for Subscribing!</h1>
            <h2>Hi Anurag Goswami,</h2>
            <p>We are incredibly exicited to have you here.</p>
            <p>You have been added to our list and you will hear from us soon.</p>
        </div>
    )

}

export default Page