import React from "react";
import styles from './index.module.scss'
import { useSearchParams } from "react-router-dom";

function Sidebar({categories,setFilters}){

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const handleCategory = (id)=>{
  
    const params = new URLSearchParams(searchParams);

    if (id) {
      params.set("category", id);
    } else {
      params.delete("category");
    }

  setSearchParams(params);

  };


  return (

  <aside className={styles.sidebar}>
    <h3>Categories</h3>
      <label>
        <input type="radio" name="category" checked={!categoryId}  onChange={() => handleCategory("")}/>
        All Products
      </label>


     {categories.map((category) => (
      <label key={category._id}>
        <input type="radio"  name="category"  checked={categoryId === category._id}onChange={() => handleCategory(category._id)} />
        {category.name}
      </label>
     ))}
     
     <hr/>
     <h3>Status</h3>

    <label>
      <input type="checkbox"  onChange={(e)=> setFilters(prev=>({ ...prev, newArrival:e.target.checked })) }/>
      New Arrival
    </label>
    <label>
      <input  type="checkbox"  onChange={(e)=>  setFilters(prev=>({...prev,featured:e.target.checked  }))}/>
      Featured
    </label>
    <label>
      <input  type="checkbox" onChange={(e)=>  setFilters(prev=>({...prev, bestSeller:e.target.checked }))}/>
      Best Seller
    </label>
    <label>
      <input  type="checkbox"  onChange={(e)=>setFilters(prev=>({ ...prev, sale:e.target.checked  }))}/>
      Sale
    </label>
    <h3>Price</h3>
    <div className={styles.priceFilter}>
    <label>Min Price</label>
    <input type="number"  placeholder="Min"  onChange={(e) =>  setFilters((prev) => ({  ...prev,  minPrice: e.target.value, })) }/>
    <label>Max Price</label>
    <input  type="number"   placeholder="Max"   onChange={(e) =>   setFilters((prev) => ({   ...prev,  maxPrice: e.target.value,  }))  } />
  </div>
</aside>

  );

}

export default Sidebar;