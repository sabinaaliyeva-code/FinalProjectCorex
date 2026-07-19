import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";

function ProductCard({ product }) {

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants?.[0]?.sizes?.[0]?.size );
  const discount = product.oldPrice > product.price ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const { addToCart } = useContext(CartContext);
  const {wishlist, toggleWishlist } = useContext(WishlistContext);
  const isInWishlist = wishlist.some((item) => item._id === product?._id);
  

  return (
    <section className={styles.productCard}>
        <div className={styles.topSide}>
           <Link to={`/detail/${product._id}`}><img src={selectedVariant.image}alt={product.title}className={styles.image}/></Link>
           <div className={styles.badges}>
              {product.isNewArrival && (<span className={`${styles.badge} ${styles.new}`}>New</span>)}
              {product.isBestSeller && (<span className={`${styles.badge} ${styles.bestSeller}`}>Best Seller</span>)}
              {discount > 0 && (<span className={`${styles.badge} ${styles.sale}`}>-{discount}%</span>)} 
           </div>
           <div className={styles.buttons}>
              <button className={styles.AddBtn} onClick={() => addToCart( product, selectedVariant.color, selectedSize)}><FaShoppingCart/> Add To Cart</button>
              <button className={styles.WishBtn} onClick={() => toggleWishlist(product._id)} >{isInWishlist ? <FaHeart /> : <FaRegHeart />}</button>
           </div>
        </div>
        <div className={styles.bottomSide}>
          <p className={styles.category}>{product.category?.name}</p>
          <h3 className={styles.title}>{product.title}</h3>
          <div className={styles.priceInfo}>
            <p className={styles.price}> ${product.price} </p>
            {product.oldPrice > product.price && (<span className={styles.oldPrice}>${product.oldPrice}</span>)}
          </div>

        {/* COLORS */}
          <div className={styles.colors}>
            {product.variants.map((variant) => (<span key={variant.color}className={`${styles.color} `}
              style={{backgroundColor: variant.hex}}
              title={variant.color}/>))}
          </div>
        
          {/* SIZES */}
          <p className={styles.sizeCount}>{selectedVariant.sizes.length} Sizes Available</p>
           
        </div>
      </section>
  );
}

export default ProductCard;