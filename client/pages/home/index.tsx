import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../src/styles/home.module.scss'
import menu from '../../src/scripts/menu.mjs'
import Link from 'next/link'
import Nav from '../../src/components/nav'
import parseCookies from '../../src/scripts/cookieParser.mjs'
import {useRouter} from 'next/router'
import Cookie from 'js-cookie'
import {selectPage, deselectAll} from '../../src/scripts/pagination.mjs'

function Home( {posts, userDetails} ) {

  const router = useRouter()

  const [article, setArticle] = React.useState((posts.length > 0) ? {
    _id: posts[0]._id,
    author: posts[0].author,
    desc: posts[0].desc,
    title: posts[0].title,
    content: posts[0].content,
    bgImage: posts[0].bgImage,
    introImage: posts[0].introImage,
    createdAt: posts[0].createdAt
  } : {
    _id: '',
    author: '',
    desc: '',
    title: '',
    content: '',
    bgImage: '',
    introImage: '',
    createdAt: ''
  })

  const Handlechange = (e: React.MouseEvent<HTMLSpanElement>) => {
    Cookie.set('currentIndex', e.currentTarget.dataset.index)
    setArticle({
      _id: posts[e.currentTarget.dataset.index]._id,
      author: posts[e.currentTarget.dataset.index].author,
      desc: posts[e.currentTarget.dataset.index].desc,
      title: posts[e.currentTarget.dataset.index].title,
      content: posts[e.currentTarget.dataset.index].content,
      bgImage: posts[e.currentTarget.dataset.index].bgImage,
      introImage: posts[e.currentTarget.dataset.index].introImage,
      createdAt: posts[e.currentTarget.dataset.index].createdAt
    })
  }

  React.useEffect(() => {
    Cookie.remove('content')
    Cookie.remove('introContent')
    Cookie.remove('introImageURL')
    Cookie.remove('bgImageURL')
    Cookie.remove('post_id')
    localStorage.clear()
    sessionStorage.clear()
    let currentPostIndex = Cookie.get('currentIndex') === undefined ? 0 : Cookie.get('currentIndex')
    if(currentPostIndex > posts.length-1) {
      Cookie.set('currentIndex', posts.length-1)
      currentPostIndex = posts.length-1
    }
    const page = document.querySelectorAll('.menubtn');
    if(page[currentPostIndex] !== undefined) (page[currentPostIndex] as HTMLSpanElement).scrollIntoView({behavior: 'smooth'})
    setArticle({
      _id: posts[currentPostIndex]._id,
      author: posts[currentPostIndex].author,
      desc: posts[currentPostIndex].desc,
      title: posts[currentPostIndex].title,
      content: posts[currentPostIndex].content,
      bgImage: posts[currentPostIndex].bgImage,
      introImage: posts[currentPostIndex].introImage,
      createdAt: posts[currentPostIndex].createdAt
    })
  }, []) // eslint-disable-line

  React.useEffect(() => {
    let currentPostIndex = Cookie.get('currentIndex') === undefined ? 0 : Cookie.get('currentIndex')
    const page = document.querySelectorAll('.menubtn');
    if(page[currentPostIndex] !== undefined) (page[currentPostIndex] as HTMLSpanElement).scrollIntoView({behavior: 'smooth'})
    selectPage(currentPostIndex)
  },[article])
  
  const Pagegen = (props: {number: string, id: number}) => {
    return <span onClick={Handlechange} className="menubtn" data-index={props.id}>{props.number}</span>
  }
  
  const Page = () => {
    return (
      <section className={styles.sidebar}>
        {posts.map((el:Object,i:number) => {
            return <Pagegen key={i} number={`0${i+1}`} id={i} />
        })}
      </section>
    )
  }

  return (
    <>
      <main className={styles.container}>
        <Head>
          <meta name="description" content="#" />
          <meta name="keywords" content="#" />
          <meta name="author" content="Deep" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
          <meta name="Blog Generator" content="Generated by create next app" />
          <link rel = "icon" href = "/nb.png" type = "image/x-icon" />
          <title>NextBit</title>
        </Head>
        
        <Nav title='NextBit' auth={userDetails} />

        <div className={styles.heroSection}>
          <section className={styles.heroContent}>
            <h1 className={styles.heading}>{'Welcome To NextBit!'}</h1>
            <p className={styles.heroMsg}>
              Build a blazing fast blog with us. Everything is <b>Free</b> here.
            </p>
            <Link href={`/${(JSON.parse(userDetails).username !== undefined && JSON.parse(userDetails).username.length > 0) ? 'blogForm' : 'login'}`}>
              <button className={styles.getStartedbtn}>Get Started</button>
            </Link>
          </section>
          <section className={styles.mockupCont} />
        </div>
      </main>
      
      {(posts.length > 0) ? <div className={styles.content}>

        <Page />
        
        <section className={styles.postBody}>
          <section className={styles.post}>
            <div className={styles.postHeader}>
              <div className={styles.postDate}> {article.createdAt} </div>
              <span />
              <div className={styles.postAuthor}> {article.author} </div>
            </div>
            <div className={styles.postTitle} style={{fontSize: (article.title.length > 70) ? '1.5rem' : '2.25rem'}}> {article.title}  </div>
            <div style={{backgroundImage: `url(${article.introImage})`}} className={styles.postImage} />
          </section>
          
          <section className={styles.posttext}>
            <div className={styles.postTextHeader}>
              <span />
              <p>Introduction :</p>
            </div>
            <p>{article.desc}</p>
            <span className={styles.readMore} onClick={() => {
              Cookie.set('post_id', article._id)
              router.push(`/blogPage/${article._id}`, `/blogPage/${article._id}`, {shallow: true})
            }}>
              Read More
              <div className={styles.goIcon}>
                <Image src="/right-arrow.svg" alt="right-arrow" width={29} height={29} layout='intrinsic' style={{cursor: 'pointer'}}/>
              </div>
            </span>
          </section>
        </section>
        
        </div> : <div className={styles['empty-wrapper']}>
            <div />
            <p>No Posts Available</p>
        </div>}
      <footer></footer>
    </>
  )
}

export async function getServerSideProps( {params, req, res} ) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_SERVER}/api/posts/getAll`, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-type' : 'application/json' }
  })
  if (!response.ok) {
    res.writeHead(302, {Location: '/nf'}).end()
    return {
      props : {}
    }
  }

  const data = await response.json()
  const cookies = parseCookies(req)

  if (data) {
    return {
      props : {
        posts : data,
        userDetails: (typeof cookies.currentLoggedIn !== 'undefined') ? cookies.currentLoggedIn : '{}'
      }
    }
  }
}

export default Home