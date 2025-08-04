const express = require('express');
const multer = require('multer');
const db = require("../Models/postgressdb");
const router = express.Router();

const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test database connection


// Configure multer for file upload with size limit (1MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 // 1MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific file types
    const allowedTypes = {
      'official_photograph': ['image/jpeg', 'image/jpg', 'image/png'],
      'medical_license': ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    };

    const fieldAllowedTypes = allowedTypes[file.fieldname] || [];
    
    if (fieldAllowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: ${fieldAllowedTypes.join(', ')}`), false);
    }
  }
});

// Handle file upload fields
const uploadFields = upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'license', maxCount: 1 }
]);

// POST route to handle form submission
router.post('/api/submit-nomination', (req, res) => {
  uploadFields(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ 
            error: 'File size too large. Maximum allowed size is 1MB.' 
          });
        }
      }
      return res.status(400).json({ error: err.message });
    }

    try {
      const {
        fullName,
        email,
        number,
        address,
        gender,
        dob,
        nationality,
        country,
        specialty,
        designation,
        registration,
        experience,
        qualifications,
        languages,
        achievements,
        awards,
        research,
        community,
        mentored,
        mentoringDetails,
        category
      } = req.body;

      // Validate required fields
      if (!fullName || !email || !number) {
        return res.status(400).json({ 
          error: 'Missing required fields: fullName, email, and phone number are required.' 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
      }

      // Process uploaded files
      let officialPhotograph = null;
      let medicalLicense = null;

      if (req.files) {
        if (req.files.photo && req.files.photo[0]) {
          officialPhotograph = req.files.photo[0].buffer;
        }
        if (req.files.license && req.files.license[0]) {
          medicalLicense = req.files.license[0].buffer;
        }
      }

      // Convert category array to string if it's an array
      const awardCategory = Array.isArray(category) ? category.join(', ') : category;

      // Insert data into PostgreSQL
      const insertQuery = `
        INSERT INTO doctor_award (
          full_name, email, phone_number, address, gender, date_of_birth, 
          nationality, country_of_practice, official_photograph, medical_specialty, 
          current_designation, medical_registration, year_of_medical_practice, 
          academic_qualification, languages_spoken, key_achievements, 
          award_received, notable_research, community_health, mentored_professionals, 
          medical_license, award_category
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
        ) RETURNING id
      `;

      const values = [
        fullName,
        email,
        number,
        address,
        gender || null,
        dob || null,
        nationality || null,
        country || null,
        officialPhotograph,
        specialty || null,
        designation || null,
        registration || null,
        experience ? parseInt(experience) : null,
        qualifications || null,
        languages || null,
        achievements || null,
        awards || null,
        research || null,
        community || null,
        mentored === 'Yes' ? `${mentored}. ${mentoringDetails || ''}`.trim() : mentored || null,
        medicalLicense,
        awardCategory || null
      ];

      const result = await pool.query(insertQuery, values);
      const newId = result.rows[0].id;

      res.status(201).json({
        message: 'Nomination submitted successfully!',
        id: newId,
        success: true
      });

    } catch (error) {
      console.error('Database error:', error);
      
      // Handle specific PostgreSQL errors
      if (error.code === '23505') { // Unique violation
        return res.status(400).json({ 
          error: 'Email already exists. Please use a different email address.' 
        });
      }
      
      res.status(500).json({ 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
});

// GET route to retrieve all nominations (optional)
router.get('/api/nominations', async (req, res) => {
  try {
    const query = `
      SELECT 
        id, full_name, email, phone_number, address, gender, 
        date_of_birth, nationality, country_of_practice, medical_specialty,
        current_designation, medical_registration, year_of_medical_practice,
        academic_qualification, languages_spoken, key_achievements,
        award_received, notable_research, community_health, 
        mentored_professionals, award_category, created_at
      FROM doctor_award 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    res.json({
      nominations: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve nominations' });
  }
});

// GET route to retrieve a specific nomination by ID
app.get('/api/nominations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM doctor_award WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nomination not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve nomination' });
  }
});

// GET route to retrieve image/document by ID and type
app.get('/api/file/:id/:type', async (req, res) => {
  try {
    const { id, type } = req.params;
    
    let column;
    let contentType;
    
    switch (type) {
      case 'photo':
        column = 'official_photograph';
        contentType = 'image/jpeg';
        break;
      case 'license':
        column = 'medical_license';
        contentType = 'application/pdf';
        break;
      default:
        return res.status(400).json({ error: 'Invalid file type' });
    }
    
    const query = `SELECT ${column} FROM doctor_award WHERE id = $1`;
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0 || !result.rows[0][column]) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const fileBuffer = result.rows[0][column];
    res.setHeader('Content-Type', contentType);
    res.send(fileBuffer);
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve file' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Doctor Award API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = router;