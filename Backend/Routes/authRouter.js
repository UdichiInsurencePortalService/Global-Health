const express = require("express");
const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");
const { signup, login, } = require("../Controlers/AuthController");


const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);


module.exports = router;
