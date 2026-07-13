import React, { useEffect, useState} from "react";
import * as categoryService from "../../services/category.services";
import styles from './index.module.scss'

import Header from "../../layouts/Header";
import CategoryGrid from "../../components/CategoryGrid";



function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getCategories();
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchCategories();
  }, []);
  
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