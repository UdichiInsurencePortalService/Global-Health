import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CarInsurance.css";

import { Button, Modal, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import carLoadingGif from "../../../../src/assets/Home/car-1803_256.gif";

const CarInsurance = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const showErrorMessage = (msg) => {
    messageApi.error({
      content: msg,
      duration: 4,
    });
  };

  const fetchVehicleDetails = async (regNumber) => {
    const apiUrl = "https://sandbox.surepass.io/api/v1/rc/rc-full";
    const formattedRegNumber = regNumber.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MzY1NjYzOSwianRpIjoiZjNjOTY3NWEtODY2OC00NDNkLWI4NTQtYTkwOGY1ODY2NmJmIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2Lmt1bmFsc2hhcm1hQHN1cmVwYXNzLmlvIiwibmJmIjoxNzQzNjU2NjM5LCJleHAiOjE3NDQ1MjA2MzksImVtYWlsIjoia3VuYWxzaGFybWFAc3VyZXBhc3MuaW8iLCJ0ZW5hbnRfaWQiOiJtYWluIiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInVzZXIiXX19.M3YWvLReEe2h8FgfldWCQ7ywQHCqOUD9nYlJppnhRts"
        },
        body: JSON.stringify({
          id_number: formattedRegNumber,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch data");
      }

      const rc = data.data;
      
      // Get ex-showroom price based on maker/model (simplified version)
      const exShowroomPrice = getExShowroomPrice(rc.maker_description, rc.maker_model);

      return {
        vehicle_no: rc.rc_number,
        model: rc.maker_model,
        company: rc.maker_description,
        date_of_buy: rc.registration_date,
        owner: rc.owner_name,
        address: rc.present_address,
        ex_showroom_price: exShowroomPrice
      };
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  // Function to get estimated ex-showroom price based on make and model
  const getExShowroomPrice = (make, model) => {
    // This is a simplified mapping of some car brands and models to ex-showroom prices
    // In a real application, you would use a comprehensive database or API
    const priceMap = {
      "MARUTI": {
        "DEFAULT": 700000,
        "SWIFT": 650000,
        "BALENO": 700000,
        "DZIRE": 680000,
        "ALTO": 450000,
        "BREZZA": 850000
      },
      "HYUNDAI": {
        "DEFAULT": 900000,
        "CRETA": 1200000,
        "VENUE": 800000,
        "I20": 750000,
        "VERNA": 950000
      },
      "TATA": {
        "DEFAULT": 800000,
        "NEXON": 900000,
        "HARRIER": 1400000,
        "PUNCH": 700000,
        "TIAGO": 550000
      },
      "HONDA": {
        "DEFAULT": 1000000,
        "CITY": 1100000,
        "AMAZE": 800000,
        "JAZZ": 750000
      },
      "TOYOTA": {
        "DEFAULT": 1100000,
        "INNOVA": 1800000,
        "FORTUNER": 3000000,
        "GLANZA": 800000
      },
      "MAHINDRA": {
        "DEFAULT": 1000000,
        "THAR": 1500000,
        "XUV700": 1800000,
        "SCORPIO": 1400000
      }
    };

    // Normalize make and model for comparison
    const normMake = make?.toUpperCase() || "";
    const normModel = model?.toUpperCase() || "";
    
    // Try to find the specific model price
    if (priceMap[normMake]) {
      // Search for partial matches in the model name
      const modelKeys = Object.keys(priceMap[normMake]);
      for (const key of modelKeys) {
        if (key !== "DEFAULT" && normModel.includes(key)) {
          return priceMap[normMake][key];
        }
      }
      
      // If no specific model match is found, return the default price for the make
      return priceMap[normMake]["DEFAULT"];
    }
    
    // If make is not in our database, return a default value of 10 lakhs
    return 1000000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registrationNumber.trim()) {
      showErrorMessage("Please enter a valid registration number.");
      return;
    }

    setOpen(true);
    setLoading(true);
    setFetchError(null);

    try {
      const data = await fetchVehicleDetails(registrationNumber);
      setVehicleDetails(data);
      
      // Store vehicle details in localStorage for the UserData component
      localStorage.setItem('vehicleDetails', JSON.stringify(data));
    } catch (err) {
      setFetchError("Could not fetch vehicle details. Please check the number.");
      setVehicleDetails(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Keep loader visible for 2 seconds for UX
    }
  };

  const handleViewPrice = () => {
    setOpen(false);
    navigate('/user-data');
  };

  const getModalFooter = () => {
    if (loading) return null;
    if (vehicleDetails) {
      return (
        <Button type="primary" onClick={handleViewPrice}>View Price</Button>
      );
    }
    return <Button onClick={() => setOpen(false)}>Close</Button>;
  };

  return (
    <>
      {contextHolder}
      <div className="car-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="car-heading">
                <span>LET'S</span>
                <h1>INSURE</h1>
                <h1><span style={{ paddingTop: "20px" }}>YOUR</span> CAR</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <form className="car-form" onSubmit={handleSubmit}>
                <label>Registration Number</label>
                <Input
                  placeholder="E.g. KA04DK8337"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                  required
                />
                <Button type="primary" htmlType="submit" className="submit-btn">
                  View Details
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Modal
          title="Vehicle Details"
          open={open}
          onCancel={() => setOpen(false)}
          footer={getModalFooter()}
        >
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <img
                src={carLoadingGif}
                alt="Loading car"
                style={{ width: "100px", animation: "moveCar 2s infinite alternate" }}
              />
              <p>Fetching your vehicle details...</p>
            </div>
          ) : fetchError ? (
            <div className="error-message">
              <p>{fetchError}</p>
            </div>
          ) : vehicleDetails ? (
            <div className="data" style={{ fontSize: "18px", fontStyle: "italic" }}>
              <p><strong>Registration Number:</strong> {vehicleDetails.vehicle_no}</p>
              <p><strong>Model:</strong> {vehicleDetails.model}</p>
              <p><strong>Brand:</strong> {vehicleDetails.company}</p>
              <p><strong>Year:</strong> {new Date(vehicleDetails.date_of_buy).getFullYear()}</p>
              <p><strong>Owner:</strong> {vehicleDetails.owner}</p>
              <p><strong>Address:</strong> {vehicleDetails.address}</p>
              <p><strong>Estimated Ex-Showroom Price:</strong> ₹{vehicleDetails.ex_showroom_price.toLocaleString()}</p>
            </div>
          ) : (
            <p>No vehicle data found.</p>
          )}
        </Modal>
      </div>
    </>
  );
};

export default CarInsurance;