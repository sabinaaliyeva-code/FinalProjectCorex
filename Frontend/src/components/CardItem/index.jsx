import React, { useContext } from "react";
import styles from "./index.module.scss";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function CartItem({ item }) {
  const { remove, decQuantity, incQuantity } = useContext(CartContext);

  return (
    <div className={styles.cartItem}>
      <div className={styles.productInfo}>
        <img src={item.image} alt={item.title} />
          <div className={styles.productTitle}>
            <h4>{item.title}</h4>
            <p>{item.category}</p>
            <p>Color: <b>{item.selectedColor}</b></p>
            <p>Size: <b>{item.selectedSize}</b></p>
            <button onClick={() =>remove(item._id,item.selectedColor,item.selectedSize)}>Remove</button>
          </div>
      </div>
     <div className={styles.price}>${item.price.toFixed(2)}</div>
     <div className={styles.quantity}>
        <button onClick={() =>decQuantity(item._id,item.selectedColor,item.selectedSize)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() =>incQuantity(item._id,item.selectedColor,item.selectedSize)}>+</button>
     </div>
     <div className={styles.total}>${(item.price * item.quantity).toFixed(2)}</div>
  </div>
  );
}

export default CartItem;