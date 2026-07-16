import React, { useState } from "react";
import styles from "./index.module.scss";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";


function AdminProductsTable({products, deleteProduct, onEdit}){

  const getTotalStock = (variants) => {
    return variants?.reduce((total, variant) =>
      total +variant.sizes.reduce((sum, size) => sum + Number(size.stock),0), 0);
  };

  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div className={styles.tableBox}>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Total Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td><img src={product.variants?.[0]?.image} alt={product.title}/></td>
              <td>{product.title}</td>
              <td>{product.company}</td>
              <td>{product.category?.name}</td>
              <td>${product.price}</td>
              <td>{getTotalStock(product.variants)}</td>
              <td>
                {product.isFeatured && <span>Featured </span>}
                {product.isBestSeller && <span>Best Seller </span>}
                {product.isNewArrival && <span>New</span>}
              </td>
              <td className={styles.actions}>
              <button className={styles.view} onClick={() => console.log(product)}><FaEye /></button>
              <button className={styles.edit} onClick={() => onEdit(product)}><FaEdit /></button>
                <button className={styles.delete}
                  onClick={() => {
                    if ( window.confirm( "Are you sure you want to delete this product?")) {
                      deleteProduct(product._id);
                    }
                  }}
                ><FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openModal && (<AddEditModal product={editingProduct} closeModal={() => { setOpenModal(false); setEditingProduct(null); }}/>)}   
    </div>
  );
}

export default AdminProductsTable;