import React, { useContext } from "react";
import styles from './index.module.scss'
import { Link,  useNavigate,  useSearchParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductsContext";

function Sidebar({categories, setFilters}){
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  
  const handleCategory = (id) => {
    if (!id) {
      navigate("/products");
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("category", id);
    setSearchParams(params);
  };
  

  return (

    <aside className={styles.sidebar}>
      <h3>Categories</h3>
      <label className={`${styles.categoryItem} ${ !categoryId ? styles.active : ""}`}>
        <div className={styles.categoryInfo} onClick={() => handleCategory("")} >
          <span>All Products</span>
          <input type="radio" name="category" checked={!categoryId} onChange={() => handleCategory("")}/>
        </div>
      </label>
        {categories.map((category) => (
        <label key={category._id} className={`${styles.categoryItem} ${ categoryId === category._id ? styles.active : ""}`}>
         <div className={styles.categoryInfo} onClick={() => handleCategory(category._id)}>
          <span>{category.name}</span>
          <span className={styles.count}>{category.productCount}</span>
        </div>
        <input  type="radio" name="category" checked={categoryId === category._id} onChange={() => handleCategory(category._id)}/>
      </label>
    ))}
     <h3>Quick Filter</h3>
     <div className={styles.menuItems}>
       <Link to="/new-arrivals" className={styles.newArrivals}>New Arrivals</Link>
       <Link to="/sale" className={styles.onSale}>Sale </Link>
     </div>
     <h3>Price Range</h3>
     <div className={styles.priceFilter}>
        <label className={styles.priceItem}>
          <input type="checkbox" onChange={(e) => setFilters((prev) => ({...prev, under100: e.target.checked, })) }/>
          Under $100
        </label>
        <label className={styles.priceItem}>
          <input type="checkbox" onChange={(e) => setFilters((prev) => ({ ...prev, between100And150: e.target.checked,}))}/>
          $100 - $150
        </label>
        <label className={styles.priceItem}>
          <input type="checkbox" onChange={(e) => setFilters((prev) => ({ ...prev, between150And200: e.target.checked, }))}/>
          $150 - $200
        </label>
        <label className={styles.priceItem}>
          <input type="checkbox" onChange={(e) => setFilters((prev) => ({ ...prev, over200: e.target.checked, })) }/>
          $200+
        </label>
      </div>
    </aside>
 );

}

export default Sidebar;