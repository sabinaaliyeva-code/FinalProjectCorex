import  { useEffect, useState } from "react";
import * as categoryService from "../../services/category.services";
import styles from "./index.module.scss";
import { getProducts } from "../../services/products.service";
import ProductGrid from "../../components/ProductGrid";
import { ROUTE } from "../../constants/routes.constants";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import CategoryGrid from "../../components/CategoryGrid";
 



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
  <>
    {/* Categories */}
    <section className={styles.homeCategories}>
      <div className={styles.header}>
        <div className={styles.text}>
        <h2>Shop By Category</h2>
        <p>Find the perfect pair for every occasion</p>
        </div>
        <Link to={ROUTE.PRODUCT}>View All<FaAngleRight/></Link>
      </div>
       <CategoryGrid  categories={categories} variant="home" />
    </section>

    {/* Featured */}
    <section className={styles.featuredSection} >
      <div className={styles.flex}>
        <div className={styles.header}>
          <div className={styles.text}>
             <h2>Featured Products</h2>
             <p>Our most popular styles handpicked for you</p>
          </div>
           <Link to={ROUTE.FEATURED}>View All Featured<FaAngleRight/></Link>
       </div>
       <div className={styles.container}>
        <ProductGrid products={featuredProducts.slice(0, 8)} />
      </div>
      </div>
    </section>

    {/* New Arrivals */}
    <section className={styles.newSection}>
      <div className={styles.flex}>
       <div className={styles.header}>
         <div className={styles.text}>
          <span>Just Dropped</span>
          <h2>New Arrivals</h2>
          <p>Fresh styles just landed — be the first to rock them</p>
        </div>
        <Link to={ROUTE.NEW_ARRIVALS}>Shop New Arrivals<FaAngleRight/></Link>
      </div >
      <div className={styles.container}>
        <ProductGrid products={newProducts.slice(0, 8)} />
      </div>
      </div>
    </section>
    
  </>
);
}

export default Homepage;