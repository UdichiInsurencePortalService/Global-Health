import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Tag, Tooltip, Slider, Progress, Space, Select } from 'antd';

import { InfoCircleOutlined, CheckCircleOutlined, StarOutlined, SafetyOutlined, CarOutlined, DollarOutlined, DownloadOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import './User.css';
const { Option } = Select;

const UserData = () => {
  const [vehicle, setVehicle] = useState(null);
  const [idv, setIdv] = useState(0);
  const [baseIdv, setBaseIdv] = useState(0);
  const [idvAdjustment, setIdvAdjustment] = useState(0);
  const [premium, setPremium] = useState(0);
  const [ncbDiscount, setNcbDiscount] = useState(0);
  const [ncbPercentage, setNcbPercentage] = useState(0);
  const [zeroDepreciationCharge, setZeroDepreciationCharge] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const [addOns, setAddOns] = useState([
    { id: 1, name: 'Zero Depreciation', selected: false, price: 0, icon: '🛡️', description: 'Get full claim amount without depreciation deduction' },
    { id: 2, name: 'Engine Protection', selected: false, price: 300, icon: '⚙️', description: 'Covers engine damage due to water ingress' },
    { id: 3, name: 'Roadside Assistance', selected: false, price: 200, icon: '🚗', description: '24/7 emergency roadside support' },
    { id: 4, name: 'Return to Invoice', selected: false, price: 400, icon: '💰', description: 'Get full invoice value in case of total loss' },
    { id: 5, name: 'PA Cover for Owner Driver', selected: false, price: 150, icon: '👤', description: 'Personal accident cover for driver' },
  ]);

   const currencyRates = {
    INR: { rate: 1, symbol: '₹', name: 'Indian Rupee' },
    USD: { rate: 0.012, symbol: '$', name: 'US Dollar' },
    EUR: { rate: 0.011, symbol: '€', name: 'Euro' },
    GBP: { rate: 0.0095, symbol: '£', name: 'British Pound' },
    AED: { rate: 0.044, symbol: 'د.إ', name: 'UAE Dirham' },
    CNY: { rate: 0.087, symbol: '¥', name: 'Chinese Yuan' },
    JPY: { rate: 1.85, symbol: '¥', name: 'Japanese Yen' },
    AUD: { rate: 0.019, symbol: 'A$', name: 'Australian Dollar' },
    CAD: { rate: 0.017, symbol: 'C$', name: 'Canadian Dollar' },
    SGD: { rate: 0.016, symbol: 'S$', name: 'Singapore Dollar' },
  };
  // Function to convert amount to selected currency
  const convertCurrency = (amount) => {
    const convertedAmount = amount * currencyRates[selectedCurrency].rate;
    return Math.round(convertedAmount);
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    const convertedAmount = convertCurrency(amount);
    const symbol = currencyRates[selectedCurrency].symbol;
    return `${symbol} ${convertedAmount.toLocaleString()}`;
  };

  const saveCurrencyToStorage = (currency) => {
    const currencyData = {
      selectedCurrency: currency,
      currencySymbol: currencyRates[currency].symbol,
      currencyRate: currencyRates[currency].rate,
      currencyName: currencyRates[currency].name
    };
    
    try {
      localStorage.setItem("currencyData", JSON.stringify(currencyData));
      console.log('Currency data saved to localStorage:', currencyData);
    } catch (error) {
      console.error('Error saving currency to localStorage:', error);
    }
  };

 const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    saveCurrencyToStorage(currency);
  };
 


  // Function to create and download PDF using HTML/CSS
  const downloadQuotationPDF = () => {
    const premiumBreakdown = getPremiumBreakdown();
    const selectedAddOns = addOns.filter(addon => addon.selected);
    const currentDate = new Date().toLocaleDateString('en-IN');
    const currentYear = new Date().getFullYear();
    const purchaseYear = new Date(vehicle.date_of_buy).getFullYear();
    const vehicleAge = currentYear - purchaseYear;

    const pdfContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> Insurance Quotation</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
                padding: 20px;
            }

            .pdf-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }

            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                position: relative;
                overflow: hidden;
            }

            .header::before {
                content: '';
                position: absolute;
                top: -50%;
                right: -10%;
                width: 200px;
                height: 200px;
                background: rgba(255,255,255,0.1);
                border-radius: 50%;
            }

            .header::after {
                content: '';
                position: absolute;
                bottom: -30%;
                left: -5%;
                width: 150px;
                height: 150px;
                background: rgba(255,255,255,0.08);
                border-radius: 50%;
            }

            .company-logo {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 20px;
                position: relative;
                z-index: 2;
            }

            .logo-icon {
                width: 50px;
                height: 50px;
                background: rgba(255,255,255,0.2);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: bold;
                backdrop-filter: blur(10px);
            }

            .company-info h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 5px;
            }

            .company-info p {
                opacity: 0.9;
                font-size: 16px;
            }

            .quotation-title {
                text-align: center;
                margin-top: 20px;
                position: relative;
                z-index: 2;
            }

            .quotation-title h2 {
                font-size: 32px;
                font-weight: 800;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            }

            .date-info {
                background: rgba(255,255,255,0.15);
                padding: 8px 16px;
                border-radius: 20px;
                display: inline-block;
                backdrop-filter: blur(10px);
            }

            .content-section {
                padding: 30px;
            }

            .section-header {
                background: linear-gradient(135deg, #52c41a 0%, #389e0d 100%);
                color: white;
                padding: 15px 25px;
                margin: 0 -30px 25px -30px;
                font-size: 18px;
                font-weight: 600;
                position: relative;
            }

            .section-header::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 25px;
                width: 50px;
                height: 4px;
                background: #52c41a;
                border-radius: 2px;
            }

            .vehicle-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .detail-item {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #f0f0f0;
            }

            .detail-label {
                font-weight: 600;
                color: #666;
            }

            .detail-value {
                font-weight: 700;
                color: #333;
            }

            .premium-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 25px;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }

            .premium-table th {
                background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
                color: white;
                padding: 15px;
                font-weight: 600;
                text-align: left;
            }

            .premium-table td {
                padding: 15px;
                border-bottom: 1px solid #f0f0f0;
            }

            .premium-table tr:nth-child(even) {
                background: #fafafa;
            }

            .premium-table tr:hover {
                background: #e6f7ff;
            }

            .amount-positive {
                color: #1890ff;
                font-weight: 600;
            }

            .amount-negative {
                color: #52c41a;
                font-weight: 600;
            }

            .total-row {
                background: linear-gradient(135deg, #52c41a 0%, #389e0d 100%) !important;
                color: white;
                font-weight: 700;
                font-size: 18px;
            }

            .total-row td {
                border: none;
                padding: 20px 15px;
            }

            .addon-section {
                background: linear-gradient(135deg, #f6f8ff 0%, #e8f2ff 100%);
                padding: 25px;
                border-radius: 12px;
                margin-bottom: 25px;
                border: 2px solid #e8f2ff;
            }

            .addon-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0;
                border-bottom: 1px solid #e8f2ff;
            }

            .addon-item:last-child {
                border-bottom: none;
            }

            .addon-name {
                font-weight: 600;
                color: #333;
            }

            .addon-description {
                font-size: 14px;
                color: #666;
                margin-top: 4px;
            }

            .addon-price {
                font-weight: 700;
                color: #1890ff;
                font-size: 16px;
            }

            .summary-box {
                background: linear-gradient(135deg, #f0fff4 0%, #e6ffed 100%);
                border: 3px solid #52c41a;
                border-radius: 15px;
                padding: 30px;
                text-align: center;
                margin: 30px 0;
                position: relative;
            }

            .summary-box::before {
                content: '✓';
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: #52c41a;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .summary-title {
                color: #52c41a;
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 15px;
            }

            .summary-amount {
                color: #52c41a;
                font-size: 42px;
                font-weight: 800;
                margin-bottom: 10px;
            }

            .summary-note {
                color: #666;
                font-size: 14px;
                margin-bottom: 15px;
            }

            .savings-info {
                background: rgba(82, 196, 26, 0.1);
                padding: 15px;
                border-radius: 8px;
                color: #52c41a;
                font-weight: 600;
            }

            .footer {
                background: #f8f9fa;
                padding: 25px 30px;
                border-top: 3px solid #e9ecef;
            }

            .footer-content {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 30px;
                font-size: 13px;
                color: #666;
            }

            .footer-left h4 {
                color: #333;
                margin-bottom: 10px;
                font-size: 16px;
            }

            .footer-left ul {
                list-style: none;
            }

            .footer-left li {
                margin-bottom: 5px;
            }

            .footer-right {
                text-align: right;
            }

            .footer-right h4 {
                color: #667eea;
                margin-bottom: 10px;
                font-size: 16px;
            }

            .highlight-box {
                background: linear-gradient(135deg, #fff7e6 0%, #fffbe6 100%);
                border-left: 4px solid #faad14;
                padding: 15px 20px;
                margin: 20px 0;
                border-radius: 0 8px 8px 0;
            }

            .icon {
                display: inline-block;
                width: 20px;
                text-align: center;
                margin-right: 8px;
            }

            @media print {
                body {
                    background: white;
                    padding: 0;
                }
                
                .pdf-container {
                    box-shadow: none;
                    border-radius: 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="pdf-container">
            <!-- Header -->
            <div class="header">
                <div class="company-logo">
                    <div class="logo-icon">GH</div>
                    <div class="company-info">
                        <h1>Global Health & Allied Services</h1>
                        <p> Insurance Division</p>
                    </div>
                </div>
                <div class="quotation-title">
                    <h2>MOTOR INSURANCE QUOTATION</h2>
                    <div class="date-info">Generated on: ${currentDate}</div>
                </div>
            </div>

            <!-- Vehicle Details Section -->
            <div class="content-section">
                <div class="section-header">
                    <span class="icon">🚗</span> VEHICLE DETAILS
                </div>
                
                <div class="vehicle-details">
                    <div class="detail-item">
                        <span class="detail-label">Registration Number:</span>
                        <span class="detail-value">${vehicle.vehicle_no}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Model:</span>
                        <span class="detail-value">${vehicle?.maker_model || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Year:</span>
                        <span class="detail-value">${purchaseYear} (${vehicleAge} years old)</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Owner:</span>
                        <span class="detail-value">${vehicle.owner}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Engine Capacity:</span>
                        <span class="detail-value">${vehicle.cubic_capacity} cc</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Current IDV:</span>
                        <span class="detail-value">₹ ${formatCurrency(idv)}</span>
                    </div>
                </div>

                <!-- Premium Breakdown -->
                <div class="section-header">
                    <span class="icon">💰</span> PREMIUM BREAKDOWN
                </div>

                <table class="premium-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Description</th>
                            <th style="text-align: right;">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${premiumBreakdown.map(item => `
                            <tr>
                                <td><strong>${item.component}</strong></td>
                                <td>${item.details || ''}</td>
                                <td style="text-align: right;" class="${item.amount < 0 ? 'amount-negative' : 'amount-positive'}">
                                    ${item.amount < 0 ? '-' : ''}₹ ${Math.abs(item.amount).toLocaleString()}
                                </td>
                            </tr>
                        `).join('')}
                        <tr class="total-row">
                            <td><strong>TOTAL ANNUAL PREMIUM</strong></td>
                            <td><strong>Including all taxes & GST</strong></td>
                            <td style="text-align: right;"><strong>₹ ${premium.toLocaleString()}</strong></td>
                        </tr>
                    </tbody>
                </table>

                ${selectedAddOns.length > 0 ? `
                    <div class="section-header">
                        <span class="icon">🛡️</span> SELECTED ADD-ON COVERS
                    </div>
                    <div class="addon-section">
                        ${selectedAddOns.map(addon => `
                            <div class="addon-item">
                                <div>
                                    <div class="addon-name">${addon.icon} ${addon.name}</div>
                                    <div class="addon-description">${addon.description}</div>
                                </div>
                                <div class="addon-price">₹ ${addon.price.toLocaleString()}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Summary Box -->
                <div class="summary-box">
                    <div class="summary-title">TOTAL ANNUAL PREMIUM</div>
                    <div class="summary-amount">₹ ${premium.toLocaleString()}</div>
                    <div class="summary-note">(Including GST & All Applicable Taxes)</div>
                    ${ncbDiscount > 0 ? `
                        <div class="savings-info">
                            🎉 Congratulations! You saved ₹ ${ncbDiscount.toLocaleString()} with ${ncbPercentage}% NCB Discount
                        </div>
                    ` : ''}
                </div>

                <div class="highlight-box">
                    <strong>Important Note:</strong> This quotation is valid for 30 days from the date of generation. 
                    Premium may vary based on final vehicle inspection and documentation verification.
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-left">
                        <h4>Terms & Conditions</h4>
                        <ul>
                            <li>• Policy terms and conditions apply as per standard motor insurance policy</li>
                            <li>• Premium is subject to change based on final risk assessment</li>
                            <li>• All claims are subject to policy terms and exclusions</li>
                            <li>• This quotation does not constitute a binding contract</li>
                        </ul>
                        <br>
                        <p><strong>Contact Support:</strong> globalhealth235@gmail.com | 08069640455</p>
                    </div>
                    <div class="footer-right">
                        <h4>Global Health And Allied Servies</h4>
                       
                        <p>Mumbai Office:</p>
                        <p>43, Ashok Nagar Opp Dwarka Hotel Achole Road,</p>
                        <p> Nallasopara, Mumbai -209</p>
                        <br>
                        <p><strong>Policy Servicing:</strong> Available 24x7</p>
                        <p><strong>Claim Intimation:</strong> 08069640455</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    // Create and download the PDF
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `Global_Health_Quotation_${vehicle.vehicle_no.replace(/\s+/g, '_')}_${currentDate.replace(/\//g, '-')}.html`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Also open in new window for printing
    const newWindow = window.open('', '_blank');
    newWindow.document.write(pdfContent);
    newWindow.document.close();
  };

  // Function to save premium details to localStorage
  const savePremiumDetailsToLocalStorage = (premiumData) => {
    try {
      const storageData = JSON.stringify(premiumData);
          localStorage.setItem("premiumDetails", storageData); // ✅ Save to localStorage

      // console.log('Premium details saved:>>>>><<<<<<', premiumData);
    } catch (error) {
      console.error('Error saving premium details:', error);
    }
  };

  // Reduced Premium Rates (Lower than standard IRDAI rates)
const getReducedOwnDamageRate = (ageInYears) => {
  let baseRate;

  if (ageInYears >= 0 && ageInYears < 1) {
    baseRate = 1.40; // reduced more from 1.80
  } else if (ageInYears >= 1 && ageInYears < 2) {
    baseRate = 1.20; // reduced more from 1.60
  } else if (ageInYears >= 2 && ageInYears < 3) {
    baseRate = 0.40; // reduced more from 1.34
  } else if (ageInYears >= 3 && ageInYears < 4) {
    baseRate = 0.60; // reduced more from 1.22
  } else if (ageInYears >= 4 && ageInYears < 5) {
    baseRate = 0.80; // reduced more from 1.11
  } else {
    baseRate = 0.80; // reduced more from 1.01
  }

  return baseRate;
};

  // Standard NCB rates as per IRDAI
const getStandardNCBPercentage = (claimFreeYears) => {
  if (claimFreeYears >= 5) return 50;
  if (claimFreeYears === 4) return 45;
  if (claimFreeYears === 3) return 35;
  if (claimFreeYears === 2) return 25;
  if (claimFreeYears === 1) return 20;
  return 0;
};

// Correct vehicle age calculation for NCB
const calculateVehicleAge = (purchaseDate, manufacturingYear = null) => {
  const currentYear = new Date().getFullYear();

  // Prefer manufacturing year if available
  if (manufacturingYear) {
    return currentYear - manufacturingYear;
  }

  // Fallback to purchase date year
  if (purchaseDate) {
    const purchaseYear = new Date(purchaseDate).getFullYear();
    return currentYear - purchaseYear;
  }

  return 0;
};

// Calculate NCB with corrected logic
const calculateNCB = (vehicleDetails) => {
  const manufacturingYear = vehicleDetails.manufacturing_year || 
                            vehicleDetails.model_year || 
                            (vehicleDetails.year ? parseInt(vehicleDetails.year) : null);

  const purchaseDate = vehicleDetails.date_of_buy;

  // Calculate vehicle age in completed years
  const vehicleAge = calculateVehicleAge(purchaseDate, manufacturingYear);

  // For NCB: claim-free years capped at 5
  const claimFreeYears = Math.min(vehicleAge, 5);

  const ncbPercent = getStandardNCBPercentage(claimFreeYears);

  // console.log("=== NCB CALCULATION ===");
  // console.log("Vehicle Age:", vehicleAge);
  // console.log("Claim-Free Years:", claimFreeYears);
  // console.log("NCB %:", ncbPercent);
  // console.log("=======================");

  return { claimFreeYears, ncbPercent, vehicleAge };
};

  // Reduced third-party premium rates (lower than standard)
  const getReducedThirdPartyPremium = (vehicleDetails) => {
    const engineCC = vehicleDetails?.cubic_capacity || 1200;
    const isVehicleType = vehicleDetails.vehicle_type?.toLowerCase() || '';
    const isBike = isVehicleType === 'bike' || isVehicleType === 'motorcycle' || engineCC <= 350;

    if (isBike) {
      if (engineCC <= 75) return 450;
      if (engineCC <= 150) return 580;
      if (engineCC <= 350) return 1100;
      return 2200;
    } else {
      if (engineCC <= 1000) return 1600;
      if (engineCC <= 1500) return 3016;
      return 6000;
    }
  };

  useEffect(() => {
    const storedVehicleDetails = JSON.parse(localStorage.getItem('vehicleDetails') || '{}');
    if (storedVehicleDetails && Object.keys(storedVehicleDetails).length > 0) {
      setVehicle(storedVehicleDetails);
      
      // Use ex-showroom price directly as IDV (no depreciation calculation)
      const exShowroomPrice = storedVehicleDetails.ex_showroom_price || storedVehicleDetails.market_value || 500000;
      
      setBaseIdv(exShowroomPrice);
      setIdv(exShowroomPrice);
      
      // console.log("IDV Calculation (Simplified):");
      // console.log("Ex-Showroom Price used as IDV:", exShowroomPrice);
      
      // Calculate NCB using improved logic
      const { ncbPercent } = calculateNCB(storedVehicleDetails);
      setNcbPercentage(ncbPercent);
    }
  }, []);

  useEffect(() => {
    if (baseIdv > 0) {
      const adjustmentToUse = idvAdjustment || 0;
      const maxAdjustment = 15;
      const boundedAdjustment = Math.max(-maxAdjustment, Math.min(maxAdjustment, adjustmentToUse));
      const adjustedIdv = baseIdv * (1 + boundedAdjustment / 100);
      setIdv(Math.round(adjustedIdv));
    }
  }, [baseIdv, idvAdjustment]);

  useEffect(() => {
    if (idv > 0 && vehicle) {
      calculateReducedPremium();
    }
  }, [idv, ncbPercentage]);

  // Add separate useEffect for when addOns change
  useEffect(() => {
    if (idv > 0 && vehicle) {
      calculateReducedPremium();
    }
  }, [addOns]);

  const calculateReducedPremium = () => {
    const { vehicleAge } = calculateNCB(vehicle);
    const engineCC = vehicle?.cubic_capacity || 1200;

    // console.log("=== REDUCED PREMIUM CALCULATION ===");
    
    // Step 1: Calculate reduced own damage premium using ex-showroom IDV
    const reducedRate = getReducedOwnDamageRate(vehicleAge, engineCC, 'tier2');
    let ownDamagePremium = Math.round(idv * (reducedRate / 100));
    
    // console.log("1. IDV (Ex-Showroom Price):", idv);
    // console.log("2. Vehicle Age Used:", vehicleAge, "years");
    // console.log("3. Reduced Rate:", reducedRate + "% of IDV");
    // console.log("4. Own Damage Premium:", ownDamagePremium);
    
    // Step 2: Calculate NCB discount
    const ncbDiscountAmount = Math.round(ownDamagePremium * (ncbPercentage / 100));
    // console.log("5. NCB Discount:", ncbDiscountAmount, "(" + ncbPercentage + "%)");
    setNcbDiscount(ncbDiscountAmount);
    
    const finalOwnDamagePremium = ownDamagePremium - ncbDiscountAmount;
    // console.log("6. Final Own Damage Premium (after NCB):", finalOwnDamagePremium);
    
    // Step 3: Add reduced third-party premium
    const thirdPartyPremium = getReducedThirdPartyPremium(vehicle);
    // console.log("7. Reduced Third-Party Premium:", thirdPartyPremium);
    
    // Step 4: Calculate zero depreciation charge - 12% of Own Damage Premium (reduced from 15%)
    const zeroDepCharge = addOns.find(addon => addon.id === 1)?.selected ? 
      Math.round(ownDamagePremium * 0.25) : 0; // 25% of own damage premium
    
    // Only update if the value has changed to prevent infinite loops
    if (zeroDepCharge !== zeroDepreciationCharge) {
      setZeroDepreciationCharge(zeroDepCharge);
    }
    
    // console.log("8. Zero Depreciation Charge:", zeroDepCharge, "(12% of Own Damage Premium)");
    
    // Step 5: Add add-ons
    const addOnsPremium = addOns
      .filter((addon) => addon.selected)
      .reduce((total, addon) => {
        if (addon.id === 1) return total + zeroDepCharge;
        return total + addon.price;
      }, 0);
    // console.log("9. Add-Ons Premium:", addOnsPremium);

    // Step 6: Calculate subtotal
    const subtotal = finalOwnDamagePremium + thirdPartyPremium + addOnsPremium;
    // console.log("10. Subtotal (before GST):", subtotal);
    
    // Step 7: Add reduced GST (15% instead of 18%)
    const gst = Math.round(subtotal * 0.18);
    // console.log("11. Reduced GST (15%):", gst);
    
    // Step 8: Calculate final premium
    const finalPremium = subtotal + gst;
    // console.log("12. FINAL REDUCED PREMIUM:", finalPremium);
    
    setPremium(finalPremium);

    // Save premium details to localStorage
    const premiumDetails = {
      IDV: idv,
      TOTAL_PREMIUM: finalPremium,
      OWN_DAMAGE: finalOwnDamagePremium,
      GST: gst,
      NCB: ncbDiscountAmount,
      NCB_PERCENTAGE: ncbPercentage,
      THIRD_PARTY: thirdPartyPremium,
      ADDONS: addOnsPremium,
      SELECTED_ADDONS: addOns.filter(addon => addon.selected),
      ZERO_DEPRECIATION_CHARGE: zeroDepCharge,
      VEHICLE_AGE: vehicleAge,
      SUBTOTAL: subtotal
    };

    savePremiumDetailsToLocalStorage(premiumDetails);
  };

  // Separate useEffect to update zero depreciation addon price
  useEffect(() => {
    setAddOns(prev => prev.map(addon => 
      addon.id === 1 ? { ...addon, price: zeroDepreciationCharge } : addon
    ));
  }, [zeroDepreciationCharge]);

  const toggleAddOn = (id) => {
    setAddOns((prevAddOns) =>
      prevAddOns.map((addon) =>
        addon.id === id ? { ...addon, selected: !addon.selected } : addon
      )
    );
  };

  const handleIdvAdjustment = (value) => {
    const maxAdjustment = 15;
    const boundedValue = Math.max(-maxAdjustment, Math.min(maxAdjustment, value));
    setIdvAdjustment(boundedValue);
  };

  const getPremiumBreakdown = () => {
    if (!vehicle || !idv) return [];

    const { vehicleAge } = calculateNCB(vehicle);
    const engineCC = vehicle?.cubic_capacity || 1200;

    const reducedRate = getReducedOwnDamageRate(vehicleAge, engineCC, 'tier2');
    let ownDamagePremium = Math.round(idv * (reducedRate / 100));
    
    const thirdPartyPremium = getReducedThirdPartyPremium(vehicle);
    
    const addOnsPremium = addOns
      .filter((addon) => addon.selected)
      .reduce((total, addon) => {
        if (addon.id === 1) return total + zeroDepreciationCharge;
        return total + addon.price;
      }, 0);
    
    const subtotal = ownDamagePremium - ncbDiscount + thirdPartyPremium + addOnsPremium;
    const gst = Math.round(subtotal * 0.18);

    return [
      { 
        key: '1', 
        component: 'Own Damage Premium', 
        amount: ownDamagePremium, 
        icon: <SafetyOutlined style={{ color: '#1890ff' }} />,
        details: `${reducedRate}% of Ex-Showroom IDV (${formatCurrency(idv)})`
      },
      { 
        key: '2', 
        component: 'NCB Discount', 
        amount: -ncbDiscount, 
        icon: <StarOutlined style={{ color: '#52c41a' }} />,
        details: `${ncbPercentage}% of Own Damage Premium (${vehicleAge} years vehicle)`
      },
      { 
        key: '3', 
        component: 'Third-Party Premium', 
        amount: thirdPartyPremium, 
        icon: <CarOutlined style={{ color: '#fa541c' }} />,
        details: 'Reduced competitive rates'
      },
      { 
        key: '4', 
        component: 'Add-Ons', 
        amount: addOnsPremium, 
        icon: <CheckCircleOutlined style={{ color: '#722ed1' }} />,
        details: addOnsPremium > 0 ? `Including Zero Dep: ${formatCurrency(zeroDepreciationCharge)}` : 'None selected'
      },
      { 
        key: '5', 
        component: 'GST', 
        amount: gst, 
        icon: <DollarOutlined style={{ color: '#eb2f96' }} />,
        details: '18% of Subtotal (Reduced Rate)'
      },
    ];
  };

  if (!vehicle) {
    return (
      <div className="container text-center" style={{ padding: '50px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', color: 'white' }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
          <CarOutlined style={{ fontSize: '64px', marginBottom: '20px' }} />
          <h2>No vehicle details found</h2>
          <p>Please go back and enter your vehicle registration number</p>
          <Link to="/car-insurance">
            <Button type="primary" size="large" style={{ borderRadius: '25px', height: '50px', fontSize: '16px' }}>
              Back to Vehicle Entry
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const premiumBreakdown = getPremiumBreakdown();

  const columns = [
    {
      title: 'Component',
      dataIndex: 'component',
      key: 'component',
      render: (text, record) => (
        <Space>
          {record.icon}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: `Amount (${currencyRates[selectedCurrency].symbol})`,
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span style={{ 
          color: amount < 0 ? '#52c41a' : '#1890ff', 
          fontWeight: 'bold' 
        }}>
          {amount < 0 ? '-' : ''}{formatCurrency(Math.abs(amount))}

        </span>
      ),
    },
  ];

  const currentYear = new Date().getFullYear();
  const purchaseYear = new Date(vehicle.date_of_buy).getFullYear();
  const vehicleAge = currentYear - purchaseYear;

  const savingsPercentage = ncbDiscount > 0 ? Math.round((ncbDiscount / (premium + ncbDiscount)) * 100) : 0;

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
      minHeight: '100vh', 
      padding: '20px 0' 
    }}>
      <div className="container">
        {/* Header Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          borderRadius: '20px', 
          padding: '30px', 
          marginBottom: '30px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '-50px', 
            right: '-50px', 
            width: '200px', 
            height: '200px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '50%' 
          }} />
          <Link to="/carinsurance">
            <Button 
              type="primary" 
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                border: 'none', 
                borderRadius: '25px',
                marginBottom: '20px'
              }}
            >
              Back to Vehicle Entry
            </Button>
          </Link>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Hello {vehicle?.owner}!
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Your Premium Details are Ready
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {/* Vehicle Details Card */}
          <Col xs={24} lg={8}>
            <Card 
              style={{ 
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
              bodyStyle={{ padding: '25px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <CarOutlined style={{ fontSize: '48px', marginBottom: '15px' }} />
                <h3 style={{ color: 'white', margin: '0' }}>Vehicle Details</h3>
                <Tag color="gold" style={{ marginTop: '10px' }}>Verified</Tag>
              </div>
              <div style={{ fontSize: '16px', lineHeight: '2' }}>
                <p><strong>Registration:</strong> {vehicle.vehicle_no}</p>
                <p><strong>Model:</strong> {vehicle?.maker_model}</p>
                <p><strong>Year:</strong> {purchaseYear} ({vehicleAge} years old)</p>
                <p><strong>Owner:</strong> {vehicle.owner}</p>
                <p><strong>Engine:</strong> {vehicle.cubic_capacity} cc</p>
                <p><strong>Current IDV:</strong> ₹ {formatCurrency(idv)}</p>
              </div>
            </Card>
          </Col>
          
          {/* IDV Card */}
          <Col xs={24} lg={8}>
            <Card 
              style={{ 
                borderRadius: '15px',
                background: 'white',
                border: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
              bodyStyle={{ padding: '25px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <DollarOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '15px' }} />
                <h3 style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  Insured Declared Value (IDV) 
                  <Tooltip title="IDV is the maximum amount that you can claim in case of total loss or theft of your vehicle">
                    <InfoCircleOutlined style={{ color: '#1890ff' }} />
                  </Tooltip>
                </h3>
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  color: '#1890ff', 
                  margin: '0',
                  fontWeight: 'bold'
                }}>
                   {formatCurrency(idv)}
                </h2>
                <p style={{ color: '#666', marginTop: '10px' }}>
                  Based on {vehicleAge} years vehicle age and standard depreciation
                </p>
              </div>
              
              <div style={{ marginTop: '25px' }}>
                <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                  Adjust IDV: {idvAdjustment > 0 ? '+' : ''}{idvAdjustment || 0}%
                </p>
                <Slider 
                  min={-10} 
                  max={10} 
                  defaultValue={0}
                  marks={{
                    '-10': '-10%',
                    '0': '0%',
                    '10': '+10%'
                  }}
                  onChange={handleIdvAdjustment}
                  value={idvAdjustment || 0}
                  trackStyle={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  handleStyle={{ borderColor: '#667eea' }}
                />
                <p style={{ color: '#666', fontSize: '12px', marginTop: '10px' }}>
                  You can adjust the IDV within ±10% of the calculated value.
                </p>
              </div>
            </Card>
          </Col>
          
          {/* Premium Card */}
        <Col xs={24} lg={8}>
            <Card 
              style={{ 
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                color: 'white',
                border: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                height: '100%'
              }}
              bodyStyle={{ padding: '25px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <SafetyOutlined style={{ fontSize: '48px', marginBottom: '15px' }} />
                <h3 style={{ color: 'white', margin: '0 0 20px 0' }}>Annual Premium</h3>
                
                {/* Currency Selector */}
                <div style={{ marginBottom: '20px' }}>
                  <Select
                    value={selectedCurrency}
                   onChange={handleCurrencyChange}

                    style={{ width: '100%' }}
                    size="large"
                    dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                  >
                    {Object.entries(currencyRates).map(([code, data]) => (
                      <Option key={code} value={code}>
                        <span style={{ fontSize: '14px' }}>
                          {data.symbol} {data.name} ({code})
                        </span>
                      </Option>
                    ))}
                  </Select>
                </div>
                
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  color: 'white', 
                  margin: '0',
                  fontWeight: 'bold'
                }}>
                  {formatCurrency(premium)}
                </h2>
                <p style={{ opacity: 0.9, marginTop: '10px' }}>Including GST</p>
                
                <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                  <Tag color="gold" style={{ fontSize: '14px', padding: '5px 15px' }}>
                    NCB: {ncbPercentage}%
                  </Tag>
                  {ncbDiscount > 0 && (
                    <Tag color="green" style={{ fontSize: '14px', padding: '5px 15px' }}>
                      Saved: {formatCurrency(ncbDiscount)}
                    </Tag>
                  )}
                </div>

                {savingsPercentage > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ marginBottom: '10px', opacity: 0.9 }}>You saved {savingsPercentage}%!</p>
                    <Progress 
                      percent={savingsPercentage} 
                      showInfo={false} 
                      strokeColor="gold"
                      trailColor="rgba(255,255,255,0.3)"
                    />
                  </div>
                )}
                
                <Button 
                  type="primary" 
                  size="large" 
                  block
                  style={{ 
                    background: 'white', 
                    color: '#52c41a', 
                    border: 'none',
                    borderRadius: '25px',
                    height: '50px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Proceed to Payment
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        
        
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          {/* Premium Breakdown */}
       <Col xs={24} lg={12}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <DollarOutlined style={{ color: '#1890ff' }} />
                  <span>Premium Breakdown</span>
                </div>
              }
              style={{ 
                borderRadius: '15px',
                border: 'none',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Table 
                dataSource={premiumBreakdown} 
                columns={columns}
                pagination={false}
                size="middle"
                summary={pageData => {
                  let total = 0;
                  pageData.forEach(({ amount }) => {
                    total += amount;
                  });
                  
                  return (
                    <Table.Summary.Row style={{ background: 'linear-gradient(135deg, #f0f0f0 0%, #e6e6e6 100%)' }}>
                      <Table.Summary.Cell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <StarOutlined style={{ color: '#52c41a' }} />
                          <strong style={{ fontSize: '16px' }}>Total Premium</strong>
                        </div>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <strong style={{ fontSize: '16px', color: '#1890ff' }}>
                          {formatCurrency(total)}
                        </strong>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  );
                }}
              />
              <div style={{ marginTop: '15px', padding: '15px', background: '#f6ffed', borderRadius: '8px' }}>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#52c41a' }}>
                  <InfoCircleOutlined style={{ marginRight: '5px' }} />
                  <strong>Zero Depreciation:</strong> {formatCurrency(zeroDepreciationCharge)}
                </p>
                <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                  Get full claim amount without depreciation deduction.
                </p>
              </div>
            </Card>
          </Col>
          
          {/* Enhanced Add-ons */}
            <Col xs={24} lg={12}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircleOutlined style={{ color: '#722ed1' }} />
                  <span>Add-on Covers</span>
                </div>
              }
              style={{ 
                borderRadius: '15px',
                border: 'none',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
              }}
            >
              <p style={{ marginBottom: '20px', color: '#666' }}>
                Enhance your coverage with these premium add-ons:
              </p>
              <div>
                {addOns.map(addon => (
                  <div 
                    key={addon.id} 
                    style={{
                      background: addon.selected 
                        ? 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)' 
                        : 'white',
                      color: addon.selected ? 'white' : '#333',
                      border: addon.selected ? 'none' : '2px solid #f0f0f0',
                      borderRadius: '12px',
                      padding: '15px',
                      marginBottom: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: addon.selected 
                        ? '0 5px 15px rgba(114, 46, 209, 0.3)' 
                        : '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    onClick={() => toggleAddOn(addon.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '18px' }}>{addon.icon}</span>
                          <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{addon.name}</span>
                        </div>
                        <p style={{ 
                          fontSize: '12px', 
                          opacity: 0.8, 
                          margin: '0',
                          color: addon.selected ? 'rgba(255,255,255,0.8)' : '#666'
                        }}>
                          {addon.description}
                        </p>
                        <div style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                          {formatCurrency(addon.price)}
                        </div>
                      </div>
                      <div style={{ marginLeft: '15px' }}>
                        {addon.selected && (
                          <CheckCircleOutlined style={{ fontSize: '24px', color: 'gold' }} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
        
        {/* Coverage Details */}
        <Row className="mt-4">
          <Col xs={24}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <SafetyOutlined style={{ color: '#52c41a' }} />
                  <span>Coverage Details</span>
                </div>
              }
              style={{ 
                borderRadius: '15px',
                border: 'none',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    color: 'white' 
                  }}>
                    <h4 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircleOutlined /> What's Covered
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>✅</span> Accidental damage to your vehicle
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>✅</span> Theft of your vehicle
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>✅</span> Third-party liability
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>✅</span> Natural disasters (flood, earthquake, etc.)
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>✅</span> Fire damage
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>✅</span> Personal accident cover for owner-driver
                      </li>
                    </ul>
                  </div>
                </Col>
                
                <Col xs={24} md={8}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    color: 'white' 
                  }}>
                    <h4 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <InfoCircleOutlined /> What's Not Covered
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>❌</span> Normal wear and tear
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>❌</span> Mechanical/electrical breakdown
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>❌</span> Damage due to driving under influence
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>❌</span> Damage when driving without valid license
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>❌</span> Consequential damages
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>❌</span> Contractual liability
                      </li>
                    </ul>
                  </div>
                </Col>
                
                <Col xs={24} md={8}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    color: 'white' 
                  }}>
                    <h4 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <StarOutlined /> Additional Benefits
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🔧</span> 24/7 claim assistance
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>💳</span> Cashless repairs at network garages
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>⚡</span> Quick claim settlement
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🎯</span> No Claim Bonus on renewal
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>📱</span> Digital policy documents
                      </li>
                      <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🚗</span> Doorstep service available
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        
        {/* Action Buttons */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px', 
          padding: '30px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Ready to secure your vehicle?</h3>
          <Space size="large">
            <Link to="/car-insurance">
              <Button 
                size="large"
                style={{
                  borderRadius: '25px',
                  height: '50px',
                  paddingLeft: '30px',
                  paddingRight: '30px',
                  fontSize: '16px'
                }}
              >
                Back
              </Button>
            </Link>
            <Link to="/formpage">
              <Button 
                type="primary" 
                className='user-button'
                                onClick={() => saveCurrencyToStorage(selectedCurrency)}

                size="large"
                style={{
                  background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  height: '50px',
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 5px 15px rgba(82, 196, 26, 0.3)'
                }}
              >
                Proceed to Payment
              </Button>
            </Link>
          </Space>
          
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            <p>Secure payment • 24/7 support • Instant policy issuance</p>
            <p style={{ fontWeight: 'bold', color: '#1890ff' }}>
              Final Premium: {formatCurrency(premium)} (includes Zero Depreciation: {formatCurrency(zeroDepreciationCharge)})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;