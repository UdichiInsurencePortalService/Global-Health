import React, { useState } from 'react';
import './Document.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Button, Form, Input, message } from 'antd';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const Document = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [aadhaarFiles, setAadhaarFiles] = useState([]);
  const [accidentFiles, setAccidentFiles] = useState([]);
  const [policyFiles, setPolicyFiles] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const onFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form values:', values);
      console.log('Aadhaar files:', aadhaarFiles);
      console.log('Accident files:', accidentFiles);
      console.log('Policy files:', policyFiles);
      
      message.success('Claim documents submitted successfully!');
      setLoading(false);
      
      // Reset form and uploaded files
      form.resetFields();
      setAadhaarFiles([]);
      setAccidentFiles([]);
      setPolicyFiles([]);
    }, 1500);
  };

  return (
    <section className="document-section p-5">
      <div className="content-document-section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <div className="document-heading">
                <h1 className="text-2xl font-bold">Claim Document Upload</h1>
                <p className="text-gray-600">Please upload all required documents and provide claim details</p>
              </div>
            </div>
          </div>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="claim-form"
          >
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <Form.Item
                  label="Claim ID"
                  name="claimId"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your Claim ID',
                    },
                  ]}
                >
                  <Input placeholder="Enter Claim ID" size="large" />
                </Form.Item>
              </div>
              
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <Form.Item
                  label="Registration Number"
                  name="registrationNumber"
                  rules={[
                    {
                      required: false,
                      message: 'Please enter Registration Number',
                    },
                  ]}
                >
                  <Input placeholder="Enter Registration Number" size="large" />
                </Form.Item>
              </div>
            </div>
            
            <div className="row mb-4">
              <div className="col-12">
                <h2 className="text-lg font-semibold mb-3">Required Documents</h2>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="document-upload-card p-4 border rounded">
                  <h3 className="text-md font-medium mb-3">Aadhaar Card </h3>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={aadhaarFiles}
                    onPreview={handlePreview}
                    onChange={handleAadhaarChange}
                    maxCount={2}
                    beforeUpload={isImageFile}
                    accept="image/*"
                  >
                    {aadhaarFiles.length >= 2 ? null : uploadButton('Upload Aadhaar')}
                  </Upload>
                  <p className="text-xs text-gray-500 mt-2">Accepted formats: JPG, PNG, etc.</p>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="document-upload-card p-4 border rounded">
                  <h3 className="text-md font-medium mb-3">Accident Images </h3>
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
                  <p className="text-xs text-gray-500 mt-2">Accepted formats: JPG, PNG, etc.</p>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="document-upload-card p-4 border rounded">
                  <h3 className="text-md font-medium mb-3">Policy Document</h3>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={policyFiles}
                    onChange={handlePolicyChange}
                    maxCount={2}
                    beforeUpload={isDocumentFile}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  >
                    {policyFiles.length >= 2 ? null : uploadButton('Upload Policy')}
                  </Upload>
                  <p className="text-xs text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX, etc.</p>
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
                      minWidth: '120px',
                      background: '#1890ff',
                      borderColor: '#1890ff'
                    }}
                  >
                    Submit Claim
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
          
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