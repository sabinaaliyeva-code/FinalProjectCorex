import axios from "axios";
import { API } from "../constants/api.constants";

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// GET DASHBOARD
export const getDashboard = (token) => {
  return axios.get(
    `${API.BASE_URL}${API.DASHBOARD}`,
    getConfig(token)
  );
};