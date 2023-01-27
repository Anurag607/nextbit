/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../src/styles/blogpages.module.scss'

const Page = ( {posts} ) => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if(id === '404') router.push('/nf', '/404', {shallow: true})
    }, [id, router])

    return (
        <div className={styles.wrapper}>
            <Head>
                <meta name="description" content="#" />
                <meta name="keywords" content="#" />
                <meta name="author" content="Deep" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
                <title>{id}</title>
            </Head>
            
            <div className={styles.txt} style={{backgroundImage: `url("${posts.bgimages}")`}}>
                <h1>{id}</h1>
                <p>
                    {posts.placeholder}
                </p>
                <br />
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            
            <div className={styles.cont}>
                <Image className={styles.separator} src="/bg-section-top-desktop-1.svg" alt="upper_curve_1" width={1300} height={175} />
                <div className={styles.bg1}>
                    <section className={styles.section2}>
                        <h1>Title 1</h1>
                        <p>
                            {posts.placeholder}
                        </p>
                        <Link href='#'>
                            <button>
                                <span>Read More</span>
                                <Image className={styles.arrow} src="/right-arrow.svg" alt="right-arrow" width={20} height={20} />
                            </button>
                        </Link>
                    </section>
                    <section>
                        <Image className={styles.img_} src="/illustration-grow-together.svg" alt="grow" width={300} height={300} />
                    </section>      
                </div>
                <Image className={styles.separator} src="/bg-section-bottom-desktop-1.svg" alt="lower_curve_1" width={1300} height={175} />
                <div className={styles.bg2}>
                    <br /><br />
                    <section>
                        <Image className={styles.img_} src="/illustration-flowing-conversation.svg" alt="conversations" width={300} height={300} />
                    </section>
                    <section className={styles.section2}>
                        <h1>Title 2</h1>
                        <p>
                            {posts.placeholder}
                        </p>
                        <Link href='#'>
                            <button>
                                <span>Read More</span>
                                <Image className={styles.arrow} src="/right-arrow.svg" alt="right-arrow" width={20} height={20} />
                            </button>
                        </Link>
                    </section>
                </div>
                <br /><br /><br />
                <Image className={styles.separator} src="/bg-section-top-desktop-2.svg" alt="upper_curve_2" width={1300} height={175} />
                <div className={styles.bg3}>
                    <section className={styles.section2}>
                        <h1>Title 3</h1>
                        <p>
                            {posts.placeholder}
                        </p>
                        <Link href='#'>
                            <button>
                                <span>Read More</span>
                                <Image className={styles.arrow} src="/right-arrow.svg" alt="right-arrow" width={20} height={20} />
                            </button>
                        </Link>
                    </section>
                    <section>
                        <Image className={styles.img_} src="/illustration-your-users.svg" alt="users" width={300} height={300} />
                    </section>
                </div>
                <Image className={styles.separator} src="/bg-section-bottom-desktop-2.svg" alt="lower_curve_2" width={1300} height={175} />
                <br /><br /><br />
            </div>
            <br /><br />
            
            <div className={styles.cont}>
                <Image className={styles.separator} src="/bg-footer-top-desktop.svg" alt="lower_curve_2" width={1300} height={175} />
                <footer className={styles.footer}>
                    <section className={styles.contact}>
                        <div>
                            <Image src="/icon-phone.svg" alt="phone" width={20} height={20} />
                            <p className={styles['phone.p']} >Phone: +1-543-123-4567</p>
                        </div>
                        <div>
                            <Image src="/icon-email.svg" alt="email" width={20} height={20} />
                            <p className={styles['email.p']} >examples@nextbit.com</p>
                        </div>
                        <br />
                        <div className={styles.btnwrap1}>
                            <Image className={styles.contact_ico} src="/f.svg" alt="facebook" width={40} height={40} />
                            <Image className={styles.contact_ico} src="/i.svg" alt="insta" width={40} height={40} />
                            <Image className={styles.contact_ico} src="/t.svg" alt="twitter" width={40} height={40} />
                        </div>
                    </section>
                    <section className={styles.newsletter}>
                        <h1>NEWSLETTER</h1>
                        <p className={styles['newsletter-msg']}>
                            {posts.placeholder}
                        </p><br />
                        <form>
                            <input type="email" className={styles.email} name="email" placeholder="example@gmail.com" />
                            <Link href='/sub'>
                                <input type="submit" value="Subscribe" className={styles.submit} />
                            </Link>
                        </form>
                    </section>
                </footer>
            </div>
        </div>
    )
}

export async function getServerSideProps( {params,req,res} ) {
    const response = await fetch(`${process.env.API_URL1}/api/blog/${params.id}`, {
        method: 'GET',
        headers: {'Content-type' : 'application/json'}
    })
    if (!response.ok) {
        res.writeHead(302, {Location: '/nf'}).end()
        return {
            props : {}
        }
    }

    const data = await response.json()
    
    if (data) {
        return {
            props : {
                posts: data
            }
        }
    }
}

export default Page