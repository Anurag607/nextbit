import React from 'react'
import styles from './dash.module.scss'
import Link from 'next/link'
import Cookie from 'js-cookie'
import Head from 'next/head'
import parseCookies from '../../src/scripts/cookieParser.mjs'
import {userDetails} from '../../src/utils/userDetails'
import {useRouter} from 'next/router'
import { postType } from '../../src/utils/postType'
import Image from 'next/image'

const Dashboard = ({auth, posts}: {auth: string, posts:postType[]}) => {

  const router = useRouter()

  const [userDetails, setUserDetails] = React.useState<userDetails>(JSON.parse(auth))
  
  React.useEffect(() => {
    const body = document.querySelector('body')
    body.style.backgroundColor = '#ffffff'
  }, [])

  const Posts = () =>  {
    return (
      <div className={styles.posts}>
        {posts.map((el,i) => {
          return (
            <Link href={`blogPage/${el._id}`} key={i}>
              <div className={styles.head}>
                <div>
                  <span className={styles.desc}>{(el.title.length >= 60) ? `${el.title.slice(0,el.title.length/2)}...` : `${el.title}`}</span>
                  <div>
                    <span className={styles.createdAt}>
                      <span>Created On:</span>
                      {`${el.createdAt}`}</span>
                    <span className={styles.updatedAt}>
                      <span>Updated On:</span>
                      {`${el.updatedAt}`}</span>
                  </div>
                </div>
                <div className={`${styles.itemImg} itemImg`} style={{backgroundImage: `url('${(typeof el.introImage === 'string') ? el.introImage : '/casual2.jpg'}')`}} />
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
      <div id='dashboard' className={styles.dashboard}>
      <Head>
          <meta name="description" content="#" />
          <meta name="keywords" content="#" />
          <meta name="author" content="Deep" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
          <meta name="Blog Generator" content="Generated by create next app" />
          <link rel = "icon" href = "/nb.png" type = "image/x-icon" />
          <title>NextBit</title>
      </Head>
      <section id='sidebar' className={styles.sidebar}>
        <div className={styles.title}>
          <h2>N</h2>
          <span>e</span>
          <h3>x</h3>
          <span>tbit</span>
        </div>
        <Link href='/home' as='/home' passHref>
          <a id='logout' className={styles.home}>
            <Image src='/home.png' alt='home' width={32} height={32} />
            <span>Home</span>
          </a>
        </Link>
        <Link href='/login' as='/login' passHref>
          <a id='logout' className={styles.logout} onClick={() => {
            Cookie.remove('currentLoggedIn', {path: ''})
            router.push('/home', '/home', {shallow: true})
          }}>
            <Image src='/logout.svg' alt='logout' width={32} height={32} />
            <span>Logout</span>
          </a>
        </Link>
      </section>
      <section id='profile' className={styles.profile}>
      <div className={styles.sidebarToggle}>
          <div className={styles.title}>
            <h2>N</h2>
            <span>e</span>
            <h3>x</h3>
            <span>tbit</span>
          </div>
          <Link href='/home' as='/home' passHref>
            <a id='logout' className={styles.home}>
              <Image src='/home.png' alt='home' width={32} height={32} />
              <span>Home</span>
            </a>
          </Link>
          <Link href='/login' as='/login' passHref>
            <a id='logout' className={styles.logout} onClick={() => {
              Cookie.remove('currentLoggedIn', {path: ''})
              router.push('/home', '/home', {shallow: true})
            }}>
              <Image src='/logout.svg' alt='logout' width={32} height={32} />
              <span>Logout</span>
            </a>
          </Link>
        </div>
        <div className={styles.header}>
          <Image src='/right-arrow.png' alt='right-arrow' height={32} width={32} />
          <div>
            <p>Hi {userDetails.username},</p>
            <span>Welcome Back!</span>
          </div>
        </div>
        <div className={styles.profile}>
          <div id="profileImg" className={styles.profileimg} />
          <div id="info" className={styles.info}>
            <span className={`${styles.name} name`}>
              <p>{`${(typeof userDetails.username !== 'undefined') ? userDetails.username : '-NA-'}`}</p>
            </span>
            <span className={`${styles.email} email`}>
              <span>Email Id:</span>
              <p>{`${(typeof userDetails.email !== 'undefined') ? userDetails.email : '-NA-'}`}</p>
            </span>
          </div>
        </div>
        <Posts />
        <div className={styles.pastComment}></div>
      </section>
    </div>
  )
}

export async function getServerSideProps ({params, req, res}) {
  const cookies = parseCookies(req)
  let userId = JSON.parse(cookies.currentLoggedIn)._id
  let postDetails = []
  let status = 201
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_SERVER}/api/posts/getUsersPosts/${userId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-type': 'application/json'},
  })
  status = response.status
  const resMessage = await response.json()
  postDetails = resMessage

  if(!response.ok && cookies) {
    res.writeHead(302, {Location: '/nf'}).end()
    return {
      props : {}
    }
  }
  
  return {
    props : {
        auth: (cookies.currentLoggedIn) ? cookies.currentLoggedIn : "{}",
        posts: postDetails
    }
  }
}

export default Dashboard