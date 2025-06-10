import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  CarOutlined,
  SafetyOutlined,
  DollarOutlined,
  FileTextOutlined,
  AlertOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Breadcrumb,
  Typography,
  Button,
  Row,
  Col,
  Card,
  theme,
  Table,
  Badge,
  Avatar,
  Space,
  Statistic,
  Progress,
} from "antd";
import {
  User,
  TrendingUp,
  Activity,
  BarChart3,
  Clock,
  Shield,
  Car,
  Bike,
  Truck,
  CreditCard,
  FileText,
  AlertTriangle,
} from "lucide-react";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Insurance Policies", "sub1", <SafetyOutlined />, [
    getItem("Car Insurance", "3", <CarOutlined />),
    getItem("Bike Insurance", "4", <Bike size={14} />),
    getItem("Auto Insurance", "5", <Truck size={14} />),
    getItem("Health Insurance", "6", <Shield size={14} />),
  ]),
  getItem("Claims Management", "sub2", <FileTextOutlined />, [
    getItem("Initial Claims", "7", <FileText size={14} />),
    getItem("Accident Details", "10", <AlertTriangle size={14} />),
    getItem("Final Claims & Documents", "8", <ProfileOutlined />),
  ]),
  getItem("Payment Records", "9", <DollarOutlined />),
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || "Admin User";
  const [selectedKey, setSelectedKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // All your existing state variables
  const [bikeData, setBikeData] = useState([]);
  const [autoData, setAutoData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [paymentData, setpayment] = useState([]);
  const [intialData, setinitial] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  const [finalClaim, setFinalData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin");
  };

  // Enhanced stats with better visuals
  const stats = [
    {
      title: "Total Policies",
      value: carData.length + bikeData.length + autoData.length,
      change: "+12%",
      color: "#1890ff",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: Shield,
    },
    {
      title: "Active Claims",
      value: intialData.length,
      change: "+5%",
      color: "#52c41a",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: FileText,
    },
    {
      title: "Revenue",
      value: "$45,280",
      change: "+8%",
      color: "#faad14",
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: TrendingUp,
    },
    {
      title: "Accidents Reported",
      value: accidentData.length,
      change: "-3%",
      color: "#ff4d4f",
      bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: AlertTriangle,
    },
  ];

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  // All your existing useEffect hooks remain the same
  useEffect(() => {
    if (selectedKey === "3") {
      setLoading(true);
      fetch("http://localhost:8080/api/vehicle/getcardata")
        .then((res) => res.json())
        .then((data) => {
          setCarData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [selectedKey]);

  useEffect(() => {
    const fetchBikeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/vehicle/getBikedata"
        );
        const result = await response.json();
        setBikeData(result || []);
      } catch (error) {
        console.error("Error fetching bike data:", error);
      }
      setLoading(false);
    };
    fetchBikeData();
  }, []);

  useEffect(() => {
    const fetchAutoData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/vehicle/getAutodata"
        );
        const result = await response.json();
        setAutoData(result || []);
      } catch (error) {
        console.error("Error fetching auto data:", error);
      }
      setLoading(false);
    };
    fetchAutoData();
  }, []);

  useEffect(() => {
    const fetchPaymentData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/getpaymentuserdata"
        );
        const result = await response.json();
        setpayment(result.data || []);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
      setLoading(false);
    };
    fetchPaymentData();
  }, []);

  useEffect(() => {
    const fetchIntialData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/getclaims");
        const result = await response.json();
        setinitial(result.data || []);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
      setLoading(false);
    };
    fetchIntialData();
  }, []);

  useEffect(() => {
    const fetchAccidentData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/getaccidentdata"
        );
        const result = await response.json();
        setAccidentData(result.data || []);
      } catch (error) {
        console.error("Error fetching accident data:", error);
      }
      setLoading(false);
    };
    fetchAccidentData();
  }, []);

  // Enhanced column definitions with better styling
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner_name",
      key: "owner_name",
      render: (text) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>
            {text?.charAt(0) || 'N'}
          </Avatar>
          <Text strong>{text || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Registration",
      dataIndex: "registration_number",
      key: "registration_number",
      render: (text) => (
        <Badge count={text ? "ACTIVE" : "N/A"} 
               style={{ backgroundColor: text ? '#52c41a' : '#d9d9d9' }}>
          <Text code>{text || "N/A"}</Text>
        </Badge>
      ),
    },
    {
      title: "Contact",
      dataIndex: "mobile_number",
      key: "mobile_number",
      render: (text) => <Text copyable>{text || "N/A"}</Text>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <Text ellipsis style={{ maxWidth: 150 }}>{text || "N/A"}</Text>,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (text) => (
        <Space>
          <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: text?.toLowerCase() || '#ccc'}}></div>
          {text || "N/A"}
        </Space>
      ),
    },
    {
      title: "Insurance",
      dataIndex: "insurance_company",
      key: "insurance_company",
      render: (text) => <Text type="secondary">{text || "N/A"}</Text>,
    },
    {
      title: "Model",
      dataIndex: "maker_model",
      key: "maker_model",
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
    {
      title: "Fuel Type",
      dataIndex: "fuel_type",
      key: "fuel_type",
      render: (text) => (
        <Badge 
          color={text === 'Petrol' ? 'red' : text === 'Diesel' ? 'blue' : 'green'}
          text={text || "N/A"} 
        />
      ),
    },
  ];

  const payments = [
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      render: (text) => (
        <Space>
          <Avatar style={{ backgroundColor: '#722ed1' }}>
            {text?.charAt(0) || 'U'}
          </Avatar>
          <Text strong>{text || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Policy Number",
      dataIndex: "policy_number",
      key: "policy_number",
      render: (text) => <Text code copyable>{text || "N/A"}</Text>,
    },
    {
      title: "Contact",
      dataIndex: "mobile_number",
      key: "mobile_number",
      render: (text) => <Text copyable>{text || "N/A"}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text) => <Badge count={text || 0} style={{ backgroundColor: '#faad14' }} />,
    },
    {
      title: "Nominee",
      dataIndex: "nominee_name",
      key: "nominee_name",
      render: (text, record) => (
        <div>
          <Text strong>{text || "N/A"}</Text>
          {record.nominee_relation && (
            <><br/><Text type="secondary" style={{fontSize: '12px'}}>
              ({record.nominee_relation})
            </Text></>
          )}
        </div>
      ),
    },
  ];

  const intialClaim = [
    {
      title: "Registration",
      dataIndex: "registration_number",
      key: "registration_number",
      render: (text) => <Text code>{text || "N/A"}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,
    },
    {
      title: "Policy Number",
      dataIndex: "policy_number",
      key: "policy_number",
      render: (text) => <Text code copyable>{text || "N/A"}</Text>,
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      render: (text) => <Badge count={text || 0} style={{ backgroundColor: '#1890ff' }} />,
    },
  ];

  const accident = [
    {
      title: "Location",
      dataIndex: "accident_place",
      key: "accident_place",
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
    {
      title: "Date & Time",
      dataIndex: "accident_date",
      key: "accident_date",
      render: (text, record) => (
        <div>
          <Text>{text || "N/A"}</Text>
          {record.time_accident && (
            <><br/><Text type="secondary">{record.time_accident}</Text></>
          )}
        </div>
      ),
    },
    {
      title: "Weather",
      dataIndex: "weather_condition",
      key: "weather_condition",
      render: (text) => (
        <Badge 
          color={text === 'Clear' ? 'green' : text === 'Rainy' ? 'blue' : 'orange'}
          text={text || "N/A"} 
        />
      ),
    },
    {
      title: "Police Complaint",
      dataIndex: "police_complaint_filed",
      key: "police_complaint_filed",
      render: (text) => (
        <Badge 
          status={text === 'Yes' ? 'success' : 'error'}
          text={text === 'Yes' ? 'Filed' : 'Not Filed'} 
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "describe_accident",
      key: "describe_accident",
      render: (text) => <Text ellipsis style={{ maxWidth: 200 }}>{text || "N/A"}</Text>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
          boxShadow: '2px 0 8px rgba(0,0,0,0.15)'
        }}
      >
        <div style={{ 
          height: 64, 
          margin: 16, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 8,
          backdropFilter: 'blur(10px)'
        }}>
          {!collapsed && <Text style={{ color: 'white', fontWeight: 'bold' }}>Global Health</Text>}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
          style={{ 
            background: 'transparent',
            border: 'none'
          }}
        />
      </Sider>
      
      <Layout>
        <Header
          style={{
            padding: "0 32px",
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderBottom: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <div>
            <Title level={4} style={{ margin: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Welcome back, {user}
            </Title>
            <Space>
              <Clock size={16} />
              <Text type="secondary">{currentTime.toLocaleTimeString()}</Text>
            </Space>
          </div>
          <Button 
            icon={<LogoutOutlined />} 
            danger 
            onClick={handleLogout}
            style={{
              borderRadius: 20,
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(238, 90, 36, 0.3)'
            }}
          >
            Logout
          </Button>
        </Header>
        
        <Content style={{ margin: "24px", minHeight: "calc(100vh - 134px)" }}>
          <div
            style={{
              padding: 32,
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 16,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {selectedKey === "1" && (
              <div>
                <Title level={2} style={{ 
                  marginBottom: 32, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>
                  Dashboard Overview
                </Title>
                
                <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Col key={index} xs={24} sm={12} lg={6}>
                        <Card 
                          bordered={false}
                          style={{
                            background: stat.bgColor,
                            borderRadius: 16,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                          bodyStyle={{ padding: 24 }}
                        >
                          <div style={{
                            position: 'absolute',
                            top: -20,
                            right: -20,
                            opacity: 0.1,
                            transform: 'rotate(15deg)'
                          }}>
                            <Icon size={80} color="white" />
                          </div>
                          <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                              <div style={{
                                background: 'rgba(255,255,255,0.2)',
                                borderRadius: 12,
                                padding: 12,
                                marginRight: 16
                              }}>
                                <Icon size={24} color="white" />
                              </div>
                              <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
                                {stat.title}
                              </Text>
                            </div>
                            <div>
                              <Title level={2} style={{ color: 'white', margin: 0, marginBottom: 8 }}>
                                {stat.value}
                              </Title>
                              <Text style={{ 
                                color: 'rgba(255,255,255,0.8)', 
                                fontSize: 14,
                                background: 'rgba(255,255,255,0.2)',
                                padding: '4px 8px',
                                borderRadius: 12
                              }}>
                                {stat.change} vs last month
                              </Text>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>

                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={12}>
                    <Card 
                      title="Quick Stats" 
                      bordered={false}
                      style={{
                        borderRadius: 16,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                      }}
                    >
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Statistic title="Car Policies" value={carData.length} prefix={<Car size={16} />} />
                        </Col>
                        <Col span={12}>
                          <Statistic title="Bike Policies" value={bikeData.length} prefix={<Bike size={16} />} />
                        </Col>
                        <Col span={12}>
                          <Statistic title="Auto Policies" value={autoData.length} prefix={<Truck size={16} />} />
                        </Col>
                        <Col span={12}>
                          <Statistic title="Payments" value={paymentData.length} prefix={<CreditCard size={16} />} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  
                  <Col xs={24} lg={12}>
                    <Card 
                      title="Performance Metrics" 
                      bordered={false}
                      style={{
                        borderRadius: 16,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                      }}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <Text>Claim Processing Rate</Text>
                        <Progress percent={78} strokeColor="#52c41a" />
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <Text>Customer Satisfaction</Text>
                        <Progress percent={92} strokeColor="#1890ff" />
                      </div>
                      <div>
                        <Text>Policy Growth</Text>
                        <Progress percent={65} strokeColor="#faad14" />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}

            {selectedKey === "3" && (
              <div>
                <Title level={3} style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
                  <Car style={{ marginRight: 12 }} />
                  Car Insurance Policies
                </Title>
                <Table
                  columns={columns}
                  dataSource={carData}
                  loading={loading}
                  rowKey="id"
                  scroll={{ x: "max-content" }}
                  bordered={false}
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                  style={{ 
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                />
              </div>
            )}

            {selectedKey === "4" && (
              <div>
                <Title level={3} style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
                  <Bike style={{ marginRight: 12 }} />
                  Bike Insurance Policies
                </Title>
                <Table
                  columns={columns}
                  dataSource={bikeData}
                  loading={loading}
                  rowKey={(record) => record.id || record.registration_number}
                  scroll={{ x: "max-content" }}
                  bordered={false}
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                  style={{ 
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                />
              </div>
            )}

            {selectedKey === "5" && (
              <div>
                <Title level={3} style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
                  <Truck style={{ marginRight: 12 }} />
                  Auto Insurance Policies
                </Title>
                <Table
                  columns={columns}
                  dataSource={autoData}
                  loading={loading}
                  rowKey={(record) => record.id || record.registration_number}
                  scroll={{ x: "max-content" }}
                  bordered={false}
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                  style={{ 
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                />
              </div>
            )}

            {selectedKey === "7" && (
              <div>
                <Title level={3} style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
                  <FileText style={{ marginRight: 12 }} />
                  Initial Claims
                </Title>
                <Table
                  columns={intialClaim}
                  dataSource={intialData}
                  loading={loading}
                  rowKey={(record) => record.id || record.registration_number}
                  scroll={{ x: "max-content" }}
                  bordered={false}
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                  style={{ 
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                />
              </div>
            )}

            {selectedKey === "10" && (
              <div>
                <Title level={3} style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
                  <AlertTriangle style={{ marginRight: 12 }} />
                  Accident Details
                </Title>
                <Table
                  columns={accident}
                  dataSource={accidentData}
                  loading={loading}
                  rowKey={(record) => record.id || record.registration_number}
                  scroll={{ x: "max-content" }}
                  bordered={false}
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                  style={{ 
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                />
              </div>
            )}

            {selectedKey === "9" && (
              <div>
                <Title level={3} style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
                  <CreditCard style={{ marginRight: 12 }} />
                  Payment Records
                </Title>
                <Table
                  columns={payments}
                  dataSource={paymentData}
                  loading={loading}
                  rowKey={(record) => record.id || record.registration_number}
                  scroll={{ x: "max-content" }}
                  bordered={false}
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                  style={{ 
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                />
              </div>
            )}
          </div>
        </Content>
        
        <Footer style={{ 
          textAlign: "center", 
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(0,0,0,0.06)'
        }}>
          <Text type="secondary">
            GlobalHealth Dashboard ©{new Date().getFullYear()} 
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;