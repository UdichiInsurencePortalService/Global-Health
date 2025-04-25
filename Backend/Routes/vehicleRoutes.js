const express = require("express");
const { registerCar, registerBike,getCar } = require("../Controlers/vehicleController");

const router = express.Router();

// POST endpoint to register a car
router.post("/vehicle/register", registerCar);

// POST endpoint to register a bike
router.post("/vehicle/bike", registerBike);

// GET ROUTER ENDPOINTS FOR CAR 

router.get("/vehicle/car",getCar)

module.exports = router;
