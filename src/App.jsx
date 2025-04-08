import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Header/Navbar/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Pages/Home/Home.jsx";
import Login from "./Components/Pages/Authentication/Login/Login.jsx";
import Footer from "./Header/Footer/Footer.jsx";
import "./App.css";
import CarInsurance from "./Features/product/CarInsurance/CarInsurance.jsx";
import Abouts from "./Abouts/Abouts.jsx"; // Make sure this path is correct
import UserData from "./Features/product/CarInsurance/User-Data/UserData.jsx";
import Intimate from "./Claims/IntimateClaims/Intimate.jsx";

function App() {
  return (
    <>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Abouts />} />


        
        {/* <Route path="/product" element={<Product />} /> */}
        <Route path="/carinsurance" element={<CarInsurance />} />
        <Route path="/user-data" element={<UserData/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/intimateclaims" element={<Intimate />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
