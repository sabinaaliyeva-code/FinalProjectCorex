import React, { useContext, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext';
import AdminSearchBar from '../../components/AdminSeachBar';
import FilterBar from '../../components/Filter';
import { sortData } from '../../Utils/Admin.Utils';
import AddEditModal from '../../components/AddEditProduct';
import styles from './index.module.scss';
import ProductDetailModal from '../../components/AdminProductDetail';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import AdminHeader from '../../layouts/AdminHeader';


function AdminProductsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { products, deleteProduct } = useContext(ProductContext);
  const [viewProduct, setViewProduct] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  


  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.company.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(search.toLowerCase())
     );
   });

  const getTotalStock = (variants) => {
     return variants?.reduce((total, variant) =>
      total +variant.sizes.reduce((sum, size) => sum + Number(size.stock),0), 0);
  };

  const sortedProducts = sortData(filteredProducts, sortBy);
 
  return (
    <div className={styles.page}>
      <AdminHeader />
      <div className={styles.topBar}>
        <div className={styles.left}>
           <AdminSearchBar value={search} onChange={setSearch} placeholder="Search products..."/>
           <FilterBar value={sortBy} onChange={setSortBy}/>
        </div>
        <div className={styles.right}>
           <button className={styles.addBtn} onClick={() => { setEditingProduct(null); setOpenModal(true);}} > Add Product</button>
        </div>
      </div>
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
                {sortedProducts.map((product) => (
                  <tr key={product._id}>
                    <td><img src={product.variants?.[0]?.image} alt={product.title}/></td>
                    <td>{product.title}</td>
                    <td>{product.company}</td>
                    <td>{product.category?.name}</td>
                    <td>${product.price}</td>
                    <td>{getTotalStock(product.variants)}</td>
                    <td>
                       <div className={styles.status}>
                          {product.isFeatured && (<span className={styles.featured}>Featured</span>)}
                          {product.isBestSeller && (<span className={styles.bestSeller}>Best Seller</span>)}
                          {product.isNewArrival && ( <span className={styles.newArrival}>New Arrival</span>)}
                          {product.oldPrice > product.price && (<span className={styles.sale}>Sale</span>)}
                          {!product.isFeatured && !product.isBestSeller && !product.isNewArrival && !(product.oldPrice > product.price) && (<span className={styles.none}>-</span>)}
                       </div>
                    </td>
                    <td className={styles.actions}>
                    <button className={styles.view} onClick={() => {setViewProduct(product); setOpenViewModal(true)}}><FaEye /></button>
                    <button className={styles.edit} onClick={() => {setEditingProduct(product); setOpenModal(true)}}><FaEdit /></button>
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
          </div>
       {openViewModal && ( <ProductDetailModal product={viewProduct} closeModal={() => { setOpenViewModal(false); setViewProduct(null); }}/>)}
       {openModal && (<AddEditModal product={editingProduct} closeModal={() => { setOpenModal(false); setEditingProduct(null);}}/>)}      
    </div>
  )
}

export default AdminProductsPage