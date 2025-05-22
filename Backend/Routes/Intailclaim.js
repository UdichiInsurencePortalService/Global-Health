const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../Models/postgressdb");
const fs = require('fs');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, 'registration_' + Date.now() + '_' + file.originalname);
  }
});

// File filter to accept only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('pdfFile');

// Create nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'globalhealth235@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'ubxw sbty yxkt pcgo' // Should be set in environment variables
    }
  });
};

// Apply middleware
router.use(cors());
router.use(express.json());

/**
 * POST /claims
 * Create a new claim in the database and send confirmation email
 */
router.post('/claims', async (req, res) => {
  const {
    policy_number,
    user_id,
    email,
    registration_number,
    engine_number,
    chasiss_number
  } = req.body;

  // Validate required fields


  try {
    // Insert claim data into the initial_claim table with column names matching your PostgreSQL schema
    // Note: Fixed typo in column name from 'chasiss_number' to 'chassis_number'
    const result = await db.query(
      `INSERT INTO public.initial_claim
        (policy_number, email, registration_number, engine_number,     chasiss_number
, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [policy_number, email, registration_number, engine_number,     chasiss_number
, user_id]
    );

    // Send confirmation email after successful database insertion
    try {
      await sendClaimConfirmationEmail(email, user_id, policy_number);
      console.log('Claim confirmation email sent successfully');
    } catch (emailError) {
      console.error('Failed to send claim confirmation email:', emailError);
      // Continue even if email fails - don't fail the API call
    }

    return res.status(201).json({
      success: true,
      message: 'Claim created successfully',
      data: {
        user_id: result.rows[0].user_id,
        policy_number: result.rows[0].policy_number
      }
    });
  } catch (error) {
    console.error('Error creating claim:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create claim. Please try again.'
    });
  }
});

/**
 * Send claim confirmation email using nodemailer
 * @param {string} email - Recipient email address
 * @param {string} user_id - Claim ID / User ID
 * @param {string} policy_number - Policy number
 * @returns {Promise} - Resolves when email is sent
 */
const sendClaimConfirmationEmail = (email, user_id, policy_number) => {
  return new Promise((resolve, reject) => {
    const transporter = createTransporter();
    
    // Verify transporter connection
    transporter.verify(function(verifyError) {
      if (verifyError) {
        console.error('Transporter verification error:', verifyError);
        return reject(verifyError);
      }
      
      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER || 'globalhealth235@gmail.com',
        to: email,
        subject: 'Claim Intimation Confirmation',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #2980b9;">Claim Intimation Confirmation</h2>
            <p>Dear Customer,</p>
            <p>Thank you for submitting your claim. Your claim has been registered successfully.</p>
            
            <div style="background-color: #f8f9fa; border-left: 4px solid #2980b9; padding: 15px; margin: 20px 0;">
              <p style="margin: 0;"><strong>User ID:</strong> ${user_id}</p>
              <p style="margin: 10px 0 0;"><strong>Policy Number:</strong> ${policy_number}</p>
            </div>
            
            <p>Please keep your User ID for future reference. You will need it when uploading documents for this claim.</p>
            
            <p>You can upload the required documents by visiting our document upload page.</p>
            
            <p style="margin-top: 20px;">Best regards,<br/>Claims Department<br/>Global Health & Allied Insurance Service</p>
          </div>
        `
      };
      
      // Send email
      transporter.sendMail(mailOptions, (mailError, info) => {
        if (mailError) {
          console.error('Email sending error:', mailError);
          return reject(mailError);
        }
        
        console.log('Claim confirmation email sent successfully:', info.response);
        resolve(info);
      });
    });
  });
};

/**
 * GET /policy
 * Verify policy number and get policy data
 */
router.get('/policy', async (req, res) => {
  const { policyNumber } = req.query;

  if (!policyNumber) {
    return res.status(400).json({
      success: false,
      message: 'Policy number is required'
    });
  }

  try {
    // Check if policy exists in your policy table
    const policyResult = await db.query(
      `SELECT * FROM public.policy_documents WHERE policy_number = $1`,
      [policyNumber]
    );

    if (policyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        exists: false,
        message: 'Policy not found'
      });
    }

    const policyData = policyResult.rows[0];
    
    return res.status(200).json({
      success: true,
      exists: true,
      policyData: {
        policy_number: policyData.policy_number,
        email: policyData.email,
        registrationNumber: policyData.registration_number,
        periodOfInsurance: policyData.period_of_insurance
      }
    });
  } catch (error) {
    console.error('Error verifying policy:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify policy. Please try again.'
    });
  }
});

/**
 * POST /send-pdf-email
 * Upload a PDF file and send it via email
 */


// New endpoint to send a claim confirmation email
router.post('/send-claim-confirmation', async (req, res) => {
  const { email, user_id, policy_number } = req.body;
  
  // Validate required fields
  
  
  try {
    await sendClaimConfirmationEmail(email, user_id, policy_number);
    
    return res.status(200).json({
      success: true,
      message: 'Claim confirmation email sent successfully'
    });
  } catch (error) {
    console.error('Error sending claim confirmation email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send claim confirmation email. Please try again.'
    });
  }
});

module.exports = router;