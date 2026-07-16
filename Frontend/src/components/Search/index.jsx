import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

function Search() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const products=useProducts();

  const filteredProducts = products.filter((item) =>item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={styles.search}>
      <button onClick={() => setOpen(!open)}><FaSearch /></button>

      {open && (
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}/>

          <div className={styles.results}>
            {filteredProducts.map((item) => (
              <Link key={item._id} to={`/detail/${item._id}`} >
                <img src={item.variants[0].image} alt={item.title}/>
                  <div>
                    <h4>{item.title}</h4>
                    <p>${item.price}</p>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;