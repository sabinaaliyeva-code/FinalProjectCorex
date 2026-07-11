import React, { useEffect, useState } from "react";
import * as categoryService from "../../services/category.services";
import CategoryCard from "../../components/CategoryCard";
import styles from "./index.module.scss";
import { getProducts } from "../../services/products.service";
import ProductGrid from "../../components/ProductGrid";
import { ROUTE } from "../../constants/routes.constants";
import { Link } from "react-router-dom";

function Homepage() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  
  
 useEffect(() => {
  getProducts({ featured: true })
    .then((res) => setFeaturedProducts(res.data))
    .catch(console.log);

  getProducts({ newArrival: true })
    .then((res) => setNewProducts(res.data))
    .catch(console.log);

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


  return (
    <section className={styles.homeCategories}>
        <h1>Shop By Category</h1>
      <div className={styles.container}>
        {categories.map((category) => (
          <CategoryCard  key={category._id}  category={category} />
        ))}
      </div>
       <div className={styles.header}>
        <h2>Featured Products</h2>
        <Link to={ROUTE.FEATURED}>View All</Link>
       </div>
      <ProductGrid products={featuredProducts.slice(0,8)} />
      <div className={styles.header}>
        <h2>New Arrivals</h2>
        <Link to= {ROUTE.NEW_ARRIVALS}>View All</Link>
      </div>
      <ProductGrid products={newProducts.slice(0,8)} />
    </section>
  );
}

export default Homepage;