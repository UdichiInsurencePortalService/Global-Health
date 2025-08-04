import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Policy.css';
import logo from '../../src/assets/aboutusimges/image.png';
import { handleError, handleSuccess } from '../errortoast';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logos from '../assets/Home/global-logo.png';
import qr from '../assets/kunal.jpeg';
import autoTable from 'jspdf-autotable';
import NeedHelp from '../Reuse/NeedHelp/NeedHelp';

const Policy = ({ heading, paragraph, contact, head }) => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [policyFound, setPolicyFound] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();


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



  // Enhanced PDF generation function
  const generatePDF = (policyData,currentCarData) => {
    try {
     console.log("the vehicledeta,>><<",policyData,)

      const doc = new jsPDF();
        
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
       const logoUrl = logos;
       doc.addImage(logoUrl, 'PNG', margin, yPos, logoWidth, logoHeight);
       
       // Add QR code image (right side)
       const qrCodeUrl = qr; // Assuming 'qr' is your QR code image
       doc.addImage(qrCodeUrl, 'PNG', pageWidth - margin - qrCodeSize, yPos, qrCodeSize, qrCodeSize);
       
       // Update yPos after adding the logo and QR code
       yPos += logoHeight + 8;
       
       // Add company name with improved positioningy
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
       doc.text(`MR. ${policyData?.owner?.toUpperCase() || 'CUSTOMER NAME'}`, margin, yPos);
       yPos += 7;
       
       // Address formatting with improved spacing
       const addressLines = formatAddress(policyData?.address || '');
       addressLines.forEach(line => {
         doc.setFont(undefined, "normal");
         doc.text(line, margin, yPos);
         yPos += 6;
       });
       yPos += 2;
       
       // Contact details
       doc.text(`Contact Details: ${policyData?.mobile_number || ''}`, margin, yPos);
       yPos += 10;
       
       // Policy details with better spacing
       doc.text(`Policy number: ${policyData.policyNumber}`, margin, yPos);
           yPos += 7;
   
           doc.text(`UserId: ${policyData?.userid}`, margin, yPos);
           console.log("user id generated>><<",policyData)
   
       yPos += 7;
       doc.text(`CRN: ${policyData.crn || 'ID'}`, margin, yPos);
       yPos += 10;
       
       // Subject line with proper spacing
       doc.setFont(undefined, "bold");
       doc.text("Subject: Risk assumption for Car Secure", margin, yPos);
       yPos += 10;
       
       // Salutation
       doc.text(`Dear MR. ${policyData.owner?.toUpperCase() || 'CUSTOMER NAME'},`, margin, yPos);
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
   doc.text(policyData.policy_number, pageCenter + 10, yPos);
   
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
   const ownerName = (policyData.owner || "N/A").substring(0, 25);
   doc.setFont(undefined, "bold");
   doc.text("Name:", leftColumn, y);
   doc.setFont(undefined, "normal");
   doc.text(ownerName, valueOffset, y);
   
   doc.setFont(undefined, "bold");
   doc.text("Policy Issuing Office:", rightColumn, y);
   doc.setFont(undefined, "normal");
   doc.text(policyData.policyOffice || "Muscat, Oman (Headquarters)", rightValueOffset, y);
   y += rowSpacing;
   
   // Second row - Address
   doc.setFont(undefined, "bold");
   doc.text("Address:", leftColumn, y);
   doc.setFont(undefined, "normal");
   const addressLinesFormatted = doc.splitTextToSize(policyData.address, 60);
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
   
   if (!policyData.periodOfInsurance) {
     policyData.periodOfInsurance = generateInsurancePeriod();
   }
   
   // Display period of insurance
   const periodText = `${policyData.periodOfInsurance.fromFormatted} to ${policyData.periodOfInsurance.toFormatted}`;
   doc.text(periodText, rightValueOffset, y);
   
   // Calculate next y position based on address lines length
   const addressLineCount = addressLinesFormatted.length;
   y += Math.max(addressLineCount * 5, rowSpacing);
   y += 5; // Add a bit more space after address
   
   // Third row
   doc.setFont(undefined, "bold");
   doc.text("Phone:", leftColumn, y);
   doc.setFont(undefined, "normal");
   doc.text(policyData?.mobile_number || "NA", valueOffset, y);
   
   doc.setFont(undefined, "bold");
   doc.text("Type of Vehicle:", rightColumn, y);
   doc.setFont(undefined, "normal");
   doc.text(policyData.vehicleType || "Private Vehicle", rightValueOffset, y);
   y += rowSpacing;
   
   // Fourth row
   doc.setFont(undefined, "bold");
   doc.text("Mobile:", leftColumn, y);
   doc.setFont(undefined, "normal");
   doc.text(policyData?.mobile_number || "N/A", valueOffset, y);
   
   doc.setFont(undefined, "bold");
   doc.text("Hypothecated to:", rightColumn, y);
   doc.setFont(undefined, "normal");
   doc.text(policyData?.financer || "N/A", rightValueOffset, y);
   y += rowSpacing;
   
   // Fifth row
   doc.setFont(undefined, "bold");
   doc.text("Email:", leftColumn, y);
   doc.setFont(undefined, "normal");
   doc.text(policyData.email || "N/A", valueOffset, y);
   y += rowSpacing;
   
   // Sixth row (optional GSTIN)
   if (policyData.gstin) {
     doc.setFont(undefined, "bold");
     doc.text("GSTIN:", leftColumn, y);
     doc.setFont(undefined, "normal");
     doc.text(policyData.gstin, valueOffset, y);
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
         ["Owner Name", policyData?.username || 'NA'],
         ["Mobile number", policyData?.mobile_number || 'NA'],
   
         ["Registration Number", policyData?.registration_number || 'NA'],
         ["Maker Model", policyData?.maker_model || 'NA'],
         ["Variant", policyData?.variant || 'NA'],
         ["Year", policyData?.year || 'NA'],
         ["Engine No", policyData?.engine_number || 'NA'],
         ["Chassis No", policyData?.chasis_number || 'NA'],
         ["Cubic Capacity", policyData?.cubic_capacity || 'NA'],
         ["Fuel Type", policyData?.fuel_type || 'NA'],
         ["RTO", policyData?.register_at || 'NA'],
         ["Financer", policyData?.financer || '']
   
   
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
           ["Basic Own Damage", policyData?.own_damage_premium|| "N/A", "Basic TP incl. TPPD", policyData?.third_party_premuin || "N/A", "", ""],
           ["Add Covers", policyData?.add_ons_premuim || "N/A", "Total Liability", policyData?.third_party_premuin || "N/A", "", ""],
           ["No Claim Bonus", policyData?.ncb_discount || "N/A", "", "", "", ""],
           ["No Claim Bonus Percentage %", policyData?.ncbPercentage || "N/A", "", "", "", ""],
           ["Insured Value (IDV)", policyData?.idv || "N/A", "", "", "", ""],
           ["IGST @ 18%", "", "", "", "", policyData?.gst || "N/A"],
           ["Total Premium", "", "", "", "", policyData?.total_premiun || "N/A"]
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
           ["Nominee Name", policyData?.nominee_name || "N/A", "Nominee Relationship", policyData?.nominee_relation || "N/A", "Nominee Age", policyData?.nominee_age || "N/A"]
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
     ["Policy Number", policyData?.policy_number || 'NA'],
     ["Owner Name", policyData?.username || 'NA'],
     ["Mobile number", policyData?.mobile_number || 'NA'],
     ["Registration Number", policyData?.registration_number || 'NA'],
     ["Name", "Global Health & Allied Insurance Service"],
     ["PAN Number", policyData?.pan_number || 'NA'],
     ["Email", policyData?.email || 'NA'],
     ["Maker Model", policyData?.maker_model || 'NA'],
     ["Variant", policyData?.variant || 'NA'],
     ["Year", policyData?.registration_date || 'NA'],
     ["Engine No", policyData?.engine_number || 'NA'],
     ["Chassis No", policyData?.chasis_number || 'NA'],
     ["Cubic Capacity", policyData?.cubic_capacity || 'NA'],
     ["Fuel Type", policyData?.fuel_type || 'NA'],
     ["RTO", policyData?.register_at || 'NA'],
     ["Financer", policyData?.financer || 'NA'],     
     ["IDV", policyData?.idv || 'NA'],     
     ["IGST @ 18%", policyData?.gst || 'NA'],     
     ["Total Invoice", policyData?.total_premiun || 'NA']
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
  

  // Function to check policy using your existing backend endpoint
  const checkPolicyValidity = async (policyNum, regNum) => {
    try {
      const response = await fetch(`http://localhost:8080/api/policy?policyNumber=${encodeURIComponent(policyNum)}&registrationNumber=${encodeURIComponent(regNum)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to check policy');
      }

      return result;
    } catch (error) {
      console.error('Error checking policy:', error);
      throw error;
    }
  };

  // Function to fetch complete user data using your existing endpoint
  const fetchAllUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/getpaymentuserdata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch user data');
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const handlePolicyCheck = async (e) =>  {
    e.preventDefault();

    // Validate inputs
    if (!policyNumber.trim()) {
      handleError('Please enter a policy number');
      return;
    }
    
    if (!registrationNumber.trim()) {
      handleError('Please enter a registration number');
      return;
    }
    
    try {
      setLoading(true);
      setPolicyFound(false);
      setUserDetails(null);
      
      console.log('Checking policy:', policyNumber);
      
      // First check if policy is valid using your existing endpoint
      const policyCheck = await checkPolicyValidity(policyNumber.trim(), registrationNumber.trim());
      
      if (!policyCheck.exists || !policyCheck.isValid) {
        handleError(policyCheck.message || 'Policy validation failed');
        return;
      }
      
      // Fetch all user data to find the complete record
      const allUserData = await fetchAllUserData();
      
      // Find the specific policy in the data
      const userPolicyData = allUserData.find(user => 
        user.policy_number === policyNumber.trim()
      );
      
      if (!userPolicyData) {
        handleError('Complete policy data not found.');
        return;
      }
      
      // Add period information from policy check if available
      if (policyCheck.policyData && policyCheck.policyData.periodOfInsurance) {
        userPolicyData.periodOfInsurance = policyCheck.policyData.periodOfInsurance;
      }
      
      // Set policy found and user details
      setPolicyFound(true);
      setUserDetails(userPolicyData);
      
      const ownerName = userPolicyData.username || userPolicyData.owner || userPolicyData.name || 'N/A';
      handleSuccess(`Policy ${policyNumber} found and verified! Owner: ${ownerName}. Click "Download PDF" to get your policy document.`);
      
    } catch (error) {
      console.error('Error checking policy:', error);
      if (error.message.includes('Policy not found')) {
        handleError(`Policy ${policyNumber} not found. Please check your policy number and try again.`);
      } else if (error.message.includes('Registration number does not match')) {
        handleError('Registration number does not match the policy records. Please check and try again.');
      } else {
        handleError(`An error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!userDetails) {
      handleError('No user data available for PDF generation');
      return;
    }

    try {
      setLoading(true);
      
      console.log('Generating PDF with user details:', userDetails);
      
      // Generate PDF using the complete user data
      const doc = generatePDF(userDetails);
      
      // Download the PDF automatically
      const fileName = `Policy_${policyNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      doc.save(fileName);
      
      handleSuccess(`Policy document downloaded successfully as ${fileName}!`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      handleError(`Failed to generate PDF: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPolicyFound(false);
    setUserDetails(null);
    setPolicyNumber('');
    setRegistrationNumber('');
  };

  return (
    <section className="policy-section py-5 px-3 ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-5">
            <h1 className="fw-bold policy-heading">Check Your Policy & Download Document</h1>
            <p className="text-muted">Enter your policy number and registration number to access your policy document</p>
          </div>
        </div>
        
        {/* Loading message display */}
        {loading && (
          <div className="row justify-content-center mb-3">
            <div className="col-md-6">
              <div className="alert alert-info d-flex align-items-center" role="alert">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                {policyFound ? 'Generating PDF document...' : 'Searching for your policy in database...'}
              </div>
            </div>
          </div>
        )}
        
        {/* Policy found message */}
        {policyFound && userDetails && (
          <div className="row justify-content-center mb-4">
            <div className="col-md-8">
              <div className="alert alert-success" role="alert">
                <h5 className="alert-heading">✅ Policy Found & Verified!</h5>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Policy Number:</strong> {userDetails.policy_number}</p>
                    <p><strong>Owner Name:</strong> {userDetails.username || userDetails.owner || userDetails.name || 'N/A'}</p>
                    <p><strong>Vehicle Registration:</strong> {userDetails.registration_number || userDetails.vehicle_no || 'N/A'}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Mobile:</strong> {userDetails.mobile_number || userDetails.phone || 'N/A'}</p>
                    <p><strong>Make & Model:</strong> {userDetails.maker_model || userDetails.make_model || userDetails.vehicle_make || 'N/A'}</p>
                    <p><strong>Total Premium:</strong> ₹{userDetails.total_premiun || userDetails.total_premiun || 'N/A'}</p>
                  </div>
                </div>
                {userDetails.periodOfInsurance && (
                  <div className="mt-2">
                    <p><strong>Policy Period:</strong> {userDetails.periodOfInsurance.startDate} to {userDetails.periodOfInsurance.endDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="row align-items-center pb-5">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img src={logo} alt="Company Logo" className="logo-img img-fluid" style={{maxWidth: '300px'}} />
          </div>
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <form className="form-section" onSubmit={handlePolicyCheck}>
                  <div className="form-group mb-3">
                    <label htmlFor="policyNumber" className="form-label">Policy Number</label>
                    <input
                      id="policyNumber"
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Policy Number"
                      value={policyNumber}
                      onChange={(e) => setPolicyNumber(e.target.value)}
                      aria-label="Policy Number"
                      required
                    />
                    <small className="form-text text-muted">
                      Example format: GIC/2025-26/01/3889
                    </small>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="registrationNumber" className="form-label">Vehicle Registration Number</label>
                    <input
                      id="registrationNumber"
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Registration Number"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      aria-label="Registration Number"
                      required
                    />
                    <small className="form-text text-muted">
                      Enter your vehicle registration number for verification
                    </small>
                  </div>
                  
                  {!policyFound ? (
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 py-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Checking Policy...
                        </>
                      ) : (
                        'Check Policy'
                      )}
                    </button>
                  ) : (
                    <div className="d-grid gap-2">
                      <button 
                        type="button"
                        className="btn btn-success py-2"
                        onClick={handleDownloadPDF}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Generating PDF...
                          </>
                        ) : (
                          '📄 Download Policy PDF'
                        )}
                      </button>
                      <button 
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={resetForm}
                      >
                        🔍 Check Another Policy
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Help section */}
    <NeedHelp 
            heading="Need Help?"
            paragraph="Have queries related to Digit motor insurance policy? You can refer to our Policy Wordings for detailed information or reach out to our support team via WhatsApp self-support, email or phone using the information below:"
            head={["WhatsApp", "Email", "Contact"]}
            contact={[  
              {
                cont: "Connect with our self-serve chat bot support - 9818152403",
              },
              {
                conta: "Connect Write to us at globalhealth@235@gmail.com",
              },
              {
                conatac: "Call us on 9818152403",
              },
            ]}
          />
      </div>
    </section>
  );
};

export default Policy;