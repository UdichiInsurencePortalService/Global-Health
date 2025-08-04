// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Home.css";
// import "swiper/css";
// import "swiper/css/pagination";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// // import Insurance from "./Insurance/Insurance";
// import Choose from "./ChooseUs/Choose";
// import News from "./Blog-News/News";
// import Seprate from "./Seprate Insurance/Seprate";
// import Newsletter from "./Newsletter/Newsletter";
// import Benefit from "../Home/Benifit/Benifit";

// import support from "../../../assets/reuseimage/help-desk.png";
// import policies from "../../../assets/reuseimage/job.png";
// import paperless from "../../../assets/reuseimage/paperless (1).png";
// import secure from "../../../assets/reuseimage/secure-payment.png";

// import { Container, Row, Col, Card, Form } from "react-bootstrap";
// import {
//   FaIdCard,
//   FaCar,
//   FaMotorcycle,
//   FaCalendarAlt,
//   FaUser,
//   FaHome,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import caricon from "../../../../src/assets/Home/car-icons.png";
// import bikeicon from "../../../../src/assets/Home/bike-icon.png";
// import healthicon from "../../../../src/assets/Home/health-icon.png";
// import lifeicon from "../../../../src/assets/Home/life-icon.png";
// import homeicon from "../../../../src/assets/Home/home-icon.png";
// import travelicon from "../../../../src/assets/Home/travel-icon.png";
// import Products from "./Products/Products";
// import { PenBox } from "lucide-react";
// import Favourite from "./Favourite/Favourite";
// import InsuranceBanner from "./InsuranceBanner/InsuranceBanner.JSX";

// const Home = () => {
//   const handleSubmit = () => {
//     switch (selectedCategory) {
//       case "Car":
//         navigate("/carinsurance");
//         break;
//       case "Bike":
//         navigate("/bikeinsurance");
//         break;
//       case "Health":
//         navigate("/healthinsurance");
//         break;
//       case "Home":
//         navigate("/homeinsurance");
//         break;
//       default:
//         break;
//     }
//   };

//   const navigate = useNavigate();

//   const [selectedCategory, setSelectedCategory] = useState("Car");
//   const [focusField, setFocusField] = useState(null);
//   const [bikeInsuranceType, setBikeInsuranceType] = useState(null);

//   const trustData = [
//     {
//       img: support,
//       title: "24x7 Support",
//       description:
//         "Get round-the-clock assistance for all your insurance queries and claims.",
//     },
//     {
//       img: policies,
//       title: "Instant Policy",
//       description:
//         "Buy and download your policy instantly with just a few clicks.",
//     },
//     {
//       img: paperless,
//       title: "100% Paperless",
//       description:
//         "Experience a completely digital process – no paperwork needed.",
//     },
//     {
//       img: secure,
//       title: "Secure Payments",
//       description: "All transactions are encrypted and completely secure.",
//     },
//   ];

//   const categories = [
//     { name: "Car", icon: caricon, link: "/carinsurance" },
//     { name: "Bike", icon: bikeicon, link: "/Bikeinsurance" },
//     { name: "Health", icon: healthicon, link: "/Healthinsurance" },
//     { name: "Home", icon: homeicon, link: "/Homeinsurance" },
//   ];

//   const renderFormFields = () => {
//     switch (selectedCategory) {
//       case "Car":
//         return (
//           <>
//             <Col lg={5} md={5} sm={12} className="mb-3 mb-md-0">
//               <Form.Group className="position-relative text-center">
//                 <Form.Label className="fw-bold text-secondary">
//                   <FaIdCard className="me-2" /> Mobile Number
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Mobile No."
//                   className="py-2 rounded-lg text-center"
//                   onFocus={() => setFocusField("mobile")}
//                   onBlur={() => setFocusField(null)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col lg={5} md={5} sm={12}>
//               <Form.Group className="position-relative text-center">
//                 <Form.Label className="fw-bold text-secondary">
//                   <FaCar className="me-2" /> Car Registration
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Eg. TN10AB1234"
//                   className="py-2 rounded-lg text-center"
//                   onFocus={() => setFocusField("registration")}
//                   onBlur={() => setFocusField(null)}
//                 />
//               </Form.Group>
//             </Col>
//           </>
//         );
//       case "Bike":
//         return (
//           <>
//             <Col lg={5} md={5} sm={12} className="mb-3 mb-md-0">
//               <Form.Group className="position-relative text-center">
//                 <Form.Label className="fw-bold text-secondary">
//                   <FaMotorcycle className="me-2" /> Bike Model
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Bike Model"
//                   className="py-2 rounded-lg text-center"
//                   onFocus={() => setFocusField("bikeModel")}
//                   onBlur={() => setFocusField(null)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col lg={5} md={5} sm={12}>
//               <Form.Group className="position-relative text-center">
//                 <Form.Label className="fw-bold text-secondary">
//                   <FaCalendarAlt className="me-2" /> Year of Manufacture
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Year"
//                   className="py-2 rounded-lg text-center"
//                   onFocus={() => setFocusField("bikeYear")}
//                   onBlur={() => setFocusField(null)}
//                 />
//               </Form.Group>
//             </Col>
//           </>
//         );
//       case "Health":
//         return (
//           <>
//             <Col lg={5} md={5} sm={12} className="mb-3 mb-md-0">
//               <Form.Group className="position-relative text-center">
//                 <Form.Label className="fw-bold text-secondary">
//                   <FaUser className="me-2" /> Your Age
//                 </Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="Enter Your Age"
//                   className="py-2 rounded-lg text-center"
//                   onFocus={() => setFocusField("healthAge")}
//                   onBlur={() => setFocusField(null)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col lg={5} md={5} sm={12}>
//               <Form.Group className="position-relative text-center">
//                 <Form.Label className="fw-bold text-secondary">
//                   <FaIdCard className="me-2" /> Mobile Number
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Your Contact Number"
//                   className="py-2 rounded-lg text-center"
//                   onFocus={() => setFocusField("healthMobile")}
//                   onBlur={() => setFocusField(null)}
//                 />
//               </Form.Group>
//             </Col>
//           </>
//         );

//       case "Home":
//         return (
//           <>
//             <Col lg={5} md={5} sm={12} className="mb-3 mb-md-0">
//               <Form.Group className="position-relative text-center">
//                 <Form.Label className="fw-bold text-secondary">
//                   <FaHome className="me-2" /> Property Type
//                 </Form.Label>
//                 <Form.Select
//                   className="py-2 rounded-lg text-center"
//                   onFocus={() => setFocusField("homeType")}
//                   onBlur={() => setFocusField(null)}
//                 >
//                   <option value="">Select Property Type</option>
//                   <option value="apartment">Apartment</option>
//                   <option value="house">Independent House</option>
//                   <option value="villa">Villa</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col lg={5} md={5} sm={12}>
//               <Form.Group className="position-relative text-center">
//                 <Form.Label className="fw-bold text-secondary">
//                   <FaMapMarkerAlt className="me-2" /> Property Value
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Approximate Value (₹)"
//                   className="py-2 rounded-lg text-center"
//                   onFocus={() => setFocusField("homeValue")}
//                   onBlur={() => setFocusField(null)}
//                 />
//               </Form.Group>
//             </Col>
//           </>
//         );

//       default:
//         return <></>;
//     }
//   };

//   return (
//     <>
//       <div className="insurance-finder bg-light" style={{ padding: "2rem 0" }}>
//   <Container>
//     {/* ======= HEADER SECTION ======= */}
//     <Row className="justify-content-center mb-5">
//       <Col md={8} className="text-center">
//         <h2 className="fw-bold mb-4">
//           Insure with Confidence, Live Without Worries.
//         </h2>
//         <p className="text-muted">
//           Compare quotes from top insurers and save up to 85% on premiums
//         </p>
//       </Col>
//       <Col md={4}>
//                 <Card className="h-100 shadow-lg border-0 rounded-lg">
//                   <Card.Body className="p-4">
//                     {/* 🔹 Custom content for right side */}
//                     <h5 className="fw-bold mb-3">Why Choose Us?</h5>
//                     <ul className="list-unstyled text-muted">
//                       <li>✔️ Compare 20+ insurers</li>
//                       <li>✔️ Instant policy issuance</li>
//                       <li>✔️ Expert claim assistance</li>
//                       <li>✔️ Lowest premium guarantee</li>
//                     </ul>

//                     {/* 🔹 Optional image */}
//                     <img
//                       src="/images/insurance-tips.png"
//                       alt="Tips"
//                       className="img-fluid mt-3"
//                     />
//                   </Card.Body>
//                 </Card>
//               </Col>
//     </Row>

//     {/* ======= CATEGORY SELECTOR ======= */}
//     <Row className="justify-content-center mb-5">
//       <Col lg={6}>
//         <div className="category-container d-flex flex-wrap justify-content-center gap-4">
//           {categories.map((category) => (
//             <div key={category.name} className="position-relative">
//               {/* 🔹 Highlighted animated icon when selected */}
//               {selectedCategory === category.name && (
//                 <motion.div
//                   className="category-highlight"
//                   initial={{ y: 0, opacity: 0 }}
//                   animate={{ y: -30, opacity: 1 }}
//                   style={{
//                     position: "absolute",
//                     top: -15,
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     zIndex: 1,
//                   }}
//                 >
//                   <motion.div
//                     className="rounded-circle d-flex align-items-center justify-content-center"
//                     style={{ width: 40, height: 40 }}
//                     animate={{ y: [0, -1, 0], scale: [1, 1.1, 1] }}
//                     transition={{ repeat: Infinity, duration: 1.5 }}
//                   >
//                     {/* 🔹 Animated icon image */}
//                     <motion.img
//                       src={category.icon}
//                       alt={category.name}
//                       width="32"
//                       height="32"
//                       animate={
//                         selectedCategory === category.name
//                           ? ["Car", "Bike", "Travel"].includes(category.name)
//                             ? {
//                                 y: [0, -5, 0],
//                                 scale: [1, 1.05, 1],
//                                 rotate: [0, 1, -1, 0],
//                               }
//                             : { scale: [1, 1.2, 1] }
//                           : {}
//                       }
//                       transition={
//                         ["Car", "Bike", "Travel"].includes(category.name)
//                           ? {
//                               repeat: Infinity,
//                               duration: 2,
//                               ease: "easeInOut",
//                             }
//                           : { duration: 0.4, ease: "easeOut" }
//                       }
//                     />
//                   </motion.div>
//                 </motion.div>
//               )}

//               {/* 🔹 Icon button for category */}
//               <motion.div
//                 className={`category-item d-flex align-items-center justify-content-center ${
//                   selectedCategory === category.name
//                     ? "border-primary"
//                     : "border-secondary"
//                 }`}
//                 style={{
//                   cursor: "pointer",
//                   width: 70,
//                   height: 70,
//                   borderRadius: "50%",
//                   border: "2px solid",
//                   background: "#fff",
//                 }}
//                 whileHover={{
//                   borderColor: "#3498db",
//                   boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setSelectedCategory(category.name)}
//               >
//                 <img
//                   src={category.icon}
//                   alt={category.name}
//                   width="32"
//                   height="32"
//                 />
//               </motion.div>

//               {/* 🔹 Category label below icon */}
//               <div className="text-center mt-2">
//                 <small className="fw-bold">{category.name}</small>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Col>
//     </Row>

//     {/* ======= FORM + RIGHT COLUMN SECTION ======= */}
//     <Row className="justify-content-center">
//       <Col md={10}>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={selectedCategory}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Row className="g-4">
//               {/* ✅ LEFT SIDE FORM (Col md=6) */}
//               <Col md={6}>
//                 <Card className="border-0 shadow-lg rounded-lg overflow-hidden">
//                   <Card.Body className="p-5">
//                     <Row className="g-4 justify-content-center">
//                       {/* 🔹 Your dynamic form fields */}
//                       {renderFormFields()}

//                       {/* 🔹 Submit Button */}
//                       <Col
//                         lg={12}
//                         className="d-flex align-items-end justify-content-center"
//                       >
//                         <motion.button
//                           className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-lg"
//                           style={{
//                             backgroundColor: "#3498db",
//                             color: "white",
//                             border: "none",
//                           }}
//                           whileHover={{
//                             scale: 1.05,
//                             backgroundColor: "#2980b9",
//                           }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={handleSubmit}
//                         >
//                           <span className="fw-bold">View Price</span>
//                         </motion.button>
//                       </Col>
//                     </Row>
//                   </Card.Body>
//                 </Card>
//               </Col>

//               {/* ✅ RIGHT SIDE EXTRA COLUMN (Col md=6) */}

//                           </Row>
//           </motion.div>
//         </AnimatePresence>
//       </Col>
//     </Row>
//   </Container>
// </div>

//       {/*  */}

//       <div className="py-3">
//         <Seprate />
//       </div>

//       {/*  */}
//       <InsuranceBanner />

//       <div className="py-3">
//         <Favourite />
//       </div>

//       <div className="py-3">
//         <Benefit />
//       </div>

//       <div className="py-3">
//         <Products />
//       </div>

//       {/* <div className="py-5">
//         <Insurance />
//       </div> */}

//       <div className="py-3">
//         <Choose />
//       </div>

//       <div className="">
//         <News />
//       </div>

//       <div className="py-5">
//         <Newsletter />
//       </div>
//     </>
//   );
// };

// export default Home;

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
import lifeicon from "../../../../src/assets/Home/life-icon.png";
import homeicon from "../../../../src/assets/Home/home-icon.png";
import travelicon from "../../../../src/assets/Home/travel-icon.png";
import Products from "./Products/Products";
import { PenBox } from "lucide-react";
import Favourite from "./Favourite/Favourite";
import InsuranceBanner from "./InsuranceBanner/InsuranceBanner.JSX";
import { Justify } from "react-bootstrap-icons";

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
      <div
        className="insurance-finder position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          padding: "4rem 0",
        }}
      >
        {/* Animated Background Elements */}
        <div
          className="position-absolute w-100 h-100"
          style={{ top: 0, left: 0, zIndex: 1 }}
        >
          <motion.div
            className="position-absolute rounded-circle"
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
            className="position-absolute rounded-circle"
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
        </div>

        <Container className="position-relative" style={{ zIndex: 2 }}>
          {/* ======= IMPROVED HEADER SECTION ======= */}
          <Row className="align-items-center mb-5">
            {/* Left Side - Main Content */}
            <Col lg={8} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.h1
                  className="display-4 fw-bold mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
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
                  className="lead mb-4 text-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ fontSize: "1.2rem" }}
                >
                  Compare quotes from top insurers and save up to{" "}
                  <motion.span
                    className="fw-bold text-warning"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    85%
                  </motion.span>{" "}
                  on premiums
                </motion.p>

                <motion.div
                  className="d-flex flex-wrap gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {["Trusted by 10M+", "5-Star Rated", "Quick Claims"].map(
                    (badge, index) => (
                      <motion.div
                        key={badge}
                        className="badge bg-light text-primary px-3 py-2 rounded-pill"
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
                  className="border-0 shadow-lg overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Card.Body className="p-3">
                    <img
                      src={image1}
                      alt={"title"}
                      className="w-100 mb-3 rounded"
                      style={{
                        height: "350px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="bg-yellow">
                      <motion.button
                        animate={{
                          scale: [1, 1.02, 1.0215, 1],
                          y: [0, -0.6, -0.64, 0], // 👈 floating effect
                        }}
                        whileHover={{
                          scale: 1.06, // 👈 hover zoom
                        }}
                        whileTap={{
                          scale: 0.95, // 👈 click shrink
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
                          padding: "10px 15px",
                          width: "100%",
                          border: "none",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const awardsPageUrl = "/Award";

                          // Open in same tab
                          window.location.href = awardsPageUrl;
                          // 👇 Add your logic here
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
          <Row className="justify-content-center mb-5">
            <Col lg={8}>
              <motion.div
                className="category-container d-flex flex-wrap justify-content-center gap-4"
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
                        className="category-highlight"
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
                        width: 80,
                        height: 80,
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
                        width="36"
                        height="36"
                        whileHover={{ rotate: 5 }}
                      />
                    </motion.div>

                    {/* Category label below icon */}
                    <div className="text-center mt-3">
                      <small className="fw-bold text-white bg-dark bg-opacity-50 px-2 py-1 rounded">
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
            <Col lg={8} md={10}>
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
                    <Card.Body className="p-5">
                      <Row className="g-4 justify-content-center">
                        {/* Dynamic form fields */}
                        {renderFormFields()}

                        {/* Submit Button */}
                        <Col
                          lg={12}
                          className="d-flex align-items-end justify-content-center"
                        >
                          <motion.button
                            className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-3 rounded-3 fw-bold"
                            style={{
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                              border: "none",
                              fontSize: "1.1rem",
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

      {/* <InsuranceBanner /> */}

      <div className="py-3">
        <Favourite />
      </div>

      <div className="py-3">
        <Benefit />
      </div>

      <div className="py-3">
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
