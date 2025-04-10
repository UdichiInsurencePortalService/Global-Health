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

const CarInsurance = () => {
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
    </>
  );
};

export default CarInsurance;
