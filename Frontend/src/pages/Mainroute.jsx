import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../layouts/Header'
import Productspage from './Productspage'
import HeroSection from '../layouts/HeroSection'





function Mainroute() {

  return <>
         <Header/>
         <HeroSection/>
         <Outlet/>
         
        </>
}

export default Mainroute