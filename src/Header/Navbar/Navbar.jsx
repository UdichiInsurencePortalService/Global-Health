import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/Home/global-main-logo.png";
import {
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Button,
  Modal,
  Select,
  message,
} from "antd";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../errortoast";
import Top from "./TopBar/Top";
import { CloseOutlined } from "@ant-design/icons";

// Import images
import img1 from "../../assets/reuseimage/whatsapp.png";
import img2 from "../../assets/reuseimage/circle.png";
import img3 from "../../assets/reuseimage/file.png";
import img4 from "../../assets/reuseimage/paper.png";
import img6 from "../../assets/reuseimage/motor.png";

// Product icons
import caricon1 from "../../../src/assets/Home/car-icons.png";
import bike1 from "../../../src/assets/Home/bike-icon.png";
import health from "../../../src/assets/Home/health-icon.png";
import home from "../../../src/assets/Home/home-icon.png";
import auto from "../../../src/assets/Home/auto.png";
import commercial from "../../../src/assets/Home/commercial-insurance.png";
import liability from "../../../src/assets/Home/liability-insurance.png";
import property from "../../../src/assets/Home/property-insurance.png";

const { Option } = Select;

const Navbar = () => {
  const [formRef] = Form.useForm();
  const [callbackForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const insuranceTypes = [
    "Car Insurance",
    "Bike Insurance",
    "Health Insurance",
    "Auto Insurance",
  ];

  // WhatsApp handler
  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/08069640455?text=Welcome%20to%20Global%20Health%20and%20Allied%20Insurance.%20How%20can%20I%20assist%20you%3F",
      "_blank"
    );
  };

  // Callback modal handlers
  const showCallbackModal = () => setIsCallbackModalOpen(true);
  
  const handleCallbackOk = () => {
    callbackForm
      .validateFields()
      .then(async (values) => {
        try {
          // Add your callback API call here
          console.log("Callback Form Data:", values);
          
          callbackForm.resetFields();
          setIsCallbackModalOpen(false);
          handleSuccess("Callback request submitted successfully!");
        } catch (error) {
          handleError("Failed to submit callback request");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCallbackCancel = () => {
    callbackForm.resetFields();
    setIsCallbackModalOpen(false);
  };

  // Drawer functions
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Mobile menu functions
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? "" : name);
  };

  // Contact form submission
  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = {
        name: values.user_name,
        email: values.user_email,
        phone_number: values.user_phone,
        address: values.user_address,
        message: values.user_message,
      };

      const response = await fetch("http://localhost:8080/api/contactform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        message.success("Thank you! Our team will contact you soon.");
        formRef.resetFields();
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Scroll handling
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileNav = document.querySelector(".mobile-nav-container");
      const menuToggle = document.querySelector(".mobile-menu-toggle");
      
      if (
        mobileMenuOpen &&
        mobileNav &&
        !mobileNav.contains(event.target) &&
        !menuToggle?.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const navbarStyles = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s ease-in-out",
      transform: visible ? "translateY(0)" : "translateY(-100%)",
      backgroundColor: isScrolled
        ? "rgb(29, 26, 26)"
        : "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
      padding: "10px 0",
    },
  };

  const hamburgerStyles = {
    container: {
      width: "30px",
      height: "24px",
      position: "relative",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "2px 0",
    },
    line: {
      width: "100%",
      height: "3px",
      backgroundColor: isScrolled ? "white" : "#333",
      borderRadius: "2px",
      transition: "all 0.3s ease-in-out",
      transformOrigin: "center",
    },
  };

  return (
    <>
      <div className="topbar d-none d-md-block">
        <Top />
      </div>

      <header className="header" style={navbarStyles.header}>
        <div className="container-fluid px-3 px-lg-4">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-6 col-sm-3 col-lg-3">
              <div className="logo">
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    className="img-fluid"
                    style={{
                      maxWidth: "118px",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="col-lg-6 d-none d-lg-block">
              <nav className="navigation">
                <ul className="nav menu d-flex justify-content-center">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  
                  <li className="nav-item dropdown">
                    <Link to="#">Product</Link>
                    <ul className="dropdown large-dropdown" style={{
                      width: "550px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}>
                      <li style={{ margin: "20px" }}>
                        <h2 className="dropdown-header">Individual Insurance</h2>
                        <ul className="list-unstyled">
                          <li className="d-flex align-items-center" style={{ padding: "10px" }}>
                            <img style={{ width: "30px", height: "33px", marginRight: "10px" }} src={caricon1} alt="Car" />
                            <Link to="/carinsurance">Car Insurance</Link>
                          </li>
                          <li className="d-flex align-items-center">
                            <img style={{ width: "29px", height: "27px", marginRight: "10px" }} src={bike1} alt="Bike" />
                            <Link to="/bikeinsurance">Bike Insurance</Link>
                          </li>
                          <li className="d-flex align-items-center">
                            <img src={health} style={{ width: "25px", height: "25px", marginRight: "10px" }} alt="Health" />
                            <Link to="/healthinsurance">Health Insurance</Link>
                          </li>
                          <li className="d-flex align-items-center">
                            <img src={auto} style={{ width: "26px", height: "25px", marginRight: "10px" }} alt="Auto" />
                            <Link to="/autoinsurance">Auto Insurance</Link>
                          </li>
                          <li className="d-flex align-items-center" style={{ padding: "10px" }}>
                            <img src={home} alt="Home" style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                            <Link to="/homeinsurance">Home Insurance</Link>
                          </li>
                        </ul>
                      </li>
                      <li style={{ margin: "20px" }}>
                        <h2 className="dropdown-header">Business Insurance</h2>
                        <ul className="list-unstyled">
                          <li className="d-flex align-items-center">
                            <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={commercial} alt="Commercial" />
                            <Link onClick={() => handleError("This page is under development")}>Commercial Insurance</Link>
                          </li>
                          <li className="d-flex align-items-center">
                            <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={liability} alt="Liability" />
                            <Link onClick={() => handleError("This page is under development")}>Liability Insurance</Link>
                          </li>
                          <li className="d-flex align-items-center">
                            <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={property} alt="Property" />
                            <Link onClick={() => handleError("This page is under development")}>Property Insurance</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link to="#">Claims</Link>
                    <ul className="dropdown" style={{
                      width: "400px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "15px",
                    }}>
                      <li style={{ marginBottom: "10px" }}>
                        <Link to="/claimprocess" className="d-flex align-items-center gap-2">
                          <img style={{ height: "24px", width: "24px" }} src={img6} alt="Process" />
                          <span>Claim Process</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/intimateclaims" className="d-flex align-items-center gap-2">
                          <img style={{ height: "24px", width: "24px" }} src={img4} alt="Intimate" />
                          <span>Vehicle Intimate Claims</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link to="#">Support</Link>
                    <ul className="dropdown" style={{
                      width: "600px",
                      padding: "15px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}>
                      <li className="d-flex gap-3">
                        <Link to="/policy" className="d-flex align-items-center gap-2">
                          <img src={img3} alt="Download" style={{ width: "24px", height: "24px" }} />
                          <span>Download Policy PDF</span>
                        </Link>
                        <a onClick={handleWhatsAppClick} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                          <img style={{ width: "24px", height: "24px" }} src={img1} alt="WhatsApp" />
                          <span>Connect on WhatsApp</span>
                        </a>
                        <a onClick={showCallbackModal} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                          <img style={{ width: "24px", height: "24px" }} src={img2} alt="Callback" />
                          <span>Request a Callback</span>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link to="/award">Award</Link>
                    <ul className="dropdown" style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}>
                      <li>
                        <Link to="/sponsorship">Sponsorship</Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link to="/currentpening">Career</Link>
                  </li>

                  <li>
                    <Link to="#" onClick={showDrawer}>Contact Us</Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <div className="col-6 col-sm-9 col-lg-3">
              <div className="d-flex align-items-center justify-content-end">
                <button
                  className="mobile-menu-toggle d-lg-none btn p-0"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "12px",
                  }}
                >
                  <div style={hamburgerStyles.container}>
                    <div style={{
                      ...hamburgerStyles.line,
                      transform: mobileMenuOpen ? "translateY(9px) rotate(45deg)" : "none",
                    }}></div>
                    <div style={{
                      ...hamburgerStyles.line,
                      opacity: mobileMenuOpen ? 0 : 1,
                    }}></div>
                    <div style={{
                      ...hamburgerStyles.line,
                      transform: mobileMenuOpen ? "translateY(-9px) rotate(-45deg)" : "none",
                    }}></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Callback Modal */}
      <Modal
        title="Request a Callback"
        open={isCallbackModalOpen}
        onOk={handleCallbackOk}
        onCancel={handleCallbackCancel}
        okText="Submit Request"
        width={window.innerWidth > 768 ? 500 : "95%"}
      >
        <Form form={callbackForm} layout="vertical">
          <Form.Item
            label="Insurance Type"
            name="insuranceType"
            rules={[{ required: true, message: "Please select insurance type!" }]}
          >
            <Select placeholder="Select insurance type">
              {insuranceTypes.map((type) => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 2, message: "Username must be at least 2 characters!" },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobile"
            rules={[
              { required: true, message: "Please input your mobile number!" },
              { pattern: /^[0-9]{10}$/, message: "Enter valid 10-digit number!" },
            ]}
          >
            <Input placeholder="Enter mobile number" maxLength={10} addonBefore="+91" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please input your address!" },
              { min: 10, message: "Address must be at least 10 characters!" },
            ]}
          >
            <Input.TextArea placeholder="Enter complete address" rows={3} />
          </Form.Item>

          <Form.Item label="Preferred Call Time (Optional)" name="preferredTime">
            <Select placeholder="Select preferred time">
              <Option value="morning">Morning (9 AM - 12 PM)</Option>
              <Option value="afternoon">Afternoon (12 PM - 4 PM)</Option>
              <Option value="evening">Evening (4 PM - 8 PM)</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1001,
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? "visible" : "hidden",
          transition: "all 0.4s ease",
          backdropFilter: mobileMenuOpen ? "blur(4px)" : "none",
        }}
      />

      {/* Mobile Navigation Container */}
      <div
        className={`mobile-nav-container ${mobileMenuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: mobileMenuOpen ? 0 : "-320px",
          width: "320px",
          maxWidth: "85vw",
          height: "100%",
          backgroundColor: "#ffffff",
          zIndex: 1002,
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          overflowY: "auto",
          boxShadow: mobileMenuOpen 
            ? "-8px 0 32px rgba(0, 0, 0, 0.15)" 
            : "none",
          fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
        }}
      >
        <div className="mobile-nav-header p-4" style={{
          borderBottom: "2px solid #f0f2f5",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0" style={{ 
              fontWeight: "700", 
              fontSize: "1.25rem",
              letterSpacing: "0.5px",
            }}>
              Menu
            </h4>
            <button
              className="mobile-nav-close btn btn-sm"
              onClick={toggleMobileMenu}
              style={{ 
                border: "none", 
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
            >
              <CloseOutlined style={{ fontSize: "16px" }} />
            </button>
          </div>
        </div>

        <ul className="mobile-nav-menu list-unstyled p-0 m-0">
          <li style={{ borderBottom: "1px solid #e8eaed" }}>
            <Link
              to="/"
              onClick={toggleMobileMenu}
              className="d-block p-4 text-decoration-none"
              style={{
                color: "#1a1a1a",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "inherit",
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f8f9ff";
                e.target.style.paddingLeft = "24px";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.paddingLeft = "16px";
              }}
            >
              🏠 Home
            </Link>
          </li>

          <li style={{ borderBottom: "1px solid #e8eaed" }}>
            <button
              onClick={() => toggleDropdown("products")}
              className="mobile-dropdown-toggle w-100 text-start p-4 border-0 bg-transparent d-flex justify-content-between align-items-center"
              style={{
                color: "#1a1a1a",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "inherit",
                transition: "all 0.3s ease",
              }}
            >
              <span>🛡️ Products</span>
              <span style={{ 
                fontSize: "18px", 
                fontWeight: "bold",
                transform: activeDropdown === "products" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}>
                ▼
              </span>
            </button>
            <div
              className={`mobile-dropdown-content ${
                activeDropdown === "products" ? "active" : ""
              }`}
              style={{
                maxHeight: activeDropdown === "products" ? "600px" : "0",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                backgroundColor: "#f8f9ff",
              }}
            >
              <div className="mobile-dropdown-header p-3 px-4" style={{
                fontWeight: "700",
                color: "#4338ca",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#ede9fe",
              }}>
                Individual Insurance
              </div>
              <ul className="list-unstyled m-0">
                <li>
                  <Link
                    to="/carinsurance"
                    onClick={toggleMobileMenu}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    🚗 Car Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Bikeinsurance"
                    onClick={toggleMobileMenu}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    🏍️ Bike Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Healthinsurance"
                    onClick={toggleMobileMenu}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    🏥 Health Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Autoinsurance"
                    onClick={toggleMobileMenu}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    🚙 Auto Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Homeinsurance"
                    onClick={toggleMobileMenu}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    🏠 Home Insurance
                  </Link>
                </li>
              </ul>

              <div className="mobile-dropdown-header p-3 px-4" style={{
                fontWeight: "700",
                color: "#4338ca",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#ede9fe",
              }}>
                Business Insurance
              </div>
              <ul className="list-unstyled m-0">
                <li>
                  <Link
                    to="#"
                    onClick={() => {
                      toggleMobileMenu();
                      handleError("This page is Under-development");
                    }}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    🏢 Commercial Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={() => {
                      toggleMobileMenu();
                      handleError("This page is under Development");
                    }}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    ⚖️ Liability Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={() => {
                      toggleMobileMenu();
                      handleError("This page is under Development");
                    }}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    🏘️ Property Insurance
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li style={{ borderBottom: "1px solid #e8eaed" }}>
            <button
              onClick={() => toggleDropdown("claims")}
              className="mobile-dropdown-toggle w-100 text-start p-4 border-0 bg-transparent d-flex justify-content-between align-items-center"
              style={{
                color: "#1a1a1a",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "inherit",
                transition: "all 0.3s ease",
              }}
            >
              <span>📋 Claims</span>
              <span style={{ 
                fontSize: "18px", 
                fontWeight: "bold",
                transform: activeDropdown === "claims" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}>
                ▼
              </span>
            </button>
            <div
              className={`mobile-dropdown-content ${
                activeDropdown === "claims" ? "active" : ""
              }`}
              style={{
                maxHeight: activeDropdown === "claims" ? "300px" : "0",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                backgroundColor: "#f8f9ff",
              }}
            >
              <ul className="list-unstyled m-0">
                <li>
                  <Link
                    to="/Claimprocess"
                    onClick={toggleMobileMenu}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    ⚙️ Claim Process
                  </Link>
                </li>
                <li>
                  <Link
                    to="/intimateclaims"
                    onClick={toggleMobileMenu}
                    className="d-block p-3 px-4 text-decoration-none"
                    style={{
                      color: "#374151",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.borderLeft = "3px solid #667eea";
                      e.target.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderLeft = "3px solid transparent";
                      e.target.style.paddingLeft = "16px";
                    }}
                  >
                    🚗 Vehicle Intimate Claims
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li style={{ borderBottom: "1px solid #e8eaed" }}>
            <button
              onClick={() => toggleDropdown("support")}
              className="mobile-dropdown-toggle w-100 text-start p-4 border-0 bg-transparent d-flex justify-content-between align-items-center"
              style={{
                color: "#1a1a1a",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "inherit",
                transition: "all 0.3s ease",
              }}
            >
              <span>🆘 Support</span>
              <span style={{ 
                fontSize: "18px", 
                fontWeight: "bold",
                transform: activeDropdown === "support" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}>
                ▼
              </span>
            </button>
            <div
              className={`mobile-dropdown-content ${
                activeDropdown === "support" ? "active" : ""
              }`}
              style={{
                maxHeight: activeDropdown === "support" ? "400px" : "0",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                backgroundColor: "#f8f9ff",
              }}
            >
              <div className="p-3">
                <Link
                  to="/policy"
                  onClick={toggleMobileMenu}
                  className="d-flex align-items-center gap-3 p-3 text-decoration-none mb-2"
                  style={{
                    color: "#374151",
                    fontSize: "15px",
                    fontWeight: "500",
                    fontFamily: "inherit",
                    transition: "all 0.3s ease",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f3f4f6";
                    e.target.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.transform = "translateX(0px)";
                  }}
                >
                  <span>📄</span>
                  <span>Download Policy PDF</span>
                </Link>

                <a
                  onClick={() => {
                    toggleMobileMenu();
                    handleClick();
                  }}
                  className="d-flex align-items-center gap-3 p-3 text-decoration-none mb-2"
                  style={{ 
                    cursor: "pointer",
                    color: "#374151",
                    fontSize: "15px",
                    fontWeight: "500",
                    fontFamily: "inherit",
                    transition: "all 0.3s ease",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f0fdf4";
                    e.target.style.transform = "translateX(4px)";
                    e.target.style.borderColor = "#22c55e";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.transform = "translateX(0px)";
                    e.target.style.borderColor = "#e5e7eb";
                  }}
                >
                  <span>💬</span>
                  <span>Connect on WhatsApp</span>
                </a>

                <a
                  onClick={() => {
                    toggleMobileMenu();
                    showCallbackModal();
                  }}
                  className="d-flex align-items-center gap-3 p-3 text-decoration-none"
                  style={{ 
                    cursor: "pointer",
                    color: "#374151",
                    fontSize: "15px",
                    fontWeight: "500",
                    fontFamily: "inherit",
                    transition: "all 0.3s ease",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#fef3c7";
                    e.target.style.transform = "translateX(4px)";
                    e.target.style.borderColor = "#f59e0b";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.transform = "translateX(0px)";
                    e.target.style.borderColor = "#e5e7eb";
                  }}
                >
                  <span>📞</span>
                  <span>Request a Callback</span>
                </a>
              </div>
            </div>
          </li>

          <li style={{ borderBottom: "1px solid #e8eaed" }}>
            <Link
              to="#"
              onClick={() => {
                toggleMobileMenu();
                showDrawer();
              }}
              className="d-block p-4 text-decoration-none"
              style={{
                color: "#1a1a1a",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "inherit",
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f8f9ff";
                e.target.style.paddingLeft = "24px";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.paddingLeft = "16px";
              }}
            >
              📧 Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Drawer */}
      <Drawer
        title="We're Here to Help! Let Us Know Your Query"
        width={window.innerWidth > 768 ? 600 : "95%"}
        onClose={onClose}
        open={open}
        bodyStyle={{ padding: "24px" }}
        headerStyle={{
          borderBottom: "1px solid #f0f0f0",
          padding: "16px 24px",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Fill out the form below, and our team will get back to you as soon
            as possible.
          </p>

          <Form
            form={formRef}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="user_name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input className="rounded-md shadow-sm border-gray-300" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="user_email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    type="email"
                    className="rounded-md shadow-sm border-gray-300"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="user_phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    type="tel"
                    className="rounded-md shadow-sm border-gray-300"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="user_address"
                  label="Address"
                  rules={[
                    { required: true, message: "Please enter your address" },
                  ]}
                >
                  <Input className="rounded-md shadow-sm border-gray-300" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="user_message"
                  label="Message"
                  rules={[
                    { required: true, message: "Please enter your message" },
                  ]}
                >
                  <Input.TextArea
                    rows={5}
                    className="rounded-md shadow-sm border-gray-300"
                    placeholder="How can we help you today?"
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end space-x-3 pt-4">
              <Button htmlType="submit" loading={loading}>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>

      <ToastContainer />
    </>
  );
};

export default Navbar;