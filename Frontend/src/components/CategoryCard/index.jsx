import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constants/routes.constants";

function CategoryCard({ category}) {
  return (

     
          <div className={styles.categoryCard} key={category._id}>
            <img src={category.image} alt={category.name} className={styles.image} />

            <div className={styles.text}>
              <p>Stock: {category.stock}</p>
              <h3>{category.name}</h3>
              <p>{category.description}</p>

              <div className={styles.storeLink}>
                <Link to={`/products?category=${category._id}`}>Shop Now</Link>
              </div>
            </div>
          </div>
        
      
    
  );
}

export default CategoryCard;