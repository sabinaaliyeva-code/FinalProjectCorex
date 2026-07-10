import axios from "axios";
import { API } from "../constants/api.constants";

// LOGIN
export const loginUser = (data) => {
  return axios.post(`${API.BASE_URL}${API.LOGIN}`, data);
};

// REGISTER
export const registerUser = (data) => {
  return axios.post(`${API.BASE_URL}${API.REGISTER}`, data);
};


//TOKEN
export const checkToken = (token) => {
  return axios.get(`${API.BASE_URL}${API.CHECK_TOKEN}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};