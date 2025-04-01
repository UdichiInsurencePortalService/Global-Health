const express = require("express");
const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");
const { signup, login, exportUsers } = require("../Controlers/AuthController"); // Combined imports

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/export-users', exportUsers); // Route for exporting users

module.exports = router; // ✅ FIXED: Removed space in "module. Exports"
