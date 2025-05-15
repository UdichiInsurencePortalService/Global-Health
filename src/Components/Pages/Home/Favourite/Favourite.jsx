import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Favourite.css";
const features = [
  {
    icon: "🎉",
    title: "Easy Claims",
    text: "customers trust us & have bought their insurance on Global Health & Allied Insurance",
    color: "text-primary",
  },
  {
    icon: "🔍",
    title: "Secure Payment",
    text: "partnered with us so that you can compare easily & transparently",
    color: "text-info",
  },
  {
    icon: "🏅",
    title: "Great Price",
    text: "for all kinds of insurance plans available online",
    color: "text-success",
  },
  {
    icon: "👩‍💼",
    title: "24*7 Support",
    text: "support built in with every policy for help, when you need it the most",
    color: "text-warning",
  },
];

const Favourite = () => {
  return (
    <Container className="my-5 py-5">
      <Row className="align-items-center">
        {/* Left Section - Text */}
        <Col md={5}>
         <h1>
  What makes <span className="spams">Global Health</span> stand out as <br />
  <span className="spams">India’s go-to platform</span> <br />
  for insurance purchases?
</h1>

        </Col>

        {/* Right Section - Feature Cards */}
        <Col md={7}>
          <Row>
            {features.map((item, index) => (
              <Col sm={6} className="mb-4" key={index}>
                <Card className="shadow-lg h-100 favourite-card">
                  <Card.Body>
                    <h5 className={item.color}>
                      {item.icon} <span>{item.title}</span>
                    </h5>
                    <p className="mb-0 text-muted">{item.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Favourite;
