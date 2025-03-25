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
  const timeout = 2000;

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

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

    setTimeout(() => {
      navigate("/login");
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
      <div className="topbar" style={{ backgroundColor: "rgb(172, 57, 19)", color: "white", padding: "10px" }}>
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
              <ul className="top-contact" style={{ display: "flex", gap: "15px", listStyle: "none", justifyContent: 'end', margin: 0, padding: 0 }}>
                <li style={{ color: "white" }}><i className="fa fa-phone" style={{ marginRight: "5px" }}></i> 9205401500</li>
                <li style={{ color: "white" }}>
                  <i className="fa fa-envelope" style={{ marginRight: "5px" }}></i>
                  <Link to="mailto:globalhealth235@gmail.com" style={{ color: "white", textDecoration: "none" }}>globalhealth235@gmail.com</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="header-inner">
          <div className="container">
            <div className="inner">
              <div className="row align-items-center">
                <div className="col-lg-4 col-md-3 col-12">
                  <Link to="/" style={{ display: "flex", alignItems: "center", height: "100%" }}>
                    <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "180px", height: "auto", objectFit: "contain", position: 'absolute' }} />
                  </Link>
                </div>
                <div className="col-lg-6 col-md-9 col-12">
                  <nav className="navigation">
                    <ul className="nav menu" style={{ display: "flex", gap: "20px", listStyle: "none", padding: 0, margin: 0 }}>
                      <li><Link to="/">Home</Link></li>
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
                      <li><Link to="#">Policy</Link></li>
                      <li><Link to="#">Claims</Link></li>
                      <li><Link to="/" onClick={showDrawer}>Contact Us</Link></li>
                    </ul>
                  </nav>
                </div>
                <div className="col-lg-2 col-12">
                  <div className="get-quote">
                    {username ? (
                      <span className="username-display">Hello, {username}</span>
                    ) : null}
                    {username ? (
                      <button onClick={handleLogout} className="logout-btn">Log Out</button>
                    ) : (
                      <Link to="/login" className="btn login-btn">Log In</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Drawer title="Contact Us" placement="right" onClose={onClose} open={open}>
        <Form layout="vertical" ref={formRef} onFinish={sendEmail} initialValues={{ name: username }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}>
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">Send Message</Button>
        </Form>
      </Drawer>

      <ToastContainer />
    </>
  );
};

export default Navbar;
