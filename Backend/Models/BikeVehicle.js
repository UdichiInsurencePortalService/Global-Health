const mongoose = require("mongoose");

const BikeVehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  vehicleData: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("BikeVehicle", BikeVehicleSchema);