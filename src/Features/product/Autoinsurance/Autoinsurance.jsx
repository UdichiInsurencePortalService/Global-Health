import React from "react";
import "./Autoinsurance.css";
import Reusechoose from "../../../Reuse/Reusechoose/Reusechoose";


export const Autoinsurance = () => {

    const autoCard = [
        {
          id: 1,
          title: "Accidents",
          subtitle: "Accidents",
          description: "Damages caused to your auto rickshaw in case of an accident.",
        },
        {
          id: 2,
          title: "Theft",
          subtitle: "Theft",
          description: "Loss or damage of your auto rickshaw due to theft.",
        },
        {
          id: 3,
          title: "Fire",
          subtitle: "Fire",
          description: "Damages caused to your auto rickshaw due to a fire.",
        },
        {
          id: 4,
          title: "Natural Disasters",
          subtitle: "Natural Disasters",
          description: "Damages caused to your auto rickshaw due to any natural calamity.",
        },
        {
          id: 5,
          title: "Personal Accident",
          subtitle: "Personal Accident",
          description: "If your auto rickshaw meets with an accident, leading to an injury or death of you or the driver using it.",
        },
        {
          id: 6,
          title: "Third Party Losses",
          subtitle: "Third Party Losses",
          description: "Any damages caused by your auto rickshaw to a third party or its passengers.",
        },
        {
          id: 7,
          title: "Towing Disabled Vehicles",
          subtitle: "Towing Disabled Vehicles",
          description: "Any damages caused to your auto rickshaw in cases where it's being towed.",
        },
      ];
      

  return (
    <>
      <div className="Auto-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Section - Heading */}
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4 mb-md-0">
              <div className="Auto-heading text-center text-md-start">
                <span className="d-block">LET'S</span>
                <h1 className="fw-bold display-5 m-0">INSURE</h1>
                <h1 className="fw-bold display-5">
                  <span style={{ paddingTop: "20px" }}>YOUR</span> AUTO
                </h1>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <form className="Auto-form p-4 border rounded shadow-sm">
                <div className="mb-3">
                  <label htmlFor="pincode" className="form-label">
                    Enter register Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    placeholder="E.g. KA04DK8337"
                    required
                  />
                </div>
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
            </div>
          </div>
        </div>
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
      < Reusechoose />

      <div className="what-cover-section py-5">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-12">
            <h1 className="fw-bold">Why Should You Get Health Insurance?</h1>
          </div>
        </div>

        <div className="row">
          {autoCard.map((feature) => (
            <div
              key={feature.id}
              className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
            >
              <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column w-100">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="img-fluid mb-3"
                  style={{ maxHeight: "80px", objectFit: "contain" }}
                />
                <h4 className="fw-bold">{feature.title}</h4>
                <p className="flex-grow-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};
export default Autoinsurance;
