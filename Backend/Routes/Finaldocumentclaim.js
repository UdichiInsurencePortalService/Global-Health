const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const db = require("../Models/postgressdb");

router.use(cors());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

// Function to generate unique claim ID - MOVED TO TOP
const generateClaimId = () => {
  const prefix = 'CLM';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};



// Configure multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Configure nodemailer (replace with your email service credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER || 'globalhealth235@gmail.com',
    pass: process.env.EMAIL_PASS || 'snul decp usnu cszn'
  }
});

// POST: Save document upload data
router.post("/documentupload", upload.fields([
  { name: 'aadhar_images', maxCount: 2 },
  { name: 'accident_images', maxCount: 10 },
  { name: 'total_expenditure', maxCount: 5 }
]), async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received files:', Object.keys(req.files || {}));
    
    const {
      full_name,
      email,
      registration_number,
      phone_number,
    } = req.body;

    // Validate required fields
    if (!full_name || !email || !registration_number) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: full_name, email, registration_number"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Process uploaded files
    const aadharImages = req.files['aadhar_images'] || [];
    const accidentImages = req.files['accident_images'] || [];
    const expenditureImages = req.files['total_expenditure'] || [];

    console.log('Files processed:', {
      aadhar: aadharImages.length,
      accident: accidentImages.length,
      expenditure: expenditureImages.length
    });

    // Convert images to base64 for database storage
    const processImages = (images) => {
      return images.map(image => ({
        filename: image.originalname,
        mimetype: image.mimetype,
        size: image.size,
        data: image.buffer.toString('base64')
      }));
    };

    const processedAadharImages = processImages(aadharImages);
    const processedAccidentImages = processImages(accidentImages);
    const processedExpenditureImages = processImages(expenditureImages);

    // Generate claim ID and policy number
    console.log('Generating claim ID and policy number...');
    const claimId = generateClaimId();


    // Insert document data into database
    const insertQuery = `
      INSERT INTO document_uploads (
        full_name,
        email,
        registration_number,
        phone_number,
        aadhar_images,
        accident_images,
        total_expenditure,
        claim_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      full_name,
      email,
      registration_number,
      phone_number,
      JSON.stringify(processedAadharImages),
      JSON.stringify(processedAccidentImages),
      JSON.stringify(processedExpenditureImages),
      claimId   
    ];

    console.log('Inserting into database...');
    const result = await db.query(insertQuery, values);
    console.log('Database insert successful');

    res.status(201).json({
      success: true,
      message: "Document upload data saved successfully",
      data: {
        id: result.rows[0].id,
        claim_id: claimId,
        full_name: full_name,
        email: email,
        phone_number: phone_number
      }
    });

  } catch (error) {
    console.error("Error saving document upload data:", error.message);
    console.error("Full error:", error);
    res.status(500).json({
      success: false,
      message: "Error saving document upload data",
      error: error.message
    });
  }
});

// POST: Send confirmation email
router.post("/sendemail", async (req, res) => {
  try {
    const { email, full_name, claim_id, phone_number } = req.body;

    // Validate required fields
  

    // Email template
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .info-box { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #4CAF50; }
          .footer { background-color: #333; color: white; padding: 15px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Insurance Claim Confirmation</h1>
          </div>
          <div class="content">
            <h2>Dear ${full_name},</h2>
            <p>Thank you for submitting your insurance claim. Your documents have been successfully received and are being processed.</p>
            
            <div class="info-box">
              <h3>Your Claim Details:</h3>
              <p><strong>Claim ID:</strong> ${claim_id}</p>
              <p><strong>Policy Number:</strong> ${policy_number}</p>
              <p><strong>Phone Number:</strong> ${phone_number || 'Not provided'}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>
            
            <p>Please keep your Claim ID for future reference. You can use it to track the status of your claim.</p>
            <p>Our team will review your documents and contact you within 3-5 business days.</p>
            
            <p>If you have any questions, please don't hesitate to contact our customer service team.</p>
            
            <p>Best regards,<br>Insurance Claims Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Insurance Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || 'globalhealth235@gmail.com',
      to: email,
      subject: `Insurance Claim Confirmation - ${claim_id}`,
      html: emailTemplate
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Confirmation email sent successfully",
      data: {
        email: email,
        claim_id: claim_id,
        policy_number: policy_number
      }
    });

  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({
      success: false,
      message: "Error sending confirmation email",
      error: error.message
    });
  }
});

// GET: Retrieve document upload by claim ID
router.get("/getdocument/:claimId", async (req, res) => {
  try {
    const { claimId } = req.params;

    const query = `
      SELECT 
        id, full_name, email, registration_number, phone_number,
        total_expenditure, claim_id, policy_number, created_at
      FROM document_uploads 
      WHERE claim_id = $1
    `;

    const result = await db.query(query, [claimId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No document found with this claim ID"
      });
    }

    res.status(200).json({
      success: true,
      message: "Document data retrieved successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error retrieving document data:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving document data",
      error: error.message
    });
  }
});

// Error handling middleware for multer errors
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: `Unexpected field: ${error.field}. Allowed fields are: aadhar_images, accident_images, total_expenditure`
      });
    }
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB per file.'
      });
    }
  }
  
  if (error.message === 'Only image files are allowed') {
    return res.status(400).json({
      success: false,
      message: 'Only image files are allowed'
    });
  }
  
  next(error);
});


// 

router.get("/getdocument/complete/", async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        full_name,
        email, 
        registration_number,
        phone_number,
        aadhar_images,
        accident_images,
        total_expenditure,
        claim_id,
        created_at,
        updated_at
      FROM document_uploads 
      ORDER BY created_at DESC
    `;

    const result = await db.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No documents found"
      });
    }

    // Helper function to process images for viewing
    const processImagesForViewing = (imageData) => {
      if (!imageData) return [];
      
      try {
        const images = JSON.parse(imageData);
        return images.map((image, index) => ({
          id: index + 1,
          filename: image.filename,
          mimetype: image.mimetype,
          size: image.size,
          // Create a data URL that can be used directly in HTML img tags
          dataUrl: `data:${image.mimetype};base64,${image.data}`,
          // Also provide raw base64 data
          base64: image.data,
          // Add download link format
          downloadUrl: `data:${image.mimetype};base64,${image.data}`,
          // Add file info
          sizeFormatted: formatFileSize(image.size)
        }));
      } catch (e) {
        console.error("Error parsing image data:", e);
        return [];
      }
    };

    // Helper function to format file size
    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Process all documents
    const allDocuments = result.rows.map(documentData => {
      // Process all image arrays for each document
      const aadharImages = processImagesForViewing(documentData.aadhar_images);
      const accidentImages = processImagesForViewing(documentData.accident_images);
      const expenditureImages = processImagesForViewing(documentData.total_expenditure);

      return {
        // Basic information
        basicInfo: {
          id: documentData.id,
          full_name: documentData.full_name,
          email: documentData.email,
          registration_number: documentData.registration_number,
          phone_number: documentData.phone_number,
          claim_id: documentData.claim_id,
          created_at: documentData.created_at,
          updated_at: documentData.updated_at
        },
        
        // Document images with viewing capabilities
        documents: {
          aadhar_images: {
            count: aadharImages.length,
            images: aadharImages
          },
          accident_images: {
            count: accidentImages.length,
            images: accidentImages
          },
          expenditure_images: {
            count: expenditureImages.length,
            images: expenditureImages
          }
        },

        // Summary for each document
        summary: {
          total_images: aadharImages.length + accidentImages.length + expenditureImages.length,
          aadhar_count: aadharImages.length,
          accident_count: accidentImages.length,
          expenditure_count: expenditureImages.length
        }
      };
    });

    // Calculate overall summary
    const overallSummary = {
      total_documents: result.rows.length,
      total_images_across_all: allDocuments.reduce((sum, doc) => sum + doc.summary.total_images, 0),
      total_aadhar_images: allDocuments.reduce((sum, doc) => sum + doc.summary.aadhar_count, 0),
      total_accident_images: allDocuments.reduce((sum, doc) => sum + doc.summary.accident_count, 0),
      total_expenditure_images: allDocuments.reduce((sum, doc) => sum + doc.summary.expenditure_count, 0)
    };

    res.status(200).json({
      success: true,
      message: "All document data retrieved successfully",
      data: allDocuments,
      summary: overallSummary
    });

  } catch (error) {
    console.error("Error retrieving all document data:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving all document data",
      error: error.message
    });
  }
});
module.exports = router;