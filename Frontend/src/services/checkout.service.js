import axios from "axios";
import { API } from "../constants/api.constants";

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// CREATE ORDER
export const createOrder = (token, data) => {
  return axios.post( `${API.BASE_URL}${API.BASE_ORDER}`,
    data,
    getConfig(token)
  );
};

// USER ORDERS
export const getUserOrders = (token) => {
  return axios.get(`${API.BASE_URL}${API.BASE_ORDER}/user`, 
    getConfig(token)
  );
};

// ALL ORDERS (ADMIN)
export const getAllOrders = (token) => {
  return axios.get(`${API.BASE_URL}${API.BASE_ORDER}`,
    getConfig(token)
  );
};

// UPDATE STATUS (ADMIN)
export const updateOrderStatus = (token, id, orderStatus) => {
  return axios.patch( `${API.BASE_URL}${API.BASE_ORDER}/${id}`,
    { orderStatus },
    getConfig(token)
  );
};

// CANCEL ORDER
export const cancelOrder = (token, id) => {
  return axios.patch( `${API.BASE_URL}${API.BASE_ORDER}/cancel/${id}`,
    {},
    getConfig(token)
  );
};