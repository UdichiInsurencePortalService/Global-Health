
const express = require('express');
const db = require('../Models/postgressdb'); // PG Client
const router = express.Router();

router.post('/vehicle/AutoData', (req, res) => {
  console.log('Received request body:', req.body);
  
  // For direct data in request body structure (original example)
  if (req.body.owner_name !== undefined) {
    // Extract directly from req.body since that's where the data is
    const owner_name = req.body?.owner_name || null;
    const address = req.body?.address || null;
    const registration_number = req.body?.registration_number || null;
    const color = req.body?.color || null;
    const insurance_company = req.body?.insurance_company || null;
    const purchase_date = req.body?.purchase_date || null;
    const maker_model = req.body?.maker_model || null;
    const exshowroom = req.body?.exshowroom || null;
    const engine_capacity = req.body?.engine_capacity || null;
    const registration_date = req.body?.registration_date || null;
    const id = req.body?.id || null;
    const fuel_type = req.body?.fuel_type || null;
    const mobile_number = req.body?.mobile_number || null;

    
    console.log('Extracted data for database:', {
      owner_name, address, registration_number, color, insurance_company,
      purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number
    });
    
    insertIntoDatabase({
      owner_name, address, registration_number, color, insurance_company,
      purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number
    }, res);
  } 
  // For nested vehicleData structure
  else if (req.body.vehicleData !== undefined) {
    // Extract the nested vehicleData
    const { registrationNumber, mobileNumber, vehicleData } = req.body;
    
    // Extract fields from vehicleData
    const owner_name = vehicleData?.owner_name || null;
    const address = vehicleData?.permanent_address || vehicleData?.present_address || null;
    const registration_number = registrationNumber || vehicleData?.rc_number || null;
    const color = vehicleData?.color || null;
    const insurance_company = vehicleData?.insurance_company || null;
    const purchase_date = null; // This field might not exist in vehicleData
    const maker_model = vehicleData?.maker_model || null;
    const exshowroom = vehicleData?.exshowroom || null;
    const engine_capacity = vehicleData?.cubic_capacity || null;
    const registration_date = vehicleData?.registration_date || null;
    const id = vehicleData?.client_id || null;
    const fuel_type = vehicleData?.fuel_type || null;
    const mobile_number = mobileNumber || req.body?.mobile_number || null;  // Use mobileNumber if provided
    
    console.log('Extracted data for database:', {
      owner_name, address, registration_number, color, insurance_company,
      purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number
    });
    
    insertIntoDatabase({
      owner_name, address, registration_number, color, insurance_company,
      purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number
    }, res);
  }
  // If neither structure is found
  else {
    console.error('Invalid request format: Neither direct properties nor vehicleData found');
    res.status(400).json({ error: 'Invalid request format' });
  }
});

// Helper function to insert data into the database
function insertIntoDatabase(data, res) {
  const {
    owner_name, address, registration_number, color, insurance_company,
    purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number
  } = data;

  const insert_query = `
    INSERT INTO "autodata" (
      owner_name, address, registration_number,
      color, insurance_company, purchase_date, registration_date,
      maker_model, exshowroom, id, engine_capacity, fuel_type, mobile_number
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  `;

  // Convert string ID to integer if possible, or set to null if it's not convertible
  let processedId = null;
  if (id !== null) {
    // Check if id is numeric
    if (!isNaN(parseInt(id))) {
      processedId = parseInt(id);
    } else {
      // If id is a string like "rc_vVPdaHTdqBQsQdRvvavf", set to null or generate a numeric ID
      console.log(`ID "${id}" is not numeric. Setting to null for database insertion.`);
      // Alternative approach: generate a numeric hash from the string
      // processedId = Math.abs(hashStringToInt(id));
    }
  }

  db.query(
    insert_query,
    [
      owner_name,
      address,
      registration_number,
      color,
      insurance_company,
      purchase_date,
      registration_date,
      maker_model,
      exshowroom,
      processedId, // Use processed ID instead of raw id
      engine_capacity,
      fuel_type,
      mobile_number
    ],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "User Auto Data posted to PostgreSQL database" });
      }
    }
  );
}

// Optional helper function if you want to convert string IDs to numbers consistently
// function hashStringToInt(str) {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = ((hash << 5) - hash) + str.charCodeAt(i);
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// }
router.get('/vehicle/getAutodata', (req, res) => {
    console.log('Hit GET /vehicle/getAutodata'); // This was incorrect before - said "getcardata"
    
    const { registration_number } = req.query;
    console.log('Query params received:', req.query); // Add this for debugging
    
    let fetch_query = 'SELECT * FROM "autodata"';
    const values = [];
  
    if (registration_number) {
      fetch_query += ' WHERE registration_number = $1';
      values.push(registration_number);
    }
    
    console.log('Executing query:', fetch_query, 'with values:', values); // Add this for debugging
  
    db.query(fetch_query, values, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: "Error in fetch: " + err.message });
      } else {
        console.log('Query returned', result.rows.length, 'results');
        return res.json(result.rows);
      }
    });
  });

module.exports = router;