// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const router = express.Router();

// Middleware
router.use(express.json());

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'globalhealth235@gmail.com', // Your Gmail address
    pass: 'snul decp usnu cszn'  // Your Gmail App Password
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Error with email configuration:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Helper function to format application details
const formatApplicationDetails = (data) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5; border-bottom: 3px solid #4F46E5; padding-bottom: 10px;">New Job Application Received</h2>
      
      <h3 style="color: #6366F1; margin-top: 20px;">Personal Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Full Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Email:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Phone:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Date of Birth:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.dob}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Aadhar Card:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.aadharCard}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Address:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.address}</td>
        </tr>
      </table>
      
      <h3 style="color: #6366F1; margin-top: 20px;">Education Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Education Level:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.education || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Percentage/Grade:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.percentage || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>CGPA:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.cgpa || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>College Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.collegeName || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>College Location:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.collegeLocation || 'N/A'}</td>
        </tr>
      </table>
      
      <h3 style="color: #6366F1; margin-top: 20px;">Job Application Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Position Applied:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.jobApplication}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Experience:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.experience || 'N/A'} years</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Expected Salary:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">₹${data.salaryExpected || 'N/A'}/month</td>
        </tr>
      </table>
      
      ${data.additionalInfo ? `
      <h3 style="color: #6366F1; margin-top: 20px;">Additional Information</h3>
      <p style="padding: 15px; background-color: #F3F4F6; border-radius: 8px;">${data.additionalInfo}</p>
      ` : ''}
      
      ${data.coverLetter ? `
      <h3 style="color: #6366F1; margin-top: 20px;">Cover Letter</h3>
      <p style="padding: 15px; background-color: #F3F4F6; border-radius: 8px;">${data.coverLetter}</p>
      ` : ''}
      
      <p style="margin-top: 30px; padding: 15px; background-color: #EEF2FF; border-left: 4px solid #4F46E5; border-radius: 4px;">
        <strong>Application received on:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </p>
    </div>
  `;
};

// Helper function to create user confirmation email
const createUserConfirmationEmail = (userName) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Application Submitted Successfully!</h1>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; color: #374151;">Dear <strong>${userName}</strong>,</p>
        
        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
          Thank you for submitting your job application. We have successfully received your application and our team will review it shortly.
        </p>
        
        <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <h3 style="color: #92400E; margin: 0 0 10px 0;">📋 Next Steps - Document Submission</h3>
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            To complete your application process, please submit the following documents:
          </p>
        </div>
        
        <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #4F46E5; margin-top: 0;">Required Documents:</h4>
          <ul style="color: #374151; line-height: 1.8;">
            <li>✅ Updated Resume/CV (PDF format preferred)</li>
            <li>✅ Educational Certificates (10th, 12th, Graduation, etc.)</li>
            <li>✅ Experience Certificates (if applicable)</li>
            <li>✅ Government-issued Photo ID (Aadhar Card/PAN Card/Passport)</li>
            <li>✅ Recent Passport Size Photograph</li>
            <li>✅ Address Proof</li>
          </ul>
          
          <h4 style="color: #4F46E5;">Optional Documents:</h4>
          <ul style="color: #374151; line-height: 1.8;">
            <li>📄 Professional Certifications degree</li>
            <li>📄 Portfolio/Work Samples (if applicable)</li>
          </ul>
        </div>
        
        <div style="background-color: #EEF2FF; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="color: #4F46E5; margin-top: 0;">📧 How to Submit Documents?</h3>
          <p style="color: #374151; margin: 10px 0;">
            Please send all documents via email to:
          </p>
          <p style="margin: 15px 0;">
            <a href="mailto:globalhealth235@gmail.com" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              globalhealth235@gmail.com
            </a>
          </p>
          <p style="color: #6B7280; font-size: 14px; margin-top: 15px;">
            Subject: Documents for Job Application - ${userName}
          </p>
        </div>
        
        <div style="background-color: #DBEAFE; border-left: 4px solid #3B82F6; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="color: #1E40AF; margin: 0; font-size: 14px;">
            <strong>📌 Important:</strong> Please submit your documents within 7 days to avoid any delays in the selection process.
          </p>
        </div>
        
        <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-top: 25px;">
          If you have any questions or need assistance, feel free to reach out to us at 
          <a href="mailto:globalhealth235@gmail.com" style="color: #4F46E5; text-decoration: none;">globalhealth235@gmail.com</a>
        </p>
        
        <p style="font-size: 16px; color: #374151; margin-top: 20px;">
          Best regards,<br>
          <strong style="color: #4F46E5;">HR Team</strong><br>
          Global Health
        </p>
        
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9CA3AF; text-align: center;">
          This is an automated message. Please do not reply to this email directly.
        </p>
      </div>
    </div>
  `;
};

// POST endpoint to handle form submission
router.post('/submit-application', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Email to admin (globalhealth235@gmail.com)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'globalhealth235@gmail.com',
      subject: `New Job Application - ${formData.fullName}`,
      html: formatApplicationDetails(formData)
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Application Received - Document Submission Required',
      html: createUserConfirmationEmail(formData.fullName)
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully. Check your email for next steps.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit application. Please try again later.' 
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);
});

// CRITICAL: Export the router
module.exports = router;