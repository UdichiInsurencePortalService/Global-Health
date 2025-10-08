import React, { useState, useRef, useEffect } from "react";
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
import { handleSuccess } from "../../errortoast";
import Top from "./TopBar/Top";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { handleError } from "../../errortoast";
import img1 from "../../assets/reuseimage/whatsapp.png";
import img2 from "../../assets/reuseimage/circle.png";
import img3 from "../../assets/reuseimage/file.png";
import img4 from "../../assets/reuseimage/paper.png";
import img5 from "../../assets/reuseimage/file.png";
import img6 from "../../assets/reuseimage/motor.png";

// product icone for navbar
import caricon1 from "../../../src/assets/Home/car-icons.png";
import bike1 from "../../../src/assets/Home/bike-icon.png";
import health from "../../../src/assets/Home/health-icon.png";
import home from "../../../src/assets/Home/home-icon.png";
import auto from "../../../src/assets/Home/auto.png";
import commercial from "../../../src/assets/Home/commercial-insurance.png";
import liability from "../../../src/assets/Home/liability-insurance.png";
import property from "../../../src/assets/Home/property-insurance.png";

const { Option } = Select;

const Navbar = ({ icon1, icon2 }) => {
  const [formRef] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // State for callback modal
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [callbackForm] = Form.useForm();

  // WhatsApp redirect state
  const [redirect, setRedirect] = useState(false);

  // Other existing states
  const [username, setUsername] = useState(
    localStorage.getItem("loggedInUser") || ""
  );
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const timeout = 2000;
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");

  // Insurance type options
  const insuranceTypes = [
    "Car Insurance",
    "Bike Insurance",
    "Health Insurance",
    "Auto Insurance",
  ];

  // WhatsApp redirect effect
  useEffect(() => {
    if (redirect) {
      window.location.href =
        "https://wa.me/08069640455?text=Welcome%20to%20Global%20Health%20and%20Allied%20Insurance.%20How%20can%20I%20assist%20you%3Ftarget_blank";
    }
  }, [redirect]);

  // WhatsApp click handler
  const handleClick = () => {
    setRedirect(true);
  };

  // Callback modal handlers
  const showCallbackModal = () => {
    setIsCallbackModalOpen(true);
  };

  const handleCallbackOk = () => {
    callbackForm
      .validateFields()
      .then((values) => {
        console.log("Callback Form Data:", values);
        // Here you can handle the form submission
        // For example, send data to an API

        // Reset form and close modal
        callbackForm.resetFields();
        setIsCallbackModalOpen(false);

        handleSuccess("Callback request submitted successfully!");
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
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? "" : name);
  };

  // Email sending function
  const sendEmail = (values) => {
    emailjs
      .send("service_la8diqr", "template_qhn3bt3", values, "_CVqq1nmrbE6BhO0x")
      .then(() => {
        handleSuccess("Message sent successfully!");
        onClose();
      })
      .catch((error) => console.error("Failed to send email:", error));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    handleSuccess("User logged out");
    setTimeout(() => navigate("/login"), timeout);
  };

  // Effect hooks
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("loggedInUser") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileNav = document.querySelector(".mobile-nav-container");
      if (
        mobileMenuOpen &&
        mobileNav &&
        !mobileNav.contains(event.target) &&
        !event.target.classList.contains("mobile-menu-toggle") &&
        !event.target.closest('.mobile-menu-toggle')
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileMenuOpen) {
        setMobileMenuOpen(false);
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

  // Hamburger menu styles
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
    lineTop: {
      transform: mobileMenuOpen ? "translateY(9px) rotate(45deg)" : "translateY(0) rotate(0deg)",
    },
    lineMiddle: {
      opacity: mobileMenuOpen ? 0 : 1,
      transform: mobileMenuOpen ? "scale(0)" : "scale(1)",
    },
    lineBottom: {
      transform: mobileMenuOpen ? "translateY(-9px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
    },
  };

  // contact form
  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // Prepare data for backend API
      const formData = {
        name: values.user_name,
        email: values.user_email,
        phone_number: values.user_phone,
        address: values.user_address,
        message: values.user_message,
      };

      // Send data to backend
      const response = await fetch("http://localhost:8080/api/contactform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        message.success(
          "Thank you for contacting us! Our team will get back to you soon."
        );

        // Reset form
        formRef.resetFields();

        // Close drawer after a short delay
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(
        "Sorry, there was an error submitting your form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="topbar d-none d-md-block">
        <Top />
      </div>

      <header className="header" style={navbarStyles.header}>
        <div className="container-fluid px-3 px-lg-4">
          <div className="row align-items-center">
            {/* Logo Section */}
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
                      objectFit: "contain",
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
                    <ul
                      className="dropdown large-dropdown"
                      style={{
                        width: "550px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <li style={{ margin: "20px" }}>
                        <h2 className="dropdown-header">
                          Individual Insurance
                        </h2>
                        <ul className="list-unstyled">
                          <li className="d-flex" style={{ padding: "10px" }}>
                            <img
                              style={{ width: "30px", height: "33px" }}
                              src={caricon1}
                              alt="Car Insurance"
                              className="img-fluid"
                            />
                            <Link to="/carinsurance">Car Insurance</Link>
                          </li>
                          <li className="d-flex">
                            <img
                              style={{ width: "29px", height: "27px" }}
                              src={bike1}
                              alt="Bikeinsurance"
                              className="img-fluid"
                            />
                            <Link to="/Bikeinsurance">Bike Insurance</Link>
                          </li>
                          <li className="d-flex">
                            <img
                              src={health}
                              style={{ width: "25px", height: "25px" }}
                              alt="Healthinsurance"
                              className="img-fluid"
                            />
                            <Link to="/Healthinsurance">Health Insurance</Link>
                          </li>
                          <li className="d-flex">
                            <img
                              src={auto}
                              style={{ width: "26px", height: "25px" }}
                              className="img-fluid"
                              alt="Autoinsurance"
                            />
                            <Link to="/Autoinsurance">Auto Insurance</Link>
                          </li>
                          <li className="d-flex" style={{ padding: "10px" }}>
                            <img
                              src={home}
                              alt="Homeinsurance"
                              style={{ width: "25px", height: "25px" }}
                              className="img-fluid"
                            />
                            <Link to="/Homeinsurance">Home Insurance</Link>
                          </li>
                        </ul>
                      </li>
                      <li style={{ margin: "20px" }}>
                        <h2 className="dropdown-header">Business Insurance</h2>
                        <ul className="list-unstyled">
                          <li>
                            <Link
                              onClick={() =>
                                handleError("This page is Under-development")
                              }
                            >
                              <img
                                style={{
                                  height: "32px",
                                  width: "32px",
                                }}
                                src={commercial}
                                alt=""
                              />
                              Commercial Insurance
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() =>
                                handleError("This page is under Development")
                              }
                            >
                              <img
                                className="img-fluid"
                                style={{
                                  height: "32px",
                                  width: "32px",
                                }}
                                src={liability}
                                alt="liability-insurance"
                              />
                              Liability Insurance
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() =>
                                handleError("This page is under Development")
                              }
                            >
                              <img
                                className="img-fluid"
                                style={{
                                  height: "32px",
                                  width: "32px",
                                }}
                                src={property}
                                alt="property-insurance"
                              />
                              Property Insurance
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link to="#">Claims</Link>
                    <ul
                      className="dropdown"
                      style={{
                        width: "400px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "15px",
                        listStyle: "none",
                        margin: 0,
                      }}
                    >
                      <li>
                        <Link
                          to="/Claimprocess"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            transition: "background-color 0.2s",
                          }}
                        >
                          <img
                            style={{
                              height: "24px",
                              width: "24px",
                              flexShrink: 0,
                            }}
                            className="img-fluid"
                            src={img6}
                            alt="Document Upload"
                          />
                          <span style={{ fontSize: "14px", fontWeight: "500" }}>
                            Claim Process
                          </span>
                        </Link>
                      </li>
                      <li style={{ marginBottom: "10px" }}>
                        <Link
                          to="/intimateclaims"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            transition: "background-color 0.2s",
                          }}
                        >
                          <img
                            style={{
                              height: "24px",
                              width: "24px",
                              flexShrink: 0,
                            }}
                            className="img-fluid"
                            src={img4}
                            alt="Intimate Claims"
                          />
                          <span style={{ fontSize: "14px", fontWeight: "500" }}>
                            Vehicle Intimate Claims
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link to="#">Support</Link>
                    <ul
                      className="dropdown"
                      style={{
                        width: "600px",
                        padding: "15px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        textDecoration: "none",
                      }}
                    >
                      <li style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex" }}>
                          <Link
                            to="/policy"
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={img3}
                              alt="Download"
                              style={{ width: "24px", height: "24px" }}
                              className="img-fluid"
                            />
                            <span style={{ fontFamily: "initial" }}>
                              Download policy pdf
                            </span>
                          </Link>

                          <a
                            onClick={handleClick}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              style={{ width: "24px", height: "24px" }}
                              className="img-fluid"
                              src={img1}
                              alt="WhatsApp"
                            />
                            <span style={{ fontFamily: "initial" }}>
                              Connect on WhatsApp
                            </span>
                          </a>

                          <a
                            onClick={showCallbackModal}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              style={{ width: "24px", height: "24px" }}
                              className="img-fluid"
                              src={img2}
                              alt="Callback"
                            />
                            <span style={{ fontFamily: "initial" }}>
                              Request a Callback
                            </span>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </li>




                <li>
                    <Link to="/Currentpening">
                      Career
                    </Link>
                  </li>

                  <li>
                    <Link to="#" onClick={showDrawer}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right Section - User Actions & Mobile Menu Button */}
            <div className="col-6 col-sm-9 col-lg-3">
              <div className="d-flex align-items-center justify-content-end">
                {/* Mobile Menu Button with Animated Hamburger */}
                <button
                  className="mobile-menu-toggle d-lg-none btn p-0"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "12px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    transform: mobileMenuOpen ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <div style={hamburgerStyles.container}>
                    <div 
                      style={{
                        ...hamburgerStyles.line,
                        ...hamburgerStyles.lineTop,
                      }}
                    ></div>
                    <div 
                      style={{
                        ...hamburgerStyles.line,
                        ...hamburgerStyles.lineMiddle,
                      }}
                    ></div>
                    <div 
                      style={{
                        ...hamburgerStyles.line,
                        ...hamburgerStyles.lineBottom,
                      }}
                    ></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Callback Request Modal */}
      <Modal
        title="Request a Callback"
        open={isCallbackModalOpen}
        onOk={handleCallbackOk}
        onCancel={handleCallbackCancel}
        okText="Submit Request"
        cancelText="Cancel"
        width={window.innerWidth > 768 ? 500 : "95%"}
        destroyOnClose={true}
      >
        <Form
          form={callbackForm}
          layout="vertical"
          name="callback_request_form"
        >
          <Form.Item
            label="Insurance Type"
            name="insuranceType"
            rules={[
              {
                required: true,
                message: "Please select an insurance type!",
              },
            ]}
          >
            <Select placeholder="Select insurance type">
              {insuranceTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                min: 2,
                message: "Username must be at least 2 characters!",
              },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please input your mobile number!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number!",
              },
            ]}
          >
            <Input
              placeholder="Enter your mobile number"
              maxLength={10}
              addonBefore="+91"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
              {
                min: 10,
                message: "Address must be at least 10 characters!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Enter your complete address"
              rows={3}
            />
          </Form.Item>

          <Form.Item
            label="Preferred Call Time (Optional)"
            name="preferredTime"
          >
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
        onClick={toggleMobileMenu}
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
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          backdropFilter: mobileMenuOpen ? "blur(4px)" : "blur(0px)",
        }}
      ></div>

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