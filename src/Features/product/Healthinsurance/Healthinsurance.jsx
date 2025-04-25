import React, { useState } from "react";
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

import Reusechoose from "../../../Reuse/Reusechoose/Reusechoose";

import cost from "../../../assets/health-images/cost.png";
import money from "../../../assets/health-images/money.png";
import care from "../../../assets/health-images/care.png";
import backup from "../../../assets/health-images/backup.png";
import inpatient from "../../../assets/health-images/inpatient (1).png";
import openmind from "../../../assets/health-images/open-mind.png";
import CarPremiumRate from "../../../Reuse/CarPremiumRate/CarPremiumRate";
import DepreciationCalculated from "../../../Reuse/DepreciationCalculated/DepreciationCalculated";
import Insuranceclaim from "../../../Reuse/Insuranceclaim/Insuranceclaim";
import document1 from "../../../assets/Documentpfoto/search.png";
import document2 from "../../../assets/Documentpfoto/burn.png";
import document3 from "../../../assets/Documentpfoto/age.png";
import document4 from "../../../assets/Documentpfoto/financial-statement.png";
import document5 from "../../../assets/Documentpfoto/health-report (1).png";
import document6 from "../../../assets/Documentpfoto/accepted.png";

import document7 from "../../../assets/Documentpfoto/clock.png";
import document8 from "../../../assets/Documentpfoto/Paperless.png";
import document9 from "../../../assets/Documentpfoto/houses.png";
import document10 from "../../../assets/Documentpfoto/piggy-bank.png";
import document11 from "../../../assets/Documentpfoto/employee-benefit.png";

// right icone for Document
import icones from "../../../assets/Documentpfoto/next.png";

import NeedHelp from "../../../Reuse/NeedHelp/NeedHelp";

const Healthinsurance = () => {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const handleOpenModal = (index) => {
    setOpenModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };

  const document = [
    {
      id: 1,
      image: document1,
      title: "Identify Proof",
      icone: icones,
      description: [
        " Aadhaar Card",

        "PAN Card",

        " Passport",

        "  Voter ID",

        " Driving License",
      ],
    },
    {
      id: 3,
      image: document3,
      title: "Age Proof",
      icone: icones,
      description: [
        "Birth Certificate",

        "Aadhaar Card",

        "Passport",

        "School Leaving Certificate",
      ],
    },

    {
      id: 5,
      image: document5,
      title: "Medical History",
      icone: icones,
      description: [
        " Pre-policy medical check-up (for higher coverage or older age applicants)",
      ],
    },
  ];

  const onlineInsuranceBenefits = [
    {
      id: 1,
      image: document7,
      title: "Quick & Effortless Purchase",
      description:
        "Buy your health insurance policy online within minutes – no waiting, no hassle, just a few simple steps.",
    },
    {
      id: 2,
      image: document8,
      title: "Completely Contactless",
      description:
        "Enjoy a seamless, zero-touch experience without any need for in-person meetings or physical documents.",
    },
    {
      id: 3,
      image: document9,
      title: "Smart & Easy Comparisons",
      description:
        "Access detailed plan comparisons and make informed choices right from the comfort of your home.",
    },
    {
      id: 4,
      image: document10,
      title: "More Savings, No Middlemen",
      description:
        "Cut out the agents and extra charges—buying directly online often means lower premiums and better deals.",
    },
    {
      id: 5,
      image: document11,
      title: "Exclusive Wellness Perks",
      description:
        "Get access to value-added services like home healthcare, yoga, teleconsultations, and more through the insurer’s app.",
    },
  ];

  // const onlineInsuranceBenefits = [
  //   {
  //     id: 1,
  //     title: "Faster Policy Issuance",
  //     description:
  //       "Get your health insurance policy instantly without waiting for physical paperwork or agent visits.",
  //   },
  //   {
  //     id: 2,
  //     title: "100% Paperless Process",
  //     description:
  //       "Experience a completely digital journey with zero need for printing or scanning any documents.",
  //   },
  //   {
  //     id: 3,
  //     title: "Compare & Choose Easily",
  //     description:
  //       "Browse multiple plans, compare features, premiums, and inclusions from the comfort of your home.",
  //   },
  //   {
  //     id: 4,
  //     title: "Lower Premiums",
  //     description:
  //       "Avoid agent commissions and hidden fees – buying directly online often means better prices.",
  //   },
  //   {
  //     id: 5,
  //     title: "Access to Wellness Tools",
  //     description:
  //       "Unlock digital perks like fitness tracking, diet tips, mental wellness programs and doctor consultations on insurer apps.",
  //   },
  // ];

  const healthPlans = [
    {
      id: 1,
      amount: "3.5 Lacs",
      title: "Health Insurance Plan",
    },
    {
      id: 2,
      amount: "5 Lacs",
      title: "Health Insurance Plan",
    },
    {
      id: 3,
      amount: "7.5 Lacs",
      title: "Health Insurance Plan",
    },
    {
      id: 4,
      amount: "10 Lacs",
      title: "Health Insurance Plan",
      recommended: true,
    },
    {
      id: 5,
      amount: "12.5 Lacs",
      title: "Health Insurance Plan",
    },
    {
      id: 6,
      amount: "15 Lacs",
      title: "Health Insurance Plan",
    },
  ];

  const feature = [
    {
      id: 1,
      image: cost, // e.g., medical-cost.svg
      title: "Covers Medical Costs",
      description:
        "Health insurance helps manage expensive medical bills – including both pre and post-hospitalization expenses – which could otherwise drain your savings. With many relying on costly private healthcare facilities, a policy ensures you're financially protected during medical emergencies.",
    },
    {
      id: 2,
      image: money, // e.g., tax-saving.svg
      title: "Tax Benefits Under Section 80D",
      description:
        "Enjoy added tax savings by purchasing health insurance for yourself or your family. Premiums paid are eligible for tax deductions under Section 80D of the Income Tax Act – a great way to save while staying protected.",
    },
    {
      id: 3,
      image: care, // e.g., critical-illness.svg
      title: "Protection from Critical Illnesses",
      description:
        "Serious illnesses like cancer or heart conditions can impact anyone, even those under 40. A good health insurance plan shields you from the heavy financial burden of treating such critical health conditions.",
    },
    {
      id: 4,
      image: backup, // e.g., financial-backup.svg
      title: "Strong Financial Backup",
      description:
        "Health insurance isn’t just about medical bills – it’s about peace of mind. It keeps you financially secure during health setbacks and offers long-term perks like no-claim bonuses, making it a smart investment.",
    },
    {
      id: 5,
      image: inpatient, // e.g., timely-treatment.svg
      title: "Timely Access to Treatment",
      description:
        "When health emergencies strike, delay in treatment can be risky. Health insurance ensures you or your family receive proper care without financial hesitation. Annual checkups included in plans also help with early diagnosis.",
    },
    {
      id: 6,
      image: openmind, // e.g., peace-of-mind.svg
      title: "Peace of Mind During Emergencies",
      description:
        "Knowing that your health expenses are taken care of brings a sense of comfort. In uncertain times, having a policy that supports you is like having someone to count on when it matters most.",
    },
  ];

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
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
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
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
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
      <Reusechoose
        heading="Why Should You Buy Global Health & Allied Insurance Service Health Insurance"
        subheading="We treat our customers like VIPs, know how…"
        features={feature}
      />
      <DepreciationCalculated
        heading="How Buying Health Insurance with Global-Health is Better than Everyone?"
        tablehead="Benefit"
        tablehead1="Global Health Insurance"
        tableData={[
          {
            duration: "Buying Process",
            discount:
              "On your fingertip and quick online process with less documentation",
          },
          {
            duration: "Claim Settlement",
            discount: "High claim settlement ratio with quick processing",
          },
          {
            duration: "Co-Payment",
            discount: "Get treated anywhere in India",
          },
          {
            duration: "Sum Insured Refilling",
            discount:
              "Get your sum insured refilled on full exhaustion of it during the policy period at no extra cost",
          },
          {
            duration: "Worldwide Coverage",
            discount: "Offers worldwide coverage for emergency treatments",
          },
          {
            duration: "Cumulative Bonus",
            discount: "Offers up to 60% cumulative bonus for claim-free years",
          },
          {
            duration: "Wellness Benefits",
            discount:
              "Avail a range of discounts and benefits on health and fitness services from 20+ top-rated health and wellness partners",
          },
          {
            duration: "Cashless Network Hospitals",
            discount: "Extensive network of cashless hospitals across India",
          },
        ]}
      />

      <DepreciationCalculated
        heading="Key Benefits of Health Insurance by Global Health "
        para={[
          "Globa Health's health insurance plan offers a range of exclusive benefits designed to enrich your coverage. Here’s what you can expect:",
        ]}
        tablehead="Benefit"
        tablehead1="Details "
        tableData={[
          {
            duration: "Co-payment",
            discount: "No",
          },
          {
            duration: "Sum Insured Refilling",
            discount: "No",
          },
          {
            duration: "Cashless Hospitals",
            discount: "9000+ Network Hospitals across India ",
          },
          {
            duration: "Wellness Benefits",
            discount: "Available from 10+ Wellness Partners",
          },
          {
            duration: "City Based Discount",
            discount: "Up to 10% Discount",
          },
          {
            duration: "Good Health Discount",
            discount: "Up to 5% Discount",
          },
          {
            duration: "Consumables Cover",
            discount: "Available as an Add-on",
          },
        ]}
      />

      <Insuranceclaim
        heading="How to buy Health Insurance Policy Online"
        pa
        steps={[
          {
            title: "Step 1",
            description:
              "On the Global Healtth app or website, enter your PIN Code and Mobile Number, and click ‘View Prices’.",
          },
          {
            title: "Step 2",
            description:
              "Select family members to insure, add age of the eldest member and click ‘Continue' to choose your Sum Insured, Plan and Add-ons.",
          },
          {
            title: "step 3",
            description:
              "Next, enter the details of each family member and click ‘Pay Now' to complete the payment and mandatory KYC verification process.",
          },
          {
            title: "step 4",
            description:
              "You’re done! You’ll receive the policy document via email, SMS and WhatsApp. Also, you can access it 24X7 on the Digit App.",
          },
        ]}
      />

      <div className="document-section">
        <div className="container">
        <div className="row justify-content-center">
  <div className="col-lg-10 col-md-10 col-sm-12 text-center">
    <h1 className="fw-bold mb-4">
      Documents Required to Buy a Health Insurance Online
    </h1>
    <p className="text-muted">
      When purchasing a health insurance policy, insurers typically require
      some basic documents for verification. Below is a list of optional
      documents that can be needed at the time of purchasing a policy:
    </p>
  </div>
</div>

          <div className="row">
            {document.map((item, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-4 col-sm-6"
                onClick={() => handleOpenModal(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="card shadow-lg  d-flex flex-column "style={{ marginBottom: "1.2rem" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid mb-3"
                    style={{ width: "100px", padding: "15px",}}
                  />
                  <div
                    className="fw-bold text-center"
                    style={{ textAlign: "center", fontSize: "19px" }}
                  >
                    {item.title}
                    <img
                      src={item.icone}
                      alt={item.title}
                      className="img-fluid"
                      style={{ width: "50px", padding: "15px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal - render only one */}
          {openModalIndex !== null && (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
              tabIndex="-1"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {document[openModalIndex].title}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* <img
                      src={document[openModalIndex].image}
                      alt={document[openModalIndex].title}
                      className="img-fluid mb-3"
                      style={{width: "60px"}}
                    /> */}
                    <ul>
                      {document[openModalIndex].description.map((item, idx) => (
                        <li key={idx} className="mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="Coverage-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h1 className="fw-bold mb-3">
                Choose Health Insurance Coverage of Your Choice
              </h1>
              <p className="text-muted">
                Select from a variety of health plans based on your needs and
                budget.
              </p>
            </div>
          </div>

          <div className="row">
            {healthPlans.map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                <div className="card h-100 shadow-sm border-0 rounded-4 text-center p-4 position-relative hover-shadow transition" style={{ marginBottom: "1.2rem" }}>
                  {item.recommended && (
                    <span className="badge bg-success position-absolute top-0 start-50 translate-middle-x mt-2">
                      Recommended
                    </span>
                  )}
                  <h3 className="fw-bold mt-3">{item.amount}</h3>
                  <p className="text-muted">{item.title}</p>
                  {/* <button className="btn btn-outline-primary mt-3">Choose Plan</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="why10lakh-section  bg-white rounded-xl shadow-md"
      >
        <h2
          className="text-2xl font-bold text-black-800 mb-4 text-center"
          style={{ fontSize: "35px", fontWeight: "600", fontStyle: "italic" }}
        >
          Why ₹10 Lakh Health Insurance Makes Sense
        </h2>
        <p className="text-gray-700 leading-relaxed text-start px-5">
          Medical costs are rising every year, and even a short hospital stay
          can burn a hole in your pocket. A ₹10 lakh health insurance plan gives
          you solid coverage for most medical treatments without being too
          expensive.
          <br />
          <br />
          Whether it’s surgery, an ICU stay, or multiple doctor visits – ₹10
          lakh can handle it without putting pressure on your savings. It’s the
          kind of coverage that balances protection and affordability.
          <br />
          <br />
          You get the freedom to focus on your recovery, not your bills. And
          most importantly, it gives peace of mind knowing that unexpected
          health problems won’t turn into financial stress.
        </p>
      </div>

      <Reusechoose
        heading="Why Should You Buy Health Insurance?"
        subheading="We treat our customers like VIPs, know how…"
        features={onlineInsuranceBenefits}
      />
      <NeedHelp
        heading="Need Help?"
        paragraph="Have queries related to Digit motor insurance policy? You can refer to our Policy Wordings for detailed information or reach out to our support team via WhatsApp self-support, email or phone using the information below:"
        head={["WhatsApp", "Email", "Contact"]}
        contact={[
          {
            cont: "Connect with our self-serve chat bot support - 9818152403",
          },
          {
            conta: "Connect Write to us at globalhealth@235@gmail.com",
          },
          {
            conatac: "Call us on 9818152403",
          },
        ]}
      />
    </>
  );
};

export default Healthinsurance;
