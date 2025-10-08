import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, CreditCard, GraduationCap, Briefcase, DollarSign, FileText, User, Award, Building, CheckCircle, XCircle } from 'lucide-react';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    aadharCard: '',
    address: '',
    education: '',
    percentage: '',
    cgpa: '',
    collegeName: '',
    collegeLocation: '',
    jobApplication: '',
    experience: '',
    salaryExpected: '',
    additionalInfo: '',
    coverLetter: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const RAZORPAY_KEY_ID = 'rzp_test_your_key_here'; // Replace with your actual key
  const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your backend URL

  const educationOptions = [
    { value: '', label: 'Select Education Level' },
    { value: '10th', label: '10th Standard' },
    { value: '12th', label: '12th Standard' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'graduation', label: "Graduation/Bachelor's Degree" },
    { value: 'postgraduation', label: "Post Graduation/Master's Degree" },
    { value: 'phd', label: 'PhD/Doctorate' },
    { value: 'professional', label: 'Professional Certification' }
  ];

  const jobOptions = [
    { value: '', label: 'Select Position' },
    { value: 'product-manager-insurance', label: 'Product Manager – Insurance' },
    { value: 'business-development-manager', label: 'Business Development Manager – Insurance' },
    { value: 'event-sponsorship-manager', label: 'Event & Sponsorship Manager' },
    { value: 'program-manager-healthcare', label: 'Program Manager – Healthcare Awards' },
    { value: 'operations-claims-executive', label: 'Operations & Claims Executive – Insurance' },
    { value: 'customer-relationship-officer', label: 'Customer Relationship Officer (CRO)' },
    { value: 'insurance-agent', label: 'Insurance Agent' },
    { value: 'medical-expert-jury', label: 'Medical Expert & Jury Member – Healthcare Awards' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'aadharCard') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 12) {
        const maskedValue = numericValue.length > 4 
          ? 'XXXX-XXXX-' + numericValue.slice(-4)
          : numericValue;
        setFormData(prev => ({ ...prev, [name]: maskedValue }));
        if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: '' }));
        }
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.aadharCard.trim()) newErrors.aadharCard = 'Aadhar card number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.education) newErrors.education = 'Education level is required';
    if (!formData.jobApplication) newErrors.jobApplication = 'Job position is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

 const sendEmailAfterPayment = async (paymentData) => {
    try {
      const emailData = {
        ...formData,
        paymentId: paymentData.razorpay_payment_id,
        orderId: paymentData.razorpay_order_id,
        paymentAmount: '10',
        paymentStatus: 'Success'
      };

      console.log('Sending email with data:', emailData);

      const response = await fetch(`${API_BASE_URL}/submit-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      const result = await response.json();
      console.log('Email API response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send email');
      }

      console.log('Email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Application submitted but email notification failed. Please contact support.');
      return false;
    }
  };

  const handlePayment = async (orderId) => {
    const options = {
      key: 'rzp_live_4GMG4265FQmj65',
      amount: 135000, // 10 rupees in paise
      currency: 'INR',
      name: 'Job Application Fee',
      description: 'Application Processing Fee',
      order_id: orderId,
      handler: async function (response) {
        try {
          // Verify payment
          const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              donorDetails: formData
            })
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // Send email after successful payment
            await sendEmailAfterPayment(response);
            
            setIsSubmitting(false);
            setShowSuccessModal(true);
            handleReset();
          } else {
            setIsSubmitting(false);
            setSubmitMessage({
              type: 'error',
              text: 'Payment verification failed. Please contact support.'
            });
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          setIsSubmitting(false);
          setSubmitMessage({
            type: 'error',
            text: 'Payment verification failed. Please try again.'
          });
        }
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: '#0d6efd'
      },
      modal: {
        ondismiss: function() {
          setIsSubmitting(false);
          setSubmitMessage({
            type: 'error',
            text: 'Payment cancelled. Please try again.'
          });
        }
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'Please fill all required fields correctly.' 
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create order
      const response = await fetch(`${API_BASE_URL}/payment/createorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1350, // 10 rupees
          userDetails: formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();
      
      // Open Razorpay payment modal
      handlePayment(orderData.orderId);

    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      setSubmitMessage({
        type: 'error',
        text: 'Failed to initiate payment. Please try again.'
      });
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      aadharCard: '',
      address: '',
      education: '',
      percentage: '',
      cgpa: '',
      collegeName: '',
      collegeLocation: '',
      jobApplication: '',
      experience: '',
      salaryExpected: '',
      additionalInfo: '',
      coverLetter: ''
    });
    setErrors({});
    setSubmitMessage({ type: '', text: '' });
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-gradient rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                  <Briefcase size={32} className="text-white" />
                </div>
                <h1 className="display-5 fw-bold mb-2">Job Application Form</h1>
                <p className="text-muted">Complete the form below to submit your application</p>
                <div className="alert alert-info d-inline-block">
                  <strong>Application Fee: ₹1350</strong> (One-time payment)
                </div>
              </div>

              {submitMessage.text && submitMessage.type === 'error' && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                  <XCircle size={24} className="me-3 flex-shrink-0" />
                  <div>{submitMessage.text}</div>
                </div>
              )}

              <div className="card shadow-lg border-0">
                <div className="card-body p-4 p-md-5">
                  <div>
                    <div className="mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary" style={{ width: '4px', height: '32px', marginRight: '12px' }}></div>
                        <h2 className="h3 mb-0 fw-bold">Personal Information</h2>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="fullName" className="form-label d-flex align-items-center fw-semibold">
                              <User size={16} className="me-2 text-primary" />
                              Full Name
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                              placeholder="Enter your full name"
                            />
                            {errors.fullName && (
                              <div className="invalid-feedback d-block">{errors.fullName}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label d-flex align-items-center fw-semibold">
                              <Mail size={16} className="me-2 text-primary" />
                              Email Address
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              placeholder="you@example.com"
                            />
                            {errors.email && (
                              <div className="invalid-feedback d-block">{errors.email}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="phone" className="form-label d-flex align-items-center fw-semibold">
                              <Phone size={16} className="me-2 text-primary" />
                              Phone Number
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                              placeholder="10-digit mobile number"
                            />
                            {errors.phone && (
                              <div className="invalid-feedback d-block">{errors.phone}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="dob" className="form-label d-flex align-items-center fw-semibold">
                              <Calendar size={16} className="me-2 text-primary" />
                              Date of Birth
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="date"
                              id="dob"
                              name="dob"
                              value={formData.dob}
                              onChange={handleInputChange}
                              className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                            />
                            {errors.dob && (
                              <div className="invalid-feedback d-block">{errors.dob}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="aadharCard" className="form-label d-flex align-items-center fw-semibold">
                              <CreditCard size={16} className="me-2 text-primary" />
                              Aadhar Card Number
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              id="aadharCard"
                              name="aadharCard"
                              value={formData.aadharCard}
                              onChange={handleInputChange}
                              className={`form-control ${errors.aadharCard ? 'is-invalid' : ''}`}
                              placeholder="Enter 12-digit Aadhar"
                              maxLength="14"
                            />
                            <div className="form-text">Only last 4 digits will be visible for security</div>
                            {errors.aadharCard && (
                              <div className="invalid-feedback d-block">{errors.aadharCard}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label d-flex align-items-center fw-semibold">
                              <MapPin size={16} className="me-2 text-primary" />
                              Address
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              rows="3"
                              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                              placeholder="Enter your complete address"
                            />
                            {errors.address && (
                              <div className="invalid-feedback d-block">{errors.address}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary" style={{ width: '4px', height: '32px', marginRight: '12px' }}></div>
                        <h2 className="h3 mb-0 fw-bold">Education Details</h2>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="education" className="form-label d-flex align-items-center fw-semibold">
                              <GraduationCap size={16} className="me-2 text-primary" />
                              Education Level
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <select
                              id="education"
                              name="education"
                              value={formData.education}
                              onChange={handleInputChange}
                              className={`form-select ${errors.education ? 'is-invalid' : ''}`}
                            >
                              {educationOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errors.education && (
                              <div className="invalid-feedback d-block">{errors.education}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="percentage" className="form-label d-flex align-items-center fw-semibold">
                              <Award size={16} className="me-2 text-primary" />
                              Percentage/Grade
                            </label>
                            <input
                              type="number"
                              id="percentage"
                              name="percentage"
                              value={formData.percentage}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter percentage"
                              min="0"
                              max="100"
                              step="0.01"
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="cgpa" className="form-label fw-semibold">
                              CGPA
                            </label>
                            <input
                              type="number"
                              id="cgpa"
                              name="cgpa"
                              value={formData.cgpa}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter CGPA (0-10)"
                              min="0"
                              max="10"
                              step="0.01"
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="collegeName" className="form-label d-flex align-items-center fw-semibold">
                              <Building size={16} className="me-2 text-primary" />
                              College/Institution Name
                            </label>
                            <input
                              type="text"
                              id="collegeName"
                              name="collegeName"
                              value={formData.collegeName}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter institution name"
                            />
                          </div>
                        </div>
                        
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="collegeLocation" className="form-label d-flex align-items-center fw-semibold">
                              <MapPin size={16} className="me-2 text-primary" />
                              College Location
                            </label>
                            <input
                              type="text"
                              id="collegeLocation"
                              name="collegeLocation"
                              value={formData.collegeLocation}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="City, State"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-success" style={{ width: '4px', height: '32px', marginRight: '12px' }}></div>
                        <h2 className="h3 mb-0 fw-bold">Job Application</h2>
                      </div>
                      
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="jobApplication" className="form-label d-flex align-items-center fw-semibold">
                              <Briefcase size={16} className="me-2 text-primary" />
                              Position Applied For
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <select
                              id="jobApplication"
                              name="jobApplication"
                              value={formData.jobApplication}
                              onChange={handleInputChange}
                              className={`form-select ${errors.jobApplication ? 'is-invalid' : ''}`}
                            >
                              {jobOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errors.jobApplication && (
                              <div className="invalid-feedback d-block">{errors.jobApplication}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="experience" className="form-label d-flex align-items-center fw-semibold">
                              <Award size={16} className="me-2 text-primary" />
                              Years of Experience
                            </label>
                            <input
                              type="number"
                              id="experience"
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter years of experience"
                              min="0"
                              max="50"
                              step="0.5"
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="salaryExpected" className="form-label d-flex align-items-center fw-semibold">
                              <DollarSign size={16} className="me-2 text-primary" />
                              Last withdraw Salary (₹/Month)
                            </label>
                            <input
                              type="number"
                              id="salaryExpected"
                              name="salaryExpected"
                              value={formData.salaryExpected}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter expected monthly salary"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-warning" style={{ width: '4px', height: '32px', marginRight: '12px' }}></div>
                        <h2 className="h3 mb-0 fw-bold">Additional Information</h2>
                      </div>
                      
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="additionalInfo" className="form-label d-flex align-items-center fw-semibold">
                              <FileText size={16} className="me-2 text-primary" />
                              Additional Information
                            </label>
                            <textarea
                              id="additionalInfo"
                              name="additionalInfo"
                              value={formData.additionalInfo}
                              onChange={handleInputChange}
                              rows="4"
                              className="form-control"
                              placeholder="Skills, certifications, achievements, etc."
                            />
                          </div>
                        </div>
                        
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="coverLetter" className="form-label d-flex align-items-center fw-semibold">
                              <FileText size={16} className="me-2 text-primary" />
                              Cover Letter
                            </label>
                            <textarea
                              id="coverLetter"
                              name="coverLetter"
                              value={formData.coverLetter}
                              onChange={handleInputChange}
                              rows="6"
                              className="form-control"
                              placeholder="Explain why you're the right candidate for this position..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row gap-3 pt-4 border-top">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn btn-primary btn-lg flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={20} />
                            Pay ₹1350 & Submit Application
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={isSubmitting}
                        className="btn btn-secondary btn-lg flex-grow-1"
                      >
                        Reset Form
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-muted small mt-4">
                <span className="fs-5">🔒</span> All information provided will be kept confidential
              </p>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body text-center px-4 pb-5">
                  <div className="mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle" style={{ width: '80px', height: '80px' }}>
                      <CheckCircle size={48} className="text-success" />
                    </div>
                  </div>
                  <h3 className="fw-bold mb-3">Payment Successful!</h3>
                  <p className="text-muted mb-4">
                    Your application has been submitted successfully. A confirmation email has been sent to your registered email address.
                  </p>
                  <div className="alert alert-success d-flex align-items-start text-start" role="alert">
                    <Mail size={24} className="me-3 flex-shrink-0 mt-1" />
                  <div className="mt-4">
  <strong className="d-block mb-3 fs-5 text-primary">
    <i className="bi bi-file-earmark-text me-2"></i>
    Required Documents:
  </strong>
  <ul className="list-unstyled ms-3">
    <li className="mb-2">
      ✅ <strong>Updated Resume/CV</strong> <span className="text-muted">(PDF format preferred)</span>
    </li>
    <li className="mb-2">
      ✅ <strong>Educational Certificates</strong> <span className="text-muted">(10th, 12th, Graduation, etc.)</span>
    </li>
    <li className="mb-2">
      ✅ <strong>Experience Certificates</strong> <span className="text-muted">(if applicable)</span>
    </li>
    <li className="mb-2">
      ✅ <strong>Government-issued Photo ID</strong> <span className="text-muted">(Aadhar Card / PAN Card / Passport)</span>
    </li>
    <li className="mb-2">
      ✅ <strong>Recent Passport Size Photograph</strong>
    </li>
  
  </ul>
</div>

                  </div>
                  <button type="button" className="btn btn-primary btn-lg px-5" onClick={closeModal}>
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobApplicationForm;