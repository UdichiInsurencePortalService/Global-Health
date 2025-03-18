import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [show, setProduct] = useState(false);
  const [Policy, setPolicy] = useState(false);
  const [Customer, setCustomer] = useState(false);

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-3" expanded={expanded}>
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 text-decoration-none"
          style={{ color: "#ff6600" }}
        >
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
              id="pages-dropdown"
              show={show}
              onMouseEnter={() => setProduct(true)}
              onMouseLeave={() => setProduct(false)}
            >
              <NavDropdown.Item className="p-3" style={{ minWidth: "550px" }}>
                <Row>
                  {/* Individual Insurance */}
                  <Col md={6} className="p-2">
                    <Link
                      to="/product"
                      className="d-block mb-2 fw-bold text-dark text-decoration-none"
                    >
                      Individual Insurance
                    </Link>
                    <ul className="list-unstyled">
                    <li className="mb-1"><Link to="/individual-plan-1" className="nav-item-hover">Car Insurance</Link></li>
                      <li className="mb-1"><Link to="/individual-plan-1" className="nav-item-hover">Life Insurance</Link></li>
                      <li className="mb-1"><Link to="/individual-plan-2" className="nav-item-hover">Health Insurance</Link></li>
                      <li className="mb-1"><Link to="/individual-plan-3" className="nav-item-hover">Auto Insurance</Link></li>
                      <li className="mb-1"><Link to="/individual-plan-4" className="nav-item-hover">Home Insurance</Link></li>
                    </ul>
                  </Col>

                  {/* Business Insurance */}
                  <Col md={6} className="p-2">
                    <Link
                      to="/product"
                      className="d-block mb-2 fw-bold text-dark text-decoration-none"
                    >
                      Business Insurance
                    </Link>
                    <ul className="list-unstyled">
                      <li className="mb-1"><Link to="/business-plan-1" className="nav-item-hover">Commercial Liability</Link></li>
                      <li className="mb-1"><Link to="/business-plan-2" className="nav-item-hover">Property</Link></li>
                    </ul>
                  </Col>
                </Row>
              </NavDropdown.Item>
            </NavDropdown>

            {/* Policy Details Dropdown */}
            <NavDropdown
              className="navbar-design nav-dropdown-hover"
              title="Policy Details"
              id="policy-dropdown"
              show={Policy}
              onMouseEnter={() => setPolicy(true)}
              onMouseLeave={() => setPolicy(false)}
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
              show={Customer}
              onMouseEnter={() => setCustomer(true)}
              onMouseLeave={() => setCustomer(false)}
            >
              <NavDropdown.Item as={Link} to="/contact/email">Email</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact/phone">Phone</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Log In Button */}
          <Button as={Link} to="/login" className="ms-lg-3 btn-primary rounded-pill px-4">
            Log In
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
