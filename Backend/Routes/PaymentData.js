const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // You'll need to install this: npm install cors
const db = require('../Models/postgressdb');

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Parse JSON bodies
router.use(express.json());

// Configure multer for file uploads with proper error handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Use original filename with timestamp to avoid name conflicts
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only PDFs
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      // Accept any file type for now, since we're handling blobs from jsPDF
      cb(null, true);
    }
  }
}).single('pdfFile');

// Configure email transporter with proper error handling
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER || 'globalhealth235@gmail.com',
      pass: process.env.EMAIL_PASS || 'ubxw sbty yxkt pcgo' // Use app password for Gmail
    },
    tls: {
      rejectUnauthorized: false // Helps with some email server issues
    }
  });
};

// Testing endpoint for health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is working' });
});

// Store user payment data with proper validation and error handling
router.post('/paymentuserdata', async (req, res) => {
  console.log('Received data:', req.body);

  try {
    const {
      username,
      age,
      mobile_number,
      registration_number,
      aadhar_card,
      email,
      address,
      pan_number,
      policy_number,
      nominee_name,
      nominee_age,
      nominee_relation,
      period_of_insurance,
    } = req.body;

    // Enhanced period_of_insurance handling
    let periodRange = null;
    
    if (period_of_insurance) {
      console.log('Period of insurance type:', typeof period_of_insurance);
      console.log('Period of insurance value:', period_of_insurance);
      
      try {
        // Case 1: If it's already a properly formatted string
        if (typeof period_of_insurance === 'string' && 
            (period_of_insurance.startsWith('[') || period_of_insurance.startsWith('('))) {
          periodRange = period_of_insurance;
        }
        // Case 2: If it's an object with startDate and endDate as Date objects or ISO strings
        else if (typeof period_of_insurance === 'object') {
          let startDate, endDate;
          
          // Handle different possible formats of the object
          if (period_of_insurance.startDate && period_of_insurance.endDate) {
            startDate = period_of_insurance.startDate;
            endDate = period_of_insurance.endDate;
          } else if (period_of_insurance.fromFormatted && period_of_insurance.toFormatted) {
            // Try to parse formatted dates like "20 May 2025"
            startDate = new Date(period_of_insurance.fromFormatted);
            endDate = new Date(period_of_insurance.toFormatted);
          }
          
          // Convert to ISO date strings if they're Date objects
          if (startDate instanceof Date || (typeof startDate === 'string' && startDate.includes('T'))) {
            startDate = new Date(startDate).toISOString().split('T')[0];
          }
          
          if (endDate instanceof Date || (typeof endDate === 'string' && endDate.includes('T'))) {
            endDate = new Date(endDate).toISOString().split('T')[0];
          }
          
          // Final validation of the date format
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (dateRegex.test(startDate) && dateRegex.test(endDate)) {
            periodRange = `[${startDate},${endDate}]`;
            console.log('Successfully formatted period_of_insurance:', periodRange);
          } else {
            console.log('Invalid date format after processing:', { startDate, endDate });
          }
        }
      } catch (error) {
        console.error('Error processing period_of_insurance:', error);
      }
    }
    
    if (!periodRange) {
      console.log('Could not format period_of_insurance, using null');
    }

    // Insert into database
    const result = await db.query(
      `INSERT INTO user_payment_data 
       (username, age, mobile_number, registration_number, aadhar_card, email, address, pan_number, policy_number, nominee_name, nominee_age, nominee_relation, period_of_insurance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING id`,
      [
        username,
        age || null,
        mobile_number,
        registration_number || null,
        aadhar_card || null,
        email,
        address || null,
        pan_number || null,
        policy_number || null,
        nominee_name || null,
        nominee_age || null,
        nominee_relation || null,
        periodRange,
      ]
    );

    console.log("Payment data saved successfully, ID:", result.rows[0].id);
    res.status(201).json({
      message: 'User data saved successfully',
      id: result.rows[0].id
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({
      message: 'Database error',
      error: err.message
    });
  }
});
// 
router.get('/policy', async (req, res) => {
  console.log('Checking policy:', req.query.policyNumber);

  try {
    const policyNumber = req.query.policyNumber;
    
    if (!policyNumber) {
      return res.status(400).json({ 
        message: 'Policy number is required',
        exists: false
      });
    }

    // Query database to check if policy exists
    const policyResult = await db.query(
      `SELECT 
        policy_number, 
        username, 
        email, 
        mobile_number, 
        registration_number,
        period_of_insurance
      FROM user_payment_data 
      WHERE policy_number = $1`,
      [policyNumber]
    );

    // If no policy found
    if (policyResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Policy not found',
        exists: false
      });
    }

    const policyData = policyResult.rows[0];
    
    // Check if period_of_insurance exists and is valid
    let isPolicyValid = true;
    let expiryMessage = null;
    
    if (policyData.period_of_insurance) {
      try {
        // Extract the date range from PostgreSQL daterange format
        // Format is typically "[start_date,end_date)" 
        const rangeStr = policyData.period_of_insurance;
        const matches = rangeStr.match(/\[(.+),(.+)\)/);
        
        if (matches && matches.length === 3) {
          const startDate = new Date(matches[1]);
          const endDate = new Date(matches[2]);
          const currentDate = new Date();
          
          // Check if the policy has expired
          if (currentDate > endDate) {
            isPolicyValid = false;
            expiryMessage = 'Your policy has expired. Please renew it to continue.';
          }
          
          // Return extracted dates in the response
          policyData.periodOfInsurance = {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
          };
        }
      } catch (error) {
        console.error('Error parsing period_of_insurance:', error);
      }
    }
    
    // Return policy data
    return res.status(200).json({
      message: isPolicyValid ? 'Policy is valid' : expiryMessage,
      exists: true,
      isValid: isPolicyValid,
      policyData: {
        policyNumber: policyData.policy_number,
        username: policyData.username,
        email: policyData.email,
        mobileNumber: policyData.mobile_number,
        registrationNumber: policyData.registration_number,
        periodOfInsurance: policyData.periodOfInsurance
      }
    });
    
  } catch (err) {
    console.error('Database error in policy check:', err);
    res.status(500).json({
      message: 'Error checking policy information',
      error: err.message,
      exists: false
    });
  }
});


// 

// Handle PDF email sending with robust error handling for multipart/form-data
router.post('/send-pdf-email', (req, res) => {
  upload(req, res, async function(multerErr) {
    // Handle multer errors
    if (multerErr) {
      console.error('Multer error:', multerErr);
      return res.status(400).json({ 
        message: 'File upload error', 
        error: multerErr.message 
      });
    }
    
    console.log('Upload successful, processing email...');
    
    try {
      const { email } = req.body;
      
      // Validate email
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Valid email address is required' });
      }
      
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'PDF file is required' });
      }
      
      // PDF file path
      const pdfPath = req.file.path;
      console.log('PDF saved at:', pdfPath);
      
      // Try to get user data from database for personalization
      let userData = null;
      try {
        const result = await db.query(
          'SELECT username FROM user_payment_data WHERE email = $1 ORDER BY id DESC LIMIT 1',
          [email]
        );
        if (result.rows.length > 0) {
          userData = result.rows[0];
          console.log('Found user data for email:', email);
        }
      } catch (dbError) {
        console.error('Database lookup error:', dbError);
        // Continue even if we can't get the user data
      }
      
      // Create transporter
      const transporter = createTransporter();
      
      // Verify transporter connection
      transporter.verify(function(verifyError) {
        if (verifyError) {
          console.error('Transporter verification error:', verifyError);
          return res.status(500).json({ 
            message: 'Email service unavailable', 
            error: verifyError.message 
          });
        }
        
        console.log('Transporter verified, preparing to send email...');
      });
      
      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER || 'globalhealth235@gmail.com',
        to: email,
        subject: 'Your Registration Details',
        text: `Thank you for your registration${userData ? ', ' + userData.username : ''}. Please find attached the details you submitted.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #2980b9;">Registration Confirmation</h2>
            <p>Dear ${userData ? userData.username : 'User'},</p>
            <p>Thank you for completing your registration. Your details have been successfully recorded in our system.</p>
            <p>Please find attached a PDF document containing all the information you submitted.</p>
            <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
            <p style="margin-top: 20px;">Best regards,<br/>Your Application Team</p>
          </div>
        `,
        attachments: [
          {
            filename: 'registration_details.pdf',
            path: pdfPath
          }
        ]
      };
      
      // Send email with proper error handling
      transporter.sendMail(mailOptions, (mailError, info) => {
        if (mailError) {
          console.error('Email sending error:', mailError);
          return res.status(500).json({ 
            message: 'Failed to send email', 
            error: mailError.message 
          });
        }
        
        console.log('Email sent successfully:', info.response);
        
        // Clean up: delete the file after sending
        fs.unlink(pdfPath, (unlinkErr) => {
          if (unlinkErr) console.error('Error deleting file:', unlinkErr);
        });
        
        res.status(200).json({ 
          message: 'Email sent successfully with PDF attachment',
          messageId: info.messageId
        });
      });
    } catch (error) {
      console.error('Email processing error:', error);
      res.status(500).json({ 
        message: 'Failed to process email request', 
        error: error.message 
      });
    }
  });
});

module.exports = router;