import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./index.module.scss";

function ProductDetailModal({ product, closeModal }) {
  if (!product) return null;

  const totalStock =
    product.variants?.reduce(
      (total, variant) =>
        total +
        variant.sizes.reduce(
          (sum, size) => sum + Number(size.stock),
          0
        ),
      0
    ) || 0;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Product Details</h2>
          <button onClick={closeModal}><FaTimes /></button>
        </div>
        <div className={styles.section}>
          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{product.title}</td>
              </tr>
              <tr>
                <th>Brand</th>
                <td>{product.company}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{product.category?.name}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>${product.price}</td>
              </tr>
              <tr>
                <th>Old Price</th>
                <td>{product.oldPrice || "-"}</td>
              </tr>
              <tr>
                <th>Total Stock</th>
                <td>{totalStock}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{product.description}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                   <div className={styles.status}>
                    {product.isFeatured && (<span className={styles.featured}>Featured</span>)}
                    {product.isBestSeller && (<span className={styles.bestSeller}>Best Seller</span>)}
                    {product.isNewArrival && ( <span className={styles.newArrival}>New Arrival</span>)}
                    {product.oldPrice > product.price && (<span className={styles.sale}>Sale</span>)}
                    {!product.isFeatured && !product.isBestSeller && !product.isNewArrival && !(product.oldPrice > product.price) && (<span className={styles.none}>-</span>)}
                   </div> 
                </td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Updated At</th>
                <td>{new Date(product.updatedAt).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.section}>
          <h3>Variants</h3>
          <table className={styles.variantTable}>
            <thead>
              <tr>
                <th>Color</th>
                <th>Image</th>
                <th>Size</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {product.variants.map((variant) =>
                variant.sizes.map((size) => (
                  <tr key={`${variant.color}-${size.size}`}>
                    <td>{variant.color}</td>
                    <td> <img src={variant.image} alt={variant.color}/></td>
                    <td>{size.size}</td>
                    <td>{Number(size.stock) > 0 ? `${size.stock}`  : "Out of Stock"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;