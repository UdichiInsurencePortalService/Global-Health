import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/Usercontext';
import { Card, Form, Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/Home/global-logo.png';
import qr from '../assets/kunal.jpeg';

// Base URL for API
const API_BASE_URL = 'http://localhost:8080/api';

const FormPage = () => {
  const { userForm, setUserForm } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [premiumComponents, setPremiumComponents] = useState({});
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'success', 'failed'

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
    // Get stored vehicle details
    const storedVehicleDetails = localStorage.getItem('vehicleDetails');
    console.log("Raw data from localStorage:", storedVehicleDetails);
    
    // Get stored premium components data
    const storedPremiumComponents = localStorage.getItem('premiumComponents');
    console.log("Raw premium components data from localStorage:", storedPremiumComponents);
    
    // Process vehicle details
    if (storedVehicleDetails) {
      try {
        const parsedDetails = JSON.parse(storedVehicleDetails);
        
        // Normalize the vehicle details to ensure consistent property names
        const normalizedDetails = {
          // Owner information
          owner: parsedDetails.owner || parsedDetails.username || '',
          mobile_number: parsedDetails.mobile_number || parsedDetails.mobileNumber || parsedDetails.phone || '',
          address: parsedDetails.address || '',
          
          // Vehicle information
          vehicle_no: parsedDetails.vehicle_no || parsedDetails.registrationNumber || parsedDetails.registration_number || parsedDetails.vehicleNo || '',
          maker_model: parsedDetails.maker_model || parsedDetails.make || parsedDetails.makerModel || '',
          model: parsedDetails.model || '',
          variant: parsedDetails.variant || parsedDetails.color || '',
          year: parsedDetails.registration_date || parsedDetails.registration_date || '',
          engine_no: parsedDetails.engine_no || parsedDetails.engine_number || parsedDetails.engine_number || '',
          chassis_no: parsedDetails.chassis_no || parsedDetails.chasi_number || parsedDetails.chasi_number || '',
          cubic_capacity: parsedDetails.cubic_capacity || parsedDetails.cc || parsedDetails.cubicCapacity || '',
          fuel_type: parsedDetails.fuel_type || parsedDetails.fuel || parsedDetails.fuelType || '',
          financer: parsedDetails.financer || parsedDetails.financer || parsedDetails.financer || '',
          registered_at: parsedDetails.register_at || parsedDetails.register_at || parsedDetails.registered_at || '',
        };
        
        // Set the normalized state
        setVehicleDetails(normalizedDetails);
        
        // Update the form with data from localStorage
        setUserForm(prevForm => {
          const updatedForm = {
            ...prevForm,
            username: normalizedDetails.owner || prevForm.username || '',
            mobile_number: normalizedDetails.mobile_number || prevForm.mobile_number || '',
            address: normalizedDetails.address || prevForm.address || '',
            registrationNumber: normalizedDetails.vehicle_no || prevForm.registrationNumber || ''
          };
          return updatedForm;
        });
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setErrorMessage("Failed to load saved data. Error: " + error.message);
        setShowError(true);
      }
    }
    
    // Process premium components data
    if (storedPremiumComponents) {
      try {
        const parsedPremiumComponents = JSON.parse(storedPremiumComponents);
        setPremiumComponents(parsedPremiumComponents);
      } catch (error) {
        console.error("Error parsing premium components data:", error);
      }
    }
  }, [setUserForm]);

  // Form input change handler
  const handleChange = (e) => {
    setUserForm(prevForm => ({ 
      ...prevForm, 
      [e.target.name]: e.target.value 
    }));
  };

  // Form validation
  const validateForm = () => {
    // Basic validation rules
    if (!userForm.username || userForm.username.trim() === '') {
      setErrorMessage("Please enter your full name");
      setShowError(true);
      return false;
    }
    
    if (!userForm.email || !/\S+@\S+\.\S+/.test(userForm.email)) {
      setErrorMessage("Please enter a valid email address");
      setShowError(true);
      return false;
    }
    
    if (!userForm.age || isNaN(userForm.age) || userForm.age <= 0) {
      setErrorMessage("Please enter a valid age");
      setShowError(true);
      return false;
    }
    
    if (!userForm.mobile_number || !/^\d{10}$/.test(userForm.mobile_number)) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      setShowError(true);
      return false;
    }
    
    if (!userForm.pan_number || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(userForm.pan_number)) {
      setErrorMessage("Please enter a valid PAN number (e.g., ABCDE1234F)");
      setShowError(true);
      return false;
    }
    
    if (!userForm.aadhar_card || !/^\d{12}$/.test(userForm.aadhar_card)) {
      setErrorMessage("Please enter a valid 12-digit Aadhaar number");
      setShowError(true);
      return false;
    }
    
    if (!userForm.registrationNumber || userForm.registrationNumber.trim() === '') {
      setErrorMessage("Please enter your vehicle registration number");
      setShowError(true);
      return false;
    }
    
    if (!userForm.address || userForm.address.trim() === '') {
      setErrorMessage("Please enter your home address");
      setShowError(true);
      return false;
    }
    
    if (!userForm.nominee_name || userForm.nominee_name.trim() === '') {
      setErrorMessage("Please enter nominee name");
      setShowError(true);
      return false;
    }
    
    if (!userForm.Nominee_Age || isNaN(userForm.Nominee_Age) || userForm.Nominee_Age <= 0) {
      setErrorMessage("Please enter a valid nominee age");
      setShowError(true);
      return false;
    }
    
    if (!userForm.nominee_Relationship || userForm.nominee_Relationship.trim() === '') {
      setErrorMessage("Please enter nominee relationship");
      setShowError(true);
      return false;
    }
    
    return true;
  };
  
  // Save user data to localStorage
  const saveUserData = () => {
    try {
      localStorage.setItem('userData', JSON.stringify(userForm));
      console.log("User data saved to localStorage:", userForm);
      return true;
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
      return false;
    }
  };

  // Payment success handler
  const handlePaymentSuccess = (response) => {
    setPaymentStatus('success');
    console.log("Payment successful!", response);
    
    // Add payment details to form data
    const updatedForm = {
      ...userForm,
      payment_id: response.razorpay_payment_id,
      payment_status: 'success'
    };
    
    setUserForm(updatedForm);
    
    // Save updated data
    localStorage.setItem('userData', JSON.stringify(updatedForm));
    
    // Show success modal which will offer PDF download
    setShowSuccessModal(true);
  };

  // Payment error handler
  const handlePaymentError = (error) => {
    setPaymentStatus('failed');
    const errorMsg = typeof error === 'string' ? error : 'Payment failed. Please try again.';
    setErrorMessage(errorMsg);
    setShowError(true);
    console.error("Payment failed:", error);
  };

  // Initiate payment
  const handlePayment = async () => {
    // First validate form before initiating payment
    if (!validateForm()) {
      return;
    }
    
    const amount = premiumComponents?.totalPremium || 0;
    if (amount <= 0) {
      setErrorMessage("Invalid premium amount");
      setShowError(true);
      return;
    }

    try {
      // Create a Razorpay order
      const response = await fetch(`${API_BASE_URL}/payment/createorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (data.orderId) {
        // Save user data before payment
        saveUserData();
        
        // Open Razorpay checkout
        openRazorpayCheckout(data);
      } else {
        handlePaymentError('Failed to create payment order');
      }
    } catch (error) {
      console.error('Error:', error);
      handlePaymentError('Payment failed to initiate');
    }
  };

  // Open Razorpay checkout
  const openRazorpayCheckout = (data) => {
    const options = {
      key: 'rzp_live_4GMG4265FQmj65', // Razorpay Key ID
      amount: data.amount,
      currency: data.currency || 'INR',
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
        address: userForm.address || ''
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
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

  // Generate Policy Number
  const generatePolicyNumber = () => {
    // Get current fiscal year
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;
    const fiscalYear = `${currentYear}-${nextYear.toString().slice(2)}`;
    
    // Determine type code based on vehicle data
    let typeCode = '01'; // Default to car
    
    if (vehicleDetails && vehicleDetails.cubic_capacity) {
      const cc = parseInt(vehicleDetails.cubic_capacity);
      if (!isNaN(cc) && cc <= 700) {
        typeCode = '02'; // Bike or small vehicle
      }
    }
    
    // Generate a random 4-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    
    // Create the full policy number with GIC prefix
    return `GIC/${fiscalYear}/${typeCode}/${randomNum}`;
  };

  // Format address for PDF
  const formatAddress = (address) => {
    if (!address) return ['Address not provided'];
    
    // Split by commas
    if (address.includes(',')) {
      return address.split(',').map(part => part.trim()).filter(part => part);
    }
    
    // Otherwise split by character count
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

  // Generate PDF document
  const generatePDF = (userData) => {
    try {
      // Create a new jsPDF instance
      const doc = new jsPDF();
      
      // Generate a policy number if not already set
      if (!userData.policyNumber) {
        userData.policyNumber = generatePolicyNumber();
      }
      
      // Add company logo
      try {
        doc.addImage(logo, 'PNG', 15, 10, 60, 20);
      } catch (error) {
        console.warn("Could not add logo to PDF:", error);
      }
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 128);
      doc.text('INSURANCE POLICY CERTIFICATE', 105, 20, { align: 'center' });
      
      // Add policy details
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Policy Number: ${userData.policyNumber || 'N/A'}`, 15, 40);
      doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 15, 47);
      doc.text(`Valid Until: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}`, 15, 54);
      
      // Insured Person Details
      doc.setFont(undefined, 'bold');
      doc.text('INSURED DETAILS', 15, 65);
      doc.setFont(undefined, 'normal');
      
      // Create table for insured details
      autoTable(doc, {
        startY: 68,
        head: [],
        body: [
          ['Name', userData.username || 'N/A'],
          ['Age', userData.age || 'N/A'],
          ['Mobile', userData.mobile_number || 'N/A'],
          ['Email', userData.email || 'N/A'],
          ['PAN Number', userData.pan_number || 'N/A'],
          ['Aadhaar Number', userData.aadhar_card || 'N/A']
        ],
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 40 },
          1: { cellWidth: 100 }
        }
      });
      
      // Nominee Details
      doc.setFont(undefined, 'bold');
      doc.text('NOMINEE DETAILS', 15, doc.lastAutoTable.finalY + 15);
      doc.setFont(undefined, 'normal');
      
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 18,
        head: [],
        body: [
          ['Name', userData.nominee_name || 'N/A'],
          ['Age', userData.Nominee_Age || 'N/A'],
          ['Relationship', userData.nominee_Relationship || 'N/A']
        ],
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 40 },
          1: { cellWidth: 100 }
        }
      });
      
      // Vehicle Details
      doc.setFont(undefined, 'bold');
      doc.text('VEHICLE DETAILS', 15, doc.lastAutoTable.finalY + 15);
      doc.setFont(undefined, 'normal');
      
      const vehicleRows = [
        ['Registration No.', userData.registrationNumber || vehicleDetails.vehicle_no || 'N/A'],
        ['Make/Model', vehicleDetails.maker_model || 'N/A'],
        ['Cubic Capacity', vehicleDetails.cubic_capacity || 'N/A'],
        ['Engine No.', vehicleDetails.engine_no || 'N/A'],
        ['Chassis No.', vehicleDetails.chassis_no || 'N/A'],
        ['Fuel Type', vehicleDetails.fuel_type || 'N/A']
      ];
      
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 18,
        head: [],
        body: vehicleRows,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 40 },
          1: { cellWidth: 100 }
        }
      });
      
      // Premium Details
      doc.setFont(undefined, 'bold');
      doc.text('PREMIUM DETAILS', 15, doc.lastAutoTable.finalY + 15);
      doc.setFont(undefined, 'normal');
      
      const premiumRows = [
        ['Own Damage Premium', `₹${premiumComponents.ownDamagePremium || 0}`],
        ['Add-ons Premium', `₹${premiumComponents.addOnsPremium || 0}`],
        ['GST (18%)', `₹${premiumComponents.gst || 0}`],
        ['NCB Discount', `₹${premiumComponents.ncbDiscount || 0}`],
        ['Total Premium', `₹${premiumComponents.totalPremium || 0}`]
      ];
      
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 18,
        head: [],
        body: premiumRows,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 60 },
          1: { cellWidth: 60, halign: 'right' }
        }
      });
      
      // Address
      doc.setFont(undefined, 'bold');
      doc.text('CORRESPONDENCE ADDRESS', 15, doc.lastAutoTable.finalY + 15);
      doc.setFont(undefined, 'normal');
      
      const addressLines = formatAddress(userData.address);
      
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 18,
        head: [],
        body: [['Address', addressLines.join('\n')]],
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 40 },
          1: { cellWidth: 100 }
        }
      });
      
      // Add QR code (if available)
      try {
        doc.addImage(qr, 'JPEG', 160, 20, 35, 35);
      } catch (error) {
        console.warn("Could not add QR code to PDF:", error);
      }
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('This is a digitally generated document and does not require a physical signature.', 105, 280, { align: 'center' });
      doc.text('Global Health And Allied Insurance Service', 105, 285, { align: 'center' });
      
      return doc;
    } catch (error) {
      console.error("Error generating Insurance PDF:", error);
      throw error;
    }
  };

  // Download PDF
  const downloadPDFLocally = (userData) => {
    try {
      const doc = generatePDF(userData);
      
      if (doc) {
        // Save the policy number to the form data if generated in PDF
        if (userData.policyNumber && !userForm.policyNumber) {
          setUserForm(prev => ({
            ...prev,
            policyNumber: userData.policyNumber
          }));
        }
        
        doc.save(`${userData.username || 'insurance'}_policy.pdf`);
        console.log("PDF generated and downloaded successfully");
        return true;
      } else {
        console.error("PDF generation returned null");
        setErrorMessage("Failed to generate PDF: Document is null");
        setShowError(true);
        return false;
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setErrorMessage("Failed to download PDF: " + error.message);
      setShowError(true);
      return false;
    }
  };

  // Test server connection
  const testServerConnection = async () => {
    try {
      await axios.options(`${API_BASE_URL}/paymentuserdata`, { 
        timeout: 5000
      });
      return true;
    } catch (error) {
      console.error("Server connection failed:", error);
      return false;
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // If payment is not successful, initiate payment
    if (paymentStatus !== 'success') {
      handlePayment();
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First save data to localStorage as a backup
      saveUserData();
      
      // Check server connection before proceeding
      const isServerConnected = await testServerConnection();
      if (!isServerConnected) {
        throw new Error("Server is not available. Please try again later.");
      }
      
      // Make sure policy number is generated if not present
      if (!userForm.policyNumber) {
        const updatedForm = {
          ...userForm,
          policyNumber: generatePolicyNumber()
        };
        setUserForm(updatedForm);
        localStorage.setItem('userData', JSON.stringify(updatedForm));
      }
      
      // Prepare data for API
      const formData = {
        username: userForm.username || '',
        email: userForm.email || '',
        age: userForm.age || '',
        mobile_number: userForm.mobile_number || '',
        pan_number: userForm.pan_number || '',
        aadhar_card: userForm.aadhar_card || '',
        registration_number: userForm.registrationNumber || '',
        address: userForm.address || '',
        policy_number: userForm.policyNumber || '',
        nominee_name: userForm.nominee_name || '',
        nominee_relation: userForm.nominee_Relationship || '',
        nominee_age: userForm.Nominee_Age || '',
        period_of_insurance: '1 year',
        payment_id: userForm.payment_id || '',
        payment_status: userForm.payment_status || 'success'
      };
      
      // Send user data to backend
      try {
        const userResponse = await axios.post(`${API_BASE_URL}/paymentuserdata`, formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('User data API response:', userResponse.data);
      } catch (error) {
        console.error('Error saving user data to database:', error);
        throw new Error('Failed to save user data to database. ' + 
          (error.response?.data?.message || error.message));
      }
      
      // Generate PDF
      downloadPDFLocally(userForm);
      
      // Prepare PDF data for email
      const pdfFormData = new FormData();
      pdfFormData.append('email', userForm.email);
      pdfFormData.append('pdfFile', 'registration_details.pdf');
      
      // Send PDF via email
      try {
        const emailResponse = await axios.post(`${API_BASE_URL}/send-pdf-email`, pdfFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 12000
        });
        console.log('Email API response:', emailResponse.data);
      } catch (error) {
        console.error('Error sending email with PDF:', error);
        setErrorMessage("Registration successful, but we couldn't email your PDF. Please download it using the button below.");
        setShowError(true);
      }
      
      // Show success modal if not already shown
      if (!showSuccessModal) {
        setShowSuccessModal(true);
      }
      
    } catch (error) {
      console.error('API Error:', error);
      const errMsg = error.response?.data?.message || error.message || 
                    "An error occurred connecting to the server. Please try again later.";
      setErrorMessage(errMsg);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal close handler
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  // Close error alert
  const closeErrorAlert = () => {
    setShowError(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-4">
      <Card className="shadow-lg border-0" style={{ width: '100%', maxWidth: '1000px' }}>
        <Card.Body className="p-5">
          <h2 className="text-center mb-4">User Registration</h2>
          
          {showError && (
            <Alert variant="danger" onClose={closeErrorAlert} dismissible>
              {errorMessage}
            </Alert>
          )}
          
          <Row className="g-4">
            {/* Premium Details Card - Left Side */}
            <Col md={5}>
              <Card className="border-primary h-100">
                <Card.Header className="bg-primary text-white text-center">
                  <h4 className="mb-0">Premium Details</h4>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  {premiumComponents && Object.keys(premiumComponents).length > 0 ? (
                    <>
                      <div>
                        <Row className="mb-3">
                          <Col xs={8} className="text-start">
                            <strong>Own-Damage-Premium:</strong>
                          </Col>
                          <Col xs={4} className="text-end">
                            ₹{premiumComponents.ownDamagePremium || 0}
                          </Col>
                        </Row>
                        
                        {premiumComponents.add_ons && (
                          <Row className="mb-3">
                            <Col xs={8} className="text-start">
                              <strong>Add-ons:</strong>
                            </Col>
                            <Col xs={4} className="text-end">
                              ₹{premiumComponents.addOnsPremium || 0}
                            </Col>
                          </Row>
                        )}
                        
                        <Row className="mb-3">
                          <Col xs={8} className="text-start">
                            <strong>GST (18%):</strong>
                          </Col>
                          <Col xs={4} className="text-end">
                            ₹{premiumComponents.gst || 0}
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col xs={8} className="text-start">
                            <strong>NCB:</strong>
                          </Col>
                          <Col xs={4} className="text-end">
                            ₹{premiumComponents.ncbDiscount || 0}
                          </Col>
                        </Row>
                        
                        <Row className="mb-3">
                          <Col xs={8} className="text-start">
                            <strong>Add-Ons Premium:</strong>
                          </Col>
                          <Col xs={4} className="text-end">
                            ₹{premiumComponents.addOnsPremium || 0}
                          </Col>
                        </Row>
                      </div>
                      
                      <div className="mt-auto">
                        <hr />
                        <Row className="mb-0">
                          <Col xs={8} className="text-start">
                            <h5>Total Premium:</h5>
                          </Col>
                          <Col xs={4} className="text-end">
                            <h5 className="text-success">₹{premiumComponents?.totalPremium || 0}</h5>
                          </Col>
                        </Row>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted mb-0">Premium details not available</p>
                  )}
                </Card.Body>
                <Card.Footer className="bg-white border-top-0 d-flex justify-content-center">
                  <Button 
                    variant="success" 
                    type="button" 
                    size="lg" 
                    disabled={isSubmitting || paymentStatus === 'success'}
                    onClick={handlePayment}
                    className="w-100"
                  >
                    {isSubmitting ? 'Processing...' : 
                     paymentStatus === 'success' ? 'Payment Completed' : 
                     `Pay Now - ₹${premiumComponents?.totalPremium || 0}`}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

        
        {/* Registration Form - Right Side */}
        <Col md={7}>
          <Card className="border h-100">
            <Card.Body>
              <Form id="registrationForm" onSubmit={handleSubmit}>
                {/* Name and Email in parallel */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
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
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
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
      
                {/* Age and Mobile in parallel */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Age <span className="text-danger">*</span></Form.Label>
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
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
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
      
                {/* PAN and Aadhaar in parallel */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>PAN Number <span className="text-danger">*</span></Form.Label>
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
                    <Form.Group className="mb-3">
                      <Form.Label>Aadhaar Number <span className="text-danger">*</span></Form.Label>
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

                {/* Nomineee form */}


                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nominee Name <span className="text-danger">*</span></Form.Label>
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
                    <Form.Group className="mb-3">
                      <Form.Label>Nominee Age<span className="text-danger">*</span></Form.Label>
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

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nominee-Relationship <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="nominee_Relationship"
                        placeholder="Nominee-Relatoinship"
                        onChange={handleChange}
                        value={userForm?.nominee_Relationship || ''}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>



                
                {/* nommiee form */}
      
                {/* Vehicle Registration */}
                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Registration Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="registrationNumber"
                    placeholder="Vehicle registration number"
                    onChange={handleChange}
                    value={userForm?.registrationNumber || ''}
                    required
                  />
                </Form.Group>
      
                {/* Home Address */}
                <Form.Group className="mb-0">
                  <Form.Label>Home Address <span className="text-danger">*</span></Form.Label>
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

  {/* Success Modal */}
  <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>Payment Successful!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="text-center">
        <i className="fa fa-check-circle text-success" style={{ fontSize: '48px' }}></i>
        <h4 className="mt-3">Thank you for your payment!</h4>
        <p>Your registration details have been sent to your email address. Please check your inbox.</p>
        <div className="mt-3">
          <Button 
            variant="outline-primary" 
            onClick={downloadPDFLocally}
            className="mt-2"
          >
            Download PDF Copy
          </Button>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={handleCloseSuccessModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</div>
  );
};

export default FormPage;