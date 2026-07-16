// src/hooks/useProductForm.js

import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductsContext";

export const useProductForm = (product, closeModal) => {
  const { addProduct, updateProduct } = useContext(ProductContext);

  const colorMap = {
    Black: "#000000",
    White: "#FFFFFF",
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Brown: "#8B4513",
    Gray: "#808080",
    Yellow: "#FFFF00",
    Orange: "#FFA500",
    Pink: "#FFC0CB",
    Purple: "#800080",
    Navy: "#000080",
    Beige: "#F5F5DC",
  };

  const initialForm = {
    title: "",
    company: "",
    category: "",
    description: "",
    price: "",
    oldPrice: "",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    variants: [
      {
        color: "",
        hex: "",
        image: "",
        sizes: [
          {
            size: "",
            stock: "",
          },
        ],
      },
    ],
  };

  const [formData, setFormData] = useState(initialForm);
  
  useEffect(() => {
    if (product) {
      setFormData({...product, category: product.category?._id || product.category, });
    }
  }, [product]);
  

  // INPUTS
  const handleChange = (field, value) => {
    setFormData((prev) => ({...prev,[field]: value,
    }));
  };

  // VARIANT
  const handleVariantChange = (variantIndex, field, value) => {
    const updatedVariants = [...formData.variants];

    updatedVariants[variantIndex][field] = value;

    if (field === "color") {
      updatedVariants[variantIndex].hex = colorMap[value] || "";
    }

    setFormData((prev) => ({...prev,variants: updatedVariants }));
  };

  // SIZE
  const handleSizeChange = (variantIndex,sizeIndex,field,value) => {

    const updatedVariants = [...formData.variants];

    updatedVariants[variantIndex].sizes[sizeIndex][field] = value;

    setFormData({...formData,variants: updatedVariants});

  };

  // ADD VARIANT
  const addVariant = () => {
    setFormData((prev) => ({ ...prev,
      variants: [
        ...prev.variants,
        {
          color: "",
          hex: "",
          image: "",
          sizes: [
            {
              size: "",
              stock: "",
            },
          ],
        },
      ],
    }));
  };

  // ADD SIZE
  const addSize = (variantIndex) => {
    const updatedVariants = [...formData.variants];

    updatedVariants[variantIndex].sizes.push({size: "", stock: "", });

    setFormData((prev) => ({...prev, variants: updatedVariants,}));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      if (product) {
        await updateProduct(product._id, formData);

      } else {
        await addProduct(formData);
      }
      setFormData(initialForm);

      if (closeModal) {
        closeModal();
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  return {
    formData,
    handleChange,
    handleVariantChange,
    handleSizeChange,
    addVariant,
    addSize,
    handleSubmit,
  };
};

export default useProductForm