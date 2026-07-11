import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; 
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa"; 

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants?.[0]?.sizes?.[0]?.size );

  const discount = product.oldPrice > product.price ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  
  

   
   

  return (
    <section className={styles.productCard}>
        <div className={styles.topSide}>
          <img src={selectedVariant.image}alt={product.title}className={styles.image}/>
           {product.isNewArrival && (<span className={`${styles.badge} ${styles.new}`}>New</span>)}
           {product.isBestSeller && (<span className={`${styles.badge} ${styles.bestSeller}`}>Best Seller</span>)}
           {discount > 0 && (<span className={`${styles.badge} ${styles.sale}`}>-{discount}%</span>
)}
            <div className={styles.buttons}>
            <button className={styles.addToCartBtn} onClick={() => addToCart(product,selectedVariant.color,selectedSize)} ><FaShoppingCart/> Add To Cart</button>
            <button className={styles.wishlistBtn}onClick={() => toggleWishlist(product._id)}>
              {wishlist.some(item => item._id === product._id)? <FaHeart/>: <FaRegHeart/>}
           </button>
          </div>
      </div>
     <div className={styles.bottomSide}>
        <Link to={`/detail/${product._id}`}><p>{product.category?.name}</p></Link>
        <h3>{product.title}</h3>
        {/* COLORS */}
        <div className={styles.colors}>
           {product.variants.map((variant) => (<span key={variant.color}className={`${styles.color} ${selectedVariant.color === variant.color ? styles.activeColor : "" }`}
            style={{backgroundColor: variant.hex}}
            title={variant.color} onClick={() =>{
            setSelectedVariant(variant);
            setSelectedSize(variant.sizes[0].size);
         }}/>))}
        </div>
        
        {/* SIZES */}

        <div className={styles.sizes}>
           {selectedVariant.sizes.map((item) => (<button key={item.size}className={selectedSize === item.size ? styles.activeSize : ""} onClick={() => setSelectedSize(item.size)}>{item.size}</button>))}
        </div>
           <p className={styles.sizeCount}>{selectedVariant.sizes.length} Sizes Available</p>
           <div className={styles.priceInfo}>
            <p className={styles.price}> ${product.price} </p>
            {product.oldPrice > product.price && (<span className={styles.oldPrice}>${product.oldPrice}</span>
  )}

        </div>
        </div>
    </section>
  );
}

export default ProductCard;