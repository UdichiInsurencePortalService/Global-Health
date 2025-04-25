import React from "react";
// import "./Reusechoose.css";

const Reusechoose = ({ heading, subheading, features }) => {
  return (
    <div className="choos-section py-5">
      <div className="container">
        <div className="row mb-4 text-center">
          <div className="col-12">
            <h1 style={{ fontWeight: "600", fontStyle: "italic" }}>
              {heading}
            </h1>
            <p>{subheading}</p>
          </div>
        </div>

        <div className="row">
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
                  style={{ maxHeight: "130px", objectFit: "contain" }}
                />
                <h4 className="fw-bold">{feature.title}</h4>
                <p className="flex-grow-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reusechoose;