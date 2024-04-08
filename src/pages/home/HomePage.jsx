import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/Category'
import HomePageProductCard from '../../components/homePageProductCard/HomePageProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import MyContext from '../../context/MyContext'
import Loader from '../../components/loader/Loader'

function HomePage() {
  const context=useContext(MyContext)
  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
    </Layout>
  )
}

export default HomePage