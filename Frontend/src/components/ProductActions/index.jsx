import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import styles from "./index.module.scss";

function ProductActions({product,color,size,variant = "card",}){
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (<div  className={`${styles.buttons} ${
          variant === "card"
          ? styles.card
          : styles.detail
      }`}
    >
      <button className={`${styles.addToCartBtn} ${
          variant === "card"
            ? styles.cardAddBtn
            : styles.detailAddBtn
        }`}
        onClick={() => addToCart(product, color, size)}
      >
        <FaShoppingCart />
        <span>Add To Cart</span>
      </button>

      <button
        className={`${styles.wishlistBtn} ${
          variant === "card"
            ? styles.cardWishBtn
            : styles.detailWishBtn
        }`}
        onClick={() => toggleWishlist(product._id)}>
        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
}

export default ProductActions;