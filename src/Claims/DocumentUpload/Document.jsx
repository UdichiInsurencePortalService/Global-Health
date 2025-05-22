import React, { useState } from 'react';
import './Document.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Button, Form, Input, message, DatePicker, TimePicker, Select,Radio ,Modal} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { handleError, handleSuccess } from '../../errortoast';

const { TextArea } = Input;
const { Option } = Select;

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const Document = () => {
  const [accidentForm] = Form.useForm();
  const [userIdForm] = Form.useForm();
  const [documentForm] = Form.useForm();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form states
  const [accidentData, setAccidentData] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userVerifying, setUserVerifying] = useState(false);
  
  // Document upload states
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [aadhaarFiles, setAadhaarFiles] = useState([]);
  const [accidentFiles, setAccidentFiles] = useState([]);
  const [policyFiles, setPolicyFiles] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  
  // Validation functions for different file types
  const isImageFile = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage || Upload.LIST_IGNORE;
  };
  
  const isDocumentFile = (file) => {
    const isDoc = file.type === 'application/pdf' || 
                  file.type === 'application/msword' || 
                  file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                  file.type === 'application/vnd.ms-excel' ||
                  file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                  file.type === 'text/plain';
    
    if (!isDoc) {
      message.error('You can only upload document files like PDF, DOC, DOCX, etc.!');
    }
    return isDoc || Upload.LIST_IGNORE;
  };

  const handleAadhaarChange = ({ fileList }) => setAadhaarFiles(fileList);
  const handleAccidentChange = ({ fileList }) => setAccidentFiles(fileList);
  const handlePolicyChange = ({ fileList }) => setPolicyFiles(fileList);

  const uploadButton = (text) => (
    <div>
      <PlusOutlined />
      <div className="mt-2">{text}</div>
    </div>
  );

  // Step 1: Accident Details Form Submit - FIXED VERSION
 const onAccidentFormFinish = async (values) => {
    setLoading(true);
    
    try {
      // Format the data to match your backend expectations
      const formattedData = {
        accident_place: values.placeOfAccident,
        accident_date: values.accidentDate ? values.accidentDate.format('YYYY-MM-DD') : '',
        time_accident: values.accidentTime ? values.accidentTime.format('HH:mm') : '',
        weather_condition: values.weatherCondition || '',
        describe_accident: values.accidentDescription,
        police_complaint_filed: values.policeComplaintFiled, // 'yes' or 'no'
        police_complaint_details: values.policeComplaintDetails || '' // Details if yes, empty if no
      };

      console.log('Sending data to backend:', formattedData);

      // API call to your backend
      const response = await axios.post("http://localhost:8080/api/accidentform", formattedData);
      
      console.log('Backend response:', response.data);
      
      // Store the accident data and response for next steps
      setAccidentData({
        ...values,
        backendResponse: response.data
      });
      
      // Move to next step
      setCurrentStep(2);
      message.success('Accident details submitted successfully!');
      
    } catch (error) {
      console.error("Error submitting accident form:", error);
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        message.error(`Submission failed: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Network error
        message.error('Network error. Please check your connection and try again.');
      } else {
        // Other error
        message.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  // Step 2: User ID Verification
 const onUserIdVerification = async (values) => {
  setUserVerifying(true);
  
  try {
    const response = await axios.get(`http://localhost:8080/api/claims/verify`, {
      params: { userId: values.userId }
    });
    
    if (response.data && response.data.length > 0) {
      setUserData(values);
      setCurrentStep(3);
      handleSuccess('UserId verified successfully!');
    } else {
      handleError('User ID not found in database. Please Create UserId in Intimate Claim');
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    
    if (error.response?.status === 404) {
      handleError('User ID not found in database. Please Create UserId in Intimate Claim');
    } else if (error.response?.status === 500) {
      handleError('Server error. Please try again later.');
    } else {
     handleError('Error verifying user ID. Please try again.');
    }
  } finally {
    setUserVerifying(false);
  }
};

  // Step 3: Final Document Upload Submit
 const onDocumentFormFinish = async (values) => {
  setLoading(true);
  
  try {
    // Validate required files
    if (aadhaarFiles.length === 0) {
      message.error('Please upload Aadhaar card');
      setLoading(false);
      return;
    }
    
    if (accidentFiles.length === 0) {
      message.error('Please upload accident images');
      setLoading(false);
      return;
    }
    
    if (expenditureFiles.length === 0) {
      message.error('Please upload expenditure documents');
      setLoading(false);
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    
    // Add form fields
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('registrationNumber', values.registrationNumber);
    
    // Add previous step data
    formData.append('accidentDetails', JSON.stringify(accidentData));
    formData.append('userDetails', JSON.stringify(userData));
    
    // Add files
    aadhaarFiles.forEach((file, index) => {
      if (file.originFileObj) {
        formData.append(`aadhaarFiles`, file.originFileObj);
      }
    });
    
    accidentFiles.forEach((file, index) => {
      if (file.originFileObj) {
        formData.append(`accidentFiles`, file.originFileObj);
      }
    });
    
    expenditureFiles.forEach((file, index) => {
      if (file.originFileObj) {
        formData.append(`expenditureFiles`, file.originFileObj);
      }
    });

    console.log('Submitting claim data...');
    
    // API call to submit complete claim
    const response = await axios.post("http://localhost:8080/api/submit-claim", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data.success) {
      const claimId = response.data.claimId;
      
      // Show success modal with claim ID
      Modal.success({
        title: 'Claim Submitted Successfully!',
        content: (
          <div>
            <p><strong>Your Claim ID:</strong> {claimId}</p>
            <p>A confirmation email has been sent to {values.email}</p>
            <p>Please save this Claim ID for future reference.</p>
          </div>
        ),
        onOk() {
          // Reset everything
          accidentForm.resetFields();
          userIdForm.resetFields();
          documentForm.resetFields();
          setAadhaarFiles([]);
          setAccidentFiles([]);
          setExpenditureFiles([]);
          setCurrentStep(1);
          setAccidentData({});
          setUserData({});
        },
      });
    }
    
  } catch (error) {
    console.error('Error submitting complete claim:', error);
   handleError('Error submitting complete claim. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Add expenditure files state (add this to your component state)
const [expenditureFiles, setExpenditureFiles] = useState([]);

// Add expenditure file handler
const handleExpenditureChange = ({ fileList: newFileList }) => {
  setExpenditureFiles(newFileList);
};
const isImageOrPdfFile = (file) => {
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';
  
  if (!isImage && !isPdf) {
    message.error('You can only upload image or PDF files!');
    return false;
  }
  
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('File must be smaller than 5MB!');
    return false;
  }
  
  return false; // Prevent auto upload, we'll handle it manually
};

  // Render Step 1: Accident Details Form - UPDATED
  const renderAccidentDetailsForm = () => (
    <div className="accident-form-section">
      <div className="row mb-4">
        <div className="col-12">
          <div className="document-heading" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h1 className="text-2xl font-bold" style={{ margin: 0, fontSize: '2.5rem' }}>
              🚨 Accident Details Report
            </h1>
            <p className="text-gray-100" style={{ margin: '10px 0 0 0', fontSize: '1.1rem' }}>
              Please provide comprehensive details about the accident incident
            </p>
          </div>
        </div>
      </div>
      
      <Form
        form={accidentForm}
        layout="vertical"
        onFinish={onAccidentFormFinish}
        className="accident-details-form"
        style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          border: '1px solid #e8e8e8'
        }}
      >
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>📍 Place of Accident</span>}
              name="placeOfAccident"
              rules={[
                {
                  required: true,
                  message: 'Please enter the place of accident',
                },
              ]}
            >
              <Input 
                placeholder="Enter exact location of accident" 
                size="large"
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>
          </div>
          
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>📅 Accident Date</span>}
              name="accidentDate"
              rules={[
                {
                  required: true,
                  message: 'Please select accident date',
                },
              ]}
            >
              <DatePicker 
                size="large" 
                style={{ width: '100%', borderRadius: '8px' }} 
                placeholder="Select accident date"
              />
            </Form.Item>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>🕐 Time of Accident</span>}
              name="accidentTime"
              rules={[
                {
                  required: true,
                  message: 'Please select accident time',
                },
              ]}
            >
              <TimePicker 
                size="large" 
                style={{ width: '100%', borderRadius: '8px' }} 
                format="HH:mm"
                placeholder="Select accident time"
              />
            </Form.Item>
          </div>
          
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>🌤️ Weather Condition</span>}
              name="weatherCondition"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select 
                placeholder="Select weather condition" 
                size="large"
                style={{ borderRadius: '8px' }}
              >
                <Option value="clear">☀️ Clear</Option>
                <Option value="rainy">🌧️ Rainy</Option>
                <Option value="foggy">🌫️ Foggy</Option>
                <Option value="cloudy">☁️ Cloudy</Option>
                <Option value="snowy">❄️ Snowy</Option>
                <Option value="windy">💨 Windy</Option>
                <Option value="other">❓ Other</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12 mb-4">
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>📝 Describe the Accident</span>}
              name="accidentDescription"
              rules={[
                {
                  required: true,
                  message: 'Please describe the accident',
                },
                {
                  min: 20,
                  message: 'Please provide at least 20 characters description',
                },
              ]}
            >
              <TextArea 
                rows={4} 
                placeholder="Please describe the accident in detail - include what happened, who was involved, and any other relevant information..."
                maxLength={1000}
                showCount
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>
          </div>
        </div>

        {/* Police Complaint Section */}
        <div className="row">
          <div className="col-12 mb-4">
            <div style={{
              background: '#f8f9fa',
              padding: '25px',
              borderRadius: '10px',
              border: '2px solid #e9ecef',
              marginBottom: '20px'
            }}>
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px', color: '#495057' }}>
                  🚔 Police Complaint Status
                </span>}
                name="policeComplaintFiled"
                rules={[
                  {
                    required: true,
                    message: 'Please select if police complaint was filed',
                  },
                ]}
              >
                <Radio.Group 
                  size="large"
                  style={{ display: 'flex', gap: '20px' }}
                >
                  <Radio 
                    value="yes" 
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  >
                    ✅ Yes, complaint filed
                  </Radio>
                  <Radio 
                    value="no"
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  >
                    ❌ No, complaint not filed
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item shouldUpdate noStyle>
                {({ getFieldValue }) => {
                  const policeComplaintFiled = getFieldValue('policeComplaintFiled');
                  return policeComplaintFiled === 'yes' ? (
                    <div style={{ marginTop: '20px' }}>
                      <Form.Item
                        label={<span style={{ fontWeight: '600', fontSize: '16px', color: '#495057' }}>
                          📋 Police Complaint Details And Address Of Police Station
                        </span>}
                        name="policeComplaintDetails"
                        rules={[
                          {
                            required: true,
                            message: 'Please provide police complaint details',
                          },
                          {
                            min: 10,
                            message: 'Please provide at least 10 characters',
                          },
                        ]}
                      >
                        <TextArea 
                          rows={3} 
                          placeholder="Please provide details about the police complaint - FIR number, police station name, complaint date, etc..."
                          maxLength={500}
                          showCount
                          style={{ borderRadius: '8px' }}
                        />
                      </Form.Item>
                    </div>
                  ) : null;
                }}
              </Form.Item>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12 text-center">
            <Form.Item style={{ marginBottom: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
                style={{
                  minWidth: '200px',
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderColor: 'transparent',
                  borderRadius: '25px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                🚀 Submit Accident Report
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );

  // Render Step 2: User ID Verification Form
  const renderUserIdVerificationForm = () => (
    <div className="user-verification-section">
      <div className="row mb-4">
        <div className="col-12">
          <div className="document-heading">
            <h1 className="text-2xl font-bold">User Verification</h1>
            <p className="text-gray-600">Please enter your User ID to proceed with document upload</p>
          </div>
        </div>
      </div>
      
      <Form
        form={userIdForm}
        layout="vertical"
        onFinish={onUserIdVerification}
        className="user-verification-form"
      >
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12">
            <Form.Item
              label="User ID"
              name="userId"
              rules={[
                {
                  required: true,
                  message: 'Please enter your User ID',
                },
              ]}
            >
              <Input placeholder="Enter your User ID" size="large" />
            </Form.Item>
            
            <Form.Item className="text-center">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={userVerifying}
                size="large"
                style={{
                  minWidth: '150px',
                  background: '#1890ff',
                  borderColor: '#1890ff'
                }}
              >
                Verify User ID
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );

  // Render Step 3: Document Upload Form
 const renderDocumentUploadForm = () => (
  <div className="document-upload-section">
    <div className="row mb-4">
      <div className="col-12">
        <div className="document-heading">
          <h1 className="text-2xl font-bold">Document Upload & Personal Details</h1>
        </div>
      </div>
    </div>
    
    <Form
      form={documentForm}
      layout="vertical"
      onFinish={onDocumentFormFinish}
      className="document-form"
    >
      {/* Personal Details Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="text-lg font-semibold mb-3">Personal Details</h2>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: 'Please enter your full name!' },
              { min: 2, message: 'Name must be at least 2 characters long!' }
            ]}
          >
            <Input placeholder="Enter your full name" size="large" />
          </Form.Item>
        </div>
        
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="Enter your email address" size="large" />
          </Form.Item>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please enter your phone number!' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number!' }
            ]}
          >
            <Input placeholder="Enter your phone number" size="large" maxLength={10} />
          </Form.Item>
        </div>
        
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
          <Form.Item
            label="Vehicle Registration Number"
            name="registrationNumber"
            rules={[
              { required: true, message: 'Please enter vehicle registration number!' },
              { min: 8, message: 'Registration number must be at least 8 characters!' }
            ]}
          >
            <Input placeholder="Enter vehicle registration number" size="large" style={{ textTransform: 'uppercase' }} />
          </Form.Item>
        </div>
      </div>
      
      {/* Document Upload Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="text-lg font-semibold mb-3">Required Documents</h2>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="document-upload-card p-4 border rounded">
            <h3 className="text-md font-medium mb-3">Aadhaar Card *</h3>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={aadhaarFiles}
              onPreview={handlePreview}
              onChange={handleAadhaarChange}
              maxCount={2}
              beforeUpload={isImageFile}
              accept="image/*,.pdf"
            >
              {aadhaarFiles.length >= 2 ? null : uploadButton('Upload Aadhaar')}
            </Upload>
            <p className="text-xs text-gray-500 mt-2">Accepted formats: JPG, PNG, PDF (Max: 2 files)</p>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="document-upload-card p-4 border rounded">
            <h3 className="text-md font-medium mb-3">Accident Images *</h3>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={accidentFiles}
              onPreview={handlePreview}
              onChange={handleAccidentChange}
              maxCount={4}
              beforeUpload={isImageFile}
              accept="image/*"
            >
              {accidentFiles.length >= 4 ? null : uploadButton('Upload Images')}
            </Upload>
            <p className="text-xs text-gray-500 mt-2">Accepted formats: JPG, PNG (Max: 4 files)</p>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="document-upload-card p-4 border rounded">
            <h3 className="text-md font-medium mb-3">Expected Expenditure *</h3>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={expenditureFiles}
              onPreview={handlePreview}
              onChange={handleExpenditureChange}
              maxCount={4}
              beforeUpload={isImageOrPdfFile}
              accept="image/*,.pdf"
            >
              {expenditureFiles.length >= 4 ? null : uploadButton('Upload Documents')}
            </Upload>
            <p className="text-xs text-gray-500 mt-2">Accepted formats: JPG, PNG, PDF (Max: 4 files)</p>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12 text-center">
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              className="submit-btn"
              style={{
                minWidth: '200px',
                height: '50px',
                background: '#3498db',
                borderColor: '#3498db',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Submit Claim
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  </div>
);
  return (
    <section className="document-section p-5">
      <div className="content-document-section">
        <div className="container">
          {/* Progress indicator */}
        

          {/* Render current step */}
          {currentStep === 1 && renderAccidentDetailsForm()}
          {currentStep === 2 && renderUserIdVerificationForm()}
          {currentStep === 3 && renderDocumentUploadForm()}
          
          {/* Image preview */}
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: visible => setPreviewOpen(visible),
                afterOpenChange: visible => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Document;