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

import React, { useState, useRef } from "react";
import { Drawer, Form, Input, Row, Col, Button } from "antd";
import emailjs from "@emailjs/browser";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../errortoast"; // You'll need to adjust this import path

const Footer = () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);

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
    { label: "Customer Support", action: "drawer" }, // Changed to action instead of path
  ];

  return (
    <div className="container-fluid p-0 bg-primary text-white">
      <footer className="text-white text-center text-lg-start p-4">
        <div className="container py-4">
          <div className="row gy-4">
            {/* Logo Section */}
            <div className="col-lg-3 col-md-6 text-center">
              <div
                className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto shadow"
                style={{ width: "130px", height: "130px" }}
              >
                <img
                  src={logo}
                  width={100}
                  alt="Global Health & Allied Insurances"
                />
              </div>
              <p className="mt-3 mb-1">Protect What Matters Most</p>
              <div className="d-flex justify-content-center gap-3 mt-2">
                <a href="#" className="text-white fs-4">
                  <FaFacebookSquare />
                </a>
                <a href="#" className="text-white fs-4">
                  <FaInstagram />
                </a>
                <a href="#" className="text-white fs-4">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Products Section */}
            <div className="col-lg-3 col-md-6">
              <h5 className="text-uppercase mb-3">Products</h5>
              <ul className="list-unstyled">
                {Links1.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-white text-decoration-none d-flex align-items-center mb-2"
                    >
                      <AiFillCaretRight className="me-2" /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links Section */}
            <div className="col-lg-3 col-md-6">
              <h5 className="text-uppercase mb-3">Useful Links</h5>
              <ul className="list-unstyled">
                {Links.map(({ label, path, action }) => (
                  <li key={label}>
                    {action === "drawer" ? (
                      <button
                        onClick={showDrawer}
                        className="text-white text-decoration-none d-flex align-items-center mb-2 bg-transparent border-0 p-0"
                        style={{ cursor: "pointer" }}
                      >
                        <AiFillCaretRight className="me-2" /> {label}
                      </button>
                    ) : (
                      <Link
                        to={path}
                        className="text-white text-decoration-none d-flex align-items-center mb-2"
                      >
                        <AiFillCaretRight className="me-2" /> {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-lg-3 col-md-6">
              <h5 className="text-uppercase mb-3">Contact</h5>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex align-items-start">
                  <FaMapMarkerAlt className="me-2 mt-z1" />
                  <span>
                    Head Office: P.O. Box 556, Postal Code 103, Muscat,
                    Sultanate of Oman
                  </span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <FaPhone className="me-2" /> 22-36-44-44
                </li>
                <li className="d-flex align-items-center">
                  <FaEnvelope className="me-2" /> globalhealth235@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center pt-3 border-top border-light mt-3">
          © 2025 Global Health & Allied Insurance. All rights reserved.
        </div>
      </footer>

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
            layout="vertical"
            ref={formRef}
            onFinish={sendEmail}
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
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>

      <ToastContainer />
    </div>
  );
};

export default Footer;
