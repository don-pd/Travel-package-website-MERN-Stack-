import React from 'react'
import './Offers.css'
import exclusive_image from '../Aaassets/model2.png'

export const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Exclusive</h1>
            <h1>Offers on Top Packages</h1>
            <p>For limited time only</p>
            <button>Check Now</button>
        </div>
        <div className='offers-right'>
            <img src={exclusive_image} alt='' />
        </div>
    </div>
  )
}
