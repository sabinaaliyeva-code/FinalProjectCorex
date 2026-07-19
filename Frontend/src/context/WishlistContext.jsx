import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as wishlistService from "../services/wishlist.service";

export const WishlistContext = createContext();


function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState([]);
  const { token } = useContext(AuthContext);

  // GET WISHLIST
  const getWishlist = async () => {
    try {
      
      const res = await wishlistService.getWishlist(token);
      
      setWishlist(res.data.products || []);

    } catch(error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if(token){
      getWishlist();
    }
  }, []);



  // TOGGLE (ADD / REMOVE)
  const toggleWishlist = async (productId) => {

    try {

       await wishlistService.toggleWishlist(token, productId);
       
       getWishlist();

    }catch(error) {

      console.log(error);
    }

  };



  // CLEAR WISHLIST
  const clearWishlist = async () => {

    try {

      await wishlistService.clearWishlist(token);
      
      await setWishlist([]);

    }catch(error){

      console.log(error);
    }

  };



  const wishlistCount = wishlist.length;



  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        getWishlist,
        toggleWishlist,
        clearWishlist,
        wishlistCount
      }}
    >

      {children}

    </WishlistContext.Provider>
  );
}


export default WishlistProvider;