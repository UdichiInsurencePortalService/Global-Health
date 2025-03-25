import React from "react";
import Navbar from "./Header/Navbar/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/Home.jsx";
import Login from "./Components/Pages/Authentication/Login/Login.jsx"; // Fixed Import
import Footer from "./Header/Footer/Footer.jsx";
import './App.css'
<<<<<<< HEAD
=======
import CarInsurance from "./Features/product/CarInsurance/CarInsurance.jsx";
>>>>>>> 7ea579c52e0d99b3fc8e42aa54c2b08aa548d893






function App() {
  return (    
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        {/* <Route path="/product" element={<Product />} /> */}
=======
        <Route path="/carinsurance" element={<CarInsurance />} />
>>>>>>> 7ea579c52e0d99b3fc8e42aa54c2b08aa548d893
        <Route path="/login" element={<Login />} /> {/* Fixed */}
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
