import React from 'react';
import './Insurance.css';

<<<<<<< HEAD
const Insurance = () => {
  return (
    <section className="insurance-section">
=======
import banner from "../../../../assets/Home/banner.png"
const Insurance = () => {
  return (
    <section
      className="insurance-section"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        width: 'auto',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: "cover"
      }}
    >
>>>>>>> 7ea579c52e0d99b3fc8e42aa54c2b08aa548d893
      <div className="container">
        <div className="insurance-header">
          <h1>Get or Renew Your Car Insurance Online</h1>
        </div>
        <div className="insurance-form">
<<<<<<< HEAD
          <input 
            type="text" 
            placeholder="Enter Your Vehicle Number" 
            className="input-field"
          />
          <button className="btn-view">View Details</button>
        </div>
=======
          <input
            type="text"
            placeholder="Enter Your Vehicle Number"
            className="input-field"
          />
          <button className="btn-view">View Details</button>

        </div>
        <p style={{ marginLeft: '20%', marginTop: '2%' }}>
          <a href="#" className="link-success custom-link">Download Your Policy</a>
        </p>
>>>>>>> 7ea579c52e0d99b3fc8e42aa54c2b08aa548d893
      </div>
    </section>
  );
};

export default Insurance;
