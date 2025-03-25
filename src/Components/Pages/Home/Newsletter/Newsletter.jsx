import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope } from "react-icons/fa";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="Newsletter-section">
      <div className="container">
        {/* Heading Section */}
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <h1>Get Your Own Insurance Newsletter.</h1>
            <h2>Subscribe to our Newsletter</h2>
            <p>Get the latest news and updates from us</p>
          </div>
        </div>

        {/* Input with Icon and Button Section */}
        <div className="row mt-4" style={{ gap: 20 }}>
          {/* Email Input with Icon Inside */}
          <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="Enter your email to subscribe"
                className="form-control"
              />
            </div>
          </div>

          {/* Subscribe Button */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <button className="btn btn-primary w-100">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;


