import React from "react"
import Navbar from "./Header/Navbar/Navbar.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/Home.jsx";
import Product from "./Components/Pages/Product/Product.jsx";



function App() {

  return (
    <>
<Navbar/>
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path="/product" element={<Product/>}/>
</Routes>
    </>
  )
}

export default App
