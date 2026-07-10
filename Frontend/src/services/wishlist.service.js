import axios from "axios";
import { API } from "../constants/api.constants";

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// GET WISHLIST
export const getWishlist = (token) => {
  return axios.get(`${API.BASE_URL}${API.WISHLIST.BASE}`,getConfig(token) );
};

// TOGGLE WISHLIST
export const toggleWishlist = (token, productId) => {
  return axios.post(`${API.BASE_URL}${API.WISHLIST.TOGGLE}`,
    {
      productId,
    },
    getConfig(token)
  );
};

// CLEAR WISHLIST
export const clearWishlist = (token) => {
  return axios.delete(`${API.BASE_URL}${API.WISHLIST.BASE}`,getConfig(token) );
};