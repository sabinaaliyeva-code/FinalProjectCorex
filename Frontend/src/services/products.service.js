import axios from "axios";
import { API } from "../constants/api.constants";

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