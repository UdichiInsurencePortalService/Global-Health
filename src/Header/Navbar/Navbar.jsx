import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/brand.png";
import { Drawer, Form, Input, Row, Col, Button } from "antd";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../errortoast";
import Top from "./TopBar/Top";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem("loggedInUser") || "");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const timeout = 2000;
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? "" : name);
  };

  const sendEmail = (values) => {
    emailjs
      .send("service_la8diqr", "template_qhn3bt3", values, "_CVqq1nmrbE6BhO0x")
      .then(() => {
        handleSuccess("Message sent successfully!");
        onClose();
      })
      .catch((error) => console.error("Failed to send email:", error));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    handleSuccess("User logged out");
    setTimeout(() => navigate("/login"), timeout);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("loggedInUser") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileNav = document.querySelector(".mobile-nav-container");
      if (mobileMenuOpen && mobileNav && !mobileNav.contains(event.target) && 
          !event.target.classList.contains("mobile-menu-toggle")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Add scroll event handler
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Update transparency based on scroll position
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Show navbar when scrolling up or at the top of the page
      // Hide navbar when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);
  
  // Close mobile menu when viewport size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Add CSS for navbar styling
  const navbarStyles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease-in-out',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      backgroundColor: isScrolled ? 'rgb(29, 26, 26)' : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
    }
  };
  return (
    <>
      {/* Inject custom CSS */}
      
      <div className="topbar">
        <Top />
      </div>
      
      <header className="header" style={navbarStyles.header}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-3 col-6">
              <div className="logo">
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                  <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "240px", width: "auto", objectFit: "contain", position: "absolute" }} />
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-0">
              <nav className="navigation">
                <ul className="nav menu">
                  <li><Link to="/">Home</Link></li>
                  <li className="nav-item dropdown">
                    <Link to="#" className="nav-link">Product</Link>
                    <ul className="dropdown" style={{ minWidth: "400px", padding: "10px" }}>
                      <li style={{ flex: 1, listStyle: "none" }}>
                        <h2 className="dropdown-header">Individual Insurance</h2>
                        <ul className="list-unstyled">
                          <li><Link to="/carinsurance" className="dropdown-item">Car Insurance</Link></li>
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
                  <li><Link to="#">Policy</Link> </li>
                  <li>
                  <Link to="#">Claims</Link>
                  <ul className="dropdown" style={{ minWidth: "400px", padding: "10px" }}>
                      <li style={{ flex: 1, listStyle: "none" }}>
                        <ul className="list-unstyled">
                          <li><Link to="/intimateclaims" className="dropdown-item">Intimate Claims</Link></li>
                          <li><Link to="/product/health-insurance" className="dropdown-item">Document Upload</Link></li>
                          <li><Link to="/product/auto-insurance" className="dropdown-item">Auto Insurance</Link></li>
                          <li><Link to="/product/home-insurance" className="dropdown-item">Home Insurance</Link></li>
                        </ul>
                      </li>
                      
                    </ul>
                  </li>
                  <li><Link to="#" onClick={showDrawer}>Contact Us</Link></li>
                </ul>
              </nav>
            </div>

            <div className="col-lg-2 col-md-3 col-6 d-flex justify-content-end align-items-center">
              <div className="get-quote">
                {username && <span className="username-display">Hello, {username}</span>}
                {username ? (
                  <button onClick={handleLogout} className="logout-btn">Log Out</button>
                ) : (
                  <Link to="/login" className="navbar-btn">Login</Link>
                )}
              </div>
              <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <MenuOutlined />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
      
      {/* Mobile Navigation */}
      <div className={`mobile-nav-container ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <h3>Menu</h3>
          <button className="mobile-nav-close" onClick={toggleMobileMenu}>
            <CloseOutlined />
          </button>
        </div>
        
        <ul className="mobile-nav-menu">
          <li className="mobile-nav-item">
            <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
          </li>
          <li className="mobile-nav-item">
            <button 
              className="mobile-dropdown-toggle" 
              onClick={() => toggleDropdown("products")}
            >
              Products
              <span>{activeDropdown === "products" ? "−" : "+"}</span>
            </button>
            <div className={`mobile-dropdown-content ${activeDropdown === "products" ? "active" : ""}`}>
              <div className="mobile-dropdown-section">
                <div className="mobile-dropdown-header">Individual Insurance</div>
                <ul className="mobile-dropdown-menu">
                  <li className="mobile-dropdown-item">
                    <Link to="/carinsurance" onClick={toggleMobileMenu}>Car Insurance</Link>
                  </li>
                  <li className="mobile-dropdown-item">
                    <Link to="/product/life-insurance" onClick={toggleMobileMenu}>Life Insurance</Link>
                  </li>
                  <li className="mobile-dropdown-item">
                    <Link to="/product/health-insurance" onClick={toggleMobileMenu}>Health Insurance</Link>
                  </li>
                  <li className="mobile-dropdown-item">
                    <Link to="/product/auto-insurance" onClick={toggleMobileMenu}>Auto Insurance</Link>
                  </li>
                  <li className="mobile-dropdown-item">
                    <Link to="/product/home-insurance" onClick={toggleMobileMenu}>Home Insurance</Link>
                  </li>
                </ul>
                
                <div className="mobile-dropdown-header">Business Insurance</div>
                <ul className="mobile-dropdown-menu">
                  <li className="mobile-dropdown-item">
                    <Link to="/product/commercial-insurance" onClick={toggleMobileMenu}>Commercial Insurance</Link>
                  </li>
                  <li className="mobile-dropdown-item">
                    <Link to="/product/liability-insurance" onClick={toggleMobileMenu}>Liability Insurance</Link>
                  </li>
                  <li className="mobile-dropdown-item">
                    <Link to="/product/property-insurance" onClick={toggleMobileMenu}>Property Insurance</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="mobile-nav-item">
            <Link to="#" className="mobile-nav-link" onClick={toggleMobileMenu}>Policy</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="#" className="mobile-nav-link" onClick={toggleMobileMenu}>Claims</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="#" className="mobile-nav-link" onClick={() => {toggleMobileMenu(); showDrawer();}}>Contact Us</Link>
          </li>
        </ul>
        
        <div className="mobile-user-section">
          {username && <span className="mobile-username">Hello, {username}</span>}
          {username ? (
            <button onClick={() => {toggleMobileMenu(); handleLogout();}} className="navbar-btn ">Log Out</button>
          ) : (
            <Link to="/login" className=" navbar-btn " onClick={toggleMobileMenu}>Log In</Link>
          )}
        </div>
      </div>

      <Drawer title="We're Here to Help! Let Us Know Your Query" width={window.innerWidth > 768 ? 600 : '90%'} onClose={onClose} open={open}>
        <p className="contact-description">Fill out the form below, and our team will get back to you as soon as possible.</p>
        <Form layout="vertical" ref={formRef} onFinish={sendEmail}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="user_name" label="Name" rules={[{ required: true }]}>
                <Input className="contact-input" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="user_email" label="Email" rules={[{ required: true }]}>
                <Input type="email" className="contact-input" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="user_address" label="Address" rules={[{ required: true }]}>
                <Input className="contact-input" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="user_number" label="Number" rules={[{ required: true }]}>
                <Input type="number" className="contact-input" />
              </Form.Item>
            </Col>
          </Row>
          <div className="contact-buttons">
            <Button onClick={onClose} className="cancel-btn">Cancel</Button>
            <Button type="primary" htmlType="submit" className="submit-btn">Submit</Button>
          </div>
        </Form>

        <h3 className="contact-title">Contact Information</h3>
        <ul className="contact-list">
          <li><b>Muscat Office:</b> P.O. Box 556. Postal code No. 103. Muscat, Sultanate of Oman; Telephone: (968) 928 655 17, (968) 992 134 62</li>
          <li><b>Mauritius Office:</b> 301, Cyber City, Ebene.</li>
          <li><b>Toronto Office:</b> PO Box 4643, Station A Toronto, Ontario M5W 5E3, 1-877-780-7247</li>
          <li><b>Texas Office:</b> 1010 E. Lookout Drive Richardson TX 75082, 800-451-0267</li>
          <li><b>London Office:</b> 1st Floor, Dean House, 193 High St, Ponders End, Enfield EN3 4EA, United Kingdom</li>
          <li><b>Paris Office:</b> 31 Rue de Châteaudun, 75009 Paris, France</li>
          <li><b>Mumbai Office:</b> 43, Ashok Nagar, Opp Dwarka Hotel, Achole Road, Nallasopara, Mumbai -209</li>
        </ul>
      </Drawer>

      <ToastContainer />
    </>
  );
};

export default Navbar;