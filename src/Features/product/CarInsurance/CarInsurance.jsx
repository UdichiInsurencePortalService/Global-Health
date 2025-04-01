import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import apis from "../../../Data/Vechicle.json";
import { handleError } from "../../../errortoast";
import "./CarInsurance.css";
import car from "../../../assets/accident/car.svg";
import theft from "../../../assets/accident/getaway-car.svg";
import fire from "../../../assets/accident/care-got-fire.svg";
import dia from "../../../assets/accident/natural_disaster.svg";
import acci from "../../../assets/accident/man-with-hand-injured.svg";
import third from "../../../assets/accident/banged-cars.svg";
import own1 from "../../../assets/notcover/own-damages-for-third-party1.svg";
import drunk2 from "../../../assets/notcover/drunk-and-drive2.svg";
import driving3 from "../../../assets/notcover/driving-without-a-valid-driving-license3.svg";
import consequential4 from "../../../assets/notcover/consequential-damage4.svg";
import contributory5 from "../../../assets/notcover/contributory-negligence5.svg";
import add6 from "../../../assets/notcover/add-ons-not-bought6.svg";
import IDV from "../../../IDV/IDV.jsx";

const CarInsurance = () => {
  const features2 = [
    {
      id: 1,
      title: "Own Damages for Third-Party Policy Holder",
      img: own1,
      text: "In the case of a Third-Party or Liability Only Car Policy, damages to own vehicle won’t be covered.",
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
      text: "You hold a learner’s licence and were driving without a valid driving licence-holder in the front passenger seat.",
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
      text: "Any contributory negligence (e.g., damage due to driving a car in a flood, which is not recommended as per the manufacturer’s driving manual, will not be covered)",
    },
    {
      id: 6,
      title: "Add-Ons Not Bought",
      img: add6,
      text: "Some situations are covered in add-ons. If you haven’t bought those add-ons, the corresponding situations will not be covered.",
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

  const [registrationNumber, setRegistrationNumber] = useState(localStorage.getItem("registrationNumber") || "");
  const [vehicleDetails, setVehicleDetails] = useState(JSON.parse(localStorage.getItem("vehicleDetails")) || null);
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
      const errorMessage = "Please enter a valid registration number.";
      setError(errorMessage);
      setVehicleDetails(null);
      handleError(errorMessage);
      return;
    }

    const vehicle = apis.vehicles.find((v) => v.vehicle_no.toUpperCase() === trimmedRegNum);

    if (vehicle) {
      setVehicleDetails(vehicle);

      const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");

      if (modalRef.current) {
        const modalInstance = new bootstrap.Modal(modalRef.current);
        modalInstance.show();
      }
    } else {
      const errorMessage = "Vehicle not found. Please check the registration number.";
      setError(errorMessage);
      setVehicleDetails(null);
      handleError(errorMessage);
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
                <h1><span style={{ paddingTop: "20px" }}>YOUR</span> CAR</h1>
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
                <button type="submit" className="submit-btn">View Details</button>
              </form>
            </div>
          </div>

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
                    <p><strong>Model:</strong> {vehicleDetails.model}</p>
                    <p><strong>Brand:</strong> {vehicleDetails.company}</p>
                    <p><strong>Year:</strong> {new Date(vehicleDetails.date_of_buy).getFullYear()}</p>
                    <p><strong>Owner:</strong> {vehicleDetails.owner}</p>
                    <p><strong>Address:</strong> {vehicleDetails.address}</p>
                  </>
                ) : (
                  <p>No vehicle details available.</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">View Price</button>
              </div>
            </div>
          </div>
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
            <div className="col-lg-8">
              <p>Car Insurance, also known as auto or motor insurance, is a type of vehicle insurance policy that protects you and your car from any risks and damages caused by accidents, thefts, or natural disasters.</p>
              <p>In addition to that, it protects you from third-party liabilities, ensuring financial security in case of any unforeseen circumstances.</p>
              <p>Whether you want to legally comply with the law with basic third-party insurance or opt for comprehensive protection, you can customize your IDV and add-ons to suit your needs.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="what-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-8">
              <h1 className="fw-bold">What’s Covered in Car Insurance?</h1>
            </div>
          </div>
          <div className="row">
            {features.map((feature) => (
              <div key={feature.id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column">
                  <img src={feature.img} alt={feature.title} className="img-fluid mb-3" />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <IDV />

      <div className="what-not-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-8">
              <h1 className="fw-bold">What’s Not Covered?</h1>
              <p>It is equally important to know what’s not covered in your car insurance policy to avoid surprises when you make a claim.</p>
            </div>
          </div>
          <div className="row">
            {features2.map((feature) => (
              <div key={feature.id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column">
                  <img src={feature.img} alt={feature.title} className="img-fluid mb-3" />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarInsurance;
