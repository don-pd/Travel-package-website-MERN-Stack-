import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Aaassets/airplane.png';
import cart_icon from '../Aaassets/wishlist.png';
import bookin from '../Assets/dp.png';
import admin from '../Assets/admin.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartItems } = useContext(ShopContext);
  const [Usertype, setUsertype] = useState('');

  useEffect(() => {
    const userType = localStorage.getItem('Usertype');
    setUsertype(userType);
    console.log(Usertype);
  }, []);



  return (
    <div className='navbar'>
      <div className='navlogo'>
        <img src={logo} alt='' />
      </div>
      <div className='navhead'>
        <p>Travel Ally</p>
      </div>
      
      <ul className='nav-menu'>
        <li onClick={() => { setMenu('home') }}>
          <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
          {menu === 'home' ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu('cultural') }}>
          <Link style={{ textDecoration: 'none' }} to='/cat1'>Cultural</Link>
          {menu === 'cultural' ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu('wildlife') }}>
          <Link style={{ textDecoration: 'none' }} to='/cat2'>Wildlife</Link>
          {menu === 'wildlife' ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu('adventure') }}>
          <Link style={{ textDecoration: 'none' }} to='/cat3'>Adventure</Link>
          {menu === 'adventure' ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu('beach') }}>
          <Link style={{ textDecoration: 'none' }} to='/cat4'>Beach</Link>
          {menu === 'beach' ? <hr /> : <></>}
        </li>
      </ul>

      <div className='navlogincart'>
        {localStorage.getItem('auth-token')
          ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
          : <Link to='/login'><button>Login</button></Link>}
        <Link to='/cart'><img src={cart_icon} alt="" />{getTotalCartItems()}</Link>
        <Link to='/userdash'><img src={bookin} alt="" /></Link>
        <Link to='/check-usertype'><img src={admin} alt="" /></Link>
      </div>
    </div>
  );
};
