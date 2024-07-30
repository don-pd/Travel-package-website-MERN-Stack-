import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar'>

<Link to={'/userlist'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
         User List
        </div>
      </Link>
    

      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
         Product List
        </div>
      </Link>

      <Link to={'/approve'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
         Approve
        </div> 
      </Link>

      
      <Link to={'/Breport'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
         Booking report
        </div> 
      </Link>

      <Link to={'/Ureport'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
         Products report
        </div> 
      </Link>

      <Link to={'/users'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
         User report
        </div> 
      </Link>

      <Link to={'/category'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
         categorise
        </div> 
      </Link>

    </div>
  )
}

export default Sidebar