import React, { useContext } from 'react'
import styles from './index.module.scss'
import CartItem from '../../components/CardItem'
import { CartContext } from '../../context/CartContext'
import Header from '../../layouts/Header';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants/routes.constants';

function Cartpage() {
  
  const {cart, clearCart}=useContext(CartContext);
   if (cart.length === 0) {
    return (
      <>
      <Header/>
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
      </div>
      </>
    );
  }
  return (
    <>
    <Header/>
    <section className={styles.cartPage}>
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
                    <h2> Total</h2>
                </div>
              </div>
              
              {cart.map((item) => (<CartItem key={item._id}item={item}/>))}
                
            </div>
            {cart.length>0 && <button className={styles.clearCart} onClick={clearCart} >Clear Cart</button>}
          <span>  < Link to ={ROUTE.HOME} className={styles.shopping}> Continue Shoping</Link></span>
    </div>
    </section>
    </>   
  )
  
}

export default Cartpage