import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Choose.css";
import insuranceImg from "../../../../assets/Home/insurance.png";
import plan from "../../../../assets/Home/planning.png";
import comm from "../../../../assets/Home/customersupport.png";
import money from "../../../../assets/Home/money.png";


const cardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Choose = () => {
  const features = [
    { id: 1, title: "Comprehensive Coverage", img: insuranceImg, text: "Get extensive protection for all your medical needs." },
    { id: 2, title: "Affordable Plans", img: money, text: "Choose from a variety of budget-friendly insurance plans." },
    { id: 3, title: "24/7 Customer Support", img: comm, text: "Our team is always available to assist you anytime, anywhere." },
    { id: 4, title: "Easy Claims Process", img: plan, text: "Hassle-free claims with a smooth and quick process." },
  ];

  return (
    <div className="choose-section py-5">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-md-8">
            <h1 className="fw-bold">Why Global Health & Allied Insurance</h1>
          </div>
        </div>
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
              <motion.div
                className="card shadow-lg p-4 text-center card-hover d-flex flex-column"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img src={feature.img} alt={feature.title} className="img-fluid mb-3" style={{width:'50px'}} />
                <h4 className="fw-bold">{feature.title}</h4>
                <p className="flex-grow-1">{feature.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choose;
