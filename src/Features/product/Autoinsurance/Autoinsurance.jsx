import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  message
} from "antd";
import { CarOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Autoinsurance.css";
import Reusechoose from "../../../Reuse/Reusechoose/Reusechoose";
// import first from "../../assets/reuseimage/vehicless.png"
import first from "../../../assets/reuseimage/vehicless.png"
import second from "../../../assets/reuseimage/gear.png"
import third from "../../../assets/reuseimage/24-hours-support.png"

import data1 from "../../../assets/autoaccident/auto-accident (1).png"
import data2 from "../../../assets/autoaccident/car-alarm.png"
import data3 from "../../../assets/autoaccident/fire.png"
import data4 from "../../../assets/autoaccident/landslide.png"
import data5 from "../../../assets/autoaccident/person.png"
import data6 from "../../../assets/autoaccident/businessman.png"
import data7 from "../../../assets/autoaccident/taxi.png"
import DepreciationCalculated from "../../../Reuse/DepreciationCalculated/DepreciationCalculated";

import Renewpolicy from "../../../Reuse/Renewpolicy/Renewpolicy";
import Insuranceclaim from "../../../Reuse/Insuranceclaim/Insuranceclaim"
import RequiredDocuments from "../../../Reuse/RequireDocuments/RequireDocument";
import NeedHelp from "../../../Reuse/NeedHelp/NeedHelp";


const features = [
  {
    id: 1,
    image: first, // ✅ Replace with your actual image URL
    title: "Set Your Own Vehicle IDV",
    description:
      "We let you define your vehicle’s IDV based on your preference and need!",
  },
  {
    id: 2,
    image: second, // ✅ Replace with your actual image URL
    title: "Round-the-Clock Customer Support",
    description:
      "Available 24/7, even on public holidays – we’re always here to help you out.",
  },
  {
    id: 3,
    image: third, // ✅ Replace with your actual image URL
    title: "Quick & Easy Claim Process",
    description:
      "Use your smartphone to complete self-inspection in just a few minutes!",
  },
];

const autoCard = [
  {
    id: 1,
    image: data1,
    title: "Accidents",
    description: "Damages caused to your auto rickshaw in case of an accident.",
  },
  {
    id: 2,
    image: data2,
    title: "Theft",
    description: "Loss or damage of your auto rickshaw due to theft.",
  },
  {
    id: 3,
    image: data3,
    title: "Fire",
    description: "Damages caused to your auto rickshaw due to a fire.",
  },
  {
    id: 4,
    image: data4,
    title: "Natural Disasters",
    description: "Damages caused to your auto rickshaw due to any natural calamity.",
  },
  {
    id: 5,
    image: data5,
    title: "Personal Accident",
    description: "If your auto rickshaw meets with an accident, leading to an injury or death of you or the driver using it.",
  },
  {
    id: 6,
    image: data6,
    title: "Third Party Losses",
    description: "Any damages caused by your auto rickshaw to a third party or its passengers.",
  },
  {
    id: 7,
    image: data7,
    title: "Towing Disabled Vehicles",
    description: "Any damages caused to your auto rickshaw in cases where it's being towed.",
},
];



const Autoinsurance = () => {
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgApi, contextHolder] = message.useMessage();

  /**
   * Handles form submission and implements the data fetching logic
   * @param {Event} e - Form submit event
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
      let exShowroomPrice = "14000"; // Default price if not found
  
      // STEP 1: Try to get data from PostgreSQL database first
      try {
        console.log("🔍 Checking database for vehicle: " + regNum);
        const dbUrl = `${import.meta.env.VITE_LOCALHOST_AUTO_GET_API}?registration_number=${regNum}`;
        console.log("Database URL:", dbUrl);
        
        const dbRes = await fetch(dbUrl);
        const dbResult = await dbRes.json();
        console.log("Database response:>>>>>>", dbResult);
        
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
          exShowroomPrice = vehicleData?.exshowroom?.toString() || vehicleData?.sale_amount || "14000";
          console.log("💰 Ex-showroom price from database: " + exShowroomPrice);
        } else {
          console.log("❓ Vehicle not found in database.");
          throw new Error("NOT_IN_DB");
        }
      } catch (dbError) {
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
      console.log("📋 Preparing vehicle summary for display", vehicleData);
      
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
         cubic_capacity: parseFloat(vehicleData?.engine_capacity || vehicleData?.cubic_capacity) || "Not Available",
          ex_showroom_price: parseInt(vehicleData?.exshowroom || exShowroomPrice),

      }
      console.log("✨ Vehicle summary ready:", summary);
      
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
      
      if (!surepassData.success) {
        console.error("❌ Surepass API returned error:", surepassData);
        return null;
      }
      
      console.log("✅ Successfully got vehicle data from Surepass");
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
        exshowroom: vehicleData?.exshowroom || vehicleData?.sale_amount || 14000,
        engine_capacity: vehicleData?.cubic_capacity || null,
        registration_date: vehicleData?.registration_date || null,
        // If client_id starts with "rc_" or is non-numeric, use null instead
        id: vehicleData?.client_id && !isNaN(parseInt(vehicleData?.client_id)) 
            ? parseInt(vehicleData?.client_id) 
            : null,
        fuel_type: vehicleData?.fuel_type || null,
        mobile_number: mobile // Use the input mobile number directly
      };
      
      console.log("Payload being sent to database:", payload);
      
      const saveRes = await fetch(import.meta.env.VITE_LOCALHOST_AUTO_API, {
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
                <h2 className="text-center mb-4">Auto Vehicle Registration</h2>
                <form onSubmit={handleSubmit}>
                
                  <label>Vehicle Registration Number</label>
                  <Input
                    placeholder="E.g. KA04DK8337"
                    size="large"
                    prefix={<CarOutlined />}
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                    className="mb-3"
                  />
              
                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">
                    Enter Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="E.g. 8429966832"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  View Plans
                </button>
              </form>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="auto-info py-5">
        <div className="container">
          <div className="row align-item-center">
            <div className="col-lg-12 col-md-6 col-sm-12 text-center">
              <h1 className="head1 d-flex align-content-f-start">
                Get the Best Deals on 3-Wheeler Insurance – Renew Online
              </h1>
            </div>
            <div className="col-lg-12 col-md-sm-12r">
              <p className="para1">
                Auto rickshaws, also known as three-wheelers, play a vital role
                in India's public transport system and are widely used across
                the country. However, their high usage also leads to a greater
                risk of accidents. That’s why having a reliable auto rickshaw
                insurance policy is essential for protection.{" "}
              </p>
              <p className="para1">
              So, here’s a 2025 guide for three-wheeler auto insurance to help you buy/renew the best auto rickshaw insurance policy in India.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="info-section">
        <h2>What is Auto Rickshaw Insurance?</h2>
        <p>
          An auto rickshaw insurance is a type of commercial vehicle insurance policy 
          designed to protect and suit the needs of a three-wheelers in India.
        </p>
        <p>
          It’s mandatory for all auto rickshaw owners to at least have a third-party 
          auto rickshaw insurance to financially protect them from third-party liabilities. 
          However, you can buy a comprehensive auto rickshaw policy for enhanced coverage.
        </p>
        <p>
          Digit Insurance provides auto owners with both such policies at, affordable 
          and customized premium prices.
        </p>
      </div>

      <div className="info-section">
        <h2>Is Having Auto Rickshaw Insurance Mandatory?</h2>
        <p>
          Yes, according to the Motor Vehicles Act in India, it is compulsory for all 
          vehicles to have at least a Liability Only Policy in place. Without this, it 
          would be illegal to ride an auto rickshaw in India.
        </p>
        <p>
          However, if you’re using your auto rickshaw as a primary source of income or, 
          as part of a business, then it is advised to have the Standard Package Policy, 
          as that not only covers the damages caused to third parties by your auto 
          rickshaw but, also covers for damages caused to your own vehicle and the 
          owner-driver against damages caused due to accidents, collisions, natural 
          calamities, fires and other such mishaps.
        </p>
      </div>
      <Reusechoose
        heading="Why Should You Buy Global Health & Allied Insurance Service Auto Insurance"
        subheading="We treat our customers like VIPs, know how…"
        features={features}
      />

      <div className="what-cover-section py-5">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-12">
            <h1 className="fw-bold">Why Should You Get Auto Insurance?</h1>
          </div>
        </div>

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
             
        </div>
      </div>
    </div>

    <DepreciationCalculated 
    heading="Key Features of e-Rickshaw Insurance by Global Health"
    tablehead="Key Features	"
    tablehead1="Global Benefit"
    tableData={[
      {
        duration : "Premium",
        discount : "Starting from ₹1339",
      },
      {
        duration : "Claim Process",
        discount : "Paperless Claims "
      },
      {
        duration: "Customer Support",
        discount : "24x7 Support",
      },
      {
        duration : "Additional Coverage",
        discount: "PA Covers, Legal Liability Cover, Special Exclusions and Compulsory Deductibles, etc.",
      },
      {
        duration: "Damages to Third-Party",
        discount: "Unlimited Liability for Personal Damages, Up to 7.5 Lakhs for Property/Vehicle Damages "
      }
    ]}
    />

    <DepreciationCalculated 
    heading="Third Party Premiums for E-Rickshaws"
    para="Here is the e-rickshaw insurance price list for third party plans in India. These prices are fixed by the IRDAI in 2024 for electric three-wheeler vehicles carrying passengers, with a capacity of up to six passengers."
    tablehead="Segment"
    tablehead1="Premium Rate (effective January 2024)"
    tableData={[
      {
        duration: "Basic Premium",
       discount: "₹1,539",
      },
      {
        duration: "For Each Passenger",
        discount: "737",
      }
    ]}
    />

    <Renewpolicy
            heading="How to Buy E-Rickshaw Insurance Online with Global Health?"
            steps={[
              {
                id: 1,
                title: "Step1",
                description: "Go to the Global Health app or website. Enter your electric 3-wheeler’s registration number and mobile number, then click on ‘View Prices’.",
              },
              {
                id: 2,
                title: "Step2",
                description: "Pick the insurance plan that suits you best, choose add-ons if needed, set your preferred IDV, and then hit ‘Continue.’",
              },
              {
                id: 3,
                title: "Step3",
                description: "Provide your personal, nominee, and vehicle details, and click on ‘Pay Now.’",
              },
              {
                id: 4,
                title: "Step4",
                description: "Complete your payment and go through the mandatory KYC verification.",
              },
              {
                id: 5,
                title: "Step5",
                description: "All done! You’ll get your policy document via email, SMS, and WhatsApp. You can also access it anytime on the Global Health App.",
              }
            ]}
          />

          <RequiredDocuments
          heading="Documents Required to Buy E-Rickshaw Insurance Online"
          description="To get electric three-wheeler insurance online from Global Health, keep these documents handy:" 
          list={[
            "Vehicle Registration Certificate (RC)",
            "Previous year commercial vehicle insurance policy, if applicable",
            "Any document among these for KYC verification - PAN/Aadhar/DL/Voter id/Form 16/Passport",
          ]}
          />
          
          <Insuranceclaim
          heading="How to File a Claim with Global Health?"
          paragraphs="To file a claim against e-rickshaw insurance online, follow these steps:"
          steps={[
            {
              id: 1,
              title: "step1",
              description: "Inform your insurer as soon as possible by calling Digit on 9205401500 or dropping an email at globalhealth235@gmail.com."
            },
            {
              id: 2,
              title: "step2",
              description: "Keep your details handy such as policy number, location of the accident, date and time of the accident, and contact number of the insured/caller to make the process easier."
            },
            {
              id: 3,
              title: "step3",
              description: "Present the required documents required to file the claim and wait for the insurers to verify the details. Upon verifying, your claim will be processed."
            },

          ]}
          />

<Renewpolicy
            heading="How to Renew E-Rickshaw Policy with Global Health?"
            steps={[
              {
                id: 1,
                title: "Step1",
                description: "Go to Global Health website and click on the ‘My Policy’ tab.",
              },
              {
                id: 2,
                title: "Step2",
                description: "Select the policy pending for tractor insurance renewal and click on ‘Renew Policy.’",
              },
              {
                id: 3,
                title: "Step3",
                description: "Now select the plan, IDV, add-ons and confirm the details, then click on ‘Pay Now.’",
              },
              {
                id: 4,
                title: "Step4",
                description: "You’re done! You’ll receive the policy document via email, SMS and WhatsApp. Also, you can access it 24X7 on the Digit App.",
              }
            ]}
          />

<DepreciationCalculated 
    heading="Electric Auto Rickshaws in India in 2025"
    para="Here is a list of the most popular electric three-wheelers in India in 2025:"
    tablehead="Name of the Model 	"
    tablehead1="Ex-showroom Price"
    tableData={[
      {
        duration: "Saarthi DLX",
       discount: "₹90,000",
      },
      {
        duration: "Atul Elite Plus",
        discount: "₹1.12 Lakh",
      },
      {
        duration: "Atul Elite Plus",
       discount: "₹1.12 Lakh",
      },
      {
        duration: "Kinetic Safar Smart",
       discount: "₹1.45 Lakh",
      },
      {
        duration: "Lohia Narain DX",
       discount: "₹1.65 Lakh",
      },
      {
        duration: "Lohia Humsafar IAQ",
       discount: "₹1.80 Lakh",
      },
      {
        duration: "Mahindra e-Alfa Super",
       discount: "₹1.82 Lakh ",
      },
      {
        duration: "Piaggio Ape e-city",
       discount: "₹1.95 Lakh",
      },
      {
        duration: "Mahindra Treo Yaari",
       discount: "₹1.96 Lakh",
      },
      {
        duration: "Bajaj RE E TEC 9",
       discount: "₹3.07 Lakh ",
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

export default Autoinsurance;