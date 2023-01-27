import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import type { NextPage } from 'next'
import { userDetails } from '../../src/utils/userDetails'
import styles from '../../src/styles/blogForm.module.scss'
import Nav from '../../src/components/nav'
import parseCookies from '../../src/scripts/cookieParser.mjs'
import Cookie from 'js-cookie'
import { CloudImage } from '../../pages/api/cloudinary/CloudImage'
import _ from 'lodash/debounce'
import { NextApiRequest } from 'next'

const Page: NextPage<{userDetails: string, cookieIntro}> = ( {userDetails, cookieIntro} ) => {

    const router = useRouter()

    const auth = React.useRef<userDetails>(JSON.parse(userDetails))
    const [parsedCookies, setParsedCookies] = React.useState(JSON.parse(cookieIntro))
    const styling = {
        warning: React.useRef<HTMLInputElement>(null)
    }

    const [introContent,SetIntroContent] = React.useState({
        title: (typeof parsedCookies.title !== 'undefined') ? parsedCookies.title : '',
        desc: (typeof parsedCookies.desc !== 'undefined') ? parsedCookies.desc : '',
        introImage: (typeof parsedCookies.introImage !== 'undefined' && parsedCookies.introImage !== null) ? parsedCookies.introImage : '',
        bgImage: (typeof parsedCookies.bgImage !== 'undefined' && parsedCookies.bgImage !== null) ? parsedCookies.bgImage : ''
    })

    const [bgImageURL, SetbgImageURL] = React.useState((typeof Cookie.get('bgImageURL') !== 'undefined') ? Cookie.get('bgImageURL') : introContent.bgImage)
    const [introImageURL, SetintroImageURL] = React.useState((typeof Cookie.get('introImageURL') !== 'undefined') ? Cookie.get('introImageURL') : introContent.introImage)

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
                SetIntroContent({
                    ...introContent,
                    title: target.value
                })
                break
            }
            case 'introImage' : {
                let file = (e.target as any as HTMLInputElement).files[0]
                let data = new Promise(async (resolve, reject) => {
                    const response = await onFileChange(file)
                    resolve(response)
                })
                data.then((url:string) => {
                    sessionStorage.setItem('introImageURL', url)
                    SetintroImageURL(currState => currState = url)
                })
                let image = sessionStorage.getItem('introImageURL')
                SetIntroContent({
                    ...introContent,
                    introImage: image
                })
                Cookie.set('introContent', JSON.stringify(introContent))
                break
            }
            case 'bgImage' : {
                let file = (e.target as any as HTMLInputElement).files[0]
                let data = new Promise(async (resolve, reject) => {
                    const response = await onFileChange(file)
                    resolve(response)
                })
                data.then((url:string) => {
                    SetbgImageURL(currState => currState = url)
                    sessionStorage.setItem('bgImageURL', url)
                })
                let image = sessionStorage.getItem('bgImageURL')
                SetIntroContent({
                    ...introContent,
                    bgImage: image
                })
                Cookie.set('introContent', JSON.stringify(introContent))
                break
            }
            case 'desc' : {
                SetIntroContent({
                    ...introContent,
                    desc: target.value
                })
                break
            }
            default : {
                SetIntroContent({
                    ...introContent,
                })
                break
            }
        }
    }

    React.useEffect(() => {
        if(introImageURL.length > 0) {
            const el:HTMLDivElement = document.querySelector('.uploadedIntroImg')
            el.style.height = "50vh"
            el.style.backgroundImage = `url('${introImageURL}')`
        }
    }, [introImageURL])

    React.useEffect(() => {
        if(bgImageURL.length > 0) {
            const el:HTMLDivElement = document.querySelector('.uploadedBgImg')
            el.style.height = "50vh"
            el.style.backgroundImage = `url('${bgImageURL}')`
        }
    }, [bgImageURL])

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
                    <h2>take the first step towards creating your blog!</h2>
                    <p>*the information you enter in the below form will be used to display your blog on the home page and for hero section of your blog page. all input fields must be filled.</p>
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    Cookie.set('introContent', JSON.stringify(introContent))
                    router.push('/editor')
                }}>
                    <div className={`${styles.inputField} ${styles.title}`}>
                        <input type="text" id="title" name="title" value={introContent.title} onChange={HandleChange} required onKeyUp={() => Cookie.set('introContent', JSON.stringify(introContent))} />
                        <label htmlFor={"title"}>{"title"}</label>
                    </div>
                    <div className={`${styles.inputField} ${styles.desc}`}>
                        <textarea id="desc" name="desc" value={introContent.desc} onChange={HandleChange} required onKeyUp={() => Cookie.set('introContent', JSON.stringify(introContent))} />
                        <label htmlFor={"desc"}>{"description"}</label>
                    </div>
                    <div className={`${styles.inputField} ${styles.introImage}`}>
                        <div className={`${styles.inputDiv}`}>
                            <label htmlFor={"introImage"}>{"Introductory Image/Illustration : "}</label>
                            <span>
                                <input type="file" id="introImage" name="introImage" accept="image/*" onChange={HandleChange} required />
                                <a href="https://www.freepik.com/" target="_blank">*For referrence you can search on <b>freepik.com</b></a>
                            </span>
                        </div>
                        <div className={`${styles.uploadedImg} uploadedIntroImg`} style={{backgroundImage: `url('${introImageURL}')`}}/>
                    </div>
                    <div className={`${styles.inputField} ${styles.bgImage}`}>
                        <div className={`${styles.inputDiv}`}>
                            <label htmlFor={"bgImage"}>{"Background Image for Hero Section of the Blog : "}</label>
                            <span>
                                <input type="file" id="bgImage" name="bgImage" accept="image/*" onChange={HandleChange} required />
                                <a href="https://unsplash.com/" target="_blank">*For referrence you can search on <b>unsplash.com</b></a>
                            </span>
                        </div>
                        <div className={`${styles.uploadedImg} uploadedBgImg`} style={{backgroundImage: `url('${bgImageURL}')`}} />
                    </div>
                    <div>
                        <input type="submit" className={styles.proceed} value="Proceed" />
                        <span className={styles.warning} ref={styling.warning}></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps( {params, req, res} ) {
    const cookies = parseCookies(req)
  
    if (cookies) {
      return {
        props : {
          userDetails: (typeof cookies.currentLoggedIn !== 'undefined') ? cookies.currentLoggedIn : '{}',
          cookieIntro: (typeof cookies.introContent !== 'undefined') ? cookies.introContent : '{}'
        }
      }
    } else {
      return {
        redirect: {
          destination: '/nf',
          permanent: false
        }
      }
    }
  }

export default Page