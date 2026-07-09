import React, { useContext } from "react";
import styles from "./index.module.scss";
import ProductCard from "../../components/ProductCard";
import Header from "../../layouts/Header";
import { WishlistContext } from "../../context/WishlistContext";

function Wishlistpage() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <>
    <Header/>
    <section className={styles.wishlistGrid}>
      <div className={styles.wishlistContainer}>
        {wishlist.map((product) => (<ProductCard key={product._id} product={product}/>))}
      </div>
    </section>
    </>
  );
}

export default Wishlistpage;