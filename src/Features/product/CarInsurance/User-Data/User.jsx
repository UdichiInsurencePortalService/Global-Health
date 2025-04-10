// ye page vo vala hai jha pr user ka data hai sirf 

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Descriptions, Button, message, Spin } from "antd";
import { CarOutlined, ArrowLeftOutlined, DollarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./userdata.css";

const User = () => {
  const navigate = useNavigate();
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msgApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // Retrieve vehicle details from localStorage
    try {
      const storedDetails = localStorage.getItem("vehicleDetails");
      if (storedDetails) {
        setVehicleDetails(JSON.parse(storedDetails));
      } else {
        msgApi.error("No vehicle details found. Please register a vehicle first.");
        setTimeout(() => navigate("carinsurance"), 2000);
      }
    } catch (error) {
      console.error("Error retrieving vehicle details:", error);
      msgApi.error("Error loading vehicle details.");
    } finally {
      setLoading(false);
    }
  }, [navigate, msgApi]);

  const handleBack = () => {
    navigate("carinsurance");
  };

  const handleViewPrice = () => {
    navigate("/user-data");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <>
      {contextHolder}
      <div className="user-details-page">
        <div className="container">
          <Row gutter={[24, 24]} justify="center">
            <Col xs={29} md={29} lg={38}>
              <div className="navigation-section">
                <Button 
                  icon={<ArrowLeftOutlined />} 
                  onClick={handleBack}
                  size="large"
                  className="back-button"
                >
                  Back to Registration
                </Button>
              </div>
              
              {loading ? (
                <div className="loading-container">
                  <Spin size="large" />
                  <p>Loading vehicle details...</p>
                </div>
              ) : vehicleDetails ? (
                <>
                  <Card 
                    className="vehicle-details-card" 
                    title={
                      <div className="card-title">
                        <CarOutlined className="title-icon" />
                        <span>Vehicle Details - {vehicleDetails.vehicle_no}</span>
                      </div>
                    }
                    bordered={false}
                  >
                    <Descriptions 
                      bordered 
                      column={{ xs: 1, sm: 1, md: 2 }}
                      size="large"
                      labelStyle={{ fontWeight: "bold", backgroundColor: "#f5f7fa" }}
                      contentStyle={{ backgroundColor: "#fff" }}
                      className="details-table"
                    >
                      <Descriptions.Item label="Registration Number" span={1}>
                        {vehicleDetails.vehicle_no}
                      </Descriptions.Item>
                      <Descriptions.Item label="Owner Name" span={1}>
                        {vehicleDetails.owner || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Registration Date" span={1}>
                        {formatDate(vehicleDetails.registration_date)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Fuel Type" span={1}>
                        {vehicleDetails.fuel_type || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Color" span={1}>
                        {vehicleDetails.color || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Insurance Company" span={1}>
                        {vehicleDetails.insurance_company}
                      </Descriptions.Item>
                      <Descriptions.Item label="Address" span={2}>
                        {vehicleDetails.address || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Purchase Date" span={1}>
                        {formatDate(vehicleDetails.date_of_buy)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ex-Showroom Price" span={1}>
                        ₹{vehicleDetails.ex_showroom_price?.toLocaleString() || "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                    
                    <div className="view-price-button-container">
                      <Button 
                        type="primary" 
                        size="large" 
                        icon={<DollarOutlined />} 
                        onClick={handleViewPrice}
                        className="view-price-button"
                      >
                        View Price
                      </Button>
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="error-card">
                  <p>No vehicle details available. Please register a vehicle first.</p>
                  <Button type="primary" onClick={handleBack} size="large">
                    Go to Registration
                  </Button>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default User;