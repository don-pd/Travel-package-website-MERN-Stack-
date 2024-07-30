import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} =useContext(ShopContext);
    
    return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className='productdisplay-img-list'>
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay_right-prices">
                <div className="productdisplay-right-price-old">
                    {product.old_price}
                </div>
                <div className="productdispaly-right-price-new">
                    {product.new_price}
                </div>
                <div className="product-right-description">
                    {product.description}
                </div>
          <div></div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO WISHLIST</button>
            <p className='product-dispaly-right-category'>Category : <span></span></p>
            <p className='product-dispaly-right-category'>Tags : <span>popular</span></p>
        </div>
    </div>
  )
}
