import React, { useState, useEffect } from "react";
import { 
  Card, 
  Input, 
  Button, 
  Select, 
  Row, 
  Col, 
  Checkbox, 
  Steps, 
  Typography, 
  Divider, 
  Tag, 
  message 
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  ManOutlined,
  WomanOutlined,
  TeamOutlined,
  HeartOutlined,
  CalculatorOutlined,
  CreditCardOutlined
} from "@ant-design/icons";
import "./Healthinsurance.css";
import myself from '../../../assets/health-images/myself.png'
import family from '../../../assets/health-images/family.png'


const { Option } = Select;
const { Title, Text } = Typography;
const { Step } = Steps;

const Healthinsurance = () => {
  // Age bands
  const ageGroups = [
    { min: 15, max: 20 },
    { min: 20, max: 25 },
    { min: 25, max: 30 },
    { min: 30, max: 35 },
    { min: 35, max: 40 },
    { min: 40, max: 45 },
    { min: 45, max: 50 },
    { min: 50, max: 55 },
    { min: 55, max: 60 },
  ];
  
  // Base rate table (updated for family floater)
  const baseRateTable = {
    300000: [0.95, 1.05, 1.15, 1.25, 1.4, 1.6, 1.85, 2.3, 2.75],
    400000: [1.0, 1.1, 1.2, 1.35, 1.55, 1.8, 2.05, 2.35, 2.75],
    500000: [0.9, 1.0, 1.1, 1.2, 1.3, 1.45, 1.65, 1.95, 2.25],
    750000: [0.85, 0.95, 1.05, 1.15, 1.3, 1.45, 1.65, 1.7, 2.1],
    1000000: [0.8, 0.9, 1.0, 1.15, 1.35, 1.5, 1.85, 1.9, 2.55],
    1250000: [0.75, 0.85, 0.95, 1.05, 1.2, 1.4, 1.6, 1.85, 2.2],
    1500000: [0.7, 0.8, 0.9, 1.0, 1.2, 1.4, 1.6, 1.85, 2.15],
  };
  
  // Risk loading percentages
  const riskLoading = {
    alcoholic: [5, 7, 10, 12, 15, 18, 20, 25],
    illness: [10, 12, 15, 18, 22, 25, 30, 35],
  };
  
  // Illness options
  const illnessOptions = [
    { label: "Diabetes", value: "diabetes" },
    { label: "Hypertension", value: "hypertension" },
    { label: "Heart Disease", value: "heart" },
    { label: "Asthma", value: "asthma" },
    { label: "Thyroid", value: "thyroid" }
  ];
  
  // States
  const [selectionStage, setSelectionStage] = useState("initial"); // initial, details, results
  const [selectedType, setSelectedType] = useState(null); // individual, family, specialized
  const [specializedType, setSpecializedType] = useState(null); // young-adult, girl-child, cancer
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    city: "",
    selfAge: null,
    wifeAge: null,
    sonAge: null,
    daughterAge: null,
    fatherAge: null,
    motherAge: null,
    sumInsured: 500000,
    alcoholic: false,
    illnesses: [],
    includeWife: false,
    includeChildren: false,
    includeFather: false,
    includeMother: false,
  });
  const [result, setResult] = useState(null);

  // Load from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem("healthInsuranceData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [key]: value };
      // Save to localStorage
      localStorage.setItem("healthInsuranceData", JSON.stringify(newData));
      return newData;
    });
  };

  const handlePolicySelection = (type, specialized = null) => {
    // Clear all fields
    setFormData({
      username: "",
      mobile: "",
      city: "",
      selfAge: null,
      wifeAge: null,
      sonAge: null,
      daughterAge: null,
      fatherAge: null,
      motherAge: null,
      sumInsured: 500000,
      alcoholic: false,
      illnesses: [],
      includeWife: false,
      includeChildren: false,
      includeFather: false,
      includeMother: false,
    });
    
    setSelectedType(type);
    if (specialized) {
      setSpecializedType(specialized);
    }
    
    // Update form data based on selection
    if (type === "family") {
      setFormData(prev => ({
        ...prev,
        includeWife: true,
        includeChildren: true,
        includeFather: true,
        includeMother: true
      }));
    }
    
    setSelectionStage("details");
  };

  // Get age band index
  const getAgeIndex = (age) => {
    return ageGroups.findIndex((group) => age >= group.min && age < group.max);
  };

  const getAvailableSumInsuredOptions = () => {
    const hasFamily = formData.includeWife || formData.includeChildren || formData.includeFather || formData.includeMother;
    return hasFamily ? [300000, 500000, 750000, 1000000] : [300000, 400000, 500000, 750000, 1000000, 1250000, 1500000];
  };

  const calculateIndividualPremium = (age, sumInsured, discountPercent = 0) => {
    const ageIndex = getAgeIndex(age);
    if (ageIndex === -1) return 0;
    const rate = baseRateTable[sumInsured][ageIndex] / 100;
    return sumInsured * rate * (1 - discountPercent / 100);
  };

  const calculatePremium = () => {
    // Validate required fields based on selection type
    if (selectedType === "individual") {
      if (!formData.username || !formData.mobile || !formData.city || !formData.selfAge) {
        message.error("Please fill all required fields");
        return;
      }
    } else if (selectedType === "family") {
      if (!formData.username || !formData.mobile || !formData.city || !formData.selfAge) {
        message.error("Please fill all required fields");
        return;
      }
    }

    const {
      selfAge,
      wifeAge,
      sonAge,
      daughterAge,
      fatherAge,
      motherAge,
      sumInsured,
      alcoholic,
      illnesses,
      includeWife,
      includeChildren,
      includeFather,
      includeMother,
    } = formData;

    const validOptions = getAvailableSumInsuredOptions();
    if (!validOptions.includes(sumInsured)) {
      message.error("Selected sum insured is not valid for family floater.");
      return;
    }

    const ageIndex = getAgeIndex(selfAge);
    if (ageIndex === -1) {
      message.error("Please enter a valid age between 20 and 60");
      return;
    }

    const selfPremium = calculateIndividualPremium(selfAge, sumInsured);

    let wifePremium = 0;
    if (includeWife && wifeAge) {
      wifePremium = calculateIndividualPremium(wifeAge, sumInsured, 30); // 30% discount for wife
    }

    let sonPremium = 0;
    let daughterPremium = 0;
    if (includeChildren) {
      if (sonAge) {
        sonPremium = calculateIndividualPremium(sonAge, sumInsured, 40); // 40% discount for son
      }
      if (daughterAge) {
        daughterPremium = calculateIndividualPremium(daughterAge, sumInsured, 40); // 40% discount for daughter
      }
    }

    let fatherPremium = 0;
    let motherPremium = 0;
    if (includeFather && fatherAge) {
      fatherPremium = calculateIndividualPremium(fatherAge, sumInsured, 15);
    }
    if (includeMother && motherAge) {
      motherPremium = calculateIndividualPremium(motherAge, sumInsured, 15);
    }

    const basePremium = selfPremium + wifePremium + sonPremium + daughterPremium + fatherPremium + motherPremium;

    const alcoholLoad = alcoholic ? (riskLoading.alcoholic[ageIndex] / 100) * selfPremium : 0;
    
    // Calculate illness loading based on number of illnesses
    let illnessLoad = 0;
    if (illnesses.length > 0) {
      const baseIllnessLoad = riskLoading.illness[ageIndex] / 100;
      // Additional 5% per illness after the first one
      illnessLoad = baseIllnessLoad * selfPremium;
      if (illnesses.length > 1) {
        illnessLoad += (illnesses.length - 1) * 0.05 * selfPremium;
      }
    }

    const totalBeforeGST = basePremium + alcoholLoad + illnessLoad;
    const gst = totalBeforeGST * 0.18;
    const total = totalBeforeGST + gst;

    setResult({
      selfPremium,
      wifePremium,
      sonPremium,
      daughterPremium,
      fatherPremium,
      motherPremium,
      alcoholLoad,
      illnessLoad,
      basePremium: totalBeforeGST - alcoholLoad - illnessLoad,
      totalBeforeGST,
      gst,
      total,
    });

    // Move to results page
    setSelectionStage("results");
  };

  const resetForm = () => {
    setSelectionStage("initial");
    setSelectedType(null);
    setSpecializedType(null);
    setResult(null);
    
    // Clear all form data
    setFormData({
      username: "",
      mobile: "",
      city: "",
      selfAge: null,
      wifeAge: null,
      sonAge: null,
      daughterAge: null,
      fatherAge: null,
      motherAge: null,
      sumInsured: 500000,
      alcoholic: false,
      illnesses: [],
      includeWife: false,
      includeChildren: false,
      includeFather: false,
      includeMother: false,
    });
    
    // Clear localStorage
    localStorage.removeItem("healthInsuranceData");
  };

  const proceedToPayment = () => {
    message.success("Proceeding to payment gateway...");
    // Here you would normally redirect to payment gateway
  };

  // Initial Selection Screen
  const renderInitialScreen = () => (
    <div className="insurance-container">
      <Title level={4} className="text-center mb-4">
        We are more than just your health insurance provider. We are by your side regardless of your situation.
      </Title>
      
      <Text className="text-center mb-6 d-block">
        To start, choose yourself or your loved ones or our special health covers that suits your needs.
      </Text>

      <Row gutter={[24, 24]} justify="center" className="selection-options">
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable
            className="selection-card text-center"
            onClick={() => handlePolicySelection("individual")}
          >
            <div className="selection-image">
              <img src={myself} alt="Individual" className="img-fluid" />
            </div>
            <Title level={5}>For Myself</Title>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable
            className="selection-card text-center"
            onClick={() => handlePolicySelection("family")}
          >
            <div className="selection-image">
              <img src={family} alt="Family" className="img-fluid" />
            </div>
            <Title level={5}>For Myself & Family</Title>
          </Card>
        </Col>
      </Row>
    </div>
  );

  // Form components for details screen
  const renderPersonalInfoCard = () => {
    // Only show for both individual and family
    return (
      <Card title={<><UserOutlined /> Personal Information</>} bordered={true}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8}>
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Full Name" 
              value={formData.username} 
              onChange={(e) => handleChange("username", e.target.value)} 
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Mobile Number" 
              value={formData.mobile} 
              onChange={(e) => handleChange("mobile", e.target.value)} 
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Input 
              prefix={<HomeOutlined />} 
              placeholder="City" 
              value={formData.city} 
              onChange={(e) => handleChange("city", e.target.value)} 
            />
          </Col>
        </Row>
      </Card>
    );
  };

  const renderIndividualFormDetails = () => (
    <>
      <Card 
        title={<><ManOutlined /> Self Information</>} 
        style={{ marginTop: 16 }}
        bordered={true}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Input 
              prefix={<CalculatorOutlined />} 
              type="number" 
              placeholder="Your Age" 
              value={formData.selfAge || ""} 
              onChange={(e) => handleChange("selfAge", parseInt(e.target.value))} 
            />
          </Col>
          <Col xs={24} sm={12}>
            <Select
              placeholder="Are you alcoholic?"
              style={{ width: "100%" }}
              value={formData.alcoholic ? "yes" : "no"}
              onChange={(value) => handleChange("alcoholic", value === "yes")}
            >
              <Option value="no">No</Option>
              <Option value="yes">Yes</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      <Card 
        title={<><HeartOutlined /> Health Information</>} 
        style={{ marginTop: 16 }}
        bordered={true}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Pre-existing Illnesses">
              <Select
                mode="multiple"
                placeholder="Select any pre-existing conditions"
                style={{ width: "100%" }}
                value={formData.illnesses}
                onChange={(values) => handleChange("illnesses", values)}
                options={illnessOptions}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Coverage Amount">
              <Select
                placeholder="Select Sum Insured"
                style={{ width: "100%" }}
                value={formData.sumInsured}
                onChange={(value) => handleChange("sumInsured", value)}
              >
                {getAvailableSumInsuredOptions().map((amount) => (
                  <Option key={amount} value={amount}>
                    ₹{amount.toLocaleString()}
                  </Option>
                ))}
              </Select>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
  
  const renderFamilyFormDetails = () => (
    <>
      <Card 
        title={<><ManOutlined /> Self Information</>} 
        style={{ marginTop: 16 }}
        bordered={true}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Input 
              prefix={<CalculatorOutlined />} 
              type="number" 
              placeholder="Your Age" 
              value={formData.selfAge || ""} 
              onChange={(e) => handleChange("selfAge", parseInt(e.target.value))} 
            />
          </Col>
        </Row>
      </Card>
      
      <Card 
        title={<><TeamOutlined /> Family Members</>} 
        style={{ marginTop: 16 }}
        bordered={true}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Input 
              prefix={<WomanOutlined />} 
              type="number" 
              placeholder="Wife's Age" 
              value={formData.wifeAge || ""} 
              onChange={(e) => handleChange("wifeAge", parseInt(e.target.value))} 
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input 
              prefix={<TeamOutlined />} 
              type="number" 
              placeholder="Son's Age" 
              value={formData.sonAge || ""} 
              onChange={(e) => handleChange("sonAge", parseInt(e.target.value))} 
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input 
              prefix={<TeamOutlined />} 
              type="number" 
              placeholder="Daughter's Age" 
              value={formData.daughterAge || ""} 
              onChange={(e) => handleChange("daughterAge", parseInt(e.target.value))} 
            />
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={12} md={6}>
            <Input 
              prefix={<ManOutlined />} 
              type="number" 
              placeholder="Father's Age" 
              value={formData.fatherAge || ""} 
              onChange={(e) => handleChange("fatherAge", parseInt(e.target.value))} 
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input 
              prefix={<WomanOutlined />} 
              type="number" 
              placeholder="Mother's Age" 
              value={formData.motherAge || ""} 
              onChange={(e) => handleChange("motherAge", parseInt(e.target.value))} 
            />
          </Col>
        </Row>
      </Card>
      
      <Card 
        title={<><HeartOutlined /> Coverage Information</>} 
        style={{ marginTop: 16 }}
        bordered={true}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card title="Coverage Amount">
              <Select
                placeholder="Select Sum Insured"
                style={{ width: "100%" }}
                value={formData.sumInsured}
                onChange={(value) => handleChange("sumInsured", value)}
              >
                {getAvailableSumInsuredOptions().map((amount) => (
                  <Option key={amount} value={amount}>
                    ₹{amount.toLocaleString()}
                  </Option>
                ))}
              </Select>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );

  // Details Form Screen
  const renderDetailsScreen = () => {
    let title;
    switch (selectedType) {
      case "individual":
        title = "Individual Health Insurance";
        break;
      case "family":
        title = "Family Health Insurance";
        break;
      case "specialized":
        if (specializedType === "young-adult") title = "Young Adult Health Insurance";
        else if (specializedType === "girl-child") title = "Girl Child Only Health Insurance";
        else if (specializedType === "cancer") title = "Cancer Guard Insurance";
        break;
      default:
        title = "Health Insurance";
    }
  
    return (
      <div>
        <Title level={3}>{title}</Title>
        <Steps current={0} size="small" style={{ marginBottom: 20 }}>
          <Step title="Information" />
          <Step title="Review" />
          <Step title="Payment" />
        </Steps>
        
        {renderPersonalInfoCard()}
        
        {/* Conditionally render form based on selection */}
        {selectedType === "individual" && renderIndividualFormDetails()}
        {selectedType === "family" && renderFamilyFormDetails()}
        {selectedType === "specialized" && renderIndividualFormDetails()}
        
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button 
            style={{ marginRight: 16 }}
            onClick={resetForm}
          >
            Back
          </Button>
          
          <Button 
            type="primary" 
            icon={<CalculatorOutlined />} 
            size="large"
            onClick={calculatePremium}
          >
            Calculate Premium
          </Button>
        </div>
      </div>
    );
  };

  // Results Screen
  const renderResultsPage = () => (
    <div>
      <Card
        title={<Title level={4}><CalculatorOutlined /> Premium Calculation Summary</Title>}
        bordered
      >
        <Steps current={1} size="small" style={{ marginBottom: 20 }}>
          <Step title="Information" />
          <Step title="Review" />
          <Step title="Payment" />
        </Steps>
  
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Insured Details" bordered={false}>
              <p><UserOutlined /> {formData.username}</p>
              <p><PhoneOutlined /> {formData.mobile}</p>
              <p><HomeOutlined /> {formData.city}</p>
              <Divider />
              <p><strong>Self Age:</strong> {formData.selfAge}</p>
              {formData.wifeAge && <p><strong>Wife Age:</strong> {formData.wifeAge}</p>}
              {formData.sonAge && <p><strong>Son Age:</strong> {formData.sonAge}</p>}
              {formData.daughterAge && <p><strong>Daughter Age:</strong> {formData.daughterAge}</p>}
              {formData.fatherAge && <p><strong>Father Age:</strong> {formData.fatherAge}</p>}
              {formData.motherAge && <p><strong>Mother Age:</strong> {formData.motherAge}</p>}
            </Card>
          </Col>
  
          <Col xs={24} md={12}>
            <Card title="Coverage Information" bordered={false}>
              <p><strong>Sum Insured:</strong> ₹{formData.sumInsured?.toLocaleString()}</p>
              {selectedType === "individual" && (
                <>
                  <p><strong>Alcoholic:</strong> {formData.alcoholic ? "Yes" : "No"}</p>
                  {formData.illnesses.length > 0 && (
                    <div>
                      <strong>Pre-existing Conditions:</strong>
                      <div style={{ marginTop: 8 }}>
                        {formData.illnesses.map(illness => (
                          <Tag color="red" key={illness}>
                            {illnessOptions.find(opt => opt.value === illness)?.label}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </Card>
          </Col>
        </Row>
  
        <Divider />
  
        <Card title="Premium Breakdown" style={{ marginTop: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div className="premium-item">
                <Text>Self Premium</Text>
                <Text strong>₹{result.selfPremium.toFixed(2)}</Text>
              </div>
              {formData.wifeAge && (
                <div className="premium-item">
                  <Text>Wife Premium (30% off)</Text>
                  <Text strong>₹{result.wifePremium.toFixed(2)}</Text>
                </div>
              )}
              {formData.sonAge && (
                <div className="premium-item">
                  <Text>Son Premium (40% off)</Text>
                  <Text strong>₹{result.sonPremium.toFixed(2)}</Text>
                </div>
              )}
              {formData.daughterAge && (
                <div className="premium-item">
                  <Text>Daughter Premium (40% off)</Text>
                  <Text strong>₹{result.daughterPremium.toFixed(2)}</Text>
                </div>
              )}
              {formData.fatherAge && (
                <div className="premium-item">
                  <Text>Father Premium (15% off)</Text>
                  <Text strong>₹{result.fatherPremium.toFixed(2)}</Text>
                </div>
              )}
              {formData.motherAge && (
                <div className="premium-item">
                  <Text>Mother Premium (15% off)</Text>
                  <Text strong>₹{result.motherPremium.toFixed(2)}</Text>
                </div>
              )}
            </Col>
  
            <Col xs={24} md={12}>
              {formData.alcoholic && (
                <div className="premium-item">
                  <Text>Alcohol Risk Loading</Text>
                  <Text strong type="danger">₹{result.alcoholLoad.toFixed(2)}</Text>
                </div>
              )}
              {formData.illnesses.length > 0 && (
                <div className="premium-item">
                  <Text>Illness Risk Loading</Text>
                  <Text strong type="danger">₹{result.illnessLoad.toFixed(2)}</Text>
                </div>
              )}
              <div className="premium-item">
                <Text>GST (18%)</Text>
                <Text strong>₹{result.gst.toFixed(2)}</Text>
              </div>
  
              <Divider />
  
              <div className="premium-item total">
                <Title level={4}>Total Premium</Title>
                <Title level={3} type="success">₹{result.total.toFixed(2)}</Title>
              </div>
            </Col>
          </Row>
        </Card>
  
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button
            type="default"
            onClick={() => setSelectionStage("details")}
            style={{ marginRight: 16 }}
          >
            Edit Information
          </Button>
          <Button
            type="primary"
            icon={<CreditCardOutlined />}
            size="large"
            onClick={proceedToPayment}
          >
            Proceed to Payment
          </Button>
        </div>
      </Card>
    </div>
  );

  // Main render based on stage
  return (
    <div className="health-insurance-container">
      {selectionStage === "initial" && renderInitialScreen()}
      {selectionStage === "details" && renderDetailsScreen()}
      {selectionStage === "results" && renderResultsPage()}
    </div>
  );
};

export default Healthinsurance;