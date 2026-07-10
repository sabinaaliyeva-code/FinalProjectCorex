import React, { useContext } from "react";
import styles from "./index.module.scss";
import { CartContext } from "../../context/CartContext";

function CartItem({ item }) {
  const { remove, decQuantity, incQuantity } = useContext(CartContext);

  
  const selectedVariant = item.product.variants.find((variant) => variant.color === item.selectedColor);

  return (
    <div className={styles.cartItem}>
      <div className={styles.productInfo}>
        <img src={selectedVariant?.image} alt={item.product.title}/>
        <div className={styles.productTitle}>
          <h4>{item.product.title}</h4>
          <p>{item.product.category}</p>
          <p>Color: <b>{item.selectedColor}</b></p>
          <p>Size: <b>{item.selectedSize}</b></p>
          <button onClick={() => remove(item.product._id,item.selectedColor,item.selectedSize)}>Remove</button>
        </div>
      </div>
      <div className={styles.price}>${item.product.price.toFixed(2)}</div>
      <div className={styles.quantity}>
        <button onClick={() =>decQuantity(item.product._id,item.selectedColor,item.selectedSize )}>-</button>
        <span>{item.quantity}</span><button onClick={() =>incQuantity(item.product._id,item.selectedColor,item.selectedSize)}>+</button>
      </div>
      <div className={styles.total}>${(item.product.price * item.quantity).toFixed(2)}</div>
    </div>
  );
}

export default CartItem;