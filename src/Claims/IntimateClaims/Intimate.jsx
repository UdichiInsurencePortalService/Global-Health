import React, { useState } from 'react';
import { Container, Form, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
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
  const validateChassisNumber = (chassis) => /^[A-Z0-9]{17}$/.test(chassis) || chassis === '';
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const countFilledFields = () => {
    const { registerNumber, engineNumber, chassisNumber } = formData;
    return [registerNumber, engineNumber, chassisNumber].filter(Boolean).length;
  };

  const generateClaimId = () => `GI/CI-01-${Math.floor(100000 + Math.random() * 900000)}`;

  const sendEmail = (data) => {
    const templateParams = {
      to_email: data.email, // ⬅️ This sends the email to the user's entered email
      claim_id: data.claimId,
      policy_number: data.policyNumber
    };

    emailjs.send(
        'service_m8kxsdr',
        'template_7lsfl8j',
        {
          to_email: data.email,
          claim_id: data.claimId,
          policy_number: data.policyNumber
        },
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
      return setShowToast({ show: true, message: 'Invalid Register Number!' });
    }
    if (!validateEngineNumber(formData.engineNumber)) {
      return setShowToast({ show: true, message: 'Invalid Engine Number!' });
    }
    if (!validateChassisNumber(formData.chassisNumber)) {
      return setShowToast({ show: true, message: 'Invalid Chassis Number!' });
    }
    if (!validateEmail(formData.email)) {
      return setShowToast({ show: true, message: 'Invalid Email!' });
    }
    if (countFilledFields() < 2) {
      return setShowToast({ show: true, message: 'Please fill at least 2 of Register, Engine or Chassis Number.' });
    }

    const id = generateClaimId();
    setClaimId(id);
    const fullData = { ...formData, claimId: id };
    localStorage.setItem('claimData', JSON.stringify(fullData));

    sendEmail(fullData);
    setShowModal(true);
  };

  return (
    <Container className="p-5 py-5" style={{ background: '#fefdf8', border: '1px solid #eee' }}>
      <h4>Claim Intimation</h4>
      <Form onSubmit={handleSubmit}>
        <h6 className="mt-4">Enter your details</h6>

        <Form.Group controlId="policyNumber">
          <Form.Label>Policy Number</Form.Label>
          <Form.Control
            type="text"
            name="policyNumber"
            placeholder="Format: GI-01-01"
            value={formData.policyNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <p className="mt-4 mb-2"><strong>Please fill at least 2 of the 3 fields below</strong></p>

        <Form.Group controlId="registerNumber">
          <Form.Label>Register Number</Form.Label>
          <Form.Control
            type="text"
            name="registerNumber"
            placeholder="e.g. TN01AB1234"
            value={formData.registerNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="engineNumber">
          <Form.Label>Engine Number</Form.Label>
          <Form.Control
            type="text"
            name="engineNumber"
            placeholder="e.g. REVTRN25AUXK04067"
            value={formData.engineNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <p className="mt-2">Or</p>

        <Form.Group controlId="chassisNumber">
          <Form.Label>Chassis Number</Form.Label>
          <Form.Control
            type="text"
            name="chassisNumber"
            placeholder="e.g. MAT878012SAA03528"
            value={formData.chassisNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mt-4">
          <Button variant="info" type="submit" className="me-2 text-white">Submit</Button>
          <Button variant="primary" type="reset" onClick={() => setFormData({
            policyNumber: '',
            registerNumber: '',
            engineNumber: '',
            chassisNumber: '',
            email: ''
          })}>Reset</Button>
        </div>
      </Form>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast.show} onClose={() => setShowToast({ show: false, message: '' })} bg="danger" delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Validation Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{showToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Claim Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for submitting your claim!</p>
          <p><strong>Your Claim ID:</strong> {claimId}</p>
          <p>A copy has been sent to your email: <strong>{formData.email}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Intimate;
