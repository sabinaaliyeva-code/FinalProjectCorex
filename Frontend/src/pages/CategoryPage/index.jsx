import React, { useEffect, useState} from "react";
import * as categoryService from "../../services/category.services";
import styles from './index.module.scss'
import CategoryCard from "../../components/CategoryCard";
import Header from "../../layouts/Header";



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
    <div className={styles.container}>
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  </section>
</>
);
}

export default CategoryPage;