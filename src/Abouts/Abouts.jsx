import React from "react";
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Abouts = () => {
  const services = [
    {
      category: "Health Insurance",
      icon: "💊",
      color: "primary",
      plans: [
        "Individual Health Plans",
        "Family Health Plans", 
        "Corporate Health Plans",
        "International Health Insurance"
      ],
    },
    {
      category: "Travel Insurance",
      icon: "✈️",
      color: "success",
      plans: [
        "Travel Medical Insurance",
        "Trip Cancellation Insurance",
        "Emergency Medical Evacuation"
      ],
    },
    {
      category: "Property Insurance",
      icon: "🏠",
      color: "warning",
      plans: [
        "Homeowners Insurance",
        "Commercial Property Insurance",
        "Natural Disaster Protection"
      ],
    },
    {
      category: "Auto Insurance",
      icon: "🚗",
      color: "danger",
      plans: [
        "Personal Car Insurance",
        "Commercial Vehicle Coverage",
        "Third-Party Liability"
      ],
    },
    {
      category: "Business Insurance",
      icon: "🛡️",
      color: "info",
      plans: [
        "General Liability Insurance",
        "Professional Liability",
        "Cybersecurity Protection"
      ],
    },
    {
      category: "Specialty Coverage",
      icon: "🌟",
      color: "secondary",
      plans: [
        "Pet Insurance",
        "Business Interruption",
        "Environmental Protection"
      ],
    },
  ];

  const locations = [
    { city: "Muscat, Oman", role: "Headquarters", color: "primary" },
    { city: "Mauritius", role: "African & Asian Hub", color: "success" },
    { city: "Toronto, Canada", role: "North American Operations", color: "info" },
    { city: "Texas, USA", role: "US Market Leader", color: "warning" },
    { city: "London, UK", role: "European Gateway", color: "danger" },
    { city: "Paris, France", role: "Continental Europe", color: "secondary" },
    { city: "Mumbai, India", role: "South Asian Market", color: "dark" }
  ];

  const features = [
    {
      title: "Affordable Premiums",
      description: "Competitive rates without compromising coverage quality",
      icon: "💰",
      color: "success"
    },
    {
      title: "Global Coverage",
      description: "Insurance solutions available worldwide through our network",
      icon: "🌍",
      color: "primary"
    },
    {
      title: "Quick Claims",
      description: "Fast and efficient claims processing when you need it most",
      icon: "⚡",
      color: "warning"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer service across all time zones",
      icon: "🎧",
      color: "info"
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">About Our Company</h1>
              <p className="lead mb-4">
                Global leader in affordable health and non-life insurance solutions
              </p>
              <hr className="bg-white mx-auto" style={{ width: '100px', height: '3px' }} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Company Overview */}
      <Container className="py-5">
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2 className="h1 fw-bold text-primary mb-4">Who We Are</h2>
            <p className="lead text-muted mb-4">
              Global Health and Allied Non-Life Insurance Services is a worldwide leader 
              in providing comprehensive and affordable insurance solutions.
            </p>
            <p className="text-muted mb-4">
              With strategically located offices across multiple continents, we specialize 
              in delivering high-quality coverage in health, travel, property, auto, and 
              business sectors at the most competitive rates globally.
            </p>
            <Button variant="primary" size="lg">Learn More</Button>
          </Col>
          <Col lg={6}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5 text-center bg-light">
                <div className="display-1 text-primary mb-3">🏢</div>
                <h4 className="fw-bold text-dark">Trusted Worldwide</h4>
                <p className="text-muted mb-0">Serving customers across 7 countries</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Vision & Mission */}
        <Row className="mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <Card className="h-100 border-0 shadow">
              <Card.Body className="p-4 p-lg-5 text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                  👁️
                </div>
                <h3 className="fw-bold text-primary mb-3">Our Vision</h3>
                <p className="text-muted">
                  To become the world's most trusted and affordable provider of health and 
                  non-life insurance, offering competitive premiums while ensuring optimal 
                  coverage for all clients globally.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 border-0 shadow">
              <Card.Body className="p-4 p-lg-5 text-center">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                  🎯
                </div>
                <h3 className="fw-bold text-success mb-3">Our Mission</h3>
                <p className="text-muted">
                  To provide cost-effective and comprehensive insurance solutions globally, 
                  making insurance accessible for individuals and businesses of all sizes 
                  while maintaining exceptional service quality.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Services Section */}
      <div className="bg-light py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">Our Services</h2>
            <p className="lead text-muted">Comprehensive insurance solutions for every need</p>
          </div>

          <Row className="g-4">
            {services.map((service, index) => (
              <Col key={index} sm={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="me-3" style={{ fontSize: '2rem' }}>{service.icon}</span>
                      <h4 className={`fw-bold text-${service.color} mb-0`}>{service.category}</h4>
                    </div>
                    <ul className="list-unstyled mb-0">
                      {service.plans.map((plan, planIndex) => (
                        <li key={planIndex} className="mb-2 text-muted">
                          <i className={`bi bi-check-circle-fill text-${service.color} me-2`}></i>
                          {plan}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Global Presence */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-3">Global Presence</h2>
          <p className="lead text-muted">Serving customers across 7 strategic locations worldwide</p>
        </div>

        <Row className="g-3">
          {locations.map((location, index) => (
            <Col key={index} sm={6} lg={4} xl={3} className="mb-3">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4 text-center">
                  <h5 className="fw-bold text-dark mb-2">{location.city}</h5>
                  <Badge bg={location.color} className="mb-3">{location.role}</Badge>
                  <div className={`bg-${location.color}`} 
                       style={{ height: '4px', borderRadius: '2px', opacity: 0.3 }}></div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Why Choose Us */}
      <div className="bg-primary text-white py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose Us</h2>
            <p className="lead opacity-75">What makes us different from the rest</p>
          </div>

          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} sm={6} lg={3}>
                <div className="text-center">
                  <div className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                    {feature.icon}
                  </div>
                  <h4 className="fw-bold mb-3">{feature.title}</h4>
                  <p className="opacity-75">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5 text-center">
                <h3 className="display-6 fw-bold text-primary mb-4">
                  Ready to Get Protected?
                </h3>
                <p className="lead text-muted mb-4">
                  Join thousands of satisfied customers worldwide and get your personalized quote today.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Button variant="primary" size="lg">Get Quote Now</Button>
                  <Button variant="outline-primary" size="lg">Contact Us</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer spacing */}
      <div className="py-3"></div>
    </div>
  );
};

export default Abouts;