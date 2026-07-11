import React, { useEffect, useState } from "react";
import ProductGrid from "../../components/ProductGrid";
import Sidebar from "../../components/Sidebar";
import styles from './index.module.scss'
import { getProducts } from "../../services/products.service";
import { getCategories } from "../../services/category.services";
import { useLocation, useSearchParams } from "react-router-dom";
import Header from "../../layouts/Header";
import { ROUTE } from "../../constants/routes.constants";

function Productspage() {
  
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const categoryId = searchParams.get("category");


  


  
  useEffect(() => {

    getCategories()
      .then((res)=> setCategories(res.data))
      .catch(console.log);

  }, []);



  
  useEffect(() => {
     const currentFilters = {
      ...filters,
  };

  if (categoryId) {
    currentFilters.category = categoryId;
  }

  if (location.pathname === ROUTE.NEW_ARRIVALS) {
    currentFilters.newArrival = true;
   
  }

  if (location.pathname === ROUTE.SALE) {
    currentFilters.sale = true;
  }

  if (location.pathname === ROUTE.FEATURED) {
    currentFilters.featured = true;
  }

  if (location.pathname === ROUTE.FEATURED) {
    currentFilters.featured = true;
  }

  getProducts(currentFilters)
    .then((res) => setProducts(res.data))
    .catch(console.log);

}, [filters, categoryId, location.pathname]);



  return (
    <>
      <Header />
      <div className={styles.productsPage}>

        <Sidebar
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          categoryId={categoryId}
        />


        <ProductGrid products={products}/>

      </div>
    </>
  );
}

export default Productspage;