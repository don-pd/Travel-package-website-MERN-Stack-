import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { Link } from 'react-router-dom'

export const ListProduct = () => {
  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})

    })
    await fetchInfo();
  }

  return (
   
    <div className='list-product'>
      
      <h1>All Product List</h1>
    <div className="listproduct-format-main">
      <p> products</p>
      <p>Title</p>
      <p>Old price</p>
      <p>New price</p>
      <p>Category</p>
      <p>Agency</p>
      <p>Agent Id</p>
      <p>Remove</p>
    </div>
    <div className="listproduct-allproducts">
      <hr />
    {allproducts.map((product,index)=>{
      return <div key={index} className='listproduct-format-main listproduct-format'>
        <img src={product.image} alt='' className='listproduct-format-main'></img>
        <p>{product.name}</p>
        <p>{product.old_price}</p>
        <p>{product.new_price}</p>
        <p>{product.category}</p>
        <p>{product.agentName}</p>
        <p>{product.agentId}</p>
        <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
        </div>
    })}
    </div>
    </div>
  )
}

export default ListProduct