
import React, { Profiler } from "react";
import Login from "./page/user/Login";
import Register from "./page/user/Register";
import Home from "./page/user/Home";
import ProductDetails from "./page/user/ProductDetails";
import AdminProducts from "./page/admin/AdminProducts";
import AdminLogin from "./page/admin/AdminLogin";
import AdminDashboard from "./page/admin/AdminDashboard";
import AddProduct from "./page/admin/AddProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./page/user/Cart";
import Profile from "./page/user/Profile";
import Checkout from "./page/user/Checkout";
import Success from "./page/user/Success";
import ActiveRentals from "./page/ActiveRentals";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 👤 USER ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin_view" element={<AdminProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/active-rentals" element={<ActiveRentals />}
/>

        {/* 👨‍💼 ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;