import React, { useState } from "react";
import { Card, Row, Col, Input, Button, message } from "antd";
import { CarOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./CarInsurance.css";
import own1 from "../../../assets/own1.png";
import drunk2 from "../../../assets/drunk2.png";
import driving3 from "../../../assets/driving3.png";
import consequential4 from "../../../assets/consequential4.png";
import contributory5 from "../../../assets/contributory5.png";
import car from "../../../assets/car.png";
import theft from "../../../assets/theft.png";
import fire from "../../../assets/fire.png";
import dia from "../../../assets/dia.png";
import acci from "../../../assets/acci.png";
import third from "../../../assets/third.png";
import add6 from "../../../assets/add6.png";

// reuseable component require
import Reusechoose from "../../../Reuse/Reusechoose/Reusechoose";
import Renewpolicy from "../../../Reuse/Renewpolicy/Renewpolicy";
import RequireDocument from "../../../Reuse/RequireDocuments/RequireDocument";
import Insuranceclaim from "../../../Reuse/Insuranceclaim/Insuranceclaim";
import Downloadpolycy from "../../../Reuse/Downloadpolycy/Downloadpolycy";

import repair from "../../../assets/carimages/repair.png";
import document from "../../../assets/carimages/document.png";
import second from "../../../assets/reuseimage/gear.png";
import support from "../../../assets/reuseimage/24-hours-support.png";
import customization from "../../../assets/carimages/customization.png";
import CarPremiumRate from "../../../Reuse/CarPremiumRate/CarPremiumRate";
import ElectricCarRate from "../../../Reuse/ElecrtricCarRate/ElecrtricCarRate";
import DepreciationCalculated from "../../../Reuse/DepreciationCalculated/DepreciationCalculated";
import NeedHelp from "../../../Reuse/NeedHelp/NeedHelp";
import { handleError } from "../../../errortoast";

const Carinsurance = () => {
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgApi, contextHolder] = message.useMessage();

  // Static data for UI components
  const downloadpolicydata = {
    heading: "How to Download Your Car Insurance Policy on Global Health App?",
    description:
      "To download your renewed or already active car insurance policy with Global Health, follow the given steps:",
    list: [
      "on the Global Health app, go to the 'My Policies' tab at the bottom of the screen. You will see all your policies currently active with Global Health.",
      "Now select the car insurance policy for which you want to download the document. Verify all the details and click on 'Download Policy'. Your car insurance policy document will be downloaded.",
    ],
  };

  const claimStepsData = {
    heading: "How to File a Car Insurance Claim?",
    Paragraph: "After you buy or renew our car insurance plan, you live tension free as we have a 3-step, completely digital claims process!",
    steps: [
      {
        id: 1,
        title: "Step 1",
        description: "Just call on 1800-258-5956. No forms to be filled.",
      },
      {
        id: 2,
        title: "Step 2",
        description:
          "Get a link for Self-Inspection on your registered mobile number. Shoot your vehicle's damages from your smartphone through a guided step-by-step process.",
      },
      {
        id: 3,
        title: "Step 3",
        description:
          "Choose the mode of repair you wish to opt for i.e. Reimbursement or Cashless through our network of garages.",
      },
    ],
  };

  const documentdata = {
    heading: "Documents Required to Buy Car Insurance Online",
    description:
      "While buying a new car insurance policy online from Global Health, you don't need a load of documents or paperwork. By having the following documents handy, you can easily buy a new car insurance policy within minutes:",
    list: [
      "Car Registration Certificate",
      "Previous year car insurance policy, if applicable",
      "Any of these documents for KYC verification - PAN/Aadhar/DL/Voter ID/Form 16/Passport",
    ],
  };

  const digitStepsData = {
    heading: "How to Buy or Renew Car Insurance with Global Health",
    steps: [
      {
        id: 1,
        title: "Step 1",
        description:
          "Go to the Global Health app or website, enter your car's registration number and mobile number, and click 'Check Prices'.",
      },
      {
        id: 2,
        title: "Step 2",
        description:
          "Choose your insurance plan, select add-ons, and set the right IDV. Then click 'Next'.",
      },
      {
        id: 3,
        title: "Step 3",
        description:
          "Enter your personal details, nominee info, and vehicle information. Click 'Pay Now'.",
      },
      {
        id: 4,
        title: "Step 4",
        description:
          "Complete the payment and finish the required KYC process.",
      },
      {
        id: 5,
        title: "Step 5",
        description:
          "You're done! The policy will be sent via email, SMS, and WhatsApp, and is available on the Digit app 24x7.",
      },
    ],
  };

  const carFeatures = [
    {
      id: 1,
      image: repair,
      title: "Cashless Repairs",
      description:
        "Access 9000+ cashless garages across India for a smooth, worry-free repair experience.",
    },
    {
      id: 2,
      image: document,
      title: "DIY Claim Inspection",
      description:
        "Use your smartphone to capture the damage – no lengthy surveys or inspections required.",
    },
    {
      id: 3,
      image: second,
      title: "Lightning-Fast Claims",
      description:
        "We've settled 96% of car insurance claims – experience a process that's quick and hassle-free.",
    },
    {
      id: 4,
      image: support,
      title: "24x7 Customer Care",
      description:
        "Have a query or need help? Our team is available around the clock, even on national holidays.",
    },
    {
      id: 5,
      image: customization,
      title: "Set Your Own Vehicle IDV",
      description:
        "With Digit, you have the freedom to decide your car's IDV based on your needs.",
    },
  ];

  const features2 = [
    {
      id: 1,
      title: "Own Damages for Third-Party Policy Holder",
      img: own1,
      text: "In the case of a Third-Party or Liability Only Car Policy, damages to own vehicle won't be covered.",
    },
    {
      id: 2,
      title: "Drunk Driving or without a Licence",
      img: drunk2,
      text: "You were driving drunk or without a valid driving licence.",
    },
    {
      id: 3,
      title: "Driving without a Valid Driving Licence Holder",
      img: driving3,
      text: "You hold a learner's licence and were driving without a valid driving licence-holder in the front passenger seat.",
    },
    {
      id: 4,
      title: "Consequential Damages",
      img: consequential4,
      text: "Any damage which is not a direct result of the accident (e.g. after an accident, if the damaged car is driven incorrectly and the engine gets damaged, it will not be covered)",
    },
    {
      id: 5,
      title: "Contributory Negligence",
      img: contributory5,
      text: "Any contributory negligence (e.g., damage due to driving a car in a flood, which is not recommended as per the manufacturer's driving manual, will not be covered)",
    },
    {
      id: 6,
      title: "Add-Ons Not Bought",
      img: add6,
      text: "Some situations are covered in add-ons. If you haven't bought those add-ons, the corresponding situations will not be covered.",
    },
  ];

  const features = [
    {
      id: 1,
      title: "Accidents",
      img: car,
      text: "Damages and losses that may arise out of accidents and collisions",
    },
    {
      id: 2,
      title: "Theft",
      img: theft,
      text: "Covers for the losses incurred when your car is unfortunately stolen",
    },
    {
      id: 3,
      title: "Fire",
      img: fire,
      text: "Damages and losses caused to your car due to an accidental fire",
    },
    {
      id: 4,
      title: "Natural Disasters",
      img: dia,
      text: "Damages and losses to your car in case of natural calamities such as floods, cyclones, etc.",
    },
    {
      id: 5,
      title: "Personal Accident",
      img: acci,
      text: "If there is a car accident and unfortunately, it leads to death or disability of the owner",
    },
    {
      id: 6,
      title: "Third-Party Losses",
      img: third,
      text: "In cases where your car causes damages and losses to someone else, their car or property.",
    },
  ];

  /**
   * Fetch vehicle data from Surepass API
   * @param {string} regNum - Vehicle registration number
   * @returns {Object|null} - Vehicle data or null if not found
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Data validation and normalization
    const regNum = registrationNumber.trim().toUpperCase();
    const mobile = mobileNumber.trim();
  
    // Form validation
    if (!regNum) {
      msgApi.error("Please enter a registration number.");
      return;
    }
    
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      msgApi.error("Enter a valid 10-digit mobile number.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Variables to store our vehicle data and price
      let vehicleData = null;
      let exShowroomPrice = "1000"; // Default price if not found
  
      // STEP 1: Try to get data from PostgreSQL database first
      try {
        console.log("🔍 Checking database for vehicle: " + regNum);
        const dbUrl = `${import.meta.env.VITE_LOCALHOST_GET_CAR_API}?registration_number=${regNum}`;
        console.log("Database URL:", dbUrl);
        
        const dbRes = await fetch(dbUrl);
        const dbResult = await dbRes.json();
        console.log("Database response:>>>>>>", dbResult);
        if (dbResult?.cubic_capacity>700) {
          handleError("This is car  number or something else In Our  ....")
          navigate('/carinsurance')
        }else if(dbResult?.cubic_capacity<700){
          handleError("This is bike number go to bike page")
          navigate('/Bikeinsurance')
        }
        // Check if we got data back as an array or single object
        if (dbRes.ok && dbResult) {
          console.log("✅ Vehicle found in database!");
          
          // Handle if response is an array (choose first matching record)
          if (Array.isArray(dbResult)) {
            // Find the matching registration or take the first item
            const matchingVehicle = dbResult.find(
              vehicle => vehicle.registration_number?.toUpperCase() === regNum
            ) || dbResult[0];
            
            if (matchingVehicle) {
              vehicleData = matchingVehicle;
            } else {
              throw new Error("NOT_IN_DB");
            }
          } else {
            // If response is a single object
            vehicleData = dbResult;
          }
          
          // Safely get ex-showroom price
          exShowroomPrice = vehicleData?.exshowroom?.toString() || vehicleData?.sale_amount || "1000";
          console.log("💰 Ex-showroom price from database: " + exShowroomPrice);
        } else {
          console.log("❓ Vehicle not found in database.");
          throw new Error("NOT_IN_DB");
        }
       
      } 
      catch (dbError) {
        console.log("Database error or not found:", dbError.message);
        
        // STEP 2: If not in database, fetch from Surepass API
        if (dbError.message === "NOT_IN_DB") {
          console.log("🔄 Fetching from Surepass API...");
          
          // Get main vehicle data from Surepass
          vehicleData = await fetchVehicleFromSurepass(regNum);
          
          if (vehicleData) {
            // Get ex-showroom price separately if needed
            const priceFromAPI = await fetchExShowroomPrice(regNum);
            if (priceFromAPI) {
              exShowroomPrice = priceFromAPI;
              vehicleData.exshowroom = priceFromAPI;
              console.log("💰 Ex-showroom price from Surepass: " + exShowroomPrice);
            }
            
            // Save to PostgreSQL database with mobile number
            await saveVehicleToDatabase(regNum, mobile, vehicleData);
          } else {
            // If Surepass also fails, create minimal data
            vehicleData = { registration_number: regNum };
            console.log("⚠️ Could not retrieve detailed vehicle information");
            msgApi.warning("Limited vehicle data available. Some fields may be missing.");
            
            // Still save the minimal data with mobile number
            await saveVehicleToDatabase(regNum, mobile, vehicleData);
          }
        } else {
          // If it's another error, we need to re-throw it
          throw dbError;
        }
      }
  
      // STEP 3: Prepare data for display
      console.log("📋 Preparing vehicle summary for display>>>>>>>>>>>>", vehicleData);
      
      // Create a consistent summary object for the UI
      const summary = {
        vehicle_no: vehicleData?.registration_number || regNum,
        registration_date: vehicleData?.registration_date || "Not Available",
        owner: vehicleData?.owner_name || "Not Available", 
        fuel_type: vehicleData?.fuel_type || "Not Available",
        color: vehicleData?.color || "Not Available",
        insurance_company: vehicleData?.insurance_company || "Not Available",
        address: vehicleData?.address || vehicleData?.permanent_address|| "Not Available",
        date_of_buy: vehicleData?.purchase_date || vehicleData?.registration_date || "Not Available",
        maker_model: vehicleData?.maker_model || "Not Available",
        cubic_capacity: vehicleData?.engine_capacity?.toString()  || vehicleData?.cubic_capacity || "Not Available",
        ex_showroom_price: vehicleData?.exshowroom?.toString() || exShowroomPrice,
        engine_number:vehicleData?.vehicle_engine_number || vehicleData?.engine_number|| "N/A",
        chasi_number:vehicleData?.vehicle_chasi_number || vehicleData?.chasi_number || "N/A",
        register_at:vehicleData?.registered_at || "N/A",
        financer:vehicleData?.financer || "N/A",
        mobile_number: mobile, // Add mobile number to summary,
       
      };
  
      console.log("✨ Vehicle summary ready:>>>>>>>", summary);
      
      // Clear any existing data before setting new data
      localStorage.removeItem("vehicleDetails");
      
      // Store data in localStorage for UI display
      localStorage.setItem("vehicleDetails", JSON.stringify(summary));
      
      console.log("Data stored in localStorage, now navigating to /user");
      msgApi.success("Vehicle details fetched successfully!");
      
      // Navigate to user page after a short delay
      setTimeout(() => {
        navigate("/user");
      });
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error("❌ Error fetching vehicle data:", error);
      msgApi.error(error.message || "Error fetching vehicle data. Please try again.");
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  /**
   * Fetch vehicle data from Surepass API
   * @param {string} regNum - Vehicle registration number
   * @returns {Object|null} - Vehicle data or null if not found
   */
  const fetchVehicleFromSurepass = async (regNum) => {
    try {
      console.log("📞 Calling Surepass API for vehicle data");
      const surepassRes = await fetch(import.meta.env.VITE_SUREPASS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_SUREPASS_TOKEN,
        },
        body: JSON.stringify({ id_number: regNum }),
      });
    
      const surepassData = await surepassRes.json();
      if (surepassData?.cubic_capacity>700) {
        handleError("This is car  number or something else In Our  ....")
        navigate('/carinsurance')
      }else if(surepassData?.cubic_capacity<700){
        handleError("This is bike number go to bike page")
        navigate('/Bikeinsurance')
      }
      
      if (!surepassData.success) {
        console.error("❌ Surepass API returned error:", surepassData);
        return null;
      }
      
      console.log("✅ Successfully got vehicle data from Surepass>>>>>>>>>>>",surepassData);
      return surepassData.data;
    } catch (error) {
      console.error("❌ Error calling Surepass API:", error);
      return null;
    }
  };

  /**
   * Fetch ex-showroom price from Surepass API
   * @param {string} regNum - Vehicle registration number
   * @returns {string|null} - Price as string or null if not found
   */
  const fetchExShowroomPrice = async (regNum) => {
    try {
      console.log("📞 Calling Surepass API for ex-showroom price");
      const showroomRes = await fetch(import.meta.env.VITE_SUREPASS_EX_SHOWROOM_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_SUREPASS_EX_SHOWROOM_TOKEN,
        },
        body: JSON.stringify({ id_number: regNum }),
      });
    
      const showroomData = await showroomRes.json();
      
      if (!showroomData.success || !showroomData?.data?.sale_amount) {
        console.log("⚠️ No ex-showroom price found in Surepass");
        return null;
      }
      
      console.log("✅ Successfully got ex-showroom price from Surepass");
      return showroomData.data.sale_amount;
    } catch (error) {
      console.error("❌ Error fetching ex-showroom price:", error);
      return null;
    }
  };

  /**
   * Save vehicle data to PostgreSQL database
   * @param {string} regNum - Vehicle registration number
   * @param {string} mobile - User's mobile number
   * @param {Object} vehicleData - Complete vehicle data to save
   * @returns {Promise<boolean>} - Success status
   */
  const saveVehicleToDatabase = async (regNum, mobile, vehicleData) => {
    try {
      console.log("💾 Saving vehicle data to database");
      
      // Extract and map the fields needed for the backend API
      const payload = {
        // Map fields from vehicleData to match database column names
        owner_name: vehicleData?.owner_name || null,
        address: vehicleData?.permanent_address || vehicleData?.permanent_address || null,
        registration_number: regNum,
        color: vehicleData?.color || null,
        insurance_company: vehicleData?.insurance_company || null,
        // Use registration_date as fallback for purchase_date if it doesn't exist
        purchase_date: vehicleData?.purchase_date || null,
        maker_model: vehicleData?.maker_model || null,
        // Convert exshowroom to a number if it's a string
        exshowroom: vehicleData?.exshowroom || vehicleData?.sale_amount || 1000,
        engine_capacity: vehicleData?.cubic_capacity || null,
        registration_date: vehicleData?.registration_date || null,
        // If client_id starts with "rc_" or is non-numeric, use null instead
        id: vehicleData?.client_id && !isNaN(parseInt(vehicleData?.client_id)) 
            ? parseInt(vehicleData?.client_id) 
            : null,
        fuel_type: vehicleData?.fuel_type || null,
        engine_number:vehicleData?.vehicle_engine_number || "N/A",
        chasi_number:vehicleData?.vehicle_chasi_number || "N/A",
        register_at:vehicleData?.registered_at || "N/A",
        financer:vehicleData?.financer || "N/A",
        mobile_number: mobile // Use the input mobile number directly
      };
      
      console.log("Payload being sent to database:>>>>>>>>>>", payload);
      
      const saveRes = await fetch(import.meta.env.VITE_LOCALHOST_CAR_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      // Check if response indicates success
      if (!saveRes.ok) {
        // Handle error response
        let errorMessage;
        try {
          // Try to parse error as JSON first
          const errorData = await saveRes.json();
          errorMessage = errorData.error || "Failed to save vehicle data";
        } catch (jsonError) {
          // If not JSON, get as text
          errorMessage = await saveRes.text();
        }
        
        console.error("⚠️ Failed to save to database:", saveRes.status, errorMessage);
        msgApi.warning("Vehicle data retrieved but failed to save to database.");
        return false;
      }
      
      // Try to parse the successful response
      try {
        const saveResult = await saveRes.json();
        console.log("✅ Database save response:", saveResult);
        msgApi.success("Vehicle data successfully saved to database");
        return true;
      } catch (parseError) {
        // Handle case where response isn't JSON
        const textResponse = await saveRes.text();
        console.log("✅ Database save response (text):", textResponse);
        msgApi.success("Vehicle data saved to database");
        return true;
      }
    } catch (saveError) {
      // Handle general errors in the save process
      console.error("❌ Error saving to database:", saveError);
      msgApi.warning("Vehicle data retrieved but could not be saved to database.");
      return false;
    }
  };

  return (
    <>
      {contextHolder}
      <div className="car-insurance-container py-5">
        <div className="container">
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={12}>
              <Card className="registration-card shadow-lg" bordered={false}>
                <h2 className="text-center mb-4">Vehicle Registration</h2>
                <form onSubmit={handleSubmit}>
                
                  <label>Vehicle Registration Number</label>
                  <Input
                    placeholder="E.g. KA04DK8337"
                    size="large"
                    prefix={<CarOutlined />}
                    value={registrationNumber}
                    onChange={(e) =>
                      setRegistrationNumber(e.target.value.toUpperCase())
                    }
                    className="mb-3"
                  />

                  <label>Mobile Number</label>
                  <Input
                    placeholder="Enter 10-digit mobile number"
                    size="large"
                    prefix={<PhoneOutlined />}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength={10}
                    className="mb-3"
                  />

                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    block
                  >
                    {loading ? "Fetching Vehicle Data..." : "Get Vehicle Details"}
                  </Button>
                </form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <div className="car-section-info">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>What is Car Insurance?</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center px-2">
              <p>
                Car Insurance, also known as auto or motor insurance, is a type
                of vehicle insurance policy that protects you and your car from
                any risks and damages caused by accidents, thefts, or natural
                disasters.
              </p>
              <p>
                In addition to that, it protects you from third-party
                liabilities, ensuring financial security in case of any
                unforeseen circumstances.
              </p>
              <p>
                Whether you want to legally comply with the law with basic
                third-party insurance or opt for comprehensive protection, you
                can customize your IDV and add-ons to suit your needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="what-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-8">
              <h1 className="fw-bold">What's Covered in Car Insurance?</h1>
            </div>
          </div>
          <div className="row">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
              >
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="img-fluid mb-3"
                  />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="what-not-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-8">
              <h1 className="fw-bold">What's Not Covered?</h1>
              <p>
                It is equally important to know what's not covered in your car
                insurance policy to avoid surprises when you make a claim.
              </p>
            </div>
          </div>
          <div className="row">
            {features2.map((feature) => (
              <div
                key={feature.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
              >
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="img-fluid mb-3"
                  />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Reusechoose
        heading="Why Should You Buy Global Health Car Insurance?"
        subheading="We treat our customers like VIPs, know how…"
        features={carFeatures}
      />
      <Renewpolicy
        heading={digitStepsData.heading}
        steps={digitStepsData.steps}
      />
      <RequireDocument
        heading={documentdata.heading}
        description={documentdata.description}
        list={documentdata.list}
      />
      <Insuranceclaim
        heading={claimStepsData.heading}
        paragraphs={claimStepsData.Paragraph}
        steps={claimStepsData.steps}
      />
      <Downloadpolycy
        heading={downloadpolicydata.heading}
        description={downloadpolicydata.description}
        list={downloadpolicydata.list}
      />
     
      <CarPremiumRate
        heading="Third Party Car Insurance Premium Rates"
        para="A Third-Party Car Insurance Premium Calculator depends on your car's engine cc and even the respective premium rates are predetermined by the IRDAI, which are as follows:"
        tablehead="Private cars with Engine Capacity"
        tablehead1="The premium for 2019-20 in INR"
        tablehead2="New 4W TP rate (effective 1st June 2022)"
        tableData={[
          {
            capacity: "Not Exceeding 1000 cc",
            oldPremium: "₹2,072",
            newPremium: "₹2,094",
          },
          {
            capacity: "Exceeding 1000 cc but not exceeding 1500 cc",
            oldPremium: "₹3,221",
            newPremium: "₹3,416",
          },
          {
            capacity: "Exceeding 1500 cc",
            oldPremium: "₹7,890",
            newPremium: "₹7,897",
          },
        ]}
      />

      <ElectricCarRate
        heading="Electric Car Insurance Premium Rates"
        para={[
          "Here are car insurance premium prices for private electric cars, which are based on factors like kilowatt capacity, make, model, and age.",
          "Note: Long term policy means 3-year policy for new private cars (Source IRDAI). The premium numbers mentioned here may vary as per vehicle, please check the premium before you buy the policy.",
        ]}
        tablehead="Vehicle kilowatt capacity (KW)"
        tablehead1="Premium rate for one-year third-party policy"
        tablehead2="Premium rate for long-term policy*"
        tableData={[
          {
            capacity: "Not exceeding 30 KW",
            oldPremium: "₹1,780",
            newPremium: "₹5,543",
          },
          {
            capacity: "Exceeding 30KW but not exceeding 65KW",
            oldPremium: "₹2,904",
            newPremium: "₹9,044",
          },
          {
            capacity: "Exceeding 65KW",
            oldPremium: "₹6,712",
            newPremium: " ₹20,907",
          },
        ]}
      />

      <DepreciationCalculated
        heading="How is Depreciation Calculated in Car Insurance?"
        para={[
          "Insured Declared Value (IDV) is the market value of the car. This IDV is adjusted for depreciation value of your car as per the below table.",
          "This age-wise depreciation is applicable for only Total Loss/Constructive Total Loss (TL/CTL) claims.",
        ]}
        tablehead="Vehicle Age"
        tablehead1="Depreciation Rate"
        tableData={[
          {
            duration: "Not Exceeding 6 months",
            discount: "5%",
          },
          {
            duration: "Exceeding 6 months but not exceeding 1 year",
            discount: "15%",
          },
          {
            duration: "Exceeding 1 year but not exceeding 2 years",
            discount: "20%",
          },
          {
            duration: "Exceeding 2 years but not exceeding 3 years",
            discount: "30%",
          },
          {
            duration: "Exceeding 3 years but not exceeding 4 years",
            discount: "40%",
          },
          {
            duration: "Exceeding 4 years but not exceeding 5 years",
            discount: "50%",
          },
        ]}
      />

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
    </>
  );
};

export default Carinsurance;