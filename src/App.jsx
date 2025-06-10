import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Header/Navbar/Navbar.jsx";
import Footer from "./Header/Footer/Footer.jsx";
import Chat from "./ChatBot/Chat.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import './i18n';

// Pages
import Home from "./Components/Pages/Home/Home.jsx";
import Abouts from "./Abouts/Abouts.jsx";
import Blog from "./Blog/Blog.jsx";
import Login from "./Components/Pages/Authentication/Login/Login.jsx";

// Insurance
import Carinsurance from "./Features/product/CarInsurance/CarInsurance.jsx";
import UserData from "./Features/product/CarInsurance/IDV/UserData.jsx";
import User from "./Features/product/CarInsurance/User-Data/User.jsx";
import Bikeinsurance from "./Features/product/Bikeinsurance/Bikeinsurance.jsx";
import Healthinsurance from "./Features/product/Healthinsurance/Healthinsurance.jsx";
import Homeinsurance from "./Features/product/Homeinsurance/Homeinsurance.jsx";
import Autoinsurance from "./Features/product/Autoinsurance/Autoinsurance.jsx";

// Claims
import Intimate from "./Claims/IntimateClaims/Intimate.jsx";
// Footer links
import Faq from "./Features/product/Faq/Faq.jsx";
import Companyinfo from "./Features/product/Companyinfo/Companyinfo.jsx";
import Document from "./Claims/DocumentUpload/Document.jsx";

// Footer Pages
import Termcondition from "./Features/product/Termcondition/Termcondition.jsx";
import Support from "./Features/product/Support/Support.jsx";
import { Privacypolicy } from "./Features/product/Privacypolicy/Privacypolicy.jsx";
import Admin from "./Admin/Admin.jsx";
import Claimprocess from "./Features/product/Claimprocess/Claimprocess.jsx";

// Others
import Policy from "./Policy/Policy.jsx";
import FormPage from "./Form/FormPage.jsx";
import Googletranslation from "./Goggle/Googletranslation.jsx";
import Awards from "./Features/product/Award/Awards.jsx";
// import { Award } from "lucide-react";

// import ScrollToTopButton from "./Reuse/ScrollToTopButton/ScrollToTopButton.jsx";

function App() {
  return (
    <>
      <Googletranslation />
      <Navbar />

      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Abouts />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />

        {/* Insurance Routes */}
        <Route path="/carinsurance" element={<Carinsurance />} />
        <Route path="/user-data" element={<UserData />} />
        <Route path="/user" element={<User />} />
        <Route path="/bikeinsurance" element={<Bikeinsurance />} />
        <Route path="/healthinsurance" element={<Healthinsurance />} />
        <Route path="/homeinsurance" element={<Homeinsurance />} />
        <Route path="/autoinsurance" element={<Autoinsurance />} />

        {/* Footer/Info Routes */}
        <Route path="/faq" element={<Faq />} />
        <Route path="/companyinfo" element={<Companyinfo />} />
        <Route path="/termcondition" element={<Termcondition />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />

        {/* Claims Routes */}
        <Route path="/intimateclaims" element={<Intimate />} />
        <Route path="/documentupload" element={<Document />} />
        <Route path="/claimprocess" element={<Claimprocess />} />


        {/* Award routes */}

   <Route path="/Award" element={<Awards/>}/>
      
        {/* Other Routes */}
        <Route path="/policy" element={<Policy />} />
        <Route path="/formpage" element={<FormPage />} />
      </Routes>
      {/* <ScrollToTopButton /> */}

      <Footer />

      <Chat />
    </>
  );
}

export default App;
