import React, {  useState } from "react";
import ProductGrid from "../../components/ProductGrid";
import Sidebar from "../../components/Sidebar";
import styles from './index.module.scss'
import { useLocation, useSearchParams } from "react-router-dom";
import Header from "../../layouts/Header";
import { ROUTE } from "../../constants/routes.constants";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import HeroPage from "../../components/HeroPage";


function Productspage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const categoryId = searchParams.get("category");
  const products = useProducts(filters,categoryId,location.pathname);
  const categories = useCategories();
  const [sortBy, setSortBy] = useState("");
   

  const filteredProducts = [...products]
  .filter((product) => {
    
    if (filters.under100 && product.price >= 100)

      return false;

    if (filters.between100And150 && (product.price < 100 || product.price > 150))

      return false;

    if (filters.between150And200 && (product.price < 150 || product.price > 200))

      return false;

    if (filters.over200 && product.price < 200) 
      
      return false;

    return true;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.price - b.price;

      case "priceHigh":
        return b.price - a.price;

      case "nameAZ":
        return a.title.localeCompare(b.title);

      case "nameZA":
        return b.title.localeCompare(a.title);

      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);

      default:
        return 0;
    }
  });

  
  
  
  return (
    <>
      <Header />
      <HeroPage/>
      <div className={styles.productsPage}>
        <Sidebar categories={categories} filters={filters} setFilters={setFilters} categoryId={categoryId}/>
       <div className={styles.container}>
        <div className={styles.header}>
         <h2>Showing {filteredProducts.length} products</h2>
         <div className={styles.filter}>
          <p>Sort by:</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} >
            <option value="newest" hidden disabled>Newest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="featured">Featured</option>
            <option value="topRated">Top Rated</option>
          </select> 
          </div>  
        </div>
        <ProductGrid products={filteredProducts}/>
      </div>
    </div>
    </>
  );
}

export default Productspage;