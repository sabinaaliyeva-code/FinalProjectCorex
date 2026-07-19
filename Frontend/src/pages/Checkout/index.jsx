import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { createOrder } from "../../services/checkout.service";

function Checkout() {
  const { cart, totalPrice, getCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    country: "",
    city: "",
    address: "",
    postalCode: "",
    phone: "",
    paymentMethod: "Cash",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value, });
  };

  
  const handleOrder = async () => {
    try {
      const data = {
        shippingAddress: {
          country: form.country,
          city: form.city,
          address: form.address,
          postalCode: form.postalCode,
          phone: form.phone,
        },
        paymentMethod: form.paymentMethod,
        
      };

      await createOrder(token, data);
      await getCart();
      alert("Order created successfully!");
      setOpen(false);

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      
      {open && (
        <div  className={styles.overlay}   onClick={() => setOpen(false)}  >
        <div   className={styles.modal}  onClick={(e) => e.stopPropagation()} >
            <h2>Checkout</h2>
            <input   type="text"  name="country" placeholder="Country" value={form.country}  onChange={handleChange}  />
            <input type="text" name="city" placeholder="City"  value={form.city} onChange={handleChange}/>
            <input type="text"  name="address"  placeholder="Address"  value={form.address} onChange={handleChange} />
            <input type="text"  name="postalCode"  placeholder="Postal Code"  value={form.postalCode}  onChange={handleChange} />
            <input  type="text"  name="phone"  placeholder="Phone"  value={form.phone}  onChange={handleChange} />
            <select  name="paymentMethod"  value={form.paymentMethod}  onChange={handleChange} >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
            <div className={styles.buttons}>
              <button onClick={() => setOpen(false)}>Cancel </button>
              <button  onClick={handleOrder}  > Place Order </button>
            </div>
          </div>
        </div>

      )}
    </>
  );
}

export default Checkout;