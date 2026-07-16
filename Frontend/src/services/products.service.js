import axios from "axios";
import { API } from "../constants/api.constants";


const getConfig= (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getProducts = (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.category) {
    params.append("category", filters.category);
  }

  if (filters.newArrival) {
    params.append("newArrival", "true");
  }

  if (filters.featured) {
    params.append("featured", "true");
  }

  if (filters.bestSeller) {
    params.append("bestSeller", "true");
  }

  if (filters.sale) {
    params.append("sale", "true");
  }

  if (filters.minPrice) {
    params.append("minPrice", filters.minPrice);
  }

  if (filters.maxPrice) {
    params.append("maxPrice", filters.maxPrice);
  }

  console.log(params.toString());

  return axios.get(`${API.BASE_URL}${API.PRODUCTS}?${params.toString()}`);
};

// GET PRODUCT BY ID
export const getProductById = (id) => {
  return axios.get(`${API.BASE_URL}${API.PRODUCTS}/${id}`);
};

export const createProduct = (token, data) => {
  return axios.post(
    `${API.BASE_URL}${API.PRODUCTS}`,
    data,
    getConfig(token)
    
  );
};

// UPDATE
export const updateProduct = (token, id, data) => {
   console.log(`${API.BASE_URL}${API.PRODUCTS}/${id}`);
  return axios.patch(
    `${API.BASE_URL}${API.PRODUCTS}/${id}`,
    data,
    getConfig(token)

    
  );
  
};

// DELETE
export const deleteProduct = (token, id) => {
  return axios.delete(
    `${API.BASE_URL}${API.PRODUCTS}/${id}`,
    getConfig(token)
  );
};






