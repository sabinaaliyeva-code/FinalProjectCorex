import axios from "axios";

const BASE_URL = "http://localhost:5000/products";

export const getProducts = () => axios.get(BASE_URL);