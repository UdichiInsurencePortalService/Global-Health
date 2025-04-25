import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import "swiper/css";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";

import Insurance from "./Insurance/Insurance";
import Choose from "./ChooseUs/Choose";
import News from "./Blog-News/News";
import Seprate from "./Seprate Insurance/Seprate";
import Newsletter from "./Newsletter/Newsletter";
import Benefit from "../Home/Benifit/Benifit";

import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { FaIdCard, FaCar, FaMotorcycle, FaCalendarAlt, FaUser, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import caricon from '../../../../src/assets/Home/car-icons.png';
import bikeicon from '../../../../src/assets/Home/bike-icon.png';
import healthicon from '../../../../src/assets/Home/health-icon.png';
import lifeicon from '../../../../src/assets/Home/life-icon.png';
import homeicon from '../../../../src/assets/Home/home-icon.png';
import travelicon from '../../../../src/assets/Home/travel-icon.png';
import Products from "./Products/Products";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Car");
  const [focusField, setFocusField] = useState(null);
  const [bikeInsuranceType, setBikeInsuranceType] = useState(null);


  const categories = [
    { name: "Car", icon: caricon },
    { name: "Bike", icon: bikeicon },
    { name: "Health", icon: healthicon },
    { name: "Home", icon: homeicon },
  ];

  const renderFormFields = () => {
    switch (selectedCategory) {
      case "Car":
        return (
          <>
            <Col lg={5} md={5} sm={12} className="mb-3 mb-md-0">
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary">
                  <FaIdCard className="me-2" /> Mobile Number
                </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Mobile No." 
                  className="py-2 rounded-lg text-center"
                  onFocus={() => setFocusField("mobile")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
            <Col lg={5} md={5} sm={12}>
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary">
                  <FaCar className="me-2" /> Car Registration
                </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Eg. TN10AB1234" 
                  className="py-2 rounded-lg text-center"
                  onFocus={() => setFocusField("registration")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
          </>
        );
      case "Bike":
        return (
          <>
            <Col lg={5} md={5} sm={12} className="mb-3 mb-md-0">
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary">
                  <FaMotorcycle className="me-2" /> Bike Model
                </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Bike Model" 
                  className="py-2 rounded-lg text-center"
                  onFocus={() => setFocusField("bikeModel")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
            <Col lg={5} md={5} sm={12}>
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary">
                  <FaCalendarAlt className="me-2" /> Year of Manufacture
                </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Year" 
                  className="py-2 rounded-lg text-center"
                  onFocus={() => setFocusField("bikeYear")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
          </>
        );
      case "Health":
        return (
          <>
            <Col lg={5} md={5} sm={12} className="mb-3 mb-md-0">
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary">
                  <FaUser className="me-2" /> Your Age
                </Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Enter Your Age" 
                  className="py-2 rounded-lg text-center"
                  onFocus={() => setFocusField("healthAge")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
            <Col lg={5} md={5} sm={12}>
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary">
                  <FaIdCard className="me-2" /> Mobile Number
                </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Your Contact Number" 
                  className="py-2 rounded-lg text-center"
                  onFocus={() => setFocusField("healthMobile")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
          </>
        );

      case "Home":
        return (
          <>
            <Col lg={5} md={5} sm={12} className="mb-3 mb-md-0">
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary">
                  <FaHome className="me-2" /> Property Type
                </Form.Label>
                <Form.Select 
                  className="py-2 rounded-lg text-center"
                  onFocus={() => setFocusField("homeType")}
                  onBlur={() => setFocusField(null)}
                >
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">Independent House</option>
                  <option value="villa">Villa</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={5} md={5} sm={12}>
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary">
                  <FaMapMarkerAlt className="me-2" /> Property Value
                </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Approximate Value (₹)" 
                  className="py-2 rounded-lg text-center"
                  onFocus={() => setFocusField("homeValue")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
          </>
        );
   
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="insurance-finder bg-light" style={{ padding: "3rem 0" }}>
        <Container className="">
          <Row className="justify-content-center mb-5">
            <Col md={8} className="text-center">
              <h2 className="fw-bold mb-4">Insure with Confidence, Live Without Worries.</h2>
              <p className="text-muted">Compare quotes from top insurers and save up to 85% on premiums</p>
            </Col>
          </Row>
          
          <Row className="justify-content-center mb-5">
            <Col lg={10}>
              <div className="category-container d-flex flex-wrap justify-content-center gap-4">
                {categories.map((category) => (
                  <div key={category.name} className="position-relative">
                    {selectedCategory === category.name && (
                      <motion.div
                        className="category-highlight"
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: -30, opacity: 1 }}
                        style={{
                          position: "absolute",
                          top: -15,
                          left: "50%",
                          transform: "translateX(-50%)",
                          zIndex: 1
                        }}
                      >
                        <motion.div
                          className=" rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 40, height: 40 }}
                          animate={{ 
                            y: [0, -1, 0], 
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 1.5
                          }}
                        >
                          {/* <img src={category.icon} alt={category.name} width="24" height="34" /> */}
                          <motion.img
  src={category.icon}
  alt={category.name}
  width="32"
  height="32"
  animate={
    selectedCategory === category.name
      ? ["Car", "Bike", "Travel"].includes(category.name)
        ? {
            y: [0, -5, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }
        : {
            scale: [1, 1.2, 1],
          }
      : {}
  }
  transition={
    ["Car", "Bike", "Travel"].includes(category.name)
      ? {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }
      : {
          duration: 0.4,
          ease: "easeOut",
        }
  }
/>
                        </motion.div>
                      </motion.div>
                    )}
                    
                    <motion.div
                      className={`category-item d-flex align-items-center justify-content-center ${
                        selectedCategory === category.name 
                          ? "border-primary" 
                          : "border-secondary"
                      }`}
                      style={{ 
                        cursor: "pointer",
                        width: 70, 
                        height: 70, 
                        borderRadius: "50%", 
                        border: "2px solid",
                        background: "#fff"
                      }}
                      whileHover={{ 
                        borderColor: "#3498db", 
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <img src={category.icon} alt={category.name} width="32" height="32" />
                    </motion.div>
                    
                    <div className="text-center mt-2">
                      <small className="fw-bold">{category.name}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col md={10}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg rounded-lg overflow-hidden">
                    <Card.Body className="p-5">
                      <Row className="g-4 justify-content-center">
                        {renderFormFields()}
                        <Col lg={2} md={2} sm={12} className="d-flex align-items-end">
                          <div className="w-100 text-center">
                            <Form.Label className="fw-bold text-secondary invisible">
                              Button
                            </Form.Label>
                            <motion.button
                              className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-lg"
                              style={{
                                backgroundColor: "#3498db",
                                color: "white",
                                border: "none",
                                position: "relative",
                              }}
                              whileHover={{ scale: 1.05, backgroundColor: "#2980b9" }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="fw-bold">View Price</span>
                            </motion.button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="py-3">
        <Seprate />
      </div>
      
      <div className="py-3">
        <Benefit />
      </div>

      <div className="py-3">
        <Products />
      </div>
      
      <div className="py-5">
        <Insurance />
      </div>
      
      <div className="py-3">
        <Choose />
      </div>
      
      <div className="">
        <News />
      </div>
      
      <div className="py-5">
        <Newsletter />
      </div>
    </>
  );
};

export default Home;