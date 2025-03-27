import React, { useState } from "react";
import "./CarInsurance.css";
import apis from "../../../Data/Vechicle.json";

const CarInsurance = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedRegNum = registrationNumber.trim().toUpperCase();
    
    if (!trimmedRegNum) {
      setError("Please enter a valid registration number.");
      setVehicleDetails(null);
      return;
    }

    const vehicles = apis.vehicles; // Access the correct array
    const vehicle = vehicles.find(
      (v) => v.vehicle_no.toUpperCase() === trimmedRegNum
    );
    
    if (vehicle) {
      setVehicleDetails(vehicle);
      setError(null);
    } else {
      setVehicleDetails(null);
      setError("No vehicle found with this registration number.");
    }
  };

  return (
    <div className="car-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="car-heading">
              <span>LET'S</span>
              <h1>INSURE</h1>
              <h1>
                <span style={{ paddingTop: "20px" }}>YOUR</span> CAR
              </h1>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <form className="car-form" onSubmit={handleSubmit}>
              <label>Registration Number</label>
              <input
                type="text"
                placeholder="E.g. KA04DK8337"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">
                View Prices
              </button>
            </form>
          </div>
        </div>

        {vehicleDetails && (
          <div className="vehicle-details">
            <h2>Vehicle Details</h2>
            <p><strong>Model:</strong> {vehicleDetails.model}</p>
            <p><strong>Brand:</strong> {vehicleDetails.company}</p>
            <p><strong>Year:</strong> {new Date(vehicleDetails.date_of_buy).getFullYear()}</p>
            <p><strong>Owner:</strong> {vehicleDetails.owner}</p>
            <p><strong>Address:</strong> {vehicleDetails.address}</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CarInsurance;