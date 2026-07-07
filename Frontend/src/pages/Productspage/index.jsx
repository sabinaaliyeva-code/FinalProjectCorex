import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";

function Productspage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <h2>Featured Products</h2>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product._id} className={styles.card}>
              <img src={product.image} alt={product.title} />

              <h3>{product.title}</h3>

              <p>{product.description}</p>

              <span>${product.price}</span>

              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Productspage;