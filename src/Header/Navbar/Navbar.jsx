import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




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
  <img 
    src="./src/assets/Home/logo2.png" 
    className="img-fluid"
    alt="Logo" 
    style={{ height: '80px', width: '80px', objectFit: 'contain' }}
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
  className="navbar-design nav-dropdown-hover gmail"
  title="Customer Support"
  id="customer-dropdown"
  show={showCustomer}
  onMouseEnter={() => setShowCustomer(true)}
  onMouseLeave={() => setShowCustomer(false)}
>
    <NavDropdown.Item as={Link} to="/#">
  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
  globalindia@gmail.com
</NavDropdown.Item>

<NavDropdown.Item as={Link} to="#">
  <FontAwesomeIcon icon={faPhone} className="me-2" />
  9205401500
</NavDropdown.Item>

{/* Buttons aligned using d-flex and justify-content-between */}
<div className="d-flex justify-content-between mt-2">
  {/* WhatsApp Button */}
  <Button 
    style={{ fontSize: '10px', display: 'flex', gap: '20px',target:'_blank' }} 
    onClick={() => window.open('https://wa.me/9928151651?text=Hello%20Global%20India!', '_blank')}
  >
    Contact with WhatsApp
  </Button>

  {/* Contact Button */}
  <Button 
    style={{ fontSize: '10px', display: 'flex', gap: '20px' }}
    onClick={() => alert('Contact button clicked!')}
  >
    Contact
  </Button>
</div>
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
