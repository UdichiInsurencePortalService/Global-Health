import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./Seprate.css";
import { FaUserShield, FaChartBar, FaHandshake, FaRobot } from "react-icons/fa";

const cardData = [
  {
    icon: <FaUserShield size={50} className="icon-hover mb-3" />, 
    title: "Customer-Centric Approach",
    text: "Offering customized insurance plans with personalized products and simplified processes.",
    list: ["Personalized Products", "Simplified Processes"],
  },
  {
    icon: <FaChartBar size={50} className="icon-hover mb-3" />, 
    title: "Data-Driven Insights",
    text: "Empowering providers with insights using AI and analytics to detect fraud and optimize policies.",
    list: ["Customer Data Analytics", "Blockchain for Transparency"],
  },
  {
    icon: <FaHandshake size={50} className="icon-hover mb-3" />, 
    title: "Customer Retention & Loyalty",
    text: "Rewarding long-term policyholders with loyalty programs and healthcare partnerships.",
    list: ["Loyalty Program", "Tie-ups with Healthcare Providers"],
  },
  {
    icon: <FaRobot size={50} className="icon-hover mb-3" />, 
    title: "AI-Driven Customer Support",
    text: "Instant AI-powered support with chatbots for queries, claims, and policy recommendations.",
    list: ["24/7 Assistance", "On-Demand Insurance"],
  }
];

const InsuranceCards = () => {
  return (
    <div className="seprate-section py-5">
      <div className="container-fluid px-4 px-lg-5">
        <h2 className="text-center fw-bold mb-5" style={{ fontSize: "2.2rem" }}>Smart Policy Comparison Hub</h2>
        
        {/* Desktop View */}
        <div className="d-none d-md-flex row g-4 justify-content-center">
          {cardData.map((card, index) => (
            <div key={index} className="col-md-6 col-lg-3 d-flex">
              <div 
                className="card p-4 shadow border-0 text-center animated-card w-100 d-flex flex-column"
                style={{ borderRadius: "15px", background: "#FFFFFF" }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="text-center">
                    <div style={{ color: "#3498db" }}>{card.icon}</div>
                    <h4 className="fw-bold text-dark mb-3" style={{ fontSize: "1.4rem" }}>{card.title}</h4>
                    <p className="mb-4" style={{ fontSize: "1rem" }}>{card.text}</p>
                  </div>
                  <ul className="list-unstyled list-aligned mb-4 text-start px-2">
                    {card.list.map((item, i) => (
                      <li key={i} className="mb-2">
                        <span style={{ color: "#3498db" }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto text-center">
                    <button 
                      className="seprate-button" 
                      style={{ 
                        fontSize: "1.1rem", 
                        padding: "8px 20px", 
                        backgroundColor: "#3498db", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "8px" 
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Swiper */}
        <div className="d-md-none">
          <Swiper 
            spaceBetween={20} 
            slidesPerView={1} 
            autoplay={{ delay: 2500, disableOnInteraction: false }} 
            modules={[Autoplay]}
          >
            {cardData.map((card, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="card p-4 shadow border-0 text-center d-flex flex-column"
                  style={{ borderRadius: "15px", background: "#FFFFFF", margin: "10px", minHeight: "380px" }}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="text-center">
                      <div style={{ color: "#3498db" }}>{card.icon}</div>
                      <h4 className="fw-bold text-dark mb-3" style={{ fontSize: "1.4rem" }}>{card.title}</h4>
                      <p className="mb-4" style={{ fontSize: "1rem" }}>{card.text}</p>
                    </div>
                    <ul className="list-unstyled list-aligned mb-4 text-start px-2">
                      {card.list.map((item, i) => (
                        <li key={i} className="mb-2">
                          <span style={{ color: "#3498db" }}>✓</span> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto text-center">
                      <button 
                        className="seprate-button" 
                        style={{ 
                          fontSize: "1.1rem", 
                          padding: "8px 20px", 
                          backgroundColor: "#3498db", 
                          color: "white", 
                          border: "none", 
                          borderRadius: "8px" 
                        }}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCards;