import React from 'react'
import  styles  from './index.module.scss'
import { Link } from 'react-router-dom'
import { ROUTE } from '../../constants/routes.constants'
import { FaArrowLeft, FaArrowRight, FaCheck, FaUndo } from 'react-icons/fa'

function HeroSection() {
  return (
    <>
    <section className={styles.hero}>
        <div className={styles.leftSide}>
        <h1>Step Into <br/><span> Your Best</span> </h1>
        <p>Premium footwear for every step of your journey. From athletic performance to everyday comfort.</p>
        <div className={styles.buttons}>
            <button className={styles.shopBtn}><Link to={ROUTE.PRODUCT}>Shop Now</Link><FaArrowRight className={styles.icon}/></button>
            <button className={styles.categoriesBtn}><Link to={ROUTE.CATEGORY}>Browse Categories </Link></button>
        </div>
        <div className={styles.box}>
            <div className={styles.box1}>
                <h2>500K +</h2>
                <p>Happy customers</p>
            </div>
            <div className={styles.box2}>
                <h2>4.9</h2>
                <p>Average Rating</p>
            </div>
            <div className={styles.box3}>
                <h2>300+</h2>
                <p>Styles available</p>
            </div>
        </div>
        </div>
        <div className={styles.rightSide}>
            <div className={styles.image}>
               <img src='https://cdnya.proimagescdn.ru/images/bimages/1045/100812nike04_1.jpg'></img>
              
            </div>
            <div className={styles.badgeCheck}>
                <div className={styles.icon}><FaCheck /></div>
                <div className={styles.info}>
                    <h2>Free Shipping</h2>
                    <p>Orders over $75</p>
                </div>
            </div>
            <div className={styles.badgeReturn}>
                <div className={styles.icon}><FaUndo /></div>
                <div className={styles.info}>
                    <h2>Easy Return</h2>
                    <p>60-day guarantee</p>
                </div>
            </div>
            <div className={styles.badgeSale}>
                <p>UP TO</p><span> 40%</span><p> OFF</p>
            </div>
        </div>
    </section>
    </>
  )
}

export default HeroSection