import React from 'react';
import './Policy.css';
 import logo from '../../src/assets/aboutusimges/image.png' // Make sure this path is correct

const Policy = () => {
  return (
    <section className="policy-section py-5 px-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-5">
            <h1 className="fw-bold policy-heading">Just Check Your Policy Updates Here!</h1>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img src={logo} alt="Logo" className="logo-img" width="300" />
          </div>
          <div className="col-md-6">
            <div className="form-section">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter Your Policy Number"
              />
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter Your Registration Number"
              />
              <button className="btn btn-primary w-100">Check Policy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;
