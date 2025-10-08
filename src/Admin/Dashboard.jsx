import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Admin.css'
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
  EyeOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  MedicineBoxOutlined 
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
  Modal,
  Image,
  Tooltip,
  Tag,
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
  Upload,
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
// 

const Medical = [
  { title: "ID", dataIndex: "id", key: "id", render: (text) => <Text>{text}</Text> },
  { title: "Full Name", dataIndex: "fullname", key: "fullname", render: (text) => <Text strong>{text || "N/A"}</Text> },
  { title: "Gender", dataIndex: "gender", key: "gender", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Date of Birth", dataIndex: "dob", key: "dob", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Nationality", dataIndex: "nationality", key: "nationality", render: (text) => <Text code copyable>{text || "N/A"}</Text> },
  { title: "Country Pride", dataIndex: "country_pride", key: "country_pride", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Medical Specialty", dataIndex: "medical_specialty", key: "medical_specialty", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Current Designation", dataIndex: "current_designation_institution", key: "current_designation_institution", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Medical Registration No.", dataIndex: "medical_registration_number", key: "medical_registration_number", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Issuing Authority", dataIndex: "issuing_authority", key: "issuing_authority", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Years of Practice", dataIndex: "years_of_practice", key: "years_of_practice", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Languages Spoken", dataIndex: "languages_spoken", key: "languages_spoken", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Key Achievements", dataIndex: "key_achievements", key: "key_achievements", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Signature", dataIndex: "signature", key: "signature", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Email", dataIndex: "email", key: "email", render: (text) => <Text strong>{text || "N/A"}</Text> },
  { title: "Phone Number", dataIndex: "phone_number", key: "phone_number", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Registration Date", dataIndex: "registration_date", key: "registration_date", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Created At", dataIndex: "created_at", key: "created_at", render: (text) => <Text>{text || "N/A"}</Text> },
  { title: "Updated At", dataIndex: "updated_at", key: "updated_at", render: (text) => <Text>{text || "N/A"}</Text> },
];

// 
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
    getItem("Documents Upload", "8", <ProfileOutlined />),
  ]),
  getItem("Payment Records", "9", <DollarOutlined />),
getItem("Medical Award", "11", <MedicineBoxOutlined />),
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || "Admin User";
  const [selectedKey, setSelectedKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', src: '', title: '' });
  const [carPaginationState, setCarPaginationState] = useState({
  current: 1,
  pageSize: 10
});

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
  // New state for documents
  const [documentsData, setDocumentsData] = useState([]);
  const[medicalaward, setMedicalaward] = useState([]);

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

  // Function to get file type from extension
  const getFileType = (filename) => {
    if (!filename) return 'unknown';
    const ext = filename.toLowerCase().split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
    if (['pdf'].includes(ext)) return 'pdf';
    return 'unknown';
  };

  // Function to handle file preview
  const handleFilePreview = (url, filename, type) => {
    setModalContent({
      type: type,
      src: url,
      title: filename || 'Document'
    });
    setModalVisible(true);
  };

  // Function to handle file download
  const handleFileDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'document';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // All your existing useEffect hooks remain the same
useEffect(() => {
  const fetchCarData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.globalhealthandalliedservices.com/api/vehicle/getcardata");
      const result = await response.json();
      setCarData(result || []);
      // Reset pagination to first page when new data loads
      setCarPaginationState({
        current: 1,
        pageSize: 10
      });
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
    setLoading(false);
  };
  fetchCarData();
}, []);

  useEffect(() => {
    const fetchBikeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.globalhealthandalliedservices.com/api/vehicle/getBikedata"
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
          "https://api.globalhealthandalliedservices.com/api/vehicle/getAutodata"
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
          "https://api.globalhealthandalliedservices.com/api/getpaymentuserdata"
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
        const response = await fetch("https://api.globalhealthandalliedservices.com/api/getclaims");
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
          "https://api.globalhealthandalliedservices.com/api/getaccidentdata"
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

  // New useEffect for fetching documents data
  useEffect(() => {
    const fetchDocumentsData = async () => {
      if (selectedKey === "8") {
        setLoading(true);
        try {
          const response = await fetch(
            "https://api.globalhealthandalliedservices.com/api/getdocument/complete"
          );
          const result = await response.json();
          setDocumentsData(result.data || []);
        } catch (error) {
          console.error("Error fetching documents data:", error);
        }
        setLoading(false);
      }
    };
    fetchDocumentsData();
  }, [selectedKey]);


  // 


 
// Fix 2: Medical data - get all data, not just index [1]
useEffect(() => {
  const fetchMedicalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.globalhealthandalliedservices.com/api/medical-registration"
      );
      const result = await response.json();
      setMedicalaward(result.data || []); // Changed from result.data[1] to result.data
    } catch (error) {
      console.error("Error fetching Medical data:", error);
    }
    setLoading(false);
  };
  fetchMedicalData();
}, []);

  // Enhanced column definitions with better styling
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner_name",
      key: "owner_name",
      width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
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
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
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
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable>{text || "N/A"}</Text>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text ellipsis style={{ maxWidth: 150 }}>{text || "N/A"}</Text>,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => (
        <Space>
          <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: text?.toLowerCase() || '#ccc'}}></div>
          {text || "N/A"}
        </Space>
      ),
    },
     {
      title: "Registration_Number",
      dataIndex: "registration_number",
      key: "registration_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
    {
      title: "Insurance",
      dataIndex: "insurance_company",
      key: "insurance_company",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text type="secondary">{text || "N/A"}</Text>,
    },
    {
      title: "Model",
      dataIndex: "maker_model",
      key: "maker_model",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
     {
      title: "IDV",
      dataIndex: "exshowroom",
      key: "exshowroom",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
    {
      title: "Fuel Type",
      dataIndex: "fuel_type",
      key: "fuel_type",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => (
        <Badge 
          color={text === 'Petrol' ? 'red' : text === 'Diesel' ? 'blue' : 'green'}
          text={text || "N/A"} 
        />
      ),
    },
     {
      title: "Engine_capacity",
      dataIndex: "engine_capacity",
      key: "engine_capacity",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
     {
      title: "Registered_at",
      dataIndex: "registered_at",
      key: "registered_at",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
     {
      title: "Financer",
      dataIndex: "financer",
      key: "financer",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
     {
      title: "Engine_Number",
      dataIndex: "engine_number",
      key: "engine_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
     {
      title: "Chasis_Number",
      dataIndex: "chasi_number",
      key: "chasi_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
    
  ];

  const payments = [
    {
      title: "User",
      dataIndex: "username",
      key: "username",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
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
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text code copyable>{text || "N/A"}</Text>,
    },
     {
      title: "Registration_number",
      dataIndex: "registration_number",
      key: "registration_number",
       width: 130,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
    {
      title: "Peroid_of_insurance",
      dataIndex: "period_of_insurance",
      key: "period_of_insurance",
       width: 200,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
    {
      title: "Contact",
      dataIndex: "mobile_number",
      key: "mobile_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable>{text || "N/A"}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Badge count={text || 0} style={{ backgroundColor: '#faad14' }} />,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
       width: 280,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,

    },
    {
      title: "Fuel_Type",
      dataIndex: "fuel_type",
      key: "fuel_type",
       width: 100,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,

    },
     {
      title: "Maker_model",
      dataIndex: "maker_model",
      key: "maker_model",
       width: 230,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,

    },
     {
      title: "AAdhar_Number",
      dataIndex: "aadhar_card",
      key: "aadhar_card",
       width: 280,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,

    },
    {
      title: "Pan_number",
      dataIndex: "pan_number",
      key: "pan_number",
       width: 280,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,

    },
    {
      title: "Nominee",
      dataIndex: "nominee_name",
      key: "nominee_name",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
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
    {
      title: "Nominee_Age",
      dataIndex: "nominee_age",
      key: "nominee_age",
       width: 100,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
    {
      title: "IDV",
      dataIndex: "idv",
      key: "idv",
       width: 100,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
     {
      title: "Own_damage_Premuin",
      dataIndex: "own_damage_premium",
      key: "own_damage_premium",
       width: 100,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
     {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
       width: 100,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    }, {
      title: "Adds_on_premuim",
      dataIndex: "adds_on_premuim",
      key: "adds_on_premuim",
       width: 100,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    }, {
      title: "NCB_discount",
      dataIndex: "ncb_discount",
      key: "ncb_discount",
       width: 100,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },  {
      title: "Third_party_premuin",
      dataIndex: "third_party_premuin",
      key: "third_party_premuin",
       width: 100,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
    {
      title: "Total_Premium",
      dataIndex: "total_premiun",
      key: "total_premiun",
       width: 130,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
     {
      title: "Engine_number",
      dataIndex: "engine_number",
      key: "engine_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    }, {
      title: "Chassis_Number",
      dataIndex: "chasis_number",
      key: "chasis_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    }, {
      title: "Register_at",
      dataIndex: "register_at",
      key: "register_at",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    }, {
      title: "Finanacer",
      dataIndex: "financer",
      key: "financer",
       width: 130,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
    {
      title: "Payment_id",
      dataIndex: "payment_id",
      key: "payment_id",
       width: 130,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
    {
      title: "Payment_status",
      dataIndex: "payment_status",
      key: "payment_status",
       width: 130,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text >{text || "N/A"}</Text>,

    },
  ];

  const intialClaim = [
    {
      title: "Registration",
      dataIndex: "registration_number",
      key: "registration_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text code>{text || "N/A"}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text copyable type="link">{text || "N/A"}</Text>,
    },
    {
      title: "Policy Number",
      dataIndex: "policy_number",
      key: "policy_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text code copyable>{text || "N/A"}</Text>,
    },
    {
      title: "Engine Number",
      dataIndex: "engine_number",
      key: "engine_number",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text code copyable>{text || "N/A"}</Text>,
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
     {
      title: "Created_At",
      dataIndex: "created_at",
      key: "created_at",
       width: 180,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"],
      render: (text) => <Text code copyable>{text || "N/A"}</Text>,
    },
  ];

  // New documents column definitions
  const documentsColumns = [
    {
      title: "Claim ID",
      dataIndex: "claim_id",
      key: "claim_id",
      width: 120,
      render: (text) => (
        <Text code strong style={{ color: '#1890ff' }}>
          {text || "N/A"}
        </Text>
      ),
    },
    {
      title: "Document Type",
      dataIndex: "document_type",
      key: "document_type",
      width: 150,
      render: (text) => (
        <Tag color="blue">{text || "Unknown"}</Tag>
      ),
    },
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
      width: 200,
      ellipsis: true,
      render: (text) => (
        <Text ellipsis title={text}>
          {text || "N/A"}
        </Text>
      ),
    },
    {
      title: "File Type",
      dataIndex: "file_url",
      key: "file_type",
      width: 100,
      render: (url, record) => {
        const fileType = getFileType(record.file_name);
        const typeConfig = {
          image: { icon: <FileImageOutlined />, color: 'green', text: 'Image' },
          pdf: { icon: <FilePdfOutlined />, color: 'red', text: 'PDF' },
          unknown: { icon: <FileUnknownOutlined />, color: 'default', text: 'File' }
        };
        const config = typeConfig[fileType];
        
        return (
          <Tag icon={config.icon} color={config.color}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Upload Date",
      dataIndex: "uploaded_at",
      key: "uploaded_at",
      width: 150,
      render: (text) => (
        <Text type="secondary">
          {text ? new Date(text).toLocaleDateString() : "N/A"}
        </Text>
      ),
    },
    {
      title: "File Size",
      dataIndex: "file_size",
      key: "file_size",
      width: 100,
      render: (size) => {
        if (!size) return <Text type="secondary">N/A</Text>;
        const sizeInKB = (size / 1024).toFixed(1);
        const sizeInMB = (size / (1024 * 1024)).toFixed(1);
        return (
          <Text type="secondary">
            {size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`}
          </Text>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => {
        const fileType = getFileType(record.file_name);
        
        return (
          <Space>
            <Tooltip title="Preview">
              <Button
                type="primary"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleFilePreview(record.file_url, record.file_name, fileType)}
                disabled={!record.file_url}
              />
            </Tooltip>
            <Tooltip title="Download">
              <Button
                type="default"
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => handleFileDownload(record.file_url, record.file_name)}
                disabled={!record.file_url}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];



  // 


const MedicalData = [
  {
    key: "11",
    id: 11,
    fullname: "kunal sharma",
    gender: "Male",
    dob: "2025-09-15",
    nationality: "india",
    country_pride: "India",
    medical_specialty: "Psychiatry",
    current_designation_institution: "23",
    medical_registration_number: "MD12345",
    issuing_authority: "sssdcdsc",
    years_of_practice: 2,
    languages_spoken: "cddcdcdc",
    key_achievements: "ddedewdewdewd",
    signature: "dede",
    email: "kunalsharma020401@gmail.com",
    phone_number: "9928151651",
    registration_date: "2025-09-15 04:56:06.757",
    created_at: "2025-09-15 04:56:06.757343",
    updated_at: "2025-09-15 04:56:06.757343",
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
            <Title level={4} style={{position:'absolute', margin: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
    <Title
      level={3}
      style={{
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Car style={{ marginRight: 12 }} />
      Car Insurance Policies
    </Title>

    <Table
      columns={columns}
      dataSource={carData.sort((a, b) => (a.id || 0) - (b.id || 0))}
      loading={loading}
      rowKey="id"
      scroll={{ x: "max-content" }}
      bordered
      pagination={{
        current: carPaginationState.current,
        pageSize: carPaginationState.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} of ${total} items`,
        onChange: (page, pageSize) => {
          setCarPaginationState({
            current: page,
            pageSize: pageSize || 10
          });
        }
      }}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
      rowClassName={() => "custom-row"}
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

            {selectedKey === "8" && (
              <div>
                <Title level={3} style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
                  <Upload style={{ marginRight: 12 }} />
                  Documents Upload
                </Title>
                
                <Card 
                  style={{ 
                    marginBottom: 24,
                    borderRadius: 12,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={6}>
                      <Statistic 
                        title="Total Documents" 
                        value={documentsData.length} 
                        prefix={<FileOutlined />}
                        valueStyle={{ color: '#1890ff' }}
                      />
                    </Col>
                    <Col xs={24} sm={6}>
                      <Statistic 
                        title="Images" 
                        value={documentsData.filter(doc => getFileType(doc.file_name) === 'image').length}
                        prefix={<FileImageOutlined />}
                        valueStyle={{ color: '#52c41a' }}
                      />
                    </Col>
                    <Col xs={24} sm={6}>
                      <Statistic 
                        title="PDFs" 
                        value={documentsData.filter(doc => getFileType(doc.file_name) === 'pdf').length}
                        prefix={<FilePdfOutlined />}
                        valueStyle={{ color: '#ff4d4f' }}
                      />
                    </Col>
                    <Col xs={24} sm={6}>
                      <Statistic 
                        title="Other Files" 
                        value={documentsData.filter(doc => getFileType(doc.file_name) === 'unknown').length}
                        prefix={<FileUnknownOutlined />}
                        valueStyle={{ color: '#faad14' }}
                      />
                    </Col>
                  </Row>
                </Card>

                <Table
                  columns={documentsColumns}
                  dataSource={documentsData}
                  loading={loading}
                  rowKey={(record, index) => record.id || record.document_id || record.file_id || `doc_${index}`}
                  scroll={{ x: "max-content" }}
                  bordered={false}
                  pagination={{ 
                    pageSize: 10, 
                    showSizeChanger: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} of ${total} documents`
                  }}
                  style={{ 
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                  locale={{
                    emptyText: documentsData.length === 0 && !loading ? 
                      'No documents found. Please check your API endpoint and database structure.' : 
                      'No data'
                  }}
                  expandable={{
                    expandedRowRender: (record) => (
                      <div style={{ padding: 16, background: '#fafafa', borderRadius: 8 }}>
                        <Row gutter={[16, 8]}>
                          <Col span={8}>
                            <Text strong>Claim ID:</Text> <Text code>{record.claim_id}</Text>
                          </Col>
                          <Col span={8}>
                            <Text strong>Document Type:</Text> <Tag color="blue">{record.document_type}</Tag>
                          </Col>
                          <Col span={8}>
                            <Text strong>Upload Date:</Text> 
                            <Text> {record.uploaded_at ? new Date(record.uploaded_at).toLocaleString() : 'N/A'}</Text>
                          </Col>
                          <Col span={24}>
                            <Text strong>File Path:</Text> 
                            <Text code copyable style={{ wordBreak: 'break-all' }}>{record.file_url}</Text>
                          </Col>
                          {record.description && (
                            <Col span={24}>
                              <Text strong>Description:</Text> 
                              <Text>{record.description}</Text>
                            </Col>
                          )}
                        </Row>
                      </div>
                    ),
                    rowExpandable: (record) => true,
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

            {/*  */}


           {selectedKey === "11" && (
  <div>
    <Title level={3} style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
      <CreditCard style={{ marginRight: 12 }} />
      Global Medical Icon Award
    </Title>
    <Table
      columns={Medical}
      dataSource={medicalaward} // Changed from MedicalData to medicalaward
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

      {/* Modal for file preview */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {modalContent.type === 'image' && <FileImageOutlined style={{ marginRight: 8 }} />}
            {modalContent.type === 'pdf' && <FilePdfOutlined style={{ marginRight: 8 }} />}
            {modalContent.type === 'unknown' && <FileUnknownOutlined style={{ marginRight: 8 }} />}
            {modalContent.title}
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="download" 
                  icon={<DownloadOutlined />} 
                  onClick={() => handleFileDownload(modalContent.src, modalContent.title)}>
            Download
          </Button>,
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>
        ]}
        width={modalContent.type === 'image' ? '80%' : '90%'}
        style={{ top: 20 }}
        bodyStyle={{ 
          maxHeight: '70vh', 
          overflow: 'auto',
          padding: modalContent.type === 'image' ? '8px' : '24px'
        }}
      >
        {modalContent.type === 'image' && modalContent.src && (
          <div style={{ textAlign: 'center' }}>
            <Image
              src={modalContent.src}
              alt={modalContent.title}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '60vh',
                objectFit: 'contain'
              }}
              preview={false}
            />
          </div>
        )}
        
        {modalContent.type === 'pdf' && modalContent.src && (
          <div style={{ textAlign: 'center' }}>
            <iframe
              src={modalContent.src}
              width="100%"
              height="600px"
              style={{ 
                border: 'none',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              title={modalContent.title}
            />
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">
                If the PDF doesn't load, try downloading it or opening in a new tab.
              </Text>
            </div>
          </div>
        )}
        
        {modalContent.type === 'unknown' && modalContent.src && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <FileUnknownOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
            <div>
              <Title level={4}>File Preview Not Available</Title>
              <Text type="secondary">
                This file type cannot be previewed. Please download to view the content.
              </Text>
              <div style={{ marginTop: 16 }}>
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />}
                  onClick={() => handleFileDownload(modalContent.src, modalContent.title)}
                >
                  Download File
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Dashboard;