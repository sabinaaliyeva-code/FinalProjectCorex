import React from 'react'
import styles from './index.module.scss'

function ProductCard({product}) {
  return (
    <>
    <section className={styles.productCard}>
        <div className={styles.topSide}>
            <img src={product.image} className={styles.image}></img>
            <div className={styles.buttons}>
                <button className={styles.addBtn}>Add to cart</button>
                <button className={styles.wishlistBtn}>❤️</button>
            </div>
            
        </div>
        <div className={styles.bottomSide}>
            <p>{product.category}</p>
            <h3>{product.title}</h3>
            <div className={styles.priceInfo}>
                <p className={ProductCard.price}>{product.price}</p>
            </div>
        </div>

    </section>
    </>
  )
}

export default ProductCard