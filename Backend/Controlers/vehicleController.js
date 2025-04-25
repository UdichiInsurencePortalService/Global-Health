require("dotenv").config();
const axios = require("axios");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const redis = require('../redisclient');

const Bikedata = require("../Models/BikeVehicle");
const UserVehicle = require("../Models/UserVehicle");

// Excel file paths
const carExcelPath = path.resolve(__dirname, "../data/vehicles.xlsx");
const bikeExcelPath = path.resolve(__dirname, "../data/bike_vehicles.xlsx");

// Excel column headers
const getColumns = () => [
  { header: "Registration No", key: "registrationNumber", width: 20 },
  { header: "Mobile Number", key: "mobileNumber", width: 20 },
  { header: "Owner", key: "owner", width: 25 },
  { header: "Fuel Type", key: "fuel_type", width: 15 },
  { header: "Color", key: "color", width: 15 },
  { header: "Insurer", key: "insurance_company", width: 25 },
  { header: "Address", key: "permanent_address", width: 30 },
  { header: "Registration Date", key: "registration_date", width: 20 },
  { header: "Created At", key: "created_at", width: 25 },
];

// Improved writeToExcel function
const writeToExcel = async (filePath, sheetName, vehicleData, registrationNumber, mobileNumber) => {
  try {
    const workbook = new ExcelJS.Workbook();
    
    // Load existing file if it exists
    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
    }
  
    // Ensure sheet exists and has columns
    let sheet = workbook.getWorksheet(sheetName);
    if (!sheet) {
      sheet = workbook.addWorksheet(sheetName);
      sheet.columns = getColumns();
    } else if (sheet.columns.length === 0) {
      sheet.columns = getColumns();
    }
  
    // Check if entry already exists to avoid duplicates
    let existingRowIndex = -1;
    sheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) { // Skip header row
        if (row.getCell('registrationNumber').value === registrationNumber && 
            row.getCell('mobileNumber').value === mobileNumber) {
          existingRowIndex = rowIndex;
        }
      }
    });
  
    // Flatten vehicleData
    const rawData = vehicleData?.data || vehicleData;
  
    const rowData = {
      registrationNumber,
      mobileNumber,
      owner: rawData?.owner_name || "Unknown",
      fuel_type: rawData?.fuel_type || "Unknown",
      color: rawData?.color || "Unknown",
      insurance_company: rawData?.insurance_company || "N/A",
      permanent_address: rawData?.permanent_address || "Unknown",
      registration_date: rawData?.registration_date || "Unknown",
      created_at: new Date().toLocaleString(),
    };
  
    console.log("📄 Writing row to Excel:", rowData);
  
    // Update existing row or add new row
    if (existingRowIndex > 0) {
      const row = sheet.getRow(existingRowIndex);
      Object.keys(rowData).forEach(key => {
        const column = sheet.columns.findIndex(col => col.key === key) + 1;
        if (column > 0) {
          row.getCell(column).value = rowData[key];
        }
      });
      row.commit();
    } else {
      sheet.addRow(rowData);
    }
    
    await workbook.xlsx.writeFile(filePath);
    console.log(`✅ Excel file updated successfully: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error writing to Excel: ${error.message}`);
    // Continue process despite Excel error
    return false;
  }
};

// GET car API code - corrected version
exports.getCar = async (req, res) => {
  const { registrationNumber, mobileNumber } = req.query;
  if (!registrationNumber || !mobileNumber) {
    return res.status(400).json({ error: "registrationNumber and mobileNumber are required" });
  }
  
  const cacheKey = `vehicle:${registrationNumber}:${mobileNumber}`;
  
  try {
    // 🔍 Step 1: Try Redis
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("✅ Redis cache hit");
      return res.status(200).json({ source: "redis", data: JSON.parse(cachedData) });
    }

    // 🧠 Step 2: Check MongoDB
    const dbData = await UserVehicle.findOne({ registrationNumber, mobileNumber });
    if (dbData) {
      console.log("✅ MongoDB hit");
      // Save to Redis for future (with 1 hour TTL)
      await redis.set(cacheKey, JSON.stringify(dbData.vehicleData), 'EX', 3600);
      return res.status(200).json({ source: "mongodb", data: dbData.vehicleData });
    }
    
    // 🌐 Step 3: Call Surepass API when not found in both Redis and MongoDB
    const response = await axios.post(
      process.env.SUREPASS_API,
      { id_number: registrationNumber },
      {
        headers: {
          Authorization: `Bearer ${process.env.SUREPASS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const vehicleData = response.data.data;

    // 💾 Step 4: Save to MongoDB
    const savedData = await new UserVehicle({
      registrationNumber,
      mobileNumber,
      vehicleData,
    }).save();

    // 💾 Step 5: Cache in Redis (1 hour TTL)
    await redis.set(cacheKey, JSON.stringify(vehicleData));
    
    // 📄 Step 6: Write to Excel
    await writeToExcel(carExcelPath, "Vehicles", vehicleData, registrationNumber, mobileNumber);

    return res.status(200).json({ source: "surepass", data: vehicleData });

  } catch (err) {
    console.error("❌ Error in getVehicleData:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ===================== CAR =====================
exports.registerCar = async (req, res) => {
  const { registrationNumber, mobileNumber } = req.body;
  
  if (!registrationNumber || !mobileNumber) {
    return res.status(400).json({ error: "Registration number and mobile number are required" });
  }

  const cacheKey = `vehicle:${registrationNumber}:${mobileNumber}`;

  try {
    // Check if vehicle already exists in database
    const existingVehicle = await UserVehicle.findOne({ registrationNumber, mobileNumber });
    if (existingVehicle) {
      return res.status(200).json({ 
        message: "Vehicle already registered", 
        data: existingVehicle.vehicleData 
      });
    }

    // Check Redis Cache
    const cachedData = await redis.get(cacheKey);
    let vehicleData;

    if (cachedData) {
      console.log("Vehicle data served from cache:", registrationNumber);
      vehicleData = JSON.parse(cachedData);
    } else {
      // Call Surepass API
      const response = await axios.post(
        process.env.SUREPASS_API,
        { id_number: registrationNumber },
        {
          headers: {
            Authorization: `Bearer ${process.env.SUREPASS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      vehicleData = response.data.data;

      // Cache response in Redis (1 hour TTL)
      await redis.set(cacheKey, JSON.stringify(vehicleData));  
    }

    // Save to MongoDB
    const savedData = await new UserVehicle({
      registrationNumber,
      mobileNumber,
      vehicleData,
    }).save();

    // Write to Excel
    await writeToExcel(carExcelPath, "Vehicles", vehicleData, registrationNumber, mobileNumber);

    res.status(201).json({ message: "Car vehicle saved successfully", data: savedData });

  } catch (err) {
    console.error("❌ Error in registerCar:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ===================== BIKE =====================
exports.registerBike = async (req, res) => {
  const { registrationNumber, mobileNumber } = req.body;
  
  if (!registrationNumber || !mobileNumber) {
    return res.status(400).json({ error: "Registration number and mobile number are required" });
  }

  const cacheKey = `bike:${registrationNumber}:${mobileNumber}`;

  try {
    // Check if bike already exists in database
    const existingBike = await Bikedata.findOne({ registrationNumber, mobileNumber });
    if (existingBike) {
      return res.status(200).json({ 
        message: "Bike already registered", 
        data: existingBike.vehicleData 
      });
    }

    // Check Redis Cache
    const cachedData = await redis.get(cacheKey);
    let vehicleData;

    if (cachedData) {
      console.log("Bike data served from cache:", registrationNumber);
      vehicleData = JSON.parse(cachedData);
    } else {
      // Call Surepass API
      const response = await axios.post(
        process.env.SUREPASS_API,
        { id_number: registrationNumber },
        {
          headers: {
            Authorization: `Bearer ${process.env.SUREPASS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      vehicleData = response.data.data;

      // Cache response in Redis (1 hour TTL)
      await redis.set(cacheKey, JSON.stringify(vehicleData));  
    }

    // Save to MongoDB
    const savedData = await new Bikedata({
      registrationNumber,
      mobileNumber,
      vehicleData,
    }).save();

    // Write to Excel
    await writeToExcel(bikeExcelPath, "BikeVehicles", vehicleData, registrationNumber, mobileNumber);

    res.status(201).json({ message: "Bike vehicle saved successfully", data: savedData });

  } catch (err) {
    console.error("❌ Error in registerBike:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET bike API functionality
exports.getBike = async (req, res) => {
  const { registrationNumber, mobileNumber } = req.query;
  if (!registrationNumber || !mobileNumber) {
    return res.status(400).json({ error: "registrationNumber and mobileNumber are required" });
  }
  
  const cacheKey = `bike:${registrationNumber}:${mobileNumber}`;
  
  try {
    // 🔍 Step 1: Try Redis
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("✅ Redis cache hit for bike");
      return res.status(200).json({ source: "redis", data: JSON.parse(cachedData) });
    }

    // 🧠 Step 2: Check MongoDB
    const dbData = await Bikedata.findOne({ registrationNumber, mobileNumber });
    if (dbData) {
      console.log("✅ MongoDB hit for bike");
      // Save to Redis for future (with 1 hour TTL)
      await redis.set(cacheKey, JSON.stringify(dbData.vehicleData), 'EX', 3600);
      return res.status(200).json({ source: "mongodb", data: dbData.vehicleData });
    }
    
    // 🌐 Step 3: Call Surepass API when not found in both Redis and MongoDB
    const response = await axios.post(
      process.env.SUREPASS_API,
      { id_number: registrationNumber },
      {
        headers: {
          Authorization: `Bearer ${process.env.SUREPASS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const vehicleData = response.data.data;

    // 💾 Step 4: Save to MongoDB
    const savedData = await new Bikedata({
      registrationNumber,
      mobileNumber,
      vehicleData,
    }).save();

    // 💾 Step 5: Cache in Redis (1 hour TTL)
    await redis.set(cacheKey, JSON.stringify(vehicleData));
    
    // 📄 Step 6: Write to Excel
    await writeToExcel(bikeExcelPath, "BikeVehicles", vehicleData, registrationNumber, mobileNumber);

    return res.status(200).json({ source: "surepass", data: vehicleData });

  } catch (err) {
    console.error("❌ Error in getBike:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};