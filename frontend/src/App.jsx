
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { Home } from './Pages/Home';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { LoginSignup } from './Pages/LoginSignup';
import { Cart } from './Pages/Cart';
import { Footer } from './Components/Footer/Footer';
import AddProduct from './AdmiComponents/AddProduct/AddProduct';
import Sidebar from './AdmiComponents/Sidebar/Sidebar';
import Usertype from './Pages/Usertype'
import UploadedProducts from './AdmiComponents/UploadedProd/Uploadedproducts';
import ProductReq from './AdmiComponents/ProductReq/ProductReq'
import UserBookings from './Components/Bookings/Booking';
import UserDetails from './Components/UserDash/UserProfile';
import UserProfilePage from './Components/UserDash/UserDash';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cat1' element={<ShopCategory category="cultural"/>}/>
        <Route path='/cat2' element={<ShopCategory category="wildlife"/>}/>
        <Route path='/cat3' element={<ShopCategory  category="adventure"/>}/>
        <Route path='/cat4' element={<ShopCategory  category="beach"/>}/>
        <Route path='product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/check-usertype' element={<Usertype/>}/>
        <Route path='/sidebar' element={<Sidebar/>}/>
        <Route path='/addproductadmin' element={<AddProduct/>}/>
          <Route path='/uploadedproduct' element={<UploadedProducts/>}/>
          <Route path='/userrequest' element={<ProductReq/>}/>
          <Route path='/bookings' element={<UserBookings/>}/>
          <Route path='/userprof' element={<UserDetails/>}/>
          <Route path='/userdash' element={<UserProfilePage/>}/>
          
          
      
      </Routes>
      <Footer/>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
