  import { Italic } from "lucide-react";
import React from "react";

const Renewpolicy = ({ heading, steps }) => {
  return (
    <div className="py-5 bg-white" style={{ background: "#f5f5f5" }}>
      <div className="container">
        <div className="row mb-4 text-center">
          <div className="col-12">
            <h1
              className="fw-bold"
              style={{ fontWeight: "600", fontStyle: "italic" }}
            >
              {" "}
              {heading}{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          {steps.map((step) => (
            <div
              key={step.id}
              className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex"
            >
              <div className="border rounded-3 p-4 text-center w-100">
                {/* Circle for Step Number */}
                <div
                  className="mx-auto mb-3 d-flex justify-content-center align-items-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    textAlign: "center",
                    borderBlockColor: "yellow",
                    borderRadius: "50%",
                    backgroundColor: "yellowgreen", // Bootstrap primary color
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {step.title}
                </div>

                {/* Step Title and Description */}
                {/* <h5 className="fw-bold mb-2">{step.title}</h5> */}
                <p className="text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Renewpolicy;
