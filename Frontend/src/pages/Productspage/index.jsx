import React, {  useState } from "react";
import ProductGrid from "../../components/ProductGrid";
import Sidebar from "../../components/Sidebar";
import styles from './index.module.scss'
import { useLocation, useSearchParams } from "react-router-dom";
import Header from "../../layouts/Header";
import { ROUTE } from "../../constants/routes.constants";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

function Productspage() {
  
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const categoryId = searchParams.get("category");
  const products = useProducts(filters,categoryId,location.pathname);
  const categories = useCategories();
  
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