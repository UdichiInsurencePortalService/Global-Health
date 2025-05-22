import React, { useState } from 'react';
import { Container, Form, Button, Modal, Toast, ToastContainer, Row, Col, Spinner } from 'react-bootstrap';
import emailjs from 'emailjs-com';
const API_BASE_URL = 'http://localhost:8080/api';
import { handleError, handleSuccess } from '../../errortoast';

const Intimate = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', type: 'danger' });
  const [claimId, setClaimId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNullPeriodModal, setShowNullPeriodModal] = useState(false);
  const [showwrongPeriodModal, setShowwrongPeriodModal] = useState(false);

  const [showTemporaryIdModal, setShowTemporaryIdModal] = useState(false);
  const [temporaryId, setTemporaryId] = useState('');
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

  // Updated policy number validation to match GIC/2025-26/01/5244 format
  const validatePolicyNumber = (number) => /^GIC\/202[0-9]-[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(number);
  const validateRegisterNumber = (reg) => /^[A-Z0-9]{6,}$/.test(reg);
  const validateEngineNumber = (eng) => /^[A-Z0-9]{17}$/.test(eng);
  const validateChassisNumber = (chassis) => /^[A-Z0-9]{17}$/.test(chassis);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const generateClaimId = () => `GIC/CI-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const generateTemporaryId = () => `GIC/TEMP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  // Improved function to check if policy is expired
  const isPolicyExpired = (periodStr) => {
    try {
      // Set current date to May 21, 2025 as per the scenario
      const currentDate = new Date(); // This will be May 21, 2025 in your environment
      
      // Format like "[2024-05-20,2025-04-20)" - extract dates from bracket notation
      if (typeof periodStr === 'string' && periodStr.includes('[') && periodStr.includes(',')) {
        // Extract end date part (remove brackets and get the second part)
        const endDateStr = periodStr.replace('[', '').replace(')', '').split(',')[1].trim();
        const endDate = new Date(endDateStr);
        
        // Policy is expired if current date is AFTER the end date
        return currentDate > endDate;
      }
      
      // Format like "20 May 2024 to 19 May 2025"
      if (typeof periodStr === 'string' && periodStr.toLowerCase().includes('to')) {
        const dateParts = periodStr.split('to');
        if (dateParts.length === 2) {
          const endDateStr = dateParts[1].trim();
          const endDate = new Date(endDateStr);
          
          // Policy is expired if current date is AFTER the end date
          return currentDate > endDate;
        }
      }

      // Check policy number year part (e.g., "2025-26" from "GIC/2025-26/01/5244")
      const policyNumber = formData.policyNumber;
      if (policyNumber) {
        const yearMatch = policyNumber.match(/\/([0-9]{4}-[0-9]{2})\//);
        if (yearMatch && yearMatch[1]) {
          const policyYear = yearMatch[1];
          
          // For current year range (2025-26), it's valid
          if (policyYear === '2025-26') {
            return false;
          }
          
          // For previous years (like 2024-25), if we're past April/May of the end year, it's likely expired
          if (policyYear === '2024-25') {
            // Check if we're in 2025 and past standard renewal month (usually April)
            if (currentDate.getFullYear() >= 2025 && currentDate.getMonth() >= 4) { // May is month 4 (0-indexed)
              return true;
            }
          }
        }
      }
      
      // Default to not expired if no condition matched
      return false;
    } catch (error) {
      console.error('Error checking policy expiration:', error);
      return false; // Don't assume expired if there's an error
    }
  };

  const verifyPolicyNumber = async (policyNumber) => {
    try {
      setIsLoading(true);
      // GET request with policy number as query parameter
      const response = await fetch(`${API_BASE_URL}/policy?policyNumber=${encodeURIComponent(policyNumber)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Log the actual response for debugging
      console.log('API Response Status:', response.status);
      const data = await response.json();
      console.log('API Response Data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Policy verification failed');
      }
      
      // Check if policy exists
      if (!data.exists) {
        return { 
          success: false, 
          message: 'Policy not found. Please check your policy number and try again.' 
        };
      }
      
      // Check period of insurance if policy exists
      if (data.policyData) {
        // Ensure we're checking the correct property name from the backend
        const periodOfInsurance = data.policyData.period_of_insurance !== undefined ? 
          data.policyData.period_of_insurance : 
          data.policyData.periodOfInsurance;
        
        console.log('Period of Insurance value:', periodOfInsurance);
        
        // Check if period_of_insurance is null or undefined or empty string
        if (periodOfInsurance === null || periodOfInsurance === undefined || periodOfInsurance === '') {
          return {
            success: false,
            nullPeriod: true,
            message: 'Error: Policy has null period of insurance. Please contact customer support.'
          };
        }
        
        // Check if policy is expired - use our improved function
        if (isPolicyExpired(periodOfInsurance)) {
          return {
            success: false,
            expired: true,
            message: 'Your policy has expired. Please renew it to continue.'
          };
        }

        // If policy is valid and not expired, pre-populate form data
        setFormData(prevData => ({
          ...prevData,
          email: data.policyData.email || prevData.email,
          registerNumber: data.policyData.registrationNumber || prevData.registerNumber
        }));
        
        return { 
          success: true, 
          data,
          message: 'Policy verified successfully. Proceeding with claim.'
        };
      } else {
        return {
          success: false,
          message: 'Policy data is missing. Please contact customer support.'
        };
      }
    } catch (error) {
      console.error('Policy verification error:', error);
      return { 
        success: false, 
        message: error.message || 'Unable to verify policy number. Please check and try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Updated function to match PostgreSQL database schema
  const submitClaimToDatabase = async (claimData) => {
    try {
      setIsLoading(true);
      
      // Format the data correctly according to the expected backend schema
      const payload = {
        claim_id: claimData.claimId, // Make sure we're sending the claim_id
        policy_number: claimData.policyNumber,
        user_id: claimData.claimId, // This matches user_id column
        email: claimData.email,
        registration_number: claimData.registerNumber,
        engine_number: claimData.engineNumber,
        chassis_number: claimData.chassisNumber // Ensure consistent naming
      };
      
      console.log('Sending claim data to server:', payload);
      
      const response = await fetch(`${API_BASE_URL}/claims`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      // Full logging of response for debugging
      console.log('API Response Status:', response.status);
      const responseText = await response.text();
      console.log('API Raw Response:', responseText);
      
      // Try to parse the response as JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing response as JSON:', e);
        data = { message: 'Invalid response from server' };
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create claim. Please try again.');
      }
      
      console.log('Claim saved to database successfully:', data);
      return { success: true, data };
      
    } catch (error) {
      console.error('Error saving claim to database:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to save claim data. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validatePolicyNumber(formData.policyNumber)) {
      handleError('Invalid Policy Number! Format should be like: GIC/2025-26/01/5244');
      return;
    }
    if (!validateRegisterNumber(formData.registerNumber)) {
      handleError('Invalid Register Number! Minimum 6 alphanumeric characters.');
      return;
    }
    if (!validateEngineNumber(formData.engineNumber)) {
      handleError('Invalid Engine Number! Must be 17 alphanumeric characters.');
      return;
    }
    if (!validateChassisNumber(formData.chassisNumber)) {
      handleError('Invalid Chassis Number! Must be 17 alphanumeric characters.');
      return;
    }
    if (!validateEmail(formData.email)) {
      handleError('Invalid Email! Please enter a valid email address.');
      return;
    }

    try {
      // Verify policy number with API
      const verification = await verifyPolicyNumber(formData.policyNumber);
      
      // Handle different verification results
      if (!verification.success) {
        if (verification.expired) {
          // Show error for expired policy
          setShowwrongPeriodModal(true);
          return;
        }
        
        if (verification.nullPeriod) {
          // Show error for null period of insurance
          handleError('Error: Policy has null period of insurance. Please contact customer support.');
          // Show null period modal
          setShowNullPeriodModal(true);
          return;
        }
        
        // Show generic error for other failures
        handleError(verification.message);
        return;
      }

      // Generate claim ID for valid policy
      const id = generateClaimId();
      setClaimId(id);
      
      // Prepare data for submission
      const submissionData = {
        ...formData,
        claimId: id
      };
      
      // Submit claim data to database FIRST before sending emails
      const dbResult = await submitClaimToDatabase(submissionData);
      
      if (!dbResult.success) {
        handleError(dbResult.message || 'Failed to save claim data. Please try again.');
        return;
      }
      
      // Only send emails if database submission was successful
      sendEmails(submissionData);
      
      // Show success modal with claim ID
      setShowModal(true);
      
      // Store claim ID in local storage for document upload page
      localStorage.setItem('currentClaimId', id);
      
      // Display success message
      handleSuccess('Claim submitted successfully! Your claim ID has been generated.');
    } catch (error) {
      console.error('Submission error:', error);
      handleError('An error occurred during submission. Please try again.');
    }
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

  const sendEmails = async (data) => {
  try {
    // First try to use the backend API endpoint
    const response = await fetch(`${API_BASE_URL}/send-claim-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        user_id: data.claimId,
        policy_number: data.policyNumber
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('Backend email sending failed, falling back to emailjs:', result.message);
      // Fallback to emailjs if backend fails
      sendEmailWithEmailJS(data);
    } else {
      console.log('Email sent successfully through backend');
    }
  } catch (error) {
    console.error('Error using backend email service, falling back to emailjs:', error);
    // Fallback to emailjs if there's an error with the fetch call
    sendEmailWithEmailJS(data);
  }
};

// Fallback function using emailjs
const sendEmailWithEmailJS = (data) => {
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
  .then(() => console.log('Email sent successfully via emailjs'))
  .catch((error) => console.error('Email sending failed via emailjs:', error));
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
                      placeholder="Format: GIC/2025-26/01/5244"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Must follow format: GIC/2025-26/01/5244
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
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Processing...</span>
                    </>
                  ) : (
                    'Submit Claim'
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Success Modal - Only shown for valid policies */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Claim Submitted Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="p-3 mb-3 bg-light rounded">
            <p className="mb-2">Thank you for submitting your claim!</p>
            <h5 className="mb-0">Your User ID: <span className="text-primary">{claimId}</span></h5>
          </div>
          <p>A confirmation has been sent to: <strong>{formData.email}</strong></p>
          <p className="mb-0 text-muted small">Please keep your User ID for future reference and document upload</p>
          <p className="mt-3">
            <Button variant="outline-primary" onClick={() => window.location.href = '/documentupload'}>
              Upload Documents for This Claim
            </Button>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Null Period of Insurance Modal */}
      <Modal show={showNullPeriodModal} onHide={() => setShowNullPeriodModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Policy Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="p-3 mb-3 bg-light rounded">
            <i className="bi bi-exclamation-circle-fill text-danger fs-1 d-block mb-3"></i>
            <h5 className="mb-3">Invalid Policy Information</h5>
            <p className="mb-0">Your policy has a null period of insurance.</p>
            <p className="mb-0">Please contact customer support to resolve this issue.</p>
          </div>
          <p className="mb-0">Policy Number: <strong>{formData.policyNumber}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNullPeriodModal(false)}>Close</Button>
          <Button variant="danger" onClick={() => window.location.href = '/contact-support'}>Contact Support</Button>
        </Modal.Footer>
      </Modal>

      {/* Expired Policy Modal */}
      <Modal show={showwrongPeriodModal} onHide={() => setShowwrongPeriodModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Policy Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="p-3 mb-3 bg-light rounded">
            <i className="bi bi-exclamation-circle-fill text-danger fs-1 d-block mb-3"></i>
            <h5 className="mb-3">Invalid Policy Information</h5>
            <p className="mb-0">Your policy has expired. Please renew it to continue.</p>
            <p className="mb-0">Please contact customer support to resolve this issue.</p>
          </div>
          <p className="mb-0">Policy Number: <strong>{formData.policyNumber}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowwrongPeriodModal(false)}>Close</Button>
          <Button variant="danger" onClick={() => window.location.href = '/contact-support'}>Contact Support</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Intimate;