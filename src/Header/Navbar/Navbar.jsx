import { useState, useRef } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlusOutlined } from "@ant-design/icons";
import { Drawer, Form, Input, Row, Col } from "antd";
import emailjs from "@emailjs/browser";
import logo from "../../assets/logo-main-.png";

const { Item } = Form;

const Header = () => {
  const formRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [open, setOpen] = useState(false);

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
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-3 sticky-top" expanded={expanded}>
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-decoration-none text-orange d-flex align-items-center">
          <img
            className="img-fluid"
            src={logo}
            alt="logo"
            style={{ height: "155px", objectFit: "contain", background: "transparent", position: "absolute" }}
          />
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(!expanded)} />

        {/* Navbar Items */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navbar-design nav-link-hover" as={Link} to="/">
              Home
            </Nav.Link>

            {/* Product Dropdown */}
            <NavDropdown
  className="navbar-design nav-dropdown-hover"
  title="Product"
  id="product-dropdown"
  show={showProduct}
  onMouseEnter={() => setShowProduct(true)}
  onMouseLeave={() => setShowProduct(false)}
>
  <div className="dropdown-container">
    <div className="dropdown-section">
      <h6 className="dropdown-heading">Individual Insurance</h6>
      <NavDropdown.Item as={Link} to="/product">Car Insurance</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/individual-life">Life Insurance</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/individual-health">Health Insurance</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/individual-auto">Auto Insurance</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/individual-home">Home Insurance</NavDropdown.Item>
    </div>
    <div className="dropdown-section">
      <h6 className="dropdown-heading">Business Insurance</h6>
      <NavDropdown.Item as={Link} to="/business-commercial">Commercial Insurance</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/business-liability">Liability Insurance</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/business-property">Property Insurance</NavDropdown.Item>
    </div>
  </div>
</NavDropdown>




            {/* Policy Details Dropdown */}
            <NavDropdown
              className="navbar-design nav-dropdown-hover"
              title="Policy Details"
              id="policy-dropdown"
              show={showPolicy}
              onMouseEnter={() => setShowPolicy(true)}
              onMouseLeave={() => setShowPolicy(false)}
            >
              <NavDropdown.Item as={Link} to="/policy-details">View Policy Details</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/coverage">Coverage</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/payment">Payment Information</NavDropdown.Item>
            </NavDropdown>

            {/* Claims */}
            <Nav.Link className="navbar-design nav-link-hover" as={Link} to="/claims">
              Claims
            </Nav.Link>

            {/* Customer Support Dropdown */}
            <NavDropdown
              className="navbar-design nav-dropdown-hover"
              title="Customer Support"
              id="customer-dropdown"
              show={showCustomer}
              onMouseEnter={() => setShowCustomer(true)}
              onMouseLeave={() => setShowCustomer(false)}
            >
              <NavDropdown.Item as={Link} to="#">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                globalhealth235@gmail.com
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                9205401500
              </NavDropdown.Item>

              {/* Buttons Section */}
              <div className="d-flex flex-column gap-2 mt-2">
                {/* WhatsApp Button */}
                <Button
                  style={{ fontSize: "12px" }}
                  onClick={() => window.open("https://wa.me/9928151651?text=Hello%20Global%20India!", "_blank")}
                >
                  Contact via WhatsApp
                </Button>

                {/* Contact Button */}
                <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                  Contact Us
                </Button>
              </div>
            </NavDropdown>
          </Nav>

          {/* Log In Button */}
          <Button as={Link} to="/login" className="ms-lg-3 rounded-pill px-4">
            Log In
          </Button>
        </Navbar.Collapse>
      </Container>



      <Drawer title="Create a New Account" width={600} onClose={onClose} open={open}>
      <h1 style={{ color: '#007bff', fontSize: '2.5rem', fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '20px' }}>
        We’re Here to Help! Let Us Know Your Query
      </h1>
      <p style={{ color: '#555', fontSize: '1.2rem', fontFamily: 'Segoe UI, sans-serif', textAlign: 'center', marginBottom: '40px' }}>
        Fill out the form below, and our team will get back to you as soon as possible.
      </p>

        <Form layout="vertical" ref={formRef} onFinish={sendEmail} className="p-50">
          <Row gutter={16}>
            <Col span={12}>
              <Item name="user_name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
                <Input placeholder="Enter your name" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="user_email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}>
                <Input type="email" placeholder="Enter your email" />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item name="user_number" label="Number" rules={[{ required: true, message: "Please enter your number" }]}>
                <Input type="number" placeholder="Enter your number" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="user_address" label="Address" rules={[{ required: true, message: "Please enter your address" }]}>
                <Input placeholder="Enter your address" />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Item name="message" label="Description" rules={[{ required: true, message: "Please enter a description" }]}>
                <Input.TextArea rows={4} placeholder="Enter your message" />
              </Item>
            </Col>
          </Row>

          {/* CANCEL & SUBMIT BUTTONS BELOW FORM */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </Navbar>
  );
};

export default Header;
