import React from 'react'
import  styles  from './index.module.scss'

function HeroSection() {
  return (
    <>
    <section className={styles.hero}>
        <div className={styles.leftSide}>
        <h1>Step Into <br/><span> Your Best</span> </h1>
       
        <p>Premium footwear for every step of your journey. From athletic performance to everyday comfort.</p>
        <div className={styles.buttons}>
            <button className={styles.shopBtn}>Shop Now</button>
            <button className={styles.categoriesBtn}>Browse Categories</button>
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
        </div>
    </section>
    </>
  )
}

export default HeroSection