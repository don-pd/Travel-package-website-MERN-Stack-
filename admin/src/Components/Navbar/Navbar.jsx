import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/airplane.png' 
import admin from '../../assets/admin.png'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className='nav-logo'/>
        <img src={admin} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar