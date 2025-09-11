// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Descriptions, Button, message, Spin } from "antd";
// import { CarOutlined, ArrowLeftOutlined, DollarOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import "./userdata.css";

// const User = () => {
//   const navigate = useNavigate();
//   const [vehicleDetails, setVehicleDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [msgApi, contextHolder] = message.useMessage();

//   useEffect(() => {
//     // Log when component mounts
//     console.log("User component mounted");
    
//     // Retrieve vehicle details from localStorage
//     try {
//       const storedDetails = localStorage.getItem("vehicleDetails");
//       console.log("Retrieved from localStorage:>>>>>>>>>>>>>>>>>>", storedDetails);
      
//       if (storedDetails) {
//         const parsedDetails = JSON.parse(storedDetails);
//         console.log("Parsed vehicle details:", parsedDetails);
//         setVehicleDetails(parsedDetails);
//       } else {
//         console.log("No vehicle details found in localStorage");
//         msgApi.error("No vehicle details found. Please register a vehicle first.");
//         setTimeout(() => navigate("/carinsurance"), 2000);
//       }
//     } catch (error) {
//       console.error("Error retrieving vehicle details:", error);
//       msgApi.error("Error loading vehicle details.");
//       setTimeout(() => navigate("/carinsurance"), 2000);
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate, msgApi]);

//   const handleBack = () => {
//     navigate("/carinsurance");  // Corrected path to /carinsurance
//   };

//   const handleViewPrice = () => {
//     navigate("/user-data");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString || dateString === "N/A") return "N/A";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString; // Return original if invalid date
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric"
//       });
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return dateString;
//     }
//   };

//   return (
//     <>
//       {contextHolder}
//       <div className="user-details-page">
//         <div className="container">
//           <Row gutter={[24, 24]} justify="center">
//             <Col xs={24} md={24} lg={24}>
//               <div className="navigation-section">
//                 <Button 
//                   icon={<ArrowLeftOutlined />} 
//                   onClick={handleBack}
//                   size="large"
//                   className="back-button"
//                 >
//                   Back to Registration
//                 </Button>
//               </div>
              
//               {loading ? (
//                 <div className="loading-container">
//                   <Spin size="large" />
//                   <p>Loading vehicle details...</p>
//                 </div>
//               ) : vehicleDetails ? (
//                 <>
//                   <Card 
//                     className="vehicle-details-card" 
//                     title={
//                       <div className="card-title">
//                         <CarOutlined className="title-icon" />
//                         <span>Vehicle Details - {vehicleDetails.vehicle_no}</span>
//                       </div>
//                     }
//                     bordered={false}
//                   >
//                     <Descriptions 
//                       bordered 
//                       column={{ xs: 1, sm: 1, md: 2 }}
//                       size="large"
//                       labelStyle={{ fontWeight: "bold", backgroundColor: "#f5f7fa" }}
//                       contentStyle={{ backgroundColor: "#fff" }}
//                       className="details-table"
//                     >
//                       <Descriptions.Item label="Registration Number" span={1}>
//                         {vehicleDetails.vehicle_no}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Owner Name" span={1}>
//                         {vehicleDetails.owner || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Registration Date" span={1}>
//                         {formatDate(vehicleDetails.registration_date)}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Fuel Type" span={1}>
//                         {vehicleDetails.fuel_type || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Color" span={1}>
//                         {vehicleDetails.color || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Insurance Company" span={1}>
//                         {vehicleDetails.insurance_company || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Address" span={2}>
//                         {vehicleDetails.address || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Purchase Date" span={1}>
//                         {formatDate(vehicleDetails.date_of_buy)}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Maker/Model" span={1}>
//                         {vehicleDetails.maker_model || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Idv (Insured Declared Value)" span={1}>
//                         {vehicleDetails.ex_showroom_price || "1000000"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Financer" span={1}>
//                         {vehicleDetails?.financer || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Register At (RTO)" span={1}>
//                         {vehicleDetails?.register_at || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Vehicle Engine Number" span={1}>
//                         {vehicleDetails?.engine_number || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Vehicle Chasi Number" span={1}>
//                         {vehicleDetails?.chasi_number || "N/A"}
//                       </Descriptions.Item>
                    
//                     </Descriptions>
                    
//                     <div className="view-price-button-container pt-2">
//                       <Button 
//                         type="primary" 
//                         size="large" 
//                         icon={<DollarOutlined />} 
//                         onClick={handleViewPrice}
//                         className="view-price-button"
//                       >
//                         View Price
//                       </Button>
//                     </div>
//                   </Card>
//                 </>
//               ) : (
//                 <Card className="error-card">
//                   <p>No vehicle details available. Please register a vehicle first.</p>
//                   <Button type="primary" onClick={handleBack} size="large">
//                     Go to Registration
//                   </Button>
//                 </Card>
//               )}
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// };

// export default User;



import React, { useEffect, useState } from "react";
import { Card, Button, Spin,message } from "antd";
import { CarOutlined, ArrowLeftOutlined, DollarOutlined, UserOutlined, CalendarOutlined, ToolOutlined, HomeOutlined, CreditCardOutlined, ShopOutlined,SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();

  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
    const [msgApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // Log when component mounts
    // console.log("User component mounted");
    
    // Retrieve vehicle details from localStorage
    try {
      const storedDetails = localStorage.getItem("vehicleDetails");
      // console.log("Retrieved from localStorage:>>>>>>>>>>>>>>>>>>", storedDetails);
      
      if (storedDetails) {
        const parsedDetails = JSON.parse(storedDetails);
        // console.log("Parsed vehicle details:", parsedDetails);
        setVehicleDetails(parsedDetails);
      } else {
        // console.log("No vehicle details found in localStorage");
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
  // Mock data for demonstration - replace with your actual logic
 



  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const DetailCard = ({ icon, label, value, delay = 0 }) => (
    <div className="detail-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="detail-icon">{icon}</div>
      <div className="detail-content">
        <div className="detail-label">{label}</div>
        <div className="detail-value">{value || "N/A"}</div>
      </div>
    </div>
  );

  return (
    <div className="vehicle-details-container">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .vehicle-details-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .content-wrapper {
          max-width: 100%;
          margin: 0 auto;
        }

        .header-section {
          margin-bottom: 16px;
          padding: 0 4px;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
          border-radius: 25px;
          height: 40px;
          padding: 0 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          width: auto;
          min-width: 140px;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.25);
          color: white;
          transform: translateY(-1px);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          margin: 0 4px;
          padding: 40px 20px;
        }

        .loading-container .ant-spin {
          margin-bottom: 20px;
        }

        .loading-text {
          color: #4a5568;
          font-size: 16px;
          font-weight: 500;
          margin-top: 16px;
          text-align: center;
        }

        .main-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: none;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin: 0 4px;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-header {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          padding: 20px 16px;
          color: white;
          text-align: center;
        }

        .header-icon {
          font-size: 32px;
          margin-bottom: 8px;
          display: block;
        }

        .vehicle-number {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
          letter-spacing: 1px;
        }

        .header-subtitle {
          font-size: 13px;
          opacity: 0.9;
          font-weight: 400;
        }

        .card-content {
          padding: 16px 12px;
        }

        .details-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .detail-card {
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
          border-radius: 12px;
          padding: 14px;
          border: 1px solid rgba(79, 172, 254, 0.1);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .detail-card:active {
          transform: scale(0.98);
        }

        .detail-icon {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .detail-content {
          flex: 1;
          min-width: 0;
        }

        .detail-label {
          font-size: 11px;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .detail-value {
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          line-height: 1.3;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .address-card {
          background: linear-gradient(135deg, #e8f4ff 0%, #f0f8ff 100%);
          border: 1px solid rgba(79, 172, 254, 0.2);
        }

        .view-price-section {
          padding: 16px;
          background: linear-gradient(135deg, #f8f9ff 0%, #e8f4ff 100%);
          border-radius: 16px;
          text-align: center;
          margin-top: 12px;
        }

        .price-button {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border: none;
          height: 46px;
          padding: 0 24px;
          border-radius: 23px;
          font-size: 16px;
          font-weight: 700;
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
          width: 100%;
          max-width: 280px;
        }

        .price-button:hover,
        .price-button:focus {
          background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
        }

        .error-card {
          text-align: center;
          padding: 30px 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin: 0 4px;
        }

        /* Tablet styles */
        @media (min-width: 768px) {
          .vehicle-details-container {
            padding: 16px;
          }

          .content-wrapper {
            max-width: 600px;
          }

          .details-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .address-card {
            grid-column: 1 / -1;
          }

          .card-content {
            padding: 24px 20px;
          }

          .vehicle-number {
            font-size: 26px;
          }

          .header-icon {
            font-size: 40px;
          }
        }

        /* Desktop styles */
        @media (min-width: 1024px) {
          .content-wrapper {
            max-width: 900px;
          }

          .details-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .address-card {
            grid-column: 1 / -1;
          }

          .detail-card {
            padding: 18px;
          }

          .card-content {
            padding: 32px 28px;
          }
        }

        /* Small mobile optimization */
        @media (max-width: 480px) {
          .vehicle-details-container {
            padding: 4px;
          }

          .header-section {
            margin-bottom: 12px;
            padding: 0 2px;
          }

          .main-card {
            margin: 0 2px;
            border-radius: 16px;
          }

          .card-header {
            padding: 16px 12px;
          }

          .vehicle-number {
            font-size: 20px;
          }

          .header-icon {
            font-size: 28px;
          }

          .card-content {
            padding: 12px 8px;
          }

          .detail-card {
            padding: 12px;
          }

          .detail-value {
            font-size: 13px;
          }

          .price-button {
            height: 44px;
            font-size: 15px;
          }
        }

        /* Extra small screens */
        @media (max-width: 360px) {
          .detail-icon {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }

          .detail-content {
            min-width: 0;
          }

          .detail-value {
            font-size: 12px;
            line-height: 1.4;
          }

          .vehicle-number {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="content-wrapper">
        <div className="header-section">
          <Button 
            className="back-button"
            onClick={handleBack}
          >
            <ArrowLeftOutlined />
            Back to Registration
          </Button>
        </div>

        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <div className="loading-text">
              Loading vehicle details...<br />
              <small>Please wait a moment</small>
            </div>
          </div>
        ) : vehicleDetails ? (
          <Card className="main-card" bordered={false}>
            <div className="card-header">
              <CarOutlined className="header-icon" />
              <div className="vehicle-number">{vehicleDetails.vehicle_no}</div>
              <div className="header-subtitle">Vehicle Registration Details</div>
            </div>

            <div className="card-content">
              <div className="details-container">
                <DetailCard
                  icon={<UserOutlined />}
                  label="Owner Name"
                  value={vehicleDetails.owner}
                  delay={0}
                />
                
                <DetailCard
                  icon={<CalendarOutlined />}
                  label="Registration Date"
                  value={formatDate(vehicleDetails.registration_date)}
                  delay={100}
                />
                
                <DetailCard
                  icon={<ToolOutlined />}
                  label="Fuel Type"
                  value={vehicleDetails.fuel_type}
                  delay={200}
                />
                
                <DetailCard
                  icon={<CarOutlined />}
                  label="Color"
                  value={vehicleDetails.color}
                  delay={300}
                />
                
                <DetailCard
                  icon={<ShopOutlined />}
                  label="Insurance Company"
                  value={vehicleDetails.insurance_company}
                  delay={400}
                />
                
                <DetailCard
                  icon={<CalendarOutlined />}
                  label="Purchase Date"
                  value={formatDate(vehicleDetails.date_of_buy)}
                  delay={500}
                />
                
                <DetailCard
                  icon={<CarOutlined />}
                  label="Maker/Model"
                  value={vehicleDetails.maker_model}
                  delay={600}
                />
                
                <DetailCard
                  icon={<CreditCardOutlined />}
                  label="IDV Value"
                  value={formatCurrency(vehicleDetails.ex_showroom_price)}
                  delay={700}
                />
                
                <DetailCard
                  icon={<CreditCardOutlined />}
                  label="Financer"
                  value={vehicleDetails.financer}
                  delay={800}
                />
                
                <DetailCard
                  icon={<HomeOutlined />}
                  label="RTO Office"
                  value={vehicleDetails.register_at}
                  delay={900}
                />
                
                <DetailCard
                  icon={<SettingOutlined />}
                  label="Engine Number"
                  value={vehicleDetails.engine_number}
                  delay={1000}
                />
                
                <DetailCard
                  icon={<SettingOutlined />}
                  label="Chassis Number"
                  value={vehicleDetails.chasi_number}
                  delay={1100}
                />
                
                <div className="detail-card address-card" style={{ animationDelay: '1200ms' }}>
                  <div className="detail-icon">
                    <HomeOutlined />
                  </div>
                  <div className="detail-content">
                    <div className="detail-label">Address</div>
                    <div className="detail-value">{vehicleDetails.address}</div>
                  </div>
                </div>
              </div>

              <div className="view-price-section">
                <Button 
                  className="price-button"
                  onClick={handleViewPrice}
                >
                  <DollarOutlined />
                  View Insurance Price
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="error-card">
            <p>No vehicle details available. Please register a vehicle first.</p>
            <Button type="primary" onClick={handleBack} size="large">
              Go to Registration
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;