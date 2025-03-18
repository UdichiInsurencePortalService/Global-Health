import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-3" expanded={expanded}>
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-decoration-none text-orange">
          Demo Project
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
              <div className="dropdown-menu show">
                <NavDropdown.Item className="p-3" style={{ minWidth: "550px" }}>
                  <Row>
                    <Col md={6} className="p-2">
                      <Link to="/product" className="dropdown-heading">Individual Insurance</Link>
                      <ul className="list-unstyled">
                        <li><Link to="/individual-plan-1" className="nav-item-hover">Life</Link></li>
                        <li><Link to="/individual-plan-2" className="nav-item-hover">Health</Link></li>
                        <li><Link to="/individual-plan-3" className="nav-item-hover">Auto</Link></li>
                        <li><Link to="/individual-plan-4" className="nav-item-hover">Home</Link></li>
                      </ul>
                    </Col>
                    <Col md={6} className="p-2">
                      <Link to="/product" className="dropdown-heading">Business Insurance</Link>
                      <ul className="list-unstyled">
                        <li><Link to="/business-plan-1" className="nav-item-hover">Commercial Liability</Link></li>
                        <li><Link to="/business-plan-2" className="nav-item-hover">Property</Link></li>
                      </ul>
                    </Col>
                  </Row>
                </NavDropdown.Item>
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
              <NavDropdown.Item as={Link} to="/contact/email">Email</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact/phone">Phone</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Log In Button */}
          <Button as={Link} to="/login" className=" ms-lg-3 rounded-pill px-4 ">
            Log In
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
