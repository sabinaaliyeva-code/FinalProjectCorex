import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as cartService from "../services/cart.service";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const { token } = useContext(AuthContext);

  // GET CART
  const getCart = async () => {
    try {
      const res = await cartService.getCart(token);
      setCart(res.data.items);

    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      if (token) {
        getCart();
      } else {
        setCart([]);
      }
  }, [token]);

  // ADD TO CART
  const addToCart = async (product, selectedColor, selectedSize) => {
    try {
      await cartService.addToCart(token, {
        product: product._id,
        selectedColor,
        selectedSize,
        quantity: 1,
      });

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE
  const remove = async (productId, selectedColor, selectedSize) => {
    try {
      await cartService.removeFromCart(token, productId, {
        selectedColor,
        selectedSize,
      });

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // INCREASE
  const incQuantity = async (productId, selectedColor, selectedSize) => {
    try {
      await cartService.increaseQuantity(token, productId, {
        selectedColor,
        selectedSize,
      });

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // DECREASE
  const decQuantity = async (productId, selectedColor, selectedSize) => {
    try {
      await cartService.decreaseQuantity(token, productId, {
        selectedColor,
        selectedSize,
      });

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // CLEAR CART
  const clearCart = async () => {
    try {
      await cartService.clearCart(token);

      setCart([]);
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL ITEMS
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // TOTAL PRICE
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity,0);

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        addToCart,
        remove,
        incQuantity,
        decQuantity,
        clearCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;