import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope } from "react-icons/fa";
import "./Newsletter.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";


const Newsletter = () => {
  return (
   
    <section className="text-white py-5 newsletter-section" style={{backgroundColor:'rgb(245, 250, 255);'}}>
    <Container >
      <div className=" rounded-4 overflow-hidden position-relative " style={{backgroundColor: "#3498db"}}>
        <Row className="flex-column flex-lg-row">
          {/* Left */}
          <Col
            lg={6}
            className="d-flex flex-column justify-content-center align-items-start p-5 position-relative text-white"
            style={{ borderRadius: "1rem 0 0 1rem" }}
          >
            <h2 className="fw-bold display-6 mb-3">Start Building for Free</h2>
            <p style={{ maxWidth: "300px" }}>
              And because your company is unique, you will need an extensible identity solution.
            </p>

            {/* SVG Background */}
            {/* <div className="position-absolute bottom-0 start-0 w-100" style={{ zIndex: 0 }}>
              <svg width="100%" height="100" viewBox="0 0 585 200" preserveAspectRatio="none">
                <path d="M585 0H0V200C168.393 200 570.581 155.231 585 0Z" fill="#3056D3" />
              </svg>
              <svg width="100%" height="100" viewBox="0 0 392 100" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
                <path d="M391.516 100H0V20C301.088 -64.8 386.464 66.6667 391.516 100Z" fill="#13C296" />
              </svg>
            </div> */}
          </Col>

          {/* Right */}
          <Col lg={6} className="p-5 text-white">
            <h3 className="fw-bold mb-4">Subscribe Now</h3>
            <Form className="d-flex flex-column flex-sm-row align-items-stretch gap-2 mb-3">
              <Form.Control
                type="email"
                placeholder="Your work mail"
                className="flex-grow-1 bg-white border border-secondary text-black"
                style={{ height: "50px" }}
              />
              <Button
                variant="primary"
                type="submit"
                style={{ height: "50px", minWidth: "100px" }}
              >
                Submit
              </Button>
            </Form>
            <p className=" large" style={{color: "white"}}>
              You will receive every news and pro tips.
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  </section>
  );
};

export default Newsletter;