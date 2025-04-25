import React from "react";

const RequiredDocuments = ({ heading, description, list }) => {
  return (
    <div className="requiredocument-section py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <h1
          className="fw-bold mb-3 text-center"
          style={{ fontWeight: "600", fontStyle: "italic" }}
        >
          {heading}
        </h1>
        <p className="mb-4 text-center">{description}</p>
        <ul className="py-3">
          {list.map((item, index) => (
            <li key={index} className="list-group-item mb-3">
              ✅ {item}
            </li>
          ))}
        </ul>  
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RequiredDocuments;
