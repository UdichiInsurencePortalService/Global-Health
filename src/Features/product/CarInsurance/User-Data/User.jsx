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
    // Log when component mounts
    console.log("User component mounted");
    
    // Retrieve vehicle details from localStorage
    try {
      const storedDetails = localStorage.getItem("vehicleDetails");
      console.log("Retrieved from localStorage:>>>>>>>>>>>>>>>>>>", storedDetails);
      
      if (storedDetails) {
        const parsedDetails = JSON.parse(storedDetails);
        console.log("Parsed vehicle details:", parsedDetails);
        setVehicleDetails(parsedDetails);
      } else {
        console.log("No vehicle details found in localStorage");
        msgApi.error("No vehicle details found. Please register a vehicle first.");
        setTimeout(() => navigate("/carinsurance"), 2000);
      }
    } catch (error) {
      console.error("Error retrieving vehicle details:", error);
      msgApi.error("Error loading vehicle details.");
      setTimeout(() => navigate("/carinsurance"), 2000);
    } finally {
      setLoading(false);
    }
  }, [navigate, msgApi]);

  const handleBack = () => {
    navigate("/carinsurance");  // Corrected path to /carinsurance
  };

  const handleViewPrice = () => {
    navigate("/user-data");
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid date
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <>
      {contextHolder}
      <div className="user-details-page">
        <div className="container">
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={24} lg={24}>
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
                        {vehicleDetails.insurance_company || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Address" span={2}>
                        {vehicleDetails.address || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Purchase Date" span={1}>
                        {formatDate(vehicleDetails.date_of_buy)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Maker/Model" span={1}>
                        {vehicleDetails.maker_model || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ex-Showroom Price" span={1}>
                        {vehicleDetails.ex_showroom_price || "1000000"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Financer" span={1}>
                        {vehicleDetails?.financer || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Register At (RTO)" span={1}>
                        {vehicleDetails?.register_at || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Vehicle Engine Number" span={1}>
                        {vehicleDetails?.engine_number || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Vehicle Chasi Number" span={1}>
                        {vehicleDetails?.chasi_number || "N/A"}
                      </Descriptions.Item>
                    
                    </Descriptions>
                    
                    <div className="view-price-button-container pt-2">
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