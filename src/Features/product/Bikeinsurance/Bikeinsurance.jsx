
import React, { useState,useRef,useEffect } from "react";
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
import "./Bikeinsurance.css";

import Reusechoose from "../../../Reuse/Reusechoose/Reusechoose";

import repair from "../../../assets/carimages/repair.png";
import document from "../../../assets/carimages/document.png";
import second from "../../../assets/reuseimage/gear.png";
import support from "../../../assets/reuseimage/24-hours-support.png";
import customization from "../../../assets/carimages/customization.png";
import CarPremiumRate from "../../../Reuse/CarPremiumRate/CarPremiumRate";
import DepreciationCalculated from "../../../Reuse/DepreciationCalculated/DepreciationCalculated";
import Renewpolicy from "../../../Reuse/Renewpolicy/Renewpolicy";
import RequiredDocuments from "../../../Reuse/RequireDocuments/RequireDocument";
import Insuranceclaim from "../../../Reuse/Insuranceclaim/Insuranceclaim";
import Downloadpolycy from "../../../Reuse/Downloadpolycy/Downloadpolycy";
import NeedHelp from "../../../Reuse/NeedHelp/NeedHelp";
import { handleError } from "../../../errortoast";







const Bikeinsurance = () => {
  const carFeatures = [
    {
      id: 1,
      image: repair, // Replace with actual image
      title: "Cashless Repairs",
      description:
        "Access 9000+ cashless garages across India for a smooth, worry-free repair experience.",
    },
    {
      id: 2,
      image: document, // Replace with actual image
      title: "DIY Claim Inspection",
      description:
        "Use your smartphone to capture the damage – no lengthy surveys or inspections required.",
    },
    {
      id: 3,
      image: second, // Replace with actual image
      title: "Lightning-Fast Claims",
      description:
        "We’ve settled 96% of car insurance claims – experience a process that’s quick and hassle-free.",
    },
    {
      id: 4,
      image: support, // Add appropriate image
      title: "24x7 Customer Care",
      description:
        "Have a query or need help? Our team is available around the clock, even on national holidays.",
    },
    {
      id: 5,
      image: customization, // Add appropriate image
      title: "Set Your Own Vehicle IDV",
      description:
        "With Global Health, you have the freedom to decide your car’s IDV based on your needs.",
    },
  ];

  
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
      msgApi.error("Enter a valid 10-Global Health mobile number.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Variables to store our vehicle data and price
      let vehicleData = null;
      let exShowroomPrice = "1000000"; // Default price if not found
  
      // STEP 1: Try to get data from PostgreSQL database first
      try {
        console.log("🔍 Checking database for vehicle: " + regNum);
        const dbUrl = `${import.meta.env.VITE_LOCALHOST_BIKE_GET_API}?registration_number=${regNum}`;
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
          exShowroomPrice = vehicleData?.exshowroom?.toString() || vehicleData?.sale_amount || "1000000";
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
        exshowroom: vehicleData?.exshowroom || vehicleData?.sale_amount || 1000000,
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
      
      const saveRes = await fetch(import.meta.env.VITE_LOCALHOST_BIKE_API, {
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
                <h2 className="text-center mb-4">Bike Vehicle Registration</h2>
                <form onSubmit={handleSubmit}>
                
                  <label>Bike Vehicle Registration Number</label>
                  <Input
                    placeholder="E.g. KA04DK8337"
                    size="large"
                    prefix={<CarOutlined />}
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                    className="mb-3"
                  />

                  <label>Mobile Number</label>
                  <Input
                    placeholder="Enter 10-Global Health mobile number"
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
      <Reusechoose
        heading="Why Should You Buy Global Health & Allied Insurance Service Bike Insurance?"
        subheading="We treat our customers like VIPs, know how…"
        features={carFeatures}
      />

      <Renewpolicy
        heading="How to Buy/Renew Two-Wheeler Insurance with Global Health?"
        steps={[
          {
            title: "Step 1",
            description:
              "On the Global Health App or website, enter bike’s registration number, select the policy status and click on ‘View Prices’.",
          },
          {
            title: "Step 2",
            description: "Select the plan, add-ons and click on ‘Continue.’",
          },
          {
            title: "Step 3",
            description:
              "Enter your personal, nominee and vehicle details and click on ‘Pay Now.’",
          },
          {
            title: "Step 4",
            description:
              "Complete the payment and mandatory KYC verification process.",
          },
          {
            title: "Step 5",
            description:
              "You’re done! You’ll receive the policy document via email, SMS and WhatsApp. Also, you can access it 24X7 on the Global Health App.",
          },
        ]}
      />
      <RequiredDocuments
        heading="Documents Required to Buy Two-Wheeler Insurance Online"
        description="To buy Global Health bike insurance online, a load of paperwork is not required. Furnish only the following documents to buy a new two-wheeler insurance policy within minutes:"
        list={[
          "Bike Registration Certificate ",
          "Previous year two-wheeler insurance policy, if applicable",
          "Any of these documents for KYC verification - PAN/Aadhar/DL/Voter id/Form 16/Passport",
        ]}
      />

      <Insuranceclaim 
        heading="How to File a Two-Wheeler Insurance Claim?"
        paragraphs="After you buy or renew our two wheeler insurance plan, you live tension free as we have a simple, convenient and completely Global Healthal claims process!"
        steps={[
          {
            title: "step1",
            description: "Just call on 9818152403. No forms to be filled.",
          },
          {
            title: "step2",
            description: "Get a link for Self-Inspection on your registered mobile number. Shoot your vehicle’s damages from your smartphone through a guided step by step process.",
          },
          {
            title: "step3",
            description: "Choose the mode of repair you wish to opt for i.e. Reimbursement or Cashless through our network of garages.",
          },
        ]}
      />

<Renewpolicy
        heading="How to Renew Existing Global Health Bike Insurance Policy?"
        steps={[
          {
            title: "Step 1",
            description:
              "Login to Global Health App or website and go to the ‘My Policy’ section.",
          },
          {
            title: "Step 2",
            description: "Select the policy pending for renewal and click on ‘Renew Policy.’",
          },
          {
            title: "Step 3",
            description:
              "Next, select the IDV, add-ons and confirm the details, then click on ‘Pay Now.’",
          },
          {
            title: "Step 4",
            description:
              "You’re done! You’ll receive the policy document via email, SMS and WhatsApp. Also, you can access it 24X7 on the Global Health App.",
          },
          
        ]}
      />

      <Downloadpolycy 
          heading="How to Download Your Bike Insurance Policy on Global Health App?"
          description="If you already have an active two-wheeler insurance policy which you want to download form the Global Health app, then follow the below steps:"
          list={[
              "Step 1 - On the Global Health app, go to the ‘My Policies’ tab at the bottom. You will see all your policies currently active with Global Health.",
              "Step 2 – Now select the bike insurance policy that you want to download. Verify all the details and click on ‘Download Policy’. Your two-wheeler insurance policy document will be downloaded.",
          ]}
      />

      <CarPremiumRate
                heading="Third-Party Bike Insurance Premium Rates"
                para="The third-party bike insurance premium is charged based on a bike’s engine capacity. Let’s have a look at the prices for the year 2019-20 vs 2022"
                tablehead="Engine Capacity"
                tablehead1="The premium for 2019-20 in INR"
                tablehead2="New 2W TP rate (effective 1st June 2022)"
                tableData={[
                  {
                    capacity: "Not exceeding 75 cc",
                    oldPremium: "₹482",
                    newPremium: "₹538",
                  },
                  {
                    capacity: "Exceeding 75cc but not exceeding 150 cc",
                    oldPremium: "₹752",
                    newPremium: "₹714",
                  },
                  {
                    capacity:"Exceeding 150cc but not exceeding 350cc",
                    oldPremium: "₹1193",
                    newPremium: "₹1366",
                  },
                  {
                    capacity:"Exceeding 350 cc",
                    oldPremium: "₹2323",
                    newPremium: "₹2804",
                  },
                ]}
              />

<CarPremiumRate
                heading="Third-Party Premium for New Two-Wheelers (5-year Single Premium policy)"
                tablehead="Engine Capacity"
                tablehead1="The premium for 2019-20 in INR"
                tablehead2="New 2W TP rate (effective 1st June 2022)"
                tableData={[
                  {
                    capacity: "Not exceeding 75 cc",
                    oldPremium: "₹1,045",
                    newPremium: "₹2,901",
                  },
                  {
                    capacity: "Exceeding 75cc but not exceeding 150 cc",
                    oldPremium: "₹3,285",
                    newPremium: "₹3,851",
                  },
                  {
                    capacity:"Exceeding 150cc but not exceeding 350cc",
                    oldPremium: "₹5,453",
                    newPremium: "₹7,365",
                  },
                  {
                    capacity:"Exceeding 350 cc",
                    oldPremium: "₹13,034",
                    newPremium: "₹15,117",
                  },
                ]}
              />

<CarPremiumRate
                heading="Premiums for New Electric Vehicle (EV) Two-Wheeler (1 -Year Single Premium Policy)"
                tablehead="Vehicle kilowatt capacity (KW)"
                tablehead1="The premium for 2019-20 in INR"
                tablehead2="New 2W TP rate (effective 1st June 2022)"
                tableData={[
                  {
                    capacity: "Not exceeding 3KW",
                    oldPremium: "₹410",
                    newPremium: "₹457",
                  },
                  {
                    capacity: "Exceeding 3KW but not exceeding 7KW",
                    oldPremium: "₹639",
                    newPremium: "₹609",
                  },
                  {
                    capacity:"Exceeding 7KW but not exceeding 16KW",
                    oldPremium: "₹1,014",
                    newPremium: "₹1,161",
                  },
                  {
                    capacity:"Exceeding 16KW",
                    oldPremium: "₹1,975",
                    newPremium: "₹2,383",
                  },
                ]}
              />


<CarPremiumRate
                heading="Premiums for New Electric Vehicle (EV) Two-Wheeler (5 -Year Single Premium Policy)"
                tablehead="Vehicle kilowatt capacity (KW)"
                tablehead1="The premium for 2019-20 in INR"
                tablehead2="New 2W TP rate (effective 1st June 2022)"
                tableData={[
                  {
                    capacity: "Not exceeding 3KW",
                    oldPremium: "₹888",
                    newPremium: "₹2,466",
                  },
                  {
                    capacity: "Exceeding 3KW but not exceeding 7KW",
                    oldPremium: "₹2,792",
                    newPremium: "₹3,273",
                  },
                  {
                    capacity:"Exceeding 7KW but not exceeding 16KW",
                    oldPremium: "₹4,653",
                    newPremium: "₹6,260",
                  },
                  {
                    capacity:"Exceeding 16KW",
                    oldPremium: "₹11,079",
                    newPremium: "₹12,849",
                  },
                ]}
              />


      <DepreciationCalculated
        heading="How is Depreciation Calculated in Bike Insurance?"
        para={[
          "Insured Declared Value (IDV) is the market value of the Bike. This IDV is adjusted for depreciation value of your car as per the below table.",
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

      {/* <CarPremiumRate
        heading="Third Party Car Insurance Premium Rates"
        para="A Third-Party Car Insurance Premium Calculator depends on your car’s engine cc and even the respective premium rates are predetermined by the IRDAI, which are as follows:"
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
      /> */}


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
}


export default Bikeinsurance;