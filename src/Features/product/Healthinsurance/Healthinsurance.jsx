import React, { useState, useEffect } from "react";
import { 
  Input, 
  Select, 
  Button, 
  Card, 
  Checkbox, 
  Row, 
  Col, 
  message, 
  Steps, 
  Tag,
  Divider,
  Typography
} from "antd";
import { 
  UserOutlined, 
  PhoneOutlined, 
  HomeOutlined, 
  ManOutlined, 
  WomanOutlined, 
  TeamOutlined,
  HeartOutlined,
  AlertOutlined,
  CreditCardOutlined,
  CalculatorOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;
const { Step } = Steps;

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
  500000: [0.9, 1.0, 1.1, 1.2, 1.3, 1.45, 1.65, 1.95, 2.25], // Reduced for family floater
  750000: [0.85, 0.95, 1.05, 1.15, 1.3, 1.45, 1.65, 1.7, 2.1], // Reduced for family floater
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

// Get age band index
const getAgeIndex = (age) => {
  return ageGroups.findIndex((group) => age >= group.min && age < group.max);
};

const Healthinsurance = () => {
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
    sumInsured: null,
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
  
  // Removed the problematic line: setFormData("")
  console.log(formData);

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
    setCurrentStep(1);
  };

  const proceedToPayment = () => {
    message.success("Proceeding to payment gateway...");
    // Here you would normally redirect to payment gateway
    // For demo purposes we just show a message
  };

  const sumOptions = getAvailableSumInsuredOptions();

  const renderPersonalInfoCard = () => (
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

  const renderSelfInfoCard = () => (
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
  );

  const renderFamilyMembersCard = () => (
    <Card 
      title={<><TeamOutlined /> Family Members</>} 
      style={{ marginTop: 16 }}
      bordered={true}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            style={{ textAlign: 'center' }}
            className={formData.includeWife ? 'family-selected' : ''}
            onClick={() => handleChange("includeWife", !formData.includeWife)}
          >
            <WomanOutlined style={{ fontSize: 24 }} />
            <div>Wife</div>
            <Checkbox checked={formData.includeWife}>Include</Checkbox>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            style={{ textAlign: 'center' }}
            className={formData.includeChildren ? 'family-selected' : ''}
            onClick={() => handleChange("includeChildren", !formData.includeChildren)}
          >
            <TeamOutlined style={{ fontSize: 24 }} />
            <div>Children</div>
            <Checkbox checked={formData.includeChildren}>Include</Checkbox>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            style={{ textAlign: 'center' }}
            className={formData.includeFather ? 'family-selected' : ''}
            onClick={() => handleChange("includeFather", !formData.includeFather)}
          >
            <ManOutlined style={{ fontSize: 24 }} />
            <div>Father</div>
            <Checkbox checked={formData.includeFather}>Include</Checkbox>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            style={{ textAlign: 'center' }}
            className={formData.includeMother ? 'family-selected' : ''}
            onClick={() => handleChange("includeMother", !formData.includeMother)}
          >
            <WomanOutlined style={{ fontSize: 24 }} />
            <div>Mother</div>
            <Checkbox checked={formData.includeMother}>Include</Checkbox>
          </Card>
        </Col>
      </Row>

      {/* Conditional inputs for family members */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {formData.includeWife && (
          <Col xs={24} sm={12} md={6}>
            <Input 
              prefix={<WomanOutlined />} 
              type="number" 
              placeholder="Wife's Age" 
              value={formData.wifeAge || ""} 
              onChange={(e) => handleChange("wifeAge", parseInt(e.target.value))} 
            />
          </Col>
        )}
        {formData.includeChildren && (
          <>
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
          </>
        )}
        {formData.includeFather && (
          <Col xs={24} sm={12} md={6}>
            <Input 
              prefix={<ManOutlined />} 
              type="number" 
              placeholder="Father's Age" 
              value={formData.fatherAge || ""} 
              onChange={(e) => handleChange("fatherAge", parseInt(e.target.value))} 
            />
          </Col>
        )}
        {formData.includeMother && (
          <Col xs={24} sm={12} md={6}>
            <Input 
              prefix={<WomanOutlined />} 
              type="number" 
              placeholder="Mother's Age" 
              value={formData.motherAge || ""} 
              onChange={(e) => handleChange("motherAge", parseInt(e.target.value))} 
            />
          </Col>
        )}
      </Row>
    </Card>
  );

  const renderHealthInfoCard = () => (
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
              {sumOptions.map((amount) => (
                <Option key={amount} value={amount}>
                  ₹{amount.toLocaleString()}
                </Option>
              ))}
            </Select>
          </Card>
        </Col>
      </Row>
    </Card>
  );

  const renderResultsPage = () => (
    <div>
      <Card title={<Title level={4}><CalculatorOutlined /> Premium Calculation Summary</Title>} bordered={true}>
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
              {formData.includeWife && <p><strong>Wife Age:</strong> {formData.wifeAge}</p>}
              {formData.includeChildren && formData.sonAge && <p><strong>Son Age:</strong> {formData.sonAge}</p>}
              {formData.includeChildren && formData.daughterAge && <p><strong>Daughter Age:</strong> {formData.daughterAge}</p>}
              {formData.includeFather && <p><strong>Father Age:</strong> {formData.fatherAge}</p>}
              {formData.includeMother && <p><strong>Mother Age:</strong> {formData.motherAge}</p>}
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Coverage Information" bordered={false}>
              <p><strong>Sum Insured:</strong> ₹{formData.sumInsured?.toLocaleString()}</p>
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
              
              {formData.includeWife && (
                <div className="premium-item">
                  <Text>Wife Premium (30% off)</Text>
                  <Text strong>₹{result.wifePremium.toFixed(2)}</Text>
                </div>
              )}
              
              {formData.includeChildren && formData.sonAge && (
                <div className="premium-item">
                  <Text>Son Premium (40% off)</Text>
                  <Text strong>₹{result.sonPremium.toFixed(2)}</Text>
                </div>
              )}
              
              {formData.includeChildren && formData.daughterAge && (
                <div className="premium-item">
                  <Text>Daughter Premium (40% off)</Text>
                  <Text strong>₹{result.daughterPremium.toFixed(2)}</Text>
                </div>
              )}
              
              {formData.includeFather && (
                <div className="premium-item">
                  <Text>Father Premium (15% off)</Text>
                  <Text strong>₹{result.fatherPremium.toFixed(2)}</Text>
                </div>
              )}
              
              {formData.includeMother && (
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
            onClick={() => setCurrentStep(0)} 
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

  const renderInputForm = () => (
    <div>
      <Steps current={0} size="small" style={{ marginBottom: 20 }}>
        <Step title="Information" />
        <Step title="Review" />
        <Step title="Payment" />
      </Steps>
      
      {renderPersonalInfoCard()}
      {renderSelfInfoCard()}
      {renderFamilyMembersCard()}
      {renderHealthInfoCard()}
      
      <div style={{ marginTop: 20, textAlign: "center" }}>
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

  return (
    <div className="health-insurance-container" style={{ padding: 16, maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        <HeartOutlined /> Health Insurance Premium Calculator
      </Title>
      
      {currentStep === 0 ? renderInputForm() : renderResultsPage()}
      
      <style jsx global>{`
        .health-insurance-container .ant-card {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
        }
        
        .family-selected {
          border-color: #1890ff;
          background-color: #e6f7ff;
        }
        
        .premium-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 8px 0;
          border-bottom: 1px dashed #f0f0f0;
        }
        
        .premium-item.total {
          border-bottom: none;
          padding-top: 16px;
        }
        
        @media (max-width: 576px) {
          .ant-card-head-title {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Healthinsurance;