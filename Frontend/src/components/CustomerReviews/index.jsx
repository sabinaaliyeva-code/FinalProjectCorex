import React from 'react'
import styles from './index.module.scss'
import {  FaStar } from 'react-icons/fa'

function CustomerReviews() {
  return (
    <div className={styles.reviewCards}>
         <div className={styles.card}>
              <div className={styles.iconStars}><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
              <p>"Stride has completely transformed my running experience. The Velocity Runner Pro helped me PR at my last marathon by 8 minutes."</p>
              <div className={styles.customer}>
                <img src="https://randomuser.me/api/portraits/men/32.jpg"></img>
                <div className={styles.info}>
                    <h4>Marcus Chen</h4>
                    <p>Marathon Runner</p>
                </div>
              </div>
         </div>
         <div className={styles.card}>
            <div className={styles.iconStars}><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
              <p>"I wear Stride shoes for all my classes. They are versatile, stylish, and most importantly, my feet never hurt after a long day of training."</p>
              <div className={styles.customer}>
                <img src="https://randomuser.me/api/portraits/women/44.jpg"></img>
                <div className={styles.info}>
                    <h4>Emily Rodriguez</h4>
                    <p>Fitness Instructor</p>
                </div>
              </div>
              
         </div>
         <div className={styles.card}>
            <div className={styles.iconStars}><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
              <p>"The quality and attention to detail is unmatched. I have been collecting sneakers for 15 years and Stride has become my go-to brand."</p>
              <div className={styles.customer}>
                <img src="https://randomuser.me/api/portraits/men/75.jpg"></img>
                <div className={styles.info}>
                    <h4>David Kim</h4>
                    <p>Sneaker Enthusiast</p>
                </div>
              </div>

         </div>
    </div>
  )
}

export default CustomerReviews