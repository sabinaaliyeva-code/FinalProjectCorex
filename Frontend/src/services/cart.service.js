import axios from "axios";
import { API } from "../constants/api.constants";

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// GET CART
export const getCart = (token) => {
    return axios.get(`${API.BASE_URL}${API.CART.BASE}`, getConfig(token));
};

// ADD TO CART
export const addToCart = (token, data) => {
  return axios.post(`${API.BASE_URL}${API.CART.BASE}`, data,getConfig(token)
  );
};

// INCREASE QUANTITY
export const increaseQuantity = (token, productId, data) => {
  return axios.put(`${API.BASE_URL}${API.CART.INCREASE}/${productId}`,data,getConfig(token)
  );
};

// DECREASE QUANTITY
export const decreaseQuantity = (token, productId, data) => {
  return axios.put(`${API.BASE_URL}${API.CART.DECREASE}/${productId}`,data, getConfig(token));
};

// REMOVE FROM CART
export const removeFromCart = (token, productId, data) => {
  return axios.delete(`${API.BASE_URL}${API.CART.BASE}/${productId}`,
    {
      ...getConfig(token),
      data,
    }
  );
};

// CLEAR CART
export const clearCart = (token) => {
  return axios.delete( `${API.BASE_URL}${API.CART.BASE}`,getConfig(token)
  );
};