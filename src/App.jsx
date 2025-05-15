import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Header/Navbar/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Pages/Home/Home.jsx";
import Login from "./Components/Pages/Authentication/Login/Login.jsx";
import Footer from "./Header/Footer/Footer.jsx";
import "./App.css";
import Abouts from "./Abouts/Abouts.jsx"; 
import UserData from "./Features/product/CarInsurance/IDV/UserData.jsx";
import Intimate from "./Claims/IntimateClaims/Intimate.jsx";
import Blog from "./Blog/Blog.jsx";
import Bikeinsurance from "./Features/product/Bikeinsurance/Bikeinsurance.jsx";
import Healthinsurance from "./Features/product/Healthinsurance/Healthinsurance.jsx";
import Homeinsurance from "./Features/product/Homeinsurance/Homeinsurance.jsx";

//footer links
 import Faq from "./Features/product/Faq/Faq.jsx";
 import Companyinfo from "./Features/product/Companyinfo/Companyinfo.jsx"


import  Autoinsurance  from "./Features/product/Autoinsurance/Autoinsurance.jsx";
import User from "./Features/product/CarInsurance/User-Data/User.jsx";
import Carinsurance from "./Features/product/CarInsurance/CarInsurance.jsx";
import Document from "./Claims/DocumentUpload/Document.jsx";
import Policy from "./Policy/Policy.jsx";
import FormPage from "./Form/FormPage.jsx";
import Chat from "./ChatBot/Chat.jsx";
import Termcondition from "./Features/product/Termcondition/Termcondition.jsx";
import Support from "./Features/product/Support/Support.jsx";
import { Privacypolicy } from "./Features/product/Privacypolicy/Privacypolicy.jsx";



function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Abouts />} />
        <Route path="/Blog" element={<Blog />} />
        
        <Route path="/carinsurance" element={<Carinsurance />} />
        <Route path="/user-data" element={<UserData/>}/>
        <Route path="/Bikeinsurance" element={<Bikeinsurance />} />
        <Route path="/Healthinsurance" element={<Healthinsurance />} />
        <Route path="/Autoinsurance" element={<Autoinsurance />} />
        <Route path="/Homeinsurance" element={<Homeinsurance />} />

        <Route path="/faq" element={<Faq />} />
        <Route path="/companyinfo" element={<Companyinfo />} />
        {/* <Route path="/privacypolicy" element={<Privacypolicy/>} /> */}
        
        <Route path="/termcondition" element={<Termcondition/>} />
        <Route path="/support" element={<Support/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/intimateclaims" element={<Intimate />} />
        <Route path="/documentupload" element={<Document/>}/>
        <Route path="/policy" element={<Policy/>}/>

        <Route path="/user" element={<User />} />
        <Route path="/formpage" element={<FormPage/>}/>
      </Routes>
      
      <Footer />
      <Chat/>
    </>
  );
}

export default App;