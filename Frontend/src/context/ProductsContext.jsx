import React, { createContext,  useContext,  useEffect,  useState } from "react";
import * as productService from "../services/products.service";
import { AuthContext } from "./AuthContext";
export const ProductContext = createContext();
function ProductProvider({ children }) {

  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  //  GET ALL PRODUCTS 

  const getProducts = async () => {
    try {

      setLoading(true);
      const res = await productService.getProducts();
      setProducts(res.data);
    } catch (error) {

      console.log("GET PRODUCTS ERROR:", error.response?.data || error.message );

    } finally {

      setLoading(false);

    }
  };

  //  GET PRODUCT BY ID 

  const getProductById = async (id) => {

    try {

      const res = await productService.getProductById(id);

      return res.data;

    } catch(error){

      console.log("GET PRODUCT BY ID ERROR:",error.response?.data || error.message);

    }

  };

  //  ADD PRODUCT 

  const addProduct = async (data) => {

    try {

      if(!token){
        console.log("Token yoxdur");
        return;
      }

      const res = await productService.createProduct( token, data);

      console.log("PRODUCT CREATED:",res.data);

      await getProducts();

    } catch(error){

      console.log( "ADD PRODUCT ERROR:", error.response?.data || error.message);

    }

  };

  //  UPDATE PRODUCT 

  const updateProduct = async (id, data) => {

    try {

      if(!token){
        console.log("Token yoxdur");
        return;
      }

      await productService.updateProduct( token, id, data );

      await getProducts();

    } catch(error){

      console.log("UPDATE PRODUCT ERROR:", error.response?.data || error.message);

    }

  };



  //  DELETE PRODUCT 

  const deleteProduct = async (id) => {

    try {

      if(!token){
        console.log("Token yoxdur");
        return;
      }

      await productService.deleteProduct(token,id);

      await getProducts();
      
    } catch(error){

      console.log("DELETE PRODUCT ERROR:",error.response?.data || error.message);
    }

  };

   const deleteVariant = async ( productId,variantId,sizeId) => {
        try {
          await productService.deleteVariant( token, productId, variantId, sizeId);

          getProducts();

        } catch (error) {
          console.log(error);
        }
};



  //  LOAD PRODUCTS 

  useEffect(()=>{

    getProducts();

  },[]);

  return (

    <ProductContext.Provider
      value={{

        products,
        loading,
        getProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteVariant

      }}
    >

      {children}

    </ProductContext.Provider>

  );

  

}


export default ProductProvider;