import React from "react";
import "./Healthinsurance.css";
// import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import img1 from "../../../assets/health-images/financial-report.png";
import img2 from "../../../assets/health-images/graduation.png";
import img3 from "../../../assets/health-images/critical.png";
import img4 from "../../../assets/health-images/financial-report.png";
import img5 from "../../../assets/health-images/inpatient.png";
import img6 from "../../../assets/health-images/philosophy.png";
import img7 from "../../../assets/health-images/checkup.png";
import img8 from "../../../assets/health-images/waiting.png";
import img9 from "../../../assets/health-images/hospital.png";





const Healthinsurance = () => {
  const healthInsuranceCards = [
    {
      id: 1,
      image: img1,
      title: "Covers Medical Expenses",
      description:
        "Health insurance covers pre and post-hospitalization costs, protecting your savings from rising treatment expenses, especially in private hospitals.",
    },
    {
      id: 2,
      image: img2,
      title: "Maximize Tax Savings",
      description:
        "Get tax benefits under Section 80D when you pay premiums for yourself or your family. It's a smart way to save money while securing your health.",
    },
    {
      id: 3,
      image: img3,
      title: "Critical Illness Protection",
      description:
        "Be financially prepared for life-threatening conditions like cancer or heart disease. Insurance ensures you’re covered even at a young age.",
    },
    {
      id: 4,
      image: img4,
      title: "Ensures Financial Security",
      description:
        "A health plan shields you from unexpected medical bills and offers bonuses for claim-free years—making it a long-term financial asset.",
    },
    {
      id: 5,
      image: img5,
      title: "Get Timely Treatment",
      description:
        "Avoid delaying treatment due to costs. Insurance gives you access to immediate care and annual checkups for preventive health awareness.",
    },
    {
      id: 6,
      image: img6,
      title: "Peace of Mind",
      description:
        "Relax knowing that in difficult times, your health insurance has your back. It’s like having a reliable friend to support you through tough days.",
    },
  ];

  const healthInsuranceExclusions = [
    {
      id: 1,
      image: img7,
      title: "Pre-Natal & Post-Natal Expenses",
      description:
        "Regular pre and post-delivery consultations are not covered unless they are linked to hospitalization during pregnancy.",
    },
    {
      id: 2,
      image: img8,
      title: "Pre-Existing Conditions (Before Waiting Period)",
      description:
        "Claims related to medical conditions you had before buying the policy are excluded until the mandatory waiting period ends.",
    },
    {
      id: 3,
      image: img9,
      title: "Hospital Stay Without Medical Advice",
      description:
        "Admissions done without a certified doctor’s written recommendation are not eligible for claim reimbursement.",
    },
  ];

  return (
    <>
      <div className="Health-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Section - Heading */}
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4 mb-md-0">
              <div className="Health-heading text-center text-md-start">
                <span className="d-block">LET'S</span>
                <h1 className="fw-bold display-5 m-0">INSURE</h1>
                <h1 className="fw-bold display-5">
                  <span style={{ paddingTop: "20px" }}>YOUR</span> HEALTH
                </h1>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <form className="Health-form p-4 border rounded shadow-sm">
                <div className="mb-3">
                  <label htmlFor="pincode" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    placeholder="E.g. 560001"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="E.g. 8429966832"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn btn-success w-100">
                  View Plans
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="health-info py-5">
        <div className="container">
          <div className="row align-item-center">
            <div className="col-lg-12 col-md-6 col-sm-12 text-center">
              <h1 className="head1">
                Your Health, Our Priority – Renew or Get a Health Policy in 2025
              </h1>
            </div>
            <div className="col-lg-12 col-md-sm-12 text-center">
              <h4 className="head4 d-flex align-content-f-start">
                Why Choosing the Right Health Insurance Matters More Than Ever
              </h4>
              <p className="para1">
                With healthcare expenses rising every year, selecting the right
                health insurance plan has become essential. According to recent
                government data, over 83.7% of Indians rely on their personal
                income or savings to pay for hospital bills. Additionally, more
                than 12% turn to loans or help from friends and family to manage
                medical costs. In India, medical inflation increases by about
                12-14% annually. That’s why health insurance isn’t just a
                short-term fix — it’s a long-term commitment. Think of it as a
                30–35-year plan to protect yourself and your loved ones from
                financial stress caused by unexpected medical emergencies. This
                guide will walk you through why health insurance is a smart
                investment, and how Digit Insurance can support you in managing
                rising healthcare costs. It's like having a reliable friend
                who's always ready to stand by your side, especially when life
                takes an unexpected turn.
              </p>
            </div>
          </div>
          <div className="row align-item-center">
            <div className="col-lg-12 col-md-6 col-sm-12 text-center">
              <h1 className="head1">What is a Health Insurance?</h1>
            </div>
            <div className="col-lg-12 col-md-sm-12 text-center">
              <p className="para1">
                Health insurance, also known as medical insurance, is a form of
                general insurance designed to protect you financially during
                health-related situations. Whether it's an illness, a chronic
                condition, or an accident, this type of insurance ensures you're
                not burdened with heavy medical bills. A well-tailored health
                insurance policy can cover a wide range of expenses, including
                pre and post-hospitalization care, yearly health check-ups,
                mental health support, treatment of critical illnesses, and even
                maternity care, depending on the plan you choose. Imagine it as
                your reliable companion—the one who steps in when you're unwell
                or simply feeling down, ensuring you always have support when
                you need it the most.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="what-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-12">
              <h1 className="fw-bold">Why Should You Get Health Insurance?</h1>
            </div>
          </div>

          <div className="row">
            {healthInsuranceCards.map((feature) => (
              <div
                key={feature.id}
                className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
              >
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column w-100">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="img-fluid mb-3"
                  />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="what-not-cover-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-12">
              <h1 className="fw-bold">
                What Is Not Covered Under Health Insurance?
              </h1>
            </div>
          </div>

          <div className="row">
            {healthInsuranceExclusions.map((feature) => (
              <div
                key={feature.id}
                className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
              >
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column w-100">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="img-fluid mb-3"
                  />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Healthinsurance;
