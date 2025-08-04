import React, { useState, useEffect } from "react";
// import React, { useState } from "react";

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
  message,
  Modal,
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
  CreditCardOutlined,
} from "@ant-design/icons";
import "./Healthinsurance.css";
import myself from "../../../assets/health-images/myself.png";
import family from "../../../assets/health-images/family.png";
import Reusechoose from "../../../Reuse/Reusechoose/Reusechoose";

// images import

import img1 from "../../../assets/health-images/cost.png";
import img2 from "../../../assets/health-images/critical.png";
import img3 from "../../../assets/health-images/open-mind.png";
import img4 from "../../../assets/health-images/financial-report.png";
import img5 from "../../../assets/health-images/care.png";
import img6 from "../../../assets/health-images/waiting.png";
import Renewpolicy from "../../../Reuse/Renewpolicy/Renewpolicy";
import DepreciationCalculated from "../../../Reuse/DepreciationCalculated/DepreciationCalculated";
// import img7 from "../../../assets/health-images/cost.png"
import { FaArrowAltCircleRight } from "react-icons/fa";
import DocumentSection from "../../../Reuse/DocumentSection/DocumentSection";
import NeedHelp from "../../../Reuse/NeedHelp/NeedHelp";
// import { Modal, Button } from "react-bootstrap";
// import { Modal } from "antd";

const { Option } = Select;
const { Title, Text } = Typography;
const { Step } = Steps;

const Healthinsurance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShow = (item) => {
    setSelectedItem(item);
    console.log("this is selected item>>>>>>", item);
    setIsModalOpen(true);
  };

  // const handleShow = (item) => {
  //   const normalizedItem = {
  //     ...item,
  //     requirement: item.requirement || item.REQUIREMENT
  //   };
  //   setSelectedItem(normalizedItem);
  //   setIsModalOpen(true);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const coverageplane = [
    {
      title: "5 Lacs",
      description: "Health Insurance Plan",
    },
    {
      title: "7.5 Lacs",
      description: "Health Insurance Plan",
    },
    {
      title: "10 Lacs",
      description: "Health Insurance Plan",
    },
    {
      title: "13 Lacs",
      description: "Health Insurance Plan",
    },
    {
      title: "15 Lacs",
      description: "Health Insurance Plan",
    },
    {
      title: "20 Lacs",
      description: "Health Insurance Plan",
    },
  ];

  const documentclaim = [
    {
      title: "Hospitalisation Documents",
      REQUIREMENT: [
        "Original hospital bills & payment receipts",
        "Detailed discharge summary",
        "All diagnosis reports (lab tests, imaging, etc.)",
        "Doctor’s consultation & prescription copies",
        "Pharmacy and medicine bills",
      ],
    },
    {
      title: "Cashless Documents",
      REQUIREMENT: [
        "Duly filled & signed claim form (Available at the hospital or on Global Health website/app)",
        "Diagnosis report for confirming the need for hospitalisation",
        "Health E-card",
      ],
    },
    {
      title: "KYC Documents",
      REQUIREMENT: [
        "Aadhaar Card (Identity & address proof)",
        "PAN Card (Financial verification)",
        "Photograph",
        "Bank Details (Passbook or cancelled cheque)",
      ],
    },
  ];

  const documentfeatures = [
    {
      title: "Identity Proof",
      requirement: [
        " Aadhaar Card",
        " PAN Card",
        " Passport",
        " Voter ID",
        " Driving License",
      ],
    },
    {
      title: "Age Proof (Any One)",
      requirement: [
        " Birth Certificate",
        " Aadhaar Card",
        " Passport",
        " School Leaving Certificate",
      ],
    },
    {
      title: "Income Proof",
      requirement: [" Salary Slips", " Income Tax Returns (ITR)", " Form 16"],
    },
    {
      title: "Previous Medical Reports (If any)",
      requirement: [
        " Pre-policy medical check-up (for higher coverage or older age applicants)",
      ],
    },
  ];

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
    { label: "Thyroid", value: "thyroid" },
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
      setFormData((prev) => ({
        ...prev,
        includeWife: true,
        includeChildren: true,
        includeFather: true,
        includeMother: true,
      }));
    }

    setSelectionStage("details");
  };

  // Get age band index
  const getAgeIndex = (age) => {
    return ageGroups.findIndex((group) => age >= group.min && age < group.max);
  };

  const getAvailableSumInsuredOptions = () => {
    const hasFamily =
      formData.includeWife ||
      formData.includeChildren ||
      formData.includeFather ||
      formData.includeMother;
    return hasFamily
      ? [300000, 500000, 750000, 1000000]
      : [300000, 400000, 500000, 750000, 1000000, 1250000, 1500000];
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
      if (
        !formData.username ||
        !formData.mobile ||
        !formData.city ||
        !formData.selfAge
      ) {
        message.error("Please fill all required fields");
        return;
      }
    } else if (selectedType === "family") {
      if (
        !formData.username ||
        !formData.mobile ||
        !formData.city ||
        !formData.selfAge
      ) {
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
        daughterPremium = calculateIndividualPremium(
          daughterAge,
          sumInsured,
          40
        ); // 40% discount for daughter
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

    const basePremium =
      selfPremium +
      wifePremium +
      sonPremium +
      daughterPremium +
      fatherPremium +
      motherPremium;

    const alcoholLoad = alcoholic
      ? (riskLoading.alcoholic[ageIndex] / 100) * selfPremium
      : 0;

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
        We are more than just your health insurance provider. We are by your
        side regardless of your situation.
      </Title>

      <Text className="text-center mb-6 d-block">
        To start, choose yourself or your loved ones or our special health
        covers that suits your needs.
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
      <Card
        title={
          <>
            <UserOutlined /> Personal Information
          </>
        }
        bordered={true}
      >
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
        title={
          <>
            <ManOutlined /> Self Information
          </>
        }
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
              onChange={(e) =>
                handleChange("selfAge", parseInt(e.target.value))
              }
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
        title={
          <>
            <HeartOutlined /> Health Information
          </>
        }
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
        title={
          <>
            <ManOutlined /> Self Information
          </>
        }
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
              onChange={(e) =>
                handleChange("selfAge", parseInt(e.target.value))
              }
            />
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <>
            <TeamOutlined /> Family Members
          </>
        }
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
              onChange={(e) =>
                handleChange("wifeAge", parseInt(e.target.value))
              }
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
              onChange={(e) =>
                handleChange("daughterAge", parseInt(e.target.value))
              }
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
              onChange={(e) =>
                handleChange("fatherAge", parseInt(e.target.value))
              }
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              prefix={<WomanOutlined />}
              type="number"
              placeholder="Mother's Age"
              value={formData.motherAge || ""}
              onChange={(e) =>
                handleChange("motherAge", parseInt(e.target.value))
              }
            />
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <>
            <HeartOutlined /> Coverage Information
          </>
        }
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
        if (specializedType === "young-adult")
          title = "Young Adult Health Insurance";
        else if (specializedType === "girl-child")
          title = "Girl Child Only Health Insurance";
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
          <Button style={{ marginRight: 16 }} onClick={resetForm}>
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
        title={
          <Title level={4}>
            <CalculatorOutlined /> Premium Calculation Summary
          </Title>
        }
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
              <p>
                <UserOutlined /> {formData.username}
              </p>
              <p>
                <PhoneOutlined /> {formData.mobile}
              </p>
              <p>
                <HomeOutlined /> {formData.city}
              </p>
              <Divider />
              <p>
                <strong>Self Age:</strong> {formData.selfAge}
              </p>
              {formData.wifeAge && (
                <p>
                  <strong>Wife Age:</strong> {formData.wifeAge}
                </p>
              )}
              {formData.sonAge && (
                <p>
                  <strong>Son Age:</strong> {formData.sonAge}
                </p>
              )}
              {formData.daughterAge && (
                <p>
                  <strong>Daughter Age:</strong> {formData.daughterAge}
                </p>
              )}
              {formData.fatherAge && (
                <p>
                  <strong>Father Age:</strong> {formData.fatherAge}
                </p>
              )}
              {formData.motherAge && (
                <p>
                  <strong>Mother Age:</strong> {formData.motherAge}
                </p>
              )}
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Coverage Information" bordered={false}>
              <p>
                <strong>Sum Insured:</strong> ₹
                {formData.sumInsured?.toLocaleString()}
              </p>
              {selectedType === "individual" && (
                <>
                  <p>
                    <strong>Alcoholic:</strong>{" "}
                    {formData.alcoholic ? "Yes" : "No"}
                  </p>
                  {formData.illnesses.length > 0 && (
                    <div>
                      <strong>Pre-existing Conditions:</strong>
                      <div style={{ marginTop: 8 }}>
                        {formData.illnesses.map((illness) => (
                          <Tag color="red" key={illness}>
                            {
                              illnessOptions.find(
                                (opt) => opt.value === illness
                              )?.label
                            }
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
                  <Text strong type="danger">
                    ₹{result.alcoholLoad.toFixed(2)}
                  </Text>
                </div>
              )}
              {formData.illnesses.length > 0 && (
                <div className="premium-item">
                  <Text>Illness Risk Loading</Text>
                  <Text strong type="danger">
                    ₹{result.illnessLoad.toFixed(2)}
                  </Text>
                </div>
              )}
              <div className="premium-item">
                <Text>GST (18%)</Text>
                <Text strong>₹{result.gst.toFixed(2)}</Text>
              </div>

              <Divider />

              <div className="premium-item total">
                <Title level={4}>Total Premium</Title>
                <Title level={3} type="success">
                  ₹{result.total.toFixed(2)}
                </Title>
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
    <>
      <div className="health-insurance-container">
        {selectionStage === "initial" && renderInitialScreen()}
        {selectionStage === "details" && renderDetailsScreen()}
        {selectionStage === "results" && renderResultsPage()}
      </div>
      <div className="health-insurance">
        <div className="container">
          <div className="row">
            <div className="col-12 p-3 d-flex justify-content-center">
              <h1 className="text-center">What is Health Insurance</h1>
            </div>
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
              <p>
                Health insurance, also known as medical insurance, is a type of
                general insurance that offers financial protection during
                medical emergencies or health-related issues, whether caused by
                illness, disease, or accident.
              </p>
              <p>
                It helps cover a wide range of medical expenses such as pre- and
                post-hospitalization costs, annual health check-ups, critical
                illness coverage, maternity care, and even mental health
                support, depending on the specifics of your chosen plan.
              </p>
              <p>
                Think of health insurance as a reliable companion — someone who
                stands by you in tough times, whether you’re seriously unwell or
                simply need a little care.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Reusechoose
        heading="Why Should You Get Health Insurance?"
        subheading="Here's why more and more people are opting for Health Insurance in India:"
        features={[
          {
            image: img1,
            title: "Save More with Tax Benefits",
            description:
              "Looking to lower your tax burden? Under Section 80D of the Income Tax Act, you can claim deductions on premiums paid for health insurance — whether it's for you or your parents!",
          },
          {
            image: img2,
            title: "Protection Against Serious Illnesses",
            description:
              "Younger people under 40 are increasingly being diagnosed with life-threatening conditions like cancer and heart disease. Health insurance provides a safety net if such unfortunate events occur.",
          },
          {
            image: img3,
            title: "Experience Peace of Mind",
            description:
              "There’s a certain comfort in knowing you’re financially covered in medical emergencies. Health insurance offers that reassurance so you can focus on recovery, not costs.",
          },
          {
            image: img4,
            title: "Maintain Financial Stability",
            description:
              "Health insurance is a smart financial choice. It not only covers unexpected medical costs but also offers benefits like no-claim bonuses, ensuring long-term gains.",
          },
          {
            image: img5,
            title: "Manage High Medical Costs",
            description:
              "With most households relying on expensive private hospitals, health insurance helps manage treatment costs that would otherwise strain your budget.",
          },
          {
            image: img6,
            title: "Get Timely Medical Care",
            description:
              "Delaying treatment due to financial constraints can be dangerous. Health insurance removes that barrier by ensuring you get the care you need, exactly when you need it.",
          },
        ]}
      />
      <Renewpolicy
        heading="Important Health Insurance Statistics in India 2025"
        steps={[
          {
            title: "1",
            description:
              "India has the highest medical inflation rate in Asia at 14%, surpassing China (12%), Indonesia (10%), Vietnam (10%), and the Philippines (9%). (1)",
          },
          {
            title: "2",
            description:
              "In the Union Budget 2023-24, the Ministry of Health and Family Welfare received an allocation of INR 89,155 crore, marking a 3.43% increase from INR 86,200.65 crore in 2021-22. (2)",
          },
          {
            title: "3",
            description:
              "In 2021, approximately 514 million people in India were covered under health insurance schemes, which represents only 37% of the population. (3)",
          },
          {
            title: "4",
            description:
              "Rajasthan has the highest proportion of households covered under health insurance or financing schemes (88%), followed by Andhra Pradesh (80%). The lowest coverage (less than 15%) is found in the Andaman & Nicobar Islands and Jammu & Kashmir. (4)",
          },
          {
            title: "5",
            description:
              "As per the Consumer Pyramids Household Survey (CPHS) report by Centre for Monitoring Indian Economy (CMIE), Indian households spent over INR 120 billion on healthcare and medical related services in FY 2022. (5)",
          },
        ]}
      />
      <DepreciationCalculated
        heading="How Global Health Insurance is Ultimate solution of your need:-"
        tablehead="Benefit"
        tablehead1="Global Health Insurance"
        tableData={[
          {
            duration: "Buying Process",
            discount:
              "On your finger tip and quick online process with less documentation",
          },
          {
            duration: "Claim Settlement",
            discount: "High claim settlement ratio with quick processing",
          },
          {
            duration: "Co-Payment",
            discount: "Get treated anywhere in India",
          },
          {
            duration: "Sum Insured Refilling",
            discount:
              "Get your sum insured refilled on full exhaustion of it during the policy period at no extra cost",
          },
          {
            duration: "Worldwide Coverage",
            discount: "Offers worldwide coverage for emergency treatments",
          },
          {
            duration: "Cumulative Bonus",
            discount: "Offers up to 60% cumulative bonus for claim-free years",
          },
          {
            duration: "Wellness Benefits",
            discount:
              "Avail a range of discounts and benefits on health and fitness services from 20+ top-rated health and wellness partners.",
          },
          {
            duration: "Cashless Network Hospitals",
            discount: "Extensive network of cashless hospitals across India",
          },
        ]}
      />

      <DepreciationCalculated
        heading="Key Benefits of Health Insurance by Global Health"
        para="Your health insurance plan with Global Health extends several exclusive benefits that enhance your coverage. Here are the key advantages:"
        tablehead="Benefit"
        tablehead1="Description"
        tableData={[
          {
            duration: "Room Rent Capping",
            discount: "Yes",
          },
          {
            duration: "Inbuilt Personal Accident Cover ",
            discount: "YES",
          },
          {
            duration: "City Based Discount",
            discount: "Up to 10% Discount",
          },
          {
            duration: "Worldwide Coverage",
            discount: "Yes*",
          },
          {
            duration: "Wellness Benefits",
            discount:
              "Avail a range of discounts and benefits on health and fitness services from 20+ top-rated health and wellness partners.",
          },
          {
            duration: "Consumables Cover",
            discount: "Available as an Add-on",
          },
        ]}
      />

      <DocumentSection
        sectionTitle="Documents Required to Buy a Health Insurance Online"
        sectionDescription="When purchasing a health insurance policy, insurers typically
              require some basic documents for verification. Below is a list of
              optional documents that can be needed at the time of purchasing a
              policy:"
        data={documentfeatures}
      />
      <DocumentSection
        sectionTitle="Documents Required to File a Health Insurance Claim"
        sectionDescription=" When filing a health insurance claim, you need to submit certain documents to ensure a smooth and hassle-free process. Remember, not all of these documents may be necessary but your insurance provider may require them. Below is a list of essential documents required while filing a health insurance claim at Global Health:"
        data={documentclaim}
      />
      

      <div className="coverage-section">
        <div className="container">
          <div className="row">
            <div className="col-12 justify-content-center text-center d-flex p-4">
              <h1>Choose Health Insurance Coverage of Your Choice</h1>
            </div>
          </div>
          <div className="row">
            {coverageplane.map((plan, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div
                  className="card shadow-md p-4 text-center"
                  style={{ backgroundColor: "whitesmoke" }}
                >
                  <h3>{plan.title}</h3>
                  <p>{plan.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NeedHelp
              heading="Need Help?"
              paragraph="Have queries related to Global Health motor insurance policy? You can refer to our Policy Wordings for detailed information or reach out to our support team via WhatsApp self-support, email or phone using the information below:"
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
    </>
  );
};

export default Healthinsurance;
