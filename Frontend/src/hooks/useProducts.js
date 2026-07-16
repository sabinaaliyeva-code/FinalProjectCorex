import { useEffect, useState } from "react";
import { getProducts } from "../services/products.service";
import { ROUTE } from "../constants/routes.constants";


export const useProducts = (
  filters = {},
  categoryId = null,
  pathname = ""
) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const currentFilters = { ...filters };

    if (categoryId) {
      currentFilters.category = categoryId;
    }

    if (pathname === ROUTE.NEW_ARRIVALS) {
      currentFilters.newArrival = true;
    }

    if (pathname === ROUTE.FEATURED) {
      currentFilters.featured = true;
    }

    if (pathname === ROUTE.SALE) {
      currentFilters.sale = true;
    }

    getProducts(currentFilters)
      .then((res) => setProducts(res.data))
      .catch(console.log);

  }, [
    categoryId,
    pathname,
    filters.category,
    filters.featured,
    filters.newArrival,
    filters.bestSeller,
    filters.sale,
    filters.minPrice,
    filters.maxPrice,
  ]);

  return products;
};


