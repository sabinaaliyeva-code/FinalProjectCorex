import React, { useContext } from "react";
import styles from "./index.module.scss";
import { CartContext } from "../../context/CartContext";
import Header from "../../layouts/Header";
import Checkout from "../../components/Checkout";
import EmptyCart from "../../components/EmptyCart";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constants/routes.constants";
import { FaArrowRight, FaMinus, FaPlus, FaRemoveFormat, FaTimes, FaTrash } from "react-icons/fa";


function Cartpage() {
  
  const { cart, clearCart } = useContext(CartContext);

  return (
    <>
      <Header />
      <section className={styles.cartPage}>
        {
          cart.length === 0 ? (<EmptyCart />) : (
            <>
              <div className={styles.leftSide}>
                <div className={styles.cartContainer}>
                  <div className={styles.titleRow}>
                    <div className={styles.titleColumn}>
                      <h3>Product</h3>
                    </div>
                    <div className={styles.titleColumn}>
                      <h3>Price</h3>
                    </div>
                    <div className={styles.titleColumn}>
                      <h3>Quantity</h3>
                    </div>
                    <div className={styles.titleColumn}>
                      <h3>Total</h3>
                    </div>
                  </div>
                  {
                    cart.map((item)=>{
                      
                        const { remove, decQuantity, incQuantity } = useContext(CartContext);
                        const selectedVariant = item.product.variants.find((variant) => variant.color === item.selectedColor);
                        
                        return(
                            <div className={styles.cartItem}>
                              <div className={styles.productInfo}>
                                <img src={selectedVariant?.image} alt={item.product.title}/>
                                  <div className={styles.productTitle}>
                                      <h4><Link to={ROUTE.DETAIL}>{item.product.title}<FaArrowRight/></Link></h4>
                                      <p>{item.product.category?.name}</p>
                                      <p>Color: <b>{item.selectedColor}</b></p>
                                      <p>Size: <b>{item.selectedSize}</b></p>
                                  </div>
                               </div>
                            <div className={styles.price}>${item.product.price.toFixed(2)}</div>
                            <div className={styles.quantity}>
                                <button onClick={() =>decQuantity(item.product._id,item.selectedColor,item.selectedSize )}><FaMinus/></button>
                                <span>{item.quantity}</span><button onClick={() =>incQuantity(item.product._id,item.selectedColor,item.selectedSize)}><FaPlus/></button>
                            </div>
                            <div className={styles.total}>${(item.product.price * item.quantity).toFixed(2)}</div>
                            <button onClick={() => remove(item.product._id,item.selectedColor,item.selectedSize)} className={styles.removeBtn}><FaTimes/></button>
                        </div>
                      )
                    })
                  }
                </div>
                <div className={styles.buttons}>
                    <button className={styles.continueShopBtn}><Link to={ROUTE.PRODUCT}>Continue Shopping</Link></button>
                    <button className={styles.clearCartBtn}  onClick={() => {
                          if(window.confirm("Are you sure you want to clear your cart?")){clearCart();}}}>
                          Clear Cart 
                    </button>
                </div>
              </div>
              <div className={styles.rightSide}><Checkout /></div>
            </>
          )
        }
      </section>
    </>
  );
}

export default Cartpage;