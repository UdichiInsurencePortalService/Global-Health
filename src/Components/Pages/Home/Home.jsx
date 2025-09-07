import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import "swiper/css";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// import Insurance from "./Insurance/Insurance";
import Choose from "./ChooseUs/Choose";
import News from "./Blog-News/News";
import Seprate from "./Seprate Insurance/Seprate";
import Newsletter from "./Newsletter/Newsletter";
import Benefit from "../Home/Benifit/Benifit";

import image1 from "../../../assets/Bikeimages/health.png";

import support from "../../../assets/reuseimage/help-desk.png";
import policies from "../../../assets/reuseimage/job.png";
import paperless from "../../../assets/reuseimage/paperless (1).png";
import secure from "../../../assets/reuseimage/secure-payment.png";

import { Container, Row, Col, Card, Form } from "react-bootstrap";
import {
  FaIdCard,
  FaCar,
  FaMotorcycle,
  FaCalendarAlt,
  FaUser,
  FaHome,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaBolt,
  FaAward,
} from "react-icons/fa";
import caricon from "../../../../src/assets/Home/car-icons.png";
import bikeicon from "../../../../src/assets/Home/bike-icon.png";
import healthicon from "../../../../src/assets/Home/health-icon.png";
import homeicon from "../../../../src/assets/Home/home-icon.png";
import Products from "./Products/Products";
import Favourite from "./Favourite/Favourite";

const Home = () => {
  const handleSubmit = () => {
    switch (selectedCategory) {
      case "Car":
        navigate("/carinsurance");
        break;
      case "Bike":
        navigate("/bikeinsurance");
        break;
      case "Health":
        navigate("/healthinsurance");
        break;
      case "Home":
        navigate("/homeinsurance");
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("Car");
  const [focusField, setFocusField] = useState(null);
  const [bikeInsuranceType, setBikeInsuranceType] = useState(null);

  const trustData = [
    {
      img: support,
      title: "24x7 Support",
      description:
        "Get round-the-clock assistance for all your insurance queries and claims.",
    },
    {
      img: policies,
      title: "Instant Policy",
      description:
        "Buy and download your policy instantly with just a few clicks.",
    },
    {
      img: paperless,
      title: "100% Paperless",
      description:
        "Experience a completely digital process – no paperwork needed.",
    },
    {
      img: secure,
      title: "Secure Payments",
      description: "All transactions are encrypted and completely secure.",
    },
  ];

  const categories = [
    { name: "Car", icon: caricon, link: "/carinsurance" },
    { name: "Bike", icon: bikeicon, link: "/Bikeinsurance" },
    { name: "Health", icon: healthicon, link: "/Healthinsurance" },
    { name: "Home", icon: homeicon, link: "/Homeinsurance" },
  ];

  const whyChooseUsFeatures = [
    { icon: FaShieldAlt, text: "Compare 20+ insurers", color: "#3498db" },
    { icon: FaBolt, text: "Instant policy issuance", color: "#e74c3c" },
    { icon: FaCheckCircle, text: "Expert claim assistance", color: "#27ae60" },
    { icon: FaAward, text: "Lowest premium guarantee", color: "#f39c12" },
  ];

  const renderFormFields = () => {
    switch (selectedCategory) {
      case "Car":
        return (
          <>
            <Col xl={5} lg={5} md={6} sm={12} className="mb-3 mb-md-0">
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                  <FaIdCard className="d-none d-sm-inline" />
                  <span className="fs-6 fs-sm-5">Mobile Number</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile No."
                  className="py-2 py-md-3 rounded-lg text-center fs-6"
                  style={{ fontSize: "14px" }}
                  onFocus={() => setFocusField("mobile")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
            <Col xl={5} lg={5} md={6} sm={12}>
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                  <FaCar className="d-none d-sm-inline" />
                  <span className="fs-6 fs-sm-5">Car Registration</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Eg. TN10AB1234"
                  className="py-2 py-md-3 rounded-lg text-center fs-6"
                  style={{ fontSize: "14px" }}
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
            <Col xl={5} lg={5} md={6} sm={12} className="mb-3 mb-md-0">
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                  <FaMotorcycle className="d-none d-sm-inline" />
                  <span className="fs-6 fs-sm-5">Bike Model</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Bike Model"
                  className="py-2 py-md-3 rounded-lg text-center fs-6"
                  style={{ fontSize: "14px" }}
                  onFocus={() => setFocusField("bikeModel")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
            <Col xl={5} lg={5} md={6} sm={12}>
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                  <FaCalendarAlt className="d-none d-sm-inline" />
                  <span className="fs-6 fs-sm-5">Year of Manufacture</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Year"
                  className="py-2 py-md-3 rounded-lg text-center fs-6"
                  style={{ fontSize: "14px" }}
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
            <Col xl={5} lg={5} md={6} sm={12} className="mb-3 mb-md-0">
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                  <FaUser className="d-none d-sm-inline" />
                  <span className="fs-6 fs-sm-5">Your Age</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Age"
                  className="py-2 py-md-3 rounded-lg text-center fs-6"
                  style={{ fontSize: "14px" }}
                  onFocus={() => setFocusField("healthAge")}
                  onBlur={() => setFocusField(null)}
                />
              </Form.Group>
            </Col>
            <Col xl={5} lg={5} md={6} sm={12}>
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                  <FaIdCard className="d-none d-sm-inline" />
                  <span className="fs-6 fs-sm-5">Mobile Number</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Contact Number"
                  className="py-2 py-md-3 rounded-lg text-center fs-6"
                  style={{ fontSize: "14px" }}
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
            <Col xl={5} lg={5} md={6} sm={12} className="mb-3 mb-md-0">
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                  <FaHome className="d-none d-sm-inline" />
                  <span className="fs-6 fs-sm-5">Property Type</span>
                </Form.Label>
                <Form.Select
                  className="py-2 py-md-3 rounded-lg text-center fs-6"
                  style={{ fontSize: "14px" }}
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
            <Col xl={5} lg={5} md={6} sm={12}>
              <Form.Group className="position-relative text-center">
                <Form.Label className="fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                  <FaMapMarkerAlt className="d-none d-sm-inline" />
                  <span className="fs-6 fs-sm-5">Property Value</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Approximate Value (₹)"
                  className="py-2 py-md-3 rounded-lg text-center fs-6"
                  style={{ fontSize: "14px" }}
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
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .insurance-finder {
          font-family: 'Inter', sans-serif;
        }
        
        .display-4 {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
        }
        
        .lead {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.6;
        }
        
        @media (max-width: 576px) {
          .display-4 {
            font-size: 2rem !important;
            line-height: 1.2;
          }
          
          .lead {
            font-size: 1rem !important;
            line-height: 1.5;
          }
          
          .badge {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.8rem !important;
          }
        }
        
        @media (min-width: 577px) and (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
            line-height: 1.3;
          }
          
          .lead {
            font-size: 1.1rem !important;
          }
        }
      `}</style>

      <div
        className="insurance-finder position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          padding: "2rem 0",
        }}
      >
        {/* Animated Background Elements */}
        <div
          className="position-absolute w-100 h-100"
          style={{ top: 0, left: 0, zIndex: 1 }}
        >
          <motion.div
            className="position-absolute rounded-circle d-none d-md-block"
            style={{
              width: "200px",
              height: "200px",
              background: "rgba(255,255,255,0.1)",
              top: "10%",
              right: "10%",
            }}
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="position-absolute rounded-circle d-none d-lg-block"
            style={{
              width: "150px",
              height: "150px",
              background: "rgba(255,255,255,0.08)",
              bottom: "20%",
              left: "5%",
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Mobile background elements */}
          <motion.div
            className="position-absolute rounded-circle d-block d-md-none"
            style={{
              width: "80px",
              height: "80px",
              background: "rgba(255,255,255,0.1)",
              top: "15%",
              right: "5%",
            }}
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <Container className="position-relative px-3 px-md-4" style={{ zIndex: 2 }}>
          {/* ======= IMPROVED HEADER SECTION ======= */}
          <Row className="align-items-center mb-4 mb-lg-5">
            {/* Left Side - Main Content */}
            <Col lg={8} md={7} className="mb-4 mb-md-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.h1
                  className="display-4 fw-bold mb-3 mb-md-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                    lineHeight: "1.2",
                  }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      background: "linear-gradient(90deg, #fff, #f8f9fa, #fff)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Insure with Confidence,
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-warning"
                  >
                    Live Without Worries.
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="lead mb-3 mb-md-4 text-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ 
                    fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                    lineHeight: "1.6"
                  }}
                >
                 Compare top insurers. Get your best deal—fast
                  <motion.span
                    className="fw-bold text-warning"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                  </motion.span>{" "}
                </motion.p>

                <motion.div
                  className="d-flex flex-wrap gap-2 gap-md-3 mb-3 mb-md-4 justify-content-center justify-content-md-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {["Trusted by 10M+", "5-Star Rated", "Quick Claims"].map(
                    (badge, index) => (
                      <motion.div
                        key={badge}
                        className="badge bg-light text-primary rounded-pill"
                        style={{
                          fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
                          padding: "0.4rem 0.8rem",
                          fontWeight: "600"
                        }}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {badge}
                      </motion.div>
                    )
                  )}
                </motion.div>
              </motion.div>
            </Col>

            {/* Right Side - Why Choose Us Card */}
            <Col lg={4} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card
                  className="border-0 shadow-lg overflow-hidden mx-auto"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    maxWidth: "350px",
                  }}
                >
                  <Card.Body className="p-3">
                    <img
                      src={image1}
                      alt={"title"}
                      className="w-100 mb-3 rounded"
                      style={{
                        height: "clamp(200px, 30vw, 350px)",
                        objectFit: "cover",
                      }}
                    />

                    <div className="bg-yellow">
                      <motion.button
                        animate={{
                          scale: [1, 1.02, 1.0215, 1],
                          y: [0, -0.6, -0.64, 0],
                        }}
                        whileHover={{
                          scale: 1.06,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          backgroundColor: "#0066cc",
                          color: "white",
                          borderRadius: "15px",
                          padding: "12px 20px",
                          width: "100%",
                          border: "none",
                          fontWeight: "bold",
                          cursor: "pointer",
                          fontSize: "clamp(0.9rem, 2vw, 1rem)",
                          fontFamily: "'Inter', sans-serif"
                        }}
                        onClick={() => {
                          const awardsPageUrl = "/Award";
                          window.location.href = awardsPageUrl;
                          console.log("Button Clicked");
                        }}
                      >
                        Click Here
                      </motion.button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* ======= CATEGORY SELECTOR ======= */}
          <Row className="justify-content-center mb-4 mb-lg-5">
            <Col lg={10} xl={8}>
              <motion.div
                className="category-container d-flex flex-wrap justify-content-center gap-3 gap-md-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="position-relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {/* Highlighted animated icon when selected */}
                    {selectedCategory === category.name && (
                      <motion.div
                        className="category-highlight d-none d-sm-block"
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: -30, opacity: 1 }}
                        style={{
                          position: "absolute",
                          top: -15,
                          left: "50%",
                          transform: "translateX(-50%)",
                          zIndex: 1,
                        }}
                      >
                        <motion.div
                          className="rounded-circle d-flex align-items-center justify-content-center bg-warning"
                          style={{ width: 40, height: 40 }}
                          animate={{ y: [0, -3, 0], scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <motion.img
                            src={category.icon}
                            alt={category.name}
                            width="24"
                            height="24"
                            animate={
                              selectedCategory === category.name
                                ? ["Car", "Bike", "Travel"].includes(
                                    category.name
                                  )
                                  ? {
                                      y: [0, -5, 0],
                                      scale: [1, 1.05, 1],
                                      rotate: [0, 1, -1, 0],
                                    }
                                  : { scale: [1, 1.2, 1] }
                                : {}
                            }
                            transition={
                              ["Car", "Bike", "Travel"].includes(category.name)
                                ? {
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut",
                                  }
                                : { duration: 0.4, ease: "easeOut" }
                            }
                          />
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Icon button for category */}
                    <motion.div
                      className={`category-item d-flex align-items-center justify-content-center ${
                        selectedCategory === category.name
                          ? "border-warning bg-white"
                          : "border-white bg-white"
                      }`}
                      style={{
                        cursor: "pointer",
                        width: "clamp(60px, 12vw, 80px)",
                        height: "clamp(60px, 12vw, 80px)",
                        borderRadius: "50%",
                        border: "3px solid",
                        boxShadow:
                          selectedCategory === category.name
                            ? "0 8px 25px rgba(255, 193, 7, 0.3)"
                            : "0 4px 15px rgba(255,255,255,0.2)",
                      }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 8px 25px rgba(255,255,255,0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <motion.img
                        src={category.icon}
                        alt={category.name}
                        style={{
                          width: "clamp(24px, 5vw, 36px)",
                          height: "clamp(24px, 5vw, 36px)",
                        }}
                        whileHover={{ rotate: 5 }}
                      />
                    </motion.div>

                    {/* Category label below icon */}
                    <div className="text-center mt-2 mt-md-3">
                      <small 
                        className="fw-bold text-white bg-dark bg-opacity-50 px-2 py-1 rounded"
                        style={{
                          fontSize: "clamp(0.7rem, 1.8vw, 0.85rem)",
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        {category.name}
                      </small>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          </Row>

          {/* ======= FORM SECTION ======= */}
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="border-0 shadow-lg rounded-4 overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Card.Body className="p-3 p-md-4 p-lg-5">
                      <Row className="g-3 g-md-4 justify-content-center">
                        {/* Dynamic form fields */}
                        {renderFormFields()}

                        {/* Submit Button */}
                        <Col
                          lg={12}
                          className="d-flex align-items-end justify-content-center mt-3 mt-md-4"
                        >
                          <motion.button
                            className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-3 rounded-3 fw-bold"
                            style={{
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                              border: "none",
                              fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                              fontFamily: "'Inter', sans-serif",
                              maxWidth: "500px",
                              margin: "0 auto"
                            }}
                            whileHover={{
                              scale: 1.02,
                              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                          >
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              View Prices & Compare →
                            </motion.span>
                          </motion.button>
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

      {/* Rest of the components remain the same */}
      <div className="py-3">
        <Seprate />
      </div>

      <div className="">
        <Favourite />
      </div>

      <div className="py-3">
        <Benefit />
      </div>

      <div className="">
        <Products />
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