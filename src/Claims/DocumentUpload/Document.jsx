import React, { useState } from 'react';
import './Document.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Button, Form, Input, message, DatePicker, TimePicker, Select, Radio, Modal } from 'antd';
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

  const disableFutureDates = (current) => {
    return current && current > moment().endOf('day'); // disables dates after today
  };
  

const Document = () => {
  const [accidentForm] = Form.useForm();
  const [documentForm] = Form.useForm();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form states
  const [accidentData, setAccidentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  
  // Document upload states
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [aadhaarFiles, setAadhaarFiles] = useState([]);
  const [accidentFiles, setAccidentFiles] = useState([]);
  const [expenditureFiles, setExpenditureFiles] = useState([]);

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

  const handleAadhaarChange = ({ fileList }) => setAadhaarFiles(fileList);
  const handleAccidentChange = ({ fileList }) => setAccidentFiles(fileList);
  const handleExpenditureChange = ({ fileList: newFileList }) => {
    setExpenditureFiles(newFileList);
  };

  const uploadButton = (text) => (
    <div>
      <PlusOutlined />
      <div className="mt-2">{text}</div>
    </div>
  );

  // Step 1: Accident Details Form Submit
// STEP 1: Submit accident details first
  const onAccidentFormFinish = async (values) => {
    setLoading(true);
    
    try {
      console.log('Submitting accident details...', values);
      
      // Submit accident details first
      const response = await axios.post("http://localhost:8080/api/accidentform", {
        accident_place: values?.placeOfAccident,
        accident_date: values.accidentDate,
        time_accident: values.accidentTime,
        weather_condition: values.weatherCondition,
        describe_accident: values.accidentDescription,
        police_complaint_filed: values.policeComplaintFiled,
        police_complaint_details: values.policeComplaintDetails || ''
      });
      
      if (response.data.success) {
        const referenceId = response.data.referenceId; // Changed from claimId to referenceId
        
        // Store the reference ID for next step
        setAccidentData(response.data.data);
        
      
        
        // Move to next step
        setCurrentStep(2);
      }
      
    } catch (error) {
      console.error('Error submitting accident details:', error);
      
      let errorMessage = 'Error submitting accident details. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  // STEP 2: Submit documents with reference ID
const onDocumentFormFinish = async (values) => {
  try {
    // Validate that we have a reference ID from step 1
   
    
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
    
    // Add form fields - CORRECTED field names to match backend
    formData.append('full_name', values.fullName);
    formData.append('email', values.email);
    formData.append('phone_number', values.phoneNumber);
    formData.append('registration_number', values.registrationNumber);
    
    // Add files to FormData - CORRECTED field names to match backend
    aadhaarFiles.forEach((file) => {
      if (file.originFileObj) {
        formData.append('aadhar_images', file.originFileObj); // Changed from 'aadhaarFiles'
      }
    });
    
    accidentFiles.forEach((file) => {
      if (file.originFileObj) {
        formData.append('accident_images', file.originFileObj); // Changed from 'accidentFiles'
      }
    });
    
    expenditureFiles.forEach((file) => {
      if (file.originFileObj) {
        formData.append('total_expenditure', file.originFileObj); // Changed to match backend
      }
    });

    console.log('Submitting complete claim with form data');
    
    // API call to submit complete claim (Step 2)
    const response = await axios.post("http://localhost:8080/api/documentupload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data.success) {
      const claimId = response.data.data.claim_id; // Updated to match backend response structure
      const policyNumber = response.data.data.policy_number;
      
      // Show enhanced success modal with detailed information
      Modal.success({
        title: '🎉 Claim Submitted Successfully!',
        width: 500,
        content: (
          <div style={{ padding: '20px 0' }}>
            <div style={{ 
              background: '#f6ffed', 
              border: '1px solid #b7eb8f', 
              borderRadius: '6px', 
              padding: '16px', 
              marginBottom: '16px' 
            }}>
              <h4 style={{ color: '#389e0d', margin: '0 0 8px 0' }}>
                📋 Your Claim ID: <strong>{claimId}</strong>
              </h4>
              <h4 style={{ color: '#389e0d', margin: '0 0 8px 0' }}>
                📋 Policy Number: <strong>{policyNumber}</strong>
              </h4>
              <p style={{ color: '#52c41a', margin: 0, fontSize: '12px' }}>
                ✅ All documents securely stored in PostgreSQL database
              </p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#1890ff' }}>📄 Files Uploaded:</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                <li>Aadhaar Documents: {aadhaarFiles.length} files</li>
                <li>Accident Images: {accidentFiles.length} files</li>
                <li>Expenditure Documents: {expenditureFiles.length} files</li>
                <li><strong>Total: {aadhaarFiles.length + accidentFiles.length + expenditureFiles.length} files stored in PostgreSQL</strong></li>
              </ul>
            </div>
            
            <div style={{ 
              background: '#e6f7ff', 
              border: '1px solid #91d5ff', 
              borderRadius: '6px', 
              padding: '12px' 
            }}>
              <p style={{ margin: '0 0 8px 0', color: '#1890ff' }}>
                📧 Confirmation email will be sent to: <strong>{values.email}</strong>
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                Please save your Claim ID for future reference and tracking.
              </p>
            </div>
          </div>
        ),
        onOk() {
          // Show success message
          message.success({
            content: `Claim ${claimId} submitted successfully! All images stored in PostgreSQL database.`,
            duration: 5,
          });
          
          // Reset everything
         
        },
      });
    }
    
  } catch (error) {
    console.error('Error submitting complete claim:', error);
    
    let errorMessage = 'Error submitting complete claim. Please try again.';
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.statusText;
      
      // Show specific error details
      Modal.error({
        title: 'Claim Submission Failed',
        content: (
          <div>
            <p><strong>Error:</strong> {errorMessage}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Please check your files and try again. If the problem persists, contact support.
            </p>
          </div>
        ),
      });
    } else {
      message.error(errorMessage);
    }
  } finally {
    setLoading(false);
  }
};
  // Render Step 1: Accident Details Form
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
        label={
          <span style={{ fontWeight: '600', fontSize: '16px' }}>
            📅 Accident Date
          </span>
        }
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
          disabledDate={disableFutureDates}
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
              <h3 style={{ 
                color: '#495057', 
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                🚔 Police Complaint Information
              </h3>
              
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Was a police complaint filed?</span>}
                name="policeComplaintFiled"
                rules={[
                  {
                    required: true,
                    message: 'Please specify if police complaint was filed',
                  },
                ]}
              >
                <Radio.Group size="large">
                  <Radio value="yes">✅ Yes, complaint was filed</Radio>
                  <Radio value="no">❌ No, complaint was not filed</Radio>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.policeComplaintFiled !== currentValues.policeComplaintFiled
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('policeComplaintFiled') === 'yes' ? (
                    <Form.Item
                      label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Police Complaint Details</span>}
                      name="policeComplaintDetails"
                      rules={[
                        {
                          required: true,
                          message: 'Please provide police complaint details',
                        },
                      ]}
                    >
                      <TextArea
                        rows={3}
                        placeholder="Please provide FIR number, police station name, and any other relevant details..."
                        maxLength={500}
                        showCount
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="row">
          <div className="col-12 text-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '0 50px',
                height: '50px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              {loading ? 'Submitting...' : 'Submit Accident Details & Continue'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );

  // Render Step 2: Document Upload Form
  const renderDocumentUploadForm = () => (
    <div className="document-form-section">
      <div className="row mb-4">
        <div className="col-12">
          <div className="document-heading" style={{
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h1 className="text-2xl font-bold" style={{ margin: 0, fontSize: '2.5rem' }}>
              📋 Document Upload & Personal Details
            </h1>
            <p className="text-gray-100" style={{ margin: '10px 0 0 0', fontSize: '1.1rem' }}>
              Reference ID: {referenceId} | Please upload required documents and provide your details
            </p>
          </div>
        </div>
      </div>

      <Form
        form={documentForm}
        layout="vertical"
        onFinish={onDocumentFormFinish}
        className="document-upload-form"
        style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          border: '1px solid #e8e8e8'
        }}
      >
        {/* Personal Information Section */}
        <div style={{
          background: '#f8f9fa',
          padding: '25px',
          borderRadius: '10px',
          marginBottom: '30px',
          border: '2px solid #e9ecef'
        }}>
          <h3 style={{ 
            color: '#495057', 
            marginBottom: '20px',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            👤 Personal Information
          </h3>
          
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Full Name</span>}
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your full name',
                  },
                ]}
              >
                <Input 
                  placeholder="Enter your full name" 
                  size="large"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Email Address</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email',
                  },
                  {
                    type: 'email',
                    message: 'Please enter valid email address',
                  },
                ]}
              >
                <Input 
                  placeholder="Enter your email address" 
                  size="large"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Phone Number</span>}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your phone number',
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: 'Please enter valid 10-digit phone number',
                  },
                ]}
              >
                <Input 
                  placeholder="Enter 10-digit phone number" 
                  size="large"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Vehicle Registration Number</span>}
                name="registrationNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please enter vehicle registration number',
                  },
                ]}
              >
                <Input 
                  placeholder="Enter vehicle registration number" 
                  size="large"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Document Upload Section */}
        <div style={{
          background: '#fff9f0',
          padding: '25px',
          borderRadius: '10px',
          marginBottom: '30px',
          border: '2px solid #ffd591'
        }}>
          <h3 style={{ 
            color: '#d46b08', 
            marginBottom: '20px',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            📎 Required Documents Upload
          </h3>

          <div className="row">
            {/* Aadhaar Card Upload */}
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px' }}>🆔 Aadhaar Card</span>}
                required
              >
                <Upload
                  listType="picture-card"
                  fileList={aadhaarFiles}
                  onPreview={handlePreview}
                  onChange={handleAadhaarChange}
                  beforeUpload={isImageOrPdfFile}
                  multiple={false}
                  maxCount={2}
                >
                  {aadhaarFiles.length >= 2 ? null : uploadButton('Upload Aadhaar')}
                </Upload>
                <small style={{ color: '#666', fontSize: '12px' }}>
                  Upload front and back of Aadhaar card (Images/PDF, max 5MB each)
                </small>
              </Form.Item>
            </div>

            {/* Accident Images Upload */}
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px' }}>📸 Accident Images</span>}
                required
              >
                <Upload
                  listType="picture-card"
                  fileList={accidentFiles}
                  onPreview={handlePreview}
                  onChange={handleAccidentChange}
                  beforeUpload={isImageFile}
                  multiple={true}
                  maxCount={5}
                >
                  {accidentFiles.length >= 5 ? null : uploadButton('Upload Images')}
                </Upload>
                <small style={{ color: '#666', fontSize: '12px' }}>
                  Upload accident scene/vehicle damage photos (max 5 images)
                </small>
              </Form.Item>
            </div>

            {/* Expenditure Documents Upload */}
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <Form.Item
                label={<span style={{ fontWeight: '600', fontSize: '16px' }}>🧾 Expenditure Bills</span>}
                required
              >
                <Upload
                  listType="picture-card"
                  fileList={expenditureFiles}
                  onPreview={handlePreview}
                  onChange={handleExpenditureChange}
                  beforeUpload={isImageOrPdfFile}
                  multiple={true}
                  maxCount={10}
                >
                  {expenditureFiles.length >= 10 ? null : uploadButton('Upload Bills')}
                </Upload>
                <small style={{ color: '#666', fontSize: '12px' }}>
                  Upload medical bills, repair bills, etc. (Images/PDF, max 10 files)
                </small>
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row">
          <div className="col-12 text-center">
            <Button
              type="default"
              size="large"
              onClick={() => setCurrentStep(1)}
              style={{
                marginRight: '15px',
                borderRadius: '8px',
                padding: '0 30px',
                height: '50px',
                fontSize: '16px'
              }}
            >
              ← Back to Accident Details
            </Button>
            
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '0 50px',
                height: '50px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)'
              }}
            >
              {loading ? 'Submitting Claim...' : 'Submit Complete Claim'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );

  return (
    <div className="container-fluid" style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      <div className="container">
        {/* Progress Indicator */}
        <div className="row mb-4">
          <div className="col-12">
            <div style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: currentStep >= 1 ? '#52c41a' : '#d9d9d9',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px'
                  }}>
                    1
                  </div>
                  <span style={{ marginRight: '20px', color: currentStep >= 1 ? '#52c41a' : '#666' }}>
                    Accident Details
                  </span>
                  
                  <div style={{
                    width: '50px',
                    height: '2px',
                    background: currentStep >= 2 ? '#52c41a' : '#d9d9d9',
                    marginRight: '20px'
                  }}></div>
                  
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: currentStep >= 2 ? '#52c41a' : '#d9d9d9',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px'
                  }}>
                    2
                  </div>
                  <span style={{ color: currentStep >= 2 ? '#52c41a' : '#666' }}>
                    Documents & Submission
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderAccidentDetailsForm()}
        {currentStep === 2 && renderDocumentUploadForm()}

        {/* Image Preview Modal */}
        <Modal
          open={previewOpen}
          title="Image Preview"
          footer={null}
          onCancel={() => setPreviewOpen(false)}
          centered
        >
          <img
            alt="preview"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Document;