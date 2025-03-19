import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/logo-main-.png";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-3 sticky-top" expanded={expanded}>
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-decoration-none text-orange d-flex align-items-center">
          <img
            className="img-fluid"
            src={logo}
            alt="logo"
            style={{
              height: "155px", // Matches Navbar height
              objectFit: "contain",
              background: "transparent",
              position:'absolute'
            }}
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
              <NavDropdown.Item as={Link} to="/individual-plan-1">Life Insurance</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/individual-plan-2">Health Insurance</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/individual-plan-3">Auto Insurance</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/individual-plan-4">Home Insurance</NavDropdown.Item>
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
              <NavDropdown.Item as={Link} to="/contact/email">Email</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact/phone">Phone</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Log In Button */}
          <Button as={Link} to="/login" className="ms-lg-3 rounded-pill px-4">
            Log In
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
