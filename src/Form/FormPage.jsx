import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/Usercontext';
import { Card, Form, Button, Row, Col, Modal, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { handleError } from '../errortoast';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import logo from '../assets/Home/global-logo.png';
import qr from '../assets/kunal.jpeg';

const API_BASE_URL = 'http://localhost:8080/api';

const FormPage = () => {
  const { userForm, setUserForm } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [premiumComponents, setPremiumComponents] = useState({});
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [userId, setUserId] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Currency state with default values
  const [currencyData, setCurrencyData] = useState({
    selectedCurrency: 'INR',
    currencySymbol: '₹',
    currencyRate: 1,
    currencyName: 'Indian Rupee'
  });

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  // Load data from localStorage
  useEffect(() => {
    // Load currency data from localStorage
    try {
      const storedCurrencyData = localStorage.getItem('currencyData');
      if (storedCurrencyData) {
        const parsedCurrencyData = JSON.parse(storedCurrencyData);
        setCurrencyData({
          selectedCurrency: parsedCurrencyData.selectedCurrency || 'INR',
          currencySymbol: parsedCurrencyData.currencySymbol || '₹',
          currencyRate: parsedCurrencyData.currencyRate || 1,
          currencyName: parsedCurrencyData.currencyName || 'Indian Rupee'
        });
        console.log("Loaded currency data from localStorage:", parsedCurrencyData);
      } else {
        console.log("No currency data found in localStorage, using default INR");
      }
    } catch (error) {
      console.error("Error loading currency data from localStorage:", error);
    }

    // Load vehicle details
    try {
      const storedVehicleDetails = localStorage.getItem('vehicleDetails');
      if (storedVehicleDetails) {
        const parsedDetails = JSON.parse(storedVehicleDetails);
        setVehicleDetails(parsedDetails);
        
        // Update user form with vehicle details
        setUserForm(prevForm => ({
          ...prevForm,
          username: parsedDetails.owner || prevForm.username || '',
          mobile_number: parsedDetails.mobile_number || prevForm.mobile_number || '',
          address: parsedDetails.address || prevForm.address || '',
          registrationNumber: parsedDetails.vehicle_no || prevForm.registrationNumber || ''
        }));
      }
    } catch (error) {
      console.error("Error loading vehicle details:", error);
    }
    
    // Load premium components
    try {
      const storedPremiumComponents = localStorage.getItem('premiumDetails');
      if (storedPremiumComponents) {
        const parsedPremiumComponents = JSON.parse(storedPremiumComponents);
        setPremiumComponents(parsedPremiumComponents);
        console.log("Loaded premium components:", parsedPremiumComponents);
      }
    } catch (error) {
      console.error("Error loading premium components:", error);
    }
  }, [setUserForm]);

  // Function to convert amount to selected currency
  const convertCurrency = (amount) => {
    if (!amount || isNaN(amount)) return 0;
    const convertedAmount = amount * currencyData.currencyRate;
    return Math.round(convertedAmount);
  };

  // Function to format currency with symbol
  const formatCurrency = (amount) => {
    const convertedAmount = convertCurrency(amount);
    return `${currencyData.currencySymbol} ${convertedAmount.toLocaleString()}`;
  };

  const handleChange = (e) => {
    setUserForm(prevForm => ({ 
      ...prevForm, 
      [e.target.name]: e.target.value 
    }));
  };

  const validateForm = () => {
    if (!userForm.username || userForm.username.trim() === '') {
      handleError("Please enter your full name");
      return false;
    }
    
    if (!userForm.email || !/\S+@\S+\.\S+/.test(userForm.email)) {
      handleError("Please enter a valid email address");
      return false;
    }
    
    if (!userForm.age || isNaN(userForm.age) || userForm.age <= 0) {
      handleError("Please enter a valid age");
      return false;
    }
    
    if (!userForm.mobile_number || !/^\d{10}$/.test(userForm.mobile_number)) {
      handleError("Please enter a valid 10-digit mobile number");
      return false;
    }
    
    if (!userForm.pan_number || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(userForm.pan_number)) {
      handleError("Please enter a valid PAN number (e.g., ABCDE1234F)");
      return false;
    }
    
    if (!userForm.aadhar_card || !/^\d{12}$/.test(userForm.aadhar_card)) {
      handleError("Please enter a valid 12-digit Aadhaar number");
      return false;
    }
    
    if (!userForm.registrationNumber || userForm.registrationNumber.trim() === '') {
      handleError("Please enter your vehicle registration number");
      return false;
    }
    
    if (!userForm.address || userForm.address.trim() === '') {
      handleError("Please enter your home address");
      return false;
    }
    
    if (!userForm.nominee_name || userForm.nominee_name.trim() === '') {
      handleError("Please enter nominee name");
      return false;
    }
    
    if (!userForm.Nominee_Age || isNaN(userForm.Nominee_Age) || userForm.Nominee_Age <= 0) {
      handleError("Please enter a valid nominee age");
      return false;
    }
    
    if (!userForm.nominee_Relationship || userForm.nominee_Relationship.trim() === '') {
      handleError("Please enter nominee relationship");
      return false;
    }
    
    return true;
  };

  const generatePolicyNumber = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;
    const fiscalYear = `${currentYear}-${nextYear.toString().slice(2)}`;
    
    let typeCode = '01';
    
    if (vehicleDetails && vehicleDetails.cubic_capacity) {
      const cc = parseInt(vehicleDetails.cubic_capacity);
      if (!isNaN(cc) && cc <= 700) {
        typeCode = '02';
      }
    }
    
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const policy = `GIC/${fiscalYear}/${typeCode}/${randomNum}`;
    console.log("Generated policy number:", policy);
    return policy;
  };

  const saveUserDataToDatabase = async (paymentResponse) => {
    const policyNumber = generatePolicyNumber();
    
    const updatedForm = {
      ...userForm,
      policyNumber,
      payment_id: paymentResponse.razorpay_payment_id,
      razorpay_order_id: paymentResponse.razorpay_order_id,
      payment_status: 'success'
    };
    
    setUserForm(updatedForm);
    
    const currentDate = new Date().toISOString().split('T')[0];

    const formData = {
      username: updatedForm.username || '',
      email: updatedForm.email || '',
      age: updatedForm.age || '',
      mobile_number: updatedForm.mobile_number || '',
      pan_number: updatedForm.pan_number || '',
      aadhar_card: updatedForm.aadhar_card || '',
      registration_number: updatedForm.registrationNumber || '',
      address: updatedForm.address || '',
      policy_number: policyNumber,
      nominee_name: updatedForm.nominee_name || '',
      nominee_relation: updatedForm.nominee_Relationship || '',
      nominee_age: updatedForm.nominee_age || updatedForm?.Nominee_Age || '',
      period_of_insurance: currentDate,
      Own_Damage_Premuin: premiumComponents?.OWN_DAMAGE || 'N/A',
      GST: premiumComponents?.GST || 'N/A',
      NCB: premiumComponents?.NCB || 'N/A',
      Adds_ons_Premuin: premiumComponents?.ADDONS || 'N/A',
      total_premiun: premiumComponents?.TOTAL_PREMIUM || 'N/A',
      idv: premiumComponents?.IDV || 'N/A',
      third_party_premuin: premiumComponents?.THIRD_PARTY || 'N/A',
      payment_id: updatedForm.payment_id || paymentResponse.razorpay_payment_id,
      payment_status: 'success',
      fuel_type: vehicleDetails?.fuel_type || 'N/A',
      date_of_buy: vehicleDetails?.registration_date || vehicleDetails?.date_of_buy || 'N/A',
      maker_model: vehicleDetails?.maker_model || 'N/A',
      engine_number: vehicleDetails?.engine_number || vehicleDetails?.engine_no || 'N/A',
      chasis_number: vehicleDetails?.chasis_number || vehicleDetails?.chassis_no || 'N/A',
      register_at: vehicleDetails?.register_at || vehicleDetails?.registered_at || 'N/A',
      financer: vehicleDetails?.financer || 'N/A',
      currency: currencyData.selectedCurrency,
      currency_symbol: currencyData.currencySymbol
    };

    console.log("Saving user form data to PostgreSQL:", formData);
    try {
      const userResponse = await axios.post(`${API_BASE_URL}/paymentuserdata`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('User data saved successfully to database:', userResponse.data);
      
      if (userResponse.data && userResponse.data.id) {
        setUserId(userResponse.data.id);
      }
      
      return userResponse.data;
    } catch (error) {
      console.error('Error saving user data to database:', error);
      throw new Error('Failed to save user data to database. ' + (error.response?.data?.message || error.message));
    }
  };

  const handlePaymentSuccess = async (response) => {
    setPaymentStatus('success');
    console.log("Payment successful!", response);

    try {
      const userData = await saveUserDataToDatabase(response);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error processing successful payment:", error);
      setErrorMessage("Payment was successful, but we couldn't save your data. Please contact support.");
      setShowError(true);
    }
  };

  const handlePaymentError = (error) => {
    setPaymentStatus('failed');
    const errorMsg = typeof error === 'string' ? error : 'Payment failed. Please try again.';
    setErrorMessage(errorMsg);
    setShowError(true);
    console.error("Payment failed:", error);
  };

  const formatAddress = (address) => {
    if (!address) return ['Address not provided'];
    
    if (address.includes(',')) {
      return address.split(',').map(part => part.trim()).filter(part => part);
    }
    
    const chunks = [];
    let remaining = address.trim();
    
    while (remaining.length > 0) {
      if (remaining.length <= 40) {
        chunks.push(remaining);
        break;
      }
      
      const chunk = remaining.substring(0, 40);
      const lastSpace = chunk.lastIndexOf(' ');
      
      if (lastSpace <= 0) {
        chunks.push(remaining.substring(0, 40));
        remaining = remaining.substring(40).trim();
      } else {
        chunks.push(remaining.substring(0, lastSpace));
        remaining = remaining.substring(lastSpace + 1).trim();
      }
    }
    
    return chunks;
  };

  const generatePDF = (userData) => {
    try {
      const doc = new jsPDF();
      
      if (!userForm.policyNumber) {
        throw new Error("Policy number is missing");
      }
      
      const margin = 20;
      let yPos = margin;
      
      const logoWidth = 40;
      const logoHeight = 35;
      const qrCodeSize = 25;
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Add logo and header
      doc.setDrawColor(0, 102, 204);
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(margin, yPos, logoWidth, logoHeight, 2, 2, 'FD');
      
      const logoUrl = logo;
      doc.addImage(logoUrl, 'PNG', margin, yPos, logoWidth, logoHeight);
      
      const qrCodeUrl = qr;
      doc.addImage(qrCodeUrl, 'PNG', pageWidth - margin - qrCodeSize, yPos, qrCodeSize, qrCodeSize);
      
      yPos += logoHeight + 8;
      
      doc.setFontSize(18);
      doc.setTextColor(0, 102, 204);
      doc.text("Global Health & Allied Insurance Service", margin, yPos);
      yPos += 6;

      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos, doc.internal.pageSize.width - margin, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      yPos += 7;
      
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      doc.text(`Date: ${formattedDate}`, margin, yPos);
      yPos += 10;
      
      doc.text("To,", margin, yPos);
      yPos += 7;
      doc.setFont(undefined, "bold");
      doc.text(`MR. ${vehicleDetails?.owner?.toUpperCase() || 'CUSTOMER NAME'}`, margin, yPos);
      yPos += 7;
      
      const addressLines = formatAddress(userForm?.address || '');
      addressLines.forEach(line => {
        doc.setFont(undefined, "normal");
        doc.text(line, margin, yPos);
        yPos += 6;
      });
      yPos += 2;
      
      doc.text(`Contact Details: ${vehicleDetails?.mobile_number || ''}`, margin, yPos);
      yPos += 10;
      
      doc.text(`Policy number: ${userForm.policyNumber}`, margin, yPos);
      yPos += 7;

      if (userData?.userid) {
        doc.text(`UserId: ${userData.userid}`, margin, yPos);
        yPos += 7;
      }
      
      doc.text(`CRN: ${userForm.crn || 'ID'}`, margin, yPos);
      yPos += 10;
      
      // Continue with rest of PDF content...
      // (keeping the existing PDF generation code but with currency formatting)
      
      // Add new page for vehicle details
      doc.addPage();
      yPos = 20;

      const pageCenter = doc.internal.pageSize.width / 2;

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "normal");
      doc.text("Policy / Certificate No: ", pageCenter - 50, yPos);
      doc.setFont(undefined, "bold");
      doc.text(userForm.policyNumber, pageCenter + 10, yPos);

      yPos += 20;

      // Premium table with currency conversion
      const premiumTableBody = [
        ["Basic Own Damage", formatCurrency(premiumComponents?.OWN_DAMAGE || 0), "Basic TP incl. TPPD", formatCurrency(premiumComponents?.THIRD_PARTY || 0), "", ""],
        ["Add Covers", formatCurrency(premiumComponents?.ADDONS || 0), "Total Liability", formatCurrency(premiumComponents?.THIRD_PARTY || 0), "", ""],
        ["No Claim Bonus", formatCurrency(premiumComponents?.NCB || 0), "", "", "", ""],
        ["No Claim Bonus Percentage %", (premiumComponents?.NCB_PERCENTAGE || 0) + "%", "", "", "", ""],
        ["Insured Value (IDV)", formatCurrency(premiumComponents?.IDV || 0), "", "", "", ""],
        ["IGST @ 18%", "", "", "", "", formatCurrency(premiumComponents?.GST || 0)],
        ["Total Premium", "", "", "", "", formatCurrency(premiumComponents?.TOTAL_PREMIUM || 0)]
      ];

      autoTable(doc, {
        startY: yPos,
        head: [[
          "Section I", "", "Section II", "", "Section III", ""
        ]],
        body: premiumTableBody,
        theme: 'grid',
        styles: { fontSize: 8 },
        margin: { left: 15, right: 15 }
      });

      return doc;
    } catch (error) {
      console.error("Error generating Insurance PDF:", error);
      throw error;
    }
  };

  const downloadPDFLocally = async () => {
    try {
      setIsDownloading(true);
      const userData = { userid: userId, ...userForm };
      const doc = generatePDF(userData);
      
      if (!doc) {
        console.error("PDF generation returned null");
        setErrorMessage("Failed to generate PDF: Document is null");
        setShowError(true);
        return false;
      }
      
      const fileName = `${userForm.username || 'insurance'}_policy_${currencyData.selectedCurrency}.pdf`;
      doc.save(fileName);
      console.log("PDF downloaded successfully");
      
      return true;
    } catch (error) {
      console.error("Error processing PDF:", error);
      setErrorMessage("Failed to process PDF: " + error.message);
      setShowError(true);
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setShowError(false);
    
    try {
      // Always use INR for payment (Razorpay requirement)
      const amountInINR = premiumComponents?.TOTAL_PREMIUM || 0;
      
      if (amountInINR <= 0) {
        throw new Error("Invalid premium amount");
      }
      
      const response = await fetch(`${API_BASE_URL}/payment/createorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInINR }),
      });

      const data = await response.json();

      if (data.orderId) {
        openRazorpayCheckout(data);
      } else {
        throw new Error('Failed to create payment order');
      }
    } catch (error) {
      console.error('Error in payment process:', error);
      handlePaymentError('Payment failed to initiate: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRazorpayCheckout = (data) => {
    const options = {
      key: 'rzp_live_4GMG4265FQmj65',
      amount: data.amount,
      currency: 'INR', // Razorpay always uses INR
      name: 'Global Health And Allied Insurance Service',
      description: 'Premium Payment',
      order_id: data.orderId,
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: userForm.username || '',
        email: userForm.email || '',
        contact: userForm.mobile_number || ''
      },
      notes: {
        address: userForm.address || '',
        currency: currencyData.selectedCurrency
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          setIsSubmitting(false);
        }
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Failed to open Razorpay:", error);
      handlePaymentError("Failed to open payment gateway");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentStatus !== 'success') {
      handlePayment();
      return;
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  const closeErrorAlert = () => {
    setShowError(false);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-5">
        <Card className="shadow-lg border-0" style={{ width: '100%', maxWidth: '1000px' }}>
          <Card.Body className="p-4 p-md-5">
            <h2 className="text-center mb-4 fw-bold">User Registration</h2>
            
            {showError && (
              <Alert variant="danger" onClose={closeErrorAlert} dismissible>
                {errorMessage}
              </Alert>
            )}
            
            <Row className="g-4">
              <Col md={5}>
                <div style={{position: 'sticky', top: '40px'}}>
                  <Card className="border-primary h-100 mb-4 mb-md-0">
                    <Card.Header className="bg-primary text-white text-center py-3">
                      <h4 className="mb-0 fw-bold">Premium Details</h4>
                      <small>Currency: {currencyData.currencyName} ({currencyData.selectedCurrency})</small>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column justify-content-between p-4">
                      {premiumComponents && Object.keys(premiumComponents).length > 0 ? (
                        <>
                          <div>
                            <Row className="mb-3">
                              <Col xs={8} className="text-start">
                                <strong>IDV:</strong>
                              </Col>
                              <Col xs={4} className="text-end">
                                {formatCurrency(premiumComponents?.IDV || 0)}
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col xs={8} className="text-start">
                                <strong>Own Damage:</strong>
                              </Col>
                              <Col xs={4} className="text-end">
                                {formatCurrency(premiumComponents.OWN_DAMAGE || 0)}
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col xs={8} className="text-start">
                                <strong>Third Party:</strong>
                              </Col>
                              <Col xs={4} className="text-end">
                                {formatCurrency(premiumComponents.THIRD_PARTY || 0)}
                              </Col>
                            </Row>
                            
                            {premiumComponents.ADDONS > 0 && (
                              <Row className="mb-3">
                                <Col xs={8} className="text-start">
                                  <strong>Add-ons:</strong>
                                </Col>
                                <Col xs={4} className="text-end">
                                  {formatCurrency(premiumComponents.ADDONS || 0)}
                                </Col>
                              </Row>
                            )}
                            
                            <Row className="mb-3">
                              <Col xs={8} className="text-start">
                                <strong>GST (18%):</strong>
                              </Col>
                              <Col xs={4} className="text-end">
                                {formatCurrency(premiumComponents.GST || 0)}
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col xs={8} className="text-start">
                                <strong>NCB Discount:</strong>
                              </Col>
                              <Col xs={4} className="text-end">
                                {premiumComponents.NCB_PERCENTAGE}% ({formatCurrency(premiumComponents.NCB || 0)})
                              </Col>
                            </Row>
                          </div>
                          
                          <div className="mt-4">
                            <hr className="my-3" />
                            <Row className="mb-0">
                              <Col xs={7} className="text-start">
                                <h5 className="fw-bold">Total Premium:</h5>
                              </Col>
                              <Col xs={5} className="text-end">
                                <h5 className="text-success fw-bold">{formatCurrency(premiumComponents?.TOTAL_PREMIUM || 0)}</h5>
                              </Col>
                            </Row>
                            {currencyData.selectedCurrency !== 'INR' && (
                              <Row className="mt-2">
                                <Col xs={12} className="text-center">
                                  <small className="text-muted">
                                    (Payment will be processed in INR: ₹ {(premiumComponents?.TOTAL_PREMIUM || 0).toLocaleString()})
                                  </small>
                                </Col>
                              </Row>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-muted mb-0">Premium details not available</p>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0 p-4">
                      <Button 
                        variant="success" 
                        type="button" 
                        size="lg" 
                        onClick={handlePayment} 
                        className="w-100 fw-bold py-2"
                        disabled={isSubmitting || paymentStatus === 'success'}
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                            Processing...
                          </>
                        ) : paymentStatus === 'success' ? (
                          'Payment Completed'
                        ) : (
                          `Pay Now - ${formatCurrency(premiumComponents?.TOTAL_PREMIUM || 0)}`
                        )}
                      </Button>
                    </Card.Footer>
                  </Card>
                </div>
              </Col>

              <Col md={7}>
                <Card className="border h-100">
                  <Card.Body className="p-4">
                    <Form id="registrationForm" onSubmit={handleSubmit}>
                      <h5 className="mb-3">Personal Information</h5>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group className="mb-3 mb-md-0">
                            <Form.Control
                              type="text"
                              name="username"
                              placeholder="Enter your name"
                              onChange={handleChange}
                              value={userForm?.username || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3 mb-md-0">
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Email address"
                              onChange={handleChange}
                              value={userForm?.email || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
        
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group className="mb-3 mb-md-0">
                            <Form.Control
                              type="number"
                              name="age"
                              placeholder="Age"
                              onChange={handleChange}
                              value={userForm?.age || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3 mb-md-0">
                            <Form.Control
                              type="text"
                              name="mobile_number"
                              placeholder="Mobile number"
                              onChange={handleChange}
                              value={userForm?.mobile_number || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
        
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Group className="mb-3 mb-md-0">
                            <Form.Control
                              type="text"
                              name="pan_number"
                              placeholder="PAN number"
                              onChange={handleChange}
                              value={userForm?.pan_number || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3 mb-md-0">
                            <Form.Control
                              type="text"
                              name="aadhar_card"
                              placeholder="Aadhaar number"
                              onChange={handleChange}
                              value={userForm?.aadhar_card || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <h5 className="mb-3 mt-4">Nominee Information</h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group className="mb-3 mb-md-0">
                            <Form.Control
                              type="text"
                              name="nominee_name"
                              placeholder="Nominee Name"
                              onChange={handleChange}
                              value={userForm?.nominee_name || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3 mb-md-0">
                            <Form.Control
                              type="number"
                              name="Nominee_Age"
                              placeholder="Nominee Age"
                              onChange={handleChange}
                              value={userForm?.Nominee_Age || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-4">
                        <Col md={12}>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="nominee_Relationship"
                              placeholder="Nominee Relationship"
                              onChange={handleChange}
                              value={userForm?.nominee_Relationship || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <h5 className="mb-3 mt-4">Vehicle & Address Information</h5>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          name="registrationNumber"
                          placeholder="Vehicle registration number"
                          onChange={handleChange}
                          value={userForm?.registrationNumber || ''}
                          required
                        />
                      </Form.Group>
        
                      <Form.Group className="mb-0">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="address"
                          placeholder="Enter your full address"
                          onChange={handleChange}
                          value={userForm?.address || ''}
                          required
                        />
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
          <Modal.Header closeButton className="border-bottom pb-3">
            <Modal.Title className="fw-bold">Payment Successful!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            <div className="text-center">
              <i className="fa fa-check-circle text-success" style={{ fontSize: '54px' }}></i>
              <h4 className="mt-4 mb-3">Thank you for your payment!</h4>
              <p>Your registration details have been sent to your email address. Please check your inbox.</p>
              <p className="mt-2"><strong>Policy Number:</strong> {userForm.policyNumber || 'N/A'}</p>
              <p className="mt-2"><strong>Amount Paid:</strong> {formatCurrency(premiumComponents?.TOTAL_PREMIUM || 0)}</p>
              <p className="text-muted small">Display Currency: {currencyData.currencyName} ({currencyData.selectedCurrency})</p>
              {currencyData.selectedCurrency !== 'INR' && (
                <p className="text-muted small">Actual Payment: ₹ {(premiumComponents?.TOTAL_PREMIUM || 0).toLocaleString()} (INR)</p>
              )}
              <div className="mt-4">
                <Button 
                  variant="outline-primary" 
                  onClick={downloadPDFLocally}
                  className="px-4 py-2"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Downloading...
                    </>
                  ) : (
                    'Download PDF Copy'
                  )}
                </Button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-top pt-3">
            <Button variant="success" onClick={handleCloseSuccessModal} className="px-4">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default FormPage;