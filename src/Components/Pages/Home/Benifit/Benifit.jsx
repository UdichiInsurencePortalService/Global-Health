import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./Benefit.css";

import one from "../../../../assets/Home/one.png";
import two from "../../../../assets/Home/steps-2.png";
import three from "../../../../assets/Home/three.png";
import four from "../../../../assets/Home/four.png";

const steps = [
  {
    id: "01",
    title: "Vechicle Number",
    description:
      "On Our website, enter car’s registration number, and click on ‘View Prices’.",
    img: one,
  },
  {
    id: "02",
    title: "Check Details",
    description:
      "Review all the details related to your vehicle and health to ensure accurate insurance coverage.",
    img: two,
  },
  {
    id: "03",
    title: "Customer-Information",
    description:
      "Enter your personal, nominee and vehicle details and click on ‘Pay Now.’",
    img: three,
  },
  {
    id: "04",
    title: "Payment",
    description:
      "Complete the payment and mandatory KYC verification process and You’re done! You’ll receive the policy document via email, SMS and WhatsApp.",
    img: four,
  },
];

const Benifit = () => {
  return (
    <Container className="text-center process-wrapper py-0">
      <h2 className="fw-bold">Easy Our Work Process in 4 Steps</h2>

      {/* Desktop View */}
      <Row className="d-none d-md-flex justify-content-center align-items-center process-steps">
        {steps.map((step, index) => (
          <Col key={index} md={3} className="text-center step mt-4">
            <div className="position-relative">
              <span className="step-number">{step.id}</span>
              <div className="step-circle">
                <Image src={step.img} alt={step.title} fluid />
              </div>
            </div>
            <h5 className="fw-bold mt-3">{step.title}</h5>
            <p className="text-muted">{step.description}</p>
          </Col>
        ))}
      </Row>

      {/* Mobile & Tablet View with Swiper */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        breakpoints={{
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        className="d-md-none"
      >
        {steps.map((step, index) => (
          <SwiperSlide key={index}>
            <div className="text-center step mt-4">
              <div className="position-relative">
                <span className="step-number">{step.id}</span>
                <div className="step-circle">
                  <Image src={step.img} alt={step.title} fluid />
                </div>
              </div>
              <h5 className="fw-bold mt-3">{step.title}</h5>
              <p className="text-muted">{step.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Benifit;
