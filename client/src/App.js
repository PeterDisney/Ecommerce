import "./index.css";
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import ViewAllProducts from './views/ViewAllProducts';
import ProductDetails from './views/ProductDetails';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import AdminLogin from './views/AdminLogin';
import AdminOrders from './views/AdminOrders';
import AdminProducts from './views/AdminProducts';
import ProductCreateOne from './views/ProductCreateOne';
import ProductEdit from './views/ProductEdit'
import FilteredProductsList from './views/FilteredProductsList';
import AdminViewOneOrder from "./views/AdminViewOneOrder";
import OrderConfirmation from "./views/OrderConfirmation";
import ProtectedRoute from "./views/ProtectedRoute";
import AdminViewOneProduct from "./views/AdminViewOneProduct";
import AdminRegistration from "./views/AdminRegistration";


function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('cart');
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="h-full">
      <Routes>
        <Route element={<ViewAllProducts />} path='/' />
        <Route element={<ViewAllProducts />} path='/bikes/:type' />
        <Route element={<FilteredProductsList />} path='/products/:type/:name' />
        <Route element={<ProductDetails cart={cart} setCart={setCart} />} path='/products/:id' />
        <Route element={<Cart cart={cart} setCart={setCart} />} path='/cart' />
        <Route element={<Checkout cart={cart} setCart={setCart} />} path='/checkout' />
        <Route element={<OrderConfirmation />} path='/order-confirmation/:id' />
        {/* ADMIN Routes */}
        <Route element={<AdminLogin />} path='/admin' />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute element={AdminOrders} setCart={setCart} />} path='/dashboard/orders' /> 
        <Route element={<ProtectedRoute element={AdminProducts}/>} path='/dashboard/products'/>
        <Route element={<ProtectedRoute element={AdminViewOneProduct}/>} path='/products/show/:id'/>
        <Route element={<ProtectedRoute element={AdminViewOneOrder}/>} path='/orders/show/:id'/>
        <Route element={<ProtectedRoute element={AdminRegistration}/>} path='/admin/registration'/>
        <Route element={<ProtectedRoute element={ProductCreateOne}/>} path='/products/create' />
        <Route element={<ProtectedRoute element={ProductEdit}/>} path='/products/:id/edit' />
      </Routes>
    </div>

  );
}

export default App;
