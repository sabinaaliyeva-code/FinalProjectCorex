import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constants/routes.constants";
import {FaArrowRight } from "react-icons/fa";

function CategoryGrid({
  categories,
  variant = "home",
}) {
  return (
    <section className={styles.categoryGrid}>
      <div className={`${styles.container} ${styles[variant]}`}>
        {categories.map((category) => (
          
          <div  key={category._id}  className={`${styles.categoryCard} ${styles[`${variant}Card`]}`}>
            <img src={category.image} alt={category.name} className={styles.image} />

            <div className={styles.overlay}>
              <p className={styles.stock}>{category.stock} products</p>
              <h3>{category.name}</h3>
              <p>{category.description}</p>

              <div className={styles.storeLink}>
                <Link to={`/products?category=${category._id}`}>Shop Now <FaArrowRight /> </Link>
              </div>
            </div>
          </div>
          
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;