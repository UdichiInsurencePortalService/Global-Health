require('dotenv').config()
const express = require("express");
const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");
const { signup, login, exportUsers } = require("../Controlers/AuthController");
const UserVehicle = require("../Models/UserVehicle");
const axios = require("axios");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/export-users', exportUsers);

// File path setup
const filePath = path.resolve(__dirname, "../data/vehicles.xlsx");

const ensureExcelFile = async () => {
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Vehicles");

    sheet.columns = [
      { header: "Registration No", key: "registrationNumber", width: 20 },
      { header: "Mobile Number", key: "mobileNumber", width: 20 },
      { header: "Owner", key: "owner", width: 25 },
      { header: "Fuel Type", key: "fuel_type", width: 15 },
      { header: "Color", key: "color", width: 15 },
      { header: "Insurer", key: "insurance_company", width: 25 },
      { header: "Address", key: "permanent_address", width: 30 },
      { header: "Registration Date", key: "registration_date", width: 20 },
    ];

    await workbook.xlsx.writeFile(filePath);
  }
};

router.post('/vehicle/register', async (req, res) => {
  const { registrationNumber, mobileNumber } = req.body;

  try {
    await ensureExcelFile();

    const apiResponse = await axios.post(
      process.env.SUREPASS_API,
      { id_number: registrationNumber },
      {
        headers: {
          Authorization: `Bearer ${process.env.SUREPASS_TOKEN} `,
          "Content-Type": "application/json"
        }
      }
    );

    const vehicleData = apiResponse.data;

    const savedData = new UserVehicle({
      registrationNumber,
      mobileNumber,
      vehicleData
    });

    await savedData.save();
    console.log("data is successfully saved in our backend", savedData)

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      const sheet = workbook.getWorksheet("Vehicles");

      sheet.columns = [
        { header: "Registration No", key: "registrationNumber", width: 20 },
        { header: "Mobile Number", key: "mobileNumber", width: 20 },
        { header: "Owner", key: "owner", width: 25 },
        { header: "Fuel Type", key: "fuel_type", width: 15 },
        { header: "Color", key: "color", width: 15 },
        { header: "Insurer", key: "insurance_company", width: 25 },
        { header: "Address", key: "permanent_address", width: 30 },
        { header: "Registration Date", key: "registration_date", width: 20 },
      ];

      const rowData = {
        registrationNumber,
        mobileNumber,
        owner: vehicleData.data?.owner_name || "Unknown",
        fuel_type: vehicleData.data?.fuel_type || "Unknown",
        color: vehicleData.data?.color || "Unknown",
        insurance_company: vehicleData.data?.insurance_company || "N/A",
        permanent_address: vehicleData.data?.permanent_address || "Unknown",
        registration_date: vehicleData.data?.registration_date || "Unknown",
      };

      sheet.addRow(rowData);

      const tempFilePath = path.resolve(__dirname, "../data/vehicles_temp.xlsx");

      try {
        await workbook.xlsx.writeFile(tempFilePath);
        fs.renameSync(tempFilePath, filePath);
      } catch {
        await workbook.xlsx.writeFile(filePath);
      }
    } catch (excelError) {
      // Log or handle Excel-related issues if needed
    }

    res.status(200).json({
      message: "Vehicle data saved to DB and Excel successfully.",
      data: savedData
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch or save vehicle data",
      error: error.message
    });
  }
});

module.exports = router;
