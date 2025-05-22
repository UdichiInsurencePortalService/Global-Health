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
      period_of_insurance
    } = req.body;

    // if (!username || !email || !mobile_number || !period_of_insurance?.startDate || !period_of_insurance?.endDate) {
    //   return res.status(400).json({ message: 'Required fields missing' });
    // }

    // ✅ Convert to PostgreSQL daterange literal
    const { startDate, endDate } = period_of_insurance;
    const periodRange = `[${startDate},${endDate})`; // inclusive start, exclusive end

    // Insert into database
    const result = await db.query(
      `INSERT INTO user_payment_data 
       (username, age, mobile_number, registration_number, aadhar_card, email, address, pan_number, policy_number, nominee_name, nominee_age, nominee_relation, period_of_insurance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING id`,
      [
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
        periodRange // ✅ Use the formatted daterange string
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


