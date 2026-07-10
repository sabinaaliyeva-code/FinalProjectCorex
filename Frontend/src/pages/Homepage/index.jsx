import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { API } from '../../constants/api.constants';
import { checkToken } from '../../services/auth.service';
import { getProducts } from '../../services/products.service';


function Homepage() {
    const [data, setData]= useState();
    const { token } = useContext(AuthContext);
    useEffect(()=>{
        if(!token){
            navigate(`${API.LOGIN}`);
        }
        checkToken(token).then((res) => {
            console.log(res.data);
        })
        .catch(() => {
          logout();
          navigate(API.LOGIN);
        });
    }, [token]);

    useEffect(() => {
        
        if (!token) 
            return;
        getProducts(token).then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [token]);
    return (
    <>
    
    </>
    )
}

export default Homepage