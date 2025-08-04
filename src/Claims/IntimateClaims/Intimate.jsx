import React, { useState } from 'react';
import { Container, Form, Button, Modal, Row, Col, Spinner } from 'react-bootstrap';
const API_BASE_URL = 'http://localhost:8080/api';
import { handleError, handleSuccess } from '../../errortoast';
import { useNavigate } from 'react-router-dom';

const Intimate = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNullPeriodModal, setShowNullPeriodModal] = useState(false);
  const [showwrongPeriodModal, setShowwrongPeriodModal] = useState(false);

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

  // Step 1: Check if policy exists - UPDATED TO HANDLE API RESPONSE PROPERLY
  const checkPolicyExists = async (policyNumber) => {
    try {
      console.log('Checking if policy exists:', policyNumber);
      
      const response = await fetch(`${API_BASE_URL}/policy?policyNumber=${encodeURIComponent(policyNumber)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Policy check response status:', response.status);
      const data = await response.json();
      console.log('Policy check response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Policy verification failed');
      }
      
      // FIXED: Check if policy is expired from API response
      if (data.exists && data.isValid === false) {
        return {
          success: false,
          expired: true,
          data: data.policyData || null,
          message: data.message || 'Your policy has expired. Please renew it to continue.'
        };
      }
      
      return {
        success: data.exists && data.isValid !== false,
        data: data.policyData || null,
        message: data.exists ? 'Policy found and valid' : 'Policy not found'
      };
      
    } catch (error) {
      console.error('Error checking policy existence:', error);
      return { 
        success: false, 
        message: error.message || 'Unable to verify policy number. Please check and try again.' 
      };
    }
  };

  // Step 2: Check period of insurance from policy data
  const checkPolicyPeriod = (policyData) => {
    try {
      console.log('Checking policy period from policy data:', policyData);
      
      if (!policyData) {
        return {
          success: false,
          message: 'No policy data provided'
        };
      }
      
      // Get the period of insurance from policy data
      const periodOfInsurance = policyData.period_of_insurance || policyData.periodOfInsurance;
      
      console.log('Period of insurance found:', periodOfInsurance);
      
      // Check if period is null or undefined
      if (periodOfInsurance === null || periodOfInsurance === undefined || periodOfInsurance === '') {
        return {
          success: false,
          nullPeriod: true,
          message: 'Policy has null period of insurance'
        };
      }
      
      // Check if policy is expired
      const isExpired = isPolicyExpired(periodOfInsurance);
      
      return {
        success: !isExpired,
        expired: isExpired,
        periodOfInsurance: periodOfInsurance,
        policyData: policyData,
        message: isExpired ? 'Policy has expired' : 'Policy is valid'
      };
      
    } catch (error) {
      console.error('Error checking policy period:', error);
      return { 
        success: false, 
        message: error.message || 'Unable to verify policy period. Please try again.' 
      };
    }
  };

  // Enhanced policy expiration check - policies are valid for exactly 1 year
  const isPolicyExpired = (periodStr) => {
    try {
      const currentDate = new Date();
      const currentDateStr = currentDate.toISOString().split('T')[0];
      console.log('=== POLICY EXPIRATION CHECK ===');
      console.log('Current Date:', currentDateStr);
      console.log('Current Year:', currentDate.getFullYear());
      console.log('Period String received:', periodStr);
      
      // Handle bracket notation format like "[2023-05-20,2024-04-20)"
      if (typeof periodStr === 'string' && periodStr.includes('[') && periodStr.includes(',')) {
        const cleanPeriod = periodStr.replace(/[\[\]()]/g, '');
        const [startDateStr, endDateStr] = cleanPeriod.split(',');
        
        if (startDateStr && endDateStr) {
          const startDate = new Date(startDateStr.trim());
          const endDate = new Date(endDateStr.trim());
          
          console.log('Parsed Start Date:', startDate.toISOString().split('T')[0]);
          console.log('Parsed End Date:', endDate.toISOString().split('T')[0]);
          console.log('Policy Period:', startDate.getFullYear(), 'to', endDate.getFullYear());
          
          // Policy is expired if current date is after end date
          const isExpired = currentDate > endDate;
          console.log('Date Comparison: Current >  End Date?', isExpired);
          console.log('Days since expiry:', Math.floor((currentDate - endDate) / (1000 * 60 * 60 * 24)));
          
          if (isExpired) {
            console.log('🚨 POLICY EXPIRED - Current date is after end date');
            return true;
          }
          
          return false;
        }
      }
      
      // Handle format like "20 May 2024 to 19 May 2025"
      if (typeof periodStr === 'string' && periodStr.toLowerCase().includes('to')) {
        const dateParts = periodStr.split(/\s+to\s+/i);
        if (dateParts.length === 2) {
          const startDateStr = dateParts[0].trim();
          const endDateStr = dateParts[1].trim();
          const startDate = new Date(startDateStr);
          const endDate = new Date(endDateStr);
          
          console.log('Parsed Start Date:', startDate.toISOString().split('T')[0]);
          console.log('Parsed End Date:', endDate.toISOString().split('T')[0]);
          
          // Policy is expired if current date is after end date
          const isExpired = currentDate > endDate;
          console.log('Date Comparison: Current > End Date?', isExpired);
          
          if (isExpired) {
            console.log('🚨 POLICY EXPIRED - Current date is after end date');
            return true;
          }
          
          return false;
        }
      }

      // Handle date range format like "2024-01-01 to 2025-01-01"
      if (typeof periodStr === 'string' && periodStr.includes('-') && periodStr.includes('to')) {
        const dateParts = periodStr.split(/\s+to\s+/i);
        if (dateParts.length === 2) {
          const startDate = new Date(dateParts[0].trim());
          const endDate = new Date(dateParts[1].trim());
          
          console.log('Parsed Start Date:', startDate.toISOString().split('T')[0]);
          console.log('Parsed End Date:', endDate.toISOString().split('T')[0]);
          
          const isExpired = currentDate > endDate;
          console.log('Date Comparison: Current > End Date?', isExpired);
          
          if (isExpired) {
            console.log('🚨 POLICY EXPIRED - Current date is after end date');
            return true;
          }
          
          return false;
        }
      }

      // Enhanced fallback: Check policy year from policy number
      console.log('Checking policy number for year validation...');
      if (formData.policyNumber) {
        const yearMatch = formData.policyNumber.match(/\/([0-9]{4}-[0-9]{2})\//);
        if (yearMatch && yearMatch[1]) {
          const policyYearStr = yearMatch[1]; // e.g., "2025-26"
          const [startYearStr, endYearStr] = policyYearStr.split('-');
          const policyStartYear = parseInt(startYearStr);
          const policyEndYear = parseInt('20' + endYearStr); // Convert "26" to "2026"
          const currentYear = currentDate.getFullYear();
          
          console.log('Policy Year from Number:', policyYearStr);
          console.log('Policy Start Year:', policyStartYear);
          console.log('Policy End Year:', policyEndYear);
          console.log('Current Year:', currentYear);
          
          // Policy is expired if current year is greater than policy end year
          if (currentYear > policyEndYear) {
            console.log('🚨 POLICY EXPIRED - Current year is after policy end year');
            return true;
          }
          
          // For your example: Policy is 2025-26, but period is 2023-2024
          // This indicates a mismatch or the policy number format doesn't match actual period
          // In such cases, rely on the actual period_of_insurance data if available
          console.log('Policy number year check: Policy appears valid based on number year');
        }
      }
      
      // Additional check: If period contains years that are clearly in the past
      if (typeof periodStr === 'string') {
        const yearMatches = periodStr.match(/202[0-9]/g);
        if (yearMatches && yearMatches.length > 0) {
          const latestYearInPeriod = Math.max(...yearMatches.map(year => parseInt(year)));
          const currentYear = currentDate.getFullYear();
          
          console.log('Latest year found in period:', latestYearInPeriod);
          console.log('Current year:', currentYear);
          
          // If the latest year in the period is more than 1 year ago, policy is expired
          if (currentYear - latestYearInPeriod > 1) {
            console.log('🚨 POLICY EXPIRED - Period contains years too far in the past');
            return true;
          }
        }
      }
      
      console.log('✅ Policy appears to be valid');
      return false;
      
    } catch (error) {
      console.error('Error checking policy expiration:', error);
      // In case of error, assume expired for safety
      console.log('🚨 ERROR - Assuming policy is expired for safety');
      return true;
    }
  };

  // UPDATED: Combined policy verification function
  const verifyPolicy = async (policyNumber) => {
    try {
      setIsLoading(true);
      
      // Step 1: Check if policy exists and get policy data
      const existsCheck = await checkPolicyExists(policyNumber);
      
      // FIXED: Handle expired policy from API response first
      if (existsCheck.expired) {
        return {
          success: false,
          expired: true,
          message: existsCheck.message || 'Your policy has expired. Please renew it to continue.'
        };
      }
      
      if (!existsCheck.success) {
        return {
          success: false,
          message: existsCheck.message || 'Policy not found. Please check your policy number and try again.'
        };
      }
      
      console.log('Policy exists and is valid from API, now checking period from policy data...');
      
      // Step 2: Check policy period from the policy data we already have (optional additional check)
      const periodCheck = checkPolicyPeriod(existsCheck.data);
      
      if (!periodCheck.success) {
        if (periodCheck.nullPeriod) {
          return {
            success: false,
            nullPeriod: true,
            message: 'Error: Policy has null period of insurance. Please contact customer support.'
          };
        }
        
        if (periodCheck.expired) {
          return {
            success: false,
            expired: true,
            message: 'Your policy has expired. Please renew it to continue.',
            periodOfInsurance: periodCheck.periodOfInsurance
          };
        }
        
        return {
          success: false,
          message: periodCheck.message || 'Unable to verify policy period.'
        };
      }
      
      // Pre-populate form data if available
      if (existsCheck.data) {
        setFormData(prevData => ({
          ...prevData,
          email: existsCheck.data.email || prevData.email,
          registerNumber: existsCheck.data.registrationNumber || existsCheck.data.registration_number || prevData.registerNumber
        }));
      }
      
      return {
        success: true,
        data: existsCheck.data,
        message: 'Policy verified successfully. Proceeding with claim.'
      };
      
    } catch (error) {
      console.error('Policy verification error:', error);
      return {
        success: false,
        message: error.message || 'Unable to verify policy. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };  

  // Function to submit claim to database
  const submitClaimToDatabase = async (claimData) => {
    try {
      setIsLoading(true);
      
      const payload = {
        policy_number: claimData.policyNumber,
        email: claimData.email,
        registration_number: claimData.registerNumber,
        engine_number: claimData.engineNumber,
        chassis_number: claimData.chassisNumber
      };
      
      console.log('Sending claim data to server:', payload);
      
      const response = await fetch(`${API_BASE_URL}/claims`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      console.log('API Response Status:', response.status);
      const responseText = await response.text();
      console.log('API Raw Response:', responseText);
      
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

    // Check if all required fields are filled
    if (!formData.policyNumber.trim()) {
      handleError('Please fill in the Policy Number to proceed with intimate claim.');
      return;
    }
    if (!formData.email.trim()) {
      handleError('Please fill in the Email Address to proceed with intimate claim.');
      return;
    }
    if (!formData.registerNumber.trim()) {
      handleError('Please fill in the Register Number to proceed with intimate claim.');
      return;
    }
    if (!formData.engineNumber.trim()) {
      handleError('Please fill in the Engine Number to proceed with intimate claim.');
      return;
    }
    if (!formData.chassisNumber.trim()) {
      handleError('Please fill in the Chassis Number to proceed with intimate claim.');
      return;
    }

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
      // Verify policy (checks both existence and period)
      const verification = await verifyPolicy(formData.policyNumber);
      
      // FIXED: Handle different verification results properly
      if (!verification.success) {
        if (verification.expired) {
          console.log('Policy expired, showing error and modal...');
          handleError('Your policy has expired. Please renew it to continue.');
          setShowwrongPeriodModal(true);
          return; // IMPORTANT: Stop execution here
        }
        
        if (verification.nullPeriod) {
          handleError('Error: Policy has null period of insurance. Please contact customer support.');
          setShowNullPeriodModal(true);
          return; // IMPORTANT: Stop execution here
        }
        
        handleError(verification.message);
        return; // IMPORTANT: Stop execution here
      }

      // ONLY PROCEED IF POLICY IS VALID
      console.log('Policy is valid, proceeding with claim submission...');

      // Submit claim data to database if policy is valid
      const dbResult = await submitClaimToDatabase(formData);
      
      if (!dbResult.success) {
        handleError(dbResult.message || 'Failed to save claim data. Please try again.');
        return;
      }
      
      // Display success message
      handleSuccess('Claim submitted successfully!');
      
      // Navigate to document upload page ONLY if everything is successful
      navigate('/documentupload');
      
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
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Processing...</span>
                    </>
                  ) : (
                    'Move Next'
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

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
          <Modal.Title>Policy Expired!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="p-3 mb-3 bg-light rounded">
            <i className="bi bi-exclamation-circle-fill text-danger fs-1 d-block mb-3"></i>
            <h5 className="mb-3">Policy Has Expired</h5>
            <p className="mb-0">Your policy has expired. Please renew it to continue with the claim process.</p>
            <p className="mb-0">Contact customer support for renewal assistance.</p>
          </div>
          <p className="mb-0">Policy Number: <strong>{formData.policyNumber}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowwrongPeriodModal(false)}>Close</Button>
          <Button variant="danger" onClick={() => window.location.href = '/contact-support'}>Renew Policy</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Intimate;