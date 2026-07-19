import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./index.module.scss";

function OrderDetailModal({ order, closeModal }) {
  if (!order) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Order Details</h2>

          <button onClick={closeModal}>
            <FaTimes />
          </button>
        </div>

        {/* ORDER INFO */}
        <div className={styles.section}>
          <h3>Order Information</h3>

          <table>
            <tbody>
              <tr>
                <td>Order ID</td>
                <td>{order._id}</td>
              </tr>

              <tr>
                <td>Customer</td>
                <td>
                  {order.user?.firstName} {order.user?.lastName}
                </td>
              </tr>

              <tr>
                <td>Email</td>
                <td>{order.user?.email}</td>
              </tr>

              <tr>
                <td>Payment</td>
                <td>{order.paymentStatus}</td>
              </tr>

              <tr>
                <td>Payment Method</td>
                <td>{order.paymentMethod}</td>
              </tr>

              <tr>
                <td>Order Status</td>
                <td>{order.orderStatus}</td>
              </tr>

              <tr>
                <td>Created</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SHIPPING */}
        <div className={styles.section}>
          <h3>Shipping Address</h3>

          <table>
            <tbody>
              <tr>
                <td>Country</td>
                <td>{order.shippingAddress.country}</td>
              </tr>

              <tr>
                <td>City</td>
                <td>{order.shippingAddress.city}</td>
              </tr>

              <tr>
                <td>Address</td>
                <td>{order.shippingAddress.address}</td>
              </tr>

              <tr>
                <td>Postal Code</td>
                <td>{order.shippingAddress.postalCode || "-"}</td>
              </tr>

              <tr>
                <td>Phone</td>
                <td>{order.shippingAddress.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PRODUCTS */}
        <div className={styles.section}>
          <h3>Ordered Products</h3>

          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Color</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt={item.title} />
                  </td>

                  <td>{item.title}</td>

                  <td>{item.color}</td>

                  <td>{item.size}</td>

                  <td>{item.quantity}</td>

                  <td>${item.price}</td>

                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SUMMARY */}
        <div className={styles.section}>
          <h3>Price Summary</h3>

          <table>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>${order.subtotal}</td>
              </tr>

              <tr>
                <td>Shipping</td>
                <td>${order.shippingPrice}</td>
              </tr>

              <tr>
                <td>Discount</td>
                <td>${order.discount}</td>
              </tr>

              <tr>
                <td>
                  <strong>Total</strong>
                </td>

                <td>
                  <strong>${order.totalPrice}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;