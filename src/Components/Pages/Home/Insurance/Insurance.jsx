import React from 'react';
import './Insurance.css';

const Insurance = () => {
  return (
    <section className="insurance-section">
      <div className="container">
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
      </div>
    </section>
  );
};

export default Insurance;
