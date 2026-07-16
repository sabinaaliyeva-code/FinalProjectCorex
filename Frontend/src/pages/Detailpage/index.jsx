import React from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";
import Header from "../../layouts/Header";
import ProductActions from "../../components/ProductActions";
import { useProductDetail } from "../../hooks/useProductDetail";

function Detailpage() {
  const { id } = useParams();
  const {
    product,
    selectedVariant,
    selectedSize,
    setSelectedVariant,
    setSelectedSize,
  } = useProductDetail(id);
  
  if (!product || !selectedVariant) {
    return <h2>Loading...</h2>;
  }
  
  const currentSize = selectedVariant.sizes.find((item) => item.size === Number(selectedSize));
 
  
  return (
    <>
      <Header />

      <section className={styles.detailpage}>
        <div className={styles.leftSide}>
          <img src={selectedVariant.image} alt={product.title} className={styles.productImage}/>
        </div>
        <div className={styles.rightSide}>
          <p className={styles.category}>{product.category?.name}</p>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.stock}>{Number(currentSize?.stock) > 0 ? `Stock: ${currentSize.stock}` : "Out of Stock"}</p>
        <div className={styles.colors}>
          <label htmlFor="color">Color:</label>
          <select id="color" value={selectedVariant.color}
             onChange={(e) => {
                const variant = product.variants.find((item) => item.color === e.target.value );
                setSelectedVariant(variant);
                if (variant.sizes.length > 0) {
                  setSelectedSize(variant.sizes[0].size);
                }
              }}>
              {product.variants.map((variant) => (
                <option key={variant.color} value={variant.color}>
                  {variant.color}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.sizes}>
            <label htmlFor="size">Size:</label>
            <select id="size" value={selectedSize}
              onChange={(e) => setSelectedSize(Number(e.target.value))}>
              {selectedVariant.sizes.map((item) => (<option key={item.size} value={item.size}>{item.size}</option>))}
            </select>
          </div>
          <ProductActions product={product} color={selectedVariant.color}  size={selectedSize}  variant="detail"/>
        </div>
      </section>
    </>
  );
}

export default Detailpage;