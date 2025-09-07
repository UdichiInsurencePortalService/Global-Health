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
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8 col-md-10 col-12">
            <h1 className="fw-bold text-black mb-3 choose-title">
              Why Global Health & Allied Insurance
            </h1>
          </div>
        </div>

        {/* Swiper for Mobile (up to md breakpoint) */}
        <div className="d-lg-none">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              576: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            className="features-swiper"
          >
            {features.map((feature) => (
              <SwiperSlide key={feature.id}>
                <div className="feature-card text-center d-flex flex-column p-4 h-100">
                  <div className="feature-icon-wrapper mb-3">
                    <img
                      src={feature.img}
                      alt={feature.title}
                      className="feature-icon mx-auto"
                    />
                  </div>
                  <h4 className="fw-bold mb-3 feature-title">{feature.title}</h4>
                  <p className="flex-grow-1 feature-text">{feature.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid for Desktop (lg and above) */}
        <div className="row justify-content-center d-none d-lg-flex">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="col-xl-3 col-lg-6 mb-4 d-flex align-items-stretch"
            >
              <div className="feature-card text-center d-flex flex-column p-4 w-100">
                <div className="feature-icon-wrapper mb-3">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="feature-icon mx-auto"
                  />
                </div>
                <h4 className="fw-bold mb-3 feature-title">{feature.title}</h4>
                <p className="flex-grow-1 feature-text">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choose;