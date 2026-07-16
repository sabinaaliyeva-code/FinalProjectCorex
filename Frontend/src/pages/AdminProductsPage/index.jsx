import React, { useContext, useState } from 'react'
import AdminNavbar from '../../layouts/AdminNavbar';
import AdminProductsTable from '../../components/AdminProductsTable';
import { ProductContext } from '../../context/ProductsContext';
import AdminSearchBar from '../../components/AdminSeachBar';
import FilterBar from '../../components/Filter';
import { sortData } from '../../Utils/Admin.Utils';
import AddEditModal from '../../components/AddEditProduct';
import styles from './index.module.scss';


function AdminProductsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { products, deleteProduct, addProduct,uptadeProduct } = useContext(ProductContext);

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.company.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(search.toLowerCase())
     );
   });

  const sortedProducts = sortData(filteredProducts, sortBy);
 
  return (
    <div className={styles.page}>
      <AdminNavbar />
      <div className={styles.topBar}>
        <div className={styles.left}>
           <AdminSearchBar value={search} onChange={setSearch} placeholder="Search products..."/>
           <FilterBar value={sortBy} onChange={setSortBy}/>
        </div>
        <div className={styles.right}>
           <button className={styles.addBtn} onClick={() => { setEditingProduct(null); setOpenModal(true);}} > Add Product</button>
           {openModal && (<AddEditModal product={editingProduct} closeModal={() => { setOpenModal(false); setEditingProduct(null);}}/>)}
        </div>
      </div>
      <AdminProductsTable  deleteProduct={deleteProduct} products={sortedProducts}
       onEdit={(product) => { setEditingProduct(product);  setOpenModal(true); }}/>
    </div>
  )
}

export default AdminProductsPage