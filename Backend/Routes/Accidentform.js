const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../Models/postgressdb");

router.use(cors());
router.use(express.json());

// POST: Save accident details
router.post("/accidentform", async (req, res) => {
  try {
    const {
      accident_place,
      accident_date,
      time_accident,
      weather_condition,
      describe_accident,
      police_complaint_filed,
      police_complaint_details
    } = req.body;

    // Process time_accident to extract only time portion if it's an ISO string
    let processedTime = time_accident;
    
    if (time_accident && typeof time_accident === 'string') {
      // Check if it's an ISO string (contains 'T')
      if (time_accident.includes('T')) {
        // Extract time portion from ISO string
        const date = new Date(time_accident);
        processedTime = date.toTimeString().split(' ')[0]; // Gets HH:MM:SS format
      }
    }

    // Insert accident details into database
    const insertQuery = `
      INSERT INTO accident_details (
        accident_place, 
        accident_date, 
        time_accident, 
        weather_condition, 
        describe_accident, 
        police_complaint_filed, 
        police_complaint_details
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      accident_place,
      accident_date,
      processedTime, // Use processed time instead of raw time_accident
      weather_condition,
      describe_accident,
      police_complaint_filed,
      police_complaint_details || ''
    ];

    const result = await db.query(insertQuery, values);

    res.status(201).json({
      success: true,
      message: "Accident details saved successfully",
      data: result.rows[0],
    });
    
  } catch (error) {
    console.error("Error inserting accident details:", error.message);
    res.status(500).json({
      success: false,
      message: "Error saving accident details",
      error: error.message,
    });
  }
});

// GET: Retrieve all accident data with pagination
router.get('/getaccidentdata', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const query = `
      SELECT * FROM accident_details 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;

    const countQuery = 'SELECT COUNT(*) FROM accident_details';

    const [accidents, countResult] = await Promise.all([
      db.query(query, [limit, offset]),
      db.query(countQuery)
    ]);

    const totalAccidents = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalAccidents / limit);

    res.status(200).json({
      success: true,
      message: 'All accident data retrieved successfully',
      data: accidents.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalAccidents,
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    console.error('Database error while fetching accident data:', err);
    res.status(500).json({
      success: false,
      message: 'Database error',
      error: err.message
    });
  }
});

module.exports = router;