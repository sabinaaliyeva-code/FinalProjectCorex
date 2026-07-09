import React from 'react'
import styles from './index.module.scss'
import ProductCard from '../ProductCard'

function ProductGrid({products}) {
  return (
    <>
    <section className={styles.productGrid}>
        <div className={styles.container}>
            {products.map((product)=>(<ProductCard key= {product._id}product={product}/>))}
        </div>
    </section>
    </>
  )
}

export default ProductGrid