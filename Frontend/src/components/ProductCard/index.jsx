import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] );
  
  const isInWishlist = wishlist.some((item) => item._id === product._id);


  return (
    <section className={styles.productCard}>
        <div className={styles.topSide}>
          <img src={selectedVariant.image}alt={product.title}className={styles.image}/>
            <div className={styles.buttons}>
            <button className={styles.addToCartBtn} onClick={() =>
            addToCart({
                ...product,
                image: selectedVariant.image,
                selectedColor: selectedVariant.color,
                selectedSize: selectedSize,
                selectedStock: selectedVariant.stock
              })
            }
          >🛒 Add To Cart</button>
         <button className={styles.wishlistBtn} onClick={() => toggleWishlist(product)}>{isInWishlist ? "❤️" : "🤍"}</button>
          </div>
      </div>
     <div className={styles.bottomSide}>
        <Link to={`/detail/${product._id}`}><p>{product.category}</p></Link>
        <h3>{product.title}</h3>
        {/* COLORS */}
        <div className={styles.colors}>
           {product.variants.map((variant) => (<span key={variant.color}className={`${styles.color} ${selectedVariant.color === variant.color ? styles.activeColor : "" }`}
            style={{backgroundColor: variant.hex}}
            title={variant.color} onClick={() => setSelectedVariant(variant)}/>))}
        </div>
        
        {/* SIZES */}
        <div className={styles.sizes}>
           {product.sizes.map((size) => (<button key={size}className={selectedSize === size ? styles.activeSize : ""} onClick={() => setSelectedSize(size)}>{size}</button>))}
        </div>
           <p className={styles.sizeCount}>{product.sizes.length} Sizes Available</p>
           <div className={styles.priceInfo}><p className={styles.price}> ${product.price} </p>
        </div>
        </div>
    </section>
  );
}

export default ProductCard;