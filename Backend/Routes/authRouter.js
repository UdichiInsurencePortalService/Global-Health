const express = require("express");
const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");
const {signup,login} = require("../Controlers/AuthController")
const router = express.Router(); // Correct initialization of Router

// Example authentication route

router.post('/signup',signupValidation,signup );
router.post('/login',loginValidation, login );

module.exports = router; // Ensure the router is exported
