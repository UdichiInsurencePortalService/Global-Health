  import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/Usercontext';
import { Card, Form, Button, Row, Col, Modal, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { handleError } from '../errortoast';
// Import jsPDF for PDF generation
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
// Optional: Import autoTable for better table support in PDFs
import 'jspdf-autotable';
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
  const [userId, setUserId] = useState(null); // To store the user ID returned from database
  const [isDownloading, setIsDownloading] = useState(false);

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
  
  // Save user data to localStorage
  const saveUserDataToLocalStorage = () => {
    try {
      localStorage.setItem('userData', JSON.stringify(userForm));
      console.log("User data saved to localStorage:", userForm);
      return true;
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
      return false;
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
    const policy = `GIC/${fiscalYear}/${typeCode}/${randomNum}`;
    console.log("Generated policy number:", policy);
    return policy;
  };

  // Save user data to PostgreSQL database (after payment success)
  const saveUserDataToDatabase = async (paymentResponse) => {
    // Generate policy number
    const policyNumber = generatePolicyNumber();
    
    // Update form with policy number and payment details
    const updatedForm = {
      ...userForm,
      policyNumber,
      payment_id: paymentResponse.razorpay_payment_id,
      razorpay_order_id: paymentResponse.razorpay_order_id,
      payment_status: 'success'
    };
    
    setUserForm(updatedForm);
    
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
  nominee_age: updatedForm.nominee_Age || '',
  payment_id: updatedForm.payment_id || paymentResponse.razorpay_payment_id,
  payment_status: 'success'
};

// Format the period_of_insurance as a PostgreSQL daterange string
if (updatedForm?.periodOfInsurance || updatedForm?.period_of_insurance || userForm?.periodOfInsurance || userForm?.period_of_insurance) {
  const periodObj = updatedForm?.periodOfInsurance || updatedForm?.period_of_insurance || 
                   userForm?.periodOfInsurance || userForm?.period_of_insurance;
                   
  if (periodObj.startDate && periodObj.endDate) {
    // Format dates as ISO strings without time part
    const startDate = new Date(periodObj.startDate).toISOString().split('T')[0];
    const endDate = new Date(periodObj.endDate).toISOString().split('T')[0];
    formData.period_of_insurance = `[${startDate},${endDate}]`;
  }
}

console.log("Saving user form data to PostgreSQL:", formData);
    try {
      const userResponse = await axios.post(`${API_BASE_URL}/paymentuserdata`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('User data saved successfully to database:', userResponse.data);
      
      // Save user ID for potential updates
      if (userResponse.data && userResponse.data.id) {
        setUserId(userResponse.data.id);
      }
      
      // Save updated data to localStorage with policy number
      localStorage.setItem('userData', JSON.stringify(updatedForm));
      
      return userResponse.data;
    } catch (error) {
      console.error('Error saving user data to database:', error);
      throw new Error('Failed to save user data to database. ' + (error.response?.data?.message || error.message));
    }
  };

  // Payment success handler
  const handlePaymentSuccess = async (response) => {
    setPaymentStatus('success');
    console.log("Payment successful!", response);
    
    try {
      // Save data to database AFTER payment is successful
      await saveUserDataToDatabase(response);
      
      // Show success modal which will offer PDF download
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error processing successful payment:", error);
      setErrorMessage("Payment was successful, but we couldn't save your data. Please try again or contact support.");
      setShowError(true);
    }
  };

  // Payment error handler
  const handlePaymentError = (error) => {
    setPaymentStatus('failed');
    const errorMsg = typeof error === 'string' ? error : 'Payment failed. Please try again.';
    setErrorMessage(errorMsg);
    setShowError(true);
    console.error("Payment failed:", error);
  };
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

  // Generate PDF with policy details
  const generatePDF = (setUserForm,setVehicleDetails, setPremiumComponents,userData,pdf,setUserId) => {
    
    try {
        console.log("Vehicle details inside generatePDF:>><<<<", setVehicleDetails, "User info:>>>><<<<<", setUserForm, "Premium components:", setPremiumComponents,"userdata components:", userData,"userdatapdf",setUserId);
    const doc = new jsPDF();
      if (!userForm.policyNumber) {
        throw new Error("Policy number is missing");
      }
         const margin = 20;
    let yPos = margin;
    
    // Add company logo - Using an image if available
    // This assumes you have a base64 encoded logo or a URL to an image
    // For example with a base64 string:
    const logoWidth = 40;
    const logoHeight = 35;
    const qrCodeSize = 25; // Adjust QR code size as needed
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Draw rounded rectangle for logo background
    doc.setDrawColor(0, 102, 204);
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(margin, yPos, logoWidth, logoHeight, 2, 2, 'FD');
    doc.setFontSize(8);
    doc.setTextColor(0, 102, 204);
    
    // Add logo image (left side)
    const logoUrl = logo;
    doc.addImage(logoUrl, 'PNG', margin, yPos, logoWidth, logoHeight);
    
    // Add QR code image (right side)
    const qrCodeUrl = qr; // Assuming 'qr' is your QR code image
    doc.addImage(qrCodeUrl, 'PNG', pageWidth - margin - qrCodeSize, yPos, qrCodeSize, qrCodeSize);
    
    // Update yPos after adding the logo and QR code
    yPos += logoHeight + 8;
    
    // Add company name with improved positioning
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204); // Blue color for branding
    doc.text("Global Health & Allied Insurance Service", margin, yPos);
    yPos += 6;

    // Add a line under the header
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, doc.internal.pageSize.width - margin, yPos);
    yPos += 10;
    
    // Reference number and date section
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    // doc.text(`Ref No.: ${refNumber}`, margin, yPos);
    yPos += 7;
    
    // Current date
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    doc.text(`Date: ${formattedDate}`, margin, yPos);
    yPos += 10;
    
    // Recipient details with better spacing
    doc.text("To,", margin, yPos);
    yPos += 7;
    doc.setFont(undefined, "bold");
    doc.text(`MR. ${vehicleDetails?.owner?.toUpperCase() || 'CUSTOMER NAME'}`, margin, yPos);
    yPos += 7;
    
    // Address formatting with improved spacing
    const addressLines = formatAddress(userForm?.address || '');
    addressLines.forEach(line => {
      doc.setFont(undefined, "normal");
      doc.text(line, margin, yPos);
      yPos += 6;
    });
    yPos += 2;
    
    // Contact details
    doc.text(`Contact Details: ${vehicleDetails?.mobile_number || ''}`, margin, yPos);
    yPos += 10;
    
    // Policy details with better spacing
    doc.text(`Policy number: ${userForm.policyNumber}`, margin, yPos);
        yPos += 7;

        doc.text(`UserId: ${userData?.userid}`, margin, yPos);
        console.log("user id generated>><<",userData)

    yPos += 7;
    doc.text(`CRN: ${userForm.crn || 'ID'}`, margin, yPos);
    yPos += 10;
    
    // Subject line with proper spacing
    doc.setFont(undefined, "bold");
    doc.text("Subject: Risk assumption for Car Secure", margin, yPos);
    yPos += 10;
    
    // Salutation
    doc.text(`Dear MR. ${vehicleDetails.owner?.toUpperCase() || 'CUSTOMER NAME'},`, margin, yPos);
    yPos += 10;
    
    // Content sections with improved spacing and margins
    doc.setFont(undefined, "normal");
    const sectionSpacing = 8;
    const lineSpacing = 6;
    
    // Welcome message
    const welcomeText = "We welcome you to Global Health & Allied Insurance Service and thank you for choosing us as your preferred service provider.";
    const welcomeLines = doc.splitTextToSize(welcomeText, doc.internal.pageSize.width - (margin * 2));
    doc.text(welcomeLines, margin, yPos);
    yPos += welcomeLines.length * lineSpacing + sectionSpacing;
    
    // Policy reference message
    const refText = "This is with reference to your above mentioned Policy issued under Car Secure.";
    doc.text(refText, margin, yPos);
    yPos += lineSpacing + sectionSpacing;
    
    // Policy schedule message
    const scheduleText = "Enclosed please find the Policy Schedule outlining the details of your policy. Kindly note that the proposal is underwritten and policy is issued based on the information submitted to us by you, as well as acceptance of the terms and conditions. Policy schedule must be read in conjunction with the product brochure and policy wordings. Please visit https://www.globalhealth.com/customersupport/";
    const scheduleLines = doc.splitTextToSize(scheduleText, doc.internal.pageSize.width - (margin * 2));
    doc.text(scheduleLines, margin, yPos);
    yPos += scheduleLines.length * lineSpacing + sectionSpacing;
    
    // Request for verification with improved font size
    doc.setFontSize(11);
    const verifyText = "We request you to carefully go through the same once again and in case of any disagreement, discrepancy or clarifications, please call us on our toll free number 1800-266-4545 or write to us at globalhealth235@gmail.com within 15 days from the date of this letter.";
    const verifyLines = doc.splitTextToSize(verifyText, doc.internal.pageSize.width - (margin * 2));
    doc.text(verifyLines, margin, yPos);
    yPos += verifyLines.length * lineSpacing + sectionSpacing;
    
    // Information verification note
    const infoVerifyText = "Please note that the information provided by you will be verified at the time of claim and the captured Policy shall be treated as void in case of any untrue or incorrect statement, misrepresentation, non-description or non-disclosure in any form whatsoever made by you or by your agent.";
    const infoVerifyLines = doc.splitTextToSize(infoVerifyText, doc.internal.pageSize.width - (margin * 2));
    doc.text(infoVerifyLines, margin, yPos);
    yPos += infoVerifyLines.length * lineSpacing + sectionSpacing;
    
    // Updates request
    const updatesText = "As a valued customer, we would like to provide regular updates on your policy through email and SMS. We therefore request you to keep us updated of any change in your contact details.";
    const updatesLines = doc.splitTextToSize(updatesText, doc.internal.pageSize.width - (margin * 2));
    doc.text(updatesLines, margin, yPos);
    yPos += updatesLines.length * lineSpacing + sectionSpacing;
    
    
    // Add a footer with proper positioning
    const footerY = doc.internal.pageSize.height - 15;
    doc.setFontSize(8);
    doc.text("Global Health & Allied Insurance Services", margin, footerY);
    doc.text("Page 1 of 2", doc.internal.pageSize.width - margin, footerY, { align: "right" });
    
    // Add a second page with improved layout
    doc.addPage();
    
    // Reset position for the second page
    yPos = margin;
    
    // Add header for the second page
    // Add logo placeholder on second page too
    // Logo section with better spacing
    const logoWidths = 40;
    const logoHeights = 35;
    const qrCodeSizes = 25; // Adjust QR code size as needed
    const pageWidths = doc.internal.pageSize.getWidth();
    
    // Draw rounded rectangle for logo background
    doc.setDrawColor(0, 102, 204);
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(margin, yPos, logoWidth, logoHeight, 2, 2, 'FD');
    doc.setFontSize(8);
    doc.setTextColor(0, 102, 204);
    
    // Add logo image (left side)
    const logoUrls = logo;
    doc.addImage(logoUrls, 'PNG', margin, yPos, logoWidths, logoHeights);
    
    // Add QR code image (right side)
    const qrCodeUrls = qr; // Assuming 'qr' is your QR code image
    doc.addImage(qrCodeUrls, 'PNG', pageWidths - margin - qrCodeSizes, yPos, qrCodeSizes, qrCodeSizes);
    
    // Update yPos after adding the logo and QR code
    yPos += logoHeight + 8;
// Center aligned titles for second page
const pageCenter = doc.internal.pageSize.width / 2;
const leftColumn = 20;
const rightColumn = 110;
const valueOffset = 45; // Increased offset for values
const rightValueOffset = 150;
const rowSpacing = 10; // Consistent row spacing

// Display policy number with better formatting
doc.setFontSize(11);
doc.setTextColor(0, 0, 0);
doc.setFont(undefined, "normal");
doc.text("Policy / Certificate No: ", pageCenter - 50, yPos);
doc.setFont(undefined, "bold");
doc.text(userForm.policyNumber, pageCenter + 10, yPos);

yPos += 20;

// Support text
doc.setFont(undefined, "normal");
doc.setFontSize(10);
doc.text("For any assistance please call 1800 266 4545 or visit www.globalhealth.com", pageCenter, yPos, { align: "center" });
yPos += 10; // Increased spacing after support text

// --- INSURED & POLICY DETAILS ---
const headerHeight = 10; // Increased header height
doc.setFontSize(11);
doc.setFont(undefined, "bold");
doc.setTextColor(255, 255, 255); // White text for blue headers
doc.setFillColor(0, 102, 204); // Blue background
doc.rect(15, yPos, 180, headerHeight, 'F'); // Full width header background
doc.text("INSURED DETAILS", 105, yPos + headerHeight/2 + 2, { align: "center", baseline: "middle" });

// Reset to black for content
doc.setTextColor(0, 0, 0);

// Initialize starting position after header
let y = yPos + headerHeight + 12; // Added more space after header

// First row with consistent spacing
const ownerName = (vehicleDetails.owner || "N/A").substring(0, 25);
doc.setFont(undefined, "bold");
doc.text("Name:", leftColumn, y);
doc.setFont(undefined, "normal");
doc.text(ownerName, valueOffset, y);

doc.setFont(undefined, "bold");
doc.text("Policy Issuing Office:", rightColumn, y);
doc.setFont(undefined, "normal");
doc.text(userForm.policyOffice || "Muscat, Oman (Headquarters)", rightValueOffset, y);
y += rowSpacing;

// Second row - Address
doc.setFont(undefined, "bold");
doc.text("Address:", leftColumn, y);
doc.setFont(undefined, "normal");
const addressLinesFormatted = doc.splitTextToSize(userForm.address, 60);
doc.text(addressLinesFormatted, valueOffset, y);

// Period of Insurance
doc.setFont(undefined, "bold");
doc.text("Period of Insurance:", rightColumn, y);
doc.setFont(undefined, "normal");

function generateInsurancePeriod() {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1);
  endDate.setDate(endDate.getDate() - 1);
  
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const fromFormatted = startDate.toLocaleDateString('en-GB', options);
  const toFormatted = endDate.toLocaleDateString('en-GB', options);
  
  return {
    startDate: startDate,
    endDate: endDate,
    fromFormatted: fromFormatted,
    toFormatted: toFormatted
  };
}

if (!userForm.periodOfInsurance) {
  userForm.periodOfInsurance = generateInsurancePeriod();
}

// Display period of insurance
const periodText = `${userForm.periodOfInsurance.fromFormatted} to ${userForm.periodOfInsurance.toFormatted}`;
doc.text(periodText, rightValueOffset, y);

// Calculate next y position based on address lines length
const addressLineCount = addressLinesFormatted.length;
y += Math.max(addressLineCount * 5, rowSpacing);
y += 5; // Add a bit more space after address

// Third row
doc.setFont(undefined, "bold");
doc.text("Phone:", leftColumn, y);
doc.setFont(undefined, "normal");
doc.text(vehicleDetails?.mobile_number || "NA", valueOffset, y);

doc.setFont(undefined, "bold");
doc.text("Type of Vehicle:", rightColumn, y);
doc.setFont(undefined, "normal");
doc.text(userForm.vehicleType || "Private Vehicle", rightValueOffset, y);
y += rowSpacing;

// Fourth row
doc.setFont(undefined, "bold");
doc.text("Mobile:", leftColumn, y);
doc.setFont(undefined, "normal");
doc.text(vehicleDetails?.mobile_number || "N/A", valueOffset, y);

doc.setFont(undefined, "bold");
doc.text("Hypothecated to:", rightColumn, y);
doc.setFont(undefined, "normal");
doc.text(vehicleDetails?.financer || "N/A", rightValueOffset, y);
y += rowSpacing;

// Fifth row
doc.setFont(undefined, "bold");
doc.text("Email:", leftColumn, y);
doc.setFont(undefined, "normal");
doc.text(userForm.email || "N/A", valueOffset, y);
y += rowSpacing;

// Sixth row (optional GSTIN)
if (userForm.gstin) {
  doc.setFont(undefined, "bold");
  doc.text("GSTIN:", leftColumn, y);
  doc.setFont(undefined, "normal");
  doc.text(userForm.gstin, valueOffset, y);
  y += rowSpacing;
}
    
    // --- INTERMEDIARY DETAILS ---
    // Add some spacing before this section
    // Blue background header
   
    // --- VEHICLE DETAILS ---
    
    // Section header
    doc.setFillColor(0, 102, 204);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.rect(15, y, 180, 8, 'F');
    doc.text("VEHICLE DETAILS", 105, y + 6, { align: "center" });
    
    // Reset font and color
    doc.setFont(undefined, "normal");
    doc.setTextColor(0, 0, 0);
    
    y += 15; // Space after header
    
    // Format vehicle data
    const vehicleBody = [
      ["Owner Name", vehicleDetails?.owner || 'NA'],
      ["Mobile number", vehicleDetails?.mobile_number || 'NA'],

      ["Registration Number", vehicleDetails?.vehicle_no || 'NA'],
      ["Maker Model", vehicleDetails?.maker_model || 'NA'],
      ["Variant", vehicleDetails?.variant || 'NA'],
      ["Year", vehicleDetails?.year || 'NA'],
      ["Engine No", vehicleDetails?.engine_no || 'NA'],
      ["Chassis No", vehicleDetails?.chassis_no || 'NA'],
      ["Cubic Capacity", vehicleDetails?.cubic_capacity || 'NA'],
      ["Fuel Type", vehicleDetails?.fuel_type || 'NA'],
      ["RTO", vehicleDetails?.registered_at || 'NA'],
      ["Financer", vehicleDetails?.financer || '']


    ];
    console.log("the data is vehiclebody>>>>>",vehicleBody)
    // Use autotable for vehicle details
    autoTable(doc, {
      startY: y,
      body: vehicleBody,
      theme: 'grid',
      styles: { fontSize: 9 },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 60 },
        1: { cellWidth: 120 }
      },
      margin: { left: 15, right: 15 }
    });
    
    // Get the y position after the vehicle table
    y = doc.lastAutoTable.finalY + 5;
        // --- PREMIUM COMPUTATION TABLE ---
    // Section header for premium table
    doc.setFillColor(0, 102, 204);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.rect(15, y, 180, 8, 'F');
    doc.text("PREMIUM TABLE", 105, y + 6, { align: "center" });
    
    y += 10;
    
    // Premium table
    autoTable(doc, {
      startY: y,
      head: [[
        "Section I", "", "Section II", "", "Section III", ""
      ]],
      body: [
        ["Basic Own Damage", premiumComponents?.ownDamagePremium|| "N/A", "Basic TP incl. TPPD", premiumComponents?.thirdPartyPremium || "N/A", "", ""],
        ["Add Covers", premiumComponents?.addOnsPremium || "N/A", "Total Liability", premiumComponents?.thirdPartyPremium || "N/A", "", ""],
        ["No Claim Bonus", premiumComponents?.ncbDiscount || "N/A", "", "", "", ""],
        ["No Claim Bonus Percentage %", premiumComponents?.ncbPercentage || "N/A", "", "", "", ""],
        ["Insured Value (IDV)", premiumComponents?.idv || "N/A", "", "", "", ""],
        ["IGST @ 18%", "", "", "", "", premiumComponents?.gst || "N/A"],
        ["Total Premium", "", "", "", "", premiumComponents?.totalPremium || "N/A"]
      ],
      theme: 'grid',
      styles: { fontSize: 8 },
      margin: { left: 15, right: 15 }
    });
    
    // Update y position after premium table
    y = doc.lastAutoTable.finalY + 5;
    
    // --- NOMINEE TABLE ---
    // Nominee table header - immediately after premium table
    doc.setFillColor(0, 102, 204);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.rect(15, y, 180, 8, 'F');
    doc.text("NOMINEE DETAILS", 105, y + 6, { align: "center" });
    
    y += 10;
    
    // Nominee table content
    autoTable(doc, {
      startY: y,
      body: [
        ["Nominee Name", userForm?.nominee_name || "N/A", "Nominee Relationship", userForm?.nominee_Relationship || "N/A", "Nominee Age", userForm?.Nominee_Age || "N/A"]
      ],
      theme: 'grid',
      styles: { fontSize: 8 },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { fontStyle: 'bold', cellWidth: 40 },
        3: { cellWidth: 30 },
        4: { fontStyle: 'bold', cellWidth: 30 },
        5: { cellWidth: 20 }
      },
      margin: { left: 15, right: 15 }
    });
    y = doc.lastAutoTable.finalY + 5;

    // 
    doc.setFillColor(0, 102, 204);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.rect(15, y, 180, 8, 'F');
    doc.text("CUSTOMER DECLARATION FOR CNG/ LPG KIT", 105, y + 6, { align: "center" });
    
    y += 17;
    
    // Reset text color for declaration content
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "normal");
    doc.setFontSize(12);

    
    const declarationText = " I/ We agree and undertake to immediately inform the Company in case of change on account of addition of CNG/LPG kit and obtain necessary endorsement in the Policy.";
    const declarationLines = doc.splitTextToSize(declarationText, 170);
    doc.text(declarationLines, 20, y);
    y += 17;

    doc.setFillColor(0, 102, 204);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.rect(15, y, 180, 8, 'F');
    doc.text(" DISCLAIMER", 105, y + 6, { align: "center" });
    
    y += 17;
    
    // Reset text color for declaration content
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "normal");
    doc.setFontSize(12);

    
    const disclaimerText = " For complete details on terms and conditions governing the coverage and NCB please read the Policy Wordings. This document is to be read with the Policy Wordings(which are also available on the Company website i.e. www.zurichkotak.com). Please refer to the claim form for necessary documents to be submitted for processing the claim";
    const disclaimerLines = doc.splitTextToSize(disclaimerText, 170);
    doc.text(disclaimerLines, 20, y);
    
    y += 17;

   // Start with PUC DECLARATION section

// --- PUC DECLARATION SECTION ---
doc.setFillColor(0, 102, 204);
doc.setTextColor(255, 255, 255);
doc.setFont(undefined, "bold");
doc.rect(15, y, 180, 8, 'F');
doc.text("PUC DECLARATION", 105, y + 6, { align: "center" });

y += 17;

// Reset text color for declaration content
doc.setTextColor(0, 0, 0);
doc.setFont(undefined, "normal");
doc.setFontSize(12);

const SPECIALCONDITIONS = "Previous policy document is required at the time of claim verification. All type of pre – existing damages or cost of repair of such damage will be excluded at the time of claim settlement.";
const SPECIALCONDITIONSLines = doc.splitTextToSize(SPECIALCONDITIONS, 170);
doc.text(SPECIALCONDITIONSLines, 20, y);
y += SPECIALCONDITIONSLines.length * doc.getLineHeight() + 10; // `10` is bottom spacing

// Start new page for NO CLAIM BONUS
doc.addPage();
y = 20; // Reset y position for the new page

// --- NO CLAIM BONUS SCALE SECTION ---
doc.setFillColor(0, 102, 204);
doc.setTextColor(255, 255, 255);
doc.setFont(undefined, "bold");
doc.rect(15, y, 180, 8, 'F');
doc.text("NO CLAIM BONUS SCALE", 105, y + 6, { align: "center" });

y += 10;

// NCB Scale table
autoTable(doc, {
  startY: y,
  head: [[
    "Description", "Discount"
  ]],
  body: [
    ["No claim made or pending during the preceding full year of insurance", "20%"],
    ["No claim made or pending during the preceding 2 consecutive years of insurance", "25%"],
    ["No claim made or pending during the preceding 3 consecutive years of insurance", "35%"],
    ["No claim made or pending during the preceding 4 consecutive years of insurance", "45%"],
    ["No claim made or pending during the preceding 5 consecutive years of insurance", "50%"]
  ],
  theme: 'grid',
  styles: { fontSize: 8 },
  columnStyles: {
    0: { cellWidth: 140 },
    1: { cellWidth: 40, halign: 'center' }
  },
  margin: { left: 15, right: 15 }
});

// Get the final Y position after the NCB table
y = doc.lastAutoTable.finalY + 10;

// --- DETAILS OF DEPRECIATION SECTION ---
doc.setFillColor(0, 102, 204);
doc.setTextColor(255, 255, 255);
doc.setFont(undefined, "bold");
doc.rect(15, y, 180, 8, 'F');
doc.text("DETAILS OF DEPRECIATION", 105, y + 6, { align: "center" });

y += 10;

// Depreciation table
autoTable(doc, {
  startY: y,
  head: [[
    "Description", "Discount"
  ]],
  body: [
    ["Not exceeding 6 Months", "5%"],
    ["Exceeding 6 months but not exceeding 1 year", "15%"],
    ["Exceeding 1 year but not exceeding 2 years", "20%"],
    ["Exceeding 2 years but not exceeding 3 years", "30%"],
    ["Exceeding 3 years but not exceeding 4 years", "40%"],
    ["Exceeding 4 years but not exceeding 5 years", "50%"]
  ],
  theme: 'grid',
  styles: { fontSize: 8 },
  columnStyles: {
    0: { cellWidth: 140 },
    1: { cellWidth: 40, halign: 'center' }
  },
  margin: { left: 15, right: 15 }
});

// Add footer to this page
doc.setFontSize(8);
doc.setFont(undefined, "normal");
doc.text("Global Health & Allied Insurance Services", 15, 280);
doc.text("Page 2 of 3", 180, 280);

// Start new page for TAX INVOICE
doc.addPage();


// Reset y position to start TAX INVOICE from the top of the third page
y = 20;

// --- TAX INVOICE SECTION ---
doc.setFillColor(0, 102, 204);
doc.setTextColor(255, 255, 255);
doc.setFont(undefined, "bold");
doc.rect(15, y, 180, 8, 'F');
doc.setFontSize(16); // ← Set your desired font size here

doc.text("TAX INVOICE", 105, y + 6, { align: "center" });

// Reset font and color
doc.setFont(undefined, "normal");
doc.setTextColor(0, 0, 0);

y += 10; // Space after header

// Format vehicle data
const vehicleBodya = [
  ["Policy Number", userForm?.policyNumber || 'NA'],
  ["Owner Name", vehicleDetails?.owner || 'NA'],
  ["Mobile number", vehicleDetails?.mobile_number || 'NA'],
  ["Registration Number", vehicleDetails?.vehicle_no || 'NA'],
  ["Name", "Global Health & Allied Insurance Service"],
  ["PAN Number", userForm?.pan_number || 'NA'],
  ["Email", userForm?.email || 'NA'],
  ["Maker Model", vehicleDetails?.maker_model || 'NA'],
  ["Variant", vehicleDetails?.variant || 'NA'],
  ["Year", vehicleDetails?.year || 'NA'],
  ["Engine No", vehicleDetails?.engine_no || 'NA'],
  ["Chassis No", vehicleDetails?.chassis_no || 'NA'],
  ["Cubic Capacity", vehicleDetails?.cubic_capacity || 'NA'],
  ["Fuel Type", vehicleDetails?.fuel_type || 'NA'],
  ["RTO", vehicleDetails?.registered_at || 'NA'],
  ["Financer", vehicleDetails?.financer || 'NA'],     
  ["IDV", premiumComponents?.idv || 'NA'],     
  ["IGST @ 18%", premiumComponents?.gst || 'NA'],     
  ["Total Invoice", premiumComponents?.totalPremium || 'NA']
];

// Use autotable for vehicle details - centered in the page
autoTable(doc, {
  startY: y,
  body: vehicleBodya,
  theme: 'grid',
  styles: { fontSize: 9 },
  columnStyles: { 
    0: { fontStyle: 'bold', cellWidth: 60 },
    1: { cellWidth: 120 }
  },
  margin: { left: 15, right: 15 }
});

// Add footer to the second page
doc.setFontSize(8);
doc.setFont(undefined, "normal");
doc.text("Global Health & Allied Insurance Services", 15, 280);
doc.text("Page 2 of 2", 180, 280);

return doc;
  } catch (error) {
    console.error("Error generating Insurance PDF:", error);
    throw error; // Re-throw error to be caught by the calling function
  }
};

  // Download PDF
  // const downloadPDFLocally = (userData) => {
  //   try {
  //     const doc = generatePDF(userData);
      
  //     if (doc) {
  //       // Save the policy number to the form data if generated in PDF
  //       if (userData.policyNumber && !userForm.policyNumber) {
  //         setUserForm(prev => ({
  //           ...prev,
  //           policyNumber: userData.policyNumber
  //         }));
  //       }
        
  //       doc.save(`${userData.username || 'insurance'}_policy.pdf`);
  //       console.log("PDF generated and downloaded successfully");
  //       return true;
  //     } else {
  //       console.error("PDF generation returned null");
  //       setErrorMessage("Failed to generate PDF: Document is null");
  //       setShowError(true);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error downloading PDF:", error);
  //     setErrorMessage("Failed to download PDF: " + error.message);
  //     setShowError(true);
  //     return false;
  //   }
  // };
 const downloadPDFLocally = async (userData) => {
  try {
    const doc = generatePDF(userData);
    
    if (!doc) {
      console.error("PDF generation returned null");
      setErrorMessage("Failed to generate PDF: Document is null");
      setShowError(true);
      return false;
    }
    
    // Save the policy number to the form data if generated in PDF
    if (userData.policyNumber && !userForm.policyNumber) {
      setUserForm(prev => ({
        ...prev,
        policyNumber: userData.policyNumber
      }));
    }
    
    // Save PDF locally
    const fileName = `${userData.username || 'insurance'}_policy.pdf`;
    doc.save(fileName);
    console.log("PDF downloaded successfully");
    
    // Get PDF as base64 for database storage
    let pdfBase64;
    
    // Check estimated file size (rough approximation)
    const pdfOutput = doc.output();
    const estimatedSizeMB = pdfOutput.length / (1024 * 1024);
    console.log(`Estimated PDF size: ${estimatedSizeMB.toFixed(2)} MB`);
    
    if (estimatedSizeMB > 10) {
      console.warn("PDF is large, consider implementing compression or chunking for upload");
      setErrorMessage("PDF file is large, upload may take longer than usual");
      setShowError(true);
    }
    
    pdfBase64 = doc.output('datauristring');
    
    // Send PDF to server for database storage
    console.log("Uploading PDF to database...");
    const saveResult = await savePDFToDatabase({
      pdfBase64,
      userId: userData.id || generateRandomUserId(), // Use provided ID or generate random one
      policyNumber: userForm.policyNumber,
      fileName
    }, userForm);
    
    if (saveResult.success) {
      console.log("PDF saved to database successfully");
      return true;
    } else {
      console.error("Error saving PDF to database:", saveResult.error);
      setErrorMessage("PDF downloaded but failed to save to database: " + saveResult.error);
      setShowError(true);
      return false;
    }
  } catch (error) {
    console.error("Error processing PDF:", error);
    setErrorMessage("Failed to process PDF: " + error.message);
    setShowError(true);
    return false;
  }
};

// Generate random user ID if not provided
const generateRandomUserId = () => {
  // Generate a random 3-digit number (100-999)
  const randomPart = Math.floor(100 + Math.random() * 900);
  
  // Create the 4-character user ID starting with 1
  const userId = "1" + randomPart;
  
  console.log("Generated user ID:", userId);
  return userId;
};

// Client API function to send PDF to server with retry logic
const savePDFToDatabase = async (pdfData, userForm) => {
  console.log("user form is>><<<", userForm);
  const maxRetries = 2;
  let retryCount = 0;
  
  // Validate required data before attempting to send
  if (!pdfData.pdfBase64) {
    console.error("Missing required field: pdfBase64");
    return { success: false, error: "PDF data is missing" };
  }
  
  if (!pdfData.userId) {
    console.error("Missing required field: userId");
    return { success: false, error: "User ID is missing" };
  }
  
  const attemptUpload = async () => {
    try {
      console.log(`Attempt ${retryCount + 1} to upload PDF...`);
      
      // Log the size of the data being sent
      const dataSize = JSON.stringify(pdfData).length / (1024 * 1024);
      console.log(`Sending data of size: ${dataSize.toFixed(2)} MB`);
      console.log("Request payload structure:", {
        hasPdfBase64: !!pdfData.pdfBase64,
        pdfBase64Type: typeof pdfData.pdfBase64,
        pdfBase64Length: pdfData.pdfBase64 ? pdfData.pdfBase64.length : 0,
        userId: pdfData.userId,
        userIdType: typeof pdfData.userId,
        policyNumber: userForm?.policyNumber,
        fileName: pdfData.fileName
      });

      // Ensure the URL is correct
      const apiUrl = 'http://localhost:8080/api/pdf/save';
      console.log("Sending request to:", apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfBase64: pdfData.pdfBase64,
          userId: pdfData.userId,
          policyNumber: userForm?.policyNumber || null,
          fileName: pdfData.fileName || 'document.pdf'
        }),
        // Adding timeout to prevent indefinite waiting
        signal: AbortSignal.timeout(120000) // 120-second timeout for large files
      });
      
      // Log the entire response for debugging
      console.log("Response status:", response.status);
      
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { error: responseText };
        }
        
        if (response.status === 413) {
          throw new Error(`File too large for upload (413 Payload Too Large). Please reduce document size.`);
        } else {
          throw new Error(`Server responded with status: ${response.status}. ${errorData.error || responseText}`);
        }
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error("Invalid JSON response from server");
      }
      
      return data;
    } catch (error) {
      console.error(`Upload attempt ${retryCount + 1} failed:`, error);
      
      // Only retry for certain types of errors (not for 413 payload too large)
      if (retryCount < maxRetries && !error.message.includes('413 Payload Too Large')) {
        retryCount++;
        // Exponential backoff: wait longer between retries
        const delay = retryCount * 2000; // 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
        return attemptUpload();
      }
      
      throw error;
    }
  };
  
  try {
    const result = await attemptUpload();
    return { success: true, ...result };
  } catch (error) {
    console.error("All upload attempts failed:", error);
    return { success: false, error: error.message };
  }
};
// Function to retrieve a PDF from the database by document ID


  // Initiate payment
  const handlePayment = async () => {
    // First validate form before initiating payment
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setShowError(false);
    
    try {
      const amount = premiumComponents?.totalPremium || 0;
      if (amount <= 0) {
        throw new Error("Invalid premium amount");
      }
      
      // Create a Razorpay order
      const response = await fetch(`${API_BASE_URL}/payment/createorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (data.orderId) {
        // Open Razorpay checkout immediately
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

  // Form submission handler - only used after payment is complete
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If payment is not already successful, initiate payment flow
    if (paymentStatus !== 'success') {
      handlePayment();
      return;
    }
    
    // If payment is already successful, just handle post-payment actions like PDF generation
    try {
      downloadPDFLocally();
      
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
    } catch (error) {
      console.error('API Error:', error);
      const errMsg = error.response?.data?.message || error.message || 
                    "An error occurred connecting to the server. Please try again later.";
      setErrorMessage(errMsg);
      setShowError(true);
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
            {/* Premium Details Card - Left Side */}
            <Col md={5}>
              <div style={{position: 'sticky', top: '40px'}}>
                <Card className="border-primary h-100 mb-4 mb-md-0">
                  <Card.Header className="bg-primary text-white text-center py-3">
                    <h4 className="mb-0 fw-bold">Premium Details</h4>
                  </Card.Header>
                  <Card.Body className="d-flex flex-column justify-content-between p-4">
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
                        
                        <div className="mt-4">
                          <hr className="my-3" />
                          <Row className="mb-0">
                            <Col xs={7} className="text-start">
                              <h5 className="fw-bold">Total Premium:</h5>
                            </Col>
                            <Col xs={5} className="text-end">
                              <h5 className="text-success fw-bold">₹{premiumComponents?.totalPremium || 0}</h5>
                            </Col>
                          </Row>
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
                        `Pay Now - ₹${premiumComponents?.totalPremium || 0}`
                      )}
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            </Col>

            {/* Registration Form - Right Side */}
            <Col md={7}>
              <Card className="border h-100">
                <Card.Body className="p-4">
                  <Form id="registrationForm" onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <h5 className="mb-3">Personal Information</h5>
                    
                    {/* Name and Email in parallel */}
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
      
                    {/* Age and Mobile in parallel */}
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
      
                    {/* PAN and Aadhaar in parallel */}
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

                    {/* Nominee Information */}
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
                    
                    {/* Vehicle & Address Information */}
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

      {/* Success Modal */}
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
            <div className="mt-4">
              <Button 
                variant="outline-primary" 
                onClick={downloadPDFLocally}
                className="px-4 py-2"
              >
                Download PDF Copy
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