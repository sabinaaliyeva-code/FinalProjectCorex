import { useEffect, useState } from "react";
import { getProductById } from "../services/products.service";



export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        const data = res.data;

        setProduct(data);

        const firstVariant = data.variants?.[0];

        if (firstVariant) {
          setSelectedVariant(firstVariant);

          if (firstVariant.sizes.length > 0) {
            setSelectedSize(firstVariant.sizes[0].size);
          }
        }
      })
      .catch(console.log);
  }, [id]);

  return {
    product,
    selectedVariant,
    selectedSize,
    setSelectedVariant,
    setSelectedSize,
  };
};