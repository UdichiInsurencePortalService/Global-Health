import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope } from "react-icons/fa";
import "./Newsletter.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Newsletter = () => {
  return (
    <section className="text-white py-3 py-md-5 newsletter-section" style={{backgroundColor:'rgb(245, 250, 255);'}}>
      <Container>
        <div className="rounded-4 overflow-hidden position-relative" style={{backgroundColor: "#3498db"}}>
          <Row className="g-0">
            {/* Left Column */}
            <Col
              xs={12}
              lg={6}
              className="d-flex flex-column justify-content-center align-items-start p-3 p-sm-4 p-lg-5 position-relative text-white order-1 order-lg-1"
            >
              <h2 className="fw-bold fs-2 fs-md-1 mb-3 text-center text-lg-start w-100">
                Start Building for Free
              </h2>
              <p className="text-center text-lg-start w-100 mb-4 mb-lg-0" style={{ maxWidth: "none" }}>
                And because your company is unique, you will need an extensible identity solution.
              </p>
            </Col>

            {/* Right Column */}
            <Col 
              xs={12}
              lg={6} 
              className="p-3 p-sm-4 p-lg-5 text-white order-2 order-lg-2"
            >
              <h3 className="fw-bold mb-3 mb-md-4 text-center text-lg-start">
                Subscribe Now
              </h3>
              
              {/* Mobile-first form layout */}
              <Form className="mb-3">
                <div className="d-flex flex-column flex-sm-row align-items-stretch gap-2">
                  <Form.Control
                    type="email"
                    placeholder="Your work mail"
                    className="flex-grow-1 bg-white border-0 text-black"
                    style={{ 
                      height: "45px",
                      fontSize: "14px"
                    }}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="bg-dark border-0 fw-semibold"
                    style={{ 
                      height: "45px", 
                      minWidth: "100px",
                      fontSize: "14px"
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
              
              <p className="mb-0 text-center text-lg-start" style={{color: "white", fontSize: "14px"}}>
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