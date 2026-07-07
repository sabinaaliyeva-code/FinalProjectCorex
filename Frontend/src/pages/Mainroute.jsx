import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../layouts/Header'
import Products from './Productspage'


function Mainroute() {

  return <>
         <Header/>
         <Products/>
         <Outlet/>
        </>
}

export default Mainroute