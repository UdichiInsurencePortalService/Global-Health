import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Divider, Tag, Tooltip, Slider } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import './User.css';

const UserData = () => {
  const [vehicle, setVehicle] = useState(null);
  const [idv, setIdv] = useState(0);
  const [baseIdv, setBaseIdv] = useState(0);
  const [idvAdjustment, setIdvAdjustment] = useState(0);
  const [premium, setPremium] = useState(0);
  const [ncbDiscount, setNcbDiscount] = useState(0);
  const [ncbPercentage, setNcbPercentage] = useState(0);
  const [addOns, setAddOns] = useState([
    { id: 1, name: 'Zero Depreciation', selected: false, price: 1500 },
    { id: 2, name: 'Engine Protection', selected: false, price: 800 },
    { id: 3, name: 'Roadside Assistance', selected: false, price: 500 },
    { id: 4, name: 'Return to Invoice', selected: false, price: 1200 },
    { id: 5, name: 'PA Cover for Owner Driver of ₹ 15,00,000 ', selected: false, price: 330 },

    // Removed NCB Protection as requested
  ]);
  useEffect(() => {
    if (premium > 0 && vehicle) {
      // Get all the premium components
      const currentYear = new Date().getFullYear();
      const purchaseYear = new Date(vehicle.date_of_buy).getFullYear();
      const ageInYears = currentYear - purchaseYear;
  
      // Use the same rates as in calculatePremium
      let basePremiumRate;
      if (ageInYears <= 3) {
        basePremiumRate = 0.008;
      } else if (ageInYears <= 7) {
        basePremiumRate = 0.009;
      } else if (ageInYears <= 10) {
        basePremiumRate = 0.011;
      } else {
        basePremiumRate = 0.013;
      }
  
      // Calculate own damage premium before NCB
      const ownDamagePremium = Math.round(idv * basePremiumRate);
      
      // Get third-party premium
      const thirdPartyPremium = getThirdPartyPremium(vehicle);
      
      // Calculate add-ons premium
      const addOnsPremium = addOns
        .filter((addon) => addon.selected)
        .reduce((total, addon) => total + addon.price, 0);
      
      // Calculate subtotal (before GST)
      const subtotal = ownDamagePremium - ncbDiscount + thirdPartyPremium + addOnsPremium;
      
      // Calculate GST (18% of subtotal)
      const gst = Math.round(subtotal * 0.18);
  
      // Store premium components in localStorage
      const premiumComponents = {
        totalPremium: premium,
        ownDamagePremium: ownDamagePremium,
        thirdPartyPremium: thirdPartyPremium,
        addOnsPremium: addOnsPremium,
        gst: gst,
        ncbDiscount: ncbDiscount,
        ncbPercentage: ncbPercentage,
        idv: idv,
        selectedAddOns: addOns.filter(addon => addon.selected)
      };
  
      localStorage.setItem('premiumComponents', JSON.stringify(premiumComponents));
      console.log('Premium components saved to localStorage>>>>>>>>>>>>', premiumComponents);
    }
  }, [premium, vehicle, idv, ncbDiscount, ncbPercentage, addOns]);
  useEffect(() => {
    const storedVehicleDetails = localStorage.getItem('vehicleDetails');
    if (storedVehicleDetails) {
      const vehicleDetails = JSON.parse(storedVehicleDetails);
      setVehicle(vehicleDetails);
      calculateIDV(vehicleDetails);
      console.log("data recived from userdata>>>>>>>>>>>>",vehicleDetails)
      // Set NCB based on vehicle age - just for demo, in real app this would come from user input
      const currentYear = new Date().getFullYear();
      const purchaseYear = new Date(vehicleDetails.date_of_buy).getFullYear();
      const ageInYears = currentYear - purchaseYear;
      
      // Apply NCB based on age (simplified logic for demo)
      if (ageInYears >= 5) {
        setNcbPercentage(50);
      } else if (ageInYears === 4) {
        setNcbPercentage(45);
      } else if (ageInYears === 3) {
        setNcbPercentage(35);
      } else if (ageInYears === 2) {
        setNcbPercentage(25);
      } else if (ageInYears === 1) {
        setNcbPercentage(20);
      } else {
        setNcbPercentage(0); // For 0 claim-free years
      }
    }
  }, []);

  useEffect(() => {
    if (baseIdv > 0 && vehicle) {
      // Apply IDV adjustment
      const adjustedIdv = baseIdv * (1 + idvAdjustment / 100);
      setIdv(Math.round(adjustedIdv));
    }
  }, [baseIdv, idvAdjustment]);

  useEffect(() => {
    if (idv > 0 && vehicle) {
      calculatePremium();
    }
  }, [idv, addOns, ncbPercentage]);

  const calculateIDV = (vehicleDetails) => {
    const currentYear = new Date().getFullYear();
    const purchaseYear = new Date(vehicleDetails.date_of_buy).getFullYear();
    const ageInYears = currentYear - purchaseYear;
    const baseValue = vehicleDetails.ex_showroom_price || 0;

    let depreciationRate;
    if (ageInYears <= 0.5) {
      depreciationRate = 0.05;
    } else if (ageInYears <= 1) {
      depreciationRate = 0.15;
    } else if (ageInYears <= 2) {
      depreciationRate = 0.20;
    } else if (ageInYears <= 3) {
      depreciationRate = 0.30;
    } else if (ageInYears <= 4) {
      depreciationRate = 0.40;
    } else if (ageInYears <= 5) {
      depreciationRate = 0.50;
    } else if (ageInYears <= 7) {
      depreciationRate = 0.60;
    } else if (ageInYears <= 10) {
      depreciationRate = 0.70;
    } else if (ageInYears <= 15) {
      depreciationRate = 0.80;
    } else {
      depreciationRate = 0.90;
    }

    const calculatedIDV = baseValue * (1 - depreciationRate);
    setBaseIdv(Math.round(calculatedIDV));
    setIdv(Math.round(calculatedIDV));
  };

  const calculatePremium = () => {
    const currentYear = new Date().getFullYear();
    const purchaseYear = new Date(vehicle.date_of_buy).getFullYear();
    console.log(purchaseYear)
    const ageInYears = currentYear - purchaseYear;
    console.log(ageInYears)

    // Further reduced base premium rates (lower than before)
    let basePremiumRate;
    if (ageInYears <= 3) {
      basePremiumRate = 0.008; // Reduced from 0.010 to 0.8% of IDV
    } else if (ageInYears <= 7) {
      basePremiumRate = 0.009; // Reduced from 0.012 to 0.9% of IDV
    } else if (ageInYears <= 10) {
      basePremiumRate = 0.011; // Reduced from 0.015 to 1.1% of IDV
    } else {
      basePremiumRate = 0.013; // Reduced from 0.018 to 1.3% of IDV
    }

    // Calculate own damage premium before NCB
    const ownDamagePremium = idv * basePremiumRate;
    console.log(ownDamagePremium,'own damage premiun')
    
    // Apply NCB discount to own damage premium
    const ncbDiscount = ownDamagePremium * (ncbPercentage / 100);
    console.log(ncbDiscount,'ncb discount')
    setNcbDiscount(Math.round(ncbDiscount));
    
    // Calculate final own damage premium after NCB
    const finalOwnDamagePremium = ownDamagePremium - ncbDiscount;
    console.log(finalOwnDamagePremium,'final own damage premiun')
    
    // Get third-party premium
    const thirdPartyPremium = getThirdPartyPremium(vehicle);
    
    // Calculate add-ons premium
    const addOnsPremium = addOns
      .filter((addon) => addon.selected)
      .reduce((total, addon) => total + addon.price, 0);

    // Calculate subtotal (before GST)
    const subtotal = finalOwnDamagePremium + thirdPartyPremium + addOnsPremium;
    
    // Calculate GST (18% of subtotal)
    const gst = subtotal * 0.18;
    
    // Calculate total premium (subtotal + GST)
    const totalPremium = subtotal + gst;

    setPremium(Math.round(totalPremium));
  };

  // Updated to use exact IRDAI third-party premium rates as per latest schedule
  const getThirdPartyPremium = (vehicleDetails) => {
    const engineCC = vehicleDetails?.cubic_capacity || 0;
    const isVehicleType = vehicleDetails.vehicle_type?.toLowerCase() || '';
    const isBike = isVehicleType === 'bike' || engineCC <= 350;

    // Latest IRDAI rates for third-party premiums
    if (isBike) {
      // Two-wheelers
      if (engineCC <= 75) return 538;
      if (engineCC <= 150) return 714;
      if (engineCC <= 350) return 1366;
      return 2804;
    } else {
      // Private cars
      if (engineCC <= 1000) return 2094;
      if (engineCC <= 1500) return 3416;
      return 7;
    }
  };

  const toggleAddOn = (id) => {
    setAddOns((prevAddOns) =>
      prevAddOns.map((addon) =>
        addon.id === id ? { ...addon, selected: !addon.selected } : addon
      )
    );
  };

  const handleIdvAdjustment = (value) => {
    setIdvAdjustment(value);
  };

  const getPremiumBreakdown = () => {
    const currentYear = new Date().getFullYear();
    const purchaseYear = new Date(vehicle.date_of_buy).getFullYear();
    const ageInYears = currentYear - purchaseYear;

    // Use the same rates as in calculatePremium
    let basePremiumRate;
    if (ageInYears <= 3) {
      basePremiumRate = 0.008;
    } else if (ageInYears <= 7) {
      basePremiumRate = 0.009;
    } else if (ageInYears <= 10) {
      basePremiumRate = 0.011;
    } else {
      basePremiumRate = 0.013;
    }

    // Calculate own damage premium before NCB
    const ownDamagePremium = Math.round(idv * basePremiumRate);
    
    // Get third-party premium
    const thirdPartyPremium = getThirdPartyPremium(vehicle);
    
    // Calculate add-ons premium
    const addOnsPremium = addOns
      .filter((addon) => addon.selected)
      .reduce((total, addon) => total + addon.price, 0);
    
    // Calculate subtotal (before GST)
    const subtotal = ownDamagePremium - ncbDiscount + thirdPartyPremium + addOnsPremium;
    
    // Calculate GST (18% of subtotal)
    const gst = Math.round(subtotal * 0.18);

    // Create breakdown array
    return [
      { key: '1', component: 'Own Damage Premium', amount: ownDamagePremium },
      // { key: '2', component: 'NCB Proptection', amount: ncbDiscount },

      { key: '3', component: 'Third-Party Premium', amount: thirdPartyPremium },
      { key: '4', component: 'Add-Ons', amount: addOnsPremium },
      // { key: '5', component: 'GST (18%)', amount: gst },
    ];
  };

  if (!vehicle) {
    return (
      <div className="container text-center">
        <h2>No vehicle details found</h2>
        <p>Please go back and enter your vehicle registration number</p>
        <Link to="/car-insurance">
          <Button type="primary ">Back to Vehicle Entry</Button>
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
          <h1 className="text-center mb-4" style={{fontStyle:"oblique"}}>Hello {vehicle?.owner} Your Premuin Details</h1>
          
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
                <p><strong>Model:</strong> {vehicle?.maker_model}</p>
                <p><strong>Year:</strong> {purchaseYear} ({vehicleAge} years old)</p>
                <p><strong>Owner:</strong> {vehicle.owner}</p>
                <p><strong>Engine Capacity:</strong> {vehicle.cubic_capacity} cc</p>
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
                
                <div className="mt-4">
                  <p className="mb-1"><strong>Adjust IDV:</strong> ({idvAdjustment}%)</p>
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
                    value={idvAdjustment}
                  />
                  <p className="text-muted small mt-2">You can adjust the IDV within ±10% of the calculated value.</p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card 
                title="Final  Premium" 
                className="premium-card"
                bordered={false}
                hoverable
              >
                <h2 className="premium-value">₹ {premium.toLocaleString()}</h2>
                <p className="text-muted">Annual premium including GST</p>
                <div className="ncb-info mt-2 mb-3">
                  <Tag color="green">NCB: {ncbPercentage}%</Tag>
                  <span className="ms-2 text-muted">Savings: ₹ {ncbDiscount.toLocaleString()}</span>
                </div>
                <Link to='/formpage'>
                <Button type="primary" size="large" block>
                  Proceed to Payment
                </Button>
                </Link>
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
                <div className="premium-info mt-3">
                  <p><small><strong>Note:</strong> Third-party premium is as per latest IRDAI tariff rates.</small></p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card title="Add-on Covers" bordered={false}>
                <p>Enhance your coverage with these add-ons:</p>
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
            <Link to="/formpage">
            <Button type="primary" className="ms-3">
              Proceed to Payment
            </Button>
            </Link>
          </div>
        </div>
      </div>

  );


    </>
  );
};

export default UserData;