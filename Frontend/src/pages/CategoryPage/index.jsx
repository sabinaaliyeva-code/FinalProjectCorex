import React from "react";
import styles from './index.module.scss'
import Header from "../../layouts/Header";
import CategoryGrid from "../../components/CategoryGrid";
import { useCategories } from "../../hooks/useCategories";



function CategoryPage() {
  const categories=useCategories();
 
  return(
    <>
      <Header/>
      <section className={styles.categoryGrid}>
        <CategoryGrid  categories={categories} variant="page"/>
      </section>
    </>
  );
}

export default CategoryPage;