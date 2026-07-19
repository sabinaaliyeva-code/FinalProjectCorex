import axios from "axios";
import { API } from "../constants/api.constants";

export const getUsers = () => {
  return axios.get(`${API.BASE_URL}${API.USERS}`);
};

export const getUserById = (id) => {
  return axios.get(`${API.BASE_URL}${API.USERS}/${id}`);
};


