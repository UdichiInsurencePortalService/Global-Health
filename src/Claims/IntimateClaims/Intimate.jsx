import React, { useState } from 'react';
import { Container, Form, Button, Modal, Toast, ToastContainer, Row, Col } from 'react-bootstrap';
import emailjs from 'emailjs-com';

const Intimate = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '' });
  const [claimId, setClaimId] = useState('');
  const [formData, setFormData] = useState({
    policyNumber: '',
    registerNumber: '',
    engineNumber: '',
    chassisNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'registerNumber' ? value.toUpperCase() : value });
  };

  const validatePolicyNumber = (number) => /^GI-01-01$/.test(number);
  const validateRegisterNumber = (reg) => /^[A-Z0-9]{6,}$/.test(reg);
  const validateEngineNumber = (eng) => /^[A-Z0-9]{17}$/.test(eng);
  const validateChassisNumber = (chassis) => /^[A-Z0-9]{17}$/.test(chassis);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const generateClaimId = () => `GI/CI-01-${Math.floor(100000 + Math.random() * 900000)}`;

  const sendEmail = (data) => {
    const templateParams = {
      to_email: data.email,
      claim_id: data.claimId,
      policy_number: data.policyNumber
    };

    emailjs.send(
        'service_m8kxsdr',
        'template_7lsfl8j',
        templateParams,
        '_CVqq1nmrbE6BhO0x'
      )
    .then(() => console.log('Email sent successfully'))
    .catch((error) => console.error('Email sending failed:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePolicyNumber(formData.policyNumber)) {
      return setShowToast({ show: true, message: 'Invalid Policy Number! Format: GI-01-01' });
    }
    if (!validateRegisterNumber(formData.registerNumber)) {
      return setShowToast({ show: true, message: 'Invalid Register Number! Minimum 6 alphanumeric characters.' });
    }
    if (!validateEngineNumber(formData.engineNumber)) {
      return setShowToast({ show: true, message: 'Invalid Engine Number! Must be 17 alphanumeric characters.' });
    }
    if (!validateChassisNumber(formData.chassisNumber)) {
      return setShowToast({ show: true, message: 'Invalid Chassis Number! Must be 17 alphanumeric characters.' });
    }
    if (!validateEmail(formData.email)) {
      return setShowToast({ show: true, message: 'Invalid Email! Please enter a valid email address.' });
    }

    const id = generateClaimId();
    setClaimId(id);
    const fullData = { ...formData, claimId: id };
    localStorage.setItem('claimData', JSON.stringify(fullData));

    sendEmail(fullData);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      policyNumber: '',
      registerNumber: '',
      engineNumber: '',
      chassisNumber: '',
      email: ''
    });
  };

  return (
    <Container fluid className="p-3 p-md-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <div className="p-4 rounded shadow-sm" style={{ background: '#fefdf8', border: '1px solid #eee' }}>
            <h3 className="text-center mb-4">Claim Intimation</h3>
            <Form onSubmit={handleSubmit}>
              <h5 className="mt-4 mb-3 text-primary">Your Details</h5>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="policyNumber">
                    <Form.Label>Policy Number <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="policyNumber"
                      placeholder="Format: GI-01-01"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Must follow format: GI-01-01
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5 className="mt-4 mb-3 text-primary">Vehicle Information</h5>
              <div className="p-3 mb-3 bg-light rounded">
                <Form.Group className="mb-3" controlId="registerNumber">
                  <Form.Label>Register Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="registerNumber"
                    placeholder="e.g. TN01AB1234"
                    value={formData.registerNumber}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Minimum 6 alphanumeric characters
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="engineNumber">
                  <Form.Label>Engine Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="engineNumber"
                    placeholder="e.g. REVTRN25AUXK04067"
                    value={formData.engineNumber}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Must be 17 alphanumeric characters
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="chassisNumber">
                  <Form.Label>Chassis Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="chassisNumber"
                    placeholder="e.g. MAT878012SAA03528"
                    value={formData.chassisNumber}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Must be 17 alphanumeric characters
                  </Form.Text>
                </Form.Group>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" type="button" onClick={resetForm}>
                  Reset Form
                </Button>
                <Button variant="primary" type="submit">
                  Submit Claim
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast.show} 
          onClose={() => setShowToast({ show: false, message: '' })} 
          bg="danger" 
          delay={3000} 
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Validation Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{showToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Claim Submitted Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="p-3 mb-3 bg-light rounded">
            <p className="mb-2">Thank you for submitting your claim!</p>
            <h5 className="mb-0">Your Claim ID: <span className="text-primary">{claimId}</span></h5>
          </div>
          <p>A confirmation has been sent to: <strong>{formData.email}</strong></p>
          <p className="mb-0 text-muted small">Please keep your claim ID for future reference.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Intimate;