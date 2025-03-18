import React from "react";
import "./Seprate.css";

const Seprate = () => {
  return (
    <section className="research-section">
      <div className="container">
        <div className="row">
          {/* Car Research Section */}
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="car-research">
              <div className="research-heading">
                <h2>Secure Your Future with Individual Insurance</h2>
                <p>
                Explore a range of individual insurance plans designed to protect your health, life, and assets.
                </p>
                <button className="research-button">Individual Insurance </button>
              </div>
              <div className="research-icon">
                <img
                  className="img-fluid"
                  src="../src/assets/Home/indi.webp"
                  alt="Car Research"
                  style={{borderRadius:'50px'}}
                />
              </div>
            </div>
          </div>

          {/* Sell Car Section */}
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="car-research">
              <div className="research-heading">
                <h2>Protect Your Business with Confidence</h2>
                <p>
                Safeguard your business with Global Health and Allied Insurance . 
                </p>
                <button className="research-button">Buisness Insurance </button>
              </div>
              <div className="research-icon">
                <img
                  className="img-fluid"
                  src="../src/assets/Home/bui.webp"

                  alt="Sell Car"
                  style={{borderRadius:'50px'}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



  );
};

export default Seprate;
