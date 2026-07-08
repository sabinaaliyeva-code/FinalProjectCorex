import react, { useEffect, useState } from "react"
import ProductGrid from "../../components/ProductGrid";
import axios from "axios";
import { getProducts } from "../../services/api";

function Productspage() {

  const [products, setProducts]= useState([]);

  useEffect(()=>{
    getProducts()
    .then((res)=> setProducts(res.data))
    .catch((err) => console.log(err));
  },[]);
  
  
  return <ProductGrid products={products}/>
}

export default Productspage;