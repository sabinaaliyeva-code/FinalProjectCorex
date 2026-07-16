import { useEffect, useState } from "react";
import { getCategories } from "../services/category.services";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(console.log);
  }, []);

  return categories;
};