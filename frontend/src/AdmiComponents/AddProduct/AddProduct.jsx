import React, { useState } from 'react'
import upload_area from '../assets/upload_area.svg'
import './AddProduct.css'

const AddProduct = () => {

const[image,setImage] = useState(false);
const[productDetails,setProductDetails] = useState({
  name:"",
  image:"",
  category:"beach",
  new_price:"",
  old_price:"",
  description:""
})

const imageHandler = (e) =>{
    setImage(e.target.files[0]);
}

const changeHandler = (e) =>{
  setProductDetails({...productDetails,[e.target.name]:e.target.value})
}

const Add_Product = async ()=>{
  console.log(productDetails);
  let responseData;
  let product = productDetails;

  let formData = new FormData();
  formData.append('product',image);
  
  await fetch('http://localhost:4000/upload',{
    method:'POST',
    headers:{
      Accept:'application/json',
    },
    body:formData,
  }).then((resp) => resp.json()).then((data)=>{responseData=data});
  
if (responseData.success) {
    product.image = responseData.image_url;
    console.log(product);
    await fetch('http://localhost:4000/addproductagent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(product),
    })
    .then((resp) => resp.json())
    .then((data) => {
        data.success ? alert("Product Added") : alert("Failed to add product");
    })
    .catch((error) => {
        console.error('Error adding product:', error);
        alert("Failed to add product");
    });
  }
}

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name}  onChange={changeHandler} type='text' name='name' placeholder='type here'/>
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='type'/>
            </div>
            <div className="addproduct-itemfield">
            <p>offer price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='type'/>
            </div>
        </div>
        <div className="addproduct-itemfields">
            <p>Product Category</p>
            <select value={productDetails.category} name='category' onChange={changeHandler} className='add-product-selector'>
            <option value='beach'>beach</option>
            <option value='adventure'>adventure</option>
            <option value='wildlife'>wildlife</option>
            <option value='cultural'>cultural</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input'>  
              <img src={image?URL.createObjectURL(image):upload_area} alt="" />
            </label>
            <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
        </div>
        
        <div className="addproduct-itemfield">  
        <p>Description</p>
        <input value={productDetails.description} onChange={changeHandler} type='text' name='description' placeholder='type'/>
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-button'>ADD</button>
    </div>
    
  )
}

export default AddProduct