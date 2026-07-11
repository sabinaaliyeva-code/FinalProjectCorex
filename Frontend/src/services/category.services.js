import axios from "axios";
import { API } from "../constants/api.constants";

// GET ALL CATEGORIES
export const getCategories = () => {
  return axios.get(`${API.BASE_URL}${API.CATEGORY}`);
};

// GET CATEGORY BY ID
export const getCategoryById = (id) => {
  return axios.get(`${API.BASE_URL}${API.CATEGORY}/${id}`);
};