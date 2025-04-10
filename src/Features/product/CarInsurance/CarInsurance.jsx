import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  message
} from "antd";
import { CarOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./CarInsurance.css";
import own1 from '../../../assets/own1.png'
import drunk2 from '../../../assets/drunk2.png'
import driving3 from '../../../assets/driving3.png'
import consequential4 from '../../../assets/consequential4.png'
import contributory5 from '../../../assets/contributory5.png'
import car from '../../../assets/car.png'
import theft from '../../../assets/theft.png'
import fire from '../../../assets/fire.png'
import dia from '../../../assets/dia.png'
import acci from '../../../assets/acci.png'
import third from '../../../assets/third.png'
import add6 from '../../../assets/add6.png'






const CarInsurance = () => {
  const features2 = [
    {
      id: 1,
      title: "Own Damages for Third-Party Policy Holder",
      img: own1,
      text: "In the case of a Third-Party or Liability Only Car Policy, damages to own vehicle won’t be covered.",
    },
    {
      id: 2,
      title: "Drunk Driving or without a Licence",
      img: drunk2,
      text: "You were driving drunk or without a valid driving licence.",
    },
    {
      id: 3,
      title: "Driving without a Valid Driving Licence Holder",
      img: driving3,
      text: "You hold a learner’s licence and were driving without a valid driving licence-holder in the front passenger seat.",
    },
    {
      id: 4,
      title: "Consequential Damages",
      img: consequential4,
      text: "Any damage which is not a direct result of the accident (e.g. after an accident, if the damaged car is driven incorrectly and the engine gets damaged, it will not be covered)",
    },
    {
      id: 5,
      title: "Contributory Negligence",
      img: contributory5,
      text: "Any contributory negligence (e.g., damage due to driving a car in a flood, which is not recommended as per the manufacturer’s driving manual, will not be covered)",
    },
    {
      id: 6,
      title: "Add-Ons Not Bought",
      img: add6,
      text: "Some situations are covered in add-ons. If you haven’t bought those add-ons, the corresponding situations will not be covered.",
    },
  ];

  const features = [
    {
      id: 1,
      title: "Accidents",
      img: car,
      text: "Damages and losses that may arise out of accidents and collisions",
    },
    {
      id: 2,
      title: "Theft",
      img: theft,
      text: "Covers for the losses incurred when your car is unfortunately stolen",
    },
    {
      id: 3,
      title: "Fire",
      img: fire,
      text: "Damages and losses caused to your car due to an accidental fire",
    },
    {
      id: 4,
      title: "Natural Disasters",
      img: dia,
      text: "Damages and losses to your car in case of natural calamities such as floods, cyclones, etc.",
    },
    {
      id: 5,
      title: "Personal Accident",
      img: acci,
      text: "If there is a car accident and unfortunately, it leads to death or disability of the owner",
    },
    {
      id: 6,
      title: "Third-Party Losses",
      img: third,
      text: "In cases where your car causes damages and losses to someone else, their car or property.",
    },
  ];     



  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regNum = registrationNumber.trim().toUpperCase();
    const mobile = mobileNumber.trim();

    if (!regNum) return msgApi.error("Please enter a registration number.");
    if (!mobile || !/^\d{10}$/.test(mobile)) return msgApi.error("Enter a valid 10-digit mobile number.");

    setLoading(true);
    try {
      // ✅ Step 1: Fetch from Surepass API
      const response = await fetch(import.meta.env.VITE_SUREPASS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_SUREPASS_TOKEN,
        },
        body: JSON.stringify({ id_number: regNum }),
      });

      const data = await response.json();

      if (data.success) {
        const vehicleData = data.data;

        // ✅ Step 2: Save full payload to backend
        const payload = {
          registrationNumber: regNum,
          mobileNumber: mobile,
          vehicleData
        };

        try {
          const backendRes = await fetch(import.meta.env.VITE_LOCALHOST_CAR_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });

          if (!backendRes.ok) {
            console.warn("Warning: Backend save failed");
            msgApi.warning("Vehicle details retrieved but saving failed.");
          }
        } catch (backendErr) {
          console.error("Backend error:", backendErr);
          msgApi.warning("Vehicle retrieved but backend error occurred.");
        }

        // ✅ Step 3: Save trimmed summary for next page
        const summary = {
          vehicle_no: regNum,
          registration_date: vehicleData.registration_date,
          owner: vehicleData.owner_name,
          fuel_type: vehicleData.fuel_type,
          color: vehicleData.color,
          insurance_company: vehicleData.insurance_company || "N/A",
          address: vehicleData.permanent_address,
          date_of_buy: vehicleData.registration_date,
          ex_showroom_price: 1000000 // Placeholder
        };

        localStorage.setItem("vehicleDetails", JSON.stringify(summary));
        setTimeout(() => navigate("/user"), 1000);
      } else {
        msgApi.error("Invalid registration number or no data found.");
      }
    } catch (error) {
      console.error("Surepass API error:", error);
      msgApi.error("Error fetching vehicle data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="car-insurance-container py-5">
        <div className="container">
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={12}>
              <Card className="registration-card" bordered={false}>
                <h2 className="text-center mb-4">Vehicle Registration</h2>
                <form onSubmit={handleSubmit}>
                  <label>Vehicle Registration Number</label>
                  <Input
                    placeholder="E.g. KA04DK8337"
                    size="large"
                    prefix={<CarOutlined />}
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                    className="mb-3"
                  />

                  <label>Mobile Number</label>
                  <Input
                    placeholder="Enter 10-digit mobile number"
                    size="large"
                    prefix={<PhoneOutlined />}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength={10}
                    className="mb-3"
                  />

                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    block
                  >
                    {loading ? "Fetching..." : "Get Details"}
                  </Button>
                </form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

{/*  */}


<div className="car-section-info">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>What is Car Insurance?</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p>Car Insurance, also known as auto or motor insurance, is a type of vehicle insurance policy that protects you and your car from any risks and damages caused by accidents, thefts, or natural disasters.</p>
              <p>In addition to that, it protects you from third-party liabilities, ensuring financial security in case of any unforeseen circumstances.</p>
              <p>Whether you want to legally comply with the law with basic third-party insurance or opt for comprehensive protection, you can customize your IDV and add-ons to suit your needs.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="what-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-8">
              <h1 className="fw-bold">What’s Covered in Car Insurance?</h1>
            </div>
          </div>
          <div className="row">
            {features.map((feature) => (
              <div key={feature.id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column">
                  <img src={feature.img} alt={feature.title} className="img-fluid mb-3" />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="what-not-cover-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-8">
              <h1 className="fw-bold">What’s Not Covered?</h1>
              <p>It is equally important to know what’s not covered in your car insurance policy to avoid surprises when you make a claim.</p>
            </div>
          </div>
          <div className="row">
            {features2.map((feature) => (
              <div key={feature.id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column">
                  <img src={feature.img} alt={feature.title} className="img-fluid mb-3" />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p className="flex-grow-1">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarInsurance;
