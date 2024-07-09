import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/popular/Popular'
import Offer from '../components/offer/Offer'
import NewCollection from '../components/Newcollection/NewCollection'
import NewsLetter from '../components/Newsletter/NewsLetter'

function Shop() {
  return (
    <div>
        <Hero/>
        <Popular/>
        <Offer/>
        <NewCollection/>
        <NewsLetter/>
    </div>
  )
}

export default Shop
