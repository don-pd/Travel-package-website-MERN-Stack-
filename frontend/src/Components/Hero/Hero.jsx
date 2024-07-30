import React from 'react'
import './Hero.css'
import plane_icon from '../Aaassets/plane.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from  '../Aaassets/model.png'


export const Hero = () => {
  return (
    <div className='hero'>
    <div className='hero-left'>
        <h2>choose your destination</h2>
        <div>
            <div className='hero-hand-icon'>
                <p>Exciting</p>
                <img src={plane_icon} alt=''/>
            </div>
            <p>trip packages</p>
            
        </div>
        <div className='hero-latest-btn'>
            <div>Latest</div>
            <img src={arrow_icon} alt=''/>
        </div>
    </div>
    <div className='hero-right'>
        <img src={hero_image} alt="" />
    </div>
    </div>
  )
}
