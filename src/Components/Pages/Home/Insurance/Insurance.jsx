import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Insurance.css';
import { Link } from 'react-router-dom';

const Insurance = () => {
  return (
    <Container fluid className="insurance-banner d-flex align-items-center ">
      <Row className=" align-items-center justify-content-center">
        <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
          <h2 className="insurance-heading">
            Secure Your Future with the <span className="highlight">Right Life Insurance!</span>
          </h2>
        </Col>
        <Col xs={12} md={6} className="text-center text-md-end">
          <Link to="/carinsurance">
            <Button className="custom-btn">Explore Global Health & Allied Insurance</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Insurance;
