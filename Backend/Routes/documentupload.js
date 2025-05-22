// Backend API - claimController.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../Models/postgressdb');
const nodemailer = require('nodemailer');
const router = express.Router();


// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let subDir = 'others';
    
    if (file.fieldname === 'aadhaarFiles') {
      subDir = 'aadhaar';
    } else if (file.fieldname === 'accidentFiles') {
      subDir = 'accident';
    } else if (file.fieldname === 'expenditureFiles') {
      subDir = 'expenditure';
    }
    
    const fullPath = path.join(uploadsDir, subDir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, JPG, PNG) and PDF files are allowed!'));
    }
  }
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: 'globalhealth235@gmail.com',
    pass: 'ubxw sbty yxkt pcgo' // Use app-specific password for Gmail
  }
});

// Generate unique claim ID
function generateClaimId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `CLM-${timestamp.substr(-6)}-${random}`;
}

// Submit claim endpoint
router.post('/submit-claim', upload.fields([
  { name: 'aadhaarFiles', maxCount: 2 },
  { name: 'accidentFiles', maxCount: 4 },
  { name: 'expenditureFiles', maxCount: 4 }
]), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      registrationNumber,
      accidentDetails,
      userDetails
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !registrationNumber) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Validate uploaded files
    if (!req.files.aadhaarFiles || req.files.aadhaarFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aadhaar card files are required'
      });
    }

    if (!req.files.accidentFiles || req.files.accidentFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Accident images are required'
      });
    }

    if (!req.files.expenditureFiles || req.files.expenditureFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Expenditure documents are required'
      });
    }

    // Generate unique claim ID
    const claimId = generateClaimId();
    
    // Parse JSON strings if they exist
    const parsedAccidentDetails = accidentDetails ? JSON.parse(accidentDetails) : {};
    const parsedUserDetails = userDetails ? JSON.parse(userDetails) : {};

    // Prepare file paths for database
    const aadhaarPaths = req.files.aadhaarFiles.map(file => file.path);
    const accidentPaths = req.files.accidentFiles.map(file => file.path);
    const expenditurePaths = req.files.expenditureFiles.map(file => file.path);

    // Insert claim into database
    const insertQuery = `
      INSERT INTO insurance_claims (
        claim_id, 
        full_name, 
        email, 
        phone_number, 
        registration_number,
        accident_details,
        user_details,
        aadhaar_files,
        accident_files,
        expenditure_files,
        status,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, claim_id;
    `;

    const values = [
      claimId,
      fullName,
      email,
      phoneNumber,
      registrationNumber.toUpperCase(),
      JSON.stringify(parsedAccidentDetails),
      JSON.stringify(parsedUserDetails),
      JSON.stringify(aadhaarPaths),
      JSON.stringify(accidentPaths),
      JSON.stringify(expenditurePaths),
      'SUBMITTED',
      new Date(),
      new Date()
    ];

    const result = await db.query(insertQuery, values);
    
    if (result.rows.length > 0) {
      // Send confirmation email
      const mailOptions = {
        from: 'globalhealth253@gmail.com',
        to: email,
        subject: `Insurance Claim Submitted Successfully - ${claimId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1890ff; text-align: center;">Claim Submitted Successfully!</h2>
            
            <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Claim Details:</h3>
              <p><strong>Claim ID:</strong> ${claimId}</p>
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p><strong>Vehicle Registration:</strong> ${registrationNumber}</p>
              <p><strong>Status:</strong> Submitted</p>
              <p><strong>Submitted Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #856404; margin-top: 0;">Important Information:</h4>
              <ul style="color: #856404;">
                <li>Please save your Claim ID <strong>${claimId}</strong> for future reference.</li>
                <li>You will be contacted within 2-3 business days for claim processing.</li>
                <li>Keep all original documents ready for verification.</li>
                <li>You can track your claim status using the Claim ID.</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666;">Thank you for choosing our insurance services!</p>
              <p style="color: #666; font-size: 12px;">This is an automated email. Please do not reply to this email.</p>
            </div>
          </div>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the entire request if email fails
      }

      res.status(201).json({
        success: true,
        message: 'Claim submitted successfully',
        claimId: claimId,
        data: {
          id: result.rows[0].id,
          claimId: result.rows[0].claim_id,
          fullName: fullName,
          email: email,
          status: 'SUBMITTED'
        }
      });
    } else {
      throw new Error('Failed to insert claim into database');
    }

  } catch (error) {
    console.error('Error submitting claim:', error);
    
    // Clean up uploaded files if database insertion fails
    if (req.files) {
      Object.values(req.files).flat().forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error submitting claim: ' + error.message
    });
  }
});

// Get claim by ID
router.get('/claim/:claimId', async (req, res) => {
  try {
    const { claimId } = req.params;
    
    const query = `
      SELECT * FROM insurance_claims 
      WHERE claim_id = $1
    `;
    
    const result = await db.query(query, [claimId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error fetching claim:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching claim'
    });
  }
});

// Get all claims (admin endpoint)
router.get('/claims', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT id, claim_id, full_name, email, phone_number, 
             registration_number, status, created_at
      FROM insurance_claims
    `;
    
    let countQuery = 'SELECT COUNT(*) FROM insurance_claims';
    let queryParams = [];
    
    if (status) {
      query += ' WHERE status = $1';
      countQuery += ' WHERE status = $1';
      queryParams.push(status);
      query += ` ORDER BY created_at DESC LIMIT $2 OFFSET $3`;
      queryParams.push(limit, offset);
    } else {
      query += ` ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
      queryParams.push(limit, offset);
    }
    
    const [claims, countResult] = await Promise.all([
      db.query(query, queryParams),
      db.query(countQuery, status ? [status] : [])
    ]);
    
    const totalClaims = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalClaims / limit);
    
    res.json({
      success: true,
      data: claims.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalClaims,
        limit: parseInt(limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching claims'
    });
  }
});

module.exports = router;