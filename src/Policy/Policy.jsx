import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Policy.css';
import logo from '../../src/assets/aboutusimges/image.png';
import { handleError,handleSuccess } from '../errortoast';

const Policy = () => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handlePolicyCheck = async (e) => {
    e.preventDefault();

    
    // Validate inputs
    if (!policyNumber) {
      handleError('Please enter a policy number');
      return;
    }
    
    if (!registrationNumber) {
      handleError('Please enter a registration number');
      return;
    }
    
    try {
      setLoading(true);
      
      // Encode the policy number to handle special characters in the URL
      const encodedPolicyNumber = encodeURIComponent(policyNumber);
      console.log('Requesting policy with encoded number:', encodedPolicyNumber);
      
      // Make the API call with the encoded policy number
      const response = await fetch(`http://localhost:8080/api/pdf/policy/${encodedPolicyNumber}`);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 404) {
          handleError(`Policy ${policyNumber} not found. Please check your policy number and try again.`);
        } else {
          const errorData = await response.json().catch(() => null);
          console.error('Error response:', errorData);
          throw new handleError(errorData?.error || `Server responded with status: ${response.status}`);
        }
        return;
      }
      
      const data = await response.json();
      console.log('Policy data received:', data);
      
      if (!data.success) {
        // Policy not found or other error
        handleError(data.error || 'Policy not found. Please check your policy number and try again.');
        return;
      }
      
      handleSuccess(`Found policy ${policyNumber}. Downloading document...`);
      
      // If policy exists, trigger automatic download
      const downloadResponse = await fetch(`http://localhost:8080/api/pdf/download/${data.document.id}`);
      
      if (!downloadResponse.ok) {
        const downloadErrorData = await downloadResponse.json().catch(() => null);
        throw new handleError(downloadErrorData?.error || 'Failed to download policy document');
      }
      
      // Get the blob from the response
      const blob = await downloadResponse.blob();
      
      // Create a download link and trigger it
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = data.document.fileName || `policy-${policyNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
      
      // handleSuccess(`Policy document ${policyNumber} downloaded successfully!`);
      
    } catch (error) {
      console.error('Error checking policy:', error);
      handleError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="policy-section py-5 px-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-5">
            <h1 className="fw-bold policy-heading">Just Check Your Policy Updates Here!</h1>
          </div>
        </div>
        
        {/* Loading message display */}
        {loading && (
          <div className="row justify-content-center mb-3">
            <div className="col-md-6">
              <div className="alert alert-info" role="alert">
                Checking your policy. Please wait...
              </div>
            </div>
          </div>
        )}
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img src={logo} alt="Logo" className="logo-img" width="300" />
          </div>
          <div className="col-md-6">
            <form className="form-section" onSubmit={handlePolicyCheck}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Policy Number"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  aria-label="Policy Number"
                />
                <small className="form-text text-muted">
                  Example format: GIC/2025-26/01/3889
                </small>
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Registration Number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  aria-label="Registration Number"
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Check Policy'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;