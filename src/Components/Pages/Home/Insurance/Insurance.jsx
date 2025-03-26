import React from "react";
import "./Insurance.css";
import banner from "../../../../assets/Home/banner.png";

const Insurance = () => {
  return (
    <section
      className="insurance-section"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container text-center">
        <div className="insurance-header">
          <h1>Get or Renew Your Car Insurance Online</h1>
        </div>
        <div className="insurance-form">
          <input
            type="text"
            placeholder="Enter Your Vehicle Number"
            className="input-field"
          />
          <button className="btn-view">View Details</button>
        </div>
        <p className="mt-3">
          <a href="#" className="link-success custom-link">
            Download Your Policy
          </a>
        </p>
      </div>
    </section>
  );
};

export default Insurance;
