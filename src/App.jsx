import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import AdminHome from './pages/AdminHome'
import CustomerHome from './pages/CustomerHome'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import ProductManage from './pages/ProductManage'
import UserManage from './pages/UserManage'
import AddProduct from './pages/Product/AddProduct'
import UpdateProduct from './pages/Product/UpdateProduct'
import DeleteProduct from './pages/Product/DeleteProduct'
import SearchProduct from './pages/Product/SearchProduct'


const App = () => {

  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/signIn' element={<SignIn />}/>
        <Route path='/signUp' element={<SignUp />}/>
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/customer' element={<CustomerHome />} />

        <Route path='/pm' element={<ProductManage />} />
        <Route path='/um' element={<UserManage />} />

        <Route path='/addProd' element={<AddProduct />} />
        <Route path='/updateProd' element={<UpdateProduct />} />
        <Route path='/deleteProd' element={<DeleteProduct />} />
        <Route path='/SearchProd' element={<SearchProduct />} />
      </Routes>

    </div>
  )
}

export default App