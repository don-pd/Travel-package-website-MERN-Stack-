import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart ,addToCart} = useContext(ShopContext)
   
   
    
    const handleBookNow = async (productName,Number,agentId,agentName) => { // Accept productName as a parameter
        try {
            const response = await fetch('http://localhost:4000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ productName,Number,agentId,agentName }), // Include productName in the request body
            });
            const data = await response.json();
            console.log('Booking successful:',data);
            alert('Booking Successful, waiting for confirmation');
            // Handle success (e.g., show success message, redirect, etc.)
        } catch (error) {
            console.error('Error booking:', error);
            // Handle error (e.g., show error message)
        }
    };


    return (
        <div className='cartitems'>
            
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Individuals</p>
                <p>Add</p>
                <p>Remove</p>
                <p>Total</p>
                <p>Agency</p>
                <p>Booking</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>{e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <button onClick={() => addToCart(e.id)}>+</button>
                               <img
                                    className='cartremove-icon'
                                    src={remove_icon}
                                    onClick={() => { removeFromCart(e.id) }}
                                    alt=""
                                />
                                <p>{e.new_price * cartItems[e.id]}</p>
                                <p>{e.agentName}</p>
                                <button onClick={() => handleBookNow(e.name,cartItems[e.id],e.agentId,e.agentName)}>Book Now</button>
                                
                            </div>
                        </div>
                    );
                }
                return null;
            })} 
                       
                        <hr />
                        <hr /><hr /><hr />
                        <div className="cartitems-total-items">
                            <h3>Total = </h3>
                             {getTotalCartAmount()}
                        </div>
                        <div className="cartitems-down">
                <div className='cartitems-total'>
                   
                    <div>
                    </div>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type='text' placeholder='Enter code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
