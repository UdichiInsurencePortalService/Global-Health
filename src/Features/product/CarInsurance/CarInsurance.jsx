



import React, { useState } from "react";
import './CarInsurance.css';

const CarInsurance = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    alert(`Registration: ${registrationNumber}, Mobile: ${mobileNumber}`);
  };

  return (
    <>
    <div className="car-section">
      <div className="container">
        <div className="row">
          {/* Left Section - Text Content */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="car-heading">
              <span>LET'S</span>
              <h1>INSURE</h1>
              <h1><span style={{paddingTop:'20px'}}>YOUR</span> CAR</h1>
            </div>
          </div>

          {/* Right Section - Form */}
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
              <button type="submit" className="submit-btn">View Prices</button>
              <h1>24<span style={{color:"blue"}}>*</span>7 support</h1>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* <Information/> */}

    </>

  );
};

export default CarInsurance;


