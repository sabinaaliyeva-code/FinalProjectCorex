import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";
import Header from "../../layouts/Header";
import { getProductById } from "../../services/products.service";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";


function Detailpage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const { addToCart } = useContext(CartContext);
    const {wishlist, toggleWishlist } = useContext(WishlistContext);
    const isInWishlist = wishlist.some((item) => item._id === product?._id);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await getProductById(id);
          setProduct(res.data);
          setSelectedVariant(res.data.variants[0]);
          setSelectedSize(res.data.variants[0].sizes[0].size);
        } catch (error) {
          console.log(error);
        }
      };

    fetchProduct();
  }, [id]);


    if (!product || !selectedVariant) {
      return <h2>Loading...</h2>;
    }

  
  
  const currentSize = selectedVariant.sizes.find((item) => item.size === Number(selectedSize));
  const discount = product.oldPrice > product.price ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const saving = product.oldPrice > product.price ? Math.round(product.oldPrice - product.price)  : "";
 
  
  return (
    <>
      <Header />
      <section className={styles.detailpage}>
        <div className={styles.leftSide}>
          <img src={selectedVariant.image}alt={product.title}className={styles.productImage}/>
          <div className={styles.badges}>
              {product.isNewArrival && (<span className={`${styles.badge} ${styles.new}`}>New</span>)}
              {product.isBestSeller && (<span className={`${styles.badge} ${styles.bestSeller}`}>Best Seller</span>)}
              {discount > 0 && (<span className={`${styles.badge} ${styles.sale}`}>-{discount}%</span>)} 
          </div>
        </div>
        <div className={styles.rightSide}>
          <p className={styles.category}>{product.category?.name}</p>
          <h2 className={styles.title}>{product.title}</h2>
          <div className={styles.priceInfo}>
             <span className={styles.price}>${product.price}</span>
             <span className={styles.oldPrice}>${product.oldPrice}</span>
             <span className={styles.saving}>Save: ${saving}</span>
          </div>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.colors}>
            <div className={styles.colorName}>Color:<span>{selectedVariant.color}</span> </div>
                     {product.variants.map((variant) => (<span key={variant.color}className={`${styles.color} ${selectedVariant.color === variant.color ? styles.activeColor : "" }`}
                      style={{backgroundColor: variant.hex}}
                      title={variant.color} onClick={() =>{
                      setSelectedVariant(variant);
                      setSelectedSize(variant.sizes[0].size);
                   }}/>))}
            </div>
          <div className={styles.sizes}>
              {selectedVariant.sizes.map((item) => (<button key={item.size}className={selectedSize === item.size ? styles.activeSize : ""} onClick={() => setSelectedSize(item.size)}>{item.size}</button>))}
            </div>
            <div className={styles.buttons}>
              <button className={styles.AddBtn} onClick={() => addToCart( product, selectedVariant.color, selectedSize)}><FaShoppingCart/> Add To Cart</button>
              <button className={styles.WishBtn} onClick={() => toggleWishlist(product._id)} >{isInWishlist ? <FaHeart /> : <FaRegHeart />}</button>
           </div>
        </div>
      </section>
    </>
  );
}

export default Detailpage;