const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../Models/postgressdb");

router.use(cors());
router.use(express.json());

router.post("/accidentform", async (req, res) => {
  const {
    accident_place,
    accident_date,
    time_accident,
    weather_condition,
    describe_accident,
    police_complaint_filed,
    police_complaint_details,
  } = req.body;

  try {
    const data = await db.query(
      `INSERT INTO accident_details 
        (accident_place, accident_date, time_accident, weather_condition, describe_accident, police_complaint_filed, police_complaint_details)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
      [
        accident_place, 
        accident_date, 
        time_accident, 
        weather_condition, 
        describe_accident,
        police_complaint_filed, // 'yes' or 'no'
        police_complaint_details // Details if yes, empty string if no
      ]
    );

    res.status(201).json({
      success: true,
      message: "Accident details saved successfully",
      data: data.rows[0],
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

router.get('/claims/verify', async (req, res) => {
  try {
    const { userId } = req.query;
        
    // Validate userId parameter
    if (!userId) {
      return res.status(400).json({
        message: 'userId parameter is required'
      });
    }
        
    console.log('Received userId:', userId); // Debug log
        
    // Check if user exists in database
    const user = await checkUserInDatabase(userId);
        
    if (user) {
      res.json([user]); // Return array as your frontend expects
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error('Error in /claims/verify:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Fixed implementation of checkUserInDatabase function
async function checkUserInDatabase(userId) {
  try {
    // Use db.query() method for PostgreSQL queries
    const result = await db.query(
      'SELECT * FROM initial_claim WHERE user_id = $1', 
      [userId]
    );
    
    // Return the first user if found, otherwise null
    return result.rows.length > 0 ? result.rows[0] : null;
        
  } catch (error) {
    console.error('Database query error:', error);
    throw error; // Re-throw to be caught by the route handler
  }
}

module.exports = router;