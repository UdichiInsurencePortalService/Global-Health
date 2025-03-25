import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Benifit.css";


const Benifit = () => {
  const benefits = [
    {
      id: 1,
      title: "Benefit 1 is here",
      description: "Car insurance with 5% discount",
    },
    {
      id: 2,
      title: "Benefit 2 is here",
      description: "Life insurance with 15% discount",
    },
    {
      id: 3,
      title: "Benefit 3 is here",
      description: "Travel insurance with 20% discount",
    },
  ];

  return (
    <div className="Benifit-section">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <h1>Why We're the Best Choice for You</h1>
          </div>
        </div>
        <div className="row justify-content-center text-center">
          {benefits.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card card-hover shadow-lg p-4 text-center d-flex flex-column align-items-center">
                {/* Example image if needed */}
                {/* <img src={item.image} alt={item.title} className="benefit-img" /> */}
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benifit;
