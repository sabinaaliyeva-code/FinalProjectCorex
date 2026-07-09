import React, { createContext, useState } from "react";

export const CartContext = createContext();


function CartProvider({ children }) {

  const [cart, setCart] = useState([]);


  {/* ADD TO CART */}
  const addToCart = (product) => {

  const newProduct = {
    ...product,
    selectedSize: String(product.selectedSize),
    selectedColor: product.selectedColor,
  };


  setCart((prevCart) => {

    const existingProduct = prevCart.find((item) =>item._id === newProduct._id && item.selectedColor === newProduct.selectedColor && String(item.selectedSize) === String(newProduct.selectedSize));


    if(existingProduct) {
      return prevCart.map((item) =>item._id === newProduct._id && item.selectedColor === newProduct.selectedColor && String(item.selectedSize) === String(newProduct.selectedSize) ? {...item, quantity: item.quantity + 1 } : item);
    }


    return [...prevCart,{...newProduct,quantity: 1 }];

  });

};



  {/* REMOVE*/}
  const remove = (id, color, size) => {
     
    setCart((prevCart) =>prevCart.filter((item) =>!(item._id === id && item.selectedColor === color &&item.selectedSize === size )));

  };



   {/* INCREASE */}
  const incQuantity = (id, color, size) => {

    setCart((prevCart) => prevCart.map((item) => item._id === id && item.selectedColor === color && item.selectedSize === size ? { ...item, quantity: item.quantity + 1 } : item));

  };



  {/* DECREASE */}
  const decQuantity = (id, color, size) => {

    setCart((prevCart) =>prevCart.map((item) => item._id === id && item.selectedColor === color && item.selectedSize === size ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1}: item));

  };

  {/* TOTAL ITEMS */}
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);


  {/* TOTAL PRICE*/}
  const totalPrice = cart.reduce((total, item) =>total + item.price * item.quantity, 0);



  {/* CLEAR */}
  const clearCart = () => {
    setCart([]);
  };



  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        remove,
        incQuantity,
        decQuantity,
        cartCount,
        totalPrice,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export default CartProvider;