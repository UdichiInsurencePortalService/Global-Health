import React from "react";
import "./Autoinsurance.css";
import Reusechoose from "../../../Reuse/Reusechoose/Reusechoose";
// import first from "../../assets/reuseimage/vehicless.png"
import first from "../../../assets/reuseimage/vehicless.png"
import second from "../../../assets/reuseimage/gear.png"
import third from "../../../assets/reuseimage/24-hours-support.png"

import data1 from "../../../assets/autoaccident/auto-accident (1).png"
import data2 from "../../../assets/autoaccident/car-alarm.png"
import data3 from "../../../assets/autoaccident/fire.png"
import data4 from "../../../assets/autoaccident/landslide.png"
import data5 from "../../../assets/autoaccident/person.png"
import data6 from "../../../assets/autoaccident/businessman.png"
import data7 from "../../../assets/autoaccident/taxi.png"
import DepreciationCalculated from "../../../Reuse/DepreciationCalculated/DepreciationCalculated";

import Renewpolicy from "../../../Reuse/Renewpolicy/Renewpolicy";
import Insuranceclaim from "../../../Reuse/Insuranceclaim/Insuranceclaim"
import RequiredDocuments from "../../../Reuse/RequireDocuments/RequireDocument";
import NeedHelp from "../../../Reuse/NeedHelp/NeedHelp";





export const Autoinsurance = () => {

  const features = [
        {
          id: 1,
          image: first, // ✅ Replace with your actual image URL
          title: "Set Your Own Vehicle IDV",
          description:
            "We let you define your vehicle’s IDV based on your preference and need!",
        },
        {
          id: 2,
          image: second, // ✅ Replace with your actual image URL
          title: "Round-the-Clock Customer Support",
          description:
            "Available 24/7, even on public holidays – we’re always here to help you out.",
        },
        {
          id: 3,
          image: third, // ✅ Replace with your actual image URL
          title: "Quick & Easy Claim Process",
          description:
            "Use your smartphone to complete self-inspection in just a few minutes!",
        },
      ];

    const autoCard = [
        {
          id: 1,
          image: data1,
          title: "Accidents",
          description: "Damages caused to your auto rickshaw in case of an accident.",
        },
        {
          id: 2,
          image: data2,
          title: "Theft",
          description: "Loss or damage of your auto rickshaw due to theft.",
        },
        {
          id: 3,
          image: data3,
          title: "Fire",
          description: "Damages caused to your auto rickshaw due to a fire.",
        },
        {
          id: 4,
          image: data4,
          title: "Natural Disasters",
          description: "Damages caused to your auto rickshaw due to any natural calamity.",
        },
        {
          id: 5,
          image: data5,
          title: "Personal Accident",
          description: "If your auto rickshaw meets with an accident, leading to an injury or death of you or the driver using it.",
        },
        {
          id: 6,
          image: data6,
          title: "Third Party Losses",
          description: "Any damages caused by your auto rickshaw to a third party or its passengers.",
        },
        {
          id: 7,
          image: data7,
          title: "Towing Disabled Vehicles",
          description: "Any damages caused to your auto rickshaw in cases where it's being towed.",
        },
      ];
      

  return (
    <>
      <div className="Auto-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Section - Heading */}
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4 mb-md-0">
              <div className="Auto-heading text-center text-md-start">
                <span className="d-block">LET'S</span>
                <h1 className="fw-bold display-5 m-0">INSURE</h1>
                <h1 className="fw-bold display-5">
                  <span style={{ paddingTop: "20px" }}>YOUR</span> AUTO
                </h1>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <form className="Auto-form p-4 border rounded shadow-sm">
                <div className="mb-3">
                  <label htmlFor="pincode" className="form-label">
                    Enter register Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    placeholder="E.g. KA04DK8337"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">
                    Enter Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="E.g. 8429966832"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  View Plans
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="auto-info py-5">
        <div className="container">
          <div className="row align-item-center">
            <div className="col-lg-12 col-md-6 col-sm-12 text-center">
              <h1 className="head1 d-flex align-content-f-start">
                Get the Best Deals on 3-Wheeler Insurance – Renew Online
              </h1>
            </div>
            <div className="col-lg-12 col-md-sm-12r">
              <p className="para1">
                Auto rickshaws, also known as three-wheelers, play a vital role
                in India's public transport system and are widely used across
                the country. However, their high usage also leads to a greater
                risk of accidents. That’s why having a reliable auto rickshaw
                insurance policy is essential for protection.{" "}
              </p>
              <p className="para1">
              So, here’s a 2025 guide for three-wheeler auto insurance to help you buy/renew the best auto rickshaw insurance policy in India.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="info-section">
        <h2>What is Auto Rickshaw Insurance?</h2>
        <p>
          An auto rickshaw insurance is a type of commercial vehicle insurance policy 
          designed to protect and suit the needs of a three-wheelers in India.
        </p>
        <p>
          It’s mandatory for all auto rickshaw owners to at least have a third-party 
          auto rickshaw insurance to financially protect them from third-party liabilities. 
          However, you can buy a comprehensive auto rickshaw policy for enhanced coverage.
        </p>
        <p>
          Digit Insurance provides auto owners with both such policies at, affordable 
          and customized premium prices.
        </p>
      </div>

      <div className="info-section">
        <h2>Is Having Auto Rickshaw Insurance Mandatory?</h2>
        <p>
          Yes, according to the Motor Vehicles Act in India, it is compulsory for all 
          vehicles to have at least a Liability Only Policy in place. Without this, it 
          would be illegal to ride an auto rickshaw in India.
        </p>
        <p>
          However, if you’re using your auto rickshaw as a primary source of income or, 
          as part of a business, then it is advised to have the Standard Package Policy, 
          as that not only covers the damages caused to third parties by your auto 
          rickshaw but, also covers for damages caused to your own vehicle and the 
          owner-driver against damages caused due to accidents, collisions, natural 
          calamities, fires and other such mishaps.
        </p>
      </div>
      <Reusechoose
        heading="Why Should You Buy Global Health & Allied Insurance Service Auto Insurance"
        subheading="We treat our customers like VIPs, know how…"
        features={features}
      />

      <div className="what-cover-section py-5">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-12">
            <h1 className="fw-bold">Why Should You Get Auto Insurance?</h1>
          </div>
        </div>

        <div className="row">
          {autoCard.map((feature) => (
            <div
              key={feature.id}
              className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
            >
              <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column w-100">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="img-fluid mb-3"
                  style={{ maxHeight: "80px", objectFit: "contain" }}
                />
                <h4 className="fw-bold">{feature.title}</h4>
                <p className="flex-grow-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <DepreciationCalculated 
    heading="Key Features of e-Rickshaw Insurance by Global Health"
    tablehead="Key Features	"
    tablehead1="Global Benefit"
    tableData={[
      {
        duration : "Premium",
        discount : "Starting from ₹1339",
      },
      {
        duration : "Claim Process",
        discount : "Paperless Claims "
      },
      {
        duration: "Customer Support",
        discount : "24x7 Support",
      },
      {
        duration : "Additional Coverage",
        discount: "PA Covers, Legal Liability Cover, Special Exclusions and Compulsory Deductibles, etc.",
      },
      {
        duration: "Damages to Third-Party",
        discount: "Unlimited Liability for Personal Damages, Up to 7.5 Lakhs for Property/Vehicle Damages "
      }
    ]}
    />

    <DepreciationCalculated 
    heading="Third Party Premiums for E-Rickshaws"
    para="Here is the e-rickshaw insurance price list for third party plans in India. These prices are fixed by the IRDAI in 2024 for electric three-wheeler vehicles carrying passengers, with a capacity of up to six passengers."
    tablehead="Segment"
    tablehead1="Premium Rate (effective January 2024)"
    tableData={[
      {
        duration: "Basic Premium",
       discount: "₹1,539",
      },
      {
        duration: "For Each Passenger",
        discount: "737",
      }
    ]}
    />

    <Renewpolicy
            heading="How to Buy E-Rickshaw Insurance Online with Global Health?"
            steps={[
              {
                id: 1,
                title: "Step1",
                description: "Go to the Global Health app or website. Enter your electric 3-wheeler’s registration number and mobile number, then click on ‘View Prices’.",
              },
              {
                id: 2,
                title: "Step2",
                description: "Pick the insurance plan that suits you best, choose add-ons if needed, set your preferred IDV, and then hit ‘Continue.’",
              },
              {
                id: 3,
                title: "Step3",
                description: "Provide your personal, nominee, and vehicle details, and click on ‘Pay Now.’",
              },
              {
                id: 4,
                title: "Step4",
                description: "Complete your payment and go through the mandatory KYC verification.",
              },
              {
                id: 5,
                title: "Step5",
                description: "All done! You’ll get your policy document via email, SMS, and WhatsApp. You can also access it anytime on the Global Health App.",
              }
            ]}
          />

          <RequiredDocuments
          heading="Documents Required to Buy E-Rickshaw Insurance Online"
          description="To get electric three-wheeler insurance online from Global Health, keep these documents handy:" 
          list={[
            "Vehicle Registration Certificate (RC)",
            "Previous year commercial vehicle insurance policy, if applicable",
            "Any document among these for KYC verification - PAN/Aadhar/DL/Voter id/Form 16/Passport",
          ]}
          />
          
          <Insuranceclaim
          heading="How to File a Claim with Global Health?"
          paragraphs="To file a claim against e-rickshaw insurance online, follow these steps:"
          steps={[
            {
              id: 1,
              title: "step1",
              description: "Inform your insurer as soon as possible by calling Digit on 9205401500 or dropping an email at globalhealth235@gmail.com."
            },
            {
              id: 2,
              title: "step2",
              description: "Keep your details handy such as policy number, location of the accident, date and time of the accident, and contact number of the insured/caller to make the process easier."
            },
            {
              id: 3,
              title: "step3",
              description: "Present the required documents required to file the claim and wait for the insurers to verify the details. Upon verifying, your claim will be processed."
            },

          ]}
          />

<Renewpolicy
            heading="How to Renew E-Rickshaw Policy with Global Health?"
            steps={[
              {
                id: 1,
                title: "Step1",
                description: "Go to Global Health website and click on the ‘My Policy’ tab.",
              },
              {
                id: 2,
                title: "Step2",
                description: "Select the policy pending for tractor insurance renewal and click on ‘Renew Policy.’",
              },
              {
                id: 3,
                title: "Step3",
                description: "Now select the plan, IDV, add-ons and confirm the details, then click on ‘Pay Now.’",
              },
              {
                id: 4,
                title: "Step4",
                description: "You’re done! You’ll receive the policy document via email, SMS and WhatsApp. Also, you can access it 24X7 on the Digit App.",
              }
            ]}
          />

<DepreciationCalculated 
    heading="Electric Auto Rickshaws in India in 2025"
    para="Here is a list of the most popular electric three-wheelers in India in 2025:"
    tablehead="Name of the Model 	"
    tablehead1="Ex-showroom Price"
    tableData={[
      {
        duration: "Saarthi DLX",
       discount: "₹90,000",
      },
      {
        duration: "Atul Elite Plus",
        discount: "₹1.12 Lakh",
      },
      {
        duration: "Atul Elite Plus",
       discount: "₹1.12 Lakh",
      },
      {
        duration: "Kinetic Safar Smart",
       discount: "₹1.45 Lakh",
      },
      {
        duration: "Lohia Narain DX",
       discount: "₹1.65 Lakh",
      },
      {
        duration: "Lohia Humsafar IAQ",
       discount: "₹1.80 Lakh",
      },
      {
        duration: "Mahindra e-Alfa Super",
       discount: "₹1.82 Lakh ",
      },
      {
        duration: "Piaggio Ape e-city",
       discount: "₹1.95 Lakh",
      },
      {
        duration: "Mahindra Treo Yaari",
       discount: "₹1.96 Lakh",
      },
      {
        duration: "Bajaj RE E TEC 9",
       discount: "₹3.07 Lakh ",
      },
    ]}
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
export default Autoinsurance;
