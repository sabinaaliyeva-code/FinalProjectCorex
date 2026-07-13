import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { ROUTE } from "../../constants/routes.constants";

function EmptyCart() {
  return (
    <section className={styles.emptyCart}>
      <div className={styles.icon}><FaShoppingBag /></div>
      <h2>Your cart is empty</h2>
      <p>
        Looks like you haven't added anything to your cart yet.
        Start shopping and find something you love.
      </p>
      <Link to={ROUTE.PRODUCT}>Continue Shopping</Link>
    </section>
  );
}

export default EmptyCart;