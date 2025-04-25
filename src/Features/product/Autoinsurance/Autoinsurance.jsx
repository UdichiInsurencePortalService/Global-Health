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

/**
 * CarInsurance Component
 * 
 * This component handles vehicle registration lookup with a simplified approach:
 * 1. First checks PostgreSQL database using the registration number
 * 2. Falls back to Surepass API if data is not found in database
 * 3. Fetches ex-showroom price separately if needed
 * 4. Stores all data to PostgreSQL for future lookups
 * 5. Includes mobile number in the database save
 */
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

         mobile_number: mobile // Add mobile number to summary
      };
  
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
    </>
  );
};

export default Autoinsurance;