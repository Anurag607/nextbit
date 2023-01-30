import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import styles from '../../src/styles/update.module.scss'
import Nav from '../../src/components/nav'
import parseCookies from '../../src/scripts/cookieParser.mjs'
import Cookie from 'js-cookie'
import { CloudImage } from '../api/cloudinary/CloudImage'
import _ from 'lodash/debounce'
import {postType} from '../../src/utils/postType'
import Loader from '../../src/components/loader'

const CustomEditor = dynamic(()=>import('../../src/components/customEditor'),{ssr:false})

const Page: NextPage<{userDetails: string, introContent: string, content: string, post: postType}> = ( {userDetails, introContent, content, post} ) => {

    const router = useRouter()

    const {id} = router.query

    const [heroContent,setHeroContent] = React.useState({
        title: (JSON.parse(introContent).hasOwnProperty("title")) ? JSON.parse(introContent).title : post.title,
        desc: (JSON.parse(introContent).hasOwnProperty("desc")) ? JSON.parse(introContent).desc : post.desc,
        introImage: (JSON.parse(introContent).hasOwnProperty("introImage")) ? JSON.parse(introContent).introImage : post.introImage,
        bgImage: (JSON.parse(introContent).hasOwnProperty("bgImage")) ? JSON.parse(introContent).bgImage : post.bgImage
    })

    const [blogData,SetblogData] = React.useState(post)
    const [editorContent,Setcontent] = React.useState((content === '') ? '' : JSON.parse(content))
    const [auth, setAuth] = React.useState(JSON.parse(userDetails))

    const [bgImageURL, SetbgImageURL] = React.useState((typeof Cookie.get('bgImageURL') !== 'undefined') ? Cookie.get('bgImageURL') : heroContent.bgImage)
    const [introImageURL, SetintroImageURL] = React.useState((typeof Cookie.get('introImageURL') !== 'undefined') ? Cookie.get('introImageURL') : heroContent.introImage)

    const onFileChange = async (file:File) => {
  
        const form_data = new FormData()
        let preset = process.env.NEXT_PUBLIC_PRESET
        if (preset) {
          form_data.append('upload_preset',preset)
        }
        if (file) {
          form_data.append('file',file)
          const imageUrl = await CloudImage(form_data)
      
          if(imageUrl) {
            return imageUrl
          } else {
            return 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
          }
        }
        return 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
    }

    const HandleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let target = e.currentTarget
        switch(target.name) {
            case 'title' : {
                setHeroContent({
                    ...heroContent,
                    title: target.value
                })
                break
            }
            case 'introImage' : {
                let file = (e.target as any as HTMLInputElement).files[0]
                let loader = document.querySelectorAll('.loader');
                (loader[0] as HTMLDivElement).style.display = 'flex'
                let data = new Promise(async (resolve, reject) => {
                    const response = await onFileChange(file)
                    resolve(response)
                })
                data.then((url:string) => {
                    Cookie.set('introImageURL', url)
                    SetintroImageURL(currState => currState = url)
                })
                let image = Cookie.get('introImageURL')
                setHeroContent({
                    ...heroContent,
                    introImage: image
                })
                Cookie.set('introContent', JSON.stringify(heroContent))
                break
            }
            case 'bgImage' : {
                let file = (e.target as any as HTMLInputElement).files[0]
                let loader = document.querySelectorAll('.loader');
                (loader[1] as HTMLDivElement).style.display = 'flex'
                let data = new Promise(async (resolve, reject) => {
                    const response = await onFileChange(file)
                    resolve(response)
                })
                data.then((url:string) => {
                    SetbgImageURL(currState => currState = url)
                    Cookie.set('bgImageURL', url)
                })
                let image = Cookie.get('bgImageURL')
                setHeroContent({
                    ...heroContent,
                    bgImage: image
                })
                Cookie.set('introContent', JSON.stringify(heroContent))
                break
            }
            case 'desc' : {
                setHeroContent({
                    ...heroContent,
                    desc: target.value
                })
                break
            }
            default : {
                setHeroContent({
                    ...heroContent,
                })
                break
            }
        }
    }

    React.useEffect(() => {
        if(introImageURL.length > 0) {
            const el:HTMLDivElement = document.querySelector('.uploadedIntroImg')
            let loader = document.querySelectorAll('.loader');
            (loader[0] as HTMLDivElement).style.display = 'none'
            el.style.height = "50vh"
            el.style.backgroundImage = `url('${introImageURL}')`
        }
    }, [introImageURL])

    React.useEffect(() => {
        if(bgImageURL.length > 0) {
            const el:HTMLDivElement = document.querySelector('.uploadedBgImg')
            let loader = document.querySelectorAll('.loader');
            (loader[1] as HTMLDivElement).style.display = 'none'
            el.style.height = "50vh"
            el.style.backgroundImage = `url('${bgImageURL}')`
        }
    }, [bgImageURL])

    const updatePost = async () => {
        let introContent = JSON.parse(Cookie.get('introContent') || '{}')
        let userDetails = JSON.parse(Cookie.get('currentLoggedIn') || '{}')
        let data = {
          user_id: userDetails._id,
          author: userDetails.username,
          desc: introContent.desc,
          title: introContent.title,
          content: (typeof localStorage.getItem('content') === 'undefined') ? post.content: localStorage.getItem('content'),
          bgImage: bgImageURL,
          introImage: introImageURL
        }
    
        let status = 200
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_SERVER}/api/posts/updatePost/${id}`, {
          method: "PUT",
          mode: "cors",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(data)
        })
        
        status = response.status

        if(status === 200) {
            router.push(`/blogPage/${id}`, `/blogPage/${id}`, {shallow: true})
        }
    }

    return(
        <div className={styles.blogFormWrapper}>
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
            <div className={styles.content}>
                <div className={styles.heading}>
                    <h2>make the changes below and remember to hit the save button!</h2>
                    <p>*the information you enter in the below form will be used to display your blog on the home page and for hero section of your blog page. all input fields must be filled.</p>
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    Cookie.set('introContent', JSON.stringify(heroContent))
                    let userDetails = JSON.parse(Cookie.get('currentLoggedIn') || '{}')
                    if(userDetails.hasOwnProperty("username")) updatePost()
                }}>
                    <div className={`${styles.inputField} ${styles.title}`}>
                        <input type="text" id="title" name="title" value={heroContent.title} onChange={HandleChange} onKeyUp={() => Cookie.set('introContent', JSON.stringify(heroContent))} />
                        <label htmlFor={"title"}>{"title"}</label>
                    </div>
                    <div className={`${styles.inputField} ${styles.desc}`}>
                        <textarea id="desc" name="desc" value={heroContent.desc} onChange={HandleChange} onKeyUp={() => Cookie.set('introContent', JSON.stringify(heroContent))} />
                        <label htmlFor={"desc"}>{"description"}</label>
                    </div>
                    <div className={`${styles.inputField} ${styles.introImage}`}>
                        <div className={`${styles.inputDiv}`}>
                            <label htmlFor={"introImage"}>{"Introductory Image/Illustration : "}</label>
                            <span>
                                <input type="file" id="introImage" name="introImage" accept="image/*" onChange={HandleChange} />
                                <a href="https://www.freepik.com/" target="_blank" rel="noreferrer">*For referrence you can search on <b>freepik.com</b></a>
                            </span>
                        </div>
                        <Loader />
                        <div className={`${styles.uploadedImg} uploadedIntroImg`} style={{backgroundImage: `url('${introImageURL}')`}}/>
                    </div>
                    <div className={`${styles.inputField} ${styles.bgImage}`}>
                        <div className={`${styles.inputDiv}`}>
                            <label htmlFor={"bgImage"}>{"Background Image for Hero Section of the Blog : "}</label>
                            <span>
                                <input type="file" id="bgImage" name="bgImage" accept="image/*" onChange={HandleChange} />
                                <a href="https://unsplash.com/" target="_blank" rel="noreferrer">*For referrence you can search on <b>unsplash.com</b></a>
                            </span>
                        </div>
                        <Loader />
                        <div className={`${styles.uploadedImg} uploadedBgImg`} style={{backgroundImage: `url('${bgImageURL}')`}} />
                    </div>
                    <div className={styles.main}>
        
                        <div className={styles.editor}>
                            <CustomEditor setContent={Setcontent} content={post.content} />
                        </div>
                        <input type="submit" className={`${styles.save_btn} save_btn`} value="Save Changes" />
            
                    </div>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps( {params, req, res} ) {
    const cookies = parseCookies(req)
    let postStatus = 200
    const postResponse = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_SERVER}/api/posts/getPost/${params.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-type': 'application/json'}
    })
        
    postStatus = postResponse.status
    const postData = await postResponse.json()

    const introData = {
        title: (postData.title !== undefined) ? postData.title : '',
        desc: (postData.desc !== undefined) ? postData.desc : '',
        introImage: (postData.introImage !== undefined) ? postData.introImage : '',
        bgImage: (postData.bgImage !== undefined) ? postData.bgImage : ''
    }
    
    if(!postResponse.ok && cookies) {
        res.writeHead(302, {Location: '/nf'}).end()
        return {
            props : {}
        }
    }

    return {
        props : {
            userDetails: (typeof cookies.currentLoggedIn !== 'undefined') ? cookies.currentLoggedIn : '{}',
            introContent: JSON.stringify(introData),
            content: (postData.content !== undefined) ? postData.content : (typeof cookies.content !== 'undefined') ? cookies.content : '',
            post: postData
        }
    }
}

export default Page