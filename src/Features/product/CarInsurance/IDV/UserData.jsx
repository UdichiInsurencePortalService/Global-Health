// ye page vo vala hai jha pr user IDV and premuim calaulate ho rha hai


import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Divider, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './User.css';

const UserData = () => {
  const [vehicle, setVehicle] = useState(null);
  const [idv, setIdv] = useState(0);
  const [premium, setPremium] = useState(0);
  const [addOns, setAddOns] = useState([
    { id: 1, name: 'Zero Depreciation', selected: false, price: 1500 },
    { id: 2, name: 'Engine Protection', selected: false, price: 800 },
    { id: 3, name: 'Roadside Assistance', selected: false, price: 500 },
    { id: 4, name: 'Return to Invoice', selected: false, price: 1200 },
    { id: 5, name: 'NCB Protection', selected: false, price: 700 },
  ]);

  useEffect(() => {
    // Get vehicle details from localStorage
    const storedVehicleDetails = localStorage.getItem('vehicleDetails');
    
    if (storedVehicleDetails) {
      const vehicleDetails = JSON.parse(storedVehicleDetails);
      setVehicle(vehicleDetails);
      
      // Calculate IDV based on vehicle details
      calculateIDV(vehicleDetails);
    }
  }, []);

  useEffect(() => {
    // Calculate premium whenever IDV changes
    if (idv > 0) {
      calculatePremium();
    }
  }, [idv, addOns]);

  const calculateIDV = (vehicleDetails) => {
    if (!vehicleDetails) return;
    
    // Get current year and purchase year
    const currentYear = new Date().getFullYear();
    const purchaseYear = new Date(vehicleDetails.date_of_buy).getFullYear();
    const ageInYears = currentYear - purchaseYear;
    
    // Base value from vehicle details
    let baseValue = vehicleDetails.ex_showroom_price || 1000000; // Default if not available
    
    // Apply depreciation based on vehicle age (extended up to 15 years)
    let depreciationRate;
   
    if (ageInYears <= 0.5) {
        depreciationRate = 0.05; // 5% for vehicles up to 6 months old
    } else if (ageInYears <= 1) {
        depreciationRate = 0.15; // 15% for vehicles between 6 months and 1 year
    } else if (ageInYears <= 2) {
        depreciationRate = 0.20; // 20% for vehicles between 1 and 2 years
    } else if (ageInYears <= 3) {
        depreciationRate = 0.30; // 30% for vehicles between 2 and 3 years
    } else if (ageInYears <= 4) {
        depreciationRate = 0.40; // 40% for vehicles between 3 and 4 years
    } else if (ageInYears <= 5) {
        depreciationRate = 0.50; // 50% for vehicles between 4 and 5 years
    } else if (ageInYears <= 7) {
        depreciationRate = 0.60; // 60% for vehicles between 5 and 7 years
    } else if (ageInYears <= 10) {
        depreciationRate = 0.70; // 70% for vehicles between 7 and 10 years
    } else if (ageInYears <= 15) {
        depreciationRate = 0.80; // 80% for vehicles between 10 and 15 years
    } else {
        depreciationRate = 0.90; // 90% for vehicles older than 15 years
    }
    
    // Calculate IDV after depreciation
    const calculatedIDV = baseValue * (1 - depreciationRate);
    setIdv(Math.round(calculatedIDV));
  };

  const calculatePremium = () => {
    if (idv <= 0) return;
    
    // Basic premium calculation - varies based on vehicle age
    const currentYear = new Date().getFullYear();
    const purchaseYear = vehicle ? new Date(vehicle.date_of_buy).getFullYear() : currentYear;
    const ageInYears = currentYear - purchaseYear;
    
    // Adjust premium rate based on vehicle age
    let basePremiumRate;
    if (ageInYears <= 3) {
      basePremiumRate = 0.020; // 2.0% for newer vehicles
    } else if (ageInYears <= 7) {
      basePremiumRate = 0.025; // 2.5% for middle-aged vehicles
    } else if (ageInYears <= 10) {
      basePremiumRate = 0.030; // 3.0% for older vehicles
    } else {
      basePremiumRate = 0.035; // 3.5% for very old vehicles
    }
    
    let basePremium = idv * basePremiumRate;
    
    // Add third-party premium (fixed amount based on vehicle CC)
    const thirdPartyPremium = 2000; // Example fixed amount
    
    // Calculate additional premium for add-ons
    const addOnsPremium = addOns
      .filter(addon => addon.selected)
      .reduce((total, addon) => total + addon.price, 0);
    
    // Calculate total premium
    const totalPremium = basePremium + thirdPartyPremium + addOnsPremium;
    
    // Apply GST (18%)
    const premiumWithGST = totalPremium * 1.18;
    
    setPremium(Math.round(premiumWithGST));
  };

  const toggleAddOn = (id) => {
    setAddOns(prevAddOns => 
      prevAddOns.map(addon => 
        addon.id === id ? { ...addon, selected: !addon.selected } : addon
      )
    );
  };

  const getPremiumBreakdown = () => {
    if (!vehicle) return [];
    
    const currentYear = new Date().getFullYear();
    const purchaseYear = new Date(vehicle.date_of_buy).getFullYear();
    const ageInYears = currentYear - purchaseYear;
    
    // Adjust premium rate based on vehicle age
    let basePremiumRate;
    if (ageInYears <= 3) {
      basePremiumRate = 0.020; // 2.0% for newer vehicles
    } else if (ageInYears <= 7) {
      basePremiumRate = 0.025; // 2.5% for middle-aged vehicles
    } else if (ageInYears <= 10) {
      basePremiumRate = 0.030; // 3.0% for older vehicles
    } else {
      basePremiumRate = 0.035; // 3.5% for very old vehicles
    }
    
    const basePremium = Math.round(idv * basePremiumRate);
    const thirdPartyPremium = 2000;
    const addOnsPremium = addOns
      .filter(addon => addon.selected)
      .reduce((total, addon) => total + addon.price, 0);
    
    const subtotal = basePremium + thirdPartyPremium + addOnsPremium;
    const gst = Math.round(subtotal * 0.18);
    
    return [
      {
        key: '1',
        component: 'Basic Own Damage',
        amount: basePremium,
      },
      {
        key: '2',
        component: 'Third Party Premium',
        amount: thirdPartyPremium,
      },
      {
        key: '3',
        component: 'Add-ons',
        amount: addOnsPremium,
      },
      {
        key: '4',
        component: 'GST (18%)',
        amount: gst,
      },
    ];
  };

  if (!vehicle) {
    return (
      <div className="container text-center py-5">
        <h2>No vehicle details found</h2>
        <p>Please go back and enter your vehicle registration number</p>
        <Link to="/car-insurance">
          <Button type="primary">Back to Vehicle Entry</Button>
        </Link>
      </div>
    );
  }

  const premiumBreakdown = getPremiumBreakdown();

  const columns = [
    {
      title: 'Component',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span>₹ {text.toLocaleString()}</span>,
    },
  ];

  // Get vehicle age for display
  const currentYear = new Date().getFullYear();
  const purchaseYear = new Date(vehicle.date_of_buy).getFullYear();
  const vehicleAge = currentYear - purchaseYear;

  return (
    <>
    <Link to="/carinsurance">
    <Button type="primary">Back to Vehicle Entry</Button>
  </Link>
    <div className="user-data-container py-5">
      <div className="container">
        <h1 className="text-center mb-4">Your Insurance Premium Details</h1>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card 
              title="Vehicle Details" 
              className="vehicle-card"
              bordered={false}
              hoverable
              extra={<Tag color="blue">Verified</Tag>}
            >
              <p><strong>Registration:</strong> {vehicle.vehicle_no}</p>
              <p><strong>Make:</strong> {vehicle.company}</p>
              <p><strong>Model:</strong> {vehicle.model}</p>
              <p><strong>Year:</strong> {purchaseYear} ({vehicleAge} years old)</p>
              <p><strong>Owner:</strong> {vehicle.owner}</p>
              <p><strong>Ex-Showroom Price:</strong> ₹ {vehicle.ex_showroom_price.toLocaleString()}</p>
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <Card 
              title={<div>Insured Declared Value (IDV) <Tooltip title="IDV is the maximum amount that you can claim in case of total loss or theft of your vehicle"><InfoCircleOutlined /></Tooltip></div>}
              className="idv-card"
              bordered={false}
              hoverable
            >
              <h2 className="idv-value">₹ {idv.toLocaleString()}</h2>
              <p className="text-muted">This value is calculated based on the vehicle's age of {vehicleAge} years, market value, and applicable depreciation.</p>
              <p className="text-muted small">For vehicles up to 15 years old, depreciation ranges from 5% to 80%.</p>
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <Card 
              title="Total Premium" 
              className="premium-card"
              bordered={false}
              hoverable
            >
              <h2 className="premium-value">₹ {premium.toLocaleString()}</h2>
              <p className="text-muted">Annual premium including GST</p>
              <Button type="primary" size="large" block>
                Proceed to Payment
              </Button>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={[24, 24]} className="mt-4">
          <Col xs={24} lg={12}>
            <Card title="Premium Breakdown" bordered={false}>
              <Table 
                dataSource={premiumBreakdown} 
                columns={columns} 
                pagination={false}
                summary={pageData => {
                  let total = 0;
                  pageData.forEach(({ amount }) => {
                    total += amount;
                  });
                  
                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell><strong>Total Premium</strong></Table.Summary.Cell>
                        <Table.Summary.Cell><strong>₹ {total.toLocaleString()}</strong></Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card title="Add-on Covers" bordered={false}>
              <p>Enhance your coverage with these add-ons</p>
              <div className="add-ons-container">
                {addOns.map(addon => (
                  <div key={addon.id} className={`add-on-item ${addon.selected ? 'selected' : ''}`} onClick={() => toggleAddOn(addon.id)}>
                    <div className="add-on-info">
                      <div className="add-on-name">{addon.name}</div>
                      <div className="add-on-price">₹ {addon.price}</div>
                    </div>
                    <div className="add-on-checkbox">
                      {addon.selected && <CheckCircleOutlined />}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col xs={24}>
            <Card title="Coverage Details" bordered={false}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <h4>What's Covered</h4>
                  <ul className="coverage-list">
                    <li>Accidental damage to your vehicle</li>
                    <li>Theft of your vehicle</li>
                    <li>Third-party liability</li>
                    <li>Natural disasters (flood, earthquake, etc.)</li>
                    <li>Fire damage</li>
                    <li>Personal accident cover for owner-driver</li>
                  </ul>
                </Col>
                <Col xs={24} md={8}>
                  <h4>What's Not Covered</h4>
                  <ul className="coverage-list not-covered">
                    <li>Normal wear and tear</li>
                    <li>Mechanical/electrical breakdown</li>
                    <li>Damage due to driving under influence</li>
                    <li>Damage when driving without valid license</li>
                    <li>Consequential damages</li>
                    <li>Contractual liability</li>
                  </ul>
                </Col>
                <Col xs={24} md={8}>
                  <h4>Additional Benefits</h4>
                  <ul className="coverage-list benefits">
                    <li>24/7 claim assistance</li>
                    <li>Cashless repairs at network garages</li>
                    <li>Quick claim settlement</li>
                    <li>No Claim Bonus on renewal</li>
                    <li>Digital policy documents</li>
                  </ul>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        
        <div className="text-center mt-4">
          <Link to="/car-insurance">
            <Button>Back</Button>
          </Link>
          <Button type="primary" className="ms-3">
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserData;