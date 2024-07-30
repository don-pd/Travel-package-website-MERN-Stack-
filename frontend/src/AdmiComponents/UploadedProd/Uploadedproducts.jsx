import React, { useEffect, useState } from 'react';
import cross_icon from '../assets/cross_icon.png'
import './Uploadedproducts.css'

const UploadedProducts = ({ cartItems }) => {
  const [all_product, setAll_Product] = useState([]);
  const [uploadedProducts, setUploadedProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setAll_Product(data))
      .catch((error) => console.error('Error fetching all products:', error));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getuploadedproducts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => setUploadedProducts(data.uploadedProducts))
        .catch((error) => console.error('Error fetching uploaded products:', error));
    }
  }, []);


  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})

    })
  }
    
  return (
    <div className="uploaded-products-container">
      <h1>Your Packages</h1>
      <div className="uploaded-products-list">
        {all_product.map((e) => {
          if (uploadedProducts[e.id] > 0) {
            return (
              <div key={e.id} className="uploaded-product-item">
                <img className="product-image" src={e.image} alt={e.name} />
                <h3>{e.name}</h3>
                <p>Category: {e.category}</p>
                <p>New Price: {e.new_price * uploadedProducts[e.id]}</p>
                <p>Old Price: {e.old_price * uploadedProducts[e.id]}</p>
                <div className="remove-container">
                  <p>Remove:</p>
                  <img onClick={() => remove_product(e.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
  
};

export default UploadedProducts;
