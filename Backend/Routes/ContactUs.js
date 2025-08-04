const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../Models/postgressdb");

router.use(cors());
router.use(express.json());

// POST API to save contact form data
router.post('/contactform', async (req, res) => {
    try {
        const { name, email, phone_number, address, message } = req.body;
        
        // Insert data into contact_us table
        const query = `
            INSERT INTO contact_us (name, email, phone_number, address, message) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
        `;
        
        const result = await db.query(query, [name, email, phone_number, address, message]);
        
        res.status(201).json({
            success: true,
            message: "Contact details saved successfully",
            data: result.rows[0]
        });
        
    } catch (error) {
        console.error("Error inserting Contact details:", error.message);
        
        res.status(500).json({
            success: false,
            message: "Error saving Contact details",
            error: error.message,
        });
    }
});

// GET API to retrieve contact form data
router.get('/contactform', async (req, res) => {
    try {
        const query = 'SELECT * FROM contact_us ORDER BY id DESC';
        const result = await db.query(query);
        
        res.status(200).json({
            success: true,
            message: "Contact details retrieved successfully",
            data: result.rows,
            count: result.rows.length
        });
        
    } catch (error) {
        console.error("Error retrieving Contact details:", error.message);
        
        res.status(500).json({
            success: false,
            message: "Error retrieving Contact details",
            error: error.message,
        });
    }
});


module.exports = router;