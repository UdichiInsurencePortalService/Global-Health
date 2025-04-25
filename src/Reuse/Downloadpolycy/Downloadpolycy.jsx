import React from "react";

const Downloadpolycy = ({ heading, description, list }) => {
  return (
    <div className="py-5 bg-light">
      <div className="container">
        <h1
          className="fw-bold mb-3 text-center"
          style={{ fontWeight: "600", fontStyle: "italic" }}
        >
          {heading}
        </h1>
        <p className="mb-4" style={{ alignContent: "start" }}>
          {description}
        </p>
        <ul className="py-3">
          {list.map((item, index) => (
            <li key={index} className="list-group-item mb-3">
              ✅ {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Downloadpolycy;
