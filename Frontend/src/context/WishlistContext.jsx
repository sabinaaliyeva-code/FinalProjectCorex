import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

//Toggle Wishlist
function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
  setWishlist((prevWishlist) => {
    const exist = prevWishlist.find((item) => item._id === product._id);

    if (exist) {
      return prevWishlist.filter((item) => item._id !== product._id);
    }

    return [...prevWishlist, product];
  });
};



  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider 
    value={{
      wishlist,
      toggleWishlist,
      }}
    >
      
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;