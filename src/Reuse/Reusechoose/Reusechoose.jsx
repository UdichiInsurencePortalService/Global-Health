import React from "react";

import first from "../../assets/reuseimage/vehicless.png"
import second from "../../assets/reuseimage/gear.png"
import third from "../../assets/reuseimage/24-hours-support.png"

const Reusechoose = () => {
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

  return (
    <>
      <div className="choos-section py-5">
        {/* ✅ Section with padding for spacing */}
        <div className="container">
          <div className="row mb-4 text-center">
            <div className="col-12">
              <h1>Why Choose Auto Rickshaw Insurance by Digit?</h1>
              <p>We treat our customers like VIPs, know how…</p>
            </div>
          </div>

          <div className="row">
            {/* ✅ Fixed wrong variable: was 'healthInsuranceCards' → now 'features' */}
            {features.map((feature) => (
              <div
                key={feature.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex "
              >
                <div className="card shadow-lg p-4 text-center d-flex flex-column w-100">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "150px", objectFit: "contain" }} // ✅ Optional image styling
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

export default Reusechoose;
