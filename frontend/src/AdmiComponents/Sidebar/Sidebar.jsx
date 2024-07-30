import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/uploadedproduct'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item'>
          Packages
        </div>
      </Link>

      <Link to={'/addproductadmin'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item'>
          Add Package
        </div>
      </Link>

      <Link to={'/userrequest'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item'>
          User Requests
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
