import '../src/styles/globals.css'
import React from 'react'
import Nav from '../src/components/nav'
import data from '../src/data.json'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Nav title='NextBit'/>
      <Component {...pageProps} 
        heading='Welcome To NextBit'
        title={data.topics}
        images={data.images}
        placeholder={data.placeholder}
        content={data.content}
        bgimages={data.bgimages}
      />
    </>
  )
}

export default MyApp
