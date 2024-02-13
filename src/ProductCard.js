import axios from "axios";
import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";

export default function ProductCard() {
   
    let[products, setProducts] = useState([])
    let[cart, setCart] = useState([])

      useEffect(()=>{
        axios.get("https://fakestoreapi.com/products").then((res)=>{
            setProducts([...res.data])
        })
      })



      function addToCart(product){
        setCart([...cart, {...product, count:1}])
      }

      function isProductInCart(product){
        var x = cart.find((cp)=>{
            if(cp.title === product.title){
                return true
            }else{
                return false
            }
        })
        return x
      }
      
      function increment(product){
           var temp = cart.map((cp)=>{
             if(cp.title === product.title){
                cp.count = cp.count + 1
             }
             return cp
           })
           setCart([...temp])
      }
        function decrement(product){
            var temp = cart.map((cp)=>{
                if(cp.title === product.title){
                   cp.count = cp.count - 1
                }
                return cp
              })
              setCart([...temp])
        }


        function isProductCount(product){
            var x = cart.find((cp)=>{
                if(cp.title === product.title){
                    return true
                }else{
                    return false
                }
            })
            return x ?x.count : 0
          }



  return (
    <div className="d-flex flex-wrap border border-2 border-danger p-2 w-100">
        
       <div className="w-50">
        {
            products.length>0 && products.map((product, i)=>{
                return <li  className="border border-2 border-danger" key={i}>
                        <img src={product.image} alt="image" width={100} />
                        <div >
                            <h4> {product.title}</h4>
                            <h4> price:{product.price}</h4>
                            {
                              isProductInCart(product) && ( 
                              
                            <>
                              <button onClick={()=>{increment(product)}}> + </button> 
                                {isProductCount(product)}
                              <button onClick={()=>{decrement(product)}}> - </button>  
                       
                              </>

                              )  
                            }
                            {
                                !isProductInCart(product) &&  <button onClick={()=>{addToCart(product)}}> Add To cart </button>
                            }
                            
                            
                        </div>
                </li>
            })
        }
       </div>
        
        <div  className="w-50">
           <CartCard cart={cart}></CartCard>
        </div>
    
    </div>

  );
}
