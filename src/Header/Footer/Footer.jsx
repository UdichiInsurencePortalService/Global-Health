import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Footer.css";

import React, { useState, useRef, useEffect } from "react";
import { Drawer, Form, Input, Row, Col, Button } from "antd";
import emailjs from "@emailjs/browser";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../errortoast";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Drawer functions
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Email sending function
  const sendEmail = (values) => {
    emailjs
      .send("service_la8diqr", "template_qhn3bt3", values, "_CVqq1nmrbE6BhO0x")
      .then(() => {
        handleSuccess("Message sent successfully!");
        onClose();
        if (formRef.current) {
          formRef.current.resetFields();
        }
      })
      .catch((error) => console.error("Failed to send email:", error));
  };

  const Links1 = [
    { label: "Bike Insurance", path: "/Bikeinsurance" },
    { label: "Car Insurance", path: "/carinsurance" },
    { label: "Auto Insurance", path: "/Autoinsurance" },
    { label: "Health Insurance", path: "/Healthinsurance" },
    { label: "Home Insurance", path: "/Homeinsurance" },
  ];

  const Links = [
    { label: "FAQ", path: "/faq" },
    { label: "Company Information", path: "/companyinfo" },
    { label: "Terms & Conditions", path: "/termcondition" },
    { label: "Customer Support", action: "drawer" },
    { label: "Career", path: "/Currentpening" },
  ];

  return (
    <div className="container-fluid p-0 bg-primary text-white">
      <footer className="text-white">
        <div className="container-fluid px-3 px-sm-4">
          <div className="row py-4 py-md-5">
            {/* Logo Section */}
            <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="text-center text-md-start">
                <div
                  className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mx-md-0 shadow mb-3"
                  style={{ 
                    width: isMobile ? "100px" : "130px", 
                    height: isMobile ? "100px" : "130px" 
                  }}
                >
                  <img
                    src={logo}
                    width={isMobile ? 70 : 100}
                    alt="Global Health & Allied Insurances"
                    className="img-fluid"
                  />
                </div>
                <p className="mb-3 fs-6 fs-md-5">Protect What Matters Most</p>
                <div className="d-flex justify-content-center justify-content-md-start gap-2 gap-sm-3">
                  <a href="#" className="text-white" style={{ fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    <FaFacebookSquare />
                  </a>
                  <a href="#" className="text-white" style={{ fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-white" style={{ fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="text-center text-md-start">
                <h5 className="text-uppercase mb-3 fs-5 fw-bold">Products</h5>
                <ul className="list-unstyled mb-0">
                  {Links1.map(({ label, path }) => (
                    <li key={label} className="mb-2">
                      <Link
                        to={path}
                        className="text-white text-decoration-none d-flex align-items-center justify-content-center justify-content-md-start hover-link"
                        style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                      >
                        <AiFillCaretRight className="me-2 flex-shrink-0" /> 
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Useful Links Section */}
            <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="text-center text-md-start">
                <h5 className="text-uppercase mb-3 fs-5 fw-bold">Useful Links</h5>
                <ul className="list-unstyled mb-0">
                  {Links.map(({ label, path, action }) => (
                    <li key={label} className="mb-2">
                      {action === "drawer" ? (
                        <button
                          onClick={showDrawer}
                          className="text-white text-decoration-none d-flex align-items-center justify-content-center justify-content-md-start bg-transparent border-0 p-0 w-100 hover-link"
                          style={{ 
                            cursor: "pointer",
                            fontSize: isMobile ? '0.9rem' : '1rem'
                          }}
                        >
                          <AiFillCaretRight className="me-2 flex-shrink-0" /> 
                          <span>{label}</span>
                        </button>
                      ) : (
                        <Link
                          to={path}
                          className="text-white text-decoration-none d-flex align-items-center justify-content-center justify-content-md-start hover-link"
                          style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                        >
                          <AiFillCaretRight className="me-2 flex-shrink-0" /> 
                          <span>{label}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="text-center text-md-start">
                <h5 className="text-uppercase mb-3 fs-5 fw-bold">Contact</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-3 d-flex align-items-start justify-content-center justify-content-md-start">
                    <FaMapMarkerAlt className="me-2 mt-1 flex-shrink-0" />
                    <span style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', lineHeight: '1.4' }}>
                      Head Office: P.O. Box 556, Postal Code 103, Muscat,
                      Sultanate of Oman
                    </span>
                  </li>
                  <li className="mb-3 d-flex align-items-center justify-content-center justify-content-md-start">
                    <FaPhone className="me-2 flex-shrink-0" />
                    <a 
                      href="tel:08069640455" 
                      className="text-white text-decoration-none"
                      style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                    >
                      0806940922
                    </a>
                  </li>
                  <li className="d-flex align-items-center justify-content-center justify-content-md-start">
                    <FaEnvelope className="me-2 flex-shrink-0" />
                    <a 
                      href="mailto:info@globalhealthandalliedservices.com" 
                      className="text-white text-decoration-none text-break"
                      style={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}
                    >
                      info@globalhealthandalliedservices.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-top border-light">
          <div className="container-fluid px-3 px-sm-4">
            <div className="text-center py-3">
              <span style={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                © 2025 Global Health & Allied Insurance. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Drawer */}
      <Drawer
        title={
          <span style={{ fontSize: isMobile ? '16px' : '18px' }}>
            We're Here to Help! Let Us Know Your Query
          </span>
        }
        width={isMobile ? "100%" : window.innerWidth > 1024 ? 600 : "90%"}
        onClose={onClose}
        open={open}
        bodyStyle={{ 
          padding: isMobile ? "16px" : "24px",
          fontSize: isMobile ? '14px' : '16px'
        }}
        headerStyle={{
          borderBottom: "1px solid #f0f0f0",
          padding: isMobile ? "12px 16px" : "16px 24px",
          fontWeight: "bold",
        }}
        placement={isMobile ? "bottom" : "right"}
        height={isMobile ? "85%" : "100%"}
      >
        <div className="h-100 d-flex flex-column">
          <p className="text-muted mb-4" style={{ fontSize: isMobile ? '14px' : '16px' }}>
            Fill out the form below, and our team will get back to you as soon
            as possible.
          </p>

          <Form
            layout="vertical"
            ref={formRef}
            onFinish={sendEmail}
            className="flex-grow-1"
            size={isMobile ? "middle" : "large"}
          >
            <Row gutter={[16, 8]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="user_name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                  className="mb-3"
                >
                  <Input 
                    className="rounded" 
                    placeholder="Enter your full name"
                  />
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
                  className="mb-3"
                >
                  <Input
                    type="email"
                    className="rounded"
                    placeholder="Enter your email address"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 8]}>
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
                  className="mb-3"
                >
                  <Input
                    type="tel"
                    className="rounded"
                    placeholder="Enter your phone number"
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
                  className="mb-3"
                >
                  <Input 
                    className="rounded" 
                    placeholder="Enter your address"
                  />
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
                  className="mb-4"
                >
                  <Input.TextArea
                    rows={isMobile ? 4 : 5}
                    className="rounded"
                    placeholder="How can we help you today?"
                    style={{ resize: 'none' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
              <Button 
                onClick={onClose}
                size={isMobile ? "middle" : "large"}
              >
                Cancel
              </Button>
              <Button 
                htmlType="submit" 
                type="primary"
                size={isMobile ? "middle" : "large"}
                className="px-4"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>

      <ToastContainer 
        position={isMobile ? "top-center" : "top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          fontSize: isMobile ? '14px' : '16px'
        }}
      />

      <style jsx>{`
        .hover-link {
          transition: all 0.2s ease;
        }
        .hover-link:hover {
          opacity: 0.8;
          transform: translateX(2px);
        }
        
        @media (max-width: 767px) {
          .text-break {
            word-break: break-word;
            overflow-wrap: break-word;
          }
        }
        
        @media (max-width: 575px) {
          .container-fluid {
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;