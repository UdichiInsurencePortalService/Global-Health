// import { useState, useRef } from "react";
// import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Navbar.css";
// import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { PlusOutlined } from "@ant-design/icons";
// import { Drawer, Form, Input, Row, Col } from "antd";
// import emailjs from "@emailjs/browser";
// import logo from "../../assets/logo-main-.png";
// import { ToastContainer, toast } from 'react-toastify';


// const { Item } = Form;

// const Header = () => {
//   const notify = () => toast("Thank You For Contact Us");

//   const formRef = useRef(null);
//   const [expanded, setExpanded] = useState(false);
//   const [showProduct, setShowProduct] = useState(false);
//   const [showPolicy, setShowPolicy] = useState(false);
//   const [showCustomer, setShowCustomer] = useState(false);
//   const [open, setOpen] = useState(false);

//   const showDrawer = () => setOpen(true);
//   const onClose = () => setOpen(false);

//   const sendEmail = (values) => {
//     emailjs
//       .send("service_la8diqr", "template_qhn3bt3", values, "_CVqq1nmrbE6BhO0x")
//       .then(
//         () => {
//           console.log("SUCCESS!");
//           onClose();
//         },
//         (error) => {
//           console.log("FAILED...", error.text);
//         }
//       );
//   };

//   return (
//     <Navbar expand="lg" bg="white" variant="light" classNameName="shadow-sm py-3 sticky-top" expanded={expanded}>
//       <Container>
//         {/* Logo */}
//         <Navbar.Brand as={Link} to="/" classNameName="fw-bold fs-3 text-decoration-none text-orange d-flex align-items-center">
//           <img
//             classNameName="img-fluid"
//             src={logo}
//             alt="logo"
//             style={{ height: "155px", objectFit: "contain", background: "transparent", position: "absolute" }}
//           />
//         </Navbar.Brand>

//         {/* Mobile Toggle Button */}
//         <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(!expanded)} />

//         {/* Navbar Items */}
//         <Navbar.Collapse id="navbar-nav">
//           <Nav classNameName="ms-auto">
//             <Nav.Link classNameName="navbar-design nav-link-hover" as={Link} to="/">
//               Home
//             </Nav.Link>

//             {/* Product Dropdown */}
//             <NavDropdown
//   classNameName="navbar-design nav-dropdown-hover"
//   title="Product"
//   id="product-dropdown"
//   show={showProduct}
//   onMouseEnter={() => setShowProduct(true)}
//   onMouseLeave={() => setShowProduct(false)}
// >
//   <div classNameName="dropdown-container">
//     <div classNameName="dropdown-section">
//       <h6 classNameName="dropdown-heading">Individual Insurance</h6>
//       <NavDropdown.Item as={Link} to="/product">Car Insurance</NavDropdown.Item>
//       <NavDropdown.Item as={Link} to="/individual-life">Life Insurance</NavDropdown.Item>
//       <NavDropdown.Item as={Link} to="/individual-health">Health Insurance</NavDropdown.Item>
//       <NavDropdown.Item as={Link} to="/individual-auto">Auto Insurance</NavDropdown.Item>
//       <NavDropdown.Item as={Link} to="/individual-home">Home Insurance</NavDropdown.Item>
//     </div>
//     <div classNameName="dropdown-section">
//       <h6 classNameName="dropdown-heading">Business Insurance</h6>
//       <NavDropdown.Item as={Link} to="/business-commercial">Commercial Insurance</NavDropdown.Item>
//       <NavDropdown.Item as={Link} to="/business-liability">Liability Insurance</NavDropdown.Item>
//       <NavDropdown.Item as={Link} to="/business-property">Property Insurance</NavDropdown.Item>
//     </div>
//   </div>
// </NavDropdown>




//             {/* Policy Details Dropdown */}
//             <NavDropdown
//               classNameName="navbar-design nav-dropdown-hover"
//               title="Policy Details"
//               id="policy-dropdown"
//               show={showPolicy}
//               onMouseEnter={() => setShowPolicy(true)}
//               onMouseLeave={() => setShowPolicy(false)}
//             >
//               <NavDropdown.Item as={Link} to="/policy-details">View Policy Details</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/coverage">Coverage</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/payment">Payment Information</NavDropdown.Item>
//             </NavDropdown>

//             {/* Claims */}
//             <Nav.Link classNameName="navbar-design nav-link-hover" as={Link} to="/claims">
//               Claims
//             </Nav.Link>

//             {/* Customer Support Dropdown */}
//             <NavDropdown
//               classNameName="navbar-design nav-dropdown-hover"
//               title="Customer Support"
//               id="customer-dropdown"
//               show={showCustomer}
//               onMouseEnter={() => setShowCustomer(true)}
//               onMouseLeave={() => setShowCustomer(false)}
//             >
//               <NavDropdown.Item as={Link} to="#">
//                 <FontAwesomeIcon icon={faEnvelope} classNameName="me-2" />
//                 globalhealth235@gmail.com
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="#">
//                 <FontAwesomeIcon icon={faPhone} classNameName="me-2" />
//                 9205401500
//               </NavDropdown.Item>

//               {/* Buttons Section */}
//               <div classNameName="d-flex flex-column gap-2 mt-2">
//                 {/* WhatsApp Button */}
//                 <Button
//                   style={{ fontSize: "12px" }}
//                   onClick={() => window.open("https://wa.me/9928151651?text=Hello%20Global%20India!", "_blank")}
//                 >
//                   Contact via WhatsApp
//                 </Button>

//                 {/* Contact Button */}
//                 <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
//                   Contact Us
//                 </Button>
//               </div>
//             </NavDropdown>
//           </Nav>

//           {/* Log In Button */}
//           <Button as={Link} to="/login" classNameName="ms-lg-3 rounded-pill px-4">
//             Log In
//           </Button>
//         </Navbar.Collapse>
//       </Container>



//       <Drawer title="Create a New Account" width={600} onClose={onClose} open={open}>
//       <h1 style={{ color: '#007bff', fontSize: '2.5rem', fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '20px' }}>
//         We’re Here to Help! Let Us Know Your Query
//       </h1>
//       <p style={{ color: '#555', fontSize: '1.2rem', fontFamily: 'Segoe UI, sans-serif', textAlign: 'center', marginBottom: '40px' }}>
//         Fill out the form below, and our team will get back to you as soon as possible.
//       </p>

//         <Form layout="vertical" ref={formRef} onFinish={sendEmail} classNameName="p-50">
//           <Row gutter={16}>
//             <Col span={12}>
//               <Item name="user_name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
//                 <Input placeholder="Enter your name" />
//               </Item>
//             </Col>
//             <Col span={12}>
//               <Item name="user_email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}>
//                 <Input type="email" placeholder="Enter your email" />
//               </Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Item name="user_number" label="Number" rules={[{ required: true, message: "Please enter your number" }]}>
//                 <Input type="number" placeholder="Enter your number" />
//               </Item>
//             </Col>
//             <Col span={12}>
//               <Item name="user_address" label="Address" rules={[{ required: true, message: "Please enter your address" }]}>
//                 <Input placeholder="Enter your address" />
//               </Item>
//             </Col>
//           </Row>
//          
//               <Item name="message" label="Description" rules={[{ required: true, message: "Please enter a description" }]}>
//                 <Input.TextArea rows={4} placeholder="Enter your message" />
//               </Item>
//             </Col>
//           </Row>

//           {/* CANCEL & SUBMIT BUTTONS BELOW FORM */}
//           <div classNameName="d-flex justify-content-end gap-2 mt-4">
//             <Button onClick={onClose}>Cancel</Button>
//             <Button type="primary" htmlType="submit" onClick={notify}>
//               Submit
//               <ToastContainer/>
//             </Button>
//           </div>
//         </Form>
//       </Drawer>
//     </Navbar>
//   );
// };

// export default Header;


import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Drawer, Form, Input, Row, Col, Button } from "antd";



const Navbar = () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const sendEmail = (values) => {
    emailjs
      .send("service_la8diqr", "template_qhn3bt3", values, "_CVqq1nmrbE6BhO0x")
      .then(
        () => {
          console.log("SUCCESS!");
          onClose();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <header className="header">
        <div className="topbar" style={{ backgroundColor: "rgb(172, 57, 19)", color: "white" }}>
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
                <ul className="top-contact" style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ color: "white" }}>
                    <i className="fa fa-phone" style={{ marginRight: "5px" }}></i> 9205401500
                  </li>
                  <li style={{ color: "white" }}>
                    <i className="fa fa-envelope" style={{ marginRight: "5px",color:'white' }}></i>
                    <Link to="mailto:globalhealth235@gmail.com" style={{ color: "white", textDecoration: "none" }}>
                      globalhealth235@gmail.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

          <div className="header-inner" 
  style={{
    position: "sticky",
    top: "0",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease-in-out",
    width: "100%", // Ensures it spans the entire width
  }}
>

            <div className="container">
              <div className="inner">
                <div className="row align-items-center">
                  <div className="col-lg-4 col-md-3 col-12">
                    <div className="logo">
                      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={logo}
                          alt="Logo"
                          className="img-fluid"
                          style={{ maxHeight: "150px", width: "auto", objectFit: "contain", position: "absolute" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-9 col-12">
                    <div className="main-menu">
                      <nav className="navigation">
                        <ul className="nav menu" style={{ display: "flex", gap: "20px", listStyle: "none", padding: 0, margin: 0 }}>
                          <li className="active">
                            <Link to="/" style={{ textDecoration: "none" }}>Home</Link>
                          </li>
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
                          <li><Link to="#" style={{ textDecoration: "none" }}>Policy</Link></li>
                          <li><Link to="#" style={{ textDecoration: "none" }}>Claims</Link></li>
                          <li><Link to="/" style={{ textDecoration: "none" }} onClick={showDrawer}>Contact Us</Link></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-lg-2 col-12">
                    <div className="get-quote">
                      <Link to="/login" className="btn" style={{ padding: "10px 20px", borderRadius: "5px",fontFamily:'cursive',border:'1px solid white' }}>Log In</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </header>

      <Drawer title="We’re Here to Help! Let Us Know Your Query" width={600} onClose={onClose} open={open}>
        <p>Fill out the form below, and our team will get back to you as soon as possible.</p>
        <Form layout="vertical" ref={formRef} onFinish={sendEmail}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="user_name" label="Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="user_email" label="Email" rules={[{ required: true }]}><Input type="email" /></Form.Item></Col>
            <Col span={12}><Form.Item name="user_address" label="Adddress" rules={[{ required: true }]}><Input type="address" /></Form.Item></Col>
            <Col span={12}><Form.Item name="user_number" label="Number" rules={[{ required: true }]}><Input type="Number" /></Form.Item></Col>

          </Row>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </Drawer>
    </>
  );
};
export default Navbar;

