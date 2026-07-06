import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

function Homepage() {
    const token = localStorage.getItem('token');
    useEffect(()=>{
        if(!token){
            window.location.href = '/login';
        }
        else{
            axios.get('http://localhost:5000/checkToken',{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }).then((res)=>{
                console.log(res.data);

            }).catch((error)=>{
                console.log(error);
                localStorage.removeItem("token");
                window.location.href = "/login";
            })
        }
    })
  return (
    <>
    
    </>
  )
}

export default Homepage