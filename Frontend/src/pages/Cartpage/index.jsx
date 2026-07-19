import React, { useContext } from "react";
import styles from "./index.module.scss";
import { CartContext } from "../../context/CartContext";
import Header from "../../layouts/Header";
import EmptyCart from "../../components/EmptyCart";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constants/routes.constants";
import { FaArrowRight, FaMinus, FaPlus, FaRemoveFormat, FaTimes, FaTrash } from "react-icons/fa";


function Cartpage() {
  
  const { remove, decQuantity, incQuantity } = useContext(CartContext);
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const subtotal = totalPrice;
  const shipping = subtotal >= 200 ? 0 : 10;
  const discount = 0;
  const total = subtotal + shipping - discount;

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
                    cart.filter(item => item.product !== null).map((item)=>{
                        const selectedVariant = item.product?.variants.find((variant) => variant?.color === item?.selectedColor);
                        return(
                            <div className={styles.cartItem}  key={`${item?.product._id}-${item?.selectedColor}-${item?.selectedSize}`}>
                              <div className={styles.productInfo}>
                                <img src={selectedVariant?.image} alt={item?.product.title}/>
                                  <div className={styles.productTitle}>
                                      <h4><Link to={ROUTE.DETAIL}>{item.product.title}<FaArrowRight/></Link></h4>
                                      <p>{item.product.category?.name}</p>
                                      <p>Color: <b>{item.selectedColor}</b></p>
                                      <p>Size: <b>{item.selectedSize}</b></p>
                                  </div>
                               </div>
                            <div className={styles.price}>${item.product.price.toFixed(2)}</div>
                            <div className={styles.quantity}>
                                <button onClick={() =>decQuantity(item?.product._id,item?.selectedColor,item?.selectedSize )}><FaMinus/></button>
                                <span>{item?.quantity}</span><button onClick={() =>incQuantity(item?.product._id,item?.selectedColor,item?.selectedSize)}><FaPlus/></button>
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
              <div className={styles.rightSide}>
                <div className={styles.summary}>
                    <h2>Order Summary</h2>
                      <div className={styles.row}>
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className={styles.row}>
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                      </div>
                      <div className={styles.row}>
                        <span>Discount</span>
                        <span>${discount}</span>
                      </div>
                      <div className={styles.total}>
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                      <button className={styles.checkoutBtn}  onClick={() => setOpen(true)}   disabled={cart.length === 0}  >
                        Proceed To Checkout
                      </button>
                  </div>
                </div>
            </>
          )
        }
      </section>
    </>
  );
}

export default Cartpage;