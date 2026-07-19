import React, { useState } from "react";
import styles from './index.module.scss'
import Header from "../../layouts/Header";
import CategoryGrid from "../../components/CategoryGrid";
import { useCategories } from "../../hooks/useCategories";
import HeroPage from "../../components/HeroPage";
import { ROUTE } from "../../constants/routes.constants";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";



function CategoryPage() {
  const categories=useCategories();
  const [title, description, background, currentPage,]=useState();
 
  return(
    <section className={styles.categoryPage}>
      <Header/>
      <HeroPage />
      <div className={styles.categoryGrid}>
        <CategoryGrid  categories={categories} variant="page"/>
      </div>
      <div className={styles.pageFooter}>
        <div className={styles.footerContainer}>
        <div className={styles.leftSide}>
            <h2>Can't decide?</h2>
            <p>Browse all our products or check out our bestsellers</p>
        </div>
        <div className={styles.rightSide}>
            <button className={styles.ShopBtn}><Link to={ROUTE.PRODUCT}>Shop All</Link><FaArrowRight className={styles.icon}/></button>
            <button className={styles.SaleBtn}><Link to={ROUTE.Sale}>View Sale Items</Link></button>
        </div>
        </div>
      </div>
    </section>
    
  );
}

export default CategoryPage;