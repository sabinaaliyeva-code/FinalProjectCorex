import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import { OrderContext } from "../../context/OrderContext";
import { FaEye } from "react-icons/fa";
import OrderDetailModal from "../../components/AdminOrderDetail";
import AdminSearchBar from "../../components/AdminSeachBar";
import FilterBar from "../../components/Filter";
import AdminHeader from "../../layouts/AdminHeader";

function AdminOrderPage() {
  const {orders, loading, updateStatus}=useContext(OrderContext);
  const [viewOrder, setViewOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
   
    
  return (
    <section>
     <AdminHeader/> 
     <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Items</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Order Status</th>
            <th>Total</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td> {order.user?.firstName} {order.user?.lastName}</td>
              <td>{order.items.length}</td>
              <td>
                <span className={ order.paymentStatus === "Paid" ? styles.paid : order.paymentStatus === "Failed" ? styles.failed : styles.pending}>{order.paymentStatus}</span>
              </td>
              <td>
                <select
                  value={order.orderStatus}
                  onChange={(e) => updateStatus(order._id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
             </td>
              <td>${order.totalPrice}</td>
              <td> {new Date(order.createdAt).toLocaleDateString()}</td>
              <td> <button className={styles.view} onClick={() => { setViewOrder(order); setOpenModal(true);}}><FaEye /></button> </td>
            </tr> 
          ))}
          </tbody>
            </table>
            {openModal && (<OrderDetailModal order={viewOrder} closeModal={() => { setOpenModal(false); setViewOrder(null);}}/> )}
         </div>
    </section>
  );
}

export default AdminOrderPage;