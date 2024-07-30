import React, { useEffect, useState }  from 'react'
import './Relatedproducts.css'
import Item from '../Item/Item'

export const Relatedproduct = () => {



    const [relatedProducts,setrelatedProducts] = useState([]);
  
    useEffect(()=>{
      fetch('http://localhost:4000/newcollections')
      .then((response)=>response.json())
      .then((data)=>setrelatedProducts(data));
    },[])
     


  return (
    <div className='related products'>
    <h1>Related</h1>
    <hr/>
    <div className='relatedproduct-item'>
        {relatedProducts.map((item,i)=>{
            return<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
    </div>
    </div>
  )
}
