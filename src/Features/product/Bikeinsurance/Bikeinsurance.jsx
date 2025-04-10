

import "./Bikeinsurance.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is available globally
import { Flex } from "antd";
import bike1 from "../../../assets/Bikeimages/accident.png";
import bike2 from "../../../assets/Bikeimages/Bikeimages2.png";
import bike3 from "../../../assets/Bikeimages/daredevil.png";
import bike4 from "../../../assets/Bikeimages/disasters.jpg";
import bike5 from "../../../assets/Bikeimages/mishap.png";
import bike6 from "../../../assets/Bikeimages/third-party.png";
import own1 from "../../../assets/notcover/own-damages-for-third-party1.svg";
import drunk2 from "../../../assets/notcover/drunk-and-drive2.svg";
import driving3 from "../../../assets/notcover/driving-without-a-valid-driving-license3.svg";
import consequential4 from "../../../assets/notcover/consequential-damage4.svg";
import contributory5 from "../../../assets/notcover/contributory-negligence5.svg";
import add6 from "../../../assets/notcover/add-ons-not-bought6.svg";

const Bikeinsurance = () => {
  const Bikefeatures1 = [
    {
      id: 1,
      img: bike1,
      title: "Accidents",
      text: "Damages and losses that may arise due to an accident or collision",
    },
    {
      id: 2,
      img: bike2,
      title: "Bike Theft",
      text: "Covers for your losses in case your two-wheeler is unfortunately stolen!",
    },
    {
      id: 3,
      img: bike3,
      title: "Bike Got Fire",
      text: "Damages and losses to your two-wheeler in case of an accidental fire!",
    },
    {
      id: 4,
      img: bike4,
      title: "Natural Disasters",
      text: "Damages caused to your two-wheeler due to nature’s many furies, such as due to floods, cyclones, etc.",
    },
    {
      id: 5,
      img: bike5,
      title: "Personal Accident",
      text: "Covers for your expenses in cases where you’ve hurt yourself too bad!",
    },
    {
      id: 6,
      img: bike6,
      title: "Third Party Losses",
      text: "When a person, a vehicle or a property is hurt or damaged due to your bike's actions.",
    },
  ];

  const Bikefeatures2 = [
    {
      id: 1,
      img: own1,
      title: "Own Damages for Third-Party Policy holder",
      text: "In the case of a Third-Party or Liability Only Bike Policy, damages to own vehicle won’t be covered.",
    },
    {
      id: 2,
      img: drunk2,
      title: "Drunk Riding or without a Licence",
      text: "Your bike insurance won’t cover for you in situations where you were riding drunk or without a valid two-wheeler licence.",
    },
    {
      id: 3,
      img: driving3,
      title: "Driving without a valid Driving Licence holder",
      text: "If you hold a learner’s licence and were riding your two-wheeler without a valid licence-holder on the pillion seat- then your claim in those situations won’t be covered.",
    },
    {
      id: 4,
      img: consequential4,
      title: "Consequential Damages",
      text: "Any damage which is not a direct result of the accident (e.g. after an accident, if the damaged two-wheeler is being used incorrectly and the engine gets damaged, it is considered as consequential damage and it will not be covered).",
    },
    {
      id: 5,
      img: contributory5,
      title: "Contributory Negligences",
      text: "Any contributory negligence (e.g. damage due to driving a two-wheeler in a flood, which is not recommended as per the manufacturer’s driving manual, will not be covered).",
    },
    {
      id: 6,
      img: add6,
      title: "Add-ons not Bought",
      text: "Some situations are covered in add-ons. If you haven’t bought those add-ons, the corresponding situations will not be covered.",
    },
  ];

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

  useEffect(() => {
    console.log("Modal Ref:", modalRef.current); // Debugging to ensure ref is assigned
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const trimmedRegNum = registrationNumber.trim().toUpperCase();

    if (!trimmedRegNum) {
      setError("Please enter a valid registration number.");
      setVehicleDetails(null);
      return;
    }

    const vehicle = apis.vehicles.find(
      (v) => v.vehicle_no.toUpperCase() === trimmedRegNum
    );

    if (vehicle) {
      setVehicleDetails(vehicle);

      // Ensure Bootstrap modal instance is created properly
      if (modalRef.current) {
        const modalInstance = new window.bootstrap.Modal(modalRef.current);
        modalInstance.show();
      }
    } else {
      setError("Bike not found. Please check the registration number.");
      setVehicleDetails(null);
    }
  };

  return (
    <>
      <div className="Bike-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="Bike-heading">
                <span>LET'S</span>
                <h1>INSURE</h1>
                <h1>
                  <span style={{ paddingTop: "20px" }}>YOUR</span> BIKE
                </h1>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <form className="Bike-form" onSubmit={handleSubmit}>
                <label>Registration Number</label>
                <input
                  type="text"
                  placeholder="E.g. KA04DK1234"
                  value={registrationNumber}
                  onChange={(e) =>
                    setRegistrationNumber(e.target.value.toUpperCase())
                  }
                  required
                />
                <label>Mobile Number</label>
                <input
                  type="number"
                  placeholder="E.g. 8429966832"
                  value={registrationNumber}
                  onChange={(e) =>
                    setRegistrationNumber(e.target.value.toUpperCase())
                  }
                  required
                />
                <button type="submit" className="submit-btn">
                  View Details
                </button>
              </form>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="vehicleModal"
          tabIndex="-1"
          ref={modalRef}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Bike Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
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
                      <strong>Year:</strong>{" "}
                      {new Date(vehicleDetails.date_of_buy).getFullYear()}
                    </p>
                    <p>
                      <strong>Owner:</strong> {vehicleDetails.owner}
                    </p>
                    <p>
                      <strong>Address:</strong> {vehicleDetails.address}
                    </p>
                  </>
                ) : (
                  <p>No bike details available.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  View Price
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Bike-info">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Why Do You Need Two-Wheeler Insurance in India?</h1>
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-12">
              <div
                className="content-info-list"
                // style={{
                //   display: Flex,
                //   textAlign: "center",
                //   alignItems: Flex - start,
                // }}
              >
                <p
                  style={{ fontSize: "80", fontWeight: "bold", color: "green" }}
                >
                  Here’ why getting a bike insurance policy is beneficial for
                  you:
                </p>
              </div>
              <div className="content-info-list">
                <h3>Protect your Pocket from Dents</h3>
                <p>
                  Insuring your bike with a two-wheeler insurance policy ensures
                  your pocket doesn’t face any dents due to unfortunate losses
                  and damages in the likelihood of an accident, natural
                  calamity, fire or theft.
                </p>
              </div>
              <div className="content-info-list">
                <h3>Be Covered, Legally!</h3>
                <p>
                  According to the Motor Vehicle Act, it is mandatory to at
                  least have Third-Party Bike Insurance. Without it, you can’t
                  ride legally on Indian roads! Therefore, one of the benefits
                  of buying a bike insurance policy is that of being covered
                  legally.
                </p>
              </div>
              <div className="content-info-list">
                <h3>Stay Clear of Traffic Penalties</h3>
                <p>
                  Since it’s primarily illegal to ride in India without at least
                  a basic, Third-Party Bike Insurance; not having one can lead
                  to heavy traffic penalties. Believe it or not, you save more
                  on buying insurance for your bike than getting caught even
                  just once for not having one!
                </p>
              </div>
              <div className="content-info-list">
                <h3>Get Extensive Coverage with Add-ons</h3>
                <p>
                  When you opt for a comprehensive bike insurance policy, you
                  have the benefit of customizing it with useful add-ons like a
                  return to invoice cover, zero depreciation cover, breakdown
                  assistance, consumables cover and tyre protection amongst
                  others that will give your bike complete protection, against
                  all the odds!
                </p>
              </div>
              <div className="content-info-list">
                <h3>Coverage for Third-Party Damage</h3>
                <p>
                  One of the problems people dread when they get into any kind
                  of accident is the countless banter faced between third
                  parties due to damage or losses caused. Having a bike
                  insurance policy in place ensures the affected party will be
                  covered and hence lessens the problems faced!
                </p>
              </div>
              {/* <p>Bike insurance, also known as two-wheeler insurance, provides financial protection against damages caused to your bike due to accidents, theft, natural calamities, or third-party liabilities.</p>
              <p>It is mandatory in India to have at least third-party insurance for all two-wheelers. You can also opt for comprehensive plans for broader coverage.</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="Bike-info">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Why is a Two-Wheeler Insurance Mandatory in India?</h1>
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-12">
              <div className="content-info-list">
                <h3>
                  Two-Wheelers Contribute to 34% of Road Accidents in India
                </h3>
                <p>
                  According to the Ministry of Road Transport and Highways,
                  Two-Wheelers are one the highest contributing factors of road
                  accidents in India. This is a huge factor alone that led to
                  making at least a Third-Party Bike Insurance mandatory by the
                  Motor Vehicles Act. This way, people not only ride responsibly
                  but in case of an accident or collision, damages and losses
                  will be covered for.
                </p>
              </div>
              <div className="content-info-list">
                <h3>Protects the Third-Party</h3>
                <p>
                  Accidents are prone to happen, but what happens to the person
                  affected? One of the reasons why third-party bike insurance is
                  mandatory is so that in unfortunate situations, the affected
                  party can be protected by ensuring all damages, and losses are
                  covered for.
                </p>
              </div>
              <div className="content-info-list">
                <h3>Easing Legal Complications</h3>
                <p>
                  When one gets into an accident, damages alone aren’t the
                  source of worry. It is the legal process too that bothers one,
                  due to the time and energy spent on it. However, with the
                  right bike insurance in place, legal processes too would be
                  taken care of efficientl
                </p>
              </div>
              {/* <p>Bike insurance, also known as two-wheeler insurance, provides financial protection against damages caused to your bike due to accidents, theft, natural calamities, or third-party liabilities.</p>
              <p>It is mandatory in India to have at least third-party insurance for all two-wheelers. You can also opt for comprehensive plans for broader coverage.</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="what-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-8">
              <h1 className="fw-bold">
                What’s Covered in Two-Wheeler Insurance by Global Health &
                Allied Insurance
              </h1>
            </div>
          </div>
          <div className="row">
            {Bikefeatures1.map((feature) => (
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
              <h1 className="fw-bold">What’s Not Covered?</h1>
              <p>
                It is equally important to know what’s not covered in your
                two-wheeler insurance policy, so that there are no surprises
                when you make a claim. Here are some such situations:
              </p>
            </div>
          </div>
          <div className="row">
            {Bikefeatures2.map((feature) => (
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
    </>
  );
};

export default Bikeinsurance;
