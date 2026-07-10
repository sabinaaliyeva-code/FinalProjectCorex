import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.scss";
import Header from "../../layouts/Header";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function Detailpage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedVariant(res.data.variants[0]);
        setSelectedSize(res.data.sizes[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product || !selectedVariant) {
    return <h2>Loading...</h2>;
  }

  const isInWishlist = wishlist.some((item) => item._id === product._id);
  
  return (
    <>
      <Header />

      <section className={styles.detailpage}>
        <div className={styles.leftSide}>
          <img src={selectedVariant.image} alt={product.title} className={styles.productImage}/>
        </div>
        <div className={styles.rightSide}>
          <p className={styles.category}>{product.category}</p>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.stock}> Stock: {selectedVariant.stock}</p>
        <div className={styles.colors}>
          <label htmlFor="color">Color:</label>
          <select id="color" value={selectedVariant.color}
             onChange={(e) => {
                const variant = product.variants.find((item) => item.color === e.target.value );
                setSelectedVariant(variant);
              }}>
              {product.variants.map((variant) => (
                <option key={variant.color} value={variant.color}>
                  {variant.color}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.sizes}>
            <label htmlFor="size">Size:</label>
            <select id="size" value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}>
              {product.sizes.map((size) => (<option key={size} value={size}>{size}</option>))}
            </select>
          </div>
          <div className={styles.buttons}>
          <button className={styles.addToCart} onClick={() => addToCart(product,selectedVariant.color,selectedSize)} >🛒 Add To Cart</button>
           <button className={styles.wishlistBtn}onClick={() => toggleWishlist(product._id)}>
              {wishlist.some(item => item._id === product._id)? "❤️": "🤍"}
           </button>
          
        </div>
        </div>
      </section>
    </>
  );
}

export default Detailpage;