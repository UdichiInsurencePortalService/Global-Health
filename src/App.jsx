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
import UserData from "./Features/product/CarInsurance/IDV/UserData.jsx";
import Intimate from "./Claims/IntimateClaims/Intimate.jsx";
import Blog from "./Blog/Blog.jsx";
import Bikeinsurance from "./Features/product/Bikeinsurance/Bikeinsurance.jsx";
import Healthinsurance from "./Features/product/Healthinsurance/Healthinsurance.jsx";
import  Autoinsurance  from "./Features/product/Autoinsurance/Autoinsurance.jsx";
import User from "./Features/product/CarInsurance/User-Data/User.jsx";

function App() {
  return (
    <>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Abouts />} />
        <Route path="/Blog" element={<Blog />} />


        
        {/* <Route path="/product" element={<Product />} /> */}
        <Route path="/carinsurance" element={<CarInsurance />} />
        <Route path="/user-data" element={<UserData/>}/>
        <Route path="Bikeinsurance" element={<Bikeinsurance />} />
        <Route path="/Healthinsurance" element={<Healthinsurance />} />
        <Route path="/Autoinsurance" element={<Autoinsurance />} />

        <Route path="/login" element={<Login />} />
        <Route path="/intimateclaims" element={<Intimate />} />

        <Route path="/user" element={<User />} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;
