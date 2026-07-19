import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as orderService from "../services/checkout.service";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL ORDERS (ADMIN)
  const getOrders = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const res = await orderService.getAllOrders(token);

      setOrders(res.data);
    } catch (error) {

      console.log( "GET ORDERS ERROR:", error.response?.data || error.message );
    } finally {
      setLoading(false);
    }
  };

  // GET USER ORDERS
  const getUserOrders = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const res = await orderService.getUserOrders(token);

      return res.data;
    } catch (error) {
      console.log("GET USER ORDERS ERROR:",error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // CREATE ORDER
  const createOrder = async (data) => {
    try {
      if (!token) {
        
        return;
      }

      const res = await orderService.createOrder(token, data);

      await getOrders();

      return res.data;
    } catch (error) {
      console.log("CREATE ORDER ERROR:", error.response?.data || error.message );
    }
  };

  // UPDATE ORDER STATUS
  const updateStatus = async (id, orderStatus) => {
    try {
      if (!token) {
       
        return;
      }

      await orderService.updateOrderStatus( token, id, orderStatus );
      await getOrders();

    } catch (error) { console.log( "UPDATE STATUS ERROR:", error.response?.data || error.message );
    }
  };

  // CANCEL ORDER
  const cancelOrder = async (id) => {
    try {
      if (!token) {
       
        return;
      }

      await orderService.cancelOrder(token, id);
      await getOrders();

    } catch (error) {
      console.log( "CANCEL ORDER ERROR:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getOrders();
    } else {
      setOrders([]);
    }
  }, [token]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        getOrders,
        getUserOrders,
        createOrder,
        updateStatus,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;