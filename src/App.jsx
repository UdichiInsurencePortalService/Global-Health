import React from "react";
import Navbar from "./Header/Navbar/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/Home.jsx";
import Product from "./Components/Pages/Product/Product.jsx";
import Login from "./Components/Pages/Authentication/Login/Login.jsx"; // Fixed Import
import Footer from "./Header/Footer/Footer.jsx";






function App() {
  return (    
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} /> {/* Fixed */}
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
