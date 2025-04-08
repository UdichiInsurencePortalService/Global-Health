import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Choose.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

import insuranceImg from "../../../../assets/Home/customer1.png";
import plan from "../../../../assets/Home/clock.png";
import comm from "../../../../assets/Home/award.png";
import money from "../../../../assets/Home/customer-service.png";

const Choose = () => {
  const features = [
    {
      id: 1,
      title: "Customer First",
      img: insuranceImg,
      text: "Putting you first. Protecting what matters most.",
    },
    {
      id: 2,
      title: "High Claim Settlement Ratio",
      img: money,
      text: "Hassle-free claims with a smooth and quick process.",
    },
    {
      id: 3,
      title: "Trustworthy & Dependable",
      img: comm,
      text: "Our team is always available to assist you anytime, anywhere.",
    },
    {
      id: 4,
      title: "Customer Support",
      img: plan,
      text: "Our customer support team is here to assist you every step of the way.",
    },
  ];

  return (
    <div className="choose-section py-5">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-md-8">
            <h1 className="fw-bold text-black">
              Why Global Health & Allied Insurance
            </h1>
          </div>
        </div>

        {/* Swiper for Mobile & Tablet */}
        <div className="d-md-none">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Autoplay]}
          >
            {features.map((feature) => (
              <SwiperSlide key={feature.id}>
                <div className="feature-card text-center d-flex flex-column p-4">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="feature-icon mx-auto mb-3"
                  />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid for Desktop */}
        <div className="row justify-content-center d-none d-md-flex">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch"
            >
              <div className="feature-card text-center d-flex flex-column p-4">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="feature-icon mx-auto mb-3"
                />
                <h4 className="fw-bold">{feature.title}</h4>
                <p className="flex-grow-1">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choose;
