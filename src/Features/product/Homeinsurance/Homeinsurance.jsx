import React from "react";
import Reusechoose from "../../../Reuse/Reusechoose/Reusechoose";

import homeimg1 from "../../../assets/Homeimages/house.png";
import homeimg2 from "../../../assets/Homeimages/anti-theft.png";
import homeimg3 from "../../../assets/Homeimages/flooded-house.png";
import homeimg4 from "../../../assets/Homeimages/hole.png";
import homeimg5 from "../../../assets/Homeimages/unlocked.png";

import homeimgss1 from "../../../assets/Homeimages/wildfire.png";
import homeimgss2 from "../../../assets/Homeimages/building.png";
import homeimgss3 from "../../../assets/Homeimages/tornado.png";
import homeimgss4 from "../../../assets/Homeimages/flood.png";
import homeimgss5 from "../../../assets/Homeimages/earthquake.png";

import notcover1 from "../../../assets/Homeimages/damage.png";
import notcover2 from "../../../assets/Homeimages/collapse.png";
import Renewpolicy from "../../../Reuse/Renewpolicy/Renewpolicy";
import CarPremiumRate from "../../../Reuse/CarPremiumRate/CarPremiumRate";
import Insuranceclaim from "../../../Reuse/Insuranceclaim/Insuranceclaim";

import whyglobal1 from "../../../assets/Homeimages/claim.png";
import whyglobal2 from "../../../assets/Homeimages/file.png";
import whyglobal3 from "../../../assets/Homeimages/loan.png";
import whyglobal4 from "../../../assets/Homeimages/24-hours-support (1).png";

import whyglobal5 from "../../../assets/Homeimages/feedback.png";
import whyglobal6 from "../../../assets/Homeimages/time.png";

import NeedHelp from "../../../Reuse/NeedHelp/NeedHelp";

const Homeinsurance = () => {
  const Homefeatures3 = [
    {
      img: whyglobal1,
      title: "Hassle-Free Claims",
      description:
        "Filing a claim with Global Health is seamless, quick, and straightforward—ensuring your loss is minimized and your experience is smooth.",
    },
    {
      img: whyglobal2,
      title: "No Paperwork Needed",
      description:
        "Enjoy a 100% digital experience with Global Health. Purchase your policy or make claims without any paperwork! (Manual inspection applies for claims over ₹1 lakh as per IRDAI.)",
    },
    {
      img: whyglobal3,
      title: "Low Premium Costs",
      description:
        "Secure your home for as low as ₹150 per year*. Global Health’s plans are budget-friendly while offering strong protection for your property and belongings.",
    },
    {
      img: whyglobal4,
      title: "24x7 Customer Assistance",
      description:
        "Have questions or need help? Global Health’s support team is here for you around the clock—even on public holidays!",
    },
    {
      img: whyglobal5,
      title: "Trusted by Millions",
      description:
        "With over 3 crore satisfied customers, Global Health has earned the trust of homeowners all across the country.",
    },
    {
      img: whyglobal6,
      title: "Clear and Honest Terms",
      description:
        "Global Health keeps things simple and transparent—no hidden conditions, just straightforward protection you can rely on.",
    },
  ];

  const Homefeatures2 = [
    {
      img: notcover1,
      title: "Intentional House Damage",
      description:
        "Any intentional or deliberate destruction caused to your home is not included under the policy coverage.",
    },
    {
      img: homeimg3,
      title: "War and Related Activities",
      description:
        "Losses resulting from war, military conflicts, or similar hostile actions are excluded from the insurance protection.",
    },
    {
      img: homeimgss5,
      title: "Radiation & Contamination",
      description:
        "Harm caused by radioactive contamination or exposure to ionizing radiation is not covered.",
    },
    {
      img: notcover2,
      title: "Excluded Valuables",
      description:
        "Loss or damage to items such as raw precious stones, manuscripts, vehicles, or explosives is not covered.",
    },
    {
      img: homeimgss4,
      title: "Claim Preparation Costs",
      description:
        "Any fees or costs related to the preparation and submission of claims are not reimbursed by the policy.",
    },
    {
      img: homeimgss5,
      title: "Structural Modifications",
      description:
        "Expenses for major alterations or extensions that increase the house area by over 10% are not included.",
    },
  ];

  const Homefeatures1 = [
    {
      img: homeimgss1,
      title: "Fire",
      description:
        "Fires can cause severe destruction to your home and everything in it. With our home insurance, you’ll be protected against such unexpected disasters.",
    },
    {
      img: homeimgss2,
      title: "Explosion & Aircraft Damage",
      description:
        "Whether it’s a sudden explosion or an incident involving aircraft damage, our home insurance ensures you're financially protected from such rare but impactful events.",
    },
    {
      img: homeimgss3,
      title: "Storms",
      description:
        "Safeguard your home and possessions against intense storms that might result in unexpected destruction—our insurance has you covered.",
    },
    {
      img: homeimgss4,
      title: "Floods",
      description:
        "Heavy rains and flooding can take a toll on your property—our insurance helps cover those losses and keeps you stress-free during the monsoon madness.",
    },
    {
      img: homeimgss5,
      title: "Earthquakes",
      description:
        "Natural disasters like earthquakes can't be predicted, but you can be prepared. Our home insurance offers protection against any damage or loss caused by seismic activity.",
    },
  ];

  return (
    <>
      <Reusechoose
        heading="Why should I get a Home Insurance?"
        subheading="If you’re still confused about the need for a home insurance, read on..."
        features={[
          {
            image: homeimg1,
            title: "Extreme Weather",
            description:
              "India saw over 423,200 houses damaged this year as a result of harsh and unpredictable weather.",
          },
          {
            image: homeimg2,
            title: "Theft",
            description:
              "More than 220K theft cases were reported in India during 2020, affecting residences, businesses, and office spaces.",
          },
          {
            image: homeimg3,
            title: "Disaster",
            description:
              "According to a CSE report, India experienced extreme weather on 241 days between January and September 2022.",
          },
          {
            image: homeimg4,
            title: "House Sinking",
            description:
              "Nearly 80% of people in India reside in areas that are highly prone to natural calamities such as floods and earthquakes.",
          },
          {
            image: homeimg5,
            title: "Unlock Home",
            description:
              "You can also check out an article by our CMO, Vivek Chaturvedi, highlighting why it’s crucial for Indians to take home insurance more seriously.",
          },
        ]}
      />

      <div className="what-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-12">
              <h1 className="fw-bold">
                What’s Covered in Home Insurance by Global Health?
              </h1>
            </div>
          </div>
          <div className="row">
            {Homefeatures1.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4 ">
                <div
                  className="card shadow-lg p-4 text-center card-hover d-flex flex-column"
                  style={{ height: "400px" }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid mb-3"
                  />
                  <h4 className="fw-bold">{item.title}</h4>
                  <p className="flex-grow-1">{item.description}</p>
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
              <h1 className="fw-bold">What’s Not Covered?</h1>
            </div>
          </div>

          <div className="row">
            {Homefeatures2.map((feature) => (
              <div
                key={feature.id}
                className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
              >
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column w-100">
                  <img
                    src={feature.img}
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

      <Renewpolicy
        heading="How to Buy Home Insurance from Global Health?"
        steps={[
          {
            id: 1,
            title: "Step1",
            description:
              "Head over to Global Health’s Bharat Griha Raksha Insurance Policy page or download the Global Health Insurance App from the Play Store or App Store.",
          },
          {
            id: 2,
            title: "Step2",
            description:
              "Choose your property type and provide your basic details such as PIN code and mobile number.",
          },
          {
            id: 3,
            title: "Step3",
            description:
              "Click on Check Prices and proceed to enter your plan preferences. Add your home building details and confirm them. You can then pick the insurance plan that fits you best.",
          },
          {
            id: 4,
            title: "Step4",
            description:
              "Once the plan options appear, continue by entering owner-specific information like property owner’s name, mobile number, email ID, and PAN card number.",
          },
          {
            id: 5,
            title: "Step5",
            description:
              "Make a secure payment online using Debit/Credit Card, UPI, Net Banking, Wallet, or EMI options.",
          },
          {
            id: 4,
            title: "Step4",
            description:
              "For quick KYC verification, we’ll need some essential information to activate your policy instantly.",
          },
        ]}
      />

      <CarPremiumRate
        heading="Types of Home Insurance"
        tablehead="Only Content Cover"
        tablehead1="Building + Content Cover"
        tablehead2="Only Building Cover"
        tableData={[
          {
            capacity:
              "Covers only contents (i.e personal belongings) within your home.",
            oldPremium: "Covers both the building and contents of your home.",
            newPremium: "Covers your house building",
          },
        ]}
      />
      <Insuranceclaim
        heading="How to File a Claim?"
        paragraphs="Filing a claim with Global Health is a quick, simple and hassle-free process. We’ve listed out what you can do to file a claim with us:"
        steps={[
          {
            id: 1,
            title: "step1",
            description:
              "Call us at 9205401500. We will help you file a claim and investigate the loss or damage as required.",
          },
          {
            id: 2,
            title: "step2",
            description:
              "Upload the required documents & your bank account details, on the link sent.",
          },
          {
            id: 3,
            title: "step3",
            description: "We’ll take care of the rest!",
          },
        ]}
      />

      <div className="what-not-cover-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-12">
              <h1 className="fw-bold">Why Choose Global Health?</h1>
            </div>
          </div>

          <div className="row">
            {Homefeatures3.map((feature) => (
              <div
                key={feature.id}
                className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
              >
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column w-100">
                  <img
                    src={feature.img}
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

export default Homeinsurance;
