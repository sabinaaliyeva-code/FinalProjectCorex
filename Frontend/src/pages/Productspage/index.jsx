import react, { useEffect, useState } from "react"
import ProductGrid from "../../components/ProductGrid";
import axios from "axios";
import { getProducts } from "../../services/products.service";
import Header from "../../layouts/Header";

function Productspage() {

  const [products, setProducts]= useState([]);

  useEffect(()=>{
    getProducts()
    .then((res)=> setProducts(res.data))
    .catch((err) => console.log(err));
  },[]);
  
  
  return <>
       <Header/>
       <ProductGrid products={products}/>
       </>
}

export default Productspage;