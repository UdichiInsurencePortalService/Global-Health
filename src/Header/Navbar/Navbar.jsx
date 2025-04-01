import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Drawer, Form, Input, Row, Col, Button } from "antd";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../errortoast";
import Top from "./TopBar/Top";

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
    setTimeout(() => navigate("/login"), timeout);
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
        <Top />
      </div>
      
      <header className="header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-3 col-12">
              <div className="logo">
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                  <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "190px", width: "auto", objectFit: "contain", position: "absolute" }} />
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-md-9 col-12">
              <nav className="navigation">
                <ul className="nav menu">
                  <li><Link to="/">Home</Link></li>
                  <li className="nav-item dropdown">
                    <Link to="#" className="nav-link">Product</Link>
                    <ul className="dropdown" style={{ display: "flex", minWidth: "400px", padding: "10px" }}>
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
                  <li><Link to="#">Policy</Link></li>
                  <li><Link to="#">Claims</Link></li>
                  <li><Link to="#" onClick={showDrawer}>Contact Us</Link></li>
                </ul>
              </nav>
            </div>

            <div className="col-lg-2 col-12">
              <div className="get-quote">
                {username && <span className="username-display">Hello, {username}</span>}
                {username ? (
                  <button onClick={handleLogout} className="logout-btn">Log Out</button>
                ) : (
                  <Link to="/login" className="btn login-btn">Log In</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <Drawer title="We’re Here to Help! Let Us Know Your Query" width={600} onClose={onClose} open={open}>
        <p className="contact-description">Fill out the form below, and our team will get back to you as soon as possible.</p>
        <Form layout="vertical" ref={formRef} onFinish={sendEmail}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="user_name" label="Name" rules={[{ required: true }]}>
                <Input className="contact-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="user_email" label="Email" rules={[{ required: true }]}>
                <Input type="email" className="contact-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="user_address" label="Address" rules={[{ required: true }]}>
                <Input className="contact-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
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
