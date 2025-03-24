import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Drawer, Form, Input, Row, Col, Button } from "antd";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../errortoast";

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem("loggedInUser") || "");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const timeout = 2000; // Define timeout duration for logout

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const sendEmail = (values) => {
    emailjs
      .send("service_la8diqr", "template_qhn3bt3", values, "_CVqq1nmrbE6BhO0x")
      .then(() => {
        console.log("SUCCESS!");
        onClose();
      })
      .catch((error) => {
        console.log("FAILED...", error.text);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    handleSuccess('user Logout')
    localStorage.removeItem("token");
    setUsername("");
    setTimeout(() => {
      navigate('/login');
    }, timeout);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("loggedInUser") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <header className="header">
        <div className="topbar" style={{ backgroundColor: "rgb(172, 57, 19)", color: "white" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-5 col-12">
                <ul className="top-link" style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0, margin: 0 }}>
                  <li><Link to="#" style={{ color: "white", textDecoration: "none" }}>About</Link></li>
                  <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Blogs</Link></li>
                  <li><Link to="#" style={{ color: "white", textDecoration: "none" }}>FAQ</Link></li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-7 col-12">
                <ul className="top-contact" style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ color: "white" }}>
                    <i className="fa fa-phone" style={{ marginRight: "5px" }}></i> 9205401500
                  </li>
                  <li style={{ color: "white" }}>
                    <i className="fa fa-envelope" style={{ marginRight: "5px", color: "white" }}></i>
                    <Link to="mailto:globalhealth235@gmail.com" style={{ color: "white", textDecoration: "none" }}>
                      globalhealth235@gmail.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header-inner"
          style={{
            position: "sticky",
            top: "0",
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease-in-out",
            width: "100%",
          }}
        >
          <div className="container">
            <div className="inner">
              <div className="row align-items-center">
                <div className="col-lg-4 col-md-3 col-12">
                  <div className="logo">
                    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={logo}
                        alt="Logo"
                        className="img-fluid"
                        style={{ maxHeight: "150px", width: "auto", objectFit: "contain", position: "absolute" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 col-md-9 col-12">
                  <div className="main-menu">
                    <nav className="navigation">
                      <ul className="nav menu" style={{ display: "flex", gap: "20px", listStyle: "none", padding: 0, margin: 0 }}>
                        <li className="active">
                          <Link to="/" style={{ textDecoration: "none" }}>Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                          <Link to="#" className="nav-link">Product</Link>
                          <ul className="dropdown" style={{ display: "flex", minWidth: "400px", padding: "10px" }}>
                            <li style={{ flex: 1, listStyle: "none" }}>
                              <h2 className="dropdown-header">Individual Insurance</h2>
                              <ul className="list-unstyled">
                                <li><Link to="/product/car-insurance" className="dropdown-item">Car Insurance</Link></li>
                                <li><Link to="/product/life-insurance" className="dropdown-item">Life Insurance</Link></li>
                                <li><Link to="/product/health-insurance" className="dropdown-item">Health Insurance</Link></li>
                                <li><Link to="/product/auto-insurance" className="dropdown-item">Auto Insurance</Link></li>
                                <li><Link to="/product/home-insurance" className="dropdown-item">Home Insurance</Link></li>
                              </ul>
                            </li>
                            <li style={{ flex: 1, listStyle: "none" }}>
                              <h2 className="dropdown-header">Business Insurance</h2>
                              <ul className="list-unstyled">
                                <li><Link to="/product/commercial-insurance" className="dropdown-item">Commercial Insurance</Link></li>
                                <li><Link to="/product/liability-insurance" className="dropdown-item">Liability Insurance</Link></li>
                                <li><Link to="/product/property-insurance" className="dropdown-item">Property Insurance</Link></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li><Link to="#" style={{ textDecoration: "none" }}>Policy</Link></li>
                        <li><Link to="#" style={{ textDecoration: "none" }}>Claims</Link></li>
                        <li><Link to="/" style={{ textDecoration: "none" }} onClick={showDrawer}>Contact Us</Link></li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-lg-2 col-12">
                  <div className="get-quote">
                    {username ? (
                      <button onClick={handleLogout} className="logout-btn">
                        Log Out
                      </button>
                    ) : (
                      <Link to="/login" className="btn login-btn">
                        Log In
                      </Link>
                    )}
                  </div>
                </div>
                <ToastContainer/>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
