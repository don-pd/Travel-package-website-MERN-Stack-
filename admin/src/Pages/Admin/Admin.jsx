import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route,Routes } from 'react-router-dom'
import ListProduct from '../../Components/ListProduct/ListProduct'
import ReportofBookings from '../../Components/Report/ReprtOfBookings'
import UserList from '../../Components/UserList/UserList'
import AdminApproval from '../../Components/ApproveUser/Approve'
import Uploaded from '../../Components/Report/UploadedProducts'
import Users from '../../Components/Report/Users.'
import Category from '../../Components/Report/CatProducts'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
          <Route path='/listproduct' element={<ListProduct/>}/>
          <Route path='/userlist' element={<UserList/>}/>
          <Route path='/approve' element={<AdminApproval/>}/>
          <Route path='/Breport' element={<ReportofBookings/>}/>
          <Route path='/Ureport' element={<Uploaded/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/category' element={<Category/>}/>
        </Routes>
    </div>
  )
}

export default Admin