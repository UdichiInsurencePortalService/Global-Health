import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import apis from "../../../Data/Vechicle.json";
import { handleError } from "../../../errortoast";
import "./CarInsurance.css";

const CarInsurance = () => {
  const [registrationNumber, setRegistrationNumber] = useState(
    localStorage.getItem("registrationNumber") || ""
  );
  const [vehicleDetails, setVehicleDetails] = useState(
    JSON.parse(localStorage.getItem("vehicleDetails")) || null
  );
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("registrationNumber", registrationNumber);
  }, [registrationNumber]);

  useEffect(() => {
    if (vehicleDetails) {
      localStorage.setItem("vehicleDetails", JSON.stringify(vehicleDetails));
    } else {
      localStorage.removeItem("vehicleDetails");
    }
  }, [vehicleDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const trimmedRegNum = registrationNumber.trim().toUpperCase();

    if (!trimmedRegNum) {
      setError("Please enter a valid registation number.");

  
    if (!trimmedRegNum) {
      const errorMessage = "Please enter a valid registration number.";
      setError(errorMessage);
      setVehicleDetails(null);
      handleError(errorMessage);
      return;
    }
    const vehicles = apis.vehicles;
    const vehicle = vehicles.find(
      (v) => v.vehicle_no.toUpperCase() === trimmedRegNum
    );
  
    if (vehicle) {
      setVehicleDetails(vehicle);
  
      // Dynamically import Bootstrap's Modal to ensure it's available
      const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
  
      if (modalRef.current) {
        const modalInstance = new bootstrap.Modal(modalRef.current);
        modalInstance.show();
      }
    } else {
      setError("No vehicle found this registration number.");
    }
  };
  return (
    <>
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
                onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                required
              />
              <button type="submit" className="submit-btn">
                View Details
              </button>
            </form>
          </div>
        </div>

       {vehicleDetails && (
          <div className="vehicle-details">
            <h2>Vehicle Details</h2>
            <p>
              <strong>Model:</strong> {vehicleDetails.model}
            </p>
            <p>
              <strong>Brand:</strong> {vehicleDetails.company}
            </p>
            <p>
              <strong>Year:</strong>{" "}
              {new Date(vehicleDetails.date_of_buy).getFullYear()}
            </p>
            <p>
              <strong>Owner:</strong> {vehicleDetails.owner}
            </p>
            <p>
              <strong>Address:</strong> {vehicleDetails.address}
            </p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="vehicleModal" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Vehicle Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {vehicleDetails ? (
                <>
                  <p>
                    <strong>Model:</strong> {vehicleDetails.model}
                  </p>
                  <p>
                    <strong>Brand:</strong> {vehicleDetails.company}
                  </p>
                  <p>
                    <strong>Year:</strong> {new Date(vehicleDetails.date_of_buy).getFullYear()}
                  </p>
                  <p>
                    <strong>Owner:</strong> {vehicleDetails.owner}
                  </p>
                  <p>
                    <strong>Address:</strong> {vehicleDetails.address}
                  </p>
                </>
              ) : (
                <p>No vehicle details available.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                View Price
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>

    
  );
};

export default CarInsurance;
