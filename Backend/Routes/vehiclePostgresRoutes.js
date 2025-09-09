const express = require('express');
const db = require('../Models/postgressdb'); // PG Client
const router = express.Router();

router.post('/vehicle/carData', (req, res) => {
  console.log('Received request body:', req.body);
  
  // For direct data in request body structure (original structure)
  if (req.body.owner !== undefined || req.body.owner_name !== undefined) {
    // Extract directly from req.body, checking all possible field names
    const owner_name = req.body?.owner || req.body?.owner_name || null;
    const address = req.body?.address || null;
    const registration_number = req.body?.vehicle_no || req.body?.registration_number || null;
    const color = req.body?.color || null;
    const insurance_company = req.body?.insurance_company || null;
    const purchase_date = req.body?.date_of_buy || req.body?.purchase_date || null;
    const maker_model = req.body?.maker_model || null;
    const exshowroom = req.body?.ex_showroom_price || req.body?.exshowroom || null;
    const engine_capacity = req.body?.cubic_capacity || req.body?.engine_capacity || null;
    const registration_date = req.body?.registration_date || null;
    const id = req.body?.id || null;
    const fuel_type = req.body?.fuel_type || null;
    const mobile_number = req.body?.mobile_number || null;
    const engine_number = req.body?.engine_number || req.body?.vehicle_engine_number || null;
    const chasi_number = req.body?.chasi_number || req.body?.vehicle_chasi_number || null;
    const registered_at = req.body?.register_at || req.body?.registered_at || null;
    const financer = req.body?.financer || null;

    console.log('Extracted data for database:', {
      owner_name, address, registration_number, color, insurance_company,
      purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number, engine_number, chasi_number, registered_at, financer
    });
    
    insertIntoDatabase({
      owner_name, address, registration_number, color, insurance_company,
      purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number, engine_number, chasi_number, registered_at, financer
    }, res);
  } 
  // For nested vehicleData structure
  else if (req.body.vehicleData !== undefined) {
    // Extract the nested vehicleData
    const { registrationNumber, mobileNumber, vehicleData } = req.body;
    
    // Extract fields from vehicleData, checking all possible field names
    const owner_name = vehicleData?.owner || vehicleData?.owner_name || null;
    const address = vehicleData?.address || vehicleData?.permanent_address || vehicleData?.present_address || null;
    const registration_number = registrationNumber || vehicleData?.vehicle_no || vehicleData?.rc_number || null;
    const color = vehicleData?.color || null;
    const insurance_company = vehicleData?.insurance_company || null;
    const purchase_date = vehicleData?.date_of_buy || vehicleData?.purchase_date || null;
    const maker_model = vehicleData?.maker_model || null;
    const exshowroom = vehicleData?.ex_showroom_price || vehicleData?.exshowroom || null;
    const engine_capacity = vehicleData?.cubic_capacity || vehicleData?.engine_capacity || null;
    const registration_date = vehicleData?.registration_date || null;
    const id = vehicleData?.client_id || vehicleData?.id || null;
    const fuel_type = vehicleData?.fuel_type || null;
    const mobile_number = mobileNumber || vehicleData?.mobile_number || req.body?.mobile_number || null;
    const engine_number = vehicleData?.engine_number || vehicleData?.vehicle_engine_number || null;
    const chasi_number = vehicleData?.chasi_number || vehicleData?.vehicle_chasi_number || null;
    const registered_at = vehicleData?.register_at || vehicleData?.registered_at || null;
    const financer = vehicleData?.financer || null;
    
    console.log('Extracted data for database:', {
      owner_name, address, registration_number, color, insurance_company,
      purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number, engine_number, chasi_number, registered_at, financer
    });
    
    insertIntoDatabase({
      owner_name, address, registration_number, color, insurance_company,
      purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number, engine_number, chasi_number, registered_at, financer
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
    purchase_date, maker_model, exshowroom, engine_capacity, registration_date, id, fuel_type, mobile_number, engine_number, chasi_number, registered_at, financer
  } = data;

  const insert_query = `
    INSERT INTO "cardata" (
      owner_name, address, registration_number,
      color, insurance_company, purchase_date, registration_date,
      maker_model, exshowroom, id, engine_capacity, fuel_type, mobile_number, engine_number, chasi_number, registered_at, financer
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
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
      mobile_number,
      engine_number,
      chasi_number,
      registered_at,
      financer
    ],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "User Car Data posted to PostgreSQL database" });
      }
    }
  );
}

router.get('/vehicle/getcardata', (req, res) => {
  console.log('Hit GET /vehicle/getcardata');
  
  const { registration_number } = req.query;

  let fetch_query = 'SELECT * FROM "cardata"';
  const values = [];

  if (registration_number) {
    fetch_query += ' WHERE registration_number = $1';
    values.push(registration_number);
  }

  db.query(fetch_query, values, (err, result) => {
    if (err) {
      res.status(500).send("Error in fetch: " + err.message);
    } else {
      res.send(result.rows);
    }
  });
});

module.exports = router;