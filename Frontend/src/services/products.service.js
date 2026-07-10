import axios from "axios";
import { API } from "../constants/api.constants";

export const getProducts = (token) => {
  return axios.get(`${API.BASE_URL}${API.PRODUCTS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};